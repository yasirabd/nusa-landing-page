# Romulo Editorial Replacement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Noto Serif with Romulo for every existing editorial-serif treatment.

**Architecture:** Remove Noto Serif from the Next.js root layout and map the existing Tailwind `font-serif` role directly to Romulo in global CSS. Components retain the semantic `font-serif` utility but use Romulo's real italic 400 weight instead of requesting a synthetic medium weight.

**Tech Stack:** Next.js 16, React 18, TypeScript, Tailwind CSS 4, Vitest

---

### Task 1: Define the replacement contract

**Files:**
- Modify: `tests/typography-system.test.ts`

- [ ] **Step 1: Write the failing typography test**

Update layout assertions to expect:

```ts
expect(layout).toContain('import { Righteous } from "next/font/google"')
expect(layout).not.toContain("Noto_Serif")
expect(layout).not.toContain("--font-noto-serif")
expect(layout).toContain(
  "`${GeistSans.variable} ${righteous.variable} font-sans`",
)
```

Update global-token assertions to expect:

```ts
expect(styles).toContain('--font-serif: "Romulo", serif;')
expect(styles).toContain('font-family: "Romulo";')
expect(styles).toContain(
  'src: url("https://framerusercontent.com/assets/V6SPt5QT5vOzThTYDvKoxVfGcQ.woff2") format("woff2");',
)
expect(styles).not.toContain("--font-noto-serif")
```

For every component using `font-serif`, assert that the source does not contain `font-serif italic font-medium`. Preserve existing copy assertions and the Righteous brand restriction.

- [ ] **Step 2: Verify RED**

Run:

```bash
npx vitest run tests/typography-system.test.ts
```

Expected: FAIL because the layout still loads Noto Serif and global `font-serif` still maps to it.

### Task 2: Replace Noto Serif with Romulo

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`
- Modify: `components/curriculum-section.tsx`
- Modify: `components/nusa-tagline.tsx`
- Modify: `components/registration-section.tsx`
- Modify: `components/footer.tsx`
- Test: `tests/typography-system.test.ts`

- [ ] **Step 1: Remove Noto Serif from the root layout**

Use:

```tsx
import { GeistSans } from "geist/font/sans"
import { Righteous } from "next/font/google"
```

Delete the `notoSerif` initializer and set the body class to:

```tsx
className={`${GeistSans.variable} ${righteous.variable} font-sans`}
```

- [ ] **Step 2: Map the editorial role to Romulo**

Set the Tailwind token in `app/globals.css` to:

```css
--font-serif: "Romulo", serif;
```

Add:

```css
@font-face {
  font-family: "Romulo";
  src: url("https://framerusercontent.com/assets/V6SPt5QT5vOzThTYDvKoxVfGcQ.woff2") format("woff2");
  font-weight: 400;
  font-style: italic;
  font-display: swap;
}
```

- [ ] **Step 3: Use Romulo's real weight**

Apply these replacements without changing any other class or copy:

```text
font-serif italic font-medium tracking-wide whitespace-nowrap
-> font-serif italic font-normal tracking-wide whitespace-nowrap

font-serif italic font-medium tracking-wide
-> font-serif italic font-normal tracking-wide

font-serif italic font-medium tracking-wide text-xl lg:text-2xl mt-1 block
-> font-serif italic font-normal tracking-wide text-xl lg:text-2xl mt-1 block
```

The testimonial quotation glyph keeps `font-serif` without an explicit weight.

- [ ] **Step 4: Verify GREEN**

Run:

```bash
npx vitest run tests/typography-system.test.ts
```

Expected: PASS.

- [ ] **Step 5: Run final verification**

Run:

```bash
npm test
npm run build
rg -n "Noto_Serif|font-noto-serif|font-serif italic font-medium" app components
git diff --check
git status --short --branch
```

Expected: tests and build pass; the source search returns no matches; only the user-owned audit document remains untracked outside committed feature work.

- [ ] **Step 6: Commit**

```bash
git add app/layout.tsx app/globals.css components/curriculum-section.tsx components/nusa-tagline.tsx components/registration-section.tsx components/footer.tsx tests/typography-system.test.ts
git commit -m "fix: replace Noto Serif with Romulo"
```

Stop for visual review. Do not merge without user approval.
