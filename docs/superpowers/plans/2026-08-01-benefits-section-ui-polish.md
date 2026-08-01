# Benefits Section UI Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Polish the consolidated benefits section with an editorial split layout, clearer surface transitions, calmer benefit presentation, and a more cohesive featured panel without changing approved copy.

**Architecture:** Keep `WhyChooseSection` stateless and retain its existing content arrays and semantics. Change only Tailwind layout and presentation classes, then protect the approved editorial grid, mobile CTA behavior, restrained static content, and unchanged copy with focused Vitest assertions.

**Tech Stack:** Next.js 16, React 18, TypeScript, Tailwind CSS, Lucide React, Vitest, Testing Library.

---

### Task 1: Protect the approved editorial polish with failing tests

**Files:**
- Modify: `tests/benefits-section.test.tsx`

- [ ] **Step 1: Add layout and copy-preservation assertions**

Add a test that renders `WhyChooseSection`, reads its source, and verifies:

```tsx
it("uses the approved editorial layout without changing its copy", () => {
  const source = readFileSync("components/why-choose-section.tsx", "utf8")
  const { container } = render(<WhyChooseSection />)
  const section = container.querySelector("section") as HTMLElement
  const benefitsList = section.querySelector("ul") as HTMLElement
  const cta = within(section).getByRole("link", { name: "Daftar Sekarang" })

  expect(section).toHaveClass("bg-[#F7F7F2]")
  expect(source).toContain(
    "lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]",
  )
  expect(benefitsList).toHaveClass("md:grid-cols-2", "lg:mt-0")
  expect(cta).toHaveClass("w-full", "sm:w-fit")
  expect(source).not.toContain("rounded-[2rem]")
  expect(source).not.toContain("shadow-[0_24px_70px")

  for (const copy of [
    "Pendidikan yang menyatukan pembentukan iman, keterampilan teknologi,",
    "Adab, ibadah, disiplin, dan kemandirian dibentuk melalui pendampingan keseharian.",
    "Belajar IT secara intensif dengan tools terkini, AI, dan project yang relevan dengan kebutuhan industri.",
    "Melatih bahasa Inggris, leadership, public speaking, dan soft skills untuk berkomunikasi dengan percaya diri.",
    "Membangun portofolio, mental berjualan, serta pengalaman freelance dan project berbayar.",
    "Gajian berarti mulai mendapat peluang penghasilan dari karya,",
  ]) {
    expect(source).toContain(copy)
  }
})
```

- [ ] **Step 2: Run the focused test and verify RED**

```powershell
npx vitest run tests/benefits-section.test.tsx --pool=forks --maxWorkers=1 --minWorkers=1
```

Expected: FAIL because the section still uses the mint surface, four-column benefit row, old panel radius/shadow, and non-responsive-width CTA.

- [ ] **Step 3: Commit the failing test only after implementation reaches GREEN**

The test and implementation are committed together in Task 2 so the branch never records a deliberately failing checkpoint.

### Task 2: Implement the editorial split and calmer featured panel

**Files:**
- Modify: `components/why-choose-section.tsx`
- Modify: `tests/benefits-section.test.tsx`

- [ ] **Step 1: Change the section surface and upper composition**

Use:

```tsx
<section className="bg-[#F7F7F2] py-16 md:py-20 lg:py-24">
```

Wrap the existing introduction and benefit list in:

```tsx
<div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:items-start lg:gap-16 xl:gap-20">
```

Keep the introduction copy unchanged. Change the benefits list to a two-column editorial grid from `md` upward and remove individual icon shadows.

- [ ] **Step 2: Add calm dividers and responsive benefit spacing**

Keep the semantic `ul` and four `li` elements. Use an outer top and bottom border, one-column mobile flow, and index-based borders so mobile items are separated while desktop forms a two-by-two grid. Use a quiet icon treatment:

```tsx
<span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#E3F3EE] text-[#2C8970] ring-1 ring-[#134146]/10">
```

Do not add hover classes, transition classes, glow, or card shadows to benefit items.

- [ ] **Step 3: Restrain and align the featured panel**

Change the featured panel to:

```tsx
<div className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-[#134146] text-white shadow-[0_18px_50px_rgba(19,65,70,0.14)] md:mt-16">
```

Use a `5fr 7fr` desktop grid, slightly tighter padding, and replace display-style stage numbers with small gold-tinted circular badges. Keep all panel copy and semantic `ol` unchanged.

- [ ] **Step 4: Make the CTA responsive without changing its interaction contract**

Add `w-full sm:w-fit` while preserving:

```tsx
min-h-12
duration-150
active:scale-[0.97]
focus-visible:ring-2
motion-reduce:transition-none
motion-reduce:active:scale-100
```

Keep the arrow transition and all decorative `aria-hidden="true"` attributes.

- [ ] **Step 5: Run focused tests and verify GREEN**

```powershell
npx vitest run tests/benefits-section.test.tsx tests/public-cta-accessibility.test.tsx --pool=forks --maxWorkers=1 --minWorkers=1
```

Expected: all focused tests PASS.

- [ ] **Step 6: Commit**

```powershell
git add components/why-choose-section.tsx tests/benefits-section.test.tsx
git commit -m "style: polish benefits section hierarchy"
```

### Task 3: Verify the polished feature

**Files:**
- Verify: `components/why-choose-section.tsx`
- Verify: `tests/benefits-section.test.tsx`

- [ ] **Step 1: Run the full test suite**

```powershell
npx vitest run --pool=forks --maxWorkers=1 --minWorkers=1
```

Expected: all tests PASS.

- [ ] **Step 2: Run TypeScript checking**

```powershell
npx tsc --noEmit
```

Expected: no errors in the changed files. Report the known unrelated baseline errors in `app/admin/page.tsx`, `components/footer.tsx`, and `components/testimonials-section.tsx` if they remain.

- [ ] **Step 3: Run the production build**

```powershell
$env:NEXT_TELEMETRY_DISABLED='1'; npm run build
```

Expected: build exits successfully and creates a fresh `.next/BUILD_ID`.

- [ ] **Step 4: Inspect the final branch state**

```powershell
git diff main...HEAD --check
git status --short --branch
git diff --stat main...HEAD
```

Expected: no whitespace errors, only approved feature files differ, and `docs/2026-07-30-ui-ux-audit.md` remains untracked and untouched.

- [ ] **Step 5: Request independent review and stop for user review**

Request a code review against the design specification. Fix Critical and Important findings, re-run verification, and preserve the feature branch without merging until the user approves the visual result.
