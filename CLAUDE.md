# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Bilingual (Japanese/English) personal portfolio site built with Astro 5, Tailwind CSS v4, and TypeScript. Deployed to GitHub Pages at `https://uhey77.github.io/Portfolio`.

## Commands

- `npm run dev` — Start dev server (localhost:4321, hot reload)
- `npm run build` — Production build to `dist/`
- `npm run preview` — Preview production build locally

No test runner or linter is configured.

## Architecture

- **Astro 5** static site with file-based routing (`src/pages/`)
- **Root route** (`index.astro`) redirects to `/ja/` (Japanese default)
- **Bilingual pages**: `ja.astro` and `en.astro` are separate files with hardcoded content (no i18n library)
- **Layout**: Single `Layout.astro` wraps all pages with meta tags, Google Fonts (Inter + Noto Sans JP), and global CSS
- **Components**: `Navbar.astro` (responsive, accepts `lang` prop for JA/EN switching) and `Footer.astro`
- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite` plugin; custom styles in `src/styles/global.css` (gradients, nav blur effects, card shadows)
- **Client-side JS**: Vanilla DOM manipulation only (mobile menu toggle, scroll-triggered nav styling) — no JS framework

## Deployment

GitHub Actions workflow (`.github/workflows/deploy.yml`) auto-deploys to GitHub Pages on push to `main`. Uses `withastro/action@v3`.

**Important config**: `astro.config.mjs` sets `site: 'https://uhey77.github.io'` and `base: '/Portfolio'` — all paths must account for this base path.
