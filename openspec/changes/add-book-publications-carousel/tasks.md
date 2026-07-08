# Tasks: add-book-publications-carousel

## 1. Assets

- [x] 1.1 Convert page 1 of `D:\IA\My-Site\Cover.pdf` to `assets/book-1.jpg` (~1200px long edge; try ImageMagick `magick -density 150 ... [0]`, else `pdftoppm`)
- [x] 1.2 Verify the cover is sharp at display size (roughly 600px wide) and reasonably lightweight (< ~300 KB)

## 2. Navbar (`_quarto.yml`)

- [x] 2.1 Add a "Book" navbar item between "Projects" and "Dashboards" pointing to the homepage section anchor (`index.qmd#book`)

## 3. Homepage markup (`index.qmd`)

- [x] 3.1 Add the "My Book" section between the About Me content and the "Featured dashboards" `.sec-head`, wrapped in a stand-out band container with `id="book"`
- [x] 3.2 Inside the band, add a `{=html}` block with a `.carousel-cc` carousel (`data-carousel`, `data-track`, `data-prev`, `data-next`, `data-dots`) containing one `article.slide.slide--book`: cover image `assets/book-1.jpg`, kicker (e.g., "Book · Career Guide"), title "Building Your Analytics Career Journey", short description, and a "Buy on Amazon" link to `https://www.amazon.com/dp/B0DS57FNZV` with `target="_blank" rel="noopener"`

## 4. Styling (`assets/site.css`)

- [x] 4.1 Add `.book-band` stand-out band rules (distinct background band, spacing, consistent with the site's palette and `.contact-band` visual language)
- [x] 4.2 Add `.slide--book` modifier rules: `object-fit: contain` for the cover image, neutral background/padding on the image slot so the portrait cover displays uncropped within the 16:10 slot
- [x] 4.3 Add `scroll-margin-top` on `#book` so the anchor doesn't hide under the pinned navbar
- [x] 4.4 Check the mobile breakpoint (≤720px single-column slide) renders the cover fully visible with sensible height

## 5. Render & verify

- [x] 5.1 Run `quarto render` (or `quarto preview`) and confirm the section order: Hero → About Me → My Book → Featured dashboards → Contact band
- [x] 5.2 Confirm the navbar shows Programming · Teaching · Projects · Book · Dashboards · Contact on every page, and that clicking "Book" from another page (e.g., projects) lands on the section correctly
- [x] 5.3 Verify both carousels initialize independently (navigate dashboards carousel; book carousel unaffected) and the Amazon link opens the product page in a new tab
- [x] 5.4 Spot-check desktop and narrow viewport: band stands out, cover uncropped in both layouts

## 6. Scope revision: single carousel (book merged into dashboards carousel)

- [ ] 6.1 Remove the "My Book" band from `index.qmd`; add the book as the first slide of the existing carousel; rename section to "Featured work" keeping the `#dashboards` anchor; move `id="book"` to the carousel div
- [ ] 6.2 Trim CSS: drop `.book-band` rules, keep `#book` scroll margin and `.slide--book` cover rules
- [ ] 6.3 Render and verify: one carousel with 4 slides (book first, 4 dots), cover uncropped, navbar anchor lands on the carousel

## 7. Publishing workflow in the source folder

- [ ] 7.1 `git init` this folder, create `source` branch, add `.gitignore` (`_site/`, `.quarto/`, `.deploy/`), add remote `anrungo/anrungo.github.io`, fetch
- [ ] 7.2 Rewrite `publish.ps1` to deploy via a `.deploy/` git worktree of `master` (render → sync worktree → copy `_site\*` over it → commit → push), preserving `resume/`, `CNAME`, `.nojekyll`, `robots.txt`
- [ ] 7.3 Commit the source on `source` and push to origin
- [ ] 7.4 Run `publish.ps1`, confirm the site is live with the merged carousel, and update `README.md` with the new workflow
