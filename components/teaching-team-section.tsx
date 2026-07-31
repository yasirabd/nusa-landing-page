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

const COLORS = {
  primary: "#2C8970",
  secondary: "#42CDBA",
  darkBase: "#134146",
  accent: "#F3B233",
  white: "#F7F7F2",
  surface: "#F0FAF7",
  neonCyan: "#8EF3E7",
}

export function TeachingTeamSection() {
  return (
    <section id="pengajar" className="relative scroll-mt-20 py-24 md:py-32 lg:py-40 overflow-hidden" style={{ backgroundColor: COLORS.primary }}>
      {/* Digital Space Grid & Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `linear-gradient(${COLORS.neonCyan} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.neonCyan} 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div 
          className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[800px] md:h-[800px] rounded-full blur-[60px] md:blur-[80px]"
          style={{ background: `radial-gradient(circle, rgba(66,205,186,0.15) 0%, rgba(44,137,112,0) 70%)` }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#134146]/20 to-transparent"></div>
      </div>

      <div className="container relative z-10 px-4 md:px-8 max-w-6xl mx-auto">
        
        {/* Monumental Header */}
        <div className="mx-auto max-w-4xl text-center mb-16 md:mb-24">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6" style={{ color: COLORS.white }}>
            Tim Pengajar <span className="font-righteous font-normal tracking-wide">NUSA</span>
          </h2>
          <p className="text-base sm:text-lg font-medium leading-relaxed max-w-2xl mx-auto opacity-80" style={{ color: COLORS.white }}>
            Tenaga pengajar profesional dan berpengalaman di bidangnya
          </p>
        </div>

        {/* Dynamic Glass Bento Cards - 4 items (Auto 2x2 or 4x1) */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-10 mx-auto">
          {teachers.map((teacher, index) => (
            <div 
              key={index} 
              className="group flex flex-col items-center bg-white rounded-3xl p-8 md:p-10 text-center shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(50%-2rem)] xl:w-[calc(25%-2rem)] max-w-sm border border-transparent hover:border-[#42CDBA]/30"
            >
              {/* Glowing Avatar */}
              <div className="mb-6 md:mb-8 rounded-full overflow-hidden w-28 h-28 md:w-32 md:h-32 ring-4 ring-[#F3B233] ring-offset-4 ring-offset-white shadow-lg transition-transform duration-500 group-hover:scale-105">
                <Image
                  src={teacher.image || "/placeholder.svg"}
                  alt={teacher.name}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Scaled-down Typography for 4-cols fit */}
              <h3 className="mb-1.5 md:mb-2 text-lg md:text-xl font-bold tracking-tight leading-snug" style={{ color: COLORS.darkBase }}>
                {teacher.name}
              </h3>
              
              <p className="text-sm font-medium opacity-75 leading-relaxed" style={{ color: COLORS.darkBase }}>
                {teacher.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
