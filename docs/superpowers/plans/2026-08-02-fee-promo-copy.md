# Fee Promo Copy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Correct the entrance-fee promotion to a `10 Jt` discount and clarify when semester fees are paid.

**Architecture:** Keep the existing `FeeInfoSection` structure and update only its static fee data. Add one focused rendering test that locks the price calculation, promotional eligibility, strikethrough treatment, and non-duplicated semester schedule copy.

**Tech Stack:** React 18, TypeScript, Testing Library, Vitest

---

### Task 1: Correct And Test Fee Copy

**Files:**
- Create: `tests/fee-info-section.test.tsx`
- Modify: `components/fee-info-section.tsx`

- [ ] **Step 1: Write the failing fee rendering test**

Create `tests/fee-info-section.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { FeeInfoSection } from "@/components/fee-info-section"

describe("FeeInfoSection", () => {
  it("shows the approved entrance-fee promotion", () => {
    render(<FeeInfoSection />)

    expect(screen.getByText("20 Jt")).toHaveClass("line-through")
    expect(screen.getByText("10 Jt")).toBeVisible()
    expect(
      screen.getByText(/DISKON 10 JUTA \(10 Pendaftar Pertama\)/),
    ).toBeVisible()
    expect(screen.queryByText("12 Jt")).not.toBeInTheDocument()
    expect(screen.queryByText(/DISKON 8 JUTA/)).not.toBeInTheDocument()
  })

  it("shows the semester schedule once with the approved wording", () => {
    render(<FeeInfoSection />)

    expect(
      screen.getAllByText(
        "Dibayarkan saat tiap awal semester pada tahun ke-1, ke-2, dan ke-3",
      ),
    ).toHaveLength(1)
    expect(
      screen.queryByText(
        "Dibayarkan saat Tahun ke-1 Semester 2, Tahun ke-2, dan Tahun ke-3",
      ),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText("Dibayarkan tiap awal semester"),
    ).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `npm test -- tests/fee-info-section.test.tsx`

Expected: FAIL because the component still renders `12 Jt`, `DISKON 8 JUTA`, and the old semester schedule copy.

- [ ] **Step 3: Apply the minimal fee-data correction**

In the `BIAYA MASUK` entry inside `components/fee-info-section.tsx`, keep the original amount and replace the promotional values:

```ts
amount: "10 Jt",
originalAmount: "20 Jt",
promoBadge: "DISKON 10 JUTA (10 Pendaftar Pertama)",
```

In the `UANG SEMESTER` entry, replace the old schedule detail with the approved sentence and remove its redundant `note` property:

```ts
details: [
  "Program Muslim Tangguh",
  "Program Entrepreneur",
  "Program Ekskul & Kegiatan Santri",
  "Dibayarkan saat tiap awal semester pada tahun ke-1, ke-2, dan ke-3",
],
```

- [ ] **Step 4: Run the focused test and verify GREEN**

Run: `npm test -- tests/fee-info-section.test.tsx`

Expected: PASS with 2 passing tests.

- [ ] **Step 5: Commit the tested correction**

```bash
git add tests/fee-info-section.test.tsx components/fee-info-section.tsx
git commit -m "fix: correct fee promotion copy"
```

### Task 2: Verify The Branch

**Files:**
- Verify: `tests/fee-info-section.test.tsx`
- Verify: `components/fee-info-section.tsx`

- [ ] **Step 1: Run the full test suite**

Run: `npm test`

Expected: all Vitest suites pass.

- [ ] **Step 2: Run the production build**

Run: `npm run build`

Expected: the Next.js production build succeeds.

- [ ] **Step 3: Check whitespace and branch scope**

Run: `git diff --check`

Expected: no whitespace errors.

Run: `git status --short --branch`

Expected: branch `fix/fee-promo-copy` contains only the user-owned untracked `docs/2026-07-30-ui-ux-audit.md`; do not add or modify that file.

- [ ] **Step 4: Stop for user review**

Report the corrected fee calculation and semester schedule copy. Do not merge into `main` until the user explicitly approves the feature.
