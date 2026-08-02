# Landing UI/UX Follow-up Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the approved landing-page density, accessibility, navigation, localization, and conversion improvements without redesigning the page.

**Architecture:** Keep the shared design tokens unchanged and make local component updates protected by source and rendering tests. Reuse one exported WhatsApp URL so the hero and footer cannot drift, and keep all changes server-renderable except the existing header behavior.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS v4, Vitest, Testing Library.

---

### Task 1: Align page navigation and keyboard entry

**Files:**
- Modify: `tests/public-navigation.test.ts`
- Modify: `tests/header.test.tsx`
- Modify: `components/public-navigation.ts`
- Modify: `components/header.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Write failing navigation and skip-link tests**

Change the expected navigation order to Curriculum then Program, and add assertions that the header renders `Lewati ke konten utama` with `href="#main-content"` while the page `<main>` has `id="main-content"`.

- [ ] **Step 2: Run tests to verify RED**

Run: `npm test -- tests/public-navigation.test.ts tests/header.test.tsx`

Expected: FAIL because the old order remains and no skip link exists.

- [ ] **Step 3: Implement the minimal navigation changes**

Use this order in `PUBLIC_NAV_ITEMS`:

```ts
[
  { label: "Kurikulum", sectionId: "kurikulum" },
  { label: "Program", sectionId: "program" },
  { label: "Kehidupan Santri", sectionId: "kehidupan-santri" },
  { label: "Pengajar", sectionId: "pengajar" },
  { label: "Biaya", sectionId: "biaya" },
  { label: "FAQ", sectionId: "faq" },
]
```

Add a keyboard-only skip link as the first child of `header`, targeting `#main-content`, and add the matching ID to the landing `<main>`.

- [ ] **Step 4: Run tests to verify GREEN**

Run: `npm test -- tests/public-navigation.test.ts tests/header.test.tsx tests/section-anchors.test.tsx`

Expected: all selected tests PASS.

### Task 2: Fix footer map semantics and localize labels

**Files:**
- Create: `tests/footer-accessibility.test.tsx`
- Modify: `components/footer.tsx`

- [ ] **Step 1: Write the failing footer test**

Render `Footer` and assert:

```ts
expect(screen.getByText("Email")).toBeVisible()
expect(screen.getByText("Kunjungi Kami")).toBeVisible()
expect(screen.getByRole("link", { name: "Buka di Google Maps" })).toHaveAttribute(
  "href",
  "https://maps.app.goo.gl/pR3KqRYPf84yrZB36",
)
expect(screen.getByTitle("Peta lokasi NUSA Boarding School").closest("a")).toBeNull()
```

- [ ] **Step 2: Run test to verify RED**

Run: `npm test -- tests/footer-accessibility.test.tsx`

Expected: FAIL because labels are still English and the iframe is wrapped by an anchor.

- [ ] **Step 3: Implement accessible map structure**

Keep the iframe inside the framed card without an enclosing anchor. Add a separate focus-visible external link labelled `Buka di Google Maps`. Translate `Email us` to `Email` and `Visit us` to `Kunjungi Kami`. Type the `SocialIcon` props and make its image decorative because the link already contains an `sr-only` name.

- [ ] **Step 4: Run test to verify GREEN**

Run: `npm test -- tests/footer-accessibility.test.tsx`

Expected: PASS.

### Task 3: Improve WhatsApp conversion and partner touch presentation

**Files:**
- Create: `lib/public-contact.ts`
- Modify: `tests/public-cta-accessibility.test.tsx`
- Create: `tests/partner-section.test.tsx`
- Modify: `components/hero-section.tsx`
- Modify: `components/footer.tsx`
- Modify: `components/partner-section.tsx`

- [ ] **Step 1: Write failing CTA and partner tests**

Assert that hero and footer WhatsApp links use the same encoded 2027/2028 consultation URL. Assert partner logos use a readable default opacity and a reusable class gated by `@media (hover: hover) and (pointer: fine)` rather than unconditional hover-only recovery.

- [ ] **Step 2: Run tests to verify RED**

Run: `npm test -- tests/public-cta-accessibility.test.tsx tests/footer-accessibility.test.tsx tests/partner-section.test.tsx`

Expected: FAIL because the bare WhatsApp URL and unconditional logo hover classes remain.

- [ ] **Step 3: Implement shared contact URL and partner states**

Export this shared value from `lib/public-contact.ts`:

```ts
const message = "Assalamu'alaikum, saya ingin informasi tentang SPMB NUSA Boarding School 2027/2028."

export const SPMB_WHATSAPP_URL = `https://wa.me/6281392706707?text=${encodeURIComponent(message)}`
```

Use it in Hero and Footer. Give partner images a readable default such as `opacity-75`, add a semantic `partner-logo` class, and put the grayscale/color transition inside the existing fine-pointer media query in `app/globals.css`.

- [ ] **Step 4: Run tests to verify GREEN**

Run: `npm test -- tests/public-cta-accessibility.test.tsx tests/footer-accessibility.test.tsx tests/partner-section.test.tsx`

Expected: all selected tests PASS.

### Task 4: Reduce remaining feature-level section padding

**Files:**
- Modify: `tests/landing-spacing-density.test.ts`
- Modify: `components/curriculum-section.tsx`
- Modify: `components/program-section.tsx`
- Modify: `components/teaching-team-section.tsx`
- Modify: `components/fee-info-section.tsx`
- Modify: `tests/fee-info-section.test.tsx`

- [ ] **Step 1: Write the failing density contract**

Add a test asserting all four selected section sources contain `section-spacing-standard` and do not contain `section-spacing-feature`. Preserve the existing global token assertions. Keep the July 2027 regression assertion and verify July 2026 is absent.

- [ ] **Step 2: Run tests to verify RED**

Run: `npm test -- tests/landing-spacing-density.test.ts tests/fee-info-section.test.tsx`

Expected: density test FAILS because the sections still use feature spacing; fee tests PASS.

- [ ] **Step 3: Apply the local spacing change**

Replace `section-spacing-feature` with `section-spacing-standard` only in Curriculum, Program, Teaching Team, and Fees. Do not alter the shared spacing values or internal control sizing.

- [ ] **Step 4: Run tests to verify GREEN**

Run: `npm test -- tests/landing-spacing-density.test.ts tests/fee-info-section.test.tsx tests/section-anchors.test.tsx`

Expected: all selected tests PASS.

### Task 5: Verify the complete implementation

**Files:**
- Review all files changed in Tasks 1-4.

- [ ] **Step 1: Run the full test suite**

Run: `npm test`

Expected: all tests PASS.

- [ ] **Step 2: Run TypeScript diagnostics**

Run: `npx tsc --noEmit`

Expected: no errors in modified public files. Report any known unrelated errors separately.

- [ ] **Step 3: Check source and diff integrity**

Run: `rg -n "Juli 2026|Email us|Visit us|Get Direction" app components lib`

Expected: no matches.

Run: `git diff --check`

Expected: exit code 0.

- [ ] **Step 4: Review branch scope**

Run: `git status --short` and `git diff --stat`.

Confirm only the approved landing-page files, tests, and Superpowers plan are changed.
