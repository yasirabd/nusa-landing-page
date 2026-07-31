# Registration Eligibility Copy Design

## Goal

Make it clear before form entry that NUSA Boarding School accepts male students only, while keeping the registration introduction calm and easy to scan. Shorten the first-step description so it remains tidy on desktop.

## Approved Design

- Add the sentence `Pendaftaran hanya untuk calon santri laki-laki.` directly below the SPMB 2027/2028 intake line.
- Present it as a compact light-green informational panel with dark teal text. It must not look like an error, warning, or promotion.
- Keep the information visible before the applicant reaches the first form field.
- Replace the first-step description with `Lengkapi data identitas calon santri. Estimasi waktu 2 menit.`
- Keep the description naturally responsive: one line at typical desktop widths and allowed to wrap on narrow mobile screens.

## Accessibility

- Use ordinary readable text rather than an alert role because the eligibility note is static information, not a live warning.
- Preserve sufficient color contrast and the existing document reading order.
- Do not add animation.

## Testing

- Verify the eligibility sentence is visible on initial render.
- Verify the shortened first-step description is visible and the previous long sentence is absent.
- Run the registration test suite, full test suite, production build, and whitespace verification.

## Scope

This change does not alter validation, form fields, Supabase data, payment requirements, or registration submission behavior.
