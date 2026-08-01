# Typography Consolidation Design

## Goal

Give NUSA a typography system that feels disciplined, modern, and technology-focused while reducing unnecessary font loading and preserving the warmth of its Islamic school identity.

## Scope

Implement audit item `UX-10` by consolidating the application around three purposeful font roles:

- Geist Sans for the primary interface.
- Righteous for the `NUSA` wordmark only.
- Noto Serif italic for short value statements and editorial accents.

Remove unused font families, the external Romulo font request, redundant font utilities, and global overrides of Tailwind font-weight semantics.

This feature changes typography and loading behavior only. Preserve approved copy, colors, section order, card layout, spacing system, navigation behavior, form behavior, and responsive structure.

## Primary Typeface

Use `GeistSans` from the already-installed `geist/font/sans` package as the only primary sans-serif family.

Apply Geist Sans through the global `font-sans` token so headings, body copy, buttons, navigation, forms, admin surfaces, and test pages inherit it consistently without component-level font declarations.

Geist Sans supports the NUSA positioning because it combines:

- Precise shapes associated with technology.
- Strong medium and bold weights for the `Muslim Tangguh` character.
- Neutral body forms that remain readable for parents and prospective students.

Do not retain Work Sans or Inter as fallback application fonts. Use the fallback stack supplied by the Geist package.

## Display And Editorial Roles

Keep Righteous through `next/font/google`, loaded only at weight `400`. Restrict it to visible `NUSA` wordmarks or inline brand marks. Do not apply Righteous to generic section headings, paragraphs, buttons, or form labels.

Replace the externally hosted Romulo face with Noto Serif loaded through `next/font/google` at italic style and weight `500` only. Use it for the existing short brand statements:

- `Muslim Tangguh, Jago IT`
- `Muslim Tangguh Jago IT`
- Other existing short tagline treatments that currently use `font-romulo-italic`.

Apply these accents with the global `font-serif` token plus explicit `italic` and `font-medium` utilities. Do not introduce Noto Serif for long paragraphs or general UI copy.

Decorative quotation glyphs may use `font-serif`, but testimonial body copy and attribution remain Geist Sans.

## Font Loading Architecture

Update `app/layout.tsx` to load only:

- `GeistSans` from `geist/font/sans` as `--font-geist-sans`.
- `Righteous` from `next/font/google` as `--font-righteous` at weight `400`.
- `Noto_Serif` from `next/font/google` as `--font-noto-serif` at italic weight `500`.

The body class should expose these three variables and apply `font-sans` once.

Remove all loading and variables for:

- Work Sans.
- Inter.
- Inconsolata.
- Multi-weight Noto Serif.
- External Romulo.

No new package or network-hosted `@font-face` declaration is required. The existing `geist` dependency remains and becomes actively used.

## Global Font Tokens

Update the Tailwind theme mapping in `app/globals.css`:

- `--font-sans: var(--font-geist-sans)`
- `--font-serif: var(--font-noto-serif)`
- `--font-mono` uses a system monospace stack rather than loading Inconsolata.

Remove the Romulo `@font-face` rule and `.font-romulo-italic` utility.

Keep `.font-righteous` as the explicit brand utility mapped to `--font-righteous`.

Remove redundant `font-work-sans` usage from components. Components should inherit `font-sans` globally rather than restating the primary family.

## Weight Semantics

Delete global CSS rules that redefine:

- `.font-bold` from `700` to `600`.
- `.font-extrabold` from `800` to `700`.
- `.font-black` from `900` to `800`.

Restore standard Tailwind meaning so weight utilities remain predictable to developers.

Use the following hierarchy when selectively adjusting visibly dense elements after the override removal:

- Body copy: `400` or `500`.
- Supporting copy and labels: `500` or `600`.
- Buttons and attribution names: `600` or `700`.
- Card titles: `600` or `700`.
- Section headings: `700`.
- Hero or rare high-emphasis display text: `700` or `800`.

Do not replace the global overrides with new aliases or another hidden weight remapping. Only adjust component utilities where the restored standard weight produces excessive density.

## Type Scale And Readability

Preserve the type sizes already approved during previous feature reviews. This feature does not redesign every section heading or card.

Review the affected public surfaces after switching families and preserve these principles:

- Body copy remains at least `16px` where it carries primary information.
- Body line-height remains approximately `1.5-1.7`.
- Long supporting copy stays within existing readable width constraints.
- Headings retain natural wrapping on mobile.
- Buttons and form labels remain legible without excessive letter spacing.
- Taglines remain short editorial accents rather than competing headings.

## Component Cleanup

Replace existing `font-romulo-italic` usage in:

- `components/curriculum-section.tsx`
- `components/nusa-tagline.tsx`
- `components/footer.tsx`
- `components/registration-section.tsx`

Remove existing `font-work-sans` usage in:

- `components/registration-section.tsx`
- `components/test-programmer-designer.tsx`

Preserve existing `font-righteous` usage only where the rendered text is the NUSA brand name.

Do not refactor unrelated component styling while touching these files.

## Accessibility And Performance

- Fonts load through Next.js or the local Geist package, avoiding a runtime request to Framer assets.
- `font-display` behavior is managed by the font integrations rather than a custom remote rule.
- Removing unused families reduces generated font files and CSS variables.
- Text remains real text; no image-based typography is introduced.
- No copy is hidden, truncated, or changed as part of the font migration.
- Font changes must not add motion or layout-dependent JavaScript.

## Testing

Add focused tests to verify:

- `app/layout.tsx` imports and applies Geist Sans, Righteous, and one italic Noto Serif weight.
- Work Sans, Inter, and Inconsolata are no longer imported or initialized.
- The body exposes only the approved font variables and uses `font-sans`.
- `app/globals.css` maps `font-sans` to Geist Sans and `font-serif` to Noto Serif.
- `font-mono` uses a system stack without loading Inconsolata.
- The external Framer font URL, Romulo `@font-face`, and `.font-romulo-italic` utility are removed.
- Global `.font-bold`, `.font-extrabold`, and `.font-black` overrides are removed.
- No `font-work-sans` or `font-romulo-italic` class remains in application source.
- Existing tagline text remains present and uses `font-serif italic font-medium`.
- Existing `font-righteous` usage remains limited to rendered NUSA brand text.
- Approved public copy remains unchanged.

Run focused tests, the complete Vitest suite, TypeScript checking, the production build, and final diff checks. Request independent review and stop for user visual review before merging.

## Out Of Scope

- Changing the approved hero headline or tagline copy.
- Redesigning individual section layouts.
- Consolidating color and spacing tokens (`UX-11`).
- Standardizing motion (`UX-12`).
- Updating metadata or structured data (`UX-13`).
- Fixing unrelated TypeScript baseline errors in admin or footer code unless a typography edit directly touches the failing declaration.
