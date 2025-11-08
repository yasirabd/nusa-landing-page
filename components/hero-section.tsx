import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Rocket, Star, MessageCircleIcon } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 lg:py-32" style={{ backgroundColor: "#2C8970"}}>
      {/* Background Geometric Shapes */}
      <div className="absolute inset-0">
        {/* Large circle */}
        <div className="absolute -right-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-white/5 md:h-[600px] md:w-[600px] lg:-right-48"></div>
        {/* Medium circle */}
        <div className="absolute right-16 top-16 h-32 w-32 rounded-full bg-white/10 md:h-48 md:w-48"></div>
        {/* Small decorative elements */}
        <div className="absolute right-24 bottom-24 h-4 w-4 rotate-45" style={{ backgroundColor: "#B6CB6C" }}></div>
        <div className="absolute right-32 top-32 h-2 w-2 rotate-45" style={{ backgroundColor: "#B6CB6C" }}></div>
        {/* Decorative stars */}
        <Star
          className="absolute right-40 top-20 h-4 w-134146 text-yellow-400"
          style={{ fill: "#B6CB6C", color: "#B6CB6C" }}
        />
        <Star
          className="absolute right-20 bottom-32 h-3 w-3 text-yellow-400"
          style={{ fill: "#B6CB6C", color: "#B6CB6C" }}
        />
      </div>

      <div className="container relative z-10 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-24 items-center">
          {/* Left Content - Centered */}
          <div className="flex flex-col justify-center space-y-6 max-w-xl">
            <div className="space-y-4">
              {/* Headline: pakai responsive font-size & tetap satu baris */}
              <h1 className="leading-tight text-white font-extrabold text-3xl sm:text-4xl md:text-5xl whitespace-nowrap [text-shadow:_0_4px_12px_rgba(0,0,0,0.45)]">
                <span className="font-righteous tracking-wider">NUSA</span> Boarding School
              </h1>
              <div className="space-y-2">
                 {/* Badge Kuota: compact, pill, kontras baik di background gelap */}
                <div className="inline-flex items-center gap-2 bg-white/95 text-black rounded-full px-3 py-1.5 text-sm font-semibold shadow-sm">
                  {/* icon optional */}
                  <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: "#e3b251" }} />
                  Kuota 20 Santri Putra
                </div>
                {/* Subheadline: jarak lebih adem */}
                <div className="space-y-1 leading-tight">
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
                    <span className="text-[#e3b251]">SPMB 2026–2027</span> <span className="opacity-95">Now Open</span>
                  </p>

                  <p className="text-sm sm:text-base md:text-lg text-white/85">
                    Sekolah IT: <span className="font-semibold">Programmer</span> & <span className="font-semibold">Designer</span><br />
                    Pendidikan Kesetaraan <span className="font-bold text-[#e3b251]">SMA</span>
                  </p>
                </div>
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
                    flex items-center gap-3
                    px-8 py-4
                    rounded-[999px]
                    font-semibold text-lg leading-none
                    bg-[#e3b251] text-[#134146]
                    shadow-[0_6px_18px_rgba(19,65,70,0.18)]
                    transition-all duration-200
                    hover:scale-[1.04] active:scale-[0.98]
                    whitespace-nowrap
                  ">
                  {/* <MessageCircleIcon className="h-6 w-6" strokeWidth={2.2} /> */}
                  <div
                    className="w-6 h-6 bg-[#134146]"
                    style={{
                      maskImage: 'url(/icons/whatsapp.svg)',
                      maskRepeat: 'no-repeat',
                      maskSize: 'contain'
                    }}
                  />
                  <span>Konsultasi WhatsApp</span>
                </button>
              </Link>

              {/* Secondary (Outline) Button */}
              <Link href="https://forms.gle/92AqMyaUs81tyhLRA" className="inline-block" target="_blank" rel="noopener noreferrer">
                <button
                  className="
                    flex items-center gap-3
                    px-8 py-4
                    text-base sm:text-lg font-semibold rounded-[999px]
                    border-[2px] border-white/80 text-white
                    border-white text-white
                    bg-transparent
                    transition-all duration-200
                    hover:border-[#134146] hover:text-[#134146] hover:bg-white/5
                    hover:scale-[1.03] active:scale-[0.98]
                  ">
                  <Rocket className="h-6 w-6" />
                  Daftar Sekarang
                </button>
              </Link>
            </div>
          </div>

          {/* Right Content - Image */}
          {/* Main image container */}
          <div
            className="
              relative rounded-2xl bg-white/90 p-2 
              shadow-[0_20px_45px_rgba(0,0,0,0.35)]
              transition-transform duration-500 
              hover:scale-[1.02]
            ">
            <div className="overflow-hidden rounded-xl border-4 border-white/90">
              <Image
                src="/images/nusa-hero-image.png"
                alt="Santri NUSA Boarding School"
                width={600}
                height={400}
                className="
                  h-auto w-full object-cover 
                  transition-transform duration-700 
                  hover:scale-[1.03]
                "
                priority
                sizes="(max-width: 640px) 320px, (max-width: 768px) 400px, (max-width: 1024px) 500px, 600px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
