import type { Metadata } from "next"

import { AdminDashboard, type RegistrationRow } from "@/components/admin/admin-dashboard"
import { requireAdminUser } from "@/utils/admin"
import { parseAcademicYear, parseAdminView } from "@/utils/admin-academic-year"

export const metadata: Metadata = {
  title: "Admin Dashboard | NUSA Boarding School",
  robots: {
    index: false,
    follow: false,
  },
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{
    from?: string
    message?: string
    page?: string
    q?: string
    sort?: string
    test?: string
    to?: string
    view?: string
    year?: string
  }>
}) {
  const params = await searchParams
  const { supabase, profile } = await requireAdminUser()
  const academicYear = parseAcademicYear(params.year)
  const view = parseAdminView(params.view)

  const { data, error } = await supabase
    .from("registrations")
    .select(`
      id,
      created_at,
      academic_year,
      nama_lengkap,
      nomor_whatsapp,
      pilihan_program,
      status,
      kode_tes,
      catatan_admin,
      jadwal_wawancara,
      hasil_wawancara,
      jurusan_akhir,
      student_tests (
        personality_completed_at,
        personality_results,
        penjurusan_completed_at,
        designer_uiux_score,
        designer_color_score,
        programmer_iq,
        programmer_logical,
        programmer_numerical,
        programmer_spatial,
        tendency_result
      )
    `)
    .eq("academic_year", academicYear.value)
    .order("created_at", { ascending: false })

  return (
    <AdminDashboard
      data={(data ?? []) as RegistrationRow[]}
      errorMessage={error?.message}
      profile={{ full_name: profile.full_name, email: profile.email }}
      searchParams={params}
      view={view}
      academicYear={academicYear}
    />
  )
}
