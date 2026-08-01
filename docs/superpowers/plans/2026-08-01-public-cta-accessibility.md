# Public CTA Accessibility Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make public calls to action semantically valid, readable, keyboard-visible, and restrained in motion without changing their copy, destinations, or layout.

**Architecture:** Fix each CTA inside its existing section rather than introducing a shared abstraction. Render navigation actions as one anchor, remove the inert curriculum control, use dark teal on gold, and put explicit focus and motion classes on the focusable element. Protect the contract with one focused Vitest file.

**Tech Stack:** Next.js 16, React 18, TypeScript, Tailwind CSS, Radix Slot through `Button asChild`, Vitest, Testing Library.

---

### Task 1: Correct CTA semantics

**Files:**
- Create: `tests/public-cta-accessibility.test.tsx`
- Modify: `components/curriculum-section.tsx`
- Modify: `components/program-100-days.tsx`
- Modify: `components/program-section.tsx`
- Modify: `components/registration-section.tsx`

- [ ] **Step 1: Write failing semantic tests**

Create `tests/public-cta-accessibility.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { CurriculumSection } from "@/components/curriculum-section"
import { Program100Days } from "@/components/program-100-days"
import { ProgramSection } from "@/components/program-section"
import { RegistrationSection } from "@/components/registration-section"

describe("public CTA accessibility", () => {
  it("renders the final registration CTA as one link", () => {
    render(<RegistrationSection />)
    const link = screen.getByRole("link", { name: "Daftar Sekarang" })

    expect(link).toHaveAttribute("href", "/daftar")
    expect(link.querySelector("button")).toBeNull()
    expect(screen.queryByRole("button", { name: "Daftar Sekarang" })).not.toBeInTheDocument()
  })

  it.each([
    ["100-day program", <Program100Days />],
    ["program overview", <ProgramSection />],
  ])("renders the %s CTA directly on the link", (_, component) => {
    render(component)
    const link = screen.getByRole("link", { name: "Daftar Sekarang" })

    expect(link).toHaveAttribute("href", "/daftar")
    expect(link.firstElementChild?.tagName).not.toBe("DIV")
  })

  it("removes the inert student-work control", () => {
    render(<CurriculumSection />)

    expect(screen.queryByRole("button", { name: "Lihat Karya" })).not.toBeInTheDocument()
    expect(screen.queryByText("Lihat Karya")).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```powershell
npx vitest run tests/public-cta-accessibility.test.tsx --pool=forks --maxWorkers=1 --minWorkers=1
```

Expected: FAIL for the nested final CTA, the two presentation wrappers, and the inert curriculum button.

- [ ] **Step 3: Remove the inert curriculum control**

In `components/curriculum-section.tsx`, change the import to:

```tsx
import { CheckCircle2 } from "lucide-react"
```

Delete the complete `pillar.title === "Kurikulum IT"` CTA block after the item list. Do not replace it.

- [ ] **Step 4: Render the program CTAs directly as links**

Replace the CTA structure in `components/program-100-days.tsx` with:

```tsx
<Link
  href="/daftar"
  className="group/btn inline-flex items-center gap-2 rounded-full px-8 py-3 text-base font-bold shadow-2xl sm:px-10 sm:py-4 sm:text-lg"
  style={{ backgroundColor: COLORS.accent, color: COLORS.darkBase }}
>
  Daftar Sekarang
  <MoveRight className="h-5 w-5" />
</Link>
```

Replace the CTA structure in `components/program-section.tsx` with:

```tsx
<Link
  href="/daftar"
  className="group/btn inline-flex items-center gap-2 rounded-full bg-[#2C8970] px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-primary/20 sm:px-10 sm:py-4 sm:text-lg"
>
  Daftar Sekarang
  <MoveRight className="h-5 w-5" />
</Link>
```

- [ ] **Step 5: Render the final CTA through `Button asChild`**

Replace the outer `Link` and nested `Button` in `components/registration-section.tsx` with:

```tsx
<Button
  asChild
  size="lg"
  className="h-auto w-full rounded-full bg-[#2C8970] px-10 py-7 text-lg font-semibold text-[#F7F7F2] shadow-[0_8px_20px_rgba(44,137,112,0.30)] sm:w-auto md:py-8"
>
  <Link href="/daftar" className="group">
    <span>Daftar Sekarang</span>
    <span className="text-xl font-normal leading-none">→</span>
  </Link>
</Button>
```

- [ ] **Step 6: Run the focused test and verify GREEN**

Run the command from Step 2. Expected: 4 tests PASS.

- [ ] **Step 7: Commit semantic changes**

```powershell
git add tests/public-cta-accessibility.test.tsx components/curriculum-section.tsx components/program-100-days.tsx components/program-section.tsx components/registration-section.tsx
git commit -m "fix: correct public CTA semantics"
```

### Task 2: Apply contrast, focus, and restrained motion

**Files:**
- Modify: `tests/public-cta-accessibility.test.tsx`
- Modify: `components/program-100-days.tsx`
- Modify: `components/program-section.tsx`
- Modify: `components/fee-info-section.tsx`
- Modify: `components/registration-section.tsx`

- [ ] **Step 1: Add failing contrast and interaction tests**

Add the `FeeInfoSection` import and these tests:

```tsx
import { FeeInfoSection } from "@/components/fee-info-section"

it("uses dark teal text on the gold registration-fee badge", () => {
  render(<FeeInfoSection />)
  expect(screen.getByText("BIAYA PENDAFTARAN")).toHaveStyle({
    backgroundColor: "#F3B233",
    color: "#134146",
  })
})

it.each([
  ["100-day program", <Program100Days />],
  ["program overview", <ProgramSection />],
  ["final registration", <RegistrationSection />],
])("gives the %s CTA visible focus and restrained motion", (_, component) => {
  render(component)
  const link = screen.getByRole("link", { name: "Daftar Sekarang" })

  expect(link).toHaveClass(
    "duration-150",
    "focus-visible:ring-2",
    "active:scale-[0.97]",
    "motion-reduce:active:scale-100",
  )
  expect(link).not.toHaveClass("transition-all", "hover:scale-105")
})
```

- [ ] **Step 2: Run the focused test and verify RED**

Run the Task 1 test command. Expected: FAIL because the badge and CTA classes still use the old contract.

- [ ] **Step 3: Correct the fee badge contrast**

In `components/fee-info-section.tsx`, use:

```tsx
style={{ backgroundColor: COLORS.accent, color: COLORS.darkBase }}
```

- [ ] **Step 4: Apply Emil-style focus and motion to program CTAs**

Use this direct link class in `components/program-100-days.tsx`:

```tsx
className="group/btn inline-flex items-center gap-2 rounded-full px-8 py-3 text-base font-bold shadow-2xl transition-[background-color,box-shadow,transform] duration-150 hover:bg-[#F6BE4D] hover:shadow-[#F3B233]/40 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#134146] motion-reduce:transition-none motion-reduce:active:scale-100 sm:px-10 sm:py-4 sm:text-lg"
```

Use this direct link class in `components/program-section.tsx`:

```tsx
className="group/btn inline-flex items-center gap-2 rounded-full bg-[#2C8970] px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-primary/20 transition-[background-color,box-shadow,transform] duration-150 hover:bg-[#F3B233] hover:text-[#134146] hover:shadow-xl hover:shadow-accent/20 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2C8970] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F0FAF7] motion-reduce:transition-none motion-reduce:active:scale-100 sm:px-10 sm:py-4 sm:text-lg"
```

Use this icon class in both components:

```tsx
className="h-5 w-5 transition-transform duration-150 group-hover/btn:translate-x-1 group-focus-visible/btn:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
```

- [ ] **Step 5: Apply the same interaction standard to the final CTA**

Set the `Button asChild` class in `components/registration-section.tsx` to:

```tsx
className="h-auto w-full rounded-full bg-[#2C8970] px-10 py-7 text-lg font-semibold text-[#F7F7F2] shadow-[0_8px_20px_rgba(44,137,112,0.30)] transition-[background-color,box-shadow,transform] duration-150 hover:bg-[#F3B233] hover:text-[#134146] hover:shadow-[0_12px_24px_rgba(243,178,51,0.28)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2C8970] focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:active:scale-100 sm:w-auto md:py-8"
```

Set its arrow class to:

```tsx
className="mt-0.5 text-xl font-normal leading-none transition-transform duration-150 group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
```

- [ ] **Step 6: Run the focused test and verify GREEN**

Run the Task 1 test command. Expected: 8 tests PASS.

- [ ] **Step 7: Commit interaction changes**

```powershell
git add tests/public-cta-accessibility.test.tsx components/program-100-days.tsx components/program-section.tsx components/fee-info-section.tsx components/registration-section.tsx
git commit -m "style: polish public CTA accessibility"
```

### Task 3: Verify the integrated feature

**Files:**
- Verify: all files changed in Tasks 1 and 2

- [ ] **Step 1: Run the full test suite**

```powershell
npx vitest run --pool=forks --maxWorkers=1 --minWorkers=1
```

Expected: all tests PASS.

- [ ] **Step 2: Run TypeScript checking**

```powershell
npx tsc --noEmit
```

Expected: no new errors from changed files. Record only the known unrelated baseline errors if they remain.

- [ ] **Step 3: Run the production build**

```powershell
$env:NEXT_TELEMETRY_DISABLED='1'; npm run build
```

Expected: build exits successfully; request network approval only if Google font fetching is blocked.

- [ ] **Step 4: Check the final diff**

```powershell
git diff --check
git status --short
git diff main...HEAD -- components tests
```

Expected: no whitespace errors and no change to the untracked audit file.

- [ ] **Step 5: Stop for review**

Report behavior, verification evidence, commits, and unchanged baseline errors. Do not merge until the user explicitly approves.
