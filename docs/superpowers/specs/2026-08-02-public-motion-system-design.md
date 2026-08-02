# Public Motion System Design

**Date:** 2026-08-02
**Audit item:** UX-12 — Standardize motion and reduced motion
**Status:** Approved design

## Objective

Make motion across the NUSA public landing page feel calm, responsive, and
purposeful. Motion should clarify interaction state without competing with
school information, photography, or the Tangguh visual identity defined in
`DESIGN.md`.

## Scope

This feature covers public landing-page components:

- Header and public navigation controls.
- Curriculum and program sections.
- Teaching team and partner sections.
- Fee information and registration CTA sections.
- Gallery CTA and footer interactions.
- Shared reduced-motion behavior used by those components.

The registration wizard, admin interface, test pages, and shared shadcn UI
primitives are excluded. Their state transitions have separate interaction
requirements and should not be changed indirectly by this migration.

Copy, layout, spacing, colors, imagery, navigation behavior, and form behavior
must remain unchanged.

## Motion Principles

1. **Feedback over decoration.** Motion indicates hover, press, focus, or an
   actual state change. It does not animate merely because an element is
   visible.
2. **Stable reading surfaces.** Informational cards remain spatially fixed on
   hover. Border, shadow, opacity, or color may change without translating the
   content.
3. **Fast controls.** Buttons and links use 150ms transitions. Panels may use
   200-250ms transitions where their state change needs to remain legible.
4. **Explicit properties.** Public components must not use `transition-all`.
   Each transition lists only the properties that change.
5. **Restrained transforms.** A subtle `scale(0.97)` is retained only as press
   feedback for primary pressable controls. Decorative scale, rotation, and
   lift effects are removed.
6. **No ambient looping motion.** The fee promotion badge remains visually
   prominent through color and typography rather than `animate-pulse`.
7. **Reduced motion is complete.** Users requesting reduced motion receive no
   transforms, smooth scrolling, looping animation, or nonessential transition
   delay on the public landing page.

## Component Treatment

### Curriculum

- Replace card lift and broad `transition-all` with a 180ms border-color and
  box-shadow transition.
- Remove the delayed glow reveal, image zoom, and checklist icon scaling.
- Preserve card hierarchy, image treatment, and existing hover border color.

### Program

- Keep the timeline and content structure spatially stable.
- Remove card lift, icon rotation, timeline marker scale, and checklist icon
  scale.
- Use restrained border and shadow changes at 180ms where hover feedback is
  useful.
- Preserve the CTA press response and directional arrow feedback, with
  reduced-motion fallbacks.

### Teaching Team

- Remove card lift and portrait scale.
- Retain a subtle border and shadow change at 180ms.
- Keep portraits, rings, sizing, and grid layout unchanged.

### Fee Information

- Remove card lift and `transition-all` from the announcement panel and fee
  cards.
- Use explicit shadow and border transitions at 180ms.
- Remove the pulse animation from the promotion badge.
- Remove the nonfunctional transition from static fee values.

### Partner

- Remove logo scale and the pointer cursor because logos have no click action.
- Keep grayscale-to-color and opacity feedback using explicit 180ms filter and
  opacity transitions.
- Shorten the partner container shadow transition from 500ms to 200ms.

### Registration CTA And Footer

- Keep press feedback on the registration CTA and its reduced-motion fallback.
- Replace container-level `transition-all` with explicit shadow transitions.
- Remove footer icon lift and decorative icon scaling.
- Keep background, border, opacity, filter, and map-state feedback at 150-200ms.
- Do not alter destinations, labels, map behavior, or touch target sizes.

## Reduced-Motion Strategy

Use two complementary layers:

1. Component classes such as `motion-reduce:transition-none`,
   `motion-reduce:transform-none`, and `motion-reduce:animate-none` on the few
   controls that retain transform feedback.
2. The existing global `prefers-reduced-motion: reduce` safety net in
   `app/globals.css`, extended only where necessary for public landing-page
   animation and smooth scrolling.

Reduced-motion rules must not suppress functional state visibility. Hover,
focus, open, closed, active, and validation states remain visually distinct
even when their transitions are instantaneous.

## Interaction Timing

| Interaction | Duration | Properties |
| --- | ---: | --- |
| Button hover and press | 150ms | background, color, shadow, transform |
| Card hover feedback | 180ms | border-color, box-shadow |
| Logo and image state | 180-200ms | opacity, filter |
| Header sheet | 200-250ms | transform, opacity |
| Reduced motion | 0ms | state changes remain immediate |

No public landing-page hover or press transition may exceed 250ms. Section
entrance animation is not introduced as part of this feature.

## Accessibility

- Keyboard focus remains visible and must not depend on motion.
- Interactive targets remain at least 44px.
- Hover-only styling must not hide information.
- Reduced-motion users retain all content and state cues.
- Removing the partner pointer cursor prevents a false interactive affordance.

## Testing

Add a public motion contract test that reads the in-scope component sources and
asserts:

- No `transition-all` remains.
- No decorative lift, scale, rotation, or pulse utilities remain.
- No in-scope duration exceeds 250ms.
- Press scale exists only on actual controls and includes a reduced-motion
  fallback.
- Partner logos no longer use `cursor-pointer`.
- The global reduced-motion media query remains present.

Existing component, accessibility, gallery, navigation, registration, and
design-token tests must continue to pass. Run the production build after the
focused and full test suites.

## Acceptance Criteria

- Public informational surfaces no longer move when hovered.
- Buttons continue to feel responsive through fast, restrained feedback.
- No public landing-page component uses decorative looping animation.
- No in-scope transition uses `transition-all` or lasts more than 250ms.
- Partner logos no longer imply clickability.
- Reduced-motion preference removes nonessential movement without hiding state.
- The landing page retains its approved content, composition, and Tangguh
  visual identity.
