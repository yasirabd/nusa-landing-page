import Image from "next/image"

const teachers = [
  {
    name: "Yasir Abdur Rohman, S.Kom",
    role: "Principal of NUSA Boarding School",
    image: "/images/teacher-yasir.JPG?height=300&width=300",
  },
  {
    name: "Ustadz Abdullah Yusuf Hardono",
    role: "Pengajar Tahfidz Bersanad",
    image: "/images/teacher-abdullah.png?height=300&width=300",
  },
  {
    name: "Ustadz Zuhud Ihsanul Amal",
    role: "Musyrif / Guru Asrama",
    image: "/images/teacher-zuhud.jpeg?height=300&width=300",
  },
  {
    name: "Ustadz Fadhli Robbani",
    role: "Pengajar Diniyyah",
    image: "/images/teacher-fadhli.png?height=300&width=300",
  },
]

export function TeachingTeamSection() {
  return (
    <section id="pengajar" className="section-spacing-feature relative overflow-hidden scroll-mt-20 bg-brand">
      {/* Digital Space Grid & Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "linear-gradient(var(--color-brand-highlight) 1px, transparent 1px), linear-gradient(90deg, var(--color-brand-highlight) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div 
          className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[800px] md:h-[800px] rounded-full blur-[60px] md:blur-[80px]"
          style={{ background: `radial-gradient(circle, rgba(66,205,186,0.15) 0%, rgba(44,137,112,0) 70%)` }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-brand-dark/20 to-transparent"></div>
      </div>

      <div className="container relative z-10 px-4 md:px-8 max-w-6xl mx-auto">
        
        {/* Monumental Header */}
        <div className="mx-auto max-w-4xl text-center mb-10 md:mb-14">
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-brand-paper sm:text-5xl lg:text-6xl">
            Tim Pengajar <span className="font-righteous font-normal tracking-wide">NUSA</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base font-medium leading-relaxed text-brand-paper opacity-80 sm:text-lg">
            Tenaga pengajar profesional dan berpengalaman di bidangnya
          </p>
        </div>

        {/* Dynamic Glass Bento Cards - 4 items (Auto 2x2 or 4x1) */}
        <div className="flex flex-wrap justify-center gap-5 md:gap-6 lg:gap-8 mx-auto">
          {teachers.map((teacher, index) => (
            <div 
              key={index} 
              className="flex w-full max-w-sm flex-col items-center rounded-3xl border border-transparent bg-white p-6 text-center shadow-sm transition-[border-color,box-shadow] duration-[180ms] hover:border-brand-highlight/30 hover:shadow-2xl sm:w-[calc(50%-1.5rem)] md:p-8 lg:w-[calc(50%-2rem)] xl:w-[calc(25%-2rem)]"
            >
              {/* Glowing Avatar */}
              <div className="mb-5 h-28 w-28 overflow-hidden rounded-full shadow-lg ring-4 ring-brand-accent ring-offset-4 ring-offset-white md:mb-6 md:h-32 md:w-32">
                <Image
                  src={teacher.image || "/placeholder.svg"}
                  alt={teacher.name}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Scaled-down Typography for 4-cols fit */}
              <h3 className="mb-1.5 text-lg font-bold leading-snug tracking-tight text-brand-dark md:mb-2 md:text-xl">
                {teacher.name}
              </h3>
              
              <p className="text-sm font-medium leading-relaxed text-brand-dark opacity-75">
                {teacher.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
