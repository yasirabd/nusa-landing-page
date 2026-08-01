# Typography Consolidation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Geist Sans the primary NUSA interface font, retain only purposeful brand/editorial accents, and remove redundant font loading and hidden weight remapping.

**Architecture:** Centralize all font loading in `app/layout.tsx` and all font-family tokens in `app/globals.css`. Components inherit Geist globally; only existing NUSA wordmarks opt into Righteous, while existing short value statements opt into Noto Serif italic through standard Tailwind utilities.

**Tech Stack:** Next.js 16, React 18, TypeScript, Tailwind CSS 4, `geist`, `next/font`, Vitest

---

### Task 1: Define the typography contract with failing tests

**Files:**
- Create: `tests/typography-system.test.ts`
- Test: `tests/typography-system.test.ts`

- [ ] **Step 1: Write the failing typography contract**

Create `tests/typography-system.test.ts`:

```ts
import { readFileSync, readdirSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"

function getSourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name)

    if (entry.isDirectory()) {
      return getSourceFiles(path)
    }

    return /\.(?:ts|tsx|css)$/.test(entry.name) ? [path] : []
  })
}

const applicationFiles = [
  ...getSourceFiles("app"),
  ...getSourceFiles("components"),
]
const applicationSource = applicationFiles
  .map((path) => readFileSync(path, "utf8"))
  .join("\n")

describe("NUSA typography system", () => {
  it("loads only the approved application, brand, and editorial fonts", () => {
    const layout = readFileSync("app/layout.tsx", "utf8")

    expect(layout).toContain('import { GeistSans } from "geist/font/sans"')
    expect(layout).toContain(
      'import { Noto_Serif, Righteous } from "next/font/google"',
    )
    expect(layout).toContain('weight: "500"')
    expect(layout).toContain('style: "italic"')
    expect(layout).toContain('variable: "--font-noto-serif"')
    expect(layout).toContain('variable: "--font-righteous"')
    expect(layout).toContain(
      "`${GeistSans.variable} ${notoSerif.variable} ${righteous.variable} font-sans`",
    )

    for (const removedFont of [
      "Work_Sans",
      "V0_Font_Work_Sans",
      "Inter",
      "Inconsolata",
      "V0_Font_Inconsolata",
      "V0_Font_Noto_Serif",
      "_v0_fontVariables",
    ]) {
      expect(layout).not.toContain(removedFont)
    }
  })

  it("maps global font tokens without remote faces or weight overrides", () => {
    const styles = readFileSync("app/globals.css", "utf8")

    expect(styles).toContain("--font-sans: var(--font-geist-sans);")
    expect(styles).toContain("--font-serif: var(--font-noto-serif);")
    expect(styles).toContain("--font-mono: ui-monospace, SFMono-Regular")
    expect(styles).toContain(
      ".font-righteous {\n  font-family: var(--font-righteous);\n}",
    )

    for (const removedPattern of [
      "framerusercontent.com",
      '@font-face {\n  font-family: "Romulo"',
      ".font-romulo-italic",
      ".font-bold {",
      ".font-extrabold {",
      ".font-black {",
      "--v0-font-work-sans",
      "--v0-font-inconsolata",
    ]) {
      expect(styles).not.toContain(removedPattern)
    }
  })

  it("uses the approved component-level font roles without changing copy", () => {
    expect(applicationSource).not.toContain("font-work-sans")
    expect(applicationSource).not.toContain("font-romulo-italic")

    for (const path of [
      "components/curriculum-section.tsx",
      "components/nusa-tagline.tsx",
      "components/footer.tsx",
      "components/registration-section.tsx",
    ]) {
      const source = readFileSync(path, "utf8")

      expect(source).toContain("font-serif")
      expect(source).toContain("italic")
      expect(source).toContain("font-medium")
    }

    for (const copy of [
      "Muslim Tangguh, Jago IT",
      "Muslim Tangguh Jago IT",
      "Faith at Heart. Tech in Hand. Purpose in Action.",
      "Jadilah bagian dari",
    ]) {
      expect(applicationSource).toContain(copy)
    }
  })

  it("keeps Righteous limited to NUSA brand marks", () => {
    const matches = Array.from(
      applicationSource.matchAll(
        /<span[^>]*className="[^"]*font-righteous[^"]*"[^>]*>([\s\S]*?)<\/span>/g,
      ),
    )

    expect(matches.length).toBeGreaterThan(0)
    for (const match of matches) {
      expect(match[1]).toContain("NUSA")
    }
  })
})
```

- [ ] **Step 2: Run the focused test to verify RED**

Run:

```bash
npx vitest run tests/typography-system.test.ts
```

Expected: FAIL because layout still loads Work Sans, Inter, Inconsolata, and multi-weight Noto Serif; globals still map Work Sans and contain Romulo/weight overrides; components still contain legacy font classes.

- [ ] **Step 3: Commit the failing contract**

```bash
git add tests/typography-system.test.ts
git commit -m "test: define typography consolidation contract"
```

### Task 2: Consolidate font loading and global tokens

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`
- Test: `tests/typography-system.test.ts`

- [ ] **Step 1: Replace font initialization in the root layout**

Replace the font imports and initialization in `app/layout.tsx` with:

```tsx
import type React from "react"
import "@/app/globals.css"

import { ThemeProvider } from "@/components/theme-provider"
import { GeistSans } from "geist/font/sans"
import { Noto_Serif, Righteous } from "next/font/google"

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  style: "italic",
  weight: "500",
  variable: "--font-noto-serif",
})

const righteous = Righteous({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-righteous",
})
```

Keep existing metadata and layout structure. Replace the body class with:

```tsx
className={`${GeistSans.variable} ${notoSerif.variable} ${righteous.variable} font-sans`}
```

- [ ] **Step 2: Replace the global font token block**

In `app/globals.css`, replace the font mappings at the end of `@theme inline` with:

```css
  --font-sans: var(--font-geist-sans);
  --font-serif: var(--font-noto-serif);
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace;
}
```

Delete these complete blocks:

```css
.font-bold {
  font-weight: 600;
}

.font-extrabold {
  font-weight: 700;
}

.font-black {
  font-weight: 800;
}

@font-face {
  font-family: "Romulo";
  src: url("https://framerusercontent.com/assets/V6SPt5QT5vOzThTYDvKoxVfGcQ.woff2") format("woff2");
  font-weight: 400;
  font-style: italic;
  font-display: swap;
}

.font-romulo-italic {
  font-family: "Romulo", serif;
  font-style: italic;
}
```

Keep the existing `.font-righteous` utility unchanged.

- [ ] **Step 3: Run the focused test and confirm only component cleanup remains RED**

Run:

```bash
npx vitest run tests/typography-system.test.ts
```

Expected: font-loading and global-token assertions pass; component-role assertions still fail because legacy classes remain.

- [ ] **Step 4: Commit the centralized font system**

```bash
git add app/layout.tsx app/globals.css
git commit -m "refactor: centralize NUSA font loading"
```

### Task 3: Migrate component font roles

**Files:**
- Modify: `components/curriculum-section.tsx`
- Modify: `components/nusa-tagline.tsx`
- Modify: `components/footer.tsx`
- Modify: `components/registration-section.tsx`
- Modify: `components/test-programmer-designer.tsx`
- Test: `tests/typography-system.test.ts`

- [ ] **Step 1: Replace Romulo utilities with the editorial role**

Apply these exact class replacements:

```text
font-romulo-italic font-normal tracking-wide whitespace-nowrap
-> font-serif italic font-medium tracking-wide whitespace-nowrap

font-romulo-italic font-normal tracking-wide
-> font-serif italic font-medium tracking-wide

font-romulo-italic font-normal tracking-wide text-xl lg:text-2xl mt-1 block
-> font-serif italic font-medium tracking-wide text-xl lg:text-2xl mt-1 block

font-romulo-italic tracking-wide
-> font-serif italic font-medium tracking-wide
```

Do not change the text inside those elements.

- [ ] **Step 2: Remove redundant Work Sans utilities**

Remove every `font-work-sans` token from `components/registration-section.tsx` and `components/test-programmer-designer.tsx`. Preserve all other classes and content in their existing order.

- [ ] **Step 3: Run the focused test to verify GREEN**

Run:

```bash
npx vitest run tests/typography-system.test.ts
```

Expected: PASS with 4 tests.

- [ ] **Step 4: Run existing typography-adjacent tests**

Run:

```bash
npx vitest run tests/nusa-tagline.test.tsx tests/header.test.tsx tests/testimonials-section.test.tsx tests/registration-wizard.test.tsx
```

Expected: PASS with existing copy, brand, testimonial, and registration behavior unchanged.

- [ ] **Step 5: Commit the component migration**

```bash
git add components/curriculum-section.tsx components/nusa-tagline.tsx components/footer.tsx components/registration-section.tsx components/test-programmer-designer.tsx
git commit -m "refactor: apply purposeful NUSA font roles"
```

### Task 4: Verify typography quality and readiness for visual review

**Files:**
- Verify: `app/layout.tsx`
- Verify: `app/globals.css`
- Verify: `components/curriculum-section.tsx`
- Verify: `components/nusa-tagline.tsx`
- Verify: `components/footer.tsx`
- Verify: `components/registration-section.tsx`
- Verify: `components/test-programmer-designer.tsx`
- Verify: `tests/typography-system.test.ts`

- [ ] **Step 1: Run the complete test suite**

```bash
npm test
```

Expected: all existing 86 tests plus 4 typography tests pass.

- [ ] **Step 2: Run TypeScript checking**

```bash
npx tsc --noEmit
```

Expected: only documented unrelated baseline errors may remain in `app/admin/page.tsx` and the existing untyped `SocialIcon` declaration in `components/footer.tsx`. Typography changes introduce no new errors.

- [ ] **Step 3: Run the production build**

```bash
npm run build
```

Expected: exit code 0 with Geist Sans bundled locally and no runtime Framer font request.

- [ ] **Step 4: Run final source and repository checks**

```bash
rg -n "Work_Sans|V0_Font|Inconsolata|font-work-sans|font-romulo-italic|framerusercontent" app components
git diff --check
git status --short
```

Expected: the source search returns no matches; diff check is clean; only the user-owned untracked `docs/2026-07-30-ui-ux-audit.md` remains outside committed feature work.

- [ ] **Step 5: Request independent review**

Review the complete feature diff against `docs/superpowers/specs/2026-08-01-typography-consolidation-design.md`. Prioritize font-loading correctness, Tailwind token validity, copy preservation, unintended weight regressions, and scope creep. Fix all Critical and Important findings and rerun affected verification.

- [ ] **Step 6: Stop for user visual review**

Report the feature branch, commits, test/build evidence, known unrelated TypeScript baseline errors, and the main surfaces to inspect. Do not merge until the user approves the typography visually.
