# Romulo Tagline Exception Design

## Goal

Restore Romulo as a deliberate display accent for two approved NUSA statements while preserving Geist Sans as the primary interface font and Noto Serif for the remaining editorial accents.

## Scope

Romulo applies only to the visible `Muslim Tangguh, Jago IT` wording inside:

- `Rise as a Muslim Tangguh, Jago IT.` in `components/nusa-tagline.tsx`.
- `Jadilah bagian dari Muslim Tangguh Jago IT` in `components/registration-section.tsx`.

The surrounding words `Rise as a` and `Jadilah bagian dari` remain Geist Sans. Copy, font sizes, colors, tracking, layout, spacing, wrapping, and behavior remain unchanged.

## Font Loading

Reintroduce the previously used Romulo italic WOFF2 face through a narrowly named `@font-face` rule in `app/globals.css`:

```css
@font-face {
  font-family: "Romulo";
  src: url("https://framerusercontent.com/assets/V6SPt5QT5vOzThTYDvKoxVfGcQ.woff2") format("woff2");
  font-weight: 400;
  font-style: italic;
  font-display: swap;
}
```

Expose it through `.font-romulo-italic`. Do not map Romulo to `font-serif` and do not add it to the root layout variables. This keeps the external dependency isolated to the two approved accents.

## Typography Roles

- Geist Sans remains the global interface family.
- Righteous remains limited to visible `NUSA` brand marks.
- Noto Serif italic 500 remains available for curriculum, footer, testimonial quotation glyphs, and other approved editorial accents.
- Romulo italic 400 is limited to the two approved `Muslim Tangguh, Jago IT` statements.

## Testing

Update the typography contract to verify:

- The Romulo face and utility exist.
- Exactly the two approved component files use `font-romulo-italic`.
- The two Romulo accents no longer use `font-serif italic font-medium`.
- No other application component uses Romulo.
- Existing copy and all other font roles remain unchanged.

Run the focused typography test, full test suite, production build, source checks, and diff checks before visual review.

## Out Of Scope

- Replacing Noto Serif globally.
- Applying Romulo to the curriculum, footer, testimonial body, buttons, navigation, or form fields.
- Changing the two statements' wording or layout.
- Downloading or redistributing the Romulo font file locally.
