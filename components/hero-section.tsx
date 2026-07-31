import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Rocket, Star, MessageCircleIcon, Code } from "lucide-react"
import { PromoBanner } from "@/components/promo-banner"

const COLORS = {
  darkBase: "#134146",
  depthTone: "#1F6F68",
  primary: "#2C8970",
  secondary: "#42CDBA",
  accent: "#F3B233",
  surface: "#F0FAF7",
  white: "#F7F7F2",
  charcoal: "#2B2B2B",
  neonCyan: "#8EF3E7",
}

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden pt-8 pb-16 md:pt-12 md:pb-24 lg:pt-16 lg:pb-32"
      style={{
        backgroundColor: COLORS.primary,
        backgroundImage: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)`
      }}
    >
      {/* Background Geometric Shapes */}
      <div className="absolute inset-0">
        {/* Digital Grid Overlay */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(${COLORS.neonCyan} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.neonCyan} 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        {/* Large circle */}
        <div
          className="absolute -right-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full md:h-[600px] md:w-[600px] lg:-right-48 pointer-events-none"
          style={{ backgroundColor: COLORS.neonCyan, opacity: 0.1, filter: "blur(60px)" }}
        ></div>
        {/* Medium circle */}
        <div
          className="absolute right-16 top-16 h-32 w-32 rounded-full md:h-48 md:w-48 pointer-events-none"
          style={{ backgroundColor: COLORS.secondary, opacity: 0.25, filter: "blur(30px)" }}
        ></div>
        {/* Small decorative elements */}
        <div className="absolute right-24 bottom-24 h-4 w-4 rotate-45" style={{ backgroundColor: COLORS.accent }}></div>
        <div className="absolute right-32 top-32 h-2 w-2 rotate-45" style={{ backgroundColor: COLORS.accent }}></div>
        {/* Decorative stars */}
        <Star
          className="absolute right-40 top-20 h-4 w-4"
          style={{ fill: COLORS.accent, color: COLORS.accent }}
        />
        <Star
          className="absolute right-20 bottom-32 h-3 w-3"
          style={{ fill: COLORS.accent, color: COLORS.accent }}
        />
      </div>

      <div className="container relative z-10 px-4 md:px-6 max-w-7xl mx-auto">
        {/* Promo Banner — above grid, full width */}
        <PromoBanner />

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-24 items-center">
          {/* Left Content - Centered */}
          <div className="flex flex-col justify-center space-y-6 max-w-xl">
            <div className="space-y-4">
              <div className="flex flex-col items-start gap-2.5">
                <div className="inline-flex shadow-[0_0_15px_rgba(243,178,51,0.4)] items-center gap-2 bg-[#F3B233]/10 backdrop-blur-md border border-[#F3B233]/50 rounded-full px-3.5 py-1.5 text-[13px] sm:text-sm font-bold text-white">
                  <span className="inline-block w-2 h-2 rounded-full shadow-[0_0_8px_rgba(243,178,51,0.9)] animate-pulse" style={{ backgroundColor: COLORS.accent }} />
                  <span style={{ color: COLORS.accent }}>SPMB 2026–2027:</span> Pendaftaran Resmi Dibuka!
                </div>
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5 text-xs sm:text-[13px] font-medium text-white shadow-sm">
                  Kuota Terbatas: 20 Santri Putra
                </div>
              </div>

              {/* Headline: Clean, soft shadow, satu baris ketat tanpa block */}
              <h1 className="leading-tight text-white font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] drop-shadow-lg whitespace-nowrap">
                <span className="font-righteous tracking-wider">NUSA</span> Boarding School
              </h1>
              
              {/* Deskripsi */}
              <div className="leading-relaxed">
                <p className="text-sm sm:text-base opacity-[0.9] max-w-lg" style={{ color: COLORS.white }}>
                  Sekolah IT: <span className="font-semibold text-white">Programmer</span> & <span className="font-semibold text-white">Designer</span><br />
                  Pendidikan Kesetaraan <span className="font-bold border-b border-dashed pb-0.5 border-[#F3B233]" style={{ color: COLORS.accent }}>SMA</span>
                </p>
              </div>
            </div>

            {/* Buttons: responsif (column on xs, row on sm+) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-1">
              {/* Primary Button */}
              <Link
                href="https://wa.me/6281392706707"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block">
                <button
                  className="
                    flex items-center gap-2
                    px-6 py-3
                    rounded-[999px]
                    font-semibold text-sm sm:text-base leading-none
                    transition-all duration-200
                    hover:scale-[1.04] active:scale-[0.98]
                    whitespace-nowrap
                  "
                  style={{
                    backgroundColor: COLORS.accent,
                    color: COLORS.darkBase,
                    boxShadow: `0 6px 18px rgba(19, 65, 70, 0.4)`
                  }}
                >
                  {/* <MessageCircleIcon className="h-6 w-6" strokeWidth={2.2} /> */}
                  <div
                    className="w-5 h-5"
                    style={{
                      backgroundColor: COLORS.charcoal,
                      maskImage: 'url(/icons/whatsapp.svg)',
                      maskRepeat: 'no-repeat',
                      maskSize: 'contain'
                    }}
                  />
                  <span>Konsultasi WhatsApp</span>
                </button>
              </Link>

              {/* Secondary (Outline) Button */}
              <Link href="/daftar" className="inline-block">
                <button
                  className="
                    flex items-center gap-2
                    px-6 py-3
                    text-sm sm:text-base font-semibold rounded-[999px]
                    bg-white/10 backdrop-blur-md border border-white/20 text-white
                    transition-all duration-300
                    hover:bg-white/20 hover:border-white/40 shadow-lg
                    hover:scale-[1.03] active:scale-[0.98]
                  ">
                  <Rocket className="h-5 w-5" />
                  Daftar Sekarang
                </button>
              </Link>
            </div>
          </div>

          {/* Right Content - Image */}
          {/* Main image container - Glass UI style */}
          <div className="relative group lg:px-4">
            <div
              className="
                relative rounded-2xl bg-white/5 p-2 backdrop-blur-sm
                transition-transform duration-700 ease-out
                hover:scale-[1.02] border border-white/10
              "
              style={{
                boxShadow: `0 25px 50px -12px rgba(13, 65, 70, 0.5), 0 0 40px rgba(66, 205, 186, 0.15) inset`
              }}
            >
              <div className="relative overflow-hidden rounded-xl border border-white/20 shadow-[0_0_20px_rgba(44,137,112,0.6)]">
                {/* Soft inner overlay for blended depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#134146]/40 via-transparent to-transparent z-10 pointer-events-none mix-blend-multiply" />
                <picture>
                  <source
                    type="image/webp"
                    srcSet="/images/nusa-hero-image-640.webp 640w, /images/nusa-hero-image.webp 1200w"
                    sizes="(max-width: 1023px) calc(100vw - 2rem), 50vw"
                  />
                  <Image
                    src="/images/nusa-hero-image.webp"
                    alt="Santri NUSA Boarding School"
                    width={1200}
                    height={794}
                    className="
                      h-auto w-full object-cover
                      transition-transform duration-700
                      group-hover:scale-[1.05]
                    "
                    fetchPriority="high"
                    loading="eager"
                    sizes="(max-width: 1023px) calc(100vw - 2rem), 50vw"
                  />
                </picture>
              </div>
            </div>

            {/* Floating Badge 1 - Top Left */}
            <div className="absolute top-2 -left-2 lg:top-8 lg:-left-8 z-20 transition-transform duration-500 group-hover:-translate-y-2 group-hover:-translate-x-1">
              <div className="flex items-center gap-2.5 bg-[#134146]/80 backdrop-blur-md border border-white/10 px-3.5 py-2.5 rounded-2xl shadow-2xl">
                <div className="bg-[#42CDBA]/20 p-2 rounded-lg">
                  <Code className="w-5 h-5" style={{ color: COLORS.neonCyan }} />
                </div>
                <div className="flex flex-col space-y-0.5">
                  <span className="text-white font-semibold text-sm sm:text-[15px] leading-none">IT Expert</span>
                  <span className="text-white/70 text-[11px] sm:text-xs leading-none">Curriculum</span>
                </div>
              </div>
            </div>

            {/* Floating Badge 2 - Bottom Right */}
            <div className="absolute -bottom-4 -right-2 lg:-bottom-6 lg:-right-4 z-20 transition-transform duration-500 group-hover:translate-y-2 group-hover:translate-x-1">
              <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-2.5 rounded-2xl shadow-xl">
                <div className="bg-[#F3B233]/20 p-2 rounded-lg shadow-[0_0_15px_rgba(243,178,51,0.2)]">
                  <Star className="w-5 h-5" style={{ color: COLORS.accent }} />
                </div>
                <div className="flex flex-col space-y-0.5">
                  <span className="text-white font-semibold text-sm sm:text-[15px] leading-none">100% Praktik</span>
                  <span className="text-white/90 text-[11px] sm:text-xs leading-none">Project Based</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
