# Public Motion System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Standardize public landing-page motion so controls remain responsive while informational surfaces stay stable and reduced-motion users receive no decorative movement.

**Architecture:** Add one source-level motion contract covering only public landing-page components, then replace broad or decorative Tailwind motion utilities with explicit property transitions. Keep the existing global reduced-motion safety net and component-local fallbacks; do not change shared UI primitives or non-public application surfaces.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS 4, Vitest

---

### Task 1: Define The Public Motion Contract

**Files:**
- Create: `tests/public-motion-system.test.ts`

- [ ] **Step 1: Write the failing source contract**

Create `tests/public-motion-system.test.ts`:

```ts
import { readFileSync } from "node:fs"
import { describe, expect, it } from "vitest"

const publicMotionPaths = [
  "components/header.tsx",
  "components/curriculum-section.tsx",
  "components/program-section.tsx",
  "components/teaching-team-section.tsx",
  "components/fee-info-section.tsx",
  "components/partner-section.tsx",
  "components/gallery-section.tsx",
  "components/registration-section.tsx",
  "components/footer.tsx",
]

const publicMotionSource = publicMotionPaths
  .map((path) => readFileSync(path, "utf8"))
  .join("\n")

describe("NUSA public motion system", () => {
  it("uses explicit, fast transitions on public landing components", () => {
    expect(publicMotionSource).not.toContain("transition-all")

    const durations = [...publicMotionSource.matchAll(/duration-(?:\[(\d+)ms\]|(\d+))/g)]
      .map((match) => Number(match[1] ?? match[2]))

    expect(durations.every((duration) => duration <= 250)).toBe(true)
  })

  it("keeps informational surfaces spatially stable", () => {
    expect(publicMotionSource).not.toMatch(/hover:-translate-[xy]/)
    expect(publicMotionSource).not.toMatch(/(?:group-)?hover(?:\/[\w-]+)?:scale-/)
    expect(publicMotionSource).not.toMatch(/group-hover(?:\/[\w-]+)?:rotate-/)
  })

  it("removes looping promotion motion and false partner affordance", () => {
    expect(publicMotionSource).not.toContain("animate-pulse")

    const partner = readFileSync("components/partner-section.tsx", "utf8")
    expect(partner).not.toContain("cursor-pointer")
  })

  it("preserves reduced-motion fallbacks for press feedback", () => {
    for (const path of [
      "components/header.tsx",
      "components/program-section.tsx",
      "components/gallery-section.tsx",
      "components/registration-section.tsx",
    ]) {
      const source = readFileSync(path, "utf8")
      expect(source).toContain("motion-reduce:transition-none")
    }

    const css = readFileSync("app/globals.css", "utf8")
    expect(css).toContain("@media (prefers-reduced-motion: reduce)")
  })
})
```

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```powershell
npx vitest run tests/public-motion-system.test.ts
```

Expected: FAIL because the current public components contain `transition-all`,
300-700ms durations, decorative translate/scale/rotate utilities,
`animate-pulse`, and `cursor-pointer` on partner logos.

- [ ] **Step 3: Commit the failing contract**

```powershell
git add tests/public-motion-system.test.ts
git commit -m "test: define public motion contract"
```

### Task 2: Stabilize Educational Feature Motion

**Files:**
- Modify: `components/curriculum-section.tsx`
- Modify: `components/program-section.tsx`
- Modify: `components/teaching-team-section.tsx`
- Test: `tests/public-motion-system.test.ts`

- [ ] **Step 1: Replace curriculum motion with explicit feedback**

In `components/curriculum-section.tsx`:

- Change card motion to
  `transition-[border-color,box-shadow] duration-[180ms] hover:border-brand-highlight/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]`.
- Remove `hover:-translate-y-2`.
- Remove the glow backdrop element whose opacity changes on group hover.
- Remove image `transition-transform duration-700 group-hover:scale-105`.
- Remove checklist icon `transition-transform duration-300 group-hover/item:scale-110`.

- [ ] **Step 2: Replace program motion with stable state feedback**

In `components/program-section.tsx`:

- Replace every card `transition-all duration-300` with
  `transition-[border-color,box-shadow] duration-[180ms]`.
- Remove both `hover:-translate-y-2` utilities.
- Remove checklist `transition-transform duration-300 group-hover:scale-110`.
- Remove timeline marker `transition-transform duration-500 group-hover/timeline:scale-110`.
- Remove icon `transition-transform duration-500 group-hover/timeline:rotate-6`.
- Preserve the CTA and arrow classes because they use 150ms explicit
  transitions with reduced-motion fallbacks.

- [ ] **Step 3: Replace teaching-team lift and portrait zoom**

In `components/teaching-team-section.tsx`:

- Replace card `transition-all duration-300 hover:-translate-y-2` with
  `transition-[border-color,box-shadow] duration-[180ms]`.
- Remove portrait `transition-transform duration-500 group-hover:scale-105`.
- Preserve the existing border, shadow, portrait ring, and grid layout.

- [ ] **Step 4: Run the focused test to inspect remaining failures**

Run:

```powershell
npx vitest run tests/public-motion-system.test.ts
```

Expected: FAIL only for motion still present in fee, partner, registration, and
footer components.

- [ ] **Step 5: Commit educational motion changes**

```powershell
git add components/curriculum-section.tsx components/program-section.tsx components/teaching-team-section.tsx
git commit -m "refactor: stabilize educational section motion"
```

### Task 3: Standardize Supporting And Conversion Motion

**Files:**
- Modify: `components/fee-info-section.tsx`
- Modify: `components/partner-section.tsx`
- Modify: `components/registration-section.tsx`
- Modify: `components/footer.tsx`
- Test: `tests/public-motion-system.test.ts`

- [ ] **Step 1: Make fee feedback static and fast**

In `components/fee-info-section.tsx`:

- Replace announcement-panel `transition-all duration-300` and lift with
  `transition-shadow duration-[180ms]`.
- Replace fee-card `transition-all duration-300` and lift with
  `transition-[border-color,box-shadow] duration-[180ms]`.
- Remove `animate-pulse` from the promotion badge.
- Remove `transition-all duration-300` from the static fee amount.

- [ ] **Step 2: Correct partner affordance and timing**

In `components/partner-section.tsx`:

- Change the container to `transition-shadow duration-200`.
- Replace logo `transition-all duration-500` with
  `transition-[filter,opacity] duration-200`.
- Remove `hover:scale-105` and `cursor-pointer` from partner logos.

- [ ] **Step 3: Limit registration CTA container motion**

In `components/registration-section.tsx`:

- Replace container `transition-all duration-300` with
  `transition-shadow duration-200`.
- Preserve the CTA's explicit 150ms transition, press response, arrow feedback,
  focus ring, and reduced-motion classes.

- [ ] **Step 4: Simplify footer interaction motion**

In `components/footer.tsx`:

- Replace social-link `transition-all duration-300 hover:-translate-y-1` with
  `transition-[background-color,border-color] duration-150`.
- Replace social icon `transition-all duration-300` with
  `transition-[filter] duration-150`.
- Remove contact-icon `group-hover:scale-110` and use
  `transition-[background-color] duration-150`.
- Change map-container feedback to `transition-colors duration-200`.
- Change map overlay to `duration-200`.
- Replace iframe `transition-all duration-500` with
  `transition-[filter] duration-200`.

- [ ] **Step 5: Run the focused test and verify GREEN**

Run:

```powershell
npx vitest run tests/public-motion-system.test.ts
```

Expected: PASS with 4 tests.

- [ ] **Step 6: Commit supporting motion changes**

```powershell
git add components/fee-info-section.tsx components/partner-section.tsx components/registration-section.tsx components/footer.tsx
git commit -m "refactor: standardize public interaction motion"
```

### Task 4: Verify The Integrated Feature

**Files:**
- Verify: `tests/public-motion-system.test.ts`
- Verify: all project tests and production build

- [ ] **Step 1: Run the full test suite**

```powershell
npm test
```

Expected: all test files and tests pass.

- [ ] **Step 2: Run TypeScript validation**

```powershell
npx tsc --noEmit
```

Expected: only the existing baseline errors in `app/admin/page.tsx` and
`components/footer.tsx`; no new error from this feature.

- [ ] **Step 3: Run the production build**

```powershell
npm run build
```

Expected: exit code 0 and a fresh `.next/BUILD_ID`.

- [ ] **Step 4: Check repository hygiene**

```powershell
git diff --check
git status --short --branch
```

Expected: no whitespace errors; only the user-owned untracked audit document
remains outside committed feature work.

- [ ] **Step 5: Stop for visual review**

Keep `feat/public-motion-system` unmerged. Ask the user to review the landing
page on desktop and mobile before integrating it into `main`.
