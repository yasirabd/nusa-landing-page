# Cleanup Dummy Registrations 2027/2028 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a guarded manual workflow that permanently deletes 2027/2028 dummy registrations, their test and audit data, and their uploaded payment receipts without affecting another academic year.

**Architecture:** A testable Node.js script uses the Supabase service role to delete only receipt paths selected from 2027/2028 registrations through the Storage API. A separate CLI-generated SQL migration verifies those paths no longer exist in Storage metadata, then atomically deletes related relational rows and registrations. The script is dry-run by default and requires an explicit confirmation token.

**Tech Stack:** Node.js ESM, `@supabase/supabase-js`, Vitest, PostgreSQL, Supabase CLI, Supabase Storage API.

---

### Task 1: Define Storage cleanup safeguards

**Files:**
- Create: `scripts/cleanup-dummy-registrations-2027-2028.mjs`
- Create: `tests/cleanup-dummy-registrations-2027-2028.test.ts`

- [ ] **Step 1: Write failing helper tests**

```ts
import { describe, expect, it } from "vitest"
import {
  CONFIRMATION_TOKEN,
  TARGET_ACADEMIC_YEAR,
  chunkPaths,
  getUniqueReceiptPaths,
  shouldExecuteDeletion,
} from "../scripts/cleanup-dummy-registrations-2027-2028.mjs"

describe("2027/2028 dummy receipt cleanup", () => {
  it("targets only the approved academic year", () => {
    expect(TARGET_ACADEMIC_YEAR).toBe("2027/2028")
  })

  it("deduplicates non-empty receipt paths", () => {
    expect(getUniqueReceiptPaths([
      { bukti_transfer_url: "first.jpg" },
      { bukti_transfer_url: null },
      { bukti_transfer_url: "first.jpg" },
      { bukti_transfer_url: "second.png" },
    ])).toEqual(["first.jpg", "second.png"])
  })

  it("chunks Storage deletions at the API limit", () => {
    const paths = Array.from({ length: 1001 }, (_, index) => `${index}.jpg`)
    expect(chunkPaths(paths)).toHaveLength(2)
    expect(chunkPaths(paths)[0]).toHaveLength(1000)
    expect(chunkPaths(paths)[1]).toHaveLength(1)
  })

  it("requires the exact destructive confirmation token", () => {
    expect(shouldExecuteDeletion([`--confirm=${CONFIRMATION_TOKEN}`])).toBe(true)
    expect(shouldExecuteDeletion([])).toBe(false)
    expect(shouldExecuteDeletion(["--confirm=yes"])).toBe(false)
  })
})
```

- [ ] **Step 2: Run the tests and confirm failure**

Run: `npx vitest run tests/cleanup-dummy-registrations-2027-2028.test.ts`

Expected: FAIL because the cleanup module does not exist.

- [ ] **Step 3: Implement the helpers**

```js
export const TARGET_ACADEMIC_YEAR = "2027/2028"
export const RECEIPT_BUCKET = "payment_receipts"
export const CONFIRMATION_TOKEN = "DELETE-2027-2028-DUMMY-DATA"
export const STORAGE_BATCH_SIZE = 1000

export function getUniqueReceiptPaths(registrations) {
  return [...new Set(
    registrations
      .map(({ bukti_transfer_url }) => bukti_transfer_url?.trim())
      .filter(Boolean),
  )]
}

export function chunkPaths(paths) {
  const chunks = []
  for (let index = 0; index < paths.length; index += STORAGE_BATCH_SIZE) {
    chunks.push(paths.slice(index, index + STORAGE_BATCH_SIZE))
  }
  return chunks
}

export function shouldExecuteDeletion(args) {
  return args.includes(`--confirm=${CONFIRMATION_TOKEN}`)
}
```

- [ ] **Step 4: Run the helper tests**

Run: `npx vitest run tests/cleanup-dummy-registrations-2027-2028.test.ts`

Expected: PASS with four tests.

- [ ] **Step 5: Commit**

```powershell
git add scripts/cleanup-dummy-registrations-2027-2028.mjs tests/cleanup-dummy-registrations-2027-2028.test.ts
git commit -m "test: define dummy receipt cleanup safeguards"
```

### Task 2: Implement guarded Storage API cleanup

**Files:**
- Modify: `scripts/cleanup-dummy-registrations-2027-2028.mjs`
- Modify: `tests/cleanup-dummy-registrations-2027-2028.test.ts`
- Modify: `package.json`

- [ ] **Step 1: Add failing orchestration tests**

Use an injected fake client to prove that `cleanupReceiptStorage(client, { execute: false })` queries only `academic_year = "2027/2028"`, does not call Storage, and returns dry-run counts. Add a second test with 1,001 receipt paths proving two `remove` calls, and a third proving a Storage error is thrown immediately.

```ts
expect(result).toEqual({ registrations: 1, receiptPaths: 1, deletedPaths: 0, dryRun: true })
expect(removeCalls).toHaveLength(2)
await expect(cleanupReceiptStorage(failingClient, { execute: true })).rejects.toThrow("remove failed")
```

- [ ] **Step 2: Run tests and confirm failure**

Run: `npx vitest run tests/cleanup-dummy-registrations-2027-2028.test.ts`

Expected: FAIL because `cleanupReceiptStorage` is absent.

- [ ] **Step 3: Implement selection and deletion**

Implement `cleanupReceiptStorage(client, { execute })` to select `id,bukti_transfer_url` from `registrations`, filter by `TARGET_ACADEMIC_YEAR`, paginate with `.range()` in pages of 1,000, deduplicate receipt paths, and delete with `client.storage.from(RECEIPT_BUCKET).remove(batch)`. Throw immediately on every query or removal error.

The main-program guard must validate `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_SUPABASE_SERVICE_ROLE_KEY`, create a Supabase client with session persistence disabled, and execute deletion only with `--confirm=DELETE-2027-2028-DUMMY-DATA`.

- [ ] **Step 4: Add the package script**

```json
"cleanup:dummy-registrations-2027-2028": "node --env-file=.env.local scripts/cleanup-dummy-registrations-2027-2028.mjs"
```

- [ ] **Step 5: Verify**

Run: `npx vitest run tests/cleanup-dummy-registrations-2027-2028.test.ts`

Expected: PASS.

Run: `npm test`

Expected: all project tests PASS.

- [ ] **Step 6: Commit**

```powershell
git add package.json scripts/cleanup-dummy-registrations-2027-2028.mjs tests/cleanup-dummy-registrations-2027-2028.test.ts
git commit -m "feat: add guarded dummy receipt cleanup"
```

### Task 3: Create relational cleanup migration

**Files:**
- Create via CLI: `supabase/migrations/<CLI-generated timestamp>_cleanup_dummy_registrations_2027_2028.sql`

- [ ] **Step 1: Generate the migration with Supabase CLI**

Run: `npx supabase migration new cleanup_dummy_registrations_2027_2028`

Expected: CLI prints the exact new path. Do not invent or rename the timestamp.

- [ ] **Step 2: Add transactional SQL**

```sql
begin;

create temporary table cleanup_2027_2028_registrations
on commit drop
as
select id, bukti_transfer_url
from public.registrations
where academic_year = '2027/2028';

do $$
declare
  remaining_receipt_count integer;
begin
  select count(*) into remaining_receipt_count
  from cleanup_2027_2028_registrations target
  join storage.objects object
    on object.bucket_id = 'payment_receipts'
   and object.name = target.bukti_transfer_url
  where target.bukti_transfer_url is not null;

  if remaining_receipt_count > 0 then
    raise exception
      'Cleanup stopped: % payment receipt object(s) still exist. Run the Storage cleanup script first.',
      remaining_receipt_count;
  end if;
end
$$;

do $$
declare
  deleted_test_count integer;
  deleted_audit_count integer;
  deleted_registration_count integer;
begin
  delete from public.student_tests
  where registration_id in (select id from cleanup_2027_2028_registrations);
  get diagnostics deleted_test_count = row_count;

  delete from public.admin_audit_logs
  where details ->> 'academic_year' = '2027/2028'
     or details ->> 'registration_id' in (
       select id::text from cleanup_2027_2028_registrations
     );
  get diagnostics deleted_audit_count = row_count;

  delete from public.registrations
  where id in (select id from cleanup_2027_2028_registrations);
  get diagnostics deleted_registration_count = row_count;

  raise notice 'Deleted % student test row(s).', deleted_test_count;
  raise notice 'Deleted % admin audit row(s).', deleted_audit_count;
  raise notice 'Deleted % registration row(s).', deleted_registration_count;
end
$$;

do $$
begin
  if exists (
    select 1 from public.registrations where academic_year = '2027/2028'
  ) then
    raise exception 'Cleanup verification failed: 2027/2028 registrations remain.';
  end if;
end
$$;

commit;
```

- [ ] **Step 3: Review destructive scope**

Run: `rg -n "2027/2028|2026/2027|delete from|storage.objects|payment_receipts|student_tests|admin_audit_logs" supabase/migrations/*_cleanup_dummy_registrations_2027_2028.sql`

Expected: every delete is scoped through the temporary target IDs or exact academic year; `storage.objects` is read only.

- [ ] **Step 4: Verify migration tracking**

Run: `npx supabase migration list --local`

Expected: the cleanup migration appears as local and pending.

- [ ] **Step 5: Commit**

```powershell
git add supabase/migrations/*_cleanup_dummy_registrations_2027_2028.sql
git commit -m "chore: add dummy registration cleanup migration"
```

### Task 4: Final safety verification and handoff

**Files:**
- Verify: `scripts/cleanup-dummy-registrations-2027-2028.mjs`
- Verify: `tests/cleanup-dummy-registrations-2027-2028.test.ts`
- Verify: `package.json`
- Verify: the CLI-generated cleanup migration in `supabase/migrations`

- [ ] **Step 1: Verify non-destructive dry run**

Run: `npm run cleanup:dummy-registrations-2027-2028`

Expected: selected registration and receipt counts are printed and no Storage deletion occurs. If local service-role credentials are unavailable, report that live dry-run verification could not run and rely on fake-client tests.

- [ ] **Step 2: Run verification**

Run: `npx vitest run tests/cleanup-dummy-registrations-2027-2028.test.ts`

Run: `npm test`

Run: `git diff --check`

Expected: tests PASS and no whitespace errors are reported.

- [ ] **Step 3: Hand off exact manual order without executing it**

```powershell
# Preview targets.
npm run cleanup:dummy-registrations-2027-2028

# Permanently delete the selected receipt files.
npm run cleanup:dummy-registrations-2027-2028 -- --confirm=DELETE-2027-2028-DUMMY-DATA

# Then paste and run the CLI-generated SQL migration in Supabase SQL Editor.
```

State clearly that confirmed Storage deletion and the SQL migration are destructive and require a backup for recovery.
