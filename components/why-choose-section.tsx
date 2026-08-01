import Link from "next/link"
import {
  BriefcaseBusiness,
  Code2,
  Languages,
  MoveRight,
  ShieldCheck,
} from "lucide-react"

const benefits = [
  {
    title: "Iman dan Karakter",
    description:
      "Adab, ibadah, disiplin, dan kemandirian dibentuk melalui pendampingan keseharian.",
    icon: ShieldCheck,
  },
  {
    title: "Skill Industri Teknologi",
    description:
      "Belajar IT secara intensif dengan tools terkini, AI, dan project yang relevan dengan kebutuhan industri.",
    icon: Code2,
  },
  {
    title: "Bahasa dan Kepemimpinan",
    description:
      "Melatih bahasa Inggris, leadership, public speaking, dan soft skills untuk berkomunikasi dengan percaya diri.",
    icon: Languages,
  },
  {
    title: "Karya dan Entrepreneurship",
    description:
      "Membangun portofolio, mental berjualan, serta pengalaman freelance dan project berbayar.",
    icon: BriefcaseBusiness,
  },
] as const

const stages = [
  {
    title: "100 Hari Pertama",
    description:
      "Belajar intensif dengan fokus pada skill praktis yang dibutuhkan industri.",
  },
  {
    title: "Langsung Berkarya",
    description:
      "Mulai membangun portofolio melalui freelance atau project berbayar.",
  },
  {
    title: "Belajar Sambil Praktik",
    description:
      "Memperdalam kemampuan dengan mengerjakan project nyata secara berkelanjutan.",
  },
] as const

export function WhyChooseSection() {
  return (
    <section className="bg-[#F7F7F2] py-16 md:py-20 lg:py-24">
      <div className="container mx-auto max-w-6xl px-4 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:items-start lg:gap-16 xl:gap-20">
          <div className="max-w-xl lg:pt-2">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#2C8970]">
              Keunggulan NUSA
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-[#134146] sm:text-4xl md:text-5xl">
              Mengapa Memilih NUSA?
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-[#365F61] sm:text-lg">
              Pendidikan yang menyatukan pembentukan iman, keterampilan teknologi,
              dan pengalaman berkarya dalam keseharian santri.
            </p>
          </div>

          <ul className="grid border-y border-[#134146]/15 md:grid-cols-2 lg:mt-0">
            {benefits.map(({ title, description, icon: Icon }, index) => {
              const itemBorders = [
                "border-b md:border-r md:pr-8",
                "border-b md:pl-8",
                "border-b md:border-b-0 md:border-r md:pr-8",
                "md:pl-8",
              ][index]

              return (
                <li
                  key={title}
                  className={`flex gap-4 py-6 md:py-8 ${itemBorders}`}
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#E3F3EE] text-[#2C8970] ring-1 ring-[#134146]/10">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold leading-snug text-[#134146]">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#496E70] sm:text-base">
                      {description}
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-[#134146] text-white shadow-[0_18px_50px_rgba(19,65,70,0.14)] md:mt-16">
          <div className="grid gap-9 p-7 sm:p-9 md:p-11 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14 lg:p-12">
            <div className="max-w-xl lg:pt-2">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#8EF3E7]">
                Dari Belajar Menjadi Karya
              </p>
              <h3 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                100 Hari Belajar, Besoknya Gajian
              </h3>
              <p className="mt-5 text-sm leading-relaxed text-white/70 sm:text-base">
                Gajian berarti mulai mendapat peluang penghasilan dari karya,
                freelance, atau project berbayar; hasil setiap santri dapat
                berbeda.
              </p>
            </div>

            <div>
              <ol className="divide-y divide-white/15 border-y border-white/15">
                {stages.map(({ title, description }, index) => (
                  <li
                    key={title}
                    className="grid grid-cols-[2.5rem_1fr] gap-3 py-5 sm:grid-cols-[3rem_1fr]"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex size-8 items-center justify-center rounded-full bg-[#F3B233]/10 text-xs font-bold tabular-nums text-[#F3B233] ring-1 ring-[#F3B233]/30"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h4 className="text-lg font-bold text-white">{title}</h4>
                      <p className="mt-1.5 text-sm leading-relaxed text-white/65 sm:text-base">
                        {description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <Link
                href="/daftar"
                className="group mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#F3B233] px-6 text-sm font-semibold text-[#134146] shadow-sm transition-[background-color,box-shadow,transform] duration-150 hover:bg-[#F6BE4D] hover:shadow-md active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#134146] motion-reduce:transition-none motion-reduce:active:scale-100 sm:w-fit sm:text-base"
              >
                Daftar Sekarang
                <MoveRight
                  aria-hidden="true"
                  className="size-5 transition-transform duration-150 group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
