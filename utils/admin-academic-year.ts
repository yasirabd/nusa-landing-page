export const ACADEMIC_YEARS = [
  { value: "2027/2028", slug: "2027-2028", status: "Aktif" },
  { value: "2026/2027", slug: "2026-2027", status: "Arsip" },
] as const

export type AcademicYear = (typeof ACADEMIC_YEARS)[number]
export type AcademicYearSlug = AcademicYear["slug"]
export type AdminView = "summary" | "registrations" | "academic-years"

export const ACTIVE_ACADEMIC_YEAR = ACADEMIC_YEARS[0]

export function parseAcademicYear(input: string | undefined | null): AcademicYear {
  return ACADEMIC_YEARS.find((year) => year.slug === input) ?? ACTIVE_ACADEMIC_YEAR
}

export function parseAdminView(input: string | undefined | null): AdminView {
  return input === "registrations" || input === "academic-years" ? input : "summary"
}

export function buildAdminHref(values: Record<string, string | undefined>) {
  const params = new URLSearchParams()

  for (const [key, value] of Object.entries(values)) {
    if (value) params.set(key, value)
  }

  return `/admin?${params.toString()}`
}
