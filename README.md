# Appweave Labs Website

Next.js 15 website with Sanity CMS integration for managing blog posts, clients, and careers.

## Features

- **Blog** - Full blog with rich text, images, code blocks, authors, and categories
- **Clients** - Showcase clients/projects from Sanity Studio
- **Careers** - Job listings managed entirely from Sanity Studio
- **Dark/Light Theme** - Toggle with localStorage persistence
- **Responsive Design** - Mobile-first, works on all devices

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Create Sanity Project

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Create a new project
3. Copy your **Project ID**

### 3. Set Up Sanity Studio (Separate Project)

```bash
npm create sanity@latest -- --template clean --create-project "Appweave Studio" --dataset production
```

Copy the schemas from `sanity/schemas/` in this project to your Studio's `schemaTypes/` folder:
- `post.js` - Blog posts
- `author.js` - Blog authors
- `category.js` - Blog categories
- `client.js` - Client showcases
- `career.js` - Job listings

Update your Studio's `schemaTypes/index.js`:
```javascript
import post from './post'
import author from './author'
import category from './category'
import client from './client'
import career from './career'

export const schemaTypes = [post, author, category, client, career]
```

### 4. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Add your Sanity credentials:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 6. Restore Agent Skills (optional)

The agent skills used on this project are vendored into `.agents/skills/` and
symlinked from `.claude/skills/`. Both are gitignored — 7.2M of third-party
markdown — so a fresh clone has none of them. `skills-lock.json` records where
each one came from, and this rebuilds them:

```bash
npm run skills:restore   # fetch anything missing (~7s for all 74)
npm run skills:check     # report what is missing or has drifted, write nothing
```

The script groups skills by source repository so each repo is downloaded once
rather than one request per file. Re-running it is cheap and touches the network
only when something is actually missing; if `.claude/skills/` is lost but
`.agents/` survives, it just rebuilds the symlinks.

Skip this entirely if you are not using Claude Code — nothing in the site build
depends on it.

> **Note:** `skills-lock.json` records a content hash but no commit, so a restore
> takes whatever is on each repository's default branch that day. 51 of the 74
> already differ from their recorded hash; the script reports the count rather
> than failing. To pin one, add a `"ref": "<commit-sha>"` field to its entry —
> the script uses it when present.

## Content Types

### Blog Posts
| Field | Description |
|-------|-------------|
| Title | Post title |
| Slug | URL-friendly identifier |
| Author | Reference to author |
| Main Image | Hero/featured image |
| Categories | Array of category references |
| Published Date | When to show the post |
| Excerpt | Short summary for listings |
| Body | Rich text content |

### Clients
| Field | Description |
|-------|-------------|
| Company Name | Client/company name |
| Logo | Company logo image |
| Description | Brief project/client description |
| Industry | e.g., Fintech, E-commerce |
| Website URL | Link to client site |
| Stock Ticker | e.g., NASDAQ: EXLS (optional) |
| Featured | Show on homepage? |
| Display Order | Lower numbers appear first |

### Careers
| Field | Description |
|-------|-------------|
| Job Title | Position title |
| Slug | URL-friendly identifier |
| Employment Type | Full-time, Part-time, Contract, Internship, Freelance |
| Location | e.g., Remote, Bangalore, Hybrid |
| Department | e.g., Engineering, Data, Design |
| Short Description | Brief summary for listing |
| Responsibilities | Array of key responsibilities |
| Requirements | Required qualifications |
| Nice to Have | Preferred qualifications |
| Benefits | Perks and benefits |
| Salary Range | Optional compensation info |
| Apply Email | Email for applications |
| Apply URL | External application link |
| Active | Is position currently open? |
| Published Date | When listing was posted |
| Display Order | Lower numbers appear first |

## Project Structure

```
appweave-site/
├── app/
│   ├── blog/
│   │   ├── page.js           # Blog listing
│   │   └── [slug]/page.js    # Single post
│   ├── careers/
│   │   └── [slug]/page.js    # Job details
│   ├── globals.css           # Global styles
│   ├── layout.js             # Root layout
│   └── page.js               # Homepage
├── lib/
│   └── sanity.js             # Sanity client & queries
├── sanity/
│   └── schemas/              # Copy these to Sanity Studio
│       ├── post.js
│       ├── author.js
│       ├── category.js
│       ├── client.js
│       ├── career.js
│       └── index.js
├── .env.example
├── next.config.js
└── package.json
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to [Vercel](https://vercel.com)
3. Add environment variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
4. Deploy

### Sanity Studio

Deploy your Studio to Sanity's hosted service:

```bash
cd your-sanity-studio
npx sanity deploy
```

## Adding Content

1. Open your Sanity Studio
2. Create content:
   - **Clients**: Add company info, logo, description → appears on homepage
   - **Careers**: Add job details → appears on homepage + detail page at `/careers/[slug]`
   - **Blog Posts**: Create authors, categories, then posts → appears at `/blog`

All changes reflect immediately on the website (with CDN caching).
