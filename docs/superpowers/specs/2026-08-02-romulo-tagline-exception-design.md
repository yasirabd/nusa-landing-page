# Romulo Tagline Exception Design

## Goal

Restore Romulo as a deliberate display accent for three approved NUSA statements while preserving Geist Sans as the primary interface font and Noto Serif for the remaining editorial accents.

## Scope

Romulo applies only to the visible `Muslim Tangguh, Jago IT` wording inside:

- `Rise as a Muslim Tangguh, Jago IT.` in `components/nusa-tagline.tsx`.
- `Jadilah bagian dari Muslim Tangguh Jago IT` in `components/registration-section.tsx`.
- `Membentuk Generasi Muslim Tangguh Jago IT` in `components/footer.tsx`.

The surrounding words `Rise as a`, `Jadilah bagian dari`, and `Membentuk Generasi` remain Geist Sans. Copy, font sizes, colors, tracking, layout, spacing, wrapping, and behavior remain unchanged.

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

Expose it through `.font-romulo-italic`. Do not map Romulo to `font-serif` and do not add it to the root layout variables. This keeps the external dependency isolated to the three approved accents.

## Typography Roles

- Geist Sans remains the global interface family.
- Righteous remains limited to visible `NUSA` brand marks.
- Noto Serif italic 500 remains available for the curriculum statement and testimonial quotation glyphs.
- Romulo italic 400 is limited to the three approved `Muslim Tangguh, Jago IT` statements.

## Testing

Update the typography contract to verify:

- The Romulo face and utility exist.
- Exactly the three approved component files use `font-romulo-italic`.
- The three Romulo accents no longer use `font-serif italic font-medium`.
- No other application component uses Romulo.
- Existing copy and all other font roles remain unchanged.

Run the focused typography test, full test suite, production build, source checks, and diff checks before visual review.

## Out Of Scope

- Replacing Noto Serif globally.
- Applying Romulo to the curriculum, testimonial body, buttons, navigation, or form fields.
- Changing the three statements' wording or layout.
- Downloading or redistributing the Romulo font file locally.
