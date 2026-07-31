# Registration Wizard Design

**Date:** 1 August 2026
**Source:** `docs/2026-07-30-ui-ux-audit.md`
**Scope:** Fourth incremental audit feature only: convert the public registration form into a three-step wizard while preserving mandatory payment and the existing Supabase submission contract.

## Goal

Make registration feel finite, understandable, and safe on mobile without changing the school's rule that payment and proof of transfer are required before a registration can be submitted.

## Approved Approach

Use one client-side page and one `react-hook-form` instance whose state survives movement between three separately rendered steps. Each step validates only its own fields before the user can continue. The final Supabase upload and database insert run only from the third step.

This approach preserves the current route, field names, payment requirement, storage bucket, database columns, and success behavior. It avoids the complexity and failure modes of separate routes or server-side draft records.

## Content and Year

The page identifies the active intake as `SPMB 2027/2028`, matching the approved landing-page campaign. Existing payment details remain unchanged unless separately verified and requested:

- Infaq pendaftaran: `Rp275.000`.
- Bank: `Bank Syariah Indonesia`.
- Account number: `5579994446`.
- Account name: `Sekolah Nurus Sunnah`.
- Bank code: `451`.

The implementation must not reinterpret the separate Rp10 million SPI promotion as a discount on the Rp275,000 registration infaq.

## Step Structure

### Step 1: Data Calon Santri

The first step contains six required inputs:

1. Nama lengkap.
2. Nomor WhatsApp.
3. Tempat lahir.
4. Tanggal lahir.
5. Asal kota or kabupaten.
6. Alamat lengkap.

Supporting text estimates approximately two minutes and explains that the WhatsApp number will be used for follow-up.

### Step 2: Sekolah dan Program

The second step contains four required inputs:

1. Sekolah asal.
2. Lokasi sekolah.
3. Sumber informasi.
4. Pilihan program: Programmer or Designer.

The program selector remains a pair of visible choice cards, but behaves as an accessible radio group rather than a collection of visually selected generic buttons.

### Step 3: Pembayaran dan Konfirmasi

The final step contains:

1. The existing payment instructions and account details.
2. A required proof-of-transfer upload accepting PNG, JPEG, or PDF up to 10 MB.
3. A readable summary of the data entered in steps one and two.
4. A required non-refundable-payment statement.
5. The final `Kirim Pendaftaran` action.

The summary uses labelled text rather than disabled form controls. Each summary group provides an `Ubah` action that returns to the relevant step without clearing data.

## Progress and Navigation

The page displays `Langkah N dari 3`, the current step name, and a compact three-part progress indicator. The current item uses `aria-current="step"`; completed and future items remain informational rather than clickable so users cannot accidentally bypass validation.

Navigation rules:

- `Lanjutkan` calls `trigger()` with only the current step's field names.
- Invalid fields keep the user on the current step and focus the first invalid control.
- `Kembali` returns to the previous step without validation or data loss.
- The first step has no form-level back button; the existing link to the landing page remains available.
- Only the third step exposes the submit action.
- Pressing Enter in a text input must not submit the full registration before step three.

On a successful step change, the next step heading receives programmatic focus and the page scrolls to the form heading with the sticky public header offset respected.

## Mobile Actions

On small screens, the current step actions sit in a compact sticky bottom bar with an opaque or strongly blurred surface, safe-area padding, and enough separation that it never obscures the final field. On wider screens, actions remain in normal document flow.

All controls have a minimum 44-pixel touch target. Buttons use explicit 120-180 millisecond color, shadow, and transform transitions. Press feedback may use `scale(0.97)`. Pointer hover treatments are gated to hover-capable fine pointers, and reduced-motion users receive no transform motion.

Step content does not slide horizontally or use staggered reveals. Immediate state change plus focus management is more appropriate for a task-oriented form and avoids making repeated correction feel slow.

## Draft Persistence

Serializable fields from steps one and two are saved locally under a versioned key such as `nusa-registration-draft-v1`. Draft restoration runs only in the browser and safely ignores malformed or incompatible values.

The draft includes:

- nama lengkap;
- nomor WhatsApp;
- tempat and tanggal lahir;
- asal kota;
- alamat lengkap;
- sekolah asal;
- lokasi sekolah;
- sumber informasi;
- pilihan program;
- last completed or active step, capped at step two on reload so the user must revalidate before returning to payment.

The draft excludes the proof-of-transfer `File` and the payment consent checkbox. When a restored draft reaches the payment step, a short notice explains that the receipt must be selected again for browser security. The draft is removed only after a successful submission or an explicit user reset.

## Validation and Error Handling

The existing Zod rules remain the source of truth, with file validation expanded to enforce the visible accepted formats as well as the 10 MB limit. Inputs connect help and error text through `aria-describedby`; invalid controls expose `aria-invalid="true"`.

Step-level validation errors focus the first invalid field. Upload state, submit failure, and success messaging use appropriate live regions without repeatedly announcing ordinary helper text.

Submission keeps the existing sequence:

1. Upload the receipt to the `payment_receipts` bucket.
2. Insert the registration into the `registrations` table using the existing column mapping.
3. Show the success state only after both operations succeed.

While submission is active, navigation and submit controls are disabled and the final button communicates `Mengirim...`. If upload fails, the user stays on step three with all entered data intact. If the database insert fails after upload, the implementation makes a best-effort removal of the just-uploaded receipt before reporting the error, avoiding an orphaned file without hiding the original failure.

## Component Boundaries

The current thousand-line component should be divided along stable responsibilities rather than merely hidden with CSS:

- `components/registration-form-page.tsx` orchestrates step state, form context, draft persistence, submission, and success state.
- A registration-specific schema module owns the Zod schema, field types, step field lists, accepted file types, and default values.
- Step components own the fields and presentation for personal data, school/program data, and payment/confirmation.
- Shared registration field components own labels, errors, text inputs, the program selector, progress indicator, and action bar.

Components consume `react-hook-form` through explicit props or form context and must not create separate form instances. Supabase remains called once by the page orchestrator.

## Page Simplification

The global public header remains the primary navigation. The duplicate sticky mini-navigation inside the registration component is removed to avoid two competing sticky bars. A compact `Kembali ke Beranda` link appears in the page introduction instead.

The page keeps the established paper, teal, and gold visual language but reduces the repeated card-per-field pattern. Related fields sit in one calm step surface with internal spacing and dividers, making the form shorter and easier to scan. Gold remains informational in the payment panel and uses dark teal text for accessible contrast.

The destructive `Reset Form` action is visually tertiary and opens the existing accessible alert-dialog pattern before clearing the browser draft and current fields.

## Accessibility

- The page has one `h1`; each step has an `h2` that can receive focus with `tabIndex={-1}`.
- Progress semantics communicate current position without pretending future steps are interactive.
- Every field has a programmatic label, helper/error association, visible focus ring, and valid touch target.
- Program choices expose radio semantics and keyboard selection.
- The custom upload trigger is keyboard operable and clearly reports the chosen filename or removal.
- The consent control uses a native checkbox with visible custom styling that does not remove keyboard focus.
- The summary is readable by screen readers and its edit actions have specific labels.
- Status and error messages use `aria-live` appropriately.
- No information depends on hover, color alone, or animation.

## Testing

Automated tests verify:

- the three approved step names, counts, and field allocation;
- only the active step is displayed;
- advancing validates only the active step and focuses the first invalid field;
- backward navigation preserves values;
- Enter cannot prematurely submit before step three;
- draft fields restore safely while file and consent values do not persist;
- the progress indicator exposes `aria-current="step"`;
- program choices provide radio semantics and keyboard behavior;
- the final summary presents entered data and edit actions return to the correct step;
- accepted receipt types and the 10 MB limit match the visible guidance;
- Supabase upload and insert run only after final validation;
- upload and insert failures preserve form data and produce accessible errors;
- successful submission clears the draft and renders the success state;
- the registration page uses `SPMB 2027/2028` and retains the approved payment details;
- action controls meet focus, touch-target, reduced-motion, and fine-pointer requirements.

The full existing test suite and production build must also pass. Manual text-only review reports the step hierarchy, field allocation, validation behavior, persistence boundaries, payment details, mobile action behavior, and accessibility safeguards.

## Acceptance Criteria

- Registration is presented as exactly three understandable steps.
- Each step contains no more than six primary inputs.
- Users cannot reach the next step with invalid current-step data.
- Going backward never clears completed fields.
- Reloading restores ordinary form data but never claims to restore the receipt or payment consent.
- Payment and proof of transfer remain mandatory before submission.
- A final summary is available before submission and can be corrected without restarting.
- Errors move keyboard focus to a useful target and remain understandable to screen-reader users.
- Mobile actions remain reachable without covering content.
- Existing Supabase storage and registration records retain their current contract.
- The page consistently states `SPMB 2027/2028`.
- Work stops after this feature so the user can review it before the next audit item begins.
