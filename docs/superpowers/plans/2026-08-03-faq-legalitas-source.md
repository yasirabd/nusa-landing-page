# FAQ Legalitas Source Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the generic legalitas FAQ copy with the approved institutional relationship and an inline official Kemendikdasmen reference link.

**Architecture:** Keep FAQ content in `FAQ_ITEMS` and add optional source metadata only to the legalitas entry. Render that metadata generically in `FAQSection`, so the component does not special-case the `legalitas` ID.

**Tech Stack:** TypeScript, React, Next.js, Testing Library, Vitest, Lucide React.

---

### Task 1: Specify the legalitas content contract

**Files:**
- Modify: `tests/faq-content.test.ts`
- Modify: `components/faq-content.ts`

- [ ] **Step 1: Write the failing content test**

Replace the existing legalitas assertions with checks for the approved organizations and source metadata:

```ts
expect(legalitas?.answer).toContain("PKBM Cahaya Hikmah")
expect(legalitas?.answer).toContain("Yayasan Islam Nurus Sunnah")
expect(legalitas?.sourceLabel).toBe(
  "Lihat data PKBM Cahaya Hikmah di Kemendikdasmen",
)
expect(legalitas?.sourceUrl).toBe(
  "https://referensi.data.kemendikdasmen.go.id/pendidikan/npsn/P9998836",
)
expect(legalitas?.answer).not.toMatch(
  /terakreditasi|nomor izin|ijazah nasional/i,
)
```

- [ ] **Step 2: Run the content test to verify it fails**

Run: `npm test -- tests/faq-content.test.ts`

Expected: FAIL because the legalitas entry still has generic copy and no source metadata.

- [ ] **Step 3: Implement the content metadata**

Update the legalitas entry to:

```ts
{
  id: "legalitas",
  question: "Bagaimana orang tua dapat memeriksa legalitas pendidikannya?",
  answer:
    "NUSA Boarding School merupakan bagian dari PKBM Cahaya Hikmah yang berada di bawah Yayasan Islam Nurus Sunnah. Informasi lembaga dapat diperiksa melalui situs Referensi Data Kemendikdasmen.",
  sourceLabel: "Lihat data PKBM Cahaya Hikmah di Kemendikdasmen",
  sourceUrl:
    "https://referensi.data.kemendikdasmen.go.id/pendidikan/npsn/P9998836",
},
```

- [ ] **Step 4: Run the content test to verify it passes**

Run: `npm test -- tests/faq-content.test.ts`

Expected: PASS.

### Task 2: Render the official source inline

**Files:**
- Modify: `tests/faq-section.test.tsx`
- Modify: `components/faq-section.tsx`

- [ ] **Step 1: Write the failing rendering test**

Add this test after the existing FAQ section test:

```tsx
it("renders the official legalitas source as an external link", () => {
  render(<FAQSection />)

  const source = screen.getByRole("link", {
    name: /Lihat data PKBM Cahaya Hikmah di Kemendikdasmen/i,
  })

  expect(source).toHaveAttribute(
    "href",
    "https://referensi.data.kemendikdasmen.go.id/pendidikan/npsn/P9998836",
  )
  expect(source).toHaveAttribute("target", "_blank")
  expect(source).toHaveAttribute("rel", "noreferrer")
})
```

- [ ] **Step 2: Run the rendering test to verify it fails**

Run: `npm test -- tests/faq-section.test.tsx`

Expected: FAIL because the evidence link is not rendered yet.

- [ ] **Step 3: Implement generic inline source rendering**

Import `ExternalLink` from `lucide-react`, accept optional source fields in the FAQ map, and replace the plain answer rendering with:

```tsx
<p>
  {answer}{" "}
  {sourceLabel && sourceUrl ? (
    <a
      href={sourceUrl}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-baseline gap-1 font-semibold text-brand underline decoration-brand/35 underline-offset-4 transition-colors hover:text-brand-depth focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
    >
      {sourceLabel}
      <ExternalLink className="size-3.5 self-center" aria-hidden="true" />
    </a>
  ) : null}
</p>
```

- [ ] **Step 4: Run both FAQ test files**

Run: `npm test -- tests/faq-content.test.ts tests/faq-section.test.tsx`

Expected: both files PASS.

- [ ] **Step 5: Verify formatting and stale copy**

Run: `git diff --check`

Expected: exit code 0.

Run: `rg -n "dokumen resmi|admin NUSA" components/faq-content.ts tests/faq-content.test.ts`

Expected: no matches.

