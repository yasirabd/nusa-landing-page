import {
  CheckCircle2,
  Clock3,
  UserRoundCheck,
  UsersRound,
} from "lucide-react"

const CARDS = [
  { key: "total", title: "Total Pendaftar", description: "Semua registrasi", icon: UsersRound, tone: "dark" },
  { key: "completed", title: "Tes Selesai", description: "Sudah submit semua", icon: CheckCircle2, tone: "primary" },
  { key: "inProgress", title: "Tes Berjalan", description: "Sedang mengerjakan", icon: Clock3, tone: "accent" },
  { key: "accepted", title: "Diterima", description: "Status diterima", icon: UserRoundCheck, tone: "primary" },
] as const

export type AdminSummaryStats = Record<(typeof CARDS)[number]["key"], number>

export function AdminSummary({ stats }: { stats: AdminSummaryStats }) {
  const tones = {
    dark: "bg-[#134146]/8 text-[#134146]",
    primary: "bg-[#2C8970]/10 text-[#2C8970]",
    accent: "bg-[#F3B233]/14 text-[#9A6900]",
  }

  return (
    <section aria-label="Ringkasan pendaftaran" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {CARDS.map(({ key, title, description, icon: Icon, tone }) => (
        <article key={key} className="rounded-2xl border border-[#134146]/8 bg-white p-5 shadow-[0_10px_30px_rgba(19,65,70,0.05)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[#134146]/58">{title}</p>
              <p className="mt-3 text-4xl font-bold tracking-tight text-[#134146]">{stats[key]}</p>
              <p className="mt-1 text-xs text-[#134146]/48">{description}</p>
            </div>
            <span className={`flex size-11 items-center justify-center rounded-xl ${tones[tone]}`}>
              <Icon className="size-5" />
            </span>
          </div>
        </article>
      ))}
    </section>
  )
}
