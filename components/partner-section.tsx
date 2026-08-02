import Image from "next/image"

const partners = [
  { name: "KodingWorks", logo: "/images/partner-kodingworks.png?height=80&width=180&text=KodingWorks" },
  { name: "Pesanio", logo: "/images/partner-pesanio.png?height=80&width=180&text=Pesanio" },
  { name: "Programmer Kecil", logo: "/images/partner-programmerkecil.png?height=80&width=180&text=Programmer Kecil" },
  { name: "SumoPod", logo: "/images/partner-sumopod.png?height=80&width=180&text=SumoPod" },
  { name: "Sanditheta", logo: "/images/partner-sanditheta.png?height=80&width=180&text=Sanditheta" },
]

export function PartnerSection() {
  return (
    <section className="section-spacing-standard relative bg-brand-paper px-4">
      {/* Background Tech Mesh Tipis Penambah Nuansa Hover */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]" 
        style={{ backgroundImage: "radial-gradient(var(--color-brand) 1px, transparent 1px)", backgroundSize: '32px 32px' }}
      ></div>

      <div className="container relative z-10 max-w-6xl mx-auto">
        <div className="mx-auto max-w-3xl text-center mb-8 md:mb-12">
          <h2 className="mb-3 text-4xl font-bold tracking-tight text-brand-dark md:text-5xl">
            Partner Industri & Teknologi
          </h2>
          <p className="mx-auto max-w-2xl text-balance text-base font-medium leading-relaxed text-brand-dark opacity-80 sm:text-lg">
            Berjejaring dengan praktisi industri dan ekosistem startup untuk pertukaran wawasan teknologi terkini.
          </p>
        </div>

        {/* Glass Tech Dock Kapsul Penampung Susunan Logo Partner */}
        <div className="mx-auto w-full max-w-5xl rounded-[2rem] md:rounded-[3rem] p-8 md:p-10 lg:p-12 bg-white/80 backdrop-blur-xl border border-gray-100 shadow-[0_8px_30px_rgba(66,205,186,0.1)] hover:shadow-[0_15px_40px_rgba(66,205,186,0.15)] transition-shadow duration-200">
          <div className="grid grid-cols-2 md:grid-cols-5 items-center justify-items-center gap-8 md:gap-10">
            {partners.map((partner) => (
              <div key={partner.name} className="flex items-center justify-center w-full">
                <Image
                  src={partner.logo || "/placeholder.svg"}
                  alt={`${partner.name} Logo`}
                  width={180}
                  height={80}
                  className="h-10 w-auto object-contain grayscale opacity-50 transition-[filter,opacity] duration-200 hover:grayscale-0 hover:opacity-100 md:h-12"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
