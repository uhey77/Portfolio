Portfolio (JA/EN) — Yuhei Yamada

Overview
- Static, no build tools. Easy to host on GitHub Pages or Vercel.
- Bilingual structure using folder routing: `/ja/...` and `/en/...`.

Edit Me First
- Update texts in `ja/` and `en/` pages.
- Replace resume links with your actual PDFs in `resume/` (create folder).
- Replace favicon in `assets/favicon.svg` if you like.

Structure
- `ja/`: Japanese pages (`index`, `works`, `about`, `contact`).
- `en/`: English pages (same paths).
- `assets/`: Shared CSS and assets.
- `resume/`: Put `yuhei-yamada-ja.pdf` and `yuhei-yamada-en.pdf` here later.

Local Preview
- Open any HTML file in a browser.
- Or use a static server, e.g. `python3 -m http.server` from `portfolio/`.

Deploy: GitHub Pages
1) Create a repo and push this `portfolio/` directory (or make it the repo root).
2) GitHub → Settings → Pages → Deploy from `main`/`root`.
3) The site will be available at `https://<username>.github.io/<repo>/`.

Deploy: Vercel
1) Import the repo in Vercel.
2) Framework preset: `Other` (static). Output directory: `/`.
3) Deploy. Add a custom domain later if desired.

Notes
- Language toggle is simple: links between JA and EN counterparts.
- Works page includes three placeholder cards to expand later.
 - Update email/GitHub in `contact` pages if needed.
