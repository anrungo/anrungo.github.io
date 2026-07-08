# Proposal: add-book-publications-carousel

## Why

Antonio published the book *Building Your Analytics Career Journey* (Amazon, ASIN `B0DS57FNZV`), but the site had no trace of it. The book must be featured on the homepage and reachable from the navbar on every page.

> **Scope revision (2026-07-08):** the initial version shipped the book as a separate stand-out band with its own carousel. The author then clarified he wants a **single carousel**: the book as a slide inside the existing dashboards carousel. The navbar "Book" item stays. Additionally, the publishing workflow moves into this folder (git + deploy), replacing the manual copy to `D:\GitHub\anrungo.github.io`.

## What Changes

- Add a **"Book"** navbar item (`_quarto.yml`), between **Projects** and **Dashboards**, linking to the homepage carousel anchor (`index.qmd#book`).
- The book becomes the **first slide** of the existing homepage carousel (`index.qmd`), alongside the three dashboard slides — one carousel, four slides. Section renamed "Featured dashboards" → **"Featured work"** (it no longer contains only dashboards); the `#dashboards` anchor is kept so the hero CTA still works.
- Book slide: cover image, kicker, title, short description, and a **"Buy on Amazon →"** link opening `https://www.amazon.com/dp/B0DS57FNZV` in a new tab (clean URL, no tracking parameters).
- Cover image `assets/book-1.jpg` produced from the author's `D:\IA\My-Site\Cover.pdf` (front cover auto-cropped from the print spread).
- CSS: `.slide--book` modifier so the portrait cover renders uncropped (`object-fit: contain`, centered, drop shadow); `#book` scroll margin for the navbar anchor.
- **Publishing workflow**: this folder becomes the git repository (branch `source` on `anrungo/anrungo.github.io`); `publish.ps1` renders and deploys the `master` branch via a local git worktree — the manual copy to `D:\GitHub\anrungo.github.io` is retired.

## Capabilities

### New Capabilities
- `publications-section`: The book featured as a slide in the homepage carousel with a purchase link to Amazon, plus a navbar entry between Projects and Dashboards.

### Modified Capabilities

(none — no existing specs covered the carousel)

## Impact

- `_quarto.yml` — navbar item.
- `index.qmd` — book slide added to the existing carousel; section heading/intro updated; `id="book"` anchor on the carousel.
- `assets/site.css` — `.slide--book` rules and `#book` scroll margin.
- `assets/book-1.jpg` — new asset.
- `assets/carousel.js` — **no changes**.
- `publish.ps1`, `.gitignore`, `README.md` — publishing workflow now lives in this folder.
