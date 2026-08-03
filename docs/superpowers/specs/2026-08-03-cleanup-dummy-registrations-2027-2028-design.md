# Cleanup Dummy Registrations 2027/2028 Design

## Goal

Permanently remove all dummy registration data for academic year `2027/2028`, including uploaded payment receipts and relational records linked to those registrations, without affecting another academic year.

## Approach

Use a two-stage manual cleanup because Supabase Storage objects must be deleted through the Storage API rather than direct SQL:

1. Run a one-off Node.js cleanup script with server-side Supabase credentials. It selects receipt paths belonging only to `2027/2028` registrations and removes those files from the `payment_receipts` bucket in batches of at most 1,000.
2. After every selected receipt is deleted successfully, run a SQL migration manually. The migration deletes linked `student_tests`, matching registration-related admin audit logs, and finally the `registrations` rows inside one transaction.

The Storage script stops before database deletion if any file-removal batch fails. Missing receipt files are reported but do not broaden the cleanup scope.

## Safety

- Every registration query and delete is restricted to `academic_year = '2027/2028'`.
- Related rows are selected through the IDs of registrations in that academic year.
- The SQL migration uses a transaction so relational deletion is atomic.
- The SQL migration reports affected row counts and raises an error if targeted registrations still reference receipt paths present in `storage.objects`.
- Neither artifact deletes data for `2026/2027` or empties the complete Storage bucket.
- The service-role key remains in environment variables and is never written into source files or SQL.

## Verification

After both stages:

- No `public.registrations` row has academic year `2027/2028`.
- No `student_tests` row references a deleted registration.
- No targeted registration audit entry remains.
- No targeted receipt path remains in the `payment_receipts` bucket.
- Rows and receipt objects belonging to other academic years remain unchanged.
