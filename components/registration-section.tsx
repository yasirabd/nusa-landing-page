import Link from "next/link"
import { Button } from "@/components/ui/button"

export function RegistrationSection() {
  return (
    <section
      id="daftar"
      className="py-12 md:py-16 lg:py-20"
      style={{ backgroundColor: "#F7FCF9" }}
    >
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <div
          className="mx-auto max-w-4xl rounded-xl p-8 shadow-md"
          style={{ backgroundColor: "#FFFFFF", border: "1px solid #B6CB6C33" }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">

            <div>
              <h2
                className="text-3xl font-bold tracking-tighter sm:text-4xl leading-tight"
                style={{ color: "#2C8970" }}
              >
                Jadilah bagian dari
                <br />
                <span
                  className="font-romulo-italic tracking-wide"
                  style={{ color: "#e3b251" }}
                >
                  Muslim Tangguh Jago IT
                </span>
              </h2>
            </div>

           <div className="flex justify-center">
  <Link
    href="https://forms.gle/92AqMyaUs81tyhLRA"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block"
  >
    <Button
      size="lg"
      className="
        text-lg font-semibold
        px-9 py-7 rounded-full
        transition-all duration-300
        hover:scale-[1.04]
        shadow-[0_6px_16px_rgba(44,137,112,0.35)]
        hover:shadow-[0_10px_24px_rgba(227,178,81,0.45)]
        bg-[#2C8970] hover:bg-[#e3b251]
        text-white hover:text-[#134146]
      "
    >
      Daftar Sekarang →
    </Button>
  </Link>
</div>


          </div>
        </div>
      </div>
    </section>
  )
}
