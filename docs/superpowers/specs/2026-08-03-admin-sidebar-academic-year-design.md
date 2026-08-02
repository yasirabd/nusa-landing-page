# Admin Sidebar and Academic Year Design

## Objective

Redesign the admin area around a persistent sidebar and separate registration data by academic year. The active intake is `2027/2028`, while every registration that already exists before this change belongs to the `2026/2027` archive.

## MVP Scope

- Add responsive sidebar navigation to the protected admin area.
- Separate the summary and registration table into focused admin views.
- Add an explicit academic year to every registration.
- Backfill existing registrations as `2026/2027`.
- Store new registrations as `2027/2028`.
- Let admins view either the active year or the archived year.
- Preserve the selected academic year across search, filters, pagination, updates, and CSV export.

The MVP does not include creating, renaming, deleting, or automatically rolling over academic years.

## Navigation and Layout

### Desktop

The admin shell uses a fixed left sidebar and a scrollable main content area. The sidebar contains the NUSA identity, the label `Admin Portal`, primary navigation, and the logout action.

Navigation items:

1. `Ringkasan`
2. `Data Pendaftar`
3. `Tahun Ajaran`
4. `Keluar`

The main area has a compact top bar that displays the page title, the academic year being viewed, and the signed-in admin identity.

### Mobile

The sidebar becomes a drawer opened from the top bar. The same navigation, active state, year context, and logout action remain available. Data tables may scroll horizontally, but the surrounding page must not overflow.

## Admin Views

### Ringkasan

`Ringkasan` is the default admin view. It displays four primary statistics scoped to the selected academic year:

- Total pendaftar
- Tes selesai
- Tes berjalan
- Diterima

The current five-card layout is reduced to four cards to improve hierarchy. Supporting states such as `Belum mulai` remain available in the registration table filter and row status rather than occupying another summary card.

### Data Pendaftar

This view contains the operational registration table and its controls:

- Search by applicant name, WhatsApp number, or test code.
- Filter by test progress.
- Paginate results.
- Export the currently selected academic year.
- View test details.
- Update registration status and admin notes.

The toolbar always shows the selected academic year. Search, filtering, pagination, updates, and export must not silently switch the year context.

### Tahun Ajaran

This view contains a simple two-row list for the MVP:

- `2027/2028` with the status `Aktif`
- `2026/2027` with the status `Arsip`

Selecting a row changes the year context and opens the relevant admin data. `Arsip` is a label, not a write lock: admins may still update registration statuses and notes for `2026/2027`.

## Routing and URL State

The selected year is represented by a stable URL parameter, for example:

```text
/admin?view=registrations&year=2027-2028
```

Supported view values are `summary`, `registrations`, and `academic-years`. Missing values resolve to `summary`. The supported year slugs are `2027-2028` and `2026-2027`; a missing or invalid year resolves to `2027-2028`.

All generated links and form submissions preserve the current `year` and `view` values where relevant. This includes search, test filters, pagination, reset controls, update redirects, and CSV export.

## Data Model and Migration

Add a required text column to `registrations`:

```sql
academic_year text not null default '2027/2028'
```

The migration order must prevent existing rows from receiving the new default incorrectly:

1. Add `academic_year` as nullable without a default.
2. Update all existing rows to `2026/2027`.
3. Add a check constraint allowing only `2026/2027` and `2027/2028` for this MVP.
4. Set the column to `not null`.
5. Set the database default to `2027/2028`.
6. Add an index suitable for year-scoped dashboard queries.

The public registration form also sends `academic_year: "2027/2028"` explicitly. The database default remains a safety net for other valid insert paths.

The admin query selects and filters by `academic_year`. Summary values are calculated only from registrations in the selected year.

## Component Boundaries

The existing monolithic admin dashboard should be divided into focused units:

- `AdminShell`: responsive sidebar, top bar, profile context, and logout.
- `AdminSidebar`: navigation items, active state, and mobile drawer content.
- `AdminSummary`: year-scoped statistic cards.
- `RegistrationTable`: table, row actions, test details, and pagination.
- `RegistrationToolbar`: search, test filter, reset, and export controls.
- `AcademicYearList`: active and archived year choices.
- Academic-year utilities: valid values, slug conversion, labels, and URL preservation.

Server-side data loading remains in the admin route. It validates URL state, queries only the selected academic year, and passes focused data to the client components. Existing authentication, role checks, server actions, audit logging, and Supabase access patterns remain in place.

## Visual Direction

The redesign continues the established NUSA visual language:

- Sidebar: dark base `#134146`.
- Active navigation: turquoise/primary accent derived from `#42CDBA` and `#2C8970`.
- Main background: light surface `#F0FAF7`.
- Cards and table surfaces: white or the existing warm white.
- Typography: Work Sans, matching the current project.
- Shape and depth: rounded cards, soft borders, restrained shadows, and clear spacing.

The interface remains operational and data-focused. Motion is limited to purposeful drawer and navigation transitions, with reduced-motion behavior respected.

## Data Flow

1. The admin opens a URL containing an optional `view` and `year`.
2. The server validates both values and falls back to the summary for `2027/2028` when needed.
3. Supabase returns registrations only for the selected academic year, including related student test data.
4. The selected view renders inside the shared admin shell.
5. Client controls construct URLs that retain the validated year context.
6. Registration updates redirect back to the same view, year, search, filter, and page when practical.
7. Export applies the selected academic year and records it in the audit log details.

## Error and Empty States

- Invalid view: fall back to `summary`.
- Invalid or missing year: fall back to `2027/2028`.
- Supabase query failure: keep the admin shell and logout accessible while showing a clear content-area error.
- No registrations for a selected year: show a year-specific empty state rather than a generic search failure.
- Failed registration update: return to the same year context and display the existing failure message.
- Failed export: return a clear HTTP error without exporting data from another year.

## Testing Strategy

Automated tests must cover:

- Migration behavior: existing rows become `2026/2027`; new rows default to `2027/2028`.
- Registration form payload includes `2027/2028`.
- Valid and invalid academic-year URL handling.
- Summary statistics are isolated by academic year.
- Registration data does not leak across year filters.
- Search, test filter, reset, pagination, update redirects, and export preserve the selected year.
- CSV export contains only the selected academic year and records that year in the audit log.
- Desktop sidebar active states and mobile drawer navigation.
- Empty and error states retain the admin shell.

Existing authentication and authorization tests remain required because the redesign must not weaken route protection or role enforcement.

## Acceptance Criteria

- Admin navigation uses a responsive sidebar with the four approved menu items.
- `Ringkasan`, `Data Pendaftar`, and `Tahun Ajaran` have distinct, focused views.
- Existing registrations are identified as `2026/2027`.
- Every new registration is stored as `2027/2028`.
- The admin defaults to `2027/2028` and can switch to the `2026/2027` archive.
- Statistics, table rows, updates, and exports respect the selected academic year.
- Invalid year input cannot expose or mix data from another year.
- The visual implementation remains consistent with the existing NUSA style and works on desktop and mobile.

## Out of Scope

- Creating or editing academic-year records from the UI.
- Automatically opening or closing registration periods.
- Assigning different permissions by academic year.
- Locking archived registrations against updates.
- Analytics that compare multiple academic years in one view.
