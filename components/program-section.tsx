import Link from "next/link"
import { Laptop, Layers, GraduationCapIcon, Building, CheckCircle2, Code, Palette, MoveRight } from "lucide-react"

const COLORS = {
  primary: "#2C8970",
  secondary: "#42CDBA",
  darkBase: "#134146",
  accent: "#F3B233",
  white: "#F7F7F2",
  surface: "#F0FAF7",
}

export function ProgramSection() {
  return (
    <section id="program" className="scroll-mt-20 py-24 md:py-32 lg:py-40" style={{ backgroundColor: COLORS.surface }}>
      <div className="container px-4 md:px-8 max-w-7xl mx-auto">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6" style={{ color: COLORS.darkBase }}>
            Jurusan Programmer & Designer
          </h2>
          <p className="text-base sm:text-lg font-medium leading-relaxed max-w-2xl mx-auto opacity-80" style={{ color: COLORS.darkBase }}>
            Tahapan pembelajaran terstruktur untuk mempersiapkan santri menjadi profesional pada bidang teknologi
          </p>
        </div>

        {/* Metode Pembelajaran */}
        <div className="mt-16 md:mt-24 mx-auto max-w-5xl">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-transparent hover:border-[#42CDBA]/30 hover:shadow-xl transition-all duration-300">
            <h3 className="text-2xl md:text-3xl font-extrabold mb-8 text-center" style={{ color: COLORS.primary }}>
              Metode Pembelajaran Mutakhir
            </h3>
            <div className="grid gap-6 md:gap-10 md:grid-cols-2">
              <div className="space-y-4 md:space-y-6">
                {[
                  "Kurikulum terstruktur dari teknologi terkini",
                  "Pengajar praktisi dari perusahaan teknologi",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start group">
                    <div className="mr-5 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: `${COLORS.secondary}25` }}>
                      <CheckCircle2 size={18} strokeWidth={2.5} style={{ color: COLORS.primary }} />
                    </div>
                    <span className="text-base md:text-lg font-medium opacity-80 leading-relaxed" style={{ color: COLORS.darkBase }}>{item}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 md:space-y-6">
                {[
                  "Pembelajaran dipercepat dengan bantuan AI",
                  "Project-based learning dengan kasus nyata"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start group">
                    <div className="mr-5 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: `${COLORS.accent}25` }}>
                      <CheckCircle2 size={18} strokeWidth={2.5} style={{ color: COLORS.accent }} />
                    </div>
                    <span className="text-base md:text-lg font-medium opacity-80 leading-relaxed" style={{ color: COLORS.darkBase }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tahapan Belajar */}
        <div className="mt-20 md:mt-32 max-w-5xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-extrabold mb-12 md:mb-20 text-center" style={{ color: COLORS.darkBase }}>
            Peta Perjalanan (Roadmap) Jurusan
          </h3>

          <div className="relative">
            {/* center timeline line glow */}
            <div
              className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 transform md:-translate-x-1/2 bg-gradient-to-b from-[#2C8970] via-[#42CDBA] to-transparent rounded-full opacity-30"
            />

            {[
              {
                num: 1,
                title: "Tahap Persiapan (1 Bulan)",
                desc: "Persiapan kemampuan dasar komputer",
                icon: Laptop,
                side: "left",
              },
              {
                num: 2,
                title: "Tahap Dasar (3-5 Bulan)",
                desc: "Belajar dasar programming dan design",
                icon: Layers,
                side: "right",
                extended: true,
              },
              {
                num: 3,
                title: "Tahap Belajar & Praktik (18 Bulan)",
                desc: "Belajar dan praktik proyek nyata sesuai dengan fokus bidang yang dipilih",
                icon: GraduationCapIcon,
                side: "left",
              },
              {
                num: 4,
                title: "Tahap Magang Kerja (12 Bulan)",
                desc: "Pengalaman kerja nyata di perusahaan",
                icon: Building,
                side: "right",
              },
            ].map((stage) => {
              const Icon = stage.icon
              return (
                <div key={stage.num} className="relative mb-12 md:mb-24 last:mb-0">
                  <div className="flex flex-col md:flex-row items-start md:items-center group/timeline">
                    {/* Glowing Node */}
                    <div className="flex items-center justify-center z-10 mb-6 md:mb-0 absolute left-0 md:left-1/2 md:transform md:-translate-x-1/2">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg text-white shadow-[0_0_15px_rgba(44,137,112,0.4)] ring-4 ring-[#F0FAF7] transition-transform duration-500 group-hover/timeline:scale-110" style={{ backgroundColor: COLORS.primary }}>
                        {stage.num}
                      </div>
                    </div>

                    {stage.side === "left" ? (
                      <>
                        <div className="w-full md:w-1/2 md:pr-16 md:text-right">
                          <div className="bg-white rounded-3xl p-8 shadow-sm transition-all duration-300 border border-transparent hover:border-[#42CDBA]/30 hover:shadow-xl hover:-translate-y-2 group-hover/timeline:shadow-lg ml-16 md:ml-0">
                            <div className="flex items-center justify-start md:justify-end mb-5">
                              <div className="p-3.5 rounded-2xl md:order-last md:ml-5 mr-4 md:mr-0 transition-transform duration-500 group-hover/timeline:rotate-6" style={{ backgroundColor: `${COLORS.secondary}15` }}>
                                <Icon className="h-7 w-7" style={{ color: COLORS.primary }} />
                              </div>
                            </div>
                            <h3 className="text-xl md:text-2xl font-extrabold mb-3 tracking-snug" style={{ color: COLORS.darkBase }}>{stage.title}</h3>
                            <p className="text-base font-medium opacity-80 leading-relaxed max-w-sm md:ml-auto" style={{ color: COLORS.darkBase }}>{stage.desc}</p>
                          </div>
                        </div>
                        <div className="hidden md:block md:w-1/2"></div>
                      </>
                    ) : (
                      <>
                        <div className="hidden md:block md:w-1/2"></div>
                        <div className="w-full md:w-1/2 md:pl-16">
                          <div className="bg-white rounded-3xl p-8 shadow-sm transition-all duration-300 border border-transparent hover:border-[#42CDBA]/30 hover:shadow-xl hover:-translate-y-2 group-hover/timeline:shadow-lg ml-16 md:ml-0">
                            <div className="flex items-center justify-start mb-5">
                              <div className="p-3.5 rounded-2xl mr-5 transition-transform duration-500 group-hover/timeline:rotate-6" style={{ backgroundColor: `${COLORS.secondary}15` }}>
                                <Icon className="h-7 w-7" style={{ color: COLORS.primary }} />
                              </div>
                            </div>
                            <h3 className="text-xl md:text-2xl font-extrabold mb-3 tracking-snug" style={{ color: COLORS.darkBase }}>{stage.title}</h3>
                            <p className="text-base font-medium opacity-80 leading-relaxed" style={{ color: COLORS.darkBase }}>{stage.desc}</p>

                            {stage.extended && (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 border-t border-gray-100 pt-6">
                                {/* Programmer Inner Bento */}
                                <div className="p-5 rounded-2xl transition-colors hover:bg-[#F0FAF7]" style={{ backgroundColor: "rgba(44,137,112,0.03)" }}>
                                  <div className="flex items-center gap-2 mb-4">
                                    <Code size={18} style={{ color: COLORS.primary }} className="shrink-0" />
                                    <h4 className="font-extrabold" style={{ color: COLORS.darkBase }}>Programmer</h4>
                                  </div>
                                  <ul className="space-y-3">
                                    <li className="flex items-center gap-3">
                                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS.secondary }}></div>
                                      <span className="text-sm font-medium opacity-80 leading-relaxed" style={{ color: COLORS.darkBase }}>Frontend</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS.secondary }}></div>
                                      <span className="text-sm font-medium opacity-80 leading-relaxed" style={{ color: COLORS.darkBase }}>Backend</span>
                                    </li>
                                  </ul>
                                </div>
                                
                                {/* Designer Inner Bento */}
                                <div className="p-5 rounded-2xl transition-colors hover:bg-yellow-50/50" style={{ backgroundColor: "rgba(243,178,51,0.05)" }}>
                                  <div className="flex items-center gap-2 mb-4">
                                    <Palette size={18} style={{ color: COLORS.accent }} className="shrink-0" />
                                    <h4 className="font-extrabold" style={{ color: COLORS.darkBase }}>Designer</h4>
                                  </div>
                                  <ul className="space-y-3">
                                    <li className="flex items-center gap-3">
                                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS.accent }}></div>
                                      <span className="text-sm font-medium opacity-80 leading-relaxed" style={{ color: COLORS.darkBase }}>UI/UX</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS.accent }}></div>
                                      <span className="text-sm font-medium opacity-80 leading-relaxed" style={{ color: COLORS.darkBase }}>Prototyping</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS.accent }}></div>
                                      <span className="text-sm font-medium opacity-80 leading-relaxed" style={{ color: COLORS.darkBase }}>Visual Design</span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-16 md:mt-24 pt-10 border-t border-[#42CDBA]/20 mx-auto max-w-4xl text-center">
          <Link
            href="/daftar"
            className="group/btn inline-flex items-center gap-2 rounded-full bg-[#1F6F68] px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-primary/20 transition-[background-color,color,box-shadow,transform] duration-150 hover:bg-[#F3B233] hover:text-[#134146] hover:shadow-xl hover:shadow-accent/20 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2C8970] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F0FAF7] motion-reduce:transition-none motion-reduce:active:scale-100 sm:px-10 sm:py-4 sm:text-lg"
          >
            Daftar Sekarang
            <MoveRight className="h-5 w-5 transition-transform duration-150 group-hover/btn:translate-x-1 group-focus-visible/btn:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none" />
          </Link>
        </div>
      </div>
    </section>
  )
}
