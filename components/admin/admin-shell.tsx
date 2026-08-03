"use client"

import type { ReactNode } from "react"
import {
  CalendarRange,
  LayoutDashboard,
  LogOut,
  Menu,
  UsersRound,
} from "lucide-react"

import { logoutAdminAction } from "@/app/login/actions"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  buildAdminHref,
  type AcademicYear,
  type AdminView,
} from "@/utils/admin-academic-year"

const NAVIGATION = [
  { view: "summary", label: "Ringkasan", icon: LayoutDashboard },
  { view: "registrations", label: "Data Pendaftar", icon: UsersRound },
  { view: "academic-years", label: "Tahun Ajaran", icon: CalendarRange },
] as const

const PAGE_COPY: Record<AdminView, { title: string; description: string }> = {
  summary: {
    title: "Ringkasan",
    description: "Pantau progres seleksi pada satu tampilan yang fokus.",
  },
  registrations: {
    title: "Data Pendaftar",
    description: "Cari, tinjau, dan perbarui data calon santri.",
  },
  "academic-years": {
    title: "Tahun Ajaran",
    description: "Pilih periode aktif atau buka data arsip.",
  },
}

function SidebarContent({
  academicYear,
  profile,
  view,
}: {
  academicYear: AcademicYear
  profile: { full_name: string | null; email: string | null }
  view: AdminView
}) {
  return (
    <div className="flex h-full flex-col bg-[#134146] px-4 py-5 text-white">
      <div className="border-b border-white/10 px-2 pb-5">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-[#F3B233] text-lg font-black text-[#134146]">
            N
          </span>
          <div>
            <p className="text-lg font-bold tracking-tight">NUSA</p>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
              Admin Portal
            </p>
          </div>
        </div>
      </div>

      <nav aria-label="Navigasi admin" className="mt-6 space-y-1.5">
        {NAVIGATION.map(({ view: itemView, label, icon: Icon }) => {
          const active = view === itemView
          return (
            <a
              key={itemView}
              href={buildAdminHref({ view: itemView, year: academicYear.slug })}
              aria-current={active ? "page" : undefined}
              className={`flex min-h-11 items-center gap-3 rounded-xl px-3.5 text-sm font-semibold transition-colors ${
                active
                  ? "bg-[#42CDBA] text-[#134146] shadow-[0_8px_24px_rgba(66,205,186,0.18)]"
                  : "text-white/70 hover:bg-white/8 hover:text-white"
              }`}
            >
              <Icon className="size-4.5" />
              {label}
            </a>
          )
        })}
      </nav>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/6 p-4">
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white/45">
          Tahun Dilihat
        </p>
        <div className="mt-2 flex items-center justify-between gap-3">
          <p className="font-bold">{academicYear.value}</p>
          <span className="rounded-full bg-[#F3B233]/15 px-2.5 py-1 text-xs font-bold text-[#F3B233]">
            {academicYear.status}
          </span>
        </div>
      </div>

      <div className="mt-auto border-t border-white/10 pt-4">
        <div className="px-2 pb-4">
          <p className="truncate text-sm font-semibold">{profile.full_name ?? "Admin NUSA"}</p>
          <p className="truncate text-xs text-white/50">
            {profile.email ?? "Email admin belum tersedia"}
          </p>
        </div>
        <form action={logoutAdminAction}>
          <button
            type="submit"
            className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3.5 text-sm font-semibold text-white/70 transition-colors hover:bg-white/8 hover:text-white"
          >
            <LogOut className="size-4.5" />
            Keluar
          </button>
        </form>
      </div>
    </div>
  )
}

export function AdminShell({
  academicYear,
  children,
  profile,
  view,
}: {
  academicYear: AcademicYear
  children: ReactNode
  profile: { full_name: string | null; email: string | null }
  view: AdminView
}) {
  const pageCopy = PAGE_COPY[view]

  return (
    <div className="min-h-screen bg-[#F0FAF7] font-sans text-[#134146]">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 lg:block">
        <SidebarContent academicYear={academicYear} profile={profile} view={view} />
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 border-b border-[#134146]/8 bg-white/95 px-4 py-3 backdrop-blur sm:px-6 lg:px-8 lg:py-5">
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <button
                  type="button"
                  aria-label="Buka navigasi admin"
                  className="flex size-11 items-center justify-center rounded-xl border border-[#134146]/10 text-[#134146] lg:hidden"
                >
                  <Menu className="size-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 border-0 p-0 sm:max-w-72">
                <SheetTitle className="sr-only">Navigasi admin</SheetTitle>
                <SidebarContent academicYear={academicYear} profile={profile} view={view} />
              </SheetContent>
            </Sheet>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight sm:text-2xl">{pageCopy.title}</h1>
                <span className="rounded-full bg-[#2C8970]/10 px-2.5 py-1 text-xs font-bold text-[#2C8970]">
                  {academicYear.value}
                </span>
              </div>
              <p className="mt-0.5 hidden text-sm text-[#134146]/55 sm:block">
                {pageCopy.description}
              </p>
            </div>

            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold">{profile.full_name ?? "Admin NUSA"}</p>
              <p className="text-xs text-[#134146]/50">
                {profile.email ?? "Email admin belum tersedia"}
              </p>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
