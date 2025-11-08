export function WhyChooseSection() {
  return (
    <section className="bg-slate-50 py-12 md:py-16 lg:py-20" style={{ backgroundColor: "#2C8970"}}>
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter text-slate-800 sm:text-4xl text-white">Mengapa pilih NUSA?</h2>
          <p className="mt-4 text-slate-800/80" style={{ color: "#F0F0F0" }}>
            Membentuk generasi Muslim Tangguh berakhlak baik, disiplin, mandiri, dan Jago IT untuk masa depan.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          {/* Kolom Pertama */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-xl font-bold" style={{ color: "#2C8970" }}>Keunggulan Akademik</h3>
            <ul className="space-y-4">
              {[
                "Kurikulum IT intensif bootcamp dan project-based learning yang disesuaikan kebutuhan industri.",
                "Pembelajaran IT dengan teknologi terbaru, AI, dan tools profesional.",
                "Monitoring adab dan ibadah harian untuk membentuk karakter disiplin.",
                "Percaya diri berkomunikasi dengan orang asing menggunakan bahasa Inggris.",
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="mr-3 mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span className="text-slate-800">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom Kedua */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-xl font-bold text-primary" style={{ color: "#2C8970" }}>Pengembangan Potensi</h3>
            <ul className="space-y-4">
              {[
                "# 100 Hari Belajar Besoknya Gajian: punya penghasilan setelah seratus hari belajar intensif.",
                "Punya mental berani jualan dimana saja; Car Free Day, Event, Online.",
                "Sekolah IT fokus praktik untuk membuat portofolio nyata.",
                "Kegiatan Non-Akademik: Leadership, Soft Skills, Public Speaking, dan lainnya.",
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="mr-3 mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span className="text-slate-800">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
