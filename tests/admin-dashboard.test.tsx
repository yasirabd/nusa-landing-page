import { readFileSync } from "node:fs"
import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import {
  AdminDashboard,
  type RegistrationRow,
} from "@/components/admin/admin-dashboard"

vi.mock("@/app/admin/actions", () => ({
  updateRegistrationAction: "/admin/update",
}))

vi.mock("@/app/login/actions", () => ({
  logoutAdminAction: "/logout",
}))

vi.mock("@/components/admin/test-detail-dialog", () => ({
  TestDetailDialog: () => <button type="button">Lihat hasil tes</button>,
}))

const rows: RegistrationRow[] = [
  {
    id: "registration-1",
    created_at: "2026-08-03T00:00:00.000Z",
    academic_year: "2027/2028",
    nama_lengkap: "Muhammad Abdullah",
    nomor_whatsapp: "6281234567890",
    pilihan_program: "programmer",
    status: "diterima",
    kode_tes: "NUSA01",
    catatan_admin: null,
    jadwal_wawancara: null,
    hasil_wawancara: null,
    jurusan_akhir: null,
    student_tests: [
      {
        personality_completed_at: "2026-08-03T01:00:00.000Z",
        personality_results: [],
        penjurusan_completed_at: "2026-08-03T02:00:00.000Z",
        designer_uiux_score: null,
        designer_color_score: null,
        programmer_iq: 110,
        programmer_logical: 80,
        programmer_numerical: 82,
        programmer_spatial: 78,
        tendency_result: "programmer",
      },
    ],
  },
]

const profile = { full_name: "Admin NUSA", email: "admin@nusa.sch.id" }
const academicYear = {
  value: "2027/2028",
  slug: "2027-2028",
  status: "Aktif",
} as const

describe("admin year-scoped data", () => {
  it("filters registrations before rendering", () => {
    const source = readFileSync("app/admin/page.tsx", "utf8")

    expect(source).toContain("academic_year")
    expect(source).toContain('.eq("academic_year", academicYear.value)')
  })

  it("renders the sidebar and a focused summary view", () => {
    render(
      <AdminDashboard
        data={rows}
        profile={profile}
        searchParams={{}}
        view="summary"
        academicYear={academicYear}
      />,
    )

    expect(screen.getAllByText("Ringkasan").length).toBeGreaterThan(0)
    expect(screen.getAllByText("Data Pendaftar").length).toBeGreaterThan(0)
    expect(screen.getAllByText("Tahun Ajaran").length).toBeGreaterThan(0)
    expect(screen.getAllByText("2027/2028").length).toBeGreaterThan(0)
    expect(screen.getByText("Total Pendaftar")).toBeVisible()
    expect(screen.queryByRole("table")).not.toBeInTheDocument()
  })

  it("renders the registration table only in the registration view", () => {
    render(
      <AdminDashboard
        data={rows}
        profile={profile}
        searchParams={{}}
        view="registrations"
        academicYear={academicYear}
      />,
    )

    expect(screen.getByRole("table")).toBeVisible()
    expect(screen.getByText("Muhammad Abdullah")).toBeVisible()
    expect(screen.queryByText("Tes Berjalan")).not.toBeInTheDocument()
  })

  it("renders active and archived years in the academic-year view", () => {
    render(
      <AdminDashboard
        data={rows}
        profile={profile}
        searchParams={{}}
        view="academic-years"
        academicYear={academicYear}
      />,
    )

    expect(screen.getByText("2026/2027")).toBeVisible()
    expect(screen.getAllByText("Aktif").length).toBeGreaterThan(0)
    expect(screen.getByText("Arsip")).toBeVisible()
    expect(screen.queryByRole("table")).not.toBeInTheDocument()
  })

  it("shows a safe profile fallback when Supabase has no email", () => {
    render(
      <AdminDashboard
        data={rows}
        profile={{ full_name: null, email: null }}
        searchParams={{}}
        view="summary"
        academicYear={academicYear}
      />,
    )

    expect(screen.getAllByText("Email admin belum tersedia").length).toBeGreaterThan(0)
  })
})
