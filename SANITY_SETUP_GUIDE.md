# Sanity CMS Setup Guide - Step by Step

This guide will walk you through setting up Sanity CMS for your website.

## 📋 Prerequisites

- Node.js installed (v18 or higher)
- A Sanity account (free at https://www.sanity.io)

---

## 🚀 Step-by-Step Setup

### Step 1: Create a Sanity Account and Project

1. **Sign up for Sanity**
   - Go to https://www.sanity.io
   - Click "Get started for free" and create an account

2. **Create a New Project**
   - Once logged in, click "Create project"
   - Enter a project name (e.g., "Appweave Site")
   - Choose an organization (or create one)
   - Select a dataset name (usually "production")
   - Click "Create project"

3. **Get Your Project ID**
   - After creating the project, you'll see your Project ID
   - It looks like: `abc123xyz`
   - Copy this ID - you'll need it in the next step

### Step 2: Configure Environment Variables

1. **Create `.env.local` file**
   - In your project root, create a file named `.env.local`
   - Copy the contents from `.env.local.example`

2. **Add Your Project Details**
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-actual-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

3. **Get API Token (Optional but Recommended)**
   - Go to https://www.sanity.io/manage
   - Select your project
   - Go to "API" → "Tokens"
   - Click "Add API token"
   - Name it (e.g., "Next.js App")
   - Select "Editor" permissions
   - Copy the token and add it to `.env.local`:
     ```env
     SANITY_API_TOKEN=your-token-here
     ```

### Step 3: Install Dependencies

Run this command in your terminal:

```bash
npm install
```

This will install:
- `sanity` - The Sanity Studio framework
- `@sanity/vision` - GROQ query tool for testing queries

### Step 4: Access Sanity Studio

You have two ways to access the Sanity Studio:

#### Option A: Embedded Studio (Recommended)
Access the studio directly in your Next.js app:

1. Start your Next.js dev server:
   ```bash
   npm run dev
   ```

2. Open your browser and go to:
   ```
   http://localhost:3000/studio
   ```

#### Option B: Standalone Studio
Run the studio on a separate port:

1. Run the studio command:
   ```bash
   npm run studio
   ```

2. Open your browser and go to:
   ```
   http://localhost:3333
   ```

### Step 5: First Login

1. When you first open the studio, you'll be asked to log in
2. Use your Sanity account credentials
3. You'll be redirected back to the studio

### Step 6: Create Your First Content

Now you can start creating content! Your schemas are already set up:

1. **Authors** - Create author profiles
2. **Blog Posts** - Write blog posts
3. **Categories** - Organize your content
4. **Products** - Showcase your products
5. **Careers** - List job openings
6. **Clients** - Display client testimonials

---

## 📁 Project Structure

```
website/
├── app/
│   └── studio/          # Sanity Studio route (accessible at /studio)
├── lib/
│   └── sanity.js        # Sanity client configuration & queries
├── sanity/
│   └── schemas/         # Your content schemas
│       ├── author.js
│       ├── post.js
│       ├── category.js
│       ├── product.js
│       ├── career.js
│       ├── client.js
│       └── index.js
├── sanity.config.js     # Sanity Studio configuration
└── .env.local           # Your environment variables (not in git)
```

---

## 🔧 Understanding Your Schemas

### Author Schema (`sanity/schemas/author.js`)
- **Name** - Author's full name
- **Slug** - URL-friendly identifier
- **Image** - Author profile picture
- **Bio** - Author biography

### Post Schema (`sanity/schemas/post.js`)
- **Title** - Blog post title
- **Slug** - URL-friendly identifier
- **Author** - Reference to an author
- **Main Image** - Featured image
- **Categories** - Array of category references
- **Published At** - Publication date
- **Excerpt** - Short description
- **Body** - Rich text content (supports images, code blocks, etc.)

---

## 🔍 Testing Your Setup

1. **Create a Test Author**
   - Go to `/studio` in your browser
   - Click "Author" in the sidebar
   - Click "Create new"
   - Fill in the fields and save

2. **Create a Test Blog Post**
   - Click "Blog Post" in the sidebar
   - Click "Create new"
   - Fill in the title, select an author, add content
   - Publish it

3. **Verify in Your App**
   - Check your blog page at `/blog`
   - Your new post should appear!

---

## 🐛 Troubleshooting

### "Project ID not found" Error
- Make sure `.env.local` exists and has the correct `NEXT_PUBLIC_SANITY_PROJECT_ID`
- Restart your dev server after adding environment variables

### Studio Won't Load
- Check that all dependencies are installed: `npm install`
- Make sure your Project ID is correct
- Try clearing your browser cache

### Can't See Content in Your App
- Verify your queries in `lib/sanity.js` match your schema
- Check that content is published (not just saved as draft)
- Ensure your environment variables are set correctly

---

## 📚 Next Steps

1. **Customize Your Studio**
   - Edit `sanity.config.js` to customize the studio appearance
   - Add custom plugins if needed

2. **Add More Schemas**
   - Create new schema files in `sanity/schemas/`
   - Export them in `sanity/schemas/index.js`

3. **Learn GROQ**
   - GROQ is Sanity's query language
   - Check out: https://www.sanity.io/docs/groq
   - Test queries in the Vision tool (accessible in Studio)

4. **Deploy**
   - When deploying, make sure to add your environment variables to your hosting platform
   - The studio will be accessible at `yourdomain.com/studio`

---

## 🆘 Need Help?

- **Sanity Documentation**: https://www.sanity.io/docs
- **Sanity Community**: https://slack.sanity.io
- **Next.js + Sanity Guide**: https://www.sanity.io/docs/js-client

---

## ✅ Checklist

- [ ] Created Sanity account
- [ ] Created Sanity project
- [ ] Got Project ID
- [ ] Created `.env.local` file with Project ID
- [ ] Installed dependencies (`npm install`)
- [ ] Started dev server (`npm run dev`)
- [ ] Accessed studio at `http://localhost:3000/studio`
- [ ] Logged into Sanity
- [ ] Created first author
- [ ] Created first blog post
- [ ] Verified content appears on website

---

**You're all set! Happy content creating! 🎉**
