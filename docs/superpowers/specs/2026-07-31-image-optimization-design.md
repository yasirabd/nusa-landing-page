# Landing Image Optimization Design

**Date:** 31 July 2026  
**Source:** `docs/2026-07-30-ui-ux-audit.md`  
**Scope:** Second incremental audit feature only: visitor-facing hero and gallery image delivery.

## Goal

Reduce the landing page's image transfer cost without changing its content hierarchy or removing source photography, so mobile visitors see the same NUSA story with faster loading and smoother scrolling.

## Scope

This feature optimizes the hero image and all 12 images currently shown in the landing-page gallery. The original high-resolution files remain in `public/images` as archival sources. New WebP derivatives become the only versions referenced by the public landing page.

The feature does not shorten the gallery, add a lightbox, create a separate gallery page, rewrite hero content, or reorganize landing-page sections. Those remain separate audit features with their own review checkpoints.

## Asset Strategy

- Generate one visitor-facing WebP derivative for the hero and each gallery image.
- Resize gallery derivatives to a maximum width of 1280 pixels and the hero derivative to 1200 pixels, preserving aspect ratio and reasonable high-density display headroom.
- Use a quality setting that keeps faces, text, and activity details clear while meeting the file-size budget.
- Keep every delivered gallery image below 500 KB and target 150-350 KB per image.
- Keep the combined 12-image gallery delivery set below 3 MB.
- Keep the hero derivative between 300 KB and 500 KB where source complexity permits; it must never exceed 500 KB.
- Preserve the original source files unchanged so future editorial crops can be regenerated without quality loss.

Generated files use explicit `.webp` names beside the original assets. The implementation records their intrinsic dimensions rather than relying on layout-time discovery.

## Component Architecture

`components/gallery-section.tsx` migrates from raw `<img>` elements to Next.js `Image`. Gallery metadata becomes a typed, exported data structure containing the activity name, description, optimized source, intrinsic width, intrinsic height, and optional `objectPosition` value.

Each gallery card uses:

- a stable descriptive key rather than its array index;
- an accurate `alt` value based on the activity;
- explicit dimensions and an aspect-ratio container to prevent layout shift;
- `sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1279px) calc(50vw - 3rem), 584px"` for one-column mobile and two-column desktop rendering;
- lazy loading through the default Next.js behavior;
- `object-cover` with per-photo crop positioning only where the subject would otherwise be obscured.

`components/hero-section.tsx` points its existing priority-loaded `Image` to the optimized hero derivative. It retains explicit dimensions, meaningful alt text, and uses `sizes="(max-width: 1023px) calc(100vw - 2rem), 50vw"` for the one-column mobile and two-column desktop layout.

The project keeps `images.unoptimized: true` in `next.config.mjs`. Pre-generated derivatives provide predictable bandwidth improvements without depending on a runtime image optimizer that may not exist in the deployment environment.

## Visual and Motion Behavior

The current hero and gallery composition remain recognizable. Optimization must not introduce visible stretching, unexpected crop changes, color casts, or blurry text and faces at normal rendered sizes.

Following Emil Kowalski's design-engineering principles, the gallery interaction is simplified:

- card feedback uses explicit border, shadow, and image-transform transitions;
- interaction durations stay between 150 ms and 200 ms;
- image scale is subtle and only applies on hover-capable, fine-pointer devices;
- descriptions remain visible by default on touch layouts;
- reduced-motion users receive color and elevation feedback without transform movement;
- no new reveal, pulse, stagger, or decorative loading animation is added.

## Accessibility

- Every image retains useful alternative text.
- Captions remain available without hover on touch devices.
- Image dimensions prevent cumulative layout shift.
- Motion is decorative and removed under `prefers-reduced-motion`.
- Cards do not gain pointer cursors or interactive semantics because this feature does not make them clickable.

## Testing

Automated tests verify:

- all 12 gallery entries reference `.webp` derivatives;
- the gallery renders Next.js `Image` rather than raw `<img>` markup;
- gallery images declare responsive `sizes`, dimensions, and descriptive alt text;
- the hero references its optimized WebP and remains priority-loaded;
- all optimized visitor-facing files exist;
- no optimized file exceeds 500 KB;
- the combined gallery derivative size is below 3 MB;
- the source files remain present and unchanged by the conversion workflow.

Manual review checks image clarity, crop quality, caption readability, mobile layout, desktop hover behavior, reduced motion, and absence of layout shift.

## Acceptance Criteria

- The landing page references optimized WebP derivatives for the hero and all 12 gallery images.
- No delivered hero or gallery asset exceeds 500 KB.
- The combined gallery derivative set is below 3 MB.
- Gallery rendering uses `next/image` with accurate dimensions and responsive sizing.
- Original source photography remains available and is not referenced by the landing page.
- The public composition and captions remain intact.
- The full automated suite and production build pass.
- Work stops after this feature so the user can review it before the hero rewrite begins.
