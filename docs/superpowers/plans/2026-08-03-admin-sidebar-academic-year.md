# Admin Sidebar and Academic Year Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a responsive sidebar-based admin portal that isolates registrations by the active `2027/2028` or archived `2026/2027` academic year.

**Architecture:** A small server-safe academic-year utility validates URL state and translates slugs to database values. The protected admin route filters Supabase data before rendering a client-side admin shell with focused summary, registration, and academic-year views. Existing update and export paths carry the validated year context end-to-end.

**Tech Stack:** Next.js 16 App Router, React 18, TypeScript, Supabase, Tailwind CSS, Radix Sheet, Lucide icons, Vitest, Testing Library.

---

## File Structure

- Create `utils/admin-academic-year.ts`: canonical academic-year values, view validation, slug conversion, and URL helpers.
- Create `tests/admin-academic-year.test.ts`: unit coverage for validation and context-preserving URLs.
- Create `supabase/migrations/202608030001_add_registration_academic_year.sql`: safe backfill, constraint, default, and index.
- Modify `components/registration-form-page.tsx`: explicitly store the active intake year.
- Modify `tests/registration-wizard.test.tsx`: verify the insert payload.
- Modify `app/admin/page.tsx`: validate URL state, query only one academic year, and retain the shell on query errors.
- Create `components/admin/admin-shell.tsx`: desktop sidebar, mobile drawer, top bar, navigation, and logout.
- Create `components/admin/admin-summary.tsx`: four year-scoped summary cards.
- Create `components/admin/academic-year-list.tsx`: active/archive year selector.
- Modify `components/admin/admin-dashboard.tsx`: focused registration table view and year-preserving controls.
- Create `tests/admin-dashboard.test.tsx`: source and rendering coverage for navigation, views, responsive shell, and year context.
- Modify `app/admin/actions.ts`: preserve view, year, query, filter, and page after updates.
- Modify `app/admin/export/route.ts`: validate and filter by year, include year in filename and audit details.

### Task 1: Academic-Year Domain Utility

**Files:**
- Create: `utils/admin-academic-year.ts`
- Create: `tests/admin-academic-year.test.ts`

- [ ] **Step 1: Write failing validation and URL tests**

```ts
import { describe, expect, it } from "vitest"

import {
  buildAdminHref,
  parseAcademicYear,
  parseAdminView,
} from "@/utils/admin-academic-year"

describe("admin academic-year state", () => {
  it("defaults invalid values to the active intake", () => {
    expect(parseAcademicYear(undefined).value).toBe("2027/2028")
    expect(parseAcademicYear("other").slug).toBe("2027-2028")
    expect(parseAdminView("other")).toBe("summary")
  })

  it("accepts the archived intake", () => {
    expect(parseAcademicYear("2026-2027").value).toBe("2026/2027")
    expect(parseAdminView("registrations")).toBe("registrations")
  })

  it("builds links that preserve view and year", () => {
    expect(buildAdminHref({ view: "registrations", year: "2026-2027", page: "2" }))
      .toBe("/admin?view=registrations&year=2026-2027&page=2")
  })
})
```

- [ ] **Step 2: Run the test and confirm the module is missing**

Run: `npm test -- tests/admin-academic-year.test.ts`

Expected: FAIL because `@/utils/admin-academic-year` does not exist.

- [ ] **Step 3: Implement the canonical values and helpers**

```ts
export const ACADEMIC_YEARS = [
  { value: "2027/2028", slug: "2027-2028", status: "Aktif" },
  { value: "2026/2027", slug: "2026-2027", status: "Arsip" },
] as const

export type AcademicYear = (typeof ACADEMIC_YEARS)[number]
export type AcademicYearSlug = AcademicYear["slug"]
export type AdminView = "summary" | "registrations" | "academic-years"

export const ACTIVE_ACADEMIC_YEAR = ACADEMIC_YEARS[0]

export function parseAcademicYear(input: string | undefined) {
  return ACADEMIC_YEARS.find((year) => year.slug === input) ?? ACTIVE_ACADEMIC_YEAR
}

export function parseAdminView(input: string | undefined): AdminView {
  return input === "registrations" || input === "academic-years" ? input : "summary"
}

export function buildAdminHref(values: Record<string, string | undefined>) {
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(values)) {
    if (value) params.set(key, value)
  }
  return `/admin?${params.toString()}`
}
```

- [ ] **Step 4: Run the unit test**

Run: `npm test -- tests/admin-academic-year.test.ts`

Expected: PASS.

- [ ] **Step 5: Commit the domain utility**

```powershell
git add utils/admin-academic-year.ts tests/admin-academic-year.test.ts
git commit -m "feat: add admin academic year state"
```

### Task 2: Persist Academic Year on Registrations

**Files:**
- Create: `supabase/migrations/202608030001_add_registration_academic_year.sql`
- Modify: `components/registration-form-page.tsx`
- Modify: `tests/registration-wizard.test.tsx`

- [ ] **Step 1: Strengthen the registration insert test**

Add this property to the existing `expect.objectContaining` assertion:

```ts
academic_year: "2027/2028",
```

- [ ] **Step 2: Run the focused wizard test and verify failure**

Run: `npm test -- tests/registration-wizard.test.tsx -t "uploads the receipt"`

Expected: FAIL because the insert payload lacks `academic_year`.

- [ ] **Step 3: Add the explicit active year to the form payload**

Import `ACTIVE_ACADEMIC_YEAR` and add:

```ts
academic_year: ACTIVE_ACADEMIC_YEAR.value,
```

to the `registrations` insert object.

- [ ] **Step 4: Add the safe database migration**

```sql
alter table public.registrations
  add column if not exists academic_year text;

update public.registrations
set academic_year = '2026/2027'
where academic_year is null;

alter table public.registrations
  drop constraint if exists registrations_academic_year_check;

alter table public.registrations
  add constraint registrations_academic_year_check
  check (academic_year in ('2026/2027', '2027/2028'));

alter table public.registrations
  alter column academic_year set not null,
  alter column academic_year set default '2027/2028';

create index if not exists registrations_academic_year_created_at_idx
  on public.registrations (academic_year, created_at desc);
```

- [ ] **Step 5: Run registration tests**

Run: `npm test -- tests/registration-wizard.test.tsx`

Expected: PASS.

- [ ] **Step 6: Commit persistence changes**

```powershell
git add supabase/migrations/202608030001_add_registration_academic_year.sql components/registration-form-page.tsx tests/registration-wizard.test.tsx
git commit -m "feat: persist registration academic year"
```

### Task 3: Filter Admin Data on the Server

**Files:**
- Modify: `app/admin/page.tsx`
- Modify: `components/admin/admin-dashboard.tsx`
- Test: `tests/admin-dashboard.test.tsx`

- [ ] **Step 1: Add source-level server query assertions**

```ts
import { readFileSync } from "node:fs"
import { describe, expect, it } from "vitest"

describe("admin year-scoped data", () => {
  it("filters registrations before rendering", () => {
    const source = readFileSync("app/admin/page.tsx", "utf8")
    expect(source).toContain("academic_year")
    expect(source).toContain('.eq("academic_year", academicYear.value)')
  })
})
```

- [ ] **Step 2: Run the focused test and verify failure**

Run: `npm test -- tests/admin-dashboard.test.tsx`

Expected: FAIL because the query is not year-scoped.

- [ ] **Step 3: Validate search params and filter Supabase**

Extend the search param type with `view` and `year`, call:

```ts
const academicYear = parseAcademicYear(params.year)
const view = parseAdminView(params.view)
```

Select `academic_year` and add this query modifier before ordering:

```ts
.eq("academic_year", academicYear.value)
```

Pass `academicYear` and `view` into the admin UI. Render query errors through the shared shell props rather than returning a separate full-screen page.

- [ ] **Step 4: Run the focused test**

Run: `npm test -- tests/admin-dashboard.test.tsx`

Expected: PASS for year-scoped query coverage.

- [ ] **Step 5: Commit server filtering**

```powershell
git add app/admin/page.tsx components/admin/admin-dashboard.tsx tests/admin-dashboard.test.tsx
git commit -m "feat: scope admin data by academic year"
```

### Task 4: Build the Responsive Admin Shell and Focused Views

**Files:**
- Create: `components/admin/admin-shell.tsx`
- Create: `components/admin/admin-summary.tsx`
- Create: `components/admin/academic-year-list.tsx`
- Modify: `components/admin/admin-dashboard.tsx`
- Modify: `tests/admin-dashboard.test.tsx`

- [ ] **Step 1: Add rendering tests for the approved navigation and views**

Create representative registrations and assert:

```tsx
render(
  <AdminDashboard
    data={rows}
    profile={{ full_name: "Admin NUSA", email: "admin@nusa.sch.id" }}
    searchParams={{}}
    view="summary"
    academicYear={{ value: "2027/2028", slug: "2027-2028", status: "Aktif" }}
  />,
)

expect(screen.getAllByText("Ringkasan").length).toBeGreaterThan(0)
expect(screen.getAllByText("Data Pendaftar").length).toBeGreaterThan(0)
expect(screen.getAllByText("Tahun Ajaran").length).toBeGreaterThan(0)
expect(screen.getByText("2027/2028")).toBeVisible()
expect(screen.getByText("Total Pendaftar")).toBeVisible()
expect(screen.queryByRole("table")).not.toBeInTheDocument()
```

Add separate renders for `registrations` and `academic-years`, asserting the table and the two year rows respectively.

- [ ] **Step 2: Run rendering tests and verify failure**

Run: `npm test -- tests/admin-dashboard.test.tsx`

Expected: FAIL because the shell and focused views do not exist.

- [ ] **Step 3: Implement `AdminShell`**

Use `LayoutDashboard`, `UsersRound`, `CalendarRange`, `LogOut`, and `Menu` icons. Render a fixed `lg:flex` sidebar, a `lg:hidden` Sheet trigger, navigation links built with `buildAdminHref`, the active year badge, the admin identity, and the existing `logoutAdminAction` form.

- [ ] **Step 4: Implement the four-card `AdminSummary`**

Calculate and display total, completed, in-progress, and accepted counts from year-scoped rows. Reuse the existing test-state rules and NUSA palette.

- [ ] **Step 5: Implement `AcademicYearList`**

Map `ACADEMIC_YEARS` into accessible links. Each link targets `view=summary` for its year and displays `Aktif` or `Arsip`, with the selected year visually distinct.

- [ ] **Step 6: Refocus `AdminDashboard`**

Wrap every view in `AdminShell`. Render `AdminSummary` for `summary`, the existing toolbar/table for `registrations`, and `AcademicYearList` for `academic-years`. Remove the old global header and five-card block. Update all pagination, reset, filter, and export destinations to retain `view=registrations` and the selected year slug.

- [ ] **Step 7: Run rendering tests**

Run: `npm test -- tests/admin-dashboard.test.tsx`

Expected: PASS.

- [ ] **Step 8: Commit the admin UI redesign**

```powershell
git add components/admin/admin-shell.tsx components/admin/admin-summary.tsx components/admin/academic-year-list.tsx components/admin/admin-dashboard.tsx tests/admin-dashboard.test.tsx
git commit -m "feat: redesign admin with responsive sidebar"
```

### Task 5: Preserve Context in Updates and Export

**Files:**
- Modify: `app/admin/actions.ts`
- Modify: `app/admin/export/route.ts`
- Modify: `components/admin/admin-dashboard.tsx`
- Modify: `tests/admin-dashboard.test.tsx`

- [ ] **Step 1: Add context-preservation assertions**

```ts
it("keeps academic year in admin mutations and export", () => {
  const action = readFileSync("app/admin/actions.ts", "utf8")
  const exportRoute = readFileSync("app/admin/export/route.ts", "utf8")
  const dashboard = readFileSync("components/admin/admin-dashboard.tsx", "utf8")

  expect(action).toContain('formData.get("year")')
  expect(action).toContain("buildAdminHref")
  expect(exportRoute).toContain("parseAcademicYear")
  expect(exportRoute).toContain('.eq("academic_year", academicYear.value)')
  expect(exportRoute).toContain("academic_year: academicYear.value")
  expect(dashboard).toContain("/admin/export?year=")
})
```

- [ ] **Step 2: Run tests and verify failure**

Run: `npm test -- tests/admin-dashboard.test.tsx`

Expected: FAIL because actions and export discard the year.

- [ ] **Step 3: Preserve the redirect context in the update action**

Read `year`, `q`, `test`, and `page` from `FormData`, validate the year, and build both success and failure redirects with:

```ts
buildAdminHref({
  view: "registrations",
  year: academicYear.slug,
  q: query || undefined,
  test: testFilter || undefined,
  page: page || undefined,
  message,
})
```

Add matching hidden inputs to every registration update form.

- [ ] **Step 4: Scope export by validated year**

Change the route signature to `GET(request: Request)`, parse `new URL(request.url).searchParams.get("year")`, validate it, select `academic_year`, and apply:

```ts
.eq("academic_year", academicYear.value)
```

Add `academic_year: academicYear.value` to audit details and return a filename such as `nusa-pendaftar-2027-2028.csv`.

- [ ] **Step 5: Link the Export button**

Render it as a link to:

```ts
`/admin/export?year=${academicYear.slug}`
```

- [ ] **Step 6: Run focused tests**

Run: `npm test -- tests/admin-dashboard.test.tsx`

Expected: PASS.

- [ ] **Step 7: Commit operational context preservation**

```powershell
git add app/admin/actions.ts app/admin/export/route.ts components/admin/admin-dashboard.tsx tests/admin-dashboard.test.tsx
git commit -m "fix: preserve academic year in admin actions"
```

### Task 6: Full Verification

**Files:**
- Verify all modified files.

- [ ] **Step 1: Run the complete test suite**

Run: `npm test`

Expected: all Vitest tests pass.

- [ ] **Step 2: Run TypeScript validation**

Run: `npx tsc --noEmit`

Expected: exit code 0 with no type errors.

- [ ] **Step 3: Run production build**

Run: `npm run build`

Expected: Next.js production build completes successfully.

- [ ] **Step 4: Check patch hygiene**

Run: `git diff --check`

Expected: no whitespace errors.

- [ ] **Step 5: Review repository state**

Run: `git status --short`

Expected: only intentional implementation changes remain, or a clean worktree if every task commit was created.
