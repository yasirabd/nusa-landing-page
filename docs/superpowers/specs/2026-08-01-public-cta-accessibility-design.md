# Public CTA Accessibility Design

**Date:** 2026-08-01

## Goal

Improve the contrast, semantics, keyboard focus, and interaction feedback of calls to action on the public landing page and registration page without changing their copy, destinations, or surrounding layouts.

This work implements audit item `UX-04` from `docs/2026-07-30-ui-ux-audit.md`.

## Scope

Included:

- Public landing-page CTA links and buttons.
- CTA-related labels whose foreground/background combination does not meet the intended contrast treatment.
- CTA focus-visible and press feedback.
- Removal of the non-functional `Lihat Karya` control.
- Automated regression coverage for CTA semantics and accessibility classes.

Excluded:

- Admin dashboard and authentication pages.
- Registration form behavior, validation, persistence, payment, or submission flow.
- Copywriting changes.
- Section layout or information architecture changes.
- Full semantic color-token migration, which remains part of `UX-11`.
- A shared `PublicCTA` abstraction.

## Current Problems

1. `RegistrationSection` renders a Next.js `Link` around a `Button`, producing nested interactive elements.
2. Some CTA links wrap decorative `div` elements and put visual interaction styles on the child instead of the focusable anchor.
3. `CurriculumSection` renders a `Lihat Karya` button with no destination or event handler.
4. The registration-fee badge uses white text on the gold accent, which has insufficient contrast.
5. Several CTA interactions use `transition-all`, 300 ms durations, and large hover scaling that make frequent actions feel less direct.
6. Focus-visible treatment is not consistently applied to the focusable CTA element.

## Design

### Semantic Elements

- Use one interactive element per action.
- In `RegistrationSection`, use `Button asChild` with `Link` so the rendered DOM contains one anchor while retaining the existing button styling mechanism.
- In `Program100Days` and `ProgramSection`, apply layout, color, motion, and focus styles directly to `Link`; remove the nested presentation-only CTA wrapper.
- Remove the inert `Lihat Karya` button from `CurriculumSection`. Do not redirect it to the activity gallery because that destination does not represent student work accurately.
- Preserve all existing valid CTA destinations and accessible names.

### Contrast

- Change the `BIAYA PENDAFTARAN` badge foreground from white to dark teal `#134146` while retaining the gold background.
- Keep dark teal foreground on all gold CTA surfaces.
- Retain white or paper foreground on dark teal CTA surfaces only where the existing combination is appropriate.
- Do not perform a broad color-token migration in this feature.

### Focus And Motion

Apply Emil Kowalski's design-engineering principles:

- Focus-visible rings must be placed on the actual link or button, not a child wrapper.
- Use explicit transition properties instead of `transition-all`.
- Keep CTA hover and press feedback between 120 and 180 ms.
- Use a subtle active scale of approximately `0.97` for press feedback.
- Remove large hover scaling and vertical translation from these CTA actions.
- Preserve `motion-reduce` fallbacks so reduced-motion users do not receive transform feedback.
- Keep icon movement subtle and tied to hover/focus only when it reinforces direction.

No new entrance animation, glow, pulse, or decorative motion will be added.

## Components

Expected production files:

- `components/curriculum-section.tsx`
- `components/program-100-days.tsx`
- `components/program-section.tsx`
- `components/fee-info-section.tsx`
- `components/registration-section.tsx`

The registration form page is in scope for verification but should require no production change unless a focused test identifies the same CTA defect there.

## Error Handling And Data Flow

This feature introduces no new state, data flow, network request, or error path. Existing navigation destinations and registration behavior remain unchanged.

## Testing

Add focused tests that verify:

- The final registration CTA renders as a link to `/daftar` without a nested button.
- The program CTAs remain links to `/daftar` and receive focus-visible styling on the anchor.
- `Lihat Karya` is no longer rendered as an inert button.
- The registration-fee badge uses dark teal foreground rather than white.
- Updated CTA source does not use the removed high-motion patterns.

Run the focused tests first using TDD, then run the full Vitest suite and production build. Existing unrelated TypeScript baseline errors must be reported rather than included in this feature.

## Acceptance Criteria

- No public CTA contains another interactive element.
- No inert `Lihat Karya` control remains.
- Gold CTA and badge surfaces use dark teal text.
- Every changed CTA has a visible keyboard focus treatment on the focusable element.
- Changed CTA motion uses explicit properties, 120-180 ms timing, subtle press feedback, and reduced-motion safeguards.
- CTA copy, destinations, layout structure, registration flow, and admin UI remain unchanged.
- Focused and full regression tests pass.
