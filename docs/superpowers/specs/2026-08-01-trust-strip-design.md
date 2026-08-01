# NUSA Trust Strip Design

## Goal

Add a compact, factual trust strip immediately after the hero so parents can verify the school format, student eligibility, location, and industry network without increasing hero clutter.

## Scope

Create a standalone `TrustStrip` component, render it immediately after `HeroSection`, remove the existing three-item facts row from the hero, and add a stable `partner` anchor to `PartnerSection`.

Do not redesign the rest of the hero, FAQ, or partner section. Do not introduce claims about accreditation, permit numbers, guaranteed outcomes, student totals, or other facts that are not explicitly available in the project.

## Content

The trust strip contains exactly four items with the following approved copy:

1. **Pendidikan Kesetaraan SMA**
   - Description: `Dokumen penyelenggaraan dapat diperiksa bersama admin.`
   - Link: `Periksa legalitas`
   - Destination: `#faq`
2. **Khusus Santri Putra**
   - Description: `Lingkungan boarding school tingkat SMA untuk laki-laki.`
3. **Kota Semarang**
   - Description: `Belajar dan tinggal di lingkungan boarding school di Kota Semarang.`
4. **5 Partner Industri & Teknologi**
   - Description: `Terhubung dengan praktisi dan ekosistem teknologi.`
   - Link: `Lihat partner`
   - Destination: `#partner`

The copy is factual and deliberately avoids unsupported legal or outcome language.

## Page Composition

Remove `HERO_FACTS`, its `CheckCircle2` import, and the facts `ul` from `HeroSection`. This reduces competition below the hero CTAs and shortens the hero reading path.

Render `TrustStrip` directly after `HeroSection` and before `NUSATaglineSection` in `app/page.tsx`.

Add `id="partner"` and `scroll-mt-20` to the existing partner section so the trust-strip link lands below the sticky header.

## Semantic Structure

Use a section with an accessible label and a semantic description list:

- One `<section aria-label="Informasi utama NUSA">`.
- One `<dl>` containing exactly four item wrappers.
- Each item uses `<dt>` for its label and `<dd>` for its description and optional text link.
- Links remain individual inline controls; do not make the full item clickable.

## Visual Direction

Use a calm editorial band instead of cards:

- Background: warm off-white `#F7F7F2`.
- Top and bottom border: dark teal at 12% opacity.
- No card backgrounds, shadows, glow, hover lift, hover scale, or entrance animation.
- Each item uses a small icon in a soft teal circular container.
- Icons are decorative and use `aria-hidden="true"`.
- Primary labels use `text-base` dark teal and semibold weight.
- Descriptions use `text-sm`, `leading-6`, and dark teal at subdued opacity.

## Responsive Layout

- Mobile: one column with horizontal dividers between all four items.
- `md`: two-by-two grid with explicit horizontal and vertical divider colors.
- `lg`: four equal columns with vertical dividers and no internal horizontal divider.
- Use compact vertical padding so the strip supports rather than competes with the hero.

Divider colors must be explicit on each item that sets a border width; do not rely on inherited or global border color tokens.

## Link Interaction

The two text links use:

- Underlined text with a clear underline offset.
- Minimum 44px touch height through inline-flex sizing.
- Explicit color transition properties with `150ms` duration.
- A visible `focus-visible` ring and offset.
- No scale or translate motion.
- `motion-reduce:transition-none`.

## Accessibility

- Preserve the hero heading and CTA hierarchy after removing its facts list.
- Use semantic description-list markup for factual label/value pairs.
- Keep icons out of the accessibility tree.
- Ensure both links are reachable and understandable with keyboard navigation.
- Ensure anchor destinations exist in the page composition.
- Maintain WCAG-readable dark teal text on the paper surface.

## Testing

Add focused tests that verify:

- The trust strip renders exactly four `<dt>` and four `<dd>` elements.
- All approved labels and descriptions remain present.
- `Periksa legalitas` links to `#faq` and `Lihat partner` links to `#partner`.
- Both links meet focus, minimum touch size, explicit transition, and reduced-motion contracts.
- All SVG icons use `aria-hidden="true"`.
- Static source contains no hover lift, scale, glow, long-duration transition, or card shadow classes.
- The hero no longer contains `HERO_FACTS`, `CheckCircle2`, or the old facts list.
- `app/page.tsx` renders `TrustStrip` immediately after `HeroSection`.
- `PartnerSection` exposes `id="partner"` and `scroll-mt-20`.

Run focused tests, the complete Vitest suite, TypeScript checking, production build, and final diff checks. Request independent review and stop for user review before merging.

## Out Of Scope

- Changing approved hero headline, promotion, supporting paragraph, imagery, or CTAs.
- Adding legal document files or an accreditation claim.
- Redesigning partner logos or testimonial content.
- Adding statistics not present in the project.
- Adding animation or new dependencies.
