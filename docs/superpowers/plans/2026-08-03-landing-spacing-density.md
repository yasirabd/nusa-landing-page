# Landing Page Spacing Density Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reduce excessive landing-page whitespace by approximately 15-25% while retaining the approved hierarchy, responsive clarity, and accessible controls.

**Architecture:** Tighten the three shared section-spacing utilities first, then reduce compounding local margins, gaps, and card padding in the densest landing sections. Protect the new rhythm with source-level Vitest assertions and run the existing rendering suite to catch behavioral regressions.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS v4, Vitest, Testing Library.

---

### Task 1: Lock the balanced spacing contract

**Files:**
- Create: `tests/landing-spacing-density.test.ts`
- Modify: `app/globals.css`
- Modify: `components/nusa-tagline.tsx`

- [ ] **Step 1: Write the failing shared-spacing tests**

Create `tests/landing-spacing-density.test.ts`:

```ts
import { readFileSync } from "node:fs"
import { describe, expect, it } from "vitest"

const read = (path: string) => readFileSync(path, "utf8")

describe("landing-page spacing density", () => {
  it("uses the approved balanced section-spacing scale", () => {
    const styles = read("app/globals.css")

    expect(styles).toMatch(
      /\.section-spacing-compact\s*\{\s*padding-block:\s*2\.5rem;/,
    )
    expect(styles).toMatch(
      /\.section-spacing-standard\s*\{\s*padding-block:\s*3\.5rem;/,
    )
    expect(styles).toMatch(
      /\.section-spacing-feature\s*\{\s*padding-block:\s*5rem;/,
    )
    expect(styles).toContain("padding-block: 6.5rem;")
    expect(styles).toContain("padding-block: 8rem;")
    expect(styles).not.toContain("padding-block: 10rem;")
  })

  it("tightens the landing statement without changing its copy", () => {
    const tagline = read("components/nusa-tagline.tsx")

    expect(tagline).toContain("space-y-6 sm:space-y-8 md:space-y-9")
    expect(tagline).not.toContain("space-y-8 sm:space-y-10 md:space-y-12")
    expect(tagline).toContain("Faith at Heart. Tech in Hand. Purpose in Action.")
  })
})
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npm test -- tests/landing-spacing-density.test.ts`

Expected: FAIL because the existing global values and tagline spacing are larger.

- [ ] **Step 3: Implement the shared scale and tagline rhythm**

Update `app/globals.css` to use:

```css
.section-spacing-compact {
  padding-block: 2.5rem;
}

.section-spacing-standard {
  padding-block: 3.5rem;
}

.section-spacing-feature {
  padding-block: 5rem;
}

@media (min-width: 48rem) {
  .section-spacing-compact {
    padding-block: 3.5rem;
  }

  .section-spacing-standard {
    padding-block: 4.5rem;
  }

  .section-spacing-feature {
    padding-block: 6.5rem;
  }
}

@media (min-width: 64rem) {
  .section-spacing-compact {
    padding-block: 4rem;
  }

  .section-spacing-standard {
    padding-block: 5rem;
  }

  .section-spacing-feature {
    padding-block: 8rem;
  }
}
```

In `components/nusa-tagline.tsx`, replace the statement stack spacing with:

```tsx
className="flex flex-col items-center justify-center space-y-6 text-center sm:space-y-8 md:space-y-9"
```

- [ ] **Step 4: Run the test and verify GREEN**

Run: `npm test -- tests/landing-spacing-density.test.ts`

Expected: 2 tests PASS.

### Task 2: Tighten the largest feature sections

**Files:**
- Modify: `tests/landing-spacing-density.test.ts`
- Modify: `components/curriculum-section.tsx`
- Modify: `components/program-section.tsx`
- Modify: `components/teaching-team-section.tsx`

- [ ] **Step 1: Add failing assertions for legacy feature spacing**

Append this test inside the existing `describe` block:

```ts
it("removes the largest compounding gaps from feature sections", () => {
  const curriculum = read("components/curriculum-section.tsx")
  const program = read("components/program-section.tsx")
  const teaching = read("components/teaching-team-section.tsx")

  expect(curriculum).toContain("mb-12 md:mb-14")
  expect(curriculum).not.toContain("mb-16 md:mb-20")
  expect(program).toContain("mt-12 md:mt-16")
  expect(program).toContain("mt-14 md:mt-20")
  expect(program).toContain("mb-10 md:mb-16 last:mb-0")
  expect(program).not.toMatch(/md:mt-(?:24|32)|md:mb-(?:20|24)/)
  expect(teaching).toContain("mb-10 md:mb-14")
  expect(teaching).not.toContain("mb-16 md:mb-24")
})
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npm test -- tests/landing-spacing-density.test.ts`

Expected: FAIL on the new feature-section assertions.

- [ ] **Step 3: Tighten curriculum spacing**

Apply these class changes in `components/curriculum-section.tsx`:

```text
mb-16 md:mb-20 -> mb-12 md:mb-14
mt-6 md:mt-8 -> mt-5 md:mt-6
gap-8 md:gap-10 lg:gap-12 -> gap-6 md:gap-8 lg:gap-10
px-8 pb-8 md:px-10 md:pb-10 -> px-6 pb-6 md:px-8 md:pb-8
mb-6 -> mb-5
space-y-4 -> space-y-3
```

- [ ] **Step 4: Tighten program spacing**

Apply these class changes in `components/program-section.tsx`:

```text
mt-16 md:mt-24 -> mt-12 md:mt-16
p-8 md:p-12 -> p-6 md:p-8
mb-8 -> mb-6
md:gap-10 -> md:gap-8
mt-20 md:mt-32 -> mt-14 md:mt-20
mb-12 md:mb-20 -> mb-8 md:mb-12
mb-12 md:mb-24 last:mb-0 -> mb-10 md:mb-16 last:mb-0
md:pr-16 -> md:pr-12
md:pl-16 -> md:pl-12
mt-16 md:mt-24 -> mt-12 md:mt-16
pt-10 -> pt-8
```

Keep the timeline structure, copy, and CTA dimensions unchanged.

- [ ] **Step 5: Tighten teaching-team spacing**

Apply these class changes in `components/teaching-team-section.tsx`:

```text
mb-16 md:mb-24 -> mb-10 md:mb-14
gap-6 md:gap-8 lg:gap-10 -> gap-5 md:gap-6 lg:gap-8
p-8 md:p-10 -> p-6 md:p-8
mb-6 md:mb-8 -> mb-5 md:mb-6
```

- [ ] **Step 6: Run spacing and anchor tests**

Run: `npm test -- tests/landing-spacing-density.test.ts tests/section-anchors.test.tsx`

Expected: both test files PASS.

### Task 3: Normalize supporting sections and footer

**Files:**
- Modify: `tests/landing-spacing-density.test.ts`
- Modify: `components/why-choose-section.tsx`
- Modify: `components/gallery-section.tsx`
- Modify: `components/testimonials-section.tsx`
- Modify: `components/fee-info-section.tsx`
- Modify: `components/faq-section.tsx`
- Modify: `components/partner-section.tsx`
- Modify: `components/registration-section.tsx`
- Modify: `components/footer.tsx`

- [ ] **Step 1: Add failing assertions for supporting-section rhythm**

Append this test:

```ts
it("normalizes supporting sections without shrinking controls", () => {
  const faq = read("components/faq-section.tsx")
  const fees = read("components/fee-info-section.tsx")
  const partner = read("components/partner-section.tsx")
  const registration = read("components/registration-section.tsx")
  const footer = read("components/footer.tsx")

  expect(faq).toContain("gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-12")
  expect(faq).toContain("py-4")
  expect(fees).toContain("mb-8 md:mb-12")
  expect(partner).toContain("p-6 md:p-8 lg:p-10")
  expect(registration).toContain("p-6")
  expect(registration).toContain("md:p-10")
  expect(registration).toContain("py-7")
  expect(footer).toContain("pt-12")
  expect(footer).toContain("md:pt-16")
  expect(footer).not.toContain("md:pt-24")
})
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npm test -- tests/landing-spacing-density.test.ts`

Expected: FAIL on the new supporting-section assertions.

- [ ] **Step 3: Tighten why-choose, gallery, and testimonials**

Apply these targeted changes:

`components/why-choose-section.tsx`

```text
gap-10 lg:gap-16 xl:gap-20 -> gap-8 lg:gap-12 xl:gap-16
py-6 md:py-8 -> py-5 md:py-6
mt-12 md:mt-16 -> mt-10 md:mt-14
gap-9 p-7 sm:p-9 md:p-11 lg:gap-14 lg:p-12 -> gap-7 p-6 sm:p-8 md:p-9 lg:gap-10 lg:p-10
mt-8 -> mt-7
```

`components/gallery-section.tsx`

```text
mb-10 md:mb-12 -> mb-8 md:mb-10
mt-8 pt-6 md:mt-10 md:pt-8 -> mt-6 pt-5 md:mt-8 md:pt-6
```

`components/testimonials-section.tsx`

```text
lg:p-10 -> lg:p-8
mt-6 pt-5 -> mt-5 pt-4
mt-8 -> mt-7
mt-5 -> mt-4
```

- [ ] **Step 4: Tighten fees, FAQ, partners, and registration framing**

Apply these targeted changes:

`components/fee-info-section.tsx`

```text
mb-10 md:mb-16 -> mb-8 md:mb-12
mb-8 md:mb-10 -> mb-6 md:mb-8
gap-6 md:gap-8 mb-12 md:mb-16 -> gap-5 md:gap-6 mb-10 md:mb-12
bg-white p-8 -> bg-white p-6 md:p-7
mb-6 -> mb-5
mb-8 -> mb-6
space-y-3 mb-8 -> space-y-3 mb-6
gap-6 md:gap-10 -> gap-5 md:gap-8
```

`components/faq-section.tsx`

```text
gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16 -> gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-12
mb-5 -> mb-4
mt-5 -> mt-4
py-5 -> py-4
pb-5 -> pb-4
```

`components/partner-section.tsx`

```text
mb-8 md:mb-12 -> mb-6 md:mb-8
p-8 md:p-10 lg:p-12 -> p-6 md:p-8 lg:p-10
gap-8 md:gap-10 -> gap-6 md:gap-8
```

`components/registration-section.tsx`

```text
p-8 md:p-12 -> p-6 md:p-10
gap-8 -> gap-6
```

Do not change the registration button's `py-7 md:py-8` sizing.

- [ ] **Step 5: Tighten footer grouping**

Apply these class changes in `components/footer.tsx`:

```text
pt-16 pb-6 md:pt-24 md:pb-8 -> pt-12 pb-6 md:pt-16 md:pb-8
gap-10 md:gap-8 -> gap-8 md:gap-7
mb-5 -> mb-4
mb-6 -> mb-5
space-y-6 -> space-y-5
mt-10 md:mt-16 pt-6 md:pt-8 -> mt-8 md:mt-12 pt-5 md:pt-6
```

- [ ] **Step 6: Run landing-page tests**

Run: `npm test -- tests/landing-spacing-density.test.ts tests/section-anchors.test.tsx tests/gallery-images.test.tsx tests/testimonials-section.test.tsx tests/fee-info-section.test.tsx tests/faq-section.test.tsx tests/public-cta-accessibility.test.tsx`

Expected: all selected test files PASS.

### Task 4: Verify the completed spacing audit

**Files:**
- Review: `app/globals.css`
- Review: `components/*.tsx` files modified in Tasks 1-3

- [ ] **Step 1: Verify forbidden legacy spacing is absent from scoped sections**

Run:

```powershell
rg -n "padding-block: 10rem|md:mt-32|md:mb-24|md:pt-24" app/globals.css components/program-section.tsx components/teaching-team-section.tsx components/footer.tsx
```

Expected: no matches.

- [ ] **Step 2: Run the full test suite**

Run: `npm test`

Expected: all test files PASS.

- [ ] **Step 3: Run TypeScript and diff checks**

Run: `npx tsc --noEmit`

Expected: no new errors in modified landing-page files. If the known errors in `app/admin/page.tsx` or `components/footer.tsx` remain, inspect whether footer edits affected the existing footer typing error and report the exact result.

Run: `git diff --check`

Expected: exit code 0.

- [ ] **Step 4: Review scope and status**

Run: `git status --short`

Confirm that only the implementation plan, spacing test, shared CSS, and scoped landing-page components changed.

