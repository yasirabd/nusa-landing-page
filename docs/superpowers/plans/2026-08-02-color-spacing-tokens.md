# Color And Section Spacing Tokens Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Centralize the NUSA public landing page palette and vertical section rhythm without visibly redesigning the approved page.

**Architecture:** Declare NUSA-specific semantic colors and three responsive section-spacing utilities in `app/globals.css`. Public components consume those tokens through Tailwind classes or CSS variables; a source-contract test guards the palette, spacing values, public migration boundary, and exclusions.

**Tech Stack:** Next.js 16, React 18, TypeScript, Tailwind CSS 4, Vitest

---

### Task 1: Define the UX-11 source contract

**Files:**
- Create: `tests/design-tokens.test.ts`
- Test: `tests/design-tokens.test.ts`

- [ ] **Step 1: Write the failing token contract**

Create `tests/design-tokens.test.ts` with helpers that read the landing component paths imported by `app/page.tsx`, then assert:

```ts
import { readFileSync } from "node:fs"
import { describe, expect, it } from "vitest"

const publicComponentPaths = [
  "components/header.tsx",
  "components/hero-section.tsx",
  "components/nusa-tagline.tsx",
  "components/why-choose-section.tsx",
  "components/curriculum-section.tsx",
  "components/program-section.tsx",
  "components/teaching-team-section.tsx",
  "components/gallery-section.tsx",
  "components/testimonials-section.tsx",
  "components/fee-info-section.tsx",
  "components/faq-section.tsx",
  "components/partner-section.tsx",
  "components/registration-section.tsx",
  "components/footer.tsx",
]

const publicSource = publicComponentPaths
  .map((path) => readFileSync(path, "utf8"))
  .join("\n")

describe("NUSA public design tokens", () => {
  it("declares the approved semantic palette", () => {
    const styles = readFileSync("app/globals.css", "utf8")

    for (const declaration of [
      "--color-brand: #2c8970;",
      "--color-brand-dark: #134146;",
      "--color-brand-depth: #1f6f68;",
      "--color-brand-accent: #f3b233;",
      "--color-brand-highlight: #42cdba;",
      "--color-brand-surface: #f0faf7;",
      "--color-brand-paper: #f7f7f2;",
    ]) {
      expect(styles).toContain(declaration)
    }
  })

  it("declares compact, standard, and feature section rhythms", () => {
    const styles = readFileSync("app/globals.css", "utf8")

    expect(styles).toMatch(/\.section-spacing-compact\s*\{[^}]*padding-block:\s*3rem/s)
    expect(styles).toMatch(/\.section-spacing-standard\s*\{[^}]*padding-block:\s*4rem/s)
    expect(styles).toMatch(/\.section-spacing-feature\s*\{[^}]*padding-block:\s*4rem/s)
    expect(styles).toContain("@media (min-width: 48rem)")
    expect(styles).toContain("padding-block: 5rem;")
    expect(styles).toContain("padding-block: 6rem;")
  })

  it("removes primary palette literals and local palette maps from public components", () => {
    expect(publicSource).not.toMatch(
      /#(?:134146|2c8970|1f6f68|f3b233|42cdba|f0faf7|f7f7f2)/i,
    )
    expect(publicSource).not.toMatch(/const\s+COLORS\s*=/)
  })

  it("applies semantic section spacing without changing the hero rhythm", () => {
    expect(publicSource).toContain("section-spacing-compact")
    expect(publicSource).toContain("section-spacing-standard")
    expect(publicSource).toContain("section-spacing-feature")

    const hero = readFileSync("components/hero-section.tsx", "utf8")
    expect(hero).toContain("py-10")
    expect(hero).toContain("md:py-12")
    expect(hero).toContain("lg:py-14")
    expect(hero).not.toContain("section-spacing-")
  })

  it("keeps registration, admin, and test-only surfaces outside this migration", () => {
    for (const path of [
      "components/registration-form-page.tsx",
      "components/admin/admin-dashboard.tsx",
      "components/test-programmer-designer.tsx",
    ]) {
      expect(readFileSync(path, "utf8")).toMatch(
        /#(?:134146|2c8970|f3b233|42cdba|f0faf7|f7f7f2)/i,
      )
    }
  })
})
```

- [ ] **Step 2: Run the focused test to verify RED**

Run `npx vitest run tests/design-tokens.test.ts`.

Expected: palette declarations, section utilities, and public migration assertions fail because UX-11 has not been implemented.

- [ ] **Step 3: Commit the failing contract**

Run:

```bash
git add tests/design-tokens.test.ts
git commit -m "test: define public design token contract"
```

### Task 2: Add global semantic tokens and section rhythm utilities

**Files:**
- Modify: `app/globals.css`
- Test: `tests/design-tokens.test.ts`

- [ ] **Step 1: Add the NUSA palette to `@theme inline`**

Add:

```css
  --color-brand: #2c8970;
  --color-brand-dark: #134146;
  --color-brand-depth: #1f6f68;
  --color-brand-accent: #f3b233;
  --color-brand-highlight: #42cdba;
  --color-brand-surface: #f0faf7;
  --color-brand-paper: #f7f7f2;
```

- [ ] **Step 2: Add reusable vertical section utilities**

Add global utilities outside `@theme inline`:

```css
.section-spacing-compact {
  padding-block: 3rem;
}

.section-spacing-standard,
.section-spacing-feature {
  padding-block: 4rem;
}

@media (min-width: 48rem) {
  .section-spacing-compact {
    padding-block: 4rem;
  }

  .section-spacing-standard {
    padding-block: 5rem;
  }

  .section-spacing-feature {
    padding-block: 6rem;
  }
}

@media (min-width: 64rem) {
  .section-spacing-standard {
    padding-block: 6rem;
  }
}
```

- [ ] **Step 3: Run the focused test**

Run `npx vitest run tests/design-tokens.test.ts`.

Expected: global palette declarations pass; public migration assertions remain RED.

- [ ] **Step 4: Commit the global token foundation**

Run:

```bash
git add app/globals.css
git commit -m "feat: add NUSA color and spacing tokens"
```

### Task 3: Migrate public landing colors and section spacing

**Files:**
- Modify: `components/header.tsx`
- Modify: `components/hero-section.tsx`
- Modify: `components/nusa-tagline.tsx`
- Modify: `components/why-choose-section.tsx`
- Modify: `components/curriculum-section.tsx`
- Modify: `components/program-section.tsx`
- Modify: `components/teaching-team-section.tsx`
- Modify: `components/gallery-section.tsx`
- Modify: `components/testimonials-section.tsx`
- Modify: `components/fee-info-section.tsx`
- Modify: `components/faq-section.tsx`
- Modify: `components/partner-section.tsx`
- Modify: `components/registration-section.tsx`
- Modify: `components/footer.tsx`
- Test: `tests/design-tokens.test.ts`

- [ ] **Step 1: Replace repeated palette literals with semantic utilities**

Use this exact mapping in class names:

```text
[#2C8970] -> brand
[#134146] -> brand-dark
[#1F6F68] -> brand-depth
[#F3B233] -> brand-accent
[#42CDBA] -> brand-highlight
[#F0FAF7] -> brand-surface
[#F7F7F2] -> brand-paper
```

Preserve opacity modifiers, pseudo-element prefixes, responsive prefixes, focus states, and gradient stop order. Replace inline palette values with `var(--color-brand-*)` or an equivalent semantic Tailwind class. Remove local `COLORS` objects after their references are migrated. Do not alter one-off hover shades, illustration colors, shadows, or rgba values that have no direct semantic-token equivalent.

- [ ] **Step 2: Apply section spacing roles**

Keep `components/hero-section.tsx` at `py-10 md:py-12 lg:py-14`. Assign:

```text
Compact: registration-section
Standard: nusa-tagline, why-choose, gallery, testimonials, faq
Feature: curriculum, program, teaching-team, fee-info, partner
```

Replace only the outer section's vertical `py-*` utilities. Preserve horizontal padding, scroll margins, card padding, grid gaps, and internal margins.

- [ ] **Step 3: Run the focused contract to verify GREEN**

Run `npx vitest run tests/design-tokens.test.ts`.

Expected: PASS with 5 tests.

- [ ] **Step 4: Run public landing regression tests**

Run:

```bash
npx vitest run tests/header.test.tsx tests/hero-hierarchy.test.tsx tests/nusa-tagline.test.tsx tests/benefits-section.test.tsx tests/gallery-images.test.tsx tests/testimonials-section.test.tsx tests/faq-section.test.tsx tests/public-navigation.test.ts tests/public-cta-accessibility.test.tsx
```

Expected: all selected tests pass without copy, navigation, CTA, imagery, or accessibility regressions.

- [ ] **Step 5: Commit the public component migration**

Run:

```bash
git add components/header.tsx components/hero-section.tsx components/nusa-tagline.tsx components/why-choose-section.tsx components/curriculum-section.tsx components/program-section.tsx components/teaching-team-section.tsx components/gallery-section.tsx components/testimonials-section.tsx components/fee-info-section.tsx components/faq-section.tsx components/partner-section.tsx components/registration-section.tsx components/footer.tsx
git commit -m "refactor: apply public color and spacing tokens"
```

### Task 4: Verify UX-11 and prepare visual review

**Files:**
- Verify: `app/globals.css`
- Verify: `components/*.tsx` public landing files listed above
- Verify: `tests/design-tokens.test.ts`

- [ ] **Step 1: Run the complete test suite**

Run `npm test` and require zero failures.

- [ ] **Step 2: Run TypeScript checking**

Run `npx tsc --noEmit`. Record the known unrelated baseline errors in `app/admin/page.tsx` and `components/footer.tsx`; UX-11 must introduce no new errors.

- [ ] **Step 3: Run the production build**

Run `npm run build` and require exit code 0.

- [ ] **Step 4: Run final repository checks**

Run `git diff --check`, inspect `git status --short`, and confirm the user-owned `docs/2026-07-30-ui-ux-audit.md` remains untracked and unchanged.

- [ ] **Step 5: Inspect the localhost landing page**

Verify desktop and mobile section rhythm, palette parity, text contrast, hover/focus states, and unchanged Hero height. UX-11 must not visually redesign approved content.

- [ ] **Step 6: Stop for user visual review**

Report verification evidence and the main areas to inspect. Do not merge into `main` until the user explicitly approves.
