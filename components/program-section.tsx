import Link from "next/link"
import { Laptop, Layers, GraduationCapIcon, Building, CheckCircle2, Code, Palette, MoveRight } from "lucide-react"

export function ProgramSection() {
  return (
    <section id="program" className="section-spacing-standard scroll-mt-20 bg-brand-surface">
      <div className="container px-4 md:px-8 max-w-7xl mx-auto">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl lg:text-6xl">
            Jurusan Programmer & Designer
          </h2>
          <p className="mx-auto max-w-2xl text-base font-medium leading-relaxed text-brand-dark opacity-80 sm:text-lg">
            Tahapan pembelajaran terstruktur untuk mempersiapkan santri menjadi profesional pada bidang teknologi
          </p>
        </div>

        {/* Metode Pembelajaran */}
        <div className="mt-12 md:mt-16 mx-auto max-w-5xl">
          <div className="rounded-3xl border border-transparent bg-white p-6 shadow-sm transition-[border-color,box-shadow] duration-[180ms] hover:border-brand-highlight/30 hover:shadow-xl md:p-8">
            <h3 className="mb-6 text-center text-2xl font-bold text-brand md:text-3xl">
              Metode Pembelajaran Mutakhir
            </h3>
            <div className="grid gap-6 md:gap-8 md:grid-cols-2">
              <div className="space-y-4 md:space-y-6">
                {[
                  "Kurikulum terstruktur dari teknologi terkini",
                  "Pengajar praktisi dari perusahaan teknologi",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start">
                    <div className="mr-5 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-highlight/15">
                      <CheckCircle2 size={18} strokeWidth={2.5} className="text-brand" />
                    </div>
                    <span className="text-base font-medium leading-relaxed text-brand-dark opacity-80 md:text-lg">{item}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 md:space-y-6">
                {[
                  "Pembelajaran dipercepat dengan bantuan AI",
                  "Project-based learning dengan kasus nyata"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start">
                    <div className="mr-5 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-accent/15">
                      <CheckCircle2 size={18} strokeWidth={2.5} className="text-brand-accent" />
                    </div>
                    <span className="text-base font-medium leading-relaxed text-brand-dark opacity-80 md:text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tahapan Belajar */}
        <div className="mt-14 md:mt-20 max-w-5xl mx-auto">
          <h3 className="mb-8 text-center text-2xl font-bold text-brand-dark md:mb-12 md:text-3xl">
            Peta Perjalanan (Roadmap) Jurusan
          </h3>

          <div className="relative">
            {/* center timeline line glow */}
            <div
              className="absolute bottom-0 left-6 top-0 w-1 transform rounded-full bg-gradient-to-b from-brand via-brand-highlight to-transparent opacity-30 md:left-1/2 md:-translate-x-1/2"
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
                <div key={stage.num} className="relative mb-10 md:mb-16 last:mb-0">
                  <div className="flex flex-col md:flex-row items-start md:items-center">
                    {/* Glowing Node */}
                    <div className="flex items-center justify-center z-10 mb-6 md:mb-0 absolute left-0 md:left-1/2 md:transform md:-translate-x-1/2">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-lg font-bold text-white shadow-[0_0_15px_rgba(44,137,112,0.4)] ring-4 ring-brand-surface">
                        {stage.num}
                      </div>
                    </div>

                    {stage.side === "left" ? (
                      <>
                        <div className="w-full md:w-1/2 md:pr-12 md:text-right">
                          <div className="ml-16 rounded-3xl border border-transparent bg-white p-6 shadow-sm transition-[border-color,box-shadow] duration-[180ms] hover:border-brand-highlight/30 hover:shadow-xl md:ml-0 md:p-8">
                            <div className="flex items-center justify-start md:justify-end mb-5">
                              <div className="mr-4 rounded-2xl bg-brand-highlight/10 p-3.5 md:order-last md:ml-5 md:mr-0">
                                <Icon className="h-7 w-7 text-brand" />
                              </div>
                            </div>
                            <h3 className="mb-3 text-xl font-bold tracking-snug text-brand-dark md:text-2xl">{stage.title}</h3>
                            <p className="max-w-sm text-base font-medium leading-relaxed text-brand-dark opacity-80 md:ml-auto">{stage.desc}</p>
                          </div>
                        </div>
                        <div className="hidden md:block md:w-1/2"></div>
                      </>
                    ) : (
                      <>
                        <div className="hidden md:block md:w-1/2"></div>
                        <div className="w-full md:w-1/2 md:pl-12">
                          <div className="ml-16 rounded-3xl border border-transparent bg-white p-6 shadow-sm transition-[border-color,box-shadow] duration-[180ms] hover:border-brand-highlight/30 hover:shadow-xl md:ml-0 md:p-8">
                            <div className="flex items-center justify-start mb-5">
                              <div className="mr-5 rounded-2xl bg-brand-highlight/10 p-3.5">
                                <Icon className="h-7 w-7 text-brand" />
                              </div>
                            </div>
                            <h3 className="mb-3 text-xl font-bold tracking-snug text-brand-dark md:text-2xl">{stage.title}</h3>
                            <p className="text-base font-medium leading-relaxed text-brand-dark opacity-80">{stage.desc}</p>

                            {stage.extended && (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 border-t border-gray-100 pt-6">
                                {/* Programmer Inner Bento */}
                                <div className="rounded-2xl p-5 transition-colors hover:bg-brand-surface" style={{ backgroundColor: "rgba(44,137,112,0.03)" }}>
                                  <div className="flex items-center gap-2 mb-4">
                                    <Code size={18} className="shrink-0 text-brand" />
                                    <h4 className="font-bold text-brand-dark">Programmer</h4>
                                  </div>
                                  <ul className="space-y-3">
                                    <li className="flex items-center gap-3">
                                      <div className="h-1.5 w-1.5 rounded-full bg-brand-highlight"></div>
                                      <span className="text-sm font-medium leading-relaxed text-brand-dark opacity-80">Frontend</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                      <div className="h-1.5 w-1.5 rounded-full bg-brand-highlight"></div>
                                      <span className="text-sm font-medium leading-relaxed text-brand-dark opacity-80">Backend</span>
                                    </li>
                                  </ul>
                                </div>
                                
                                {/* Designer Inner Bento */}
                                <div className="p-5 rounded-2xl transition-colors hover:bg-yellow-50/50" style={{ backgroundColor: "rgba(243,178,51,0.05)" }}>
                                  <div className="flex items-center gap-2 mb-4">
                                    <Palette size={18} className="shrink-0 text-brand-accent" />
                                    <h4 className="font-bold text-brand-dark">Designer</h4>
                                  </div>
                                  <ul className="space-y-3">
                                    <li className="flex items-center gap-3">
                                      <div className="h-1.5 w-1.5 rounded-full bg-brand-accent"></div>
                                      <span className="text-sm font-medium leading-relaxed text-brand-dark opacity-80">UI/UX</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                      <div className="h-1.5 w-1.5 rounded-full bg-brand-accent"></div>
                                      <span className="text-sm font-medium leading-relaxed text-brand-dark opacity-80">Prototyping</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                      <div className="h-1.5 w-1.5 rounded-full bg-brand-accent"></div>
                                      <span className="text-sm font-medium leading-relaxed text-brand-dark opacity-80">Visual Design</span>
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

        <div className="mx-auto mt-12 max-w-4xl border-t border-brand-highlight/20 pt-8 text-center md:mt-16">
          <Link
            href="/daftar"
            className="group/btn inline-flex items-center gap-2 rounded-full bg-brand-depth px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-primary/20 transition-[background-color,color,box-shadow,transform] duration-150 hover:bg-brand-accent hover:text-brand-dark hover:shadow-xl hover:shadow-accent/20 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-brand-surface motion-reduce:transition-none motion-reduce:active:scale-100 sm:px-10 sm:py-4 sm:text-lg"
          >
            Daftar Sekarang
            <MoveRight className="h-5 w-5 transition-transform duration-150 group-hover/btn:translate-x-1 group-focus-visible/btn:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none" />
          </Link>
        </div>
      </div>
    </section>
  )
}
