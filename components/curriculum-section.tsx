import { CheckCircle2 } from "lucide-react"

const COLORS = {
  primary: "#2C8970",
  secondary: "#42CDBA",
  darkBase: "#134146",
  accent: "#F3B233",
  white: "#F7F7F2",
  surface: "#F0FAF7",
}

const curriculumPillars = [
  {
    title: "Kurikulum IT",
    subtitle: "Programmer & Designer",
    image: "/images/kurikulum-it.png",
    description: "Kurikulum berbasis project-based learning dengan fokus menjadi Programmer / Designer, disesuaikan dengan kebutuhan industri teknologi terkini, termasuk AI.",
    items: [
      "Tiap Semester Menulis 1 Buku Teknologi",
      "Tiap Bulan Rilis 1 Hasil Karya",
      "Tiap Pekan Upload 1 Video Tutorial",
      "Tiap Hari Push Code ke Github",
    ],
  },
  {
    title: "Kurikulum Agama",
    subtitle: "Tauhid, Adab, Fiqih, & Sirah",
    image: "/images/kurikulum-agama.png",
    description: "Kurikulum yang meneguhkan pondasi keislaman, membentuk karakter, serta membiasakan ibadah yang benar sesuai Al Qur'an dan hadits dalam kehidupan sehari-hari.",
    items: [
      "Tahfidz: Hafal 3 Juz",
      "Tauhid dan Adab",
      "Fiqih: kontemporer, mu'amalah, teknologi",
      "Sirah Nabawiyah & Sejarah Peradaban Islam",
      "Dakwah Digital: Konten Dakwah Islam di Media Sosial",
      "Monitoring Adab & Ibadah Harian",
    ],
  },
  {
    title: "Kurikulum English",
    subtitle: "Active English",
    image: "/images/kurikulum-english.jpg",
    description: "Kurikulum yang melatih untuk berani berbicara dalam bahasa Inggris kepada orang seluruh dunia.",
    items: [
      "English Session: komunikasi dalam bahasa Inggris setiap hari",
      "Teacher of The Day: Presentasi Pagi dalam Bahasa Inggris",
      "Public Speaking: Orasi nasehat dalam bahasa Inggris",
      "Talking to Stranger: Berbicara dengan orang luar negeri",
      "30 Days Speaking Challenge",
      "English Talk: Podcast, Tech Talk"
    ],
  },
  {
    title: "Kurikulum Tangguh",
    subtitle: "Leadership & Resilience",
    image: "/images/kurikulum-tangguh.jpg",
    description: "Kurikulum untuk membentuk karakter tangguh, mandiri, dan berani.",
    items: [
      "100 Hari Belajar, Besoknya Gajian: Berpeluang memperoleh penghasilan dari karya atau project berbayar",
      "Potong Urat Malu: Berani jualan di CFD",
      "NUSA Mengajar: Mengajar IT di sekolah lain atau di masyarakat",
      "Weekly Cooking: Laki-laki Bisa Masak",
      "Leadership Camp",
      "Bersukaria City Tour: Keliling kota sambil belajar sejarah",
      "Mission Impossible: Jual Air Mineral Botol Harga 10rb",
      "Business Survival: Bertahan 7 Hari, Modal 50rb, Pulang Bawa Jutaan",
      "Backpacker Ngecer: keliling Indonesia, keliling 3 negara",
      "Bersih Bareng NUSA: keliling bersih-bersih masjid",
      "dan masih banyak lagi...",
    ],
  },
]

export function CurriculumSection() {
  return (
    <section id="kurikulum" className="scroll-mt-20 py-24 md:py-32 lg:py-40" style={{ backgroundColor: COLORS.surface }}>
      <div className="container relative z-10 px-4 md:px-8 max-w-6xl mx-auto">
        
        {/* Monumental Header (Penyelarasan Momentum Rushd) */}
        <div className="mx-auto max-w-5xl text-center mb-16 md:mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.15]" style={{ color: COLORS.darkBase }}>
            Kurikulum
          </h2>
          
          <p className="mt-6 md:mt-8 text-base sm:text-lg md:text-xl font-medium leading-relaxed max-w-3xl mx-auto opacity-80" style={{ color: COLORS.darkBase }}>
            4 Pilar yang membentuk{" "}
            <span className="font-serif italic font-medium tracking-wide whitespace-nowrap" style={{ color: COLORS.accent }}>"Muslim Tangguh, Jago IT"</span>
            {" "}di NUSA Boarding School.
          </p>
        </div>

        {/* Bento-style Cards Grid */}
        <div className="grid gap-8 md:gap-10 lg:gap-12 md:grid-cols-2 max-w-5xl mx-auto">
          {curriculumPillars.map((pillar, idx) => {
            return (
              <div 
                key={idx} 
                className="group relative rounded-3xl bg-white shadow-sm hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300 border border-transparent hover:border-[#42CDBA]/30 flex flex-col" 
              >
                {/* Glow Backdrop */}
                <div className="absolute -inset-0.5 bg-gradient-to-b from-[#8EF3E7]/20 to-transparent rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>
                
                <div className="relative flex-1 flex flex-col">
                  {/* Image Container with padding (Framed Brochure Style) */}
                  <div className="p-5">
                    <div className="rounded-2xl overflow-hidden mx-auto shadow-inner aspect-[4/3] relative group-hover:shadow-[inset_0_2px_15px_rgba(0,0,0,0.1)] transition-all duration-500 bg-gray-100">
                      <img 
                        src={pillar.image} 
                        alt={pillar.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                  
                  {/* Content Container */}
                  <div className="px-8 pb-8 md:px-10 md:pb-10 flex-1 flex flex-col">
                    <p className="font-bold text-sm tracking-wider uppercase mb-2" style={{ color: COLORS.primary }}>
                      {pillar.subtitle}
                    </p>
                    
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4" style={{ color: COLORS.darkBase }}>
                      {pillar.title}
                    </h3>
                    
                    <p className="text-base md:text-lg font-medium leading-relaxed opacity-80 mb-6" style={{ color: COLORS.darkBase }}>
                      {pillar.description}
                    </p>
                    
                    <ul className="space-y-4 mb-2 flex-1 mt-2">
                      {pillar.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start group/item">
                          <div className="mr-4 mt-0.5 md:mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover/item:scale-110" style={{ backgroundColor: `${COLORS.secondary}25` }}>
                            <CheckCircle2 size={16} strokeWidth={2.5} style={{ color: COLORS.primary }} />
                          </div>
                          <span className="text-base font-medium leading-relaxed opacity-80" style={{ color: COLORS.darkBase }}>{item}</span>
                        </li>
                      ))}
                    </ul>

                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
