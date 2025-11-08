import { de } from "date-fns/locale"

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
      "100 Hari Belajar, Besoknya Gajian: Punya penghasilan sendiri",
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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mx-auto max-w-4xl text-center mb-4">
          <h2 className="text-4xl font-bold text-gray-900" style={{ color: "#2C8970" }}>Kurikulum</h2>
          <p className="mt-4 text-gray-600 text-lg">
            4 Pilar yang membentuk "Muslim Tangguh Jago IT" di NUSA Boarding School
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          {curriculumPillars.map((pillar, idx) => {
            return (
              <div key={idx} className="rounded-2xl overflow-hidden" style={{ backgroundColor: "rgba(182, 203, 108, 0.15)" }}>
                {/* Image Container with padding */}
                <div className="p-5">
                  <div className="bg-gray-300 rounded-2xl overflow-hidden mx-auto">
                    <img 
                      src={pillar.image} 
                      alt={pillar.title}
                      className="w-full h-full object-cover"
                      sizes="calc(calc(min(100vw - 40px, 1280px) * 0.47) - 64px)"
                    />
                  </div>
                </div>
                
                {/* Content Container */}
                <div className="px-6 pb-6">
                  <p className="font-semibold text-sm mb-2" style={{ color: "#2C8970" }}>{pillar.subtitle}</p>
                  <h3 className="text-2xl font-bold mb-4" style={{ color: "#134146" }}>{pillar.title}</h3>
                  <p className="text-gray-700 text-primary mb-4">
                    {pillar.description}
                  </p>
                  <ul className="space-y-2 mb-2 text-gray-700 text-primary">
                    {pillar.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✔</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  {pillar.title === "Kurikulum IT" && (
                    <button
                      className="text-white font-semibold px-6 py-2 rounded-full mt-4 transition-colors bg-[#2C8970] hover:bg-[#e3b251]"
                    >
                      Lihat Karya →
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}