# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Project Overview

Bilingual (Japanese/English) personal portfolio site built with Astro 5, Tailwind CSS v4, and TypeScript. Deployed to Cloudflare Workers at `https://portfolio.yuheiyamada.workers.dev`.

## Commands

- `task dev` — Start dev server (localhost:4321, hot reload)
- `task build` — Production build to `dist/`
- `task preview` — Build and preview production output locally
- `task deploy` — Verify Wrangler authentication, build, and deploy to Cloudflare Workers
- `task deploy:dry-run` — Build and validate the Cloudflare deployment without publishing

No test runner or linter is configured.

## Architecture

- **Astro 5** static site with file-based routing (`src/pages/`)
- **i18n**: Astro's built-in i18n routing, configured in `astro.config.mjs` (locales `ja` (default) and `en`, `prefixDefaultLocale: false`). Japanese is served at `/`, English at `/en/`, and `public/_redirects` permanently redirects the legacy `/ja` routes to `/`.
- **Pages**: `src/pages/index.astro` and `src/pages/en/index.astro` are thin wrappers that render `<PortfolioPage lang="…" />`. All page markup lives in `src/components/PortfolioPage.astro`.
- **Content lives in data, not markup**:
  - `src/i18n/translations.ts` — UI strings per locale, typed by `PortfolioTranslations` (`src/i18n/types.ts`)
  - `src/data/portfolio.ts` — education, work experience, awards, publications, and social links. Localized fields use `LocalizedText` (`Record<Locale, string>`).
  - Add new entries to these files rather than to `.astro` markup.
- **Layout**: Single `Layout.astro` wraps all pages with meta tags, canonical and `hreflang` alternates (via `getAbsoluteLocaleUrl`), Google Fonts (Inter + Noto Sans JP), and global CSS
- **Components**: `Navbar.astro` (responsive, `lang` prop, locale switch via `getRelativeLocaleUrl`), `Timeline.astro` (shared timeline markup used by Education / Work Experience / Awards), `ContactForm.astro`, and `Footer.astro`
- **Contact form**: posts to `PUBLIC_CONTACT_FORM_ENDPOINT` (see `.env.example`). When unset, the form renders disabled with a "not configured" message.
- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite` plugin; custom styles in `src/styles/global.css` (gradients, nav blur effects, card shadows)
- **Client-side JS**: Vanilla DOM manipulation only (mobile menu toggle, scroll-triggered nav styling) — no JS framework

## Deployment

Cloudflare Workers Static Assets deployment is configured in `wrangler.jsonc`. Cloudflare Builds uses `npm run build` and `npx wrangler deploy`; use `task deploy` for a manual deployment.

**Important config**: `astro.config.mjs` sets `site: 'https://portfolio.yuheiyamada.workers.dev'` and `base: '/'`. `public/_redirects` contains redirects handled natively by Cloudflare Workers Static Assets.

`PUBLIC_CONTACT_FORM_ENDPOINT` is injected at build time from a Cloudflare Builds variable of the same name; it is not committed (`.env` is gitignored).
