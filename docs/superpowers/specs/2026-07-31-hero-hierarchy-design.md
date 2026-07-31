# Hero Hierarchy Redesign

**Date:** 31 July 2026
**Source:** `docs/2026-07-30-ui-ux-audit.md`
**Scope:** Third incremental audit feature only: landing-page hero content hierarchy and interaction cleanup.

## Goal

Make NUSA's positioning understandable within the first few seconds while keeping registration visible, credible, and easy to act on across mobile and desktop.

## Approved Content

The hero uses this exact content hierarchy:

- Promotion status: `SPMB 2027/2028 Sudah Dibuka`
- Promotion detail: `Potongan SPI Rp10 juta untuk 10 pendaftar pertama`
- Eyebrow: `Boarding School Islami di Kota Semarang`
- Headline: `Menjadi Muslim Tangguh, Jago IT`
- Supporting copy: `Santri menempuh pendidikan kesetaraan SMA sambil memperkuat agama, karakter, dan keterampilan teknologi melalui jalur Programmer atau Designer.`
- Primary CTA: `Daftar SPMB 2027/2028`
- Secondary CTA: `Konsultasi via WhatsApp`
- Trust facts: `Kesetaraan SMA`, `Programmer & Designer`, and `Kota Semarang`

The implementation must not add accreditation, permit, diploma, partner, employment, salary, or outcome claims that are not already verified by the public site.

## Layout and Hierarchy

The hero retains a two-column desktop composition with copy on the left and the optimized student image on the right. Mobile uses one column with the complete decision-making message and both CTAs visible before the image.

Content order is:

1. Compact promotion label.
2. Location and school-type eyebrow.
3. Primary headline.
4. One supporting paragraph.
5. Primary and secondary CTAs.
6. Three concise trust facts.
7. Main student image on mobile, or the image in the right desktop column.

The headline wraps naturally at 320 pixels and does not use `whitespace-nowrap`. Body copy remains constrained to a readable line length. The hero should feel confident and editorial rather than like a collection of independent promotional widgets.

Trust facts remain stacked or use two columns at narrower widths. At the wide-desktop breakpoint, their columns follow the natural content width and distribute the remaining horizontal space evenly. Icons and single-line labels align vertically at their center; the layout does not use `whitespace-nowrap`.

## Simplification

Remove the current countdown, full-width promo banner, separate quota badge, floating `IT Expert` badge, floating `100% Praktik` badge, decorative pulse, and long hover transformations. The promotion remains visible near the top of the copy column. Only the short `SPMB 2027/2028 Sudah Dibuka` status uses a compact rounded badge; the SPI discount appears as left-aligned plain text directly below it, with `Rp10 juta` emphasized in yellow. The two lines do not share one wrapping capsule and do not use a bullet separator.

The background may retain the established teal gradient and a restrained grid texture, but decorative glow shapes and ornaments must not compete with the headline. No new reveal, stagger, pulse, marquee, or continuously running animation is introduced.

## Calls to Action

Both CTAs render as single links styled as buttons; a link must not wrap a nested `button`.

- The primary CTA links to `/daftar`.
- The secondary CTA links to `https://wa.me/6281392706707`, opens safely in a new tab, and preserves the existing WhatsApp icon treatment.

Interactive feedback uses explicit color, shadow, and transform transitions between 120 and 180 milliseconds. Press feedback may use `scale(0.97)`. Hover transforms are limited to hover-capable fine pointers, and reduced-motion users receive no transform movement. Both controls have visible keyboard focus rings and a minimum 44-pixel touch target.

## Trust Facts

The three trust facts appear as a quiet supporting row rather than cards or floating badges. They remain readable without hover and wrap into a compact vertical or two-row arrangement on narrow screens. Their role is to reinforce the approved factual positioning, not introduce new marketing claims.

## Hero Image

Preserve the responsive `picture` implementation and its optimized WebP assets:

- `/images/nusa-hero-image-640.webp` at 640 pixels wide.
- `/images/nusa-hero-image.webp` at 1200 pixels wide.

The image remains the eager, high-priority LCP candidate with accurate width descriptors, `sizes`, dimensions, and alternative text. Remove decorative hover scaling and floating overlays from the visual. Use a restrained frame, border, and shadow that do not animate.

## Component Scope

- `components/hero-section.tsx` owns the approved hierarchy, CTAs, trust facts, and responsive hero image.
- `components/promo-banner.tsx` is removed because the countdown and full-width banner are no longer part of the hero and the component has no other consumer.
- Existing optimized image assets and their generation workflow remain unchanged.
- Sections below the hero, header behavior, form flow, gallery structure, typography system, and global color-token consolidation are outside this feature.

## Accessibility

- The hero contains one descriptive `h1` with natural wrapping.
- CTA labels describe their destination or action.
- Links remain usable with keyboard, mouse, and touch.
- Focus indicators have visible contrast against the teal background.
- Trust facts are ordinary text content and do not rely on hover, animation, or icons alone.
- Reduced-motion behavior removes decorative transform feedback while retaining useful color feedback.

## Testing

Automated tests verify:

- the exact approved promotion, eyebrow, headline, supporting copy, CTA, and trust-fact content;
- the expired countdown and obsolete badges are absent;
- `PromoBanner` is no longer imported or rendered;
- the headline has no `whitespace-nowrap` source class;
- both CTAs are links without nested buttons and use the approved destinations;
- visible focus, touch-target, restrained transition, fine-pointer, and reduced-motion behavior is present;
- the responsive WebP source set, eager loading, high fetch priority, dimensions, `sizes`, and alt text remain intact.

Manual text-only review reports the final hierarchy, removed elements, CTA destinations, mobile wrapping safeguards, and preserved image-delivery behavior. If local visual inspection is available, check 320-pixel mobile and standard desktop widths without creating review screenshots.

## Acceptance Criteria

- A visitor can identify NUSA as an Islamic boarding school at SMA level in Kota Semarang and understand its technology focus from the first hero view.
- The approved `SPMB 2027/2028` promotion and Rp10 million SPI discount are visible without dominating the headline.
- The headline wraps at 320 pixels without horizontal overflow.
- Both CTAs are visible and semantically valid, with the registration CTA treated as primary.
- The countdown, quota badge, floating badges, nested link-button markup, pulse, and long decorative hero motion are removed.
- The optimized responsive LCP image remains correctly delivered.
- The full automated test suite and production build pass.
- Work stops after this feature so the user can review it before the next audit item begins.
