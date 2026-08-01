# Editorial Landing Gallery Design

## Goal

Make the landing-page gallery feel active and abundant by showing all twelve activities in one compact editorial grid without requiring an extra disclosure interaction.

## Scope

Redesign `GallerySection` as a compact editorial gallery. Show all twelve activities immediately and keep an optional link to Instagram for newer activity updates.

Preserve all twelve existing gallery records, optimized WebP sources, mobile source variants, captions, and image metadata. Do not create a separate gallery route or lightbox in this feature.

## Content Hierarchy

Use the following section copy:

- Heading: `Kehidupan Santri di NUSA`
- Supporting copy: `Beragam kegiatan yang membentuk skill, karakter, keberanian, dan kepedulian santri.`

The twelve activities appear immediately in this exact order:

1. `NUSA Mengajar` — featured image.
2. `IT Camp`
3. `Jualan di Car Free Day`
4. `MPLS`
5. `Talking to Stranger`
6. `Takziah Tetangga`
7. `Jualan di Market Day`
8. `Leadership Camp`
9. `Google I/O Extended Semarang`
10. `Bersukaria: City Tour Mataram`
11. `IT Camp: Outbond`
12. `Bersukaria: City Tour Legend Culinary (English)`

## Layout

Reduce section spacing from the current monumental `py-24 md:py-32 lg:py-40` treatment to `py-16 md:py-20 lg:py-24`.

Use a left-aligned section header. Keep the Instagram link in the bottom action area so mobile and desktop users encounter it after seeing the gallery content.

Responsive grid:

- Mobile: one column; every caption has enough width to remain readable.
- `md`: two columns; the featured item spans both columns.
- `lg`: four-column editorial grid with fixed visual rows. `NUSA Mengajar` spans two columns and two rows. `IT Camp` spans two columns across the top-right area. Remaining items use one cell each.
- The remaining activities continue in standard grid cells after the first editorial group.

The complete grid is present on initial render. Do not animate grid height or item entry.

## Image Presentation

- Continue using `next/image` inside responsive `<picture>` elements.
- Continue serving the committed 640px and full-size WebP variants.
- Update `sizes` to match the new one-, two-, and four-column grid.
- Preserve each image's width, height, and `objectPosition` metadata.
- Use `object-cover` within the editorial cells.
- Captions remain permanently visible in a restrained bottom gradient.
- Do not rely on hover for names or descriptions.
- Do not add image zoom, card lift, glow, or large shadows.

## Instagram Link

Keep an external link with this content:

- Label: `Lihat Update Terbaru di Instagram`
- Destination: `https://instagram.com/nusaboardingschool`
- Opens in a new tab.
- Uses `target="_blank"` and `rel="noopener noreferrer"`.

The link is the only action below the gallery. It has a minimum 48px touch target, visible focus treatment, explicit `150ms` transitions, press feedback, and a reduced-motion fallback. Instagram is presented as the source for newer updates, not as a requirement for seeing the twelve landing-page activities.

## Motion Principles

- No carousel.
- No auto-play.
- No grid-height animation.
- No stagger or entrance animation.
- No card hover lift, scale, glow, or long transition.
- Only the Instagram link uses subtle press feedback.

## Accessibility

- Preserve `id="kehidupan-santri"` and `scroll-mt-20`.
- Each activity remains a semantic `article` with an accessible label.
- Each image keeps a descriptive `alt` matching the activity name.
- Names and descriptions remain visible without hover.
- Keyboard focus remains visible on the Instagram link.
- Reduced-motion users receive no transform-based press feedback.

## Data Model

Keep `GALLERY_ITEMS` as the canonical twelve-item dataset. Export a landing-page ordering derived from those records, rather than duplicating image metadata or deleting unused items.

The landing ordering must contain all twelve records exactly once and place `NUSA Mengajar` first.

## Testing

Add or update focused tests to verify:

- All twelve images and captions render immediately in the approved order.
- `NUSA Mengajar` receives the featured layout classes.
- No gallery disclosure button, local expansion state, or hidden activity subset remains.
- The Instagram link has the correct URL, external-link attributes, touch target, focus ring, explicit transitions, press feedback, and reduced-motion fallback.
- All images keep responsive WebP source sets, Next Image rendering, descriptive alt text, and updated `sizes`.
- Captions are statically present and source code contains no hover-only reveal, carousel, grid-height animation, long duration, card lift, glow, or image zoom.
- The canonical dataset still contains all twelve unique records.

Run focused tests, the complete Vitest suite, TypeScript checking, production build, and final diff checks. Request independent review and stop for user review before merging.

## Out Of Scope

- A `/galeri` route.
- A lightbox or modal.
- Uploading new photography.
- Editing or deleting existing gallery records.
- Fetching Instagram content through an API.
- Removing the Instagram profile link.
