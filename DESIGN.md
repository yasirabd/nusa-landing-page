---
name: Tangguh
colors:
  primary: "#2C8970"
  secondary: "#134146"
  tertiary: "#F3B233"
  highlight: "#42CDBA"
  surface: "#F0FAF7"
  neutral: "#F7F7F2"
typography:
  h1:
    fontFamily: Geist Sans
    fontSize: 3.75rem
  h2:
    fontFamily: Geist Sans
    fontSize: 3rem
  body-md:
    fontFamily: Geist Sans
    fontSize: 1rem
  label-caps:
    fontFamily: Geist Sans
    fontSize: 0.875rem
  editorial:
    fontFamily: Romulo
    fontSize: 2.25rem
  wordmark:
    fontFamily: Righteous
    fontSize: 1.5rem
rounded:
  sm: 12px
  md: 24px
  lg: 32px
  pill: 9999px
spacing:
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  section-compact: 48px-80px
  section-standard: 64px-96px
  section-feature: 96px-160px
---

## Overview

Islamic conviction meets technological optimism. Tangguh presents NUSA
Boarding School as disciplined, courageous, warm, and contemporary: a modern
Islamic boarding school with the precision and confidence of a technology
studio.

The interface should feel spacious and purposeful rather than dense or
generic. Strong green fields establish identity, warm paper surfaces create
calm, gold marks decisive moments, and turquoise introduces a controlled sense
of digital energy.

## Design Principles

- **Faithful:** The interface communicates trust, discipline, care, and moral
  clarity without relying on ornamental religious motifs.
- **Tangguh:** Headings, contrast, spacing, and composition feel confident and
  substantial rather than delicate or timid.
- **Technological:** Grids, precise alignment, crisp typography, and turquoise
  details express IT education without turning the school into a software
  product landing page.
- **Human:** Warm neutral surfaces, real activity photography, generous
  whitespace, and readable copy keep parents and students at the center.
- **Purposeful:** Every accent, card, animation, and call to action must have a
  clear role. Decoration must never compete with school information.

## Colors

The palette is built around the established NUSA greens, supported by one warm
accent and one technological highlight.

- **Primary (#2C8970):** NUSA green. Use for major brand fields, wordmarks,
  primary icons, and high-confidence visual anchors.
- **Secondary (#134146):** Deep teal. Use for headlines, dark sections,
  navigation text, and high-contrast foundations.
- **Tertiary (#F3B233):** NUSA gold. Use for primary calls to action, promotion
  highlights, achievements, and short editorial emphasis.
- **Highlight (#42CDBA):** Digital turquoise. Use for technology details,
  subtle borders, progress markers, and controlled glow treatments.
- **Surface (#F0FAF7):** Soft green surface. Use for curriculum, program, fee,
  and other information-rich sections.
- **Neutral (#F7F7F2):** Warm paper. Use for calm sections, cards, menus, and
  backgrounds that need warmth without competing with content.

### Color Distribution

The website must not distribute every color evenly. A typical page should
approximately use:

- 45-55% neutral, white, or soft surface backgrounds.
- 25-35% primary and secondary green fields or text.
- 5-10% gold accents.
- 3-8% turquoise highlights.

Gold and turquoise are not interchangeable. Gold communicates action,
priority, and achievement. Turquoise communicates technology, structure, and
supporting energy.

### Color Pairings

- Secondary background with neutral or white text.
- Primary background with neutral or white text and restrained gold accents.
- Surface background with secondary headings and primary labels.
- Neutral background with secondary headings and primary details.
- Tertiary controls with secondary text.
- Highlight treatments with primary or secondary text, never as long-form body
  text on a light background.

## Typography

Geist Sans is the primary interface family. It provides the precision and
readability needed for technology education while retaining enough strength
for the Tangguh character.

- **H1:** Geist Sans, 48-60px, weight 700-800, tight tracking, compact leading.
- **H2:** Geist Sans, 36-48px, weight 700, tight tracking.
- **H3:** Geist Sans, 20-30px, weight 600-700.
- **Body:** Geist Sans, 16-18px, weight 400-500, line-height 1.6-1.75.
- **Labels:** Geist Sans, 12-14px, weight 600-700, uppercase only for short
  navigational or categorical labels.
- **Editorial accent:** Romulo italic 400 for short value statements and the
  phrase `Muslim Tangguh Jago IT`. Never use it for paragraphs or controls.
- **Wordmark:** Righteous 400 only for the visible `NUSA` brand name.

Use sentence case by default. Uppercase copy must remain short and gain enough
letter spacing to stay readable.

## Spacing

Spacing communicates hierarchy. Do not force all sections into one uniform
vertical rhythm.

- **Compact sections:** 48px mobile, 64px tablet, 80px desktop. Use for final
  conversion areas and short transitions.
- **Standard sections:** 64px mobile, 80px tablet, 96px desktop. Use for simple
  editorial sections, FAQ, gallery, and testimonials.
- **Feature sections:** 96px mobile, 128px tablet, 160px desktop. Use for
  curriculum, academic programs, teaching team, and other major narratives.

Feature spacing is part of the NUSA identity. It gives important educational
content the visual weight of a campus prospectus rather than a compressed
marketing page.

Internal component spacing should follow the 8px base scale. Optical
adjustments are allowed when strict arithmetic produces awkward alignment or
text wrapping.

## Section Recipes

### Hero

- Use a deep teal-to-NUSA-green field with restrained turquoise digital detail.
- Keep gold limited to the enrollment status, key monetary offer, and primary
  action.
- Keep the approved compact Hero height; do not apply feature-section spacing.
- Photography must remain prominent and should not be overwhelmed by effects.

### Editorial Interlude

- Use white or neutral background.
- Center one short, memorable value statement.
- Use Romulo only on the intended editorial phrase.
- Apply standard spacing so the interlude feels calm but not monumental.

### Educational Feature Sections

- Use surface, primary, or secondary backgrounds to alternate atmosphere.
- Apply feature spacing.
- Preserve generous separation between heading, explanation, and content grid.
- Cards may be lighter than their section but should retain green or turquoise
  connection through borders, icons, or labels.

### Evidence Sections

- Gallery and testimonials should use standard spacing.
- Let imagery, quotations, and attribution create credibility; avoid decorative
  statistics or unsupported promises.
- Alternate a dark testimonial field with a lighter gallery field to sustain
  page rhythm.

### Conversion Sections

- Use compact spacing and a clear visual container.
- Keep one dominant action.
- Use gold for the most important action or promotion and deep teal for strong
  secondary actions.

## Shape And Surfaces

- Use 12px radii for compact controls and small information blocks.
- Use 24px radii for standard cards, panels, and menus.
- Use 32px radii for prominent image frames and conversion containers.
- Use pill radii for buttons, badges, and compact status indicators only.

Avoid applying large radii to every element. Contrast between restrained text
layout and rounded feature surfaces is part of the visual hierarchy.

Shadows should remain soft and green-tinted where appropriate. Borders are
preferred over heavy shadows for ordinary cards.

## Interaction And Motion

- Use 150-250ms transitions for controls and navigation.
- Animate explicit properties instead of `transition: all`.
- Pressable controls should use a subtle `scale(0.97)` active response.
- Hover movement should remain small and run only on devices with precise hover
  input.
- Preserve `prefers-reduced-motion` fallbacks.
- Do not add looping decoration, bouncing UI, or motion that delays access to
  school information.

Motion should communicate responsiveness, not personality by itself. The NUSA
personality comes primarily from composition, color, typography, photography,
and spacing.

## Accessibility

- Maintain WCAG AA contrast for body text and controls.
- Use real text rather than image-based typography.
- Preserve visible keyboard focus on every interactive element.
- Keep touch targets at least 44px tall and wide.
- Never communicate status or meaning through color alone.
- Keep body copy readable at 16px or larger and avoid long centered paragraphs.

## Guardrails

- Do not replace NUSA green with a generic neutral-first palette.
- Do not flatten all section backgrounds into white or pale green.
- Do not cap every major section at 96px desktop spacing.
- Do not use gold as a decorative background across large areas.
- Do not use turquoise as the primary call-to-action color.
- Do not apply Romulo or Righteous to general interface text.
- Do not redesign approved copy, navigation, or component behavior while
  applying design tokens.
