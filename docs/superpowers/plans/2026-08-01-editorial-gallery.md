# Editorial Landing Gallery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the twelve equally weighted landing-gallery cards with an eight-item editorial preview, inline access to all twelve activities, and an optional Instagram update link.

**Architecture:** Keep `GALLERY_ITEMS` as the canonical dataset and export one derived landing ordering. Convert `GallerySection` into a small client component with local disclosure state, render one responsive editorial grid, remove obsolete image-hover CSS, and protect content order, responsive images, disclosure semantics, interaction, and calm motion with focused tests.

**Tech Stack:** Next.js 16, React 18, TypeScript, Tailwind CSS, Lucide React, Vitest, Testing Library.

---

### Task 1: Add failing gallery disclosure and ordering tests

**Files:**
- Modify: `tests/gallery-images.test.tsx`

- [ ] **Step 1: Replace the twelve-visible-images expectation**

Import `fireEvent`. Define the approved twelve-item landing order and verify that only the first eight images render initially, in order. Verify the section copy:

```tsx
expect(
  screen.getByRole("heading", { name: "Kehidupan Santri di NUSA" }),
).toBeVisible()
expect(
  screen.getByText(
    "Beragam kegiatan yang membentuk skill, karakter, keberanian, dan kepedulian santri.",
  ),
).toBeVisible()

expect(screen.getAllByRole("img").map((image) => image.getAttribute("alt"))).toEqual(
  approvedOrder.slice(0, 8),
)
```

- [ ] **Step 2: Add disclosure behavior tests**

Verify the initial button label, `aria-expanded="false"`, and `aria-controls="gallery-kegiatan-lengkap"`. Click it, assert all twelve images appear in the approved order, assert the label changes to `Tampilkan Lebih Sedikit`, click again, and assert eight images remain.

- [ ] **Step 3: Add Instagram and interaction contract tests**

Verify `Lihat Update Terbaru di Instagram` links to `https://instagram.com/nusaboardingschool`, opens in a new tab, and uses `rel="noopener noreferrer"`. Both actions must include `min-h-12`, `duration-150`, `active:scale-[0.97]`, `focus-visible:ring-2`, and `motion-reduce:active:scale-100`.

- [ ] **Step 4: Add data, layout, and static-presentation assertions**

Verify:

- `GALLERY_ITEMS` still contains twelve unique records.
- `LANDING_GALLERY_ITEMS` contains all twelve exactly once in the approved order.
- `NUSA Mengajar` has the featured `md:col-span-2 lg:col-span-2 lg:row-span-2` classes.
- The grid uses `md:grid-cols-2`, `lg:grid-cols-4`, and `lg:auto-rows-[220px]`.
- Source contains no carousel, hover-only reveal, `hover:-translate`, image scale, `transition-all`, `duration-300`, `duration-500`, or `duration-700`.
- `app/globals.css` no longer contains `.gallery-card:hover .gallery-image` or the gallery-image reduced-motion block.

- [ ] **Step 5: Run the focused test and verify RED**

```powershell
npx vitest run tests/gallery-images.test.tsx --pool=forks --maxWorkers=1 --minWorkers=1
```

Expected: FAIL because all twelve images render immediately and disclosure controls do not exist.

### Task 2: Implement the curated ordering and editorial disclosure grid

**Files:**
- Modify: `components/gallery-content.ts`
- Modify: `components/gallery-section.tsx`
- Modify: `app/globals.css`
- Modify: `tests/gallery-images.test.tsx`

- [ ] **Step 1: Export the approved landing ordering**

Keep `GALLERY_ITEMS` unchanged. Add an ordered list of the twelve approved names, map each name back to its canonical record, throw if a name is missing, and export the result as `LANDING_GALLERY_ITEMS`.

Also export:

```tsx
export const GALLERY_FEATURED_IMAGE_SIZES =
  "(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) calc(100vw - 4rem), (max-width: 1279px) calc(50vw - 2.5rem), 584px"

export const GALLERY_TILE_IMAGE_SIZES =
  "(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) calc(50vw - 3rem), (max-width: 1279px) calc(25vw - 2rem), 284px"
```

- [ ] **Step 2: Convert `GallerySection` to a client disclosure component**

Add `"use client"`, import `useState`, and render the first eight or all twelve items based on `isExpanded`. Put `id="gallery-kegiatan-lengkap"` on the grid controlled by the disclosure button.

- [ ] **Step 3: Build the editorial grid**

Use a left-aligned compact header and:

```tsx
<div
  id="gallery-kegiatan-lengkap"
  className="grid gap-4 md:grid-cols-2 lg:auto-rows-[220px] lg:grid-cols-4"
>
```

Give index zero `md:col-span-2 lg:col-span-2 lg:row-span-2`, index one `lg:col-span-2`, and standard cells to the remaining activities. Use permanently visible gradient captions and no hover transforms or shadows.

- [ ] **Step 4: Add disclosure and Instagram actions**

Render a button with dynamic labels, `aria-expanded`, and `aria-controls`. Render the external Instagram link. Both controls use explicit property transitions at `150ms`, press scale `0.97`, visible focus rings, minimum 48px height, and reduced-motion fallbacks.

- [ ] **Step 5: Remove obsolete gallery image-hover CSS**

Delete the `.gallery-card:hover .gallery-image` fine-pointer rule and the `.gallery-image` reduced-motion rule from `app/globals.css`.

- [ ] **Step 6: Run focused tests and verify GREEN**

```powershell
npx vitest run tests/gallery-images.test.tsx tests/section-anchors.test.tsx tests/reduced-motion.test.ts --pool=forks --maxWorkers=1 --minWorkers=1
```

Expected: all focused tests PASS.

- [ ] **Step 7: Commit**

```powershell
git add app/globals.css components/gallery-content.ts components/gallery-section.tsx tests/gallery-images.test.tsx
git commit -m "feat: add expandable editorial gallery"
```

### Task 3: Verify the integrated feature

**Files:**
- Verify all files changed in Tasks 1-2.

- [ ] **Step 1: Run the full test suite**

```powershell
npx vitest run --pool=forks --maxWorkers=1 --minWorkers=1
```

- [ ] **Step 2: Run TypeScript checking**

```powershell
npx tsc --noEmit
```

Expected: no errors in changed files. Report only known unrelated baseline errors if they remain.

- [ ] **Step 3: Run the production build**

```powershell
$env:NEXT_TELEMETRY_DISABLED='1'; npm run build
```

- [ ] **Step 4: Inspect final branch state**

```powershell
git diff main...HEAD --check
git status --short --branch
git diff --stat main...HEAD
```

- [ ] **Step 5: Request independent review and stop for user review**

Review against `docs/superpowers/specs/2026-08-01-editorial-gallery-design.md`, fix Critical and Important findings, re-run verification, and preserve the branch without merging until the user approves the visual result.
