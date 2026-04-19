import Link from "next/link"
import { Button } from "@/components/ui/button"

export function RegistrationSection() {
  return (
    <section
      id="daftar"
      className="py-12 md:py-16 lg:py-20"
      style={{ backgroundColor: "#F0FAF7" }}
    >
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <div
          className="mx-auto max-w-4xl rounded-3xl p-8 md:p-12 shadow-[0_20px_40px_rgba(44,137,112,0.1)] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(44,137,112,0.15)] relative overflow-hidden"
          style={{ backgroundColor: "#F7F7F2", border: "1.5px solid rgba(66, 205, 186, 0.30)" }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">

            <div>
              <h2
                className="text-3xl font-bold tracking-tighter sm:text-4xl leading-tight font-work-sans"
                style={{ color: "#2C8970" }}
              >
                Jadilah bagian dari
                <br />
                <span
                  className="font-romulo-italic tracking-wide"
                  style={{ color: "#F3B233" }}
                >
                  Muslim Tangguh Jago IT
                </span>
              </h2>
            </div>

           <div className="flex justify-center w-full">
            <Link
              href="/daftar"
              className="inline-block w-full sm:w-auto group"
            >
              <Button
                size="lg"
                className="
                  w-full sm:w-auto
                  text-lg font-semibold
                  px-10 py-7 md:py-8 rounded-full
                  transition-all duration-300
                  hover:-translate-y-1 hover:scale-[1.03]
                  shadow-[0_8px_20px_rgba(44,137,112,0.30)]
                  hover:shadow-[0_15px_30px_rgba(243,178,51,0.40),0_0_20px_rgba(142,243,231,0.4)]
                  bg-[#2C8970] hover:bg-[#F3B233]
                  text-[#F7F7F2] hover:text-[#134146]
                  flex items-center justify-center gap-2
                "
              >
                <span>Daftar Sekarang</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1.5 font-normal text-xl leading-none mt-0.5">→</span>
              </Button>
            </Link>
          </div>

          </div>
        </div>
      </div>
    </section>
  )
}
