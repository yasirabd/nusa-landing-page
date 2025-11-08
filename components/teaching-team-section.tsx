import Image from "next/image"

const teachers = [
  {
    name: "Yasir Abdur Rohman, S.Kom",
    role: "Principal of NUSA Boarding School",
    image: "/images/teacher-yasir.JPG?height=300&width=300",
  },
  {
    name: "Ariaseta Setia Alam",
    role: "CEO KodingWorks, Sumopod & CTO Pesan.io",
    image: "/images/teacher-ariaseta.jpg?height=300&width=300",
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
    image: "/placeholder.svg?height=300&width=300",
  },
]

export function TeachingTeamSection() {
  return (
    <section className="bg-slate-50 py-12 md:py-16 lg:py-20" style={{ backgroundColor: "#2C8970"}}>
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter text-slate-800 sm:text-4xl text-white">Tim Pengajar NUSA</h2>
          <p className="mt-4 text-slate-800/80 text-white">Tenaga pengajar profesional dan berpengalaman di bidangnya</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5 max-w-6xl mx-auto">
          {teachers.map((teacher, index) => (
            <div key={index} className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-sm">
              <div
  className="mb-4 rounded-full overflow-hidden"
  style={{
    border: "4px solid #E3B251", // Accent ring
    width: "120px",
    height: "120px",
    boxShadow: "0 4px 14px rgba(227,178,81,0.15)",
  }}
>
                <Image
                  src={teacher.image || "/placeholder.svg"}
                  alt={teacher.name}
                  width={120}
                  height={120}
                  className="h-32 w-32 object-cover"
                />
              </div>
              <h3 className="mb-1 text-lg font-bold text-slate-800">{teacher.name}</h3>
              <p className="text-sm text-slate-800/70">{teacher.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
