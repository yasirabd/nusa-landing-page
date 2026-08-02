import { CheckCircle2 } from "lucide-react"

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
    <section id="kurikulum" className="section-spacing-feature scroll-mt-20 bg-brand-surface">
      <div className="container relative z-10 px-4 md:px-8 max-w-6xl mx-auto">
        
        {/* Monumental Header (Penyelarasan Momentum Rushd) */}
        <div className="mx-auto max-w-5xl text-center mb-16 md:mb-20">
          <h2 className="text-4xl font-bold leading-[1.15] tracking-tight text-brand-dark sm:text-5xl md:text-6xl">
            Kurikulum
          </h2>
          
          <p className="mx-auto mt-6 max-w-3xl text-base font-medium leading-relaxed text-brand-dark opacity-80 sm:text-lg md:mt-8 md:text-xl">
            4 Pilar yang membentuk{" "}
            <span className="whitespace-nowrap font-serif font-normal italic tracking-wide text-brand-accent">"Muslim Tangguh, Jago IT"</span>
            {" "}di NUSA Boarding School.
          </p>
        </div>

        {/* Bento-style Cards Grid */}
        <div className="grid gap-8 md:gap-10 lg:gap-12 md:grid-cols-2 max-w-5xl mx-auto">
          {curriculumPillars.map((pillar, idx) => {
            return (
              <div 
                key={idx} 
                className="relative flex flex-col rounded-3xl border border-transparent bg-white shadow-sm transition-[border-color,box-shadow] duration-[180ms] hover:border-brand-highlight/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
              >
                <div className="relative flex-1 flex flex-col">
                  {/* Image Container with padding (Framed Brochure Style) */}
                  <div className="p-5">
                    <div className="relative mx-auto aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 shadow-inner">
                      <img 
                        src={pillar.image} 
                        alt={pillar.title}
                        className="h-full w-full object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                  
                  {/* Content Container */}
                  <div className="px-8 pb-8 md:px-10 md:pb-10 flex-1 flex flex-col">
                    <p className="mb-2 text-sm font-bold uppercase tracking-wider text-brand">
                      {pillar.subtitle}
                    </p>
                    
                    <h3 className="mb-4 text-2xl font-bold tracking-tight text-brand-dark md:text-3xl">
                      {pillar.title}
                    </h3>
                    
                    <p className="mb-6 text-base font-medium leading-relaxed text-brand-dark opacity-80 md:text-lg">
                      {pillar.description}
                    </p>
                    
                    <ul className="space-y-4 mb-2 flex-1 mt-2">
                      {pillar.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start">
                          <div className="mr-4 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-highlight/15 md:mt-1">
                            <CheckCircle2 size={16} strokeWidth={2.5} className="text-brand" />
                          </div>
                          <span className="text-base font-medium leading-relaxed text-brand-dark opacity-80">{item}</span>
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
