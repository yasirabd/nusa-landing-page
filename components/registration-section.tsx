import Link from "next/link"
import { Button } from "@/components/ui/button"

export function RegistrationSection() {
  return (
    <section
      id="daftar"
      className="section-spacing-compact bg-brand-surface"
    >
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <div
          className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl p-8 shadow-[0_20px_40px_rgba(44,137,112,0.1)] transition-shadow duration-200 hover:shadow-[0_20px_50px_rgba(44,137,112,0.15)] md:p-12"
          style={{ backgroundColor: "var(--color-brand-paper)", border: "1.5px solid rgba(66, 205, 186, 0.30)" }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">

            <div>
              <h2
                className="text-3xl font-bold tracking-tighter sm:text-4xl leading-tight"
                style={{ color: "var(--color-brand)" }}
              >
                Jadilah bagian dari
                <br />
                <span
                  className="font-serif italic font-normal tracking-wide"
                  style={{ color: "var(--color-brand-accent)" }}
                >
                  Muslim Tangguh Jago IT
                </span>
              </h2>
            </div>

           <div className="flex justify-center w-full">
              <Button
                asChild
                size="lg"
                className="h-auto w-full rounded-full bg-brand-depth px-10 py-7 text-lg font-semibold text-brand-paper shadow-[0_8px_20px_rgba(44,137,112,0.30)] transition-[background-color,color,box-shadow,transform] duration-150 hover:bg-brand-accent hover:text-brand-dark hover:shadow-[0_12px_24px_rgba(243,178,51,0.28)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:active:scale-100 sm:w-auto md:py-8"
              >
                <Link href="/daftar" className="group">
                  <span>Daftar Sekarang</span>
                  <span
                    aria-hidden="true"
                    className="mt-0.5 text-xl font-normal leading-none transition-transform duration-150 group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
                  >
                    →
                  </span>
                </Link>
              </Button>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
