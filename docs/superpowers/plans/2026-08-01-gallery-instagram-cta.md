# Gallery Instagram CTA Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the isolated Instagram link beneath the gallery into a contextual, responsive closing row with supporting copy and a clear secondary CTA.

**Architecture:** Keep the CTA inside `GallerySection` and add no new component or state. Replace the plain action wrapper with a bordered responsive flex row containing approved supporting copy and the existing external link, then update focused tests to protect content, layout, accessibility, and restrained interaction styling.

**Tech Stack:** Next.js 16, React 18, TypeScript, Tailwind CSS, Lucide React, Vitest, Testing Library.

---

### Task 1: Define the contextual CTA contract with failing tests

**Files:**
- Modify: `tests/gallery-images.test.tsx`

- [ ] **Step 1: Update the Instagram content expectation**

In the Instagram accessibility test, assert the approved supporting copy and new link label:

```tsx
expect(
  screen.getByRole("heading", { name: "Ikuti kegiatan terbaru NUSA" }),
).toBeVisible()
expect(
  screen.getByText(
    "Dokumentasi dan kabar kegiatan santri lainnya kami bagikan secara rutin di Instagram.",
  ),
).toBeVisible()

const instagram = screen.getByRole("link", {
  name: "Ikuti NUSA di Instagram",
})
```

- [ ] **Step 2: Protect the responsive footer layout**

Assert the link parent is a bordered mobile-column/desktop-row footer and the link is full-width only on mobile:

```tsx
const footer = instagram.parentElement as HTMLElement
expect(footer).toHaveClass(
  "flex-col",
  "border-t",
  "md:flex-row",
  "md:items-center",
  "md:justify-between",
)
expect(instagram).toHaveClass("w-full", "md:w-auto", "bg-[#134146]", "text-white")
```

Keep the existing URL, `target`, `rel`, minimum height, 150ms explicit transition, active scale, focus ring, and reduced-motion assertions.

- [ ] **Step 3: Run the focused test and verify RED**

```powershell
npx vitest run tests/gallery-images.test.tsx --pool=forks --maxWorkers=1 --minWorkers=1
```

Expected: FAIL because the supporting copy, new label, responsive footer classes, and solid CTA treatment do not exist.

### Task 2: Implement the contextual Instagram footer row

**Files:**
- Modify: `components/gallery-section.tsx`

- [ ] **Step 1: Replace the plain action wrapper**

Replace `<div className="mt-8 flex">` with:

```tsx
<div className="mt-8 flex flex-col gap-5 border-t border-[#134146]/15 pt-6 md:mt-10 md:flex-row md:items-center md:justify-between md:gap-8 md:pt-8">
```

- [ ] **Step 2: Add approved supporting content**

Insert before the external link:

```tsx
<div className="max-w-2xl">
  <h3 className="text-lg font-bold text-[#134146]">
    Ikuti kegiatan terbaru NUSA
  </h3>
  <p className="mt-1 text-sm font-medium leading-relaxed text-[#134146]/75 sm:text-base">
    Dokumentasi dan kabar kegiatan santri lainnya kami bagikan secara rutin di Instagram.
  </p>
</div>
```

- [ ] **Step 3: Restyle and relabel the Instagram link**

Keep its URL and external attributes. Use:

```tsx
className="inline-flex min-h-12 w-full shrink-0 items-center justify-center gap-2 rounded-full border-2 border-[#134146] bg-[#134146] px-6 py-2.5 text-sm font-bold text-white transition-[background-color,border-color,color,transform] duration-150 hover:border-[#0d3438] hover:bg-[#0d3438] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#42CDBA] focus-visible:ring-offset-2 active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100 md:w-auto"
```

Change the label to:

```tsx
Ikuti NUSA di Instagram
```

- [ ] **Step 4: Run focused tests and verify GREEN**

```powershell
npx vitest run tests/gallery-images.test.tsx tests/section-anchors.test.tsx tests/reduced-motion.test.ts --pool=forks --maxWorkers=1 --minWorkers=1
```

Expected: all focused tests PASS.

- [ ] **Step 5: Commit implementation**

```powershell
git add components/gallery-section.tsx tests/gallery-images.test.tsx
git commit -m "feat: contextualize gallery Instagram CTA"
```

### Task 3: Verify and review the CTA refinement

**Files:**
- Verify: `components/gallery-section.tsx`
- Verify: `tests/gallery-images.test.tsx`

- [ ] **Step 1: Run the complete test suite**

```powershell
npx vitest run --pool=forks --maxWorkers=1 --minWorkers=1
```

- [ ] **Step 2: Run TypeScript checking**

```powershell
npx tsc --noEmit
```

Expected: no errors in changed gallery files. Report only known unrelated baseline errors in `app/admin/page.tsx`, `components/footer.tsx`, and `components/testimonials-section.tsx` if they remain.

- [ ] **Step 3: Run the production build**

```powershell
$env:NEXT_TELEMETRY_DISABLED='1'; npm run build
```

- [ ] **Step 4: Inspect branch state**

```powershell
git diff main...HEAD --check
git status --short --branch
git diff --stat main...HEAD
```

Expected: diff check is clean and the user's untracked `docs/2026-07-30-ui-ux-audit.md` remains untouched.

- [ ] **Step 5: Request independent review and stop for visual review**

Review against `docs/superpowers/specs/2026-08-01-editorial-gallery-design.md`. Fix Critical and Important findings, rerun verification, and keep `feat/editorial-gallery` unmerged until the user approves the visual result.
