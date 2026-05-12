import type { Metadata } from "next"

import { AlertCircle } from "lucide-react"

import { AdminDashboard, type RegistrationRow } from "@/components/admin/admin-dashboard"
import { requireAdminUser } from "@/utils/admin"

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
  }>
}) {
  const params = await searchParams
  const { supabase, profile } = await requireAdminUser()

  const { data, error } = await supabase
    .from("registrations")
    .select(`
      id,
      created_at,
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
    .order("created_at", { ascending: false })

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F0FAF7] px-4 py-16 font-sans text-[#134146]">
        <div className="max-w-xl rounded-[2rem] border border-red-200 bg-[#F7F7F2] p-8 shadow-[0_18px_40px_rgba(19,65,70,0.08)]">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
            <AlertCircle className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold">Dashboard admin belum bisa dimuat</h1>
          <p className="mt-3 text-sm leading-6 text-[#134146]/70">
            Koneksi ke Supabase aktif, tetapi query admin gagal dijalankan. Periksa kembali kecocokan project pada
            `.env.local`, role admin pada `profiles`, dan policy RLS untuk tabel `registrations` serta
            `student_tests`.
          </p>
          <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
            Detail error: {error.message}
          </p>
        </div>
      </main>
    )
  }

  return (
    <AdminDashboard
      data={(data ?? []) as RegistrationRow[]}
      profile={{ full_name: profile.full_name, email: profile.email }}
      searchParams={params}
    />
  )
}
