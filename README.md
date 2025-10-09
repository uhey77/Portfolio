Yuhei Yamada Portfolio (JA/EN)
==============================

Live Site
---------
- GitHub Pages: https://uhey77.github.io/Portfolio/

Overview
--------
- Static HTML/CSS/JS only — no build step required.
- Bilingual routing via sibling directories: `/ja/...` and `/en/...`.
- Shared design system with animated page transitions, particle background, and scroll-triggered reveals.

Getting Started
---------------
1. Clone this repository and open the project root (`portfolio/`).
2. Open `index.html` or any language page directly in your browser, _or_ run a lightweight static server:
   ```bash
   python3 -m http.server
   ```
   Then visit `http://localhost:8000`.

Content Editing
---------------
- Update copy within `ja/` and `en/` directories to reflect the latest profile information.
- Replace placeholder counts inside the stats sections on both top pages (`ja/index.html`, `en/index.html`) when needed.
- Populate the timeline entries in `about/` pages with real milestones.
- Place your resumes in a `resume/` directory as `yuhei-yamada-ja.pdf` and `yuhei-yamada-en.pdf` and update links if the filenames differ.
- Swap `assets/favicon.svg` with your own icon if desired.

Project Structure
-----------------
- `index.html`: Language selector (JA/EN) with transitions.
- `ja/`, `en/`: Localized content (`index`, `works`, `about`, `contact`).
- `assets/styles.css`: Global styling including background effects and components.
- `assets/scripts.js`: Page transitions, particle background, reveal animations, and stat counters.
- `resume/`: (Optional) place downloadable PDF resumes here.

Deployment
----------
**GitHub Pages**
1. Push this directory to your GitHub repository (keep it at the repo root for simplicity).
2. In GitHub → Settings → Pages, choose branch `main` and folder `/ (root)`.
3. Wait for GitHub Pages to publish. The deployed site will be available at `https://<username>.github.io/<repo>/` (currently hosted at https://uhey77.github.io/Portfolio/).

**Vercel or Other Static Hosts**
1. Import the repository.
2. Framework preset: `Other`.
3. Output directory: `/`.
4. Deploy and attach a custom domain if needed.

Notes & Maintenance
-------------------
- Language toggle buttons link directly to localized counterparts.
- Works pages include placeholder cards — replace with real projects over time.
- Contact pages aggregate GitHub, Zenn, Qiita, Kaggle, and email links.
- Particle background and animations are lightweight but can be disabled by removing `assets/scripts.js` from each HTML page if necessary.
