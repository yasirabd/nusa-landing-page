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
      className={`flex flex-col rounded-3xl border border-brand-dark/10 bg-brand-paper p-6 sm:p-7 lg:p-8 ${className}`}
      data-featured={featured ? "true" : undefined}
    >
      <span
        aria-hidden="true"
        className={`font-serif italic leading-none text-brand-accent ${
          featured ? "text-6xl md:text-7xl" : "text-5xl"
        }`}
      >
        &ldquo;
      </span>

      <blockquote className="mt-1">
        <p
          className={`font-medium text-brand-dark ${
            featured
              ? "max-w-4xl text-xl leading-relaxed md:text-2xl"
              : "text-base leading-7"
          }`}
        >
          {testimonial.quote}
        </p>
      </blockquote>

      <footer className="mt-5 flex items-center gap-4 border-t border-brand-dark/12 pt-4">
        <span
          aria-hidden="true"
          className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand-accent text-sm font-bold tracking-wide text-brand-dark"
        >
          {testimonial.initials}
        </span>
        <div className="min-w-0">
          <p className="font-bold leading-snug text-brand-dark">
            {testimonial.name}
          </p>
          <p className="mt-1 text-sm font-medium leading-snug text-brand-dark/70">
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
    <section className="section-spacing-standard bg-brand-dark">
      <div className="container mx-auto max-w-6xl px-4 md:px-8">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-brand-paper sm:text-4xl">
            Cerita dari Keluarga NUSA
          </h2>
          <p className="mt-4 text-base leading-relaxed text-brand-paper/80 md:text-lg">
            Pandangan dari yayasan, wali murid, dan santri yang membersamai
            perjalanan NUSA.
          </p>
        </div>

        <div className="mt-7">
          <TestimonialCard featured testimonial={featured} />
        </div>

        <div className="mt-4 grid grid-cols-1 items-start gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-6">
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
