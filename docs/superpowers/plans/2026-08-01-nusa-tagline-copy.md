# NUSA Tagline Copy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the generic supporting tagline with the approved English value statement while preserving the existing section design.

**Architecture:** Make a copy-only change in `NUSATaglineSection`. Add a focused source/render test that protects the approved tagline, removal of the previous line, and retention of the main headline.

**Tech Stack:** Next.js 16, React 18, TypeScript, Vitest, Testing Library.

---

### Task 1: Approved NUSA supporting tagline

**Files:**
- Create: `tests/nusa-tagline.test.tsx`
- Modify: `components/nusa-tagline.tsx`

- [ ] **Step 1: Write the failing tagline test**

Create `tests/nusa-tagline.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { NUSATaglineSection } from "@/components/nusa-tagline"

describe("NUSA tagline", () => {
  it("uses the approved faith, technology, and purpose statement", () => {
    render(<NUSATaglineSection />)

    expect(screen.getByText(/Rise as a/i)).toBeVisible()
    expect(screen.getByText(/Muslim Tangguh,/)).toBeVisible()
    expect(screen.getByText(/Jago IT\./)).toBeVisible()
    expect(
      screen.getByText("Faith at Heart. Tech in Hand. Purpose in Action."),
    ).toBeVisible()
    expect(
      screen.queryByText("Lead with faith, knowledge, and courage."),
    ).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the targeted test and verify RED**

Run:

```powershell
npx vitest run tests/nusa-tagline.test.tsx --pool=forks --maxWorkers=1 --minWorkers=1
```

Expected: FAIL because the approved supporting tagline is not rendered.

- [ ] **Step 3: Implement the approved copy**

In `components/nusa-tagline.tsx`, replace only the supporting `h3` text:

```tsx
<h3 className="text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-medium leading-relaxed tracking-tight opacity-75 mx-auto max-w-4xl" style={{ color: COLORS.darkBase }}>
  Faith at Heart. Tech in Hand. Purpose in Action.
</h3>
```

Do not alter the main headline, styles, spacing, or animation behavior.

- [ ] **Step 4: Verify the change**

Run:

```powershell
npx vitest run tests/nusa-tagline.test.tsx --pool=forks --maxWorkers=1 --minWorkers=1
npx vitest run --pool=forks --maxWorkers=1 --minWorkers=1
npm run build
git diff --check
```

Expected: targeted and full tests PASS, production build exits successfully, and `git diff --check` reports no errors.

- [ ] **Step 5: Commit**

```powershell
git add components/nusa-tagline.tsx tests/nusa-tagline.test.tsx
git commit -m "copy: refine NUSA supporting tagline"
```
