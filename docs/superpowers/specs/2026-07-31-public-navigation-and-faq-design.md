# Public Navigation and FAQ Design

**Date:** 31 July 2026  
**Source:** `docs/2026-07-30-ui-ux-audit.md`  
**Scope:** First incremental audit feature only: public navigation, header CTA, section anchors, and a compact FAQ.

## Goal

Make the long public landing page easy to navigate on desktop and mobile, while answering the six highest-priority parent questions near the conversion point.

## User Experience

The sticky header uses a quiet editorial layout that preserves the existing NUSA identity:

- Left: the existing NUSA Boarding School wordmark.
- Center on desktop: `Program`, `Kurikulum`, `Kehidupan Santri`, `Pengajar`, `Biaya`, and `FAQ`.
- Right on desktop: a gold `Daftar Sekarang` CTA with dark teal text that links to `/daftar`.
- Mobile: the wordmark and a 44 by 44 pixel menu trigger. A right-side sheet contains the same destinations, a short brand message, and a full-width registration CTA.

The header remains translucent and sticky. A defined lower border separates it from scrolling content. Link feedback is restrained: a teal active underline, short color transitions, subtle press feedback, and no decorative hover scaling.

## Navigation Behavior

Each destination maps to a stable landing-page section ID:

| Label | Destination |
| --- | --- |
| Program | `#program` |
| Kurikulum | `#kurikulum` |
| Kehidupan Santri | `#kehidupan-santri` |
| Pengajar | `#pengajar` |
| Biaya | `#biaya` |
| FAQ | `#faq` |

On the homepage, links update the URL hash and scroll to the matching section with an offset for the sticky header. On other public pages, the same links navigate to `/#section`. The mobile sheet closes after a selection.

A small client-side observer marks the section currently visible in the viewport. If JavaScript is unavailable, the anchor links still navigate correctly; active-section highlighting and the enhanced mobile sheet interaction are progressive enhancements.

The shared header is used consistently on the homepage, registration pages, and public test pages. Admin authentication and dashboard navigation are outside this feature.

## FAQ

The FAQ appears after the fee section and before the partner and registration sections. It is left-aligned, compact, and visually quieter than the major landing-page sections.

It contains six accordion questions:

1. What education level does NUSA provide?
2. How can parents verify its legality and education documents?
3. How does the boarding-school system work?
4. What is the difference between Programmer and Designer?
5. What fees should parents prepare?
6. How does the 2027/2028 registration process work?

Answers reuse only information already present in the public site. The legal-status answer states that NUSA provides SMA-equivalency education and directs parents to the admin for official legal and education documents. It must not invent accreditation, permit numbers, institutional partners, or diploma claims.

The accordion may keep multiple answers open. Motion is limited to a short chevron rotation and respects reduced-motion preferences.

## Component Boundaries

- `components/header.tsx`: interactive public-header shell, desktop navigation, mobile sheet, CTA, and active-section presentation.
- `components/public-navigation.ts`: shared labels and destinations used by desktop and mobile navigation.
- `components/faq-section.tsx`: FAQ layout, verified copy, and accessible accordion.
- Existing landing-page section components: receive stable IDs and sticky-scroll offsets only.
- `app/page.tsx`: places the FAQ after fees and before partners and registration.

Navigation data is defined once so desktop and mobile destinations cannot drift apart.

## Accessibility

- Desktop and mobile controls have visible `focus-visible` treatment.
- The menu trigger is at least 44 by 44 pixels and exposes its open state through Radix Dialog semantics.
- The mobile sheet traps focus, closes with Escape, restores focus to the trigger, and has an accessible title and description.
- Links remain real anchors and work with keyboard navigation and without client-side scroll handlers.
- Header and section colors meet WCAG AA for normal text.
- Motion uses short, property-specific transitions and includes a reduced-motion fallback.

## Motion and Visual Craft

The implementation follows Emil Kowalski's interaction principles:

- Feedback is fast, restrained, and connected to a user action.
- Hover and press transitions target explicit properties and stay near 150-180 ms.
- Hover-only effects are limited to devices that support hover.
- The mobile panel uses the existing accessible sheet primitive with a 200-300 ms transition rather than a bespoke animation.
- No `transition-all`, long decorative reveal, repeated scale effect, or pulsing element is added.

## Testing and Acceptance Criteria

Automated checks cover:

- The six shared navigation destinations and labels.
- Desktop and mobile navigation rendering from the same data.
- The `/daftar` CTA destination.
- Menu naming and accessible sheet structure.
- The six FAQ questions and conservative legal-status wording.

Manual verification covers:

- All destinations from the homepage and a secondary public page.
- URL hash updates and sticky-header scroll offset.
- Mobile menu open, close, Escape, focus trap, and focus restoration.
- Keyboard-only navigation and visible focus states.
- Active-section highlighting while scrolling.
- Layout at 320 pixel mobile width and common desktop widths.
- Reduced-motion behavior.
- No regression on registration and test pages that reuse the header.

The feature is ready for user review when the production build succeeds and the acceptance checks pass. Work stops after this feature so the user can review it before the next audit item begins.
