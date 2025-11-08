import Image from "next/image"

const partners = [
  { name: "KodingWorks", logo: "/images/partner-kodingworks.png?height=80&width=180&text=KodingWorks"},
  { name: "Pesanio", logo: "/images/partner-pesanio.png?height=80&width=180&text=Pesanio"},
  { name: "Programmer Kecil", logo: "/images/partner-programmerkecil.png?height=80&width=180&text=Programmer Kecil"},
  { name: "Sumopod", logo: "/images/partner-sumopod.png?height=80&width=180&text=SumoPod"},
  { name: "Sanditheta", logo: "/images/partner-sanditheta.png?height=80&width=180&text=Sanditheta"},
]

export function PartnerSection() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <div className="mx-auto max-w-3xl text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tighter text-slate-800 sm:text-4xl">Partner Kami</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 items-center gap-8 md:gap-12">
          {partners.map((partner) => (
            <div key={partner.name} className="flex items-center justify-center">
              <Image
                src={partner.logo || "/placeholder.svg"}
                alt={`${partner.name} Logo`}
                width={180}
                height={80}
                className="h-14 w-auto object-contain opacity-80 hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
