import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"

const HERO_FACTS = [
  "Pendidikan Kesetaraan SMA",
  "Programmer & Designer",
  "Boarding School di Kota Semarang",
] as const

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#134146_0%,#1F6F68_52%,#2C8970_100%)] py-12 text-[#F7F7F2] md:py-16 lg:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            "linear-gradient(#8EF3E7 1px, transparent 1px), linear-gradient(90deg, #8EF3E7 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-10 size-80 rounded-full bg-[#42CDBA]/15 blur-3xl lg:size-[28rem]"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 md:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className="max-w-2xl">
          <div className="mb-7 inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-[#F3B233]/35 bg-[#F3B233]/10 px-4 py-2 text-sm leading-snug">
            <span className="font-semibold text-[#F3B233]">SPMB 2027/2028 Sudah Dibuka</span>
            <span aria-hidden="true" className="hidden text-white/35 sm:inline">
              •
            </span>
            <span className="text-white/85">Potongan Rp10 juta untuk 10 pendaftar pertama</span>
          </div>

          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#8EF3E7] sm:text-base">
            Boarding School Islami Tingkat SMA di Kota Semarang
          </p>

          <h1 className="max-w-[13ch] text-4xl font-extrabold leading-[1.06] tracking-[-0.035em] text-white sm:text-5xl lg:text-6xl">
            Menjadi Muslim Tangguh, <span className="text-[#F3B233]">Jago IT</span>
          </h1>

          <p className="mt-6 max-w-[62ch] text-base font-medium leading-7 text-white/80 sm:text-lg sm:leading-8">
            Santri menempuh pendidikan kesetaraan SMA sambil memperkuat agama, karakter,
            dan keterampilan teknologi melalui jalur Programmer atau Designer.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/daftar"
              className="hero-action hero-action-primary inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#F3B233] px-6 text-sm font-semibold text-[#134146] shadow-[0_10px_28px_rgba(19,65,70,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#134146] sm:text-base"
            >
              Daftar SPMB 2027/2028
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>

            <Link
              href="https://wa.me/6281392706707"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-action hero-action-secondary inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#134146] sm:text-base"
            >
              <span
                aria-hidden="true"
                className="size-5 bg-current"
                style={{
                  maskImage: "url(/icons/whatsapp.svg)",
                  maskRepeat: "no-repeat",
                  maskSize: "contain",
                }}
              />
              Konsultasi via WhatsApp
            </Link>
          </div>

          <ul className="mt-8 grid gap-3 border-t border-white/15 pt-6 text-sm font-medium text-white/75 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-3">
            {HERO_FACTS.map((fact) => (
              <li key={fact} className="flex items-start gap-2.5">
                <CheckCircle2
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-[#8EF3E7]"
                />
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative lg:pl-4">
          <div className="overflow-hidden rounded-[2rem] border border-white/15 bg-white/5 p-2 shadow-[0_28px_70px_rgba(7,42,45,0.4)]">
            <div className="overflow-hidden rounded-[1.5rem]">
              <picture>
                <source
                  type="image/webp"
                  srcSet="/images/nusa-hero-image-640.webp 640w, /images/nusa-hero-image.webp 1200w"
                  sizes="(max-width: 1023px) calc(100vw - 2rem), 47vw"
                />
                <Image
                  src="/images/nusa-hero-image.webp"
                  alt="Santri NUSA Boarding School"
                  width={1200}
                  height={794}
                  className="h-auto w-full object-cover"
                  fetchPriority="high"
                  loading="eager"
                  sizes="(max-width: 1023px) calc(100vw - 2rem), 47vw"
                />
              </picture>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
