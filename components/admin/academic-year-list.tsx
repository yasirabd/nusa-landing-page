import { ArrowRight, CalendarRange } from "lucide-react"

import {
  ACADEMIC_YEARS,
  buildAdminHref,
  type AcademicYear,
} from "@/utils/admin-academic-year"

export function AcademicYearList({ selectedYear }: { selectedYear: AcademicYear }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-[#134146]/8 bg-white shadow-[0_10px_30px_rgba(19,65,70,0.05)]">
      <div className="border-b border-[#134146]/8 px-5 py-4 sm:px-6">
        <h2 className="font-bold">Periode Pendaftaran</h2>
        <p className="mt-1 text-sm text-[#134146]/55">
          Pilih tahun untuk membuka ringkasan dan data pendaftarnya.
        </p>
      </div>
      <div className="divide-y divide-[#134146]/8">
        {ACADEMIC_YEARS.map((year) => {
          const selected = selectedYear.slug === year.slug
          return (
            <a
              key={year.slug}
              href={buildAdminHref({ view: "summary", year: year.slug })}
              aria-current={selected ? "page" : undefined}
              className={`flex items-center gap-4 px-5 py-5 transition-colors sm:px-6 ${selected ? "bg-[#F0FAF7]" : "hover:bg-[#F0FAF7]/60"}`}
            >
              <span className={`flex size-11 items-center justify-center rounded-xl ${selected ? "bg-[#2C8970] text-white" : "bg-[#134146]/6 text-[#134146]/65"}`}>
                <CalendarRange className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-[#134146]">{year.value}</p>
                <p className="mt-0.5 text-sm text-[#134146]/52">
                  {year.status === "Aktif" ? "Pendaftaran tahun berjalan" : "Data pendaftaran sebelumnya"}
                </p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${year.status === "Aktif" ? "bg-[#2C8970]/10 text-[#2C8970]" : "bg-[#134146]/6 text-[#134146]/60"}`}>
                {year.status}
              </span>
              <ArrowRight className="hidden size-4 text-[#134146]/35 sm:block" />
            </a>
          )
        })}
      </div>
    </section>
  )
}
