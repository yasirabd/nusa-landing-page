# Benefits Section UI Polish Design

## Goal

Polish the consolidated NUSA benefits section so it feels more structured, calm, and premium while preserving every approved content string exactly as it currently appears.

## Scope

This polish changes only the presentation of `WhyChooseSection` and its visual transition into the surrounding tagline and curriculum sections. It does not change benefit copy, the 100-day story copy, stage copy, CTA label, CTA destination, landing-page order, or component boundaries.

## Visual Direction

Use an editorial split layout rather than a row of four narrow columns. The section should feel like a composed school profile, not a collection of promotional cards.

The section background changes from mint `#F0FAF7` to warm off-white `#F7F7F2`. This creates a clear surface transition from the white NUSA tagline above and the mint curriculum section below.

Static content remains calm. Do not add entrance animation, hover lift, hover scale, glow, mouse tracking, or decorative motion.

## Desktop Composition

At the `lg` breakpoint, the upper content uses a `4fr 8fr` grid ratio:

- The introduction occupies the `4fr` column.
- The benefit grid occupies the `8fr` column.
- The introduction remains left-aligned and contains the existing eyebrow, heading, and supporting paragraph.
- The four benefits form a two-by-two editorial grid.
- Thin dividers, spacing, and alignment define the benefit grid instead of four individual cards.
- Benefit icons use small, quiet tinted containers without card shadows.

The featured 100-day panel remains full-width below the benefits. It uses a restrained `24px`-style radius, a subtle border, and a lighter shadow than the current panel. Its internal composition must visually connect the headline, clarification, stages, and CTA.

## Responsive Composition

From the `md` breakpoint until `lg`, the introduction sits above the benefits and the benefits remain a two-column grid.

On mobile:

- All content becomes a single column.
- Benefits are separated by consistent dividers rather than stacked cards.
- The featured panel uses reduced padding and a vertical reading flow.
- Stage numbers become small consistent badges instead of dominant display typography.
- The CTA spans the available width below the stages.

At the `sm` breakpoint and above, the CTA returns to fit-content sizing.

## Interaction And Motion

Only the CTA provides movement feedback:

- Use explicit transition properties rather than `transition-all`.
- Keep duration at `150ms`.
- Keep `active:scale-[0.97]` for pointer press feedback.
- Keep a visible focus ring.
- Keep reduced-motion fallbacks that remove transform feedback and transitions.
- The arrow may translate slightly on hover and focus, with reduced-motion fallback.

All Lucide icons remain decorative and use `aria-hidden="true"`.

## Content Contract

All current strings in `components/why-choose-section.tsx` remain unchanged, including:

- Eyebrow, heading, and supporting paragraph.
- Four benefit titles and descriptions.
- Featured-panel eyebrow, headline, and income clarification.
- Three stage titles and descriptions.
- `Daftar Sekarang` CTA label and `/daftar` destination.

## Accessibility

- Preserve semantic `section`, heading hierarchy, `ul`, `ol`, and link elements.
- Maintain readable contrast on warm off-white, dark teal, gold, and white surfaces.
- Preserve a minimum CTA height of `3rem`.
- Ensure the full-width mobile CTA remains keyboard accessible and visibly focused.
- Do not expose decorative icons or stage numbers to assistive technology.

## Testing

Extend the focused benefits-section tests before implementation to verify:

- The section uses the warm off-white surface.
- The desktop layout exposes the approved editorial grid classes.
- Benefits retain exactly four list items and stages retain exactly three list items.
- Current content strings remain unchanged.
- The CTA is full-width on mobile and fit-content from `sm` upward.
- Static content remains free from hover lift, scale, glow, and long animation durations.
- CTA accessibility, explicit motion properties, focus treatment, and reduced-motion behavior remain intact.

Run the focused benefits tests, the public CTA accessibility tests, the complete Vitest suite, TypeScript checking, the production build, and final diff checks before requesting visual review.

## Out Of Scope

- Rewriting or shortening copy.
- Changing the NUSA tagline content or spacing.
- Redesigning the curriculum section.
- Adding new images, illustrations, or dependencies.
- Adding scroll-triggered or decorative animation.
