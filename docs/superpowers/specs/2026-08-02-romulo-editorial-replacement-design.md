# Romulo Editorial Replacement Design

## Goal

Replace Noto Serif with Romulo for every existing editorial-serif treatment while preserving Geist Sans as the primary interface font and Righteous for visible `NUSA` brand marks.

## Scope

Romulo replaces every current `font-serif` use:

- `"Muslim Tangguh, Jago IT"` in the curriculum section.
- `Muslim Tangguh, Jago IT.` in the `Rise as a` statement.
- `Muslim Tangguh Jago IT` in the registration CTA.
- `Muslim Tangguh Jago IT` in the footer.
- Decorative quotation glyphs in testimonials.

Copy, colors, sizes, tracking, layout, spacing, wrapping, and behavior remain unchanged.

## Font Loading

Remove `Noto_Serif` from `app/layout.tsx`, including its initialization, CSS variable, and body class. Keep only Geist Sans and Righteous in the root layout.

Load the previously used Romulo italic WOFF2 face in `app/globals.css`:

```css
@font-face {
  font-family: "Romulo";
  src: url("https://framerusercontent.com/assets/V6SPt5QT5vOzThTYDvKoxVfGcQ.woff2") format("woff2");
  font-weight: 400;
  font-style: italic;
  font-display: swap;
}
```

Map the Tailwind `font-serif` token to `"Romulo", serif`. Existing semantic `font-serif` classes remain in place, so the editorial role stays centralized instead of adding component-specific utilities.

## Weight Semantics

Romulo is available only as italic weight 400. Remove `font-medium` from each Romulo treatment and use `font-normal` where an explicit weight is helpful. This prevents synthetic weight generation while preserving the intended light editorial character.

## Typography Roles

- Geist Sans: headings, body copy, navigation, buttons, forms, and general UI.
- Righteous 400: visible `NUSA` wordmarks only.
- Romulo italic 400: all editorial-serif accents and decorative testimonial quotation glyphs.
- System monospace: code and tabular technical content.

Noto Serif is no longer loaded or referenced.

## Testing

Update the typography contract to verify:

- The root layout loads Geist Sans and Righteous without Noto Serif.
- The body exposes only Geist and Righteous font variables plus `font-sans`.
- `font-serif` maps to `"Romulo", serif`.
- The approved Romulo URL and `@font-face` exist.
- No `--font-noto-serif`, `Noto_Serif`, or `font-medium` remains on editorial-serif treatments.
- Existing editorial copy and Righteous restrictions remain unchanged.

Run focused typography tests, the full suite, production build, source checks, and diff checks before visual review.

## Out Of Scope

- Applying Romulo to general headings, paragraphs, buttons, navigation, or form fields.
- Changing any editorial wording or layout.
- Downloading or redistributing the Romulo font file locally.
