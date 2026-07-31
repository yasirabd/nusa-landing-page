# Registration Wizard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the single long registration form with an accessible three-step wizard that persists ordinary draft data and still requires payment proof before the existing Supabase upload and insert.

**Architecture:** Keep one `react-hook-form` instance in `RegistrationFormPage`, move schema/draft rules into a pure module, and split step presentation from orchestration. Validate named fields before navigation, persist only serializable non-consent data, and run Supabase only from the final submit handler.

**Tech Stack:** Next.js 16, React 18, TypeScript, react-hook-form, Zod, Supabase JS Storage/Data API, Radix Alert Dialog, Tailwind CSS, Vitest, Testing Library.

---

### Task 1: Registration schema and draft contract

**Files:**
- Create: `components/registration/registration-schema.ts`
- Create: `tests/registration-schema.test.ts`

- [ ] **Step 1: Write failing schema and draft tests**

Create tests that import the wished-for schema API and assert field allocation, accepted file types, the 10 MB limit, safe draft parsing, and exclusion of receipt/consent values:

```ts
import { describe, expect, it } from "vitest"
import {
  createRegistrationDraft,
  parseRegistrationDraft,
  registrationSchema,
  STEP_FIELDS,
} from "@/components/registration/registration-schema"

it("allocates no more than six fields to each wizard step", () => {
  expect(STEP_FIELDS[1]).toEqual([
    "namaLengkap", "nomorWhatsapp", "tempatLahir",
    "tanggalLahir", "asalKota", "alamatLengkap",
  ])
  expect(STEP_FIELDS[2]).toEqual([
    "sekolahAsal", "lokasiSekolah", "sumberInformasi", "pilihanProgram",
  ])
  expect(STEP_FIELDS[3]).toEqual(["buktTransfer", "pernyataan"])
})

it("accepts PNG, JPEG, and PDF receipts up to 10 MB", () => {
  const valid = new File(["receipt"], "receipt.pdf", { type: "application/pdf" })
  const result = registrationSchema.safeParse(validValues({ buktTransfer: valid }))
  expect(result.success).toBe(true)
})

it("drops receipt and consent from persisted drafts", () => {
  const draft = createRegistrationDraft(validValues(), 3)
  expect(draft).not.toHaveProperty("buktTransfer")
  expect(draft).not.toHaveProperty("pernyataan")
  expect(draft.step).toBe(2)
})

it("ignores malformed browser drafts", () => {
  expect(parseRegistrationDraft("not-json")).toBeNull()
})
```

- [ ] **Step 2: Run the schema test and verify RED**

Run: `npm test -- tests/registration-schema.test.ts`

Expected: FAIL because `components/registration/registration-schema.ts` does not exist.

- [ ] **Step 3: Implement the schema and draft helpers**

Create exports with these concrete contracts:

```ts
export const MAX_RECEIPT_SIZE = 10 * 1024 * 1024
export const ACCEPTED_RECEIPT_TYPES = [
  "image/png",
  "image/jpeg",
  "application/pdf",
] as const
export const REGISTRATION_DRAFT_KEY = "nusa-registration-draft-v1"

export const STEP_FIELDS = {
  1: ["namaLengkap", "nomorWhatsapp", "tempatLahir", "tanggalLahir", "asalKota", "alamatLengkap"],
  2: ["sekolahAsal", "lokasiSekolah", "sumberInformasi", "pilihanProgram"],
  3: ["buktTransfer", "pernyataan"],
} as const satisfies Record<1 | 2 | 3, readonly (keyof RegistrationFormValues)[]>

export function createRegistrationDraft(values: RegistrationFormValues, step: WizardStep) {
  const { buktTransfer: _file, pernyataan: _consent, ...serializable } = values
  return { version: 1 as const, step: Math.min(step, 2) as 1 | 2, values: serializable }
}

export function parseRegistrationDraft(raw: string | null): RegistrationDraft | null {
  if (!raw) return null
  try {
    const parsed = registrationDraftSchema.safeParse(JSON.parse(raw))
    return parsed.success ? parsed.data : null
  } catch {
    return null
  }
}
```

The Zod file rule must reject any MIME type outside the three visible formats and any file above `MAX_RECEIPT_SIZE`. Export `RegistrationFormValues`, `WizardStep`, `DEFAULT_VALUES`, and the exact field lists.

- [ ] **Step 4: Run the schema tests and verify GREEN**

Run: `npm test -- tests/registration-schema.test.ts`

Expected: all schema tests PASS.

- [ ] **Step 5: Commit the schema contract**

```powershell
git add components/registration/registration-schema.ts tests/registration-schema.test.ts
git commit -m "feat: define registration wizard schema"
```

### Task 2: Wizard structure, progress, and step validation

**Files:**
- Create: `components/registration/registration-fields.tsx`
- Create: `components/registration/registration-steps.tsx`
- Modify: `components/registration-form-page.tsx`
- Create: `tests/registration-wizard.test.tsx`

- [ ] **Step 1: Write failing wizard navigation tests**

Mock the Supabase client, render `RegistrationFormPage`, and verify the first step, progress semantics, validation, focus, preserved values, and final-step-only submission:

```tsx
it("shows exactly three steps and starts on Data Calon Santri", () => {
  render(<RegistrationFormPage />)
  expect(screen.getByText("Langkah 1 dari 3")).toBeVisible()
  expect(screen.getByRole("heading", { level: 2, name: "Data Calon Santri" })).toBeVisible()
  expect(screen.getByText("Data Calon Santri")).toHaveAttribute("aria-current", "step")
  expect(screen.queryByText("Panduan Pembayaran Infaq Pendaftaran")).not.toBeInTheDocument()
})

it("validates the active step and focuses its first invalid field", async () => {
  render(<RegistrationFormPage />)
  fireEvent.click(screen.getByRole("button", { name: "Lanjutkan ke Sekolah dan Program" }))
  expect(await screen.findByText("Nama lengkap minimal 3 karakter")).toBeVisible()
  expect(screen.getByLabelText(/Nama Lengkap/)).toHaveFocus()
  expect(screen.getByText("Langkah 1 dari 3")).toBeVisible()
})

it("preserves values when moving backward", async () => {
  render(<RegistrationFormPage />)
  fillPersonalStep()
  fireEvent.click(screen.getByRole("button", { name: "Lanjutkan ke Sekolah dan Program" }))
  await screen.findByRole("heading", { level: 2, name: "Sekolah dan Program" })
  fireEvent.click(screen.getByRole("button", { name: "Kembali ke Data Calon Santri" }))
  expect(screen.getByLabelText(/Nama Lengkap/)).toHaveValue("Muhammad Abdullah")
})
```

- [ ] **Step 2: Run the wizard tests and verify RED**

Run: `npm test -- tests/registration-wizard.test.tsx`

Expected: FAIL because the existing form displays every section and has no wizard progress or navigation.

- [ ] **Step 3: Implement shared fields and the three step components**

`registration-fields.tsx` exports accessible `FieldLabel`, `FieldError`, `TextInput`, `ProgramSelector`, and `RegistrationProgress`. Each input receives an error ID and uses:

```tsx
aria-invalid={hasError || undefined}
aria-describedby={[hintId, hasError ? errorId : null].filter(Boolean).join(" ") || undefined}
className="... min-h-11 ... focus-visible:ring-2 focus-visible:ring-[#F3B233] ..."
```

`ProgramSelector` uses a labelled `fieldset` with native radio inputs. Visually hidden radios retain native ArrowLeft/ArrowRight and Space selection, while each visible label provides a 44-pixel target, selected-state text/icon treatment, and `focus-within` styling.

`registration-steps.tsx` exports:

```tsx
export function PersonalDataStep(): JSX.Element
export function SchoolProgramStep(): JSX.Element
export function PaymentConfirmationStep(props: {
  fileName: string | null
  filePreview: string | null
  onChooseFile(): void
  onRemoveFile(): void
  onEdit(step: 1 | 2): void
}): JSX.Element
```

Use `useFormContext<RegistrationFormValues>()` inside the step components so they share one form instance.

- [ ] **Step 4: Rewrite the page orchestrator with one form instance**

Use `FormProvider`, a `step` state, a focusable step-heading ref, and named validation:

```tsx
const goNext = async () => {
  const valid = await trigger([...STEP_FIELDS[step]], { shouldFocus: true })
  if (!valid || step === 3) return
  setStep((step + 1) as WizardStep)
}

useEffect(() => {
  if (!hasMountedStep.current) return
  stepHeadingRef.current?.focus({ preventScroll: true })
  formTopRef.current?.scrollIntoView({ behavior: "auto", block: "start" })
}, [step])
```

Prevent premature Enter submission when `step < 3`, render only the active step, and expose exact action names for forward/back navigation. Remove the duplicate sticky mini-nav and keep a compact semantic link `Kembali ke Beranda` in the page introduction.

- [ ] **Step 5: Run the wizard tests and verify GREEN**

Run: `npm test -- tests/registration-wizard.test.tsx`

Expected: navigation, progress, validation, focus, and value-preservation tests PASS.

- [ ] **Step 6: Commit the core wizard**

```powershell
git add components/registration-form-page.tsx components/registration/registration-fields.tsx components/registration/registration-steps.tsx tests/registration-wizard.test.tsx
git commit -m "feat: add three-step registration wizard"
```

### Task 3: Draft persistence and reset confirmation

**Files:**
- Modify: `components/registration-form-page.tsx`
- Modify: `tests/registration-wizard.test.tsx`

- [ ] **Step 1: Write failing persistence tests**

Add tests that preload `localStorage`, restore serializable values, cap restoration at step two, exclude file/consent, clear the draft after success, and require confirmation before reset:

```tsx
it("restores a safe draft at no later than step two", async () => {
  localStorage.setItem(REGISTRATION_DRAFT_KEY, JSON.stringify({
    version: 1,
    step: 2,
    values: draftValues,
  }))
  render(<RegistrationFormPage />)
  expect(await screen.findByText("Langkah 2 dari 3")).toBeVisible()
  expect(screen.getByLabelText(/Sekolah Asal/)).toHaveValue("SMPN 1 Semarang")
})

it("asks before deleting entered data", async () => {
  render(<RegistrationFormPage />)
  fireEvent.click(screen.getByRole("button", { name: "Reset Form" }))
  expect(screen.getByRole("alertdialog", { name: "Hapus data pendaftaran?" })).toBeVisible()
})
```

- [ ] **Step 2: Run persistence tests and verify RED**

Run: `npm test -- tests/registration-wizard.test.tsx`

Expected: FAIL because draft restoration and reset confirmation do not exist.

- [ ] **Step 3: Implement versioned draft persistence**

Restore once after mount with `parseRegistrationDraft`, then reset the form with merged defaults. Subscribe to `watch` and persist `createRegistrationDraft(values, step)` after restoration; do not write a `File` or consent value. Clear the key only after success or confirmed reset.

Use the existing Radix `AlertDialog` components with title `Hapus data pendaftaran?`, description explaining the effect, `Batal`, and `Ya, hapus data` actions. A restored draft displays a quiet status message; returning to payment explains that the receipt must be selected again.

- [ ] **Step 4: Run persistence tests and verify GREEN**

Run: `npm test -- tests/registration-wizard.test.tsx`

Expected: all persistence and reset tests PASS.

- [ ] **Step 5: Commit draft persistence**

```powershell
git add components/registration-form-page.tsx tests/registration-wizard.test.tsx
git commit -m "feat: persist registration drafts"
```

### Task 4: Payment summary and resilient Supabase submission

**Files:**
- Modify: `components/registration/registration-steps.tsx`
- Modify: `components/registration-form-page.tsx`
- Modify: `tests/registration-wizard.test.tsx`

- [ ] **Step 1: Write failing final-step and submission tests**

Add tests that verify exact payment details, `SPMB 2027/2028`, summary edit actions, accepted upload types, no Supabase call before the final submit, successful upload/insert, and best-effort receipt cleanup after insert failure:

```tsx
it("submits only after payment proof and consent", async () => {
  render(<RegistrationFormPage />)
  await reachPaymentStep()
  const receipt = new File(["receipt"], "receipt.pdf", { type: "application/pdf" })
  fireEvent.change(screen.getByLabelText(/Upload Bukti Transfer/), { target: { files: [receipt] } })
  fireEvent.click(screen.getByLabelText(/uang yang sudah ditransfer/i))
  fireEvent.click(screen.getByRole("button", { name: "Kirim Pendaftaran" }))
  await waitFor(() => expect(uploadMock).toHaveBeenCalledTimes(1))
  expect(insertMock).toHaveBeenCalledTimes(1)
})

it("removes the uploaded receipt when database insertion fails", async () => {
  insertMock.mockResolvedValueOnce({ error: { message: "insert failed" } })
  await submitCompletedWizard()
  await waitFor(() => expect(removeMock).toHaveBeenCalledWith([expect.any(String)]))
  expect(screen.getByRole("alert")).toHaveTextContent("Gagal menyimpan data pendaftaran")
})
```

- [ ] **Step 2: Run submission tests and verify RED**

Run: `npm test -- tests/registration-wizard.test.tsx`

Expected: FAIL because the final summary, edit actions, and cleanup behavior are missing.

- [ ] **Step 3: Implement payment confirmation and submission**

Render the existing amount and bank data with dark teal text on gold surfaces. The file input uses:

```tsx
accept="image/png,image/jpeg,application/pdf"
aria-describedby="buktTransfer-hint buktTransfer-error"
```

Render the step-one and step-two summaries as `dl` groups and specific buttons `Ubah Data Calon Santri` and `Ubah Sekolah dan Program`.

Keep the existing upload options `{ contentType: file.type, upsert: false }`. When insert returns an error, call:

```ts
await supabase.storage.from("payment_receipts").remove([filePath])
```

inside a best-effort `try/catch`, then surface the original insert error. Disable all navigation while `isSubmitting`, use an `aria-live="polite"` sending label, clear the draft after both operations succeed, and preserve the existing database column mapping and generated `kode_tes`.

- [ ] **Step 4: Run submission tests and verify GREEN**

Run: `npm test -- tests/registration-wizard.test.tsx`

Expected: all final-step and Supabase tests PASS.

- [ ] **Step 5: Commit final submission behavior**

```powershell
git add components/registration-form-page.tsx components/registration/registration-steps.tsx tests/registration-wizard.test.tsx
git commit -m "feat: confirm and submit registration payment"
```

### Task 5: Responsive polish, metadata, and full verification

**Files:**
- Modify: `app/globals.css`
- Modify: `app/daftar/page.tsx`
- Modify: `tests/registration-wizard.test.tsx`

- [ ] **Step 1: Write failing source-level polish tests**

Assert the page copy and CSS contract:

```tsx
expect(screen.getByText(/NUSA Boarding School.*SPMB 2027\/2028/)).toBeVisible()
expect(readFileSync("app/globals.css", "utf8")).toContain(".registration-action")
expect(readFileSync("app/globals.css", "utf8")).toContain("@media (hover: hover) and (pointer: fine)")
expect(readFileSync("app/globals.css", "utf8")).toContain("@media (prefers-reduced-motion: reduce)")
```

- [ ] **Step 2: Run polish tests and verify RED**

Run: `npm test -- tests/registration-wizard.test.tsx`

Expected: FAIL because registration-specific interaction styles and updated metadata are absent.

- [ ] **Step 3: Add restrained interaction styles and current metadata**

Add `.registration-action` styles using only explicit `background-color`, `border-color`, `box-shadow`, and `transform` transitions at 150 milliseconds. Use `transform: scale(0.97)` for press feedback, gate hover translation/shadow behind a fine-pointer media query, and set `transform: none` under reduced motion. The mobile action container uses safe-area bottom padding and reserves content clearance; desktop returns it to normal flow.

Update `app/daftar/page.tsx` metadata to `SPMB 2027/2028` without changing the route or global header.

- [ ] **Step 4: Run targeted tests**

Run: `npm test -- tests/registration-schema.test.ts tests/registration-wizard.test.tsx`

Expected: all registration tests PASS.

- [ ] **Step 5: Run full verification**

Run: `npm test`

Expected: all test files PASS with zero failures.

Run: `npx tsc --noEmit`

Expected: no new registration-related errors; report the existing baseline errors in `app/admin/page.tsx`, `components/footer.tsx`, and `components/testimonials-section.tsx` separately if they remain.

Run: `npm run build`

Expected: production build exits successfully.

Run: `git diff --check`

Expected: no whitespace errors.

- [ ] **Step 6: Commit responsive polish**

```powershell
git add app/globals.css app/daftar/page.tsx tests/registration-wizard.test.tsx
git commit -m "style: polish registration wizard"
```
