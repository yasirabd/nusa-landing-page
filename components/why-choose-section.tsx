import { CheckCircle2, Rocket } from "lucide-react"

const COLORS = {
  primary: "#2C8970",
  secondary: "#42CDBA",
  darkBase: "#134146",
  accent: "#F3B233",
  white: "#F7F7F2",
  neonCyan: "#8EF3E7",
}

export function WhyChooseSection() {
  const academicFeatures = [
    "Kurikulum IT intensif bootcamp dan project-based learning yang disesuaikan kebutuhan industri.",
    "Pembelajaran IT dengan teknologi terbaru, AI, dan tools profesional.",
    "Monitoring adab dan ibadah harian untuk membentuk karakter disiplin.",
    "Percaya diri berkomunikasi dengan orang asing menggunakan bahasa Inggris."
  ];

  const potentialFeatures = [
    "# 100 Hari Belajar Besoknya Gajian: punya penghasilan setelah seratus hari belajar intensif.",
    "Punya mental berani jualan dimana saja; Car Free Day, Event, Online.",
    "Sekolah IT fokus praktik untuk membuat portofolio nyata.",
    "Kegiatan Non-Akademik: Leadership, Soft Skills, Public Speaking, dan lainnya."
  ];

  return (
    <section 
      className="relative overflow-hidden py-24 md:py-32 lg:py-40" 
      style={{ backgroundColor: COLORS.primary }}
    >
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
          className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full blur-[60px] md:blur-[80px]"
          style={{ background: `radial-gradient(circle, rgba(66,205,186,0.15) 0%, rgba(44,137,112,0) 70%)` }}
        />
      </div>

      <div className="container relative z-10 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="mx-auto max-w-4xl text-center mb-16 md:mb-20">
          
          {/* Monumental Header */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.2]" style={{ color: COLORS.white }}>
            Mengapa pilih <span className="tracking-normal font-normal" style={{ color: COLORS.accent, fontFamily: 'var(--font-righteous)' }}>NUSA?</span>
          </h2>

          <p className="mt-6 md:mt-8 text-base sm:text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto opacity-90" style={{ color: COLORS.white }}>
            Membentuk generasi Muslim Tangguh berakhlak baik, disiplin, mandiri, dan Jago IT untuk masa depan.
          </p>

        </div>

        <div className="grid gap-8 md:gap-10 lg:gap-12 md:grid-cols-2 max-w-5xl mx-auto">
          {/* Kolom Pertama: Keunggulan Akademik */}
          <div className="group relative rounded-3xl bg-white p-8 md:p-10 shadow-lg hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] transition-all duration-300 border border-white/10 hover:border-[#42CDBA]/40">
            <div className="absolute -inset-0.5 bg-gradient-to-b from-[#8EF3E7]/30 to-transparent rounded-3xl blur-md opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>
            
            <div className="relative">
              <h3 className="mb-6 md:mb-8 text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: COLORS.darkBase }}>
                Keunggulan Akademik
              </h3>
              
              <ul className="space-y-4 md:space-y-5">
                {academicFeatures.map((item, index) => (
                  <li key={index} className="flex items-start group/item">
                    <div className="mr-4 mt-0.5 md:mt-1 flex h-7 w-7 md:h-8 md:w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover/item:scale-110" style={{ backgroundColor: `${COLORS.secondary}25` }}>
                      <CheckCircle2 size={18} style={{ color: COLORS.primary }} />
                    </div>
                    <span className="text-base md:text-lg font-medium leading-relaxed opacity-80" style={{ color: COLORS.darkBase }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Kolom Kedua: Pengembangan Potensi */}
          <div className="group relative rounded-3xl bg-white p-8 md:p-10 shadow-lg hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] transition-all duration-300 border border-white/10 hover:border-[#42CDBA]/40">
             <div className="absolute -inset-0.5 bg-gradient-to-b from-[#8EF3E7]/30 to-transparent rounded-3xl blur-md opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>

             <div className="relative">
              <h3 className="mb-6 md:mb-8 text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: COLORS.darkBase }}>
                Pengembangan Potensi
              </h3>
              
              <ul className="space-y-4 md:space-y-5">
                {potentialFeatures.map((item, index) => (
                  <li key={index} className="flex items-start group/item">
                    <div className="mr-4 mt-0.5 md:mt-1 flex h-7 w-7 md:h-8 md:w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover/item:scale-110" style={{ backgroundColor: `${COLORS.accent}25` }}>
                      <Rocket size={18} style={{ color: COLORS.accent }} />
                    </div>
                    <span className="text-base md:text-lg font-medium leading-relaxed opacity-80" style={{ color: COLORS.darkBase }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
