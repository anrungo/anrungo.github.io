# landing-page Specification

## Purpose

Defines the home/landing page experience: a modern hero presenting Antonio's identity and a Dashboards carousel surfacing the election-monitoring dashboards.

## Requirements

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

### Requirement: Dashboards carousel

The home page SHALL include a Dashboards carousel of the three election-monitoring dashboards, each slide showing a lightweight thumbnail, title, short description, and an "Open dashboard" link to the full `Monitor_Dashboards*.html`.

#### Scenario: Carousel navigable

- **WHEN** the user uses prev/next, the dots, keyboard arrows, or swipes on touch
- **THEN** the carousel moves between the three dashboard slides

#### Scenario: Heavy dashboards load on demand

- **WHEN** the home page loads
- **THEN** only the lightweight thumbnails load; a full multi-megabyte dashboard loads only when the user follows its "Open dashboard" link

#### Scenario: Thumbnails reproducible

- **WHEN** a dashboard changes and thumbnails must be refreshed
- **THEN** running the thumbnail generator regenerates the PNGs used by the carousel
