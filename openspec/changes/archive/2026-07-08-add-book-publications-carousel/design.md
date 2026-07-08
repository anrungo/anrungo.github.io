# Design: add-book-publications-carousel

## Context

Quarto website; homepage `index.qmd` with raw-HTML carousel styled by `assets/site.css` (`.carousel-cc`) and driven by `assets/carousel.js`. Navbar in `_quarto.yml`. Book: *Building Your Analytics Career Journey*, ASIN `B0DS57FNZV`; original cover at `D:\IA\My-Site\Cover.pdf` (print spread: back + spine + front).

**Revision history:** v1 shipped the book as a separate stand-out band with its own carousel plus a navbar "Book" item. The author clarified he wants a single carousel — the book as a slide among the dashboards — and later that the navbar item is redundant (removed; the book lives only in the carousel). The publishing workflow moved into this folder (previously: manual copy of `_site\` to the git clone `D:\GitHub\anrungo.github.io`, branch `master`, served by GitHub Pages at antoniorungo.com; that repo also holds `resume/`, `CNAME`, `.nojekyll`, `robots.txt` which do not come from this project).

## Goals / Non-Goals

**Goals:**
- Book as the first slide of the existing homepage carousel (its only appearance; navbar untouched).
- Cover displayed uncropped; purchase link to clean Amazon URL in a new tab.
- One-command publish from this folder; source under version control; no manual copy step.

**Non-Goals:**
- No JS changes; no autoplay/lazy-loading.
- No dedicated book page.
- No change to how GitHub Pages serves the site (still branch `master` root) and no risk to `resume/`.
- No GitHub Actions CI (possible later evolution).

## Decisions

1. **Book as first slide of the shared carousel.** Grabs attention (visible by default), keeps one uniform component, four dots. Section renamed "Featured work" (contents are no longer only dashboards); the `#dashboards` anchor stays on the heading so the hero CTA keeps working. A navbar "Book" item and `id="book"` anchor existed in an intermediate revision but were removed as redundant — being the first slide, the book is already what visitors see.

2. **`slide--book` CSS modifier.** `object-fit: contain`, centered with padding and a drop shadow so the portrait cover reads as a floating book inside the 16:10 slot; `aspect-ratio: auto; height: 300px` on mobile. Cropping (`cover`) rejected — cuts cover text.

3. **Cover from the author's PDF.** Front cover auto-cropped from the print spread by detecting the gold spine's right edge in pixel columns (pypdfium2 + Pillow); saved as `assets/book-1.jpg` (848×1200, ~170 KB). Amazon CDN hotlink/thumbnail rejected (unstable/lower quality).

4. **Repo layout: two branches, one folder.** This folder becomes the git working copy of `anrungo/anrungo.github.io` with a new `source` branch holding the Quarto source. `master` keeps its current role (published site root, including `resume/`). Alternatives rejected:
   - `quarto publish gh-pages`: overwrites the published branch wholesale → would delete `resume/`.
   - GitHub Actions render+deploy: cleaner long-term but requires handling the externally-produced `resume/` in CI; deferred.
   - Separate source repo: splits history for no benefit.

5. **Deploy via hidden git worktree.** `publish.ps1` maintains `.deploy/` (git worktree of `master`, git-ignored on `source`): render → sync worktree to `origin/master` → copy `_site\*` over it (add/overwrite only — never deletes `resume/`, `CNAME`, `.nojekyll`, `robots.txt`) → commit → push. The old `D:\GitHub\anrungo.github.io` folder is retired.

6. **Clean product URL** `https://www.amazon.com/dp/B0DS57FNZV`, `target="_blank" rel="noopener"`.

## Risks / Trade-offs

- [Book slide pushes dashboards one click away] → Book is slide 1 of 4; dashboards remain one swipe away and the section intro names both.
- [Worktree deploy copies over but never deletes] → Removed pages would linger on `master`; same behavior as the old manual copy. Acceptable; clean up manually if a page is ever retired.
- [Two-branch repo may confuse future tooling] → Documented in README; `source` is the default working branch locally.
- [Push auth] → HTTPS remote uses Windows credential manager (already working on this machine).

## Open Questions

(none)
