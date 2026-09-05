# CHD Travel - Frontend

Frontend application for CHD Travel built with **SvelteKit**, **Svelte 5 Runes**, **TypeScript**, and **Tailwind CSS**, connecting to a **Sanity.io v3 Headless CMS** backend.

## 🚀 Tech Stack

- **Framework**: [SvelteKit 2](https://kit.svelte.dev/) with **Svelte 5 Runes**
- **Hosting / Adapter**: `@sveltejs/adapter-cloudflare` (Server-Side Rendering on Cloudflare Pages / Workers)
- **CMS / Data Source**: [Sanity v3](https://www.sanity.io/) with `@sanity/client` and `@sanity/image-url`
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom earth-tone design tokens (`moss`, `sand`, `terracotta`)
- **Forms & Validation**: `sveltekit-superforms` & `zod`
- **Email Service**: Resend API integration via server endpoints
- **SEO & Performance**: SSR Meta Tags, Dynamic Sitemap (`/sitemap.xml`), `robots.txt`, and JSON-LD Structured Data

## 📂 Project Structure

```
front-end/
├── src/
│   ├── lib/
│   │   ├── modules/         # Feature modules (tour-page, blog-page, home-page, contact-page)
│   │   ├── shared/          # Base UI components (Header, Footer, Lightbox, etc.)
│   │   ├── server/          # Server-only utilities (email, sanity client)
│   │   ├── services/        # Sanity client & queries
│   │   ├── stores/          # Reactive stores (language, currency, SEO)
│   │   └── utils/           # Formatters, helpers, currency conversion
│   ├── routes/
│   │   ├── [lang]/          # Multilingual routes (vi, en, fr, de, it, ja, etc.)
│   │   │   ├── [tourtype]/  # Dynamic tour categories & [slug] tour details
│   │   │   ├── blog/        # Blog list & [slug] blog details
│   │   │   └── contact/     # Contact & tour inquiry form
│   │   ├── sitemap.xml/     # Dynamic XML Sitemap endpoint
│   │   └── robots.txt/      # Dynamic robots.txt endpoint
│   └── app.html
```

## 🛠️ Development

### Prerequisites
- Node.js >= 18
- pnpm >= 8

### Setup
```bash
# Install dependencies from root or front-end directory
pnpm install

# Configure environment variables
cp .env.example .env
```

### Environment Variables
```env
PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
PUBLIC_SANITY_DATASET=production
PUBLIC_SANITY_API_VERSION=2023-05-03
RESEND_API_KEY=your_resend_api_key
NOTIFY_EMAIL=info@chdtravel.com
PUBLIC_SITE_URL=https://chdtravel.com
```

### Commands
```bash
pnpm dev          # Start local dev server
pnpm build        # Build for Cloudflare Pages
pnpm check        # Run svelte-check type checking
pnpm lint         # Run ESLint checks
pnpm format       # Run Prettier formatting
```
