# Landing UI/UX Follow-up Design

## Goal

Resolve the approved landing-page UI/UX audit findings while preserving the current visual identity, content hierarchy, responsive behavior, and registration flow.

## Scope

This follow-up covers only the public landing page and its shared layout:

- reduce the remaining oversized vertical rhythm in selected feature sections;
- align navigation order with document order;
- add a keyboard skip link;
- separate the embedded map from its external Maps link;
- improve partner-logo presentation on touch devices;
- prefill WhatsApp consultation messages;
- localize the remaining English footer labels;
- retain the approved July 2027 fee note.

The registration wizard, admin area, test pages, brand palette, typography scale, content claims, and section content order are otherwise unchanged.

## Approach

Use a targeted follow-up rather than another global spacing-token reduction. The shared spacing scale remains unchanged because it already represents the approved balanced baseline. Only Curriculum, Program, Teaching Team, and Fees move from `section-spacing-feature` to `section-spacing-standard`, preventing consecutive feature-level padding from making the page feel longer than its content requires.

Accessibility and conversion changes remain local to their components. No new runtime dependency or client-side state is required.

## Interaction Design

### Navigation and Keyboard Access

- Reorder the public navigation to match the rendered landing-page sequence: Curriculum, Program, Kehidupan Santri, Pengajar, Biaya, FAQ.
- Add a visually hidden skip link before page navigation that becomes visible on keyboard focus.
- Give the landing `<main>` a stable `main-content` target and retain the sticky-header section offsets.

### Footer Map

- Keep the embedded map as a standalone iframe inside its visual frame.
- Place a clearly labelled `Buka di Google Maps` link adjacent to or beneath the map.
- Avoid nesting the interactive iframe inside another interactive element.
- Translate `Email us`, `Visit us`, and `Get Direction` into concise Indonesian labels.

### WhatsApp Conversion

- Preserve the existing WhatsApp destination number.
- Add a URL-encoded message stating that the visitor wants information about SPMB NUSA 2027/2028.
- Apply the same message to the hero consultation link and footer WhatsApp link.

### Partner Logos

- Increase default logo opacity so partner identity remains legible without interaction.
- Apply the stronger grayscale-to-color hover treatment only on devices that support hover and a fine pointer.
- Keep the logo grid, assets, names, and section copy unchanged.

## Spacing

- Keep `section-spacing-compact`, `section-spacing-standard`, and `section-spacing-feature` token values unchanged.
- Change Curriculum, Program, Teaching Team, and Fees to `section-spacing-standard`.
- Do not shrink CTA heights, accordion triggers, card padding, headings, or mobile touch targets in this follow-up.

This supersedes only the earlier decision to retain feature-level spacing on those four sections. All other decisions from the landing spacing density design remain valid.

## Testing

Automated regression tests will verify:

- navigation order matches document order;
- the skip link and main target are present;
- no anchor wraps the map iframe and the external Maps link remains available;
- WhatsApp URLs include the approved prefilled message;
- partner logos retain a readable default state and hover-capability gating;
- the four selected sections use standard spacing;
- July 2027 remains visible and July 2026 is absent.

The targeted tests, complete Vitest suite, TypeScript diagnostics, and `git diff --check` will be run before completion. Existing unrelated TypeScript failures will be reported accurately if they remain.

## Out of Scope

- visual redesign or new components;
- changing pricing, promotional terms, partner claims, or contact details;
- browser automation or screenshot-based visual regression testing;
- committing or merging implementation changes without explicit user direction.
