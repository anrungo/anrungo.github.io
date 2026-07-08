## MODIFIED Requirements

### Requirement: Modern hero

The home page SHALL present a modern hero in the Clinical Clean style: the new avatar photo (`AntonioRUNGO_photo_2.jpg`) on the left, a bold headline, a real bio subline (Senior Strategic Information Advisor @ mothers2mothers, biostatistician, HIV/PMTCT), skill pills, and primary/secondary CTAs (View dashboards, Curriculum Vitae). The CV CTA SHALL link to the résumé page at `https://anrungo.github.io/resume/` and open in a new tab.

#### Scenario: Hero shows real identity

- **WHEN** the home page loads
- **THEN** it shows Antonio's new photo, name, role, and the skill pills, with the "Curriculum Vitae" button linking to `https://anrungo.github.io/resume/`

#### Scenario: CV link opens résumé page in new tab

- **WHEN** the user clicks the "Curriculum Vitae" CTA
- **THEN** the résumé page at `https://anrungo.github.io/resume/` opens in a new browser tab

#### Scenario: Hero stacks on mobile

- **WHEN** viewed on a narrow screen
- **THEN** the avatar and text stack and remain readable and centered
