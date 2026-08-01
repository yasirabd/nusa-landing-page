import Link from "next/link"
import { TrendingUp, Coins, Hammer, MoveRight } from "lucide-react"

const COLORS = {
  primary: "#2C8970",
  secondary: "#42CDBA",
  darkBase: "#134146",
  accent: "#F3B233",
  white: "#F7F7F2",
  surface: "#F0FAF7",
}
export function Program100Days() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white relative overflow-hidden">
      <div className="container px-4 md:px-8 max-w-6xl mx-auto relative z-10">
        
        {/* Glow & Texture Behind Card */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-[#42CDBA]/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div
          className="mx-auto max-w-5xl rounded-3xl p-8 sm:p-10 md:p-14 lg:p-16 shadow-2xl text-white relative overflow-hidden group/card"
          style={{
            background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.darkBase})`
          }}
        >
          {/* Subtle Grid / Texture Overlay */}
          <div 
            className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: `linear-gradient(${COLORS.white} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.white} 1px, transparent 1px)`,
              backgroundSize: "24px 24px"
            }}
          />
          
          {/* Radial Light effect on hover */}
          <div className="absolute -inset-10 bg-gradient-to-tr from-transparent via-[#8EF3E7]/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-1000 blur-xl pointer-events-none"></div>

          <div className="relative z-10">
            {/* Heading */}
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.2] mb-6 md:mb-8" style={{ color: COLORS.white }}>
                100 Hari Belajar,{' '}
                <br className="hidden sm:block" />
                <span className="font-romulo-italic font-normal tracking-wide whitespace-nowrap" style={{ color: COLORS.accent }}>
                  Besoknya Gajian
                </span>
              </h2>
              <p className="text-base sm:text-lg font-medium max-w-2xl mx-auto opacity-80 leading-relaxed" style={{ color: COLORS.white }}>
                Program pembelajaran intensif dengan pendekatan bootcamp yang fokus pada praktik dan portfolio
              </p>
            </div>

            {/* Columns */}
            <div className="grid gap-8 md:gap-6 lg:gap-10 md:grid-cols-3 max-w-4xl mx-auto">

              {/* Card 1 */}
              <div className="flex flex-col items-center text-center group/item p-4 rounded-2xl transition-colors hover:bg-white/5">
                <div className="mb-6 rounded-full p-4 md:p-5 backdrop-blur-md transition-transform duration-300 group-hover/item:-translate-y-2 group-hover/item:shadow-lg shadow-black/20" style={{ backgroundColor: 'rgba(255,255,255,0.08)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.15)' }}>
                  <TrendingUp className="h-8 w-8 md:h-10 md:w-10" style={{ color: COLORS.accent }} />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-snug" style={{ color: COLORS.white }}>100 Hari Pertama</h3>
                <p className="text-sm sm:text-base font-medium opacity-70 leading-relaxed max-w-[250px]" style={{ color: COLORS.white }}>
                  Pembelajaran intensif seperti bootcamp, fokus pada skill praktis yang dibutuhkan industri
                </p>
              </div>

              {/* Card 2 */}
              <div className="flex flex-col items-center text-center group/item p-4 rounded-2xl transition-colors hover:bg-white/5">
                <div className="mb-6 rounded-full p-4 md:p-5 backdrop-blur-md transition-transform duration-300 group-hover/item:-translate-y-2 group-hover/item:shadow-lg shadow-black/20" style={{ backgroundColor: 'rgba(255,255,255,0.08)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.15)' }}>
                  <Coins className="h-8 w-8 md:h-10 md:w-10" style={{ color: COLORS.accent }} />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-snug" style={{ color: COLORS.white }}>Langsung Berkarya</h3>
                <p className="text-sm sm:text-base font-medium opacity-70 leading-relaxed max-w-[250px]" style={{ color: COLORS.white }}>
                  Setelah 100 hari, santri mulai berkarya & menghasilkan melalui freelance atau project berbayar
                </p>
              </div>

              {/* Card 3 */}
              <div className="flex flex-col items-center text-center group/item p-4 rounded-2xl transition-colors hover:bg-white/5">
                <div className="mb-6 rounded-full p-4 md:p-5 backdrop-blur-md transition-transform duration-300 group-hover/item:-translate-y-2 group-hover/item:shadow-lg shadow-black/20" style={{ backgroundColor: 'rgba(255,255,255,0.08)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.15)' }}>
                  <Hammer className="h-8 w-8 md:h-10 md:w-10" style={{ color: COLORS.accent }} />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-snug" style={{ color: COLORS.white }}>Belajar Sambil Praktik</h3>
                <p className="text-sm sm:text-base font-medium opacity-70 leading-relaxed max-w-[250px]" style={{ color: COLORS.white }}>
                  Pembelajaran lanjutan dilakukan sambil mengerjakan project nyata untuk memperdalam skill dan keterampilan
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center mt-12 md:mt-16 pt-12 md:pt-16 border-t border-white/10">
              <Link
                href="/daftar"
                className="group/btn inline-flex items-center gap-2 rounded-full px-8 py-3 text-base font-bold shadow-2xl sm:px-10 sm:py-4 sm:text-lg"
                style={{ backgroundColor: COLORS.accent, color: COLORS.darkBase }}
              >
                Daftar Sekarang
                <MoveRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
  
