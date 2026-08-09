# Graph Report - .  (2026-08-04)

## Corpus Check
- Corpus is ~13,130 words - fits in a single context window. You may not need a graph.

## Summary
- 205 nodes · 242 edges · 26 communities (18 shown, 8 thin omitted)
- Extraction: 86% EXTRACTED · 13% INFERRED · 1% AMBIGUOUS · INFERRED: 32 edges (avg confidence: 0.84)
- Token cost: 146,358 input · 0 output

## Community Hubs (Navigation)
- Content-Fetching Page Routes
- CMS Docs and Schema Concepts
- Package Metadata and Scripts
- Runtime Dependencies
- Sanity Studio Schema Definitions
- Sanity Client and Environment Config
- Dark Logo Brand Asset
- Light Logo Brand Asset
- Primary Logo Lockup
- Product OG Image Generation
- Blog OG Image Generation
- Root Layout and Theme Toggle
- Contact Route Metadata
- Site-Wide OG Image
- Privacy Policy Page
- Terms of Service Page
- JS Path Alias Config
- Next Build Configuration

## God Nodes (most connected - your core abstractions)
1. `urlFor()` - 13 edges
2. `client` - 7 edges
3. `Appweave Labs Website (Next.js 15 + Sanity)` - 7 edges
4. `schemaTypes/index.js Schema Registry` - 6 edges
5. `Appweave Dark Logo Lockup (696x163 SVG)` - 6 edges
6. `AppWeave Full Logo Lockup (logo.svg)` - 6 edges
7. `HomePage()` - 5 edges
8. `scripts` - 5 edges
9. `lib/sanity.js - Sanity Client & GROQ Queries` - 5 edges
10. `Woven Chevron Diamond Icon Mark` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Sanity CMS Setup Guide (Step by Step)` --semantically_similar_to--> `Appweave Labs Website (Next.js 15 + Sanity)`  [INFERRED] [semantically similar]
  SANITY_SETUP_GUIDE.md → README.md
- `product.js - Product Showcase Schema` --shares_data_with--> `schemaTypes/index.js Schema Registry`  [AMBIGUOUS]
  SANITY_SETUP_GUIDE.md → README.md
- `Embedded Studio at /studio (Option A, recommended)` --semantically_similar_to--> `Standalone Sanity Studio as Separate Project`  [INFERRED] [semantically similar]
  SANITY_SETUP_GUIDE.md → README.md
- `Standalone Studio on Port 3333 (Option B)` --semantically_similar_to--> `Standalone Sanity Studio as Separate Project`  [INFERRED] [semantically similar]
  SANITY_SETUP_GUIDE.md → README.md
- `lib/sanity.js - Sanity Client & GROQ Queries` --implements--> `GROQ - Sanity Query Language`  [INFERRED]
  README.md → SANITY_SETUP_GUIDE.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Sanity Content Schemas Registered in schemaTypes Index** — readme_post_schema, readme_author_schema, readme_category_schema, readme_client_schema, readme_career_schema, sanity_setup_guide_product_schema, readme_schema_types_index [EXTRACTED 1.00]
- **Sanity Environment Configuration and Client Bootstrap Flow** — sanity_setup_guide_env_local_file, readme_env_sanity_project_id, readme_env_sanity_dataset, sanity_setup_guide_sanity_api_token, readme_lib_sanity_client_queries, sanity_setup_guide_sanity_config [INFERRED 0.85]
- **Studio Route Exposure and SEO Crawl Exclusion** — sanity_setup_guide_embedded_studio_route, public_robots_disallow_studio, public_robots_robots_txt_policy, readme_sanity_studio_hosted_deploy [INFERRED 0.85]
- **Appweave Dark Logo Lockup Composition** — public_logo_dark_logo, public_logo_dark_icon_mark, public_logo_dark_wordmark, public_logo_dark_tagline [EXTRACTED 1.00]
- **Dark-Theme Fill Class System (st0/st1/st2)** — public_logo_dark_st0_accent_red, public_logo_dark_st1_neutral_gray, public_logo_dark_st2_white, public_logo_dark_brand_palette, public_logo_dark_dark_surface_variant [EXTRACTED 1.00]
- **Appweave logo lockup: icon mark + wordmark + tagline sharing one brand palette** — public_logo_light_icon_mark, public_logo_light_wordmark, public_logo_light_tagline, public_logo_light_brand_palette [EXTRACTED 1.00]
- **AppWeave logo lockup: mark + wordmark + divider + tagline share one palette and baseline grid** — public_logo_woven_chevron_mark, public_logo_appweave_wordmark, public_logo_divider_rule, public_logo_tagline_weaving_innovation_into_apps, public_logo_brand_palette [EXTRACTED 1.00]

## Communities (26 total, 8 thin omitted)

### Community 0 - "Content-Fetching Page Routes"
Cohesion: 0.09
Nodes (28): BlogPage(), formatDate(), getPosts(), metadata, formatDate(), generateMetadata(), getPost(), portableTextComponents (+20 more)

### Community 1 - "CMS Docs and Schema Concepts"
Cohesion: 0.13
Nodes (22): Disallow /studio/ from Crawlers, robots.txt Crawl Policy, Sitemap Declaration (appweave.tech/sitemap.xml), Appweave Labs Website (Next.js 15 + Sanity), author.js - Blog Author Schema, Blog Feature (rich text, images, code blocks, authors, categories), career.js - Job Listing Schema, Careers / Job Listings Feature (+14 more)

### Community 2 - "Package Metadata and Scripts"
Cohesion: 0.10
Nodes (19): @next/bundle-analyzer, author, description, devDependencies, @next/bundle-analyzer, @sanity/vision, directories, lib (+11 more)

### Community 3 - "Runtime Dependencies"
Cohesion: 0.11
Nodes (19): next, next-sanity, @next/third-parties, dependencies, next, next-sanity, @next/third-parties, @portabletext/react (+11 more)

### Community 5 - "Sanity Client and Environment Config"
Cohesion: 0.19
Nodes (13): CDN Caching / Immediate Content Reflection, NEXT_PUBLIC_SANITY_DATASET env var, NEXT_PUBLIC_SANITY_PROJECT_ID env var, lib/sanity.js - Sanity Client & GROQ Queries, Sanity CMS Integration, Vercel Deployment (recommended), Troubleshooting: Content Not Visible in App (draft vs published), .env.local Environment File (gitignored) (+5 more)

### Community 6 - "Dark Logo Brand Asset"
Cohesion: 0.36
Nodes (11): Appweave Brand Palette (red #cc2411, gray #7d7c7a, white #fff), Dark-Surface Logo Variant Decision (hardcoded white/red fills instead of currentColor so the mark stays legible on dark backgrounds; requires a separate light-theme asset rather than one adaptive file), Woven Chevron Diamond Icon Mark, Adobe Illustrator 30.1.0 SVG Export Toolchain, Appweave Dark Logo Lockup (696x163 SVG), st0 Accent Red Fill (#cc2411), st1 Neutral Gray Fill (#7d7c7a), st2 White Fill (#fff) (+3 more)

### Community 7 - "Light Logo Brand Asset"
Cohesion: 0.31
Nodes (9): Appweave Light-Theme Logo Lockup, Brand Palette: crimson #cc2411 (st0), warm grey #7d7c7a (st1), near-black #0a0a0a (st2), Woven Chevron Icon Mark (8 diagonal blade paths), Adobe Illustrator 30.1.0 SVG Export (SVG 1.1, Build 136), Light-theme variant strategy: dark ink fills (#0a0a0a, #7d7c7a) hard-coded for use on light backgrounds, implying a paired dark-theme asset rather than a single currentColor-driven logo, Outlined-text asset pattern: all lettering exported as vector <path> data, no <text> nodes or font dependency, Tagline glyph row reading approximately 'WEAVING INNOVATION INTO APPS', Interlocking-diagonal weave motif (paths outline alternating over/under chevron strands) (+1 more)

### Community 8 - "Primary Logo Lockup"
Cohesion: 0.43
Nodes (8): AppWeave Full Logo Lockup (logo.svg), APPWEAVE Wordmark (reversed "APP" on dark block + gray "WEAVE"), Brand Palette: near-black #0A0A08, warm gray #7D7C7A, white #FFFFFF, Horizontal Divider Rule Separating Wordmark from Tagline, Tagline: WEAVING INNOVATION INTO APPS, Static SVG Vector Brand Asset in public/, Weave Motif as Brand Metaphor, Woven Chevron/Arrow Glyph Mark

### Community 9 - "Product OG Image Generation"
Cohesion: 0.40
Nodes (5): getProduct(), Image(), size, statusColors, statusLabels

### Community 10 - "Blog OG Image Generation"
Cohesion: 0.67
Nodes (3): getPost(), Image(), size

## Ambiguous Edges - Review These
- `schemaTypes/index.js Schema Registry` → `product.js - Product Showcase Schema`  [AMBIGUOUS]
  SANITY_SETUP_GUIDE.md · relation: shares_data_with
- `Dark-Surface Logo Variant Decision (hardcoded white/red fills instead of currentColor so the mark stays legible on dark backgrounds; requires a separate light-theme asset rather than one adaptive file)` → `Adobe Illustrator 30.1.0 SVG Export Toolchain`  [AMBIGUOUS]
  public/logo-dark.svg · relation: conceptually_related_to
- `Appweave Light-Theme Logo Lockup` → `Tagline glyph row reading approximately 'WEAVING INNOVATION INTO APPS'`  [AMBIGUOUS]
  public/logo-light.svg · relation: references

## Knowledge Gaps
- **49 isolated node(s):** `size`, `portableTextComponents`, `metadata`, `metadata`, `metadata` (+44 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `schemaTypes/index.js Schema Registry` and `product.js - Product Showcase Schema`?**
  _Edge tagged AMBIGUOUS (relation: shares_data_with) - confidence is low._
- **What is the exact relationship between `Dark-Surface Logo Variant Decision (hardcoded white/red fills instead of currentColor so the mark stays legible on dark backgrounds; requires a separate light-theme asset rather than one adaptive file)` and `Adobe Illustrator 30.1.0 SVG Export Toolchain`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Appweave Light-Theme Logo Lockup` and `Tagline glyph row reading approximately 'WEAVING INNOVATION INTO APPS'`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._
- **Why does `dependencies` connect `Runtime Dependencies` to `Package Metadata and Scripts`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **Why does `Appweave Labs Website (Next.js 15 + Sanity)` connect `CMS Docs and Schema Concepts` to `Sanity Client and Environment Config`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **What connects `size`, `portableTextComponents`, `metadata` to the rest of the system?**
  _49 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Content-Fetching Page Routes` be split into smaller, more focused modules?**
  _Cohesion score 0.09388335704125178 - nodes in this community are weakly interconnected._