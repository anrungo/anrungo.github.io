## 1. Edit source

- [x] 1.1 In `index.qmd`, change the hero CTA (line ~25) from `[Download CV](assets/cv.pdf){.btn-cc .ghost target="_blank"}` to `[Curriculum Vitae](https://anrungo.github.io/resume/){.btn-cc .ghost target="_blank"}`
- [x] 1.2 In `index.qmd`, remove the About-section sentence (line ~45) `My full CV is available [here](assets/cv.pdf){target="_blank"}.` entirely, including its surrounding blank line

## 2. Render & verify

- [x] 2.1 Run `quarto render` to regenerate `_site/index.html`
- [x] 2.2 Verify `_site/index.html` now contains `https://anrungo.github.io/resume/` for the hero CTA, no longer references `assets/cv.pdf`, and no longer contains the "My full CV is available here." sentence
- [x] 2.3 Open the rendered page and confirm the "Curriculum Vitae" button opens the résumé page in a new tab with unaffected styling/layout, and the About section reads cleanly without the removed sentence

## 3. Deploy

- [x] 3.1 Commit the change and push/publish the rendered site to the deploy repo so it goes live
