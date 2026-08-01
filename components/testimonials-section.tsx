type Testimonial = {
  name: string
  role: string
  quote: string
  initials: string
}

const TESTIMONIALS: readonly Testimonial[] = [
  {
    name: "Dr. Ir. Edy Susilo, MT",
    role: "Ketua Yayasan Islam Nurus Sunnah",
    quote:
      "NUSA membekali anak-anak untuk punya lifeskill dalam bidang IT dan memiliki karakter yang baik.",
    initials: "ES",
  },
  {
    name: "Dr.Eng. Adi Wibowo, S.Si., M.Kom",
    role: "Wali Murid SD Islam Nurus Sunnah",
    quote:
      "Keren banget! NUSA tidak hanya fokus ke ilmu agama dan akhlak mulia sesuai tuntunan Ahlus Sunnah wal Jama’ah, tetapi juga menyiapkan generasi Qur’ani yang menguasai teknologi. Semoga makin sukses dan terus istiqamah!",
    initials: "AW",
  },
  {
    name: "Izzul Fairuz Mahendra",
    role: "Santri Angkatan 1",
    quote: "Satu-satunya sekolah IT yang ada di Semarang.",
    initials: "IF",
  },
  {
    name: "Muhammad Fachri",
    role: "Santri Angkatan 1",
    quote:
      "NUSA mengajarkan bisnis hingga dapat uang menggunakan teknologi terbaru.",
    initials: "MF",
  },
]

type TestimonialCardProps = {
  testimonial: Testimonial
  featured?: boolean
  className?: string
}

function TestimonialCard({
  testimonial,
  featured = false,
  className = "",
}: TestimonialCardProps) {
  return (
    <article
      aria-label={testimonial.name}
      className={`flex h-full flex-col rounded-3xl border border-[#134146]/10 bg-[#F7F7F2] p-6 sm:p-7 ${
        featured ? "lg:p-10" : "lg:p-8"
      } ${className}`}
      data-featured={featured ? "true" : undefined}
    >
      <span
        aria-hidden="true"
        className={`font-serif leading-none text-[#F3B233] ${
          featured ? "text-6xl md:text-7xl" : "text-5xl"
        }`}
      >
        &ldquo;
      </span>

      <blockquote className="mt-1 flex-1">
        <p
          className={`font-medium text-[#134146] ${
            featured
              ? "max-w-4xl text-xl leading-relaxed md:text-2xl"
              : "text-base leading-7"
          }`}
        >
          {testimonial.quote}
        </p>
      </blockquote>

      <footer className="mt-8 flex items-center gap-4 border-t border-[#134146]/12 pt-5">
        <span
          aria-hidden="true"
          className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#F3B233] text-sm font-bold tracking-wide text-[#134146]"
        >
          {testimonial.initials}
        </span>
        <div className="min-w-0">
          <p className="font-bold leading-snug text-[#134146]">
            {testimonial.name}
          </p>
          <p className="mt-1 text-sm font-medium leading-snug text-[#134146]/70">
            {testimonial.role}
          </p>
        </div>
      </footer>
    </article>
  )
}

export function TestimonialsSection() {
  const [featured, ...supporting] = TESTIMONIALS

  return (
    <section className="bg-[#134146] py-16 md:py-20 lg:py-24">
      <div className="container mx-auto max-w-6xl px-4 md:px-8">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-[#F7F7F2] md:text-4xl lg:text-5xl">
            Cerita dari Keluarga NUSA
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#F7F7F2]/80 md:text-lg">
            Pandangan dari yayasan, wali murid, dan santri yang membersamai
            perjalanan NUSA.
          </p>
        </div>

        <div className="mt-10">
          <TestimonialCard featured testimonial={featured} />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-6">
          {supporting.map((testimonial, index) => (
            <TestimonialCard
              className={
                index === supporting.length - 1
                  ? "md:col-span-2 lg:col-span-1"
                  : undefined
              }
              key={testimonial.name}
              testimonial={testimonial}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
