# CHD Travel - Frontend

Frontend application for CHD Travel built with **SvelteKit**, **Svelte 5 Runes**, **TypeScript**, and **Tailwind CSS**, connecting to a **Sanity.io v3 Headless CMS** backend.

## 🚀 Tech Stack

- **Framework**: [SvelteKit 2](https://kit.svelte.dev/) with **Svelte 5 Runes**
- **Hosting / Adapter**: `@sveltejs/adapter-cloudflare` (Server-Side Rendering on Cloudflare Pages / Workers)
- **CMS / Data Source**: [Sanity v3](https://www.sanity.io/) with `@sanity/client` and `@sanity/image-url`
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom earth-tone design tokens (`moss`, `sand`, `terracotta`)
- **Forms & Validation**: `sveltekit-superforms` & `zod`
- **Testing Framework**: [Vitest](https://vitest.dev/) (Unit tests for Zod validation, pricing math & utils) & [Playwright](https://playwright.dev/) (E2E tests for i18n navigation & SEO metadata)
- **Email Service**: Resend API integration with verified domain (`noreply@chdtravel.com`) and automated client confirmation emails
- **SEO & Performance**: SSR Meta Tags, Dynamic Sitemap (`/sitemap.xml`), `robots.txt`, JSON-LD Structured Data (Tours, Breadcrumbs, Article schema), and `hreflang` tags

## 📂 Project Structure

```
front-end/
├── e2e/                 # Playwright E2E test suites (navigation, i18n, SEO)
├── src/
│   ├── lib/
│   │   ├── modules/     # Feature modules (home-page, tour-page, blog-page, contact-page, nav-bar)
│   │   ├── base/        # Base UI components (Button, SEO, JSON-LD, Footer, Modal, etc.)
│   │   ├── server/      # Server-only utilities (email, sanity client)
│   │   ├── stores/      # Reactive state stores (exchange rates, modals, nav, SEO)
│   │   └── utils/       # Formatters, helpers, form-schema, unit tests (*.test.ts)
│   ├── routes/
│   │   ├── [lang]/      # Multilingual routes (vn, en, fr)
│   │   │   ├── [tourtype]/  # Dynamic tour categories & [slug] tour details
│   │   │   ├── blog/        # CHD Journal & [slug] article details
│   │   │   └── contact/     # Contact & tour inquiry form
│   │   ├── sitemap.xml/ # Dynamic XML Sitemap endpoint
│   │   └── robots.txt/  # Dynamic robots.txt endpoint
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
VITE_SANITY_ID=uzyjbxdd
EXCHANGE_URL=https://v6.exchangerate-api.com/v6/
EXCHANGE_API_KEY=your_exchange_api_key
SANITY_WRITE_TOKEN=""
RESEND_API_KEY=your_resend_api_key
NOTIFY_EMAIL=info@chdtravel.com
DISCORD_WEBHOOK_URL=your_discord_webhook_url
```

### Commands

```bash
pnpm dev          # Start local dev server
pnpm build        # Build for Cloudflare Pages
pnpm check        # Run svelte-check type checking
pnpm lint         # Run ESLint and Prettier checks
pnpm format       # Run Prettier auto-formatting
pnpm test         # Run unit test suite (Vitest)
pnpm test:unit    # Run unit tests
pnpm test:e2e     # Run end-to-end tests (Playwright)
```
