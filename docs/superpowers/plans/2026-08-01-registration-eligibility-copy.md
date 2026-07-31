# Registration Eligibility Copy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Clearly state that registration is only for male students and shorten the first-step description so it stays tidy on desktop.

**Architecture:** Keep this as a presentation-only change in the existing registration introduction and shared step header. Protect the approved copy and removal of the longer sentence with the existing registration wizard test suite; do not alter schema, Supabase mapping, or submission behavior.

**Tech Stack:** Next.js 16, React 18, TypeScript, Tailwind CSS, Vitest, Testing Library.

---

### Task 1: Registration eligibility note and concise step copy

**Files:**
- Modify: `tests/registration-wizard.test.tsx`
- Modify: `components/registration-form-page.tsx`
- Modify: `components/registration/registration-steps.tsx`

- [ ] **Step 1: Write failing copy tests**

Add an initial-render test to `tests/registration-wizard.test.tsx`:

```tsx
it("states male-student eligibility before form entry", () => {
  render(<RegistrationFormPage />)

  expect(
    screen.getByText("Pendaftaran hanya untuk calon santri laki-laki."),
  ).toBeVisible()
  expect(
    screen.getByText(
      "Lengkapi data identitas calon santri. Estimasi waktu 2 menit.",
    ),
  ).toBeVisible()
  expect(
    screen.queryByText(/Bagian ini biasanya selesai dalam sekitar 2 menit/),
  ).not.toBeInTheDocument()
})
```

- [ ] **Step 2: Run the targeted test and verify RED**

Run:

```powershell
npx vitest run tests/registration-wizard.test.tsx --pool=forks --maxWorkers=1 --minWorkers=1
```

Expected: FAIL because the eligibility sentence and concise step description are not rendered.

- [ ] **Step 3: Implement the approved presentation**

In `components/registration-form-page.tsx`, render this compact informational panel directly below the SPMB intake line:

```tsx
<p className="mt-3 inline-flex rounded-xl border border-[#2C8970]/20 bg-[#2C8970]/8 px-3 py-2 text-sm font-semibold text-[#134146]">
  Pendaftaran hanya untuk calon santri laki-laki.
</p>
```

In `components/registration/registration-steps.tsx`, replace the first-step description with:

```tsx
description="Lengkapi data identitas calon santri. Estimasi waktu 2 menit."
```

Do not add an alert role or animation. Leave all form validation and submission behavior unchanged.

- [ ] **Step 4: Verify targeted and full behavior**

Run:

```powershell
npx vitest run tests/registration-wizard.test.tsx --pool=forks --maxWorkers=1 --minWorkers=1
npx vitest run --pool=forks --maxWorkers=1 --minWorkers=1
npx tsc --noEmit
npm run build
git diff --check
```

Expected: registration and full tests PASS; production build exits successfully; `git diff --check` reports no errors. TypeScript may report only the documented baseline errors in `app/admin/page.tsx`, `components/footer.tsx`, and `components/testimonials-section.tsx`.

- [ ] **Step 5: Commit the feature**

```powershell
git add components/registration-form-page.tsx components/registration/registration-steps.tsx tests/registration-wizard.test.tsx
git commit -m "content: clarify registration eligibility"
```
