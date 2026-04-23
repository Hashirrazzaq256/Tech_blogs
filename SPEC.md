# Blog Platform Specification

## Project Overview
- **Name**: Industrial Blog Platform
- **Type**: Static MDX-based blog with ISR capabilities
- **Core Functionality**: High-performance, accessible blog with reading-focused UX
- **Target Users**: Readers seeking a distraction-free blog experience

## Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Shadcn/UI (Button, Input, Card, Sheet, Dialog, Toast)
- MDX with next-mdx-remote
- Fuse.js (search)
- @vercel/og (OG image generation)
- Buttondown API (newsletter)
- Vercel Analytics

## Design Specification

### Color Palette
- **Background**: `#0A0A0A` (deep charcoal)
- **Surface**: `#141414` (elevated surfaces)
- **Surface Hover**: `#1A1A1A`
- **Border**: `#262626`
- **Text Primary**: `#FAFAFA`
- **Text Secondary**: `#A1A1A1`
- **Text Muted**: `#525252`
- **Accent**: `#D97757` (restrained terracotta)
- **Accent Hover**: `#C96A4C`

### Typography
- **Headings**: Geist Sans (UI), Inter (fallback)
- **Body**: Newsreader (serif), Georgia (fallback)
- **Mono**: Geist Mono, Consolas (fallback)
- **Base Size**: 16px
- **Scale**: 1.25 (minor third)
- **Line Height Body**: 1.75
- **Line Height Heading**: 1.2

### Layout
- **Max Width Content**: 680px (optimal reading)
- **Max Width Site**: 1200px
- **Spacing Unit**: 4px
- **Container Padding**: 24px (mobile), 48px (desktop)

### Components

#### Header
- Fixed position, backdrop blur
- Logo (text-based, Geist)
- Navigation links
- Search toggle (mobile)
- Newsletter button

#### Footer
- Minimal, single row on desktop
- Links, copyright
- Social icons

#### Post Card
- Hover: subtle elevation + accent border-left
- Title, excerpt, date, reading time, category

#### Newsletter Block
- Email input + subscribe button
- Success/error states
- Buttondown integration

#### Search
- Command palette style (⌘K)
- Fuse.js fuzzy search
- Keyboard navigation

#### Post Layout
- Large title
- Metadata row (date, category, reading time)
- MDX content with prose styling
- Table of contents (sticky)
- Previous/next navigation
- Comments (disabled for this config)

### Micro-interactions
- Link underline animation (color: accent)
- Button hover: scale(1.02) + background shift
- Card hover: translateY(-2px) + border-left accent
- Page transitions: fade (150ms)
- Skeleton loading for images

## Features

### Core
1. **MDX Blog Posts** - Content from `/content/posts/*.mdx`
2. **Category System** - Categories from frontmatter
3. **Reading Time** - Calculated from content
4. **Search** - Fuse.js across titles, excerpts, content
5. **Filtering** - By category
6. **Pagination** - Load 6 posts per page

### SEO & Performance
1. **Metadata API** - Dynamic metadata per page
2. **Sitemap** - Auto-generated
3. **RSS Feed** - Atom/RSS
4. **OG Images** - @vercel/og dynamic generation
5. **Vercel Analytics** - Integrated
6. **Image Optimization** - next/image

### Newsletter
1. **Subscription Form** - Buttondown API
2. **Subscribe Page** - Dedicated page
3. **Toast Notifications** - Success/error

## File Structure
```
/(app)
  /blog/[slug]/page.tsx
  /search/page.tsx
  /newsletter/page.tsx
  /page.tsx
  /layout.tsx
/components
  /header.tsx
  /footer.tsx
  /post-card.tsx
  /search-dialog.tsx
  /newsletter-form.tsx
  /mdx-content.tsx
  /og-image.tsx
/lib
  /posts.ts
  /utils.ts
  /search.ts
  /analytics.ts
/content
  /posts/*.mdx
/public
  /favicon.ico
```

## Acceptance Criteria
- [ ] Lighthouse score 100 on Performance, Accessibility, Best Practices, SEO
- [ ] Zero Cumulative Layout Shift (CLS)
- [ ] First Contentful Paint < 1s
- [ ] Time to Interactive < 2s
- [ ] Responsive on all viewports (320px - 2560px)
- [ ] Keyboard accessible
- [ ] Dark mode only (as specified)
- [ ] All external links open in new tab