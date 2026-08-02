# Tangguh Token Revision Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Revise UX-11 so public section spacing and color composition follow the approved Tangguh design system instead of compressing NUSA's visual identity.

**Architecture:** Keep the centralized semantic color tokens and component migration, but restore the three responsive spacing roles defined in `DESIGN.md`. Extend the source contract to protect NUSA's section-level color composition so future token cleanup cannot flatten the page into one generic surface.

**Tech Stack:** Next.js 16, React 18, TypeScript, Tailwind CSS 4, Vitest

---

### Task 1: Define the Tangguh spacing and color-composition contract

**Files:**
- Modify: `tests/design-tokens.test.ts`
- Test: `tests/design-tokens.test.ts`

- [ ] **Step 1: Replace the spacing assertions with the approved Tangguh rhythm**

Assert these exact values in `app/globals.css`:

```ts
expect(styles).toMatch(
  /\.section-spacing-compact\s*\{[\s\S]*?padding-block:\s*3rem/,
)
expect(styles).toMatch(
  /\.section-spacing-standard\s*\{[\s\S]*?padding-block:\s*4rem/,
)
expect(styles).toMatch(
  /\.section-spacing-feature\s*\{[\s\S]*?padding-block:\s*6rem/,
)
expect(styles).toMatch(
  /@media \(min-width: 48rem\)[\s\S]*?\.section-spacing-compact\s*\{[\s\S]*?padding-block:\s*4rem/,
)
expect(styles).toMatch(
  /@media \(min-width: 48rem\)[\s\S]*?\.section-spacing-feature\s*\{[\s\S]*?padding-block:\s*8rem/,
)
expect(styles).toMatch(
  /@media \(min-width: 64rem\)[\s\S]*?\.section-spacing-compact\s*\{[\s\S]*?padding-block:\s*5rem/,
)
expect(styles).toMatch(
  /@media \(min-width: 64rem\)[\s\S]*?\.section-spacing-standard\s*\{[\s\S]*?padding-block:\s*6rem/,
)
expect(styles).toMatch(
  /@media \(min-width: 64rem\)[\s\S]*?\.section-spacing-feature\s*\{[\s\S]*?padding-block:\s*10rem/,
)
```

- [ ] **Step 2: Add a section-recipe color contract**

Read the relevant component sources and assert:

```ts
expect(readFileSync("components/hero-section.tsx", "utf8")).toContain(
  "var(--color-brand-dark)_0%",
)
expect(readFileSync("components/teaching-team-section.tsx", "utf8")).toContain(
  "bg-brand",
)
expect(readFileSync("components/testimonials-section.tsx", "utf8")).toContain(
  "bg-brand-dark",
)

for (const path of [
  "components/curriculum-section.tsx",
  "components/program-section.tsx",
  "components/fee-info-section.tsx",
]) {
  expect(readFileSync(path, "utf8")).toContain("bg-brand-surface")
}

for (const path of [
  "components/why-choose-section.tsx",
  "components/faq-section.tsx",
  "components/partner-section.tsx",
]) {
  expect(readFileSync(path, "utf8")).toContain("bg-brand-paper")
}
```

This protects alternation between strong green fields, dark evidence, soft green information, and warm paper sections.

- [ ] **Step 3: Run the focused test to verify RED**

Run `npx vitest run tests/design-tokens.test.ts`.

Expected: spacing assertions fail because compact desktop is still 64px and feature spacing is still 64/96/96px. Color-composition assertions pass.

- [ ] **Step 4: Commit the failing Tangguh contract**

Run:

```bash
git add tests/design-tokens.test.ts
git commit -m "test: define Tangguh section rhythm"
```

### Task 2: Restore spacious Tangguh section roles

**Files:**
- Modify: `app/globals.css`
- Test: `tests/design-tokens.test.ts`

- [ ] **Step 1: Update the responsive spacing utilities**

Use this exact CSS:

```css
.section-spacing-compact {
  padding-block: 3rem;
}

.section-spacing-standard {
  padding-block: 4rem;
}

.section-spacing-feature {
  padding-block: 6rem;
}

@media (min-width: 48rem) {
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

@media (min-width: 64rem) {
  .section-spacing-compact {
    padding-block: 5rem;
  }

  .section-spacing-standard {
    padding-block: 6rem;
  }

  .section-spacing-feature {
    padding-block: 10rem;
  }
}
```

This produces compact `48/64/80px`, standard `64/80/96px`, and feature `96/128/160px`, matching the approved Tangguh design system without a mobile exception.

- [ ] **Step 2: Run the focused test to verify GREEN**

Run `npx vitest run tests/design-tokens.test.ts`.

Expected: PASS with the complete semantic palette, Tangguh spacing rhythm, protected section color composition, Hero exception, and migration boundaries.

- [ ] **Step 3: Commit the Tangguh rhythm revision**

Run:

```bash
git add app/globals.css
git commit -m "fix: restore Tangguh section rhythm"
```

### Task 3: Verify and stop for visual review

**Files:**
- Verify: `DESIGN.md`
- Verify: `app/globals.css`
- Verify: `tests/design-tokens.test.ts`

- [ ] **Step 1: Run the complete test suite**

Run `npm test` and require zero failures.

- [ ] **Step 2: Run TypeScript checking**

Run `npx tsc --noEmit`. Only the documented unrelated baseline errors in `app/admin/page.tsx` and `components/footer.tsx` may remain.

- [ ] **Step 3: Run the production build**

Run `npm run build` and require a fresh `.next/BUILD_ID`.

- [ ] **Step 4: Run repository checks**

Run `git diff --check` and `git status --short`. Confirm `docs/2026-07-30-ui-ux-audit.md` remains the only user-owned untracked file.

- [ ] **Step 5: Stop for user visual review**

Ask the user to inspect feature-section breathing room, the amount of visible green/dark teal, transitions between light and dark sections, and mobile page length. Do not merge until explicitly approved.
