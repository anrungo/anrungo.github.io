# Proposal: add-book-publications-carousel

## Why

Antonio published the book *Building Your Analytics Career Journey* (Amazon, ASIN `B0DS57FNZV`), but the site had no trace of it. The book must be featured on the homepage and reachable from the navbar on every page.

> **Scope revision (2026-07-08):** the initial version shipped the book as a separate stand-out band with its own carousel plus a navbar "Book" item. The author then clarified he wants a **single carousel** (the book as a slide inside the existing dashboards carousel) and, in a second revision, that the navbar "Book" item is redundant and should be removed. Additionally, the publishing workflow moves into this folder (git + deploy), replacing the manual copy to `D:\GitHub\anrungo.github.io`.

## What Changes

- The book becomes the **first slide** of the existing homepage carousel (`index.qmd`), alongside the three dashboard slides — one carousel, four slides. Section renamed "Featured dashboards" → **"Featured work"** (it no longer contains only dashboards); the `#dashboards` anchor is kept so the hero CTA still works.
- The navbar is left **unchanged** (no "Book" item — added in an intermediate revision, then removed as redundant).
- Book slide: cover image, kicker, title, short description, and a **"Buy on Amazon →"** link opening `https://www.amazon.com/dp/B0DS57FNZV` in a new tab (clean URL, no tracking parameters).
- Cover image `assets/book-1.jpg` produced from the author's `D:\IA\My-Site\Cover.pdf` (front cover auto-cropped from the print spread).
- CSS: `.slide--book` modifier so the portrait cover renders uncropped (`object-fit: contain`, centered, drop shadow).
- **Publishing workflow**: this folder becomes the git repository (branch `source` on `anrungo/anrungo.github.io`); `publish.ps1` renders and deploys the `master` branch via a local git worktree — the manual copy to `D:\GitHub\anrungo.github.io` is retired.

## Capabilities

### New Capabilities
- `publications-section`: The book featured as a slide in the homepage carousel with a purchase link to Amazon.

### Modified Capabilities

(none — no existing specs covered the carousel)

## Impact

- `_quarto.yml` — unchanged in the final state (navbar item added and later removed).
- `index.qmd` — book slide added to the existing carousel; section heading/intro updated.
- `assets/site.css` — `.slide--book` rules.
- `assets/book-1.jpg` — new asset.
- `assets/carousel.js` — **no changes**.
- `publish.ps1`, `.gitignore`, `README.md` — publishing workflow now lives in this folder.
