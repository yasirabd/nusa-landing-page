# Testimonial Quality Design

## Goal

Make the testimonial section feel more credible, calm, and appropriate for a school website while keeping every approved testimonial visible without interaction.

## Scope

Redesign `TestimonialsSection` as a static editorial composition with one featured testimonial and three supporting testimonials.

Preserve the four existing people, roles, and quote wording. Continue using initial avatars because real testimonial photos are not available. Do not add rating claims, new testimonials, or supporting credentials that have not been provided.

## Content Hierarchy

Use the following section copy:

- Heading: `Cerita dari Keluarga NUSA`
- Supporting copy: `Pandangan dari yayasan, wali murid, dan santri yang membersamai perjalanan NUSA.`

Feature this testimonial first:

- Name: `Dr. Ir. Edy Susilo, MT`
- Role: `Ketua Yayasan Islam Nurus Sunnah`
- Quote: `NUSA membekali anak-anak untuk punya lifeskill dalam bidang IT dan memiliki karakter yang baik.`

Show the remaining testimonials in this order:

1. Name: `Dr.Eng. Adi Wibowo, S.Si., M.Kom`
   Role: `Wali Murid SD Islam Nurus Sunnah`
   Quote: `Keren banget! NUSA tidak hanya fokus ke ilmu agama dan akhlak mulia sesuai tuntunan Ahlus Sunnah wal Jama’ah, tetapi juga menyiapkan generasi Qur’ani yang menguasai teknologi. Semoga makin sukses dan terus istiqamah!`
2. Name: `Izzul Fairuz Mahendra`
   Role: `Santri Angkatan 1`
   Quote: `Satu-satunya sekolah IT yang ada di Semarang.`
3. Name: `Muhammad Fachri`
   Role: `Santri Angkatan 1`
   Quote: `NUSA mengajarkan bisnis hingga dapat uang menggunakan teknologi terbaru.`

Preserve every quote exactly as written above. The proper apostrophes in `Jama’ah` and `Qur’ani` replace the corrupted source encoding; this is an encoding repair, not a copy rewrite.

## Layout

Keep the section's dark teal background to preserve continuity with the established NUSA visual language. Remove the decorative cyber grid and radial glow so the content carries the visual hierarchy.

Use a restrained section width and spacing consistent with the recently polished landing-page sections:

- Mobile: one column with the featured card followed by the three supporting cards.
- Tablet: the featured card remains full width; the supporting cards use two columns, with the final card spanning the complete second row.
- Desktop: the featured card remains full width; the supporting cards use three equal columns.

The featured card should have more internal space and a larger quote treatment than the supporting cards. It must remain visually related to them through shared corner radius, border weight, avatar treatment, and attribution structure.

All four testimonials must render on the initial page load. Do not hide content behind carousel controls or pagination.

## Card Presentation

Use warm off-white cards against the dark teal section. Keep borders and shadows restrained so the section feels editorial rather than promotional.

Each card contains:

1. A visible quotation mark as a quiet editorial accent.
2. The complete testimonial in readable, non-truncated typography.
3. A divider or spacing break between the quote and attribution.
4. An initial avatar.
5. The complete name and role, allowed to wrap naturally.

Use a gold avatar background with dark teal text for stronger contrast and consistency with the NUSA palette. Use these deterministic two-letter initials: `ES`, `AW`, `IF`, and `MF`, matching the four approved people in order.

Use normal or medium-weight body text for quotes with comfortable line height. Use a clear weight hierarchy for attribution:

- Name: semibold or bold, dark teal, no truncation.
- Role: smaller and quieter than the name, but still comfortably readable and no truncation.

Remove the five artificial stars because no rating data exists. Remove tech-node decorations, backdrop blur, large shadows, and glow effects.

## Component Architecture

Convert the section from a client-side carousel into a stateless server-compatible React component.

- Remove `'use client'`.
- Remove React state, effects, refs, resize listeners, swipe listeners, and carousel navigation functions.
- Remove `ChevronLeft` and `ChevronRight` imports.
- Define an explicit `Testimonial` type for the data and card props.
- Keep testimonial data local to the section unless implementation reveals an existing canonical shared source.
- Use stable identity such as the testimonial name for React keys.

No new dependency is required.

## Motion Principles

- No carousel or auto-play.
- No swipe gesture.
- No pagination animation.
- No card lift, scale, glow, or long hover transition.
- No decorative entrance animation.
- Static cards should remain visually stable on pointer and touch devices.

This intentionally follows the design principle that frequently encountered content should not move unless motion clarifies state or provides necessary feedback.

## Accessibility

- Render the section with a semantic heading associated with the testimonial region.
- Render each testimonial as an `article` containing a semantic `blockquote`.
- Associate each quote with its attribution using semantic `footer` or equivalent accessible markup.
- Keep all names, roles, and quotes visible without hover, swipe, or JavaScript.
- Do not use star icons that imply an unsupported rating.
- Maintain sufficient contrast for off-white cards, quote text, muted role text, and gold avatars.
- Decorative quotation marks must be hidden from assistive technology.

## Testing

Add or update focused tests to verify:

- The approved heading and supporting copy render.
- All four complete testimonial quotes, names, and roles render in the approved order.
- Dr. Ir. Edy Susilo's testimonial receives the featured treatment.
- The other three testimonials use the responsive one-, two-, and three-column supporting layout.
- The tablet final card spans the complete row.
- Names and roles do not use truncation utilities.
- Initial avatars remain and use the approved gold/dark-teal treatment.
- Semantic `article`, `blockquote`, and attribution markup is present.
- No stars, rating semantics, carousel arrows, pagination dots, client state, resize behavior, or swipe handling remain.
- No cyber grid, radial glow, backdrop blur, hover lift, scale, glow, or long transition remains.
- The component no longer requires `'use client'` and its props/data are explicitly typed.

Run focused tests, the complete Vitest suite, TypeScript checking, the production build, and final diff checks. Request independent review and stop for user visual review before merging.

## Out Of Scope

- Rewriting any testimonial quote.
- Adding real portraits or generated faces.
- Adding more testimonials.
- Adding ratings or verification badges.
- Adding a testimonial submission flow.
- Changing unrelated landing-page sections.
