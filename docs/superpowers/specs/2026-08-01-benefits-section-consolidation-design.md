# Benefits Section Consolidation Design

**Date:** 2026-08-01

## Goal

Reduce landing-page length and repetition by consolidating `WhyChooseSection` and `Program100Days` into one focused benefits section while preserving the standalone NUSA tagline interlude.

This is the first independently reviewable part of audit item `UX-06` from `docs/2026-07-30-ui-ux-audit.md`.

## Scope

Included:

- Keep `NUSATaglineSection` as a standalone brand interlude after the hero.
- Reduce excessive vertical padding in the tagline interlude.
- Replace the current two-card `WhyChooseSection` with one consolidated section.
- Move the important `Program100Days` content into a featured block inside the consolidated section.
- Reduce the existing eight benefit bullets to four scannable value groups.
- Keep one registration CTA after the complete benefits story.
- Remove the separate `Program100Days` render from the landing-page composition.
- Remove the unused `Program100Days` component after its approved content is incorporated.
- Add focused regression coverage for section order, content retention, and removal of duplication.

Excluded:

- Changes to the hero, main NUSA tagline copy, program curriculum, fees, gallery, testimonials, FAQ, or registration flow.
- A full landing-page reorder beyond the consolidated benefits block.
- New proof, statistics, student projects, or trust data. Those remain part of `UX-07`.
- Broad color-token, typography, or spacing-token migration.
- New animation libraries, entrance reveals, parallax, glow tracking, or scroll-linked effects.

## Current Problems

1. `NUSATaglineSection`, `WhyChooseSection`, and `Program100Days` form three large consecutive blocks before the detailed program content.
2. The tagline interlude reaches `lg:py-48`, creating up to 192 px of padding on both sides of a short statement.
3. `WhyChooseSection` uses two large cards with eight long bullets, making the primary benefits slow to scan.
4. `Program100Days` repeats the same practice, project, and earning story in another monumental section with a second registration CTA.
5. Both sections use extensive glow, hover lift, scale, and long transitions, so supporting content competes visually with the hero.

## Information Architecture

The landing-page order remains:

1. Hero.
2. Standalone NUSA tagline interlude.
3. Consolidated benefits section.
4. Curriculum and the remaining existing sections.

The consolidated section contains:

1. A left-aligned section introduction: `Mengapa Memilih NUSA?`.
2. Four concise value groups.
3. One featured `100 Hari Belajar, Besoknya Gajian` block.
4. One `Daftar Sekarang` CTA.

## Content Design

### Four Value Groups

The eight current benefit bullets are consolidated into four themes:

1. **Iman dan Karakter**
   - Monitoring adab, ibadah, discipline, and independence.
2. **Skill Industri Teknologi**
   - Intensive IT learning, current tools and AI, and project-based practice aligned with industry needs.
3. **Bahasa dan Kepemimpinan**
   - English communication, leadership, public speaking, and soft skills.
4. **Karya dan Entrepreneurship**
   - Portfolio creation, practical selling experience, freelance work, and paid projects.

The wording may be tightened during implementation, but it must not introduce unverifiable statistics or new outcomes.

### Featured 100-Day Block

Retain the headline:

`100 Hari Belajar, Besoknya Gajian`

Retain the existing three-stage explanation in a more compact presentation:

- `100 Hari Pertama`: intensive practical learning.
- `Langsung Berkarya`: begin producing portfolio work, freelance work, or paid projects.
- `Belajar Sambil Praktik`: continue learning through real projects.

The featured block must explain that `gajian` refers to work or projects; it must not promise guaranteed income for every student. No new outcome claim is added in this feature.

## Visual Design

### Tagline Interlude

- Preserve the approved headline and supporting tagline exactly.
- Reduce section padding to approximately 64-96 px depending on viewport.
- Preserve its centered, minimal presentation.
- Do not add cards, value badges, trust rows, or CTA elements.

### Consolidated Benefits Section

- Use one cohesive section rather than two full-height sections.
- Use a left-aligned introduction to distinguish it from the centered hero and tagline.
- Present the four value groups in a responsive two-column grid on desktop and one column on mobile.
- Use restrained surfaces, borders, and spacing rather than large elevated cards.
- Give the 100-day story one visually distinct featured panel below the values.
- Place one registration CTA after the featured panel.
- Preserve the established teal, dark teal, paper, cyan, and gold palette with WCAG AA text combinations.

## Motion And Interaction

Apply Emil Kowalski's design-engineering principles:

- Supporting value items do not translate or scale on hover.
- Hover may use a subtle border or background-color change only when it communicates interactivity; static informational items need no hover animation.
- The registration CTA retains the established 150 ms explicit transition, `0.97` active scale, focus-visible ring, and reduced-motion fallback.
- Remove the existing 300-1000 ms decorative transitions, hover lift, icon lift, and glow reveal from the consolidated content.
- Do not animate keyboard-initiated focus changes.

## Components

Expected production changes:

- Modify `app/page.tsx` to remove the separate `Program100Days` import and render.
- Modify `components/nusa-tagline.tsx` to compact spacing only.
- Rewrite `components/why-choose-section.tsx` as the consolidated benefits section.
- Delete `components/program-100-days.tsx` after its retained content is represented in `WhyChooseSection`.

No shared global component or new stateful component is required.

## Data Flow And Error Handling

This feature introduces no new state, network request, persistence, data source, or error state. The registration CTA continues to navigate to `/daftar`.

## Accessibility

- Maintain a logical heading hierarchy: one section `h2`, value-group `h3` elements, and a featured-block heading below them.
- Use semantic lists for the value groups and 100-day stages where appropriate.
- Decorative icons must use `aria-hidden="true"`.
- The CTA must remain one semantic anchor with a visible focus state and a minimum 44 px touch target.
- Text and surface combinations must meet WCAG AA for normal text.
- All content must remain available without hover.

## Testing

Add focused tests that verify:

- The approved tagline copy remains unchanged and the interlude uses compact spacing rather than `lg:py-48`.
- The landing page renders `WhyChooseSection` but no separate `Program100Days` component.
- The consolidated section includes the four approved value headings.
- The `100 Hari Belajar, Besoknya Gajian` headline and three stages appear exactly once.
- There is one registration CTA inside the consolidated section and it links to `/daftar`.
- The old eight long bullet strings and old decorative motion classes are no longer present in the consolidated component.

Use TDD: verify focused tests fail before changing production code, then run the focused and full Vitest suites, TypeScript checking, production build, and diff checks.

## Acceptance Criteria

- Tagline remains a standalone simple interlude with unchanged copy and reduced vertical padding.
- `WhyChooseSection` and `Program100Days` are represented by one consolidated benefits section.
- Four value groups and the compact three-stage 100-day story remain easy to scan on mobile and desktop.
- Only one registration CTA appears in the consolidated benefits section.
- No decorative hover translation, card scaling, or long glow transition remains in the consolidated content.
- The separate `Program100Days` component is no longer imported, rendered, or retained unused.
- No unrelated landing-page section, registration behavior, admin UI, or untracked audit file is changed.
- Focused and full regression tests pass.
