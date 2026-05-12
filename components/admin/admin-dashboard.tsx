'use client'

import { format } from "date-fns"
import { id } from "date-fns/locale"
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Download,
  FileClock,
  Filter,
  LogOut,
  RefreshCcw,
  Save,
  Search,
  UsersRound,
  UserRoundCheck,
} from "lucide-react"

import { TestDetailDialog } from "@/components/admin/test-detail-dialog"
import { updateRegistrationAction } from "@/app/admin/actions"
import { logoutAdminAction } from "@/app/login/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type DashboardSearchParams = {
  message?: string
  page?: string
  q?: string
  test?: string
}

type PersonalityResult = {
  aspect?: string | null
  score_a?: number | null
  score_b?: number | null
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

export type RegistrationRow = {
  id: string
  created_at: string | null
  nama_lengkap: string | null
  nomor_whatsapp: string | null
  pilihan_program: string | null
  status: string | null
  kode_tes: string | null
  catatan_admin: string | null
  jadwal_wawancara: string | null
  hasil_wawancara: string | null
  jurusan_akhir: string | null
  student_tests?: StudentTestResult[]
}

const PAGE_SIZE = 10

const STATUS_OPTIONS = [
  "mendaftar",
  "menunggu_wawancara",
  "wawancara_terjadwal",
  "diterima",
  "tidak_diterima",
  "ditangguhkan",
]

const TEST_FILTER_OPTIONS = [
  { value: "all", label: "Semua status tes" },
  { value: "completed", label: "Sudah selesai" },
  { value: "in_progress", label: "Sedang berjalan" },
  { value: "not_started", label: "Belum mulai" },
]

const FLASH_MESSAGES: Record<string, string> = {
  updated: "Perubahan status dan catatan admin berhasil disimpan.",
  update_failed: "Perubahan data gagal disimpan. Cek role admin dan koneksi Supabase aktif.",
}

const STATUS_BADGE_STYLES: Record<string, string> = {
  mendaftar: "border-[#134146]/10 bg-[#134146]/5 text-[#134146]/70",
  menunggu_wawancara: "border-[#F3B233]/30 bg-[#F3B233]/15 text-[#134146]",
  wawancara_terjadwal: "border-[#42CDBA]/30 bg-[#42CDBA]/15 text-[#134146]",
  diterima: "border-[#2C8970]/25 bg-[#2C8970]/10 text-[#2C8970]",
  tidak_diterima: "border-red-200 bg-red-50 text-red-700",
  ditangguhkan: "border-[#134146]/15 bg-[#F7F7F2] text-[#134146]/70",
}
function formatDateTime(value: string | null) {
  if (!value) return "-"

  const date = new Date(value)
  date.setHours(date.getHours() + 7)

  return format(date, "dd MMM yyyy, HH:mm", {
    locale: id,
  })
}

function getTestState(row: RegistrationRow) {
  const test = row.student_tests?.[0]

  if (test?.personality_completed_at && test?.penjurusan_completed_at) {
    return {
      label: "Selesai",
      value: "completed",
      className: "border-[#2C8970]/25 bg-[#2C8970]/10 text-[#2C8970]",
      submittedAt: test.penjurusan_completed_at,
      tendency: test.tendency_result,
    }
  }

  if (test?.personality_completed_at || test?.penjurusan_completed_at) {
    return {
      label: "Berjalan",
      value: "in_progress",
      className: "border-[#F3B233]/30 bg-[#F3B233]/15 text-[#134146]",
      submittedAt: test.penjurusan_completed_at ?? test.personality_completed_at,
      tendency: test.tendency_result,
    }
  }

  return {
    label: "Belum mulai",
    value: "not_started",
    className: "border-[#134146]/10 bg-[#134146]/5 text-[#134146]/70",
    submittedAt: null,
    tendency: null,
  }
}

function sortRows(rows: RegistrationRow[]) {
  return [...rows].sort((a, b) => (b.created_at ?? "").localeCompare(a.created_at ?? ""))
}

function buildPaginationHref(page: number, searchParams: DashboardSearchParams) {
  const params = new URLSearchParams()
  if (searchParams.q) params.set("q", searchParams.q)
  if (searchParams.test) params.set("test", searchParams.test)
  params.set("page", String(page))
  return `/admin?${params.toString()}`
}

function formatStatus(status: string) {
  return status
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

function SummaryCard({
  title,
  value,
  description,
  icon,
  tone = "primary",
}: {
  title: string
  value: number
  description: string
  icon: React.ReactNode
  tone?: "primary" | "accent" | "secondary" | "dark"
}) {
  const toneClass = {
    primary: "bg-[#2C8970]/10 text-[#2C8970]",
    accent: "bg-[#42CDBA]/10 text-[#42CDBA]",
    secondary: "bg-[#F3B233]/10 text-[#F3B233]",
    dark: "bg-[#134146]/10 text-[#134146]",
  }[tone]

  return (
    <div className="rounded-xl border border-[#134146]/8 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-[#134146]/60">{title}</p>
          <p className="mt-2 text-3xl font-bold text-[#134146]">{value}</p>
          <p className="mt-1 text-xs text-[#134146]/50">{description}</p>
        </div>
        <div className={`rounded-lg p-3 ${toneClass}`}>{icon}</div>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string | null }) {
  const style = STATUS_BADGE_STYLES[status ?? ""] ?? "border-[#134146]/10 bg-[#134146]/5 text-[#134146]/70"
  return (
    <span className={`inline-flex rounded-md border px-2.5 py-1 text-xs font-semibold capitalize ${style}`}>
      {status?.replace(/_/g, " ") ?? "Tidak diketahui"}
    </span>
  )
}
export function AdminDashboard({
  data,
  profile,
  searchParams,
}: {
  data: RegistrationRow[]
  profile: { full_name: string | null; email: string }
  searchParams: DashboardSearchParams
}) {
  const query = searchParams.q?.trim().toLowerCase() ?? ""
  const testFilter = searchParams.test ?? "all"
  const currentPage = parseInt(searchParams.page ?? "1", 10)
  const safePage = isNaN(currentPage) || currentPage < 1 ? 1 : currentPage

  const statusOptions = STATUS_OPTIONS

  const rows = sortRows(data)

  const filteredRows = rows.filter((row) => {
    const matchesQuery =
      query === "" ||
      row.nama_lengkap?.toLowerCase().includes(query) ||
      row.nomor_whatsapp?.includes(query) ||
      row.kode_tes?.toLowerCase().includes(query)
    if (!matchesQuery) return false

    if (testFilter === "all") return true

    const testState = getTestState(row)
    return testState.value === testFilter
  })

  const totalRows = filteredRows.length
  const pageCount = Math.ceil(totalRows / PAGE_SIZE)
  const startIndex = (safePage - 1) * PAGE_SIZE
  const pageRows = filteredRows.slice(startIndex, startIndex + PAGE_SIZE)

  const stats = {
    total: data.length,
    completed: rows.filter((r) => getTestState(r).value === "completed").length,
    inProgress: rows.filter((r) => getTestState(r).value === "in_progress").length,
    notStarted: rows.filter((r) => getTestState(r).value === "not_started").length,
    accepted: rows.filter((r) => r.status === "diterima").length,
  }

  const flashMessage = searchParams.message ? FLASH_MESSAGES[searchParams.message] : null

  return (
    <div className="flex min-h-screen flex-col bg-[#F0FAF7] font-sans text-[#134146]">
      <header className="sticky top-0 z-10 border-b border-[#134146]/8 bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#134146]">Admin Dashboard</h1>
            <p className="mt-0.5 text-sm text-[#134146]/60">
              Selamat datang, {profile.full_name ?? profile.email}
            </p>
          </div>
          <form action={logoutAdminAction}>
            <Button
              type="submit"
              variant="outline"
              className="border-[#134146]/20 text-[#134146] hover:bg-[#134146]/5"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </form>
        </div>
      </header>

      <main className="flex-1 p-6">
        {flashMessage && (
          <div className="mb-6 rounded-lg border border-[#2C8970]/20 bg-[#2C8970]/10 px-4 py-3 text-sm text-[#2C8970]">
            {flashMessage}
          </div>
        )}

        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <SummaryCard
            title="Total Pendaftar"
            value={stats.total}
            description="Semua registrasi"
            icon={<UsersRound className="h-5 w-5" />}
            tone="dark"
          />
          <SummaryCard
            title="Tes Selesai"
            value={stats.completed}
            description="Sudah submit semua"
            icon={<CheckCircle2 className="h-5 w-5" />}
            tone="primary"
          />
          <SummaryCard
            title="Tes Berjalan"
            value={stats.inProgress}
            description="Sedang mengerjakan"
            icon={<Clock3 className="h-5 w-5" />}
            tone="secondary"
          />
          <SummaryCard
            title="Belum Mulai"
            value={stats.notStarted}
            description="Belum buka tes"
            icon={<FileClock className="h-5 w-5" />}
            tone="dark"
          />
          <SummaryCard
            title="Diterima"
            value={stats.accepted}
            description="Status diterima"
            icon={<UserRoundCheck className="h-5 w-5" />}
            tone="primary"
          />
        </div>
        <section className="rounded-xl border border-[#134146]/8 bg-white shadow-sm">
          <div className="border-b border-[#134146]/8 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-1 items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#134146]/40" />
                  <Input
                    type="search"
                    name="q"
                    defaultValue={query}
                    placeholder="Cari nama, nomor WA, atau kode tes..."
                    className="h-10 border-[#134146]/10 pl-9 focus:border-[#42CDBA] focus:ring-[#42CDBA]/20"
                  />
                </div>
                <select
                  name="test"
                  defaultValue={testFilter}
                  onChange={(e) => {
                    const form = e.target.closest("form")
                    if (form) {
                      const formData = new FormData(form as HTMLFormElement)
                      const params = new URLSearchParams()
                      const q = formData.get("q") as string
                      if (q) params.set("q", q)
                      params.set("test", e.target.value)
                      window.location.href = `/admin?${params.toString()}`
                    }
                  }}
                  className="h-10 rounded-lg border border-[#134146]/10 bg-white px-3 text-sm text-[#134146] outline-none focus:border-[#42CDBA] focus:ring-[3px] focus:ring-[#42CDBA]/20"
                >
                  {TEST_FILTER_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="h-10 bg-[#2C8970] text-white hover:bg-[#2C8970]/90"
                >
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-10 border-[#134146]/20 text-[#134146] hover:bg-[#134146]/5"
                  onClick={() => {
                    window.location.href = "/admin"
                  }}
                >
                  <RefreshCcw className="h-4 w-4" />
                  Reset
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-10 border-[#134146]/20 text-[#134146] hover:bg-[#134146]/5"
                >
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
          </div>
          {pageRows.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="rounded-full bg-[#134146]/5 p-4">
                <Search className="h-8 w-8 text-[#134146]/40" />
              </div>
              <p className="mt-4 text-lg font-semibold text-[#134146]">Tidak ada data ditemukan</p>
              <p className="mt-1 text-sm text-[#134146]/60">
                Coba ubah filter atau kata kunci pencarian Anda
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-[#134146]/8 bg-[#F7F7F2]">
                    <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[#134146]/70">
                      <div className="flex items-center gap-1.5">
                        <CalendarDays className="h-3.5 w-3.5" />
                        Tanggal Daftar
                      </div>
                    </TableHead>
                    <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[#134146]/70">
                      Kode Tes
                    </TableHead>
                    <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[#134146]/70">
                      Data Pendaftar
                    </TableHead>
                    <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[#134146]/70">
                      Program
                    </TableHead>
                    <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[#134146]/70">
                      Status Tes
                    </TableHead>
                    <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[#134146]/70">
                      Status Pendaftaran
                    </TableHead>
                      <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[#134146]/70">
                        Catatan
                      </TableHead>
                      <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[#134146]/70">
                      Aksi
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pageRows.map((row) => {
                    const testState = getTestState(row)
                    const test = row.student_tests?.[0]

                    return (
                      <TableRow key={row.id} className="border-[#134146]/8 hover:bg-[#F0FAF7]/50">
                        <TableCell className="px-4 py-4 align-top whitespace-normal">
                          <p className="text-sm text-[#134146]/70">{formatDateTime(row.created_at)}</p>
                        </TableCell>

                        <TableCell className="px-4 py-4 align-top whitespace-normal">
                          <code className="rounded bg-[#134146]/5 px-2 py-1 text-xs font-mono text-[#134146]">
                            {row.kode_tes ?? "-"}
                          </code>
                        </TableCell>

                        <TableCell className="px-4 py-4 align-top whitespace-normal">
                          <div className="space-y-1">
                            <p className="font-semibold text-[#134146]">{row.nama_lengkap ?? "-"}</p>
                            {row.nomor_whatsapp ? (
                              <a
                                href={`https://wa.me/${row.nomor_whatsapp.replace(/^0/, '62').replace(/\D/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-[#2C8970] hover:text-[#42CDBA] hover:underline transition-colors"
                              >
                                {row.nomor_whatsapp}
                              </a>
                            ) : (
                              <p className="text-sm text-[#134146]/60">-</p>
                            )}
                          </div>
                        </TableCell>

                        <TableCell className="px-4 py-4 align-top whitespace-normal">
                          <p className="font-medium capitalize text-[#134146]">{row.pilihan_program ?? "-"}</p>
                        </TableCell>

                        <TableCell className="px-4 py-4 align-top whitespace-normal">
                          <div className="space-y-2">
                            <span className={`inline-flex rounded-md border px-2.5 py-1 text-xs font-semibold ${testState.className}`}>
                              {testState.label}
                            </span>
                            {testState.tendency && (
                              <p className="text-xs text-[#134146]/70">
                                Tendency: <span className="font-semibold text-[#2C8970]">{testState.tendency}</span>
                              </p>
                            )}
                            {test && <TestDetailDialog test={test} studentName={row.nama_lengkap ?? "-"} />}
                          </div>
                        </TableCell>

                        <TableCell className="px-4 py-4 align-top whitespace-normal">
                          <StatusBadge status={row.status} />
                        </TableCell>

                        <TableCell className="px-4 py-4 align-top whitespace-normal">
                          <p className="max-w-[260px] text-sm leading-6 text-[#134146]/70">
                            {row.catatan_admin || "Belum ada catatan."}
                          </p>
                        </TableCell>

                        <TableCell className="px-4 py-4 align-top whitespace-normal">
                          <form
                            action={updateRegistrationAction}
                            className="w-[280px] rounded-lg border border-[#134146]/10 bg-[#F7F7F2] p-3"
                          >
                            <input type="hidden" name="registrationId" value={row.id} />
                            <div className="space-y-2.5">
                              <select
                                name="status"
                                defaultValue={row.status ?? "mendaftar"}
                                className="h-10 w-full rounded-lg border border-[#134146]/10 bg-white px-3 text-sm capitalize text-[#134146] outline-none focus:border-[#42CDBA] focus:ring-[3px] focus:ring-[#42CDBA]/20"
                              >
                                {statusOptions.map((status) => (
                                  <option key={status} value={status}>
                                    {formatStatus(status)}
                                  </option>
                                ))}
                              </select>
                              <textarea
                                name="catatanAdmin"
                                defaultValue={row.catatan_admin ?? ""}
                                placeholder="Tambahkan catatan internal"
                                className="min-h-20 w-full resize-y rounded-lg border border-[#134146]/10 bg-white px-3 py-2 text-sm text-[#134146] outline-none placeholder:text-[#134146]/40 focus:border-[#42CDBA] focus:ring-[3px] focus:ring-[#42CDBA]/20"
                              />
                            </div>
                            <Button type="submit" className="mt-2.5 h-10 w-full rounded-lg bg-[#134146] text-white hover:bg-[#1b555b]">
                              <Save className="h-4 w-4" />
                              Simpan Perubahan
                            </Button>
                          </form>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          )}
          {pageCount > 1 ? (
            <div className="flex flex-wrap items-center justify-end gap-2 border-t border-[#134146]/8 px-4 py-4">
              {Array.from({ length: pageCount }, (_, index) => {
                const page = index + 1

                return (
                  <a
                    key={page}
                    href={buildPaginationHref(page, searchParams)}
                    className={`inline-flex h-9 min-w-9 items-center justify-center rounded-lg border px-3 text-sm font-semibold transition ${
                      page === safePage
                        ? "border-[#2C8970] bg-[#2C8970] text-white"
                        : "border-[#134146]/10 bg-white text-[#134146] hover:bg-[#134146]/5"
                    }`}
                  >
                    {page}
                  </a>
                )
              })}
            </div>
          ) : null}
        </section>
      </main>
    </div>
  )
}
