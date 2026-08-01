# Romulo Tagline Exception Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore Romulo only for the two approved `Muslim Tangguh, Jago IT` display accents.

**Architecture:** Define one isolated Romulo `@font-face` and utility in `app/globals.css`. Apply the utility only in the tagline and registration components while retaining the existing Geist, Righteous, and Noto Serif roles everywhere else.

**Tech Stack:** Next.js 16, React 18, TypeScript, Tailwind CSS 4, Vitest

---

### Task 1: Define the Romulo exception contract

**Files:**
- Modify: `tests/typography-system.test.ts`

- [ ] **Step 1: Write a failing test**

Rename the global-token test to `maps global font tokens without weight overrides`, remove Romulo and the Framer URL from its rejected patterns, and add:

```ts
  it("limits Romulo to the two approved tagline accents", () => {
    const styles = readFileSync("app/globals.css", "utf8")
    const approvedRomuloFiles = new Set([
      "components/nusa-tagline.tsx",
      "components/registration-section.tsx",
    ])

    expect(styles).toContain('font-family: "Romulo";')
    expect(styles).toContain(
      'src: url("https://framerusercontent.com/assets/V6SPt5QT5vOzThTYDvKoxVfGcQ.woff2") format("woff2");',
    )
    expect(styles).toMatch(
      /\.font-romulo-italic\s*\{\s*font-family:\s*"Romulo", serif;\s*font-style:\s*italic;\s*\}/,
    )

    for (const path of applicationFiles) {
      const normalizedPath = path.replaceAll("\\", "/")
      const source = readFileSync(path, "utf8")

      if (approvedRomuloFiles.has(normalizedPath)) {
        expect(source).toContain("font-romulo-italic font-normal")
        expect(source).not.toContain("font-serif italic font-medium")
      } else if (!normalizedPath.endsWith("app/globals.css")) {
        expect(source).not.toContain("font-romulo-italic")
      }
    }
  })
```

Remove the global assertion `expect(applicationSource).not.toContain("font-romulo-italic")`. Restrict the existing Noto Serif role loop to curriculum and footer because the tagline and registration components become Romulo exceptions.

- [ ] **Step 2: Verify RED**

Run:

```bash
npx vitest run tests/typography-system.test.ts
```

Expected: FAIL because Romulo was removed during typography consolidation.

### Task 2: Restore the isolated Romulo accents

**Files:**
- Modify: `app/globals.css`
- Modify: `components/nusa-tagline.tsx`
- Modify: `components/registration-section.tsx`
- Test: `tests/typography-system.test.ts`

- [ ] **Step 1: Restore the font face and utility**

Add this after the base layer in `app/globals.css` without changing the global `font-serif` token:

```css
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

- [ ] **Step 2: Apply Romulo to the two approved accents**

In `components/nusa-tagline.tsx`, use:

```tsx
<span className="font-romulo-italic font-normal tracking-wide" style={{ color: COLORS.accent }}>
```

In `components/registration-section.tsx`, use:

```tsx
className="font-romulo-italic font-normal tracking-wide"
```

Preserve every other class and all copy.

- [ ] **Step 3: Verify GREEN**

Run:

```bash
npx vitest run tests/typography-system.test.ts
```

Expected: PASS.

- [ ] **Step 4: Run final verification**

Run:

```bash
npm test
npm run build
git diff --check
git status --short --branch
```

Expected: tests and build pass; only the user-owned audit document remains untracked outside committed feature work.

- [ ] **Step 5: Commit**

```bash
git add app/globals.css components/nusa-tagline.tsx components/registration-section.tsx tests/typography-system.test.ts
git commit -m "fix: restore Romulo tagline accents"
```

Stop for visual review. Do not merge without user approval.
