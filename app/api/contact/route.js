import { getWriteClient } from '@/lib/sanity'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i

const LIMITS = {
  name: 120,
  email: 200,
  company: 160,
  budget: 40,
  message: 5000,
}

const BUDGETS = new Set(['', '<5L', '5L-10L', '10L-25L', '25L+'])

/* Server-side validation is not a mirror of the client's for convenience. The
   client's version can be bypassed entirely, so this is the real gate. */
function validate(body) {
  const errors = {}
  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const message = typeof body.message === 'string' ? body.message.trim() : ''
  const company = typeof body.company === 'string' ? body.company.trim() : ''
  const budget = typeof body.budget === 'string' ? body.budget.trim() : ''

  if (!name) errors.name = 'Please tell us your name.'
  else if (name.length < 2) errors.name = 'Please enter your full name.'
  else if (name.length > LIMITS.name) errors.name = 'That name is longer than we can store.'

  if (!email) errors.email = 'We need an email address to reply to.'
  else if (!EMAIL_RE.test(email)) errors.email = 'That email address looks incomplete.'
  else if (email.length > LIMITS.email) errors.email = 'That email address is too long.'

  if (!message) errors.message = 'Tell us a little about the project.'
  else if (message.length < 20) errors.message = 'A sentence or two more would help us respond usefully.'
  else if (message.length > LIMITS.message) errors.message = 'Please keep it under 5000 characters.'

  if (company.length > LIMITS.company) errors.company = 'That company name is too long.'
  if (!BUDGETS.has(budget)) errors.budget = 'Pick one of the listed ranges.'

  return { errors, values: { name, email, message, company, budget } }
}

export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return Response.json({ ok: false, reason: 'malformed' }, { status: 400 })
  }

  // Honeypot: a real visitor never fills a field they cannot see. Answer 200 so a
  // bot cannot use the status code to learn the field is a trap.
  if (typeof body.honeypot === 'string' && body.honeypot.trim() !== '') {
    return Response.json({ ok: true }, { status: 200 })
  }

  const { errors, values } = validate(body)
  if (Object.keys(errors).length > 0) {
    return Response.json({ ok: false, reason: 'invalid', errors }, { status: 422 })
  }

  const writeClient = getWriteClient()
  if (!writeClient) {
    // Misconfiguration, not visitor error. Say so plainly rather than pretending
    // the message was received.
    console.error('[contact] SANITY_API_WRITE_TOKEN is not set; submission was not stored')
    return Response.json({ ok: false, reason: 'unconfigured' }, { status: 503 })
  }

  try {
    await writeClient.create({
      _type: 'contactSubmission',
      ...values,
      submittedAt: new Date().toISOString(),
      handled: false,
    })
  } catch (error) {
    console.error('[contact] failed to store submission:', error)
    return Response.json({ ok: false, reason: 'storage' }, { status: 502 })
  }

  return Response.json({ ok: true }, { status: 201 })
}

export async function GET() {
  return Response.json({ ok: false, reason: 'method' }, { status: 405 })
}
