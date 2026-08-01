# Color And Section Spacing Tokens Design

## Goal

Implement audit item `UX-11` by giving the public NUSA landing page a single semantic source for brand colors and section spacing. The refactor should make future design work safer and more consistent while preserving the approved appearance.

## Scope

Apply the token system to:

- The public landing page sections composed by `app/page.tsx`.
- The shared public Header and Footer.
- Global theme declarations required by those components.

Do not migrate the registration wizard, admin interface, isolated test pages, or unrelated application surfaces in this feature. Those areas can adopt the tokens later when they receive focused design work.

Preserve all approved copy, section order, colors, layout composition, responsive behavior, imagery, and animation behavior.

## Semantic Color System

Define the NUSA palette once in `app/globals.css` and expose it through Tailwind theme tokens:

- `brand`: `#2c8970` for the primary NUSA green.
- `brand-dark`: `#134146` for dark headings, backgrounds, and high-emphasis text.
- `brand-depth`: `#1f6f68` for deeper secondary green treatments.
- `brand-accent`: `#f3b233` for the yellow accent.
- `brand-highlight`: `#42cdba` for the bright turquoise highlight.
- `brand-surface`: `#f0faf7` for soft green surfaces.
- `brand-paper`: `#f7f7f2` for warm neutral surfaces.

Use a `brand-` prefix for NUSA-specific aliases so they do not collide with the existing shadcn-style `primary`, `secondary`, and `accent` roles. Components should consume utilities such as `bg-brand`, `text-brand-dark`, and `border-brand-accent` instead of repeating literal hex values.

Keep white, black, transparent, and genuinely one-off illustration colors as direct values where introducing a semantic token would not improve reuse or meaning.

## Opacity Roles

Standardize recurring opacity treatments only where they express a shared role:

- Secondary or supporting text: approximately 70%.
- Placeholder or disabled content: approximately 40%.
- Borders and dividers: approximately 12%.
- Subtle tinted backgrounds: approximately 5%.

Preserve stronger or weaker opacity when it is necessary for contrast, an image overlay, or an intentional decorative layer. This is not a mechanical replacement of every alpha value.

## Section Spacing System

Create three reusable vertical section-spacing roles:

- Compact: `48px` mobile and `64px` desktop.
- Standard: `64px` mobile, `80px` tablet, and `96px` desktop.
- Feature: `64px` mobile and `96px` from tablet upward.

Expose these roles as explicit global utilities so component markup communicates section hierarchy rather than repeating arbitrary `py-*` combinations.

Apply them according to content density:

- Compact for transitional or conversion-focused sections that should remain closely connected to adjacent content.
- Standard for ordinary informational sections.
- Feature for major narrative sections that need more breathing room.

Do not change the Hero height or its internal spacing. Do not mechanically replace card padding, grid gaps, button padding, or internal component spacing; UX-11 standardizes the distance between page sections, not every spacing value in the application.

## Migration Approach

Remove repeated primary palette literals and local `COLORS` objects from public landing components when they map directly to the approved semantic palette. Prefer Tailwind semantic utilities in class names. Use CSS variables in inline styles only where a library or dynamic style cannot consume a Tailwind class.

Perform the migration section by section and compare each result against the current page. Tokenization must not create a visible redesign. Any class replacement should preserve hover, focus, responsive, and animation states.

## Design Engineering Constraints

- Consistency should be invisible: the page should feel more coherent without looking newly redesigned.
- Preserve the existing visual hierarchy; do not give every section the same amount of whitespace.
- Avoid abstract tokens that describe a literal color number rather than a design role.
- Avoid adding motion as part of the token migration.
- Keep interactive feedback and focus states intact.
- Maintain sufficient text and control contrast when replacing colors with semantic utilities.

## Testing And Verification

Add focused tests that verify:

- All seven NUSA semantic color tokens are declared globally with their approved values.
- The three section-spacing roles are declared with the approved responsive values.
- Public landing components no longer repeat the primary NUSA palette literals that have semantic equivalents.
- Header and Footer use the shared public color tokens.
- The unscoped registration wizard, admin interface, and test pages are not unintentionally migrated.

Run focused tests, the complete Vitest suite, TypeScript checking, the production build, and final diff checks. Existing unrelated TypeScript baseline errors should be reported rather than silently modified.

Visually review the landing page at representative mobile and desktop widths, checking section rhythm, text contrast, hover/focus states, and any accidental color changes. Stop for user visual review before merging into `main`.

## Out Of Scope

- Redesigning a section or changing its content.
- Changing Hero height or internal Hero composition.
- Reworking card, grid, or button spacing systems.
- Migrating the registration wizard, admin pages, or test-only pages.
- Standardizing motion and reduced-motion behavior (`UX-12`).
- Updating Open Graph or structured data (`UX-13`).
- Changing typography roles established by `UX-10`.
