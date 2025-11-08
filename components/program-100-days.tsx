import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TrendingUp, Coins, Hammer } from "lucide-react"

export function Program100Days() {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <div
          className="mx-auto max-w-5xl rounded-xl p-8 md:p-12 shadow-lg text-white"
          style={{
            background: "linear-gradient(135deg, #2C8970, #134146)"
          }}
        >
          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              "100 Hari Belajar, Besoknya Gajian"
            </h2>
            <p className="mt-4 text-white/90 max-w-2xl mx-auto">
              Program pembelajaran intensif dengan pendekatan bootcamp yang fokus pada praktik dan portfolio
            </p>
          </div>

          {/* Columns */}
          <div className="grid gap-8 md:grid-cols-3">

            {/* Card 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full p-4" style={{ backgroundColor: "#E3B251" }}>
                <TrendingUp className="h-10 w-10 text-[#134146]" />
              </div>
              <h3 className="text-xl font-bold mb-2">100 Hari Pertama</h3>
              <p className="text-white/80">
                Pembelajaran intensif seperti bootcamp, fokus pada skill praktis yang dibutuhkan industri
              </p>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full p-4" style={{ backgroundColor: "#E3B251" }}>
                <Coins className="h-10 w-10 text-[#134146]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Langsung Berkarya</h3>
              <p className="text-white/80">
                Setelah 100 hari, santri mulai berkarya & menghasilkan melalui freelance atau project berbayar
              </p>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full p-4" style={{ backgroundColor: "#E3B251" }}>
                <Hammer className="h-10 w-10 text-[#134146]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Belajar Sambil Praktik</h3>
              <p className="text-white/80">
                Pembelajaran lanjutan dilakukan sambil mengerjakan project nyata untuk memperdalam skill dan keterampilan
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-10">
            <Link
              href="https://forms.gle/92AqMyaUs81tyhLRA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button
                className="font-semibold px-6 py-3 rounded-full transition-colors bg-[#E3B251] hover:bg-[#B6CB6C] text-[#134146]"
              >
                Daftar Sekarang →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
  