#!/usr/bin/env node
/**
 * Restores the agent skills recorded in skills-lock.json.
 *
 * The vendored copies are gitignored (7.2M of third-party markdown), so a fresh
 * clone has none of them. This rebuilds the two directories that Claude Code
 * reads:
 *
 *   .agents/skills/<name>/        real content, extracted from the source repo
 *   .claude/skills/<name>         relative symlink to the above
 *
 * Skills are grouped by source repository so each repo is downloaded once as a
 * tarball rather than one HTTP request per file. Six repos, six requests.
 *
 * Usage:
 *   node scripts/restore-skills.mjs           restore anything missing
 *   node scripts/restore-skills.mjs --force   re-download everything
 *   node scripts/restore-skills.mjs --check    report only, write nothing
 */

import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const LOCK = path.join(ROOT, 'skills-lock.json')
const CONTENT_DIR = path.join(ROOT, '.agents', 'skills')
const LINK_DIR = path.join(ROOT, '.claude', 'skills')

const args = new Set(process.argv.slice(2))
const FORCE = args.has('--force')
const CHECK = args.has('--check')

const c = process.stdout.isTTY
  ? { dim: (s) => `\x1b[2m${s}\x1b[0m`, red: (s) => `\x1b[31m${s}\x1b[0m`,
      yellow: (s) => `\x1b[33m${s}\x1b[0m`, green: (s) => `\x1b[32m${s}\x1b[0m` }
  : { dim: (s) => s, red: (s) => s, yellow: (s) => s, green: (s) => s }

/**
 * Hash of a skill directory: sha256 over each file's path then its bytes, walked
 * in sorted order. Matches the scheme skills-lock.json already uses, so an
 * unchanged skill reproduces the recorded computedHash exactly.
 */
function hashSkillDir(dir) {
  const files = []
  const walk = (d, prefix) => {
    for (const entry of fs.readdirSync(d, { withFileTypes: true }).sort((a, b) => (a.name < b.name ? -1 : 1))) {
      const rel = prefix ? `${prefix}/${entry.name}` : entry.name
      if (entry.isDirectory()) walk(path.join(d, entry.name), rel)
      else if (entry.isFile()) files.push(rel)
    }
  }
  walk(dir, '')
  files.sort()
  const h = createHash('sha256')
  for (const rel of files) {
    h.update(rel)
    h.update(fs.readFileSync(path.join(dir, rel)))
  }
  return h.digest('hex')
}

function readLock() {
  if (!fs.existsSync(LOCK)) {
    console.error(c.red(`No skills-lock.json at ${LOCK}`))
    process.exit(1)
  }
  const lock = JSON.parse(fs.readFileSync(LOCK, 'utf8'))
  const entries = Object.entries(lock.skills ?? {})
  if (entries.length === 0) {
    console.error(c.red('skills-lock.json lists no skills.'))
    process.exit(1)
  }
  for (const [name, e] of entries) {
    if (e.sourceType !== 'github') {
      console.error(c.red(`${name}: unsupported sourceType "${e.sourceType}" (only github is handled).`))
      process.exit(1)
    }
  }
  return entries
}

/**
 * The commit a ref currently points at, purely so the run can report what it
 * actually downloaded. Codeload names its tarball directory after the ref, not
 * the commit, so this cannot be recovered from the archive. Unauthenticated and
 * rate-limited, so a failure here is not worth aborting a restore over.
 */
async function resolveCommit(repo, ref) {
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}/commits/${ref}`, {
      headers: { Accept: 'application/vnd.github.sha' },
    })
    if (!res.ok) return null
    const sha = (await res.text()).trim()
    return /^[0-9a-f]{40}$/.test(sha) ? sha : null
  } catch {
    return null
  }
}

/** Downloads a repo tarball and extracts it to a temp dir, returning that path. */
async function fetchRepo(repo, ref) {
  const url = `https://codeload.github.com/${repo}/tar.gz/${ref}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${repo}@${ref} -> HTTP ${res.status}`)

  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'skills-'))
  const tarball = path.join(tmp, 'repo.tar.gz')
  fs.writeFileSync(tarball, Buffer.from(await res.arrayBuffer()))
  execFileSync('tar', ['-xzf', tarball, '-C', tmp])
  fs.rmSync(tarball)

  // The archive unpacks into a single top-level directory.
  const [root] = fs.readdirSync(tmp)
  return { dir: path.join(tmp, root), tmp }
}

function linkSkill(name) {
  const link = path.join(LINK_DIR, name)
  const target = path.join('..', '..', '.agents', 'skills', name)
  fs.mkdirSync(LINK_DIR, { recursive: true })
  // lstat, not exists: a symlink pointing at a missing target reports false.
  try {
    if (fs.lstatSync(link).isSymbolicLink() && fs.readlinkSync(link) === target) return
    fs.rmSync(link, { recursive: true, force: true })
  } catch {
    /* not there yet */
  }
  fs.symlinkSync(target, link)
}

async function main() {
  const entries = readLock()

  const missing = entries.filter(([name]) => !fs.existsSync(path.join(CONTENT_DIR, name)))

  if (CHECK) {
    let drift = 0
    for (const [name, e] of entries) {
      const dir = path.join(CONTENT_DIR, name)
      if (!fs.existsSync(dir)) continue
      if (hashSkillDir(dir) !== e.computedHash) drift++
    }
    console.log(`${entries.length} skills in lock, ${missing.length} missing, ${drift} differing from recorded hash.`)
    for (const [name] of missing) console.log(c.red(`  missing  ${name}`))
    process.exit(missing.length > 0 ? 1 : 0)
  }

  if (missing.length === 0 && !FORCE) {
    console.log(`All ${entries.length} skills present. ${c.dim('Use --force to re-download.')}`)
    // Symlinks are cheap to reconcile and are the half most likely to be lost.
    for (const [name] of entries) linkSkill(name)
    return
  }

  const todo = FORCE ? entries : missing
  const byRepo = new Map()
  for (const [name, e] of todo) {
    if (!byRepo.has(e.source)) byRepo.set(e.source, [])
    byRepo.get(e.source).push([name, e])
  }

  console.log(`Restoring ${todo.length} skill(s) from ${byRepo.size} repositories.\n`)
  fs.mkdirSync(CONTENT_DIR, { recursive: true })

  let restored = 0
  const drifted = []
  const failed = []

  for (const [repo, skills] of byRepo) {
    const ref = skills[0][1].ref ?? 'HEAD'
    let checkout
    try {
      checkout = await fetchRepo(repo, ref)
    } catch (error) {
      console.log(c.red(`  ${repo}: ${error.message}`))
      failed.push(...skills.map(([n]) => n))
      continue
    }

    const commit = await resolveCommit(repo, ref)
    console.log(`  ${repo} ${c.dim(commit ? `@ ${commit.slice(0, 10)}` : `@ ${ref} (commit unresolved)`)}`)

    for (const [name, e] of skills) {
      // skillPath points at the SKILL.md; the skill is the directory holding it,
      // including references/, evals/ and any assets.
      const src = path.join(checkout.dir, path.dirname(e.skillPath))
      if (!fs.existsSync(src)) {
        console.log(c.red(`      ${name}: ${path.dirname(e.skillPath)} not found in repo`))
        failed.push(name)
        continue
      }
      const dest = path.join(CONTENT_DIR, name)
      fs.rmSync(dest, { recursive: true, force: true })
      fs.cpSync(src, dest, { recursive: true })
      linkSkill(name)
      restored++
      if (hashSkillDir(dest) !== e.computedHash) drifted.push(name)
    }

    fs.rmSync(checkout.tmp, { recursive: true, force: true })
  }

  console.log(`\n${c.green(`Restored ${restored} skill(s).`)}`)

  if (drifted.length > 0) {
    // Expected, not alarming: skills-lock.json records no commit, so every
    // restore takes whatever is at the default branch today.
    console.log(
      c.yellow(`${drifted.length} differ from the hash recorded in skills-lock.json`) +
        c.dim(' (upstream moved since the lock was written).'),
    )
  }

  if (failed.length > 0) {
    console.log(c.red(`Failed: ${failed.join(', ')}`))
    process.exit(1)
  }
}

main().catch((error) => {
  console.error(c.red(error.stack ?? String(error)))
  process.exit(1)
})
