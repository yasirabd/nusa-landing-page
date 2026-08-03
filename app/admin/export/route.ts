import { NextResponse } from "next/server"

import { requireAdminUser } from "@/utils/admin"
import { parseAcademicYear } from "@/utils/admin-academic-year"

type PersonalityResult = {
  aspect?: string | null
  total?: number | null
  category?: string | null
}

type StudentTestResult = {
  personality_completed_at: string | null
  personality_results: PersonalityResult[] | null
  penjurusan_completed_at: string | null
  designer_uiux_score: number | null
  designer_color_score: number | null
  programmer_iq: number | null
  programmer_logical: number | null
  programmer_numerical: number | null
  programmer_spatial: number | null
  tendency_result: string | null
}

type JoinedRegistration = {
  id: string
  created_at: string | null
  academic_year: string
  nama_lengkap: string | null
  nomor_whatsapp: string | null
  pilihan_program: string | null
  status: string | null
  kode_tes: string | null
  catatan_admin: string | null
  jurusan_akhir: string | null
  student_tests: StudentTestResult[] | null
}

const DEFAULT_UIUX_MAX_SCORE = 6430

function getTestStatus(row: JoinedRegistration) {
  const test = row.student_tests?.[0]

  if (test?.personality_completed_at && test?.penjurusan_completed_at) {
    return "completed"
  }

  if (test?.personality_completed_at || test?.penjurusan_completed_at) {
    return "in_progress"
  }

  return "not_started"
}

function toCsvRow(values: Array<string | null | undefined>) {
  return values
    .map((value) => `"${String(value ?? "").replaceAll('"', '""')}"`)
    .join(",")
}

function formatNumber(value: number | null | undefined) {
  if (typeof value !== "number" || Number.isNaN(value)) return ""

  return Number.isInteger(value) ? String(value) : value.toFixed(1)
}

function getPersonalitySummary(results: PersonalityResult[] | null | undefined) {
  return (results ?? [])
    .filter((result) => typeof result.total === "number")
    .sort((a, b) => (b.total ?? 0) - (a.total ?? 0))
    .slice(0, 3)
    .map((result) => `${result.aspect ?? "-"}: ${result.total ?? "-"} (${result.category ?? "-"})`)
    .join("; ")
}

function getProgrammerScore(test: StudentTestResult | undefined) {
  const values = [test?.programmer_logical, test?.programmer_numerical, test?.programmer_spatial].filter(
    (value): value is number => typeof value === "number",
  )

  if (values.length !== 3) return null

  return values.reduce((total, value) => total + value, 0) / values.length
}

function getDesignerScore(test: StudentTestResult | undefined) {
  const values = [
    typeof test?.designer_uiux_score === "number" ? (test.designer_uiux_score / DEFAULT_UIUX_MAX_SCORE) * 100 : null,
    typeof test?.designer_color_score === "number" ? (test.designer_color_score / 10) * 100 : null,
  ].filter((value): value is number => typeof value === "number")

  if (values.length !== 2) return null

  return values.reduce((total, value) => total + value, 0) / values.length
}

export async function GET(request: Request) {
  const { supabase, user, profile } = await requireAdminUser()
  const academicYear = parseAcademicYear(new URL(request.url).searchParams.get("year"))

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

  if (error) {
    return NextResponse.json({ error: "Export gagal." }, { status: 500 })
  }

  const rows = (data ?? []) as JoinedRegistration[]
  const header = [
    "Nama Lengkap",
    "Nomor WhatsApp",
    "Tanggal Daftar",
    "Program Pilihan",
    "Status Pendaftaran",
    "Status Tes",
    "Hasil TKPI Teratas",
    "Tendensi Peminatan",
    "Skor Programmer",
    "Skor Designer",
    "IQ",
    "Logical",
    "Numerical",
    "Spatial",
    "UIUX Raw",
    "Color Matching",
    "Catatan Admin",
    "Kode Tes",
    "Jurusan Akhir",
  ]

  const csv = [
    toCsvRow(header),
    ...rows.map((row) => {
      const test = row.student_tests?.[0]

      return toCsvRow([
        row.nama_lengkap,
        row.nomor_whatsapp,
        row.created_at,
        row.pilihan_program,
        row.status,
        getTestStatus(row),
        getPersonalitySummary(test?.personality_results),
        test?.tendency_result,
        formatNumber(getProgrammerScore(test)),
        formatNumber(getDesignerScore(test)),
        formatNumber(test?.programmer_iq),
        formatNumber(test?.programmer_logical),
        formatNumber(test?.programmer_numerical),
        formatNumber(test?.programmer_spatial),
        formatNumber(test?.designer_uiux_score),
        formatNumber(test?.designer_color_score),
        row.catatan_admin,
        row.kode_tes,
        row.jurusan_akhir,
      ])
    }),
  ].join("\n")

  await supabase.from("admin_audit_logs").insert({
    admin_id: user.id,
    action: "registrations_exported",
    details: {
      row_count: rows.length,
      format: "csv",
      academic_year: academicYear.value,
      admin_email: profile.email,
    },
  })

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="nusa-pendaftar-${academicYear.slug}.csv"`,
    },
  })
}
