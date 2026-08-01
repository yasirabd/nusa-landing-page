# Show All Editorial Gallery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Show all twelve NUSA activities immediately and remove the unnecessary gallery disclosure interaction while retaining the editorial grid and Instagram update link.

**Architecture:** Keep `LANDING_GALLERY_ITEMS` as the ordered twelve-item data source. Convert `GallerySection` back to a server-compatible stateless component, map the complete dataset directly, and keep only the Instagram action below the grid. Update focused tests first so the removed disclosure behavior and immediate twelve-item rendering are protected.

**Tech Stack:** Next.js 16, React 18, TypeScript, Tailwind CSS, Next Image, Lucide React, Vitest, Testing Library.

---

### Task 1: Specify immediate twelve-item rendering with failing tests

**Files:**
- Modify: `tests/gallery-images.test.tsx`

- [ ] **Step 1: Replace the eight-item initial rendering assertion**

Update the first test to expect all twelve images immediately:

```tsx
expect(screen.getAllByRole("img").map((image) => image.getAttribute("alt"))).toEqual(
  approvedOrder,
)
```

- [ ] **Step 2: Replace disclosure behavior with absence assertions**

Remove the click-based expand/collapse test and add:

```tsx
it("shows every activity without a disclosure interaction", () => {
  render(<GallerySection />)

  expect(screen.getAllByRole("img")).toHaveLength(12)
  expect(
    screen.queryByRole("button", { name: "Lihat Semua 12 Kegiatan" }),
  ).not.toBeInTheDocument()
  expect(
    screen.queryByRole("button", { name: "Tampilkan Lebih Sedikit" }),
  ).not.toBeInTheDocument()
})
```

- [ ] **Step 3: Make the Instagram contract independent of a disclosure button**

Keep the Instagram URL and external-link assertions. Apply the interaction class assertions only to the Instagram link:

```tsx
expect(instagram).toHaveClass(
  "min-h-12",
  "duration-150",
  "active:scale-[0.97]",
  "focus-visible:ring-2",
  "motion-reduce:active:scale-100",
)
expect(instagram).not.toHaveClass("transition-all")
```

- [ ] **Step 4: Verify every responsive image and caption without clicking**

Remove `fireEvent` and the disclosure click. Iterate over `approvedOrder` immediately after rendering. Update the caption test to verify all twelve names and descriptions:

```tsx
for (const name of approvedOrder) {
  const item = galleryContent.GALLERY_ITEMS.find((candidate) => candidate.name === name)
  expect(screen.getByText(name)).toBeVisible()
  expect(screen.getByText(item?.description ?? "")).toBeVisible()
}
```

- [ ] **Step 5: Run the focused test and verify RED**

Run:

```powershell
npx vitest run tests/gallery-images.test.tsx --pool=forks --maxWorkers=1 --minWorkers=1
```

Expected: FAIL because only eight images render initially and the disclosure button still exists.

### Task 2: Remove gallery disclosure state and render all twelve activities

**Files:**
- Modify: `components/gallery-section.tsx`

- [ ] **Step 1: Remove client-only disclosure dependencies**

Delete:

```tsx
"use client"
import { ChevronDown, Instagram } from "lucide-react"
import { useState } from "react"
```

Replace the icon import with:

```tsx
import { Instagram } from "lucide-react"
```

- [ ] **Step 2: Remove local state and render the complete ordered dataset**

Delete `isExpanded`, `setIsExpanded`, and `visibleItems`. Change the grid mapping to:

```tsx
{LANDING_GALLERY_ITEMS.map((item, index) => {
```

Keep the existing featured, wide-tile, standard-tile, height, caption, and responsive image logic unchanged.

- [ ] **Step 3: Remove the disclosure button and simplify the action row**

Delete the disclosure `<button>` and its `ChevronDown` icon. Keep the Instagram link inside:

```tsx
<div className="mt-8 flex">
```

The Instagram link retains its external-link attributes, minimum touch target, explicit `150ms` transitions, focus ring, active scale, and reduced-motion fallback.

- [ ] **Step 4: Run focused tests and verify GREEN**

Run:

```powershell
npx vitest run tests/gallery-images.test.tsx tests/section-anchors.test.tsx tests/reduced-motion.test.ts --pool=forks --maxWorkers=1 --minWorkers=1
```

Expected: all focused tests PASS.

- [ ] **Step 5: Commit implementation**

```powershell
git add components/gallery-section.tsx tests/gallery-images.test.tsx
git commit -m "refactor: show all gallery activities"
```

### Task 3: Verify and review the simplified gallery

**Files:**
- Verify: `components/gallery-section.tsx`
- Verify: `tests/gallery-images.test.tsx`

- [ ] **Step 1: Run the complete test suite**

```powershell
npx vitest run --pool=forks --maxWorkers=1 --minWorkers=1
```

Expected: all Vitest tests PASS.

- [ ] **Step 2: Run TypeScript checking**

```powershell
npx tsc --noEmit
```

Expected: no errors in changed gallery files. Report only the known unrelated baseline errors in `app/admin/page.tsx`, `components/footer.tsx`, and `components/testimonials-section.tsx` if they remain.

- [ ] **Step 3: Run the production build**

```powershell
$env:NEXT_TELEMETRY_DISABLED='1'; npm run build
```

Expected: production build succeeds.

- [ ] **Step 4: Inspect the final branch state**

```powershell
git diff main...HEAD --check
git status --short --branch
git diff --stat main...HEAD
```

Expected: diff check is clean and only the user's untracked `docs/2026-07-30-ui-ux-audit.md` remains outside commits.

- [ ] **Step 5: Request independent review and stop for visual review**

Review the final diff against `docs/superpowers/specs/2026-08-01-editorial-gallery-design.md`. Fix all Critical and Important findings, rerun verification, and preserve `feat/editorial-gallery` without merging until the user approves the visual result.
