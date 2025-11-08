import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Laptop, Layers, GraduationCapIcon, Building } from "lucide-react"

export function ProgramSection() {
  return (
    <section className="py-12 md:py-16 lg:py-20" style={{ backgroundColor: "#F7FCF9" }}>
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter text-[#134146] sm:text-4xl">
            Jurusan Programmer & Designer
          </h2>
          <p className="mt-4 text-[#134146]/80">
            Tahapan pembelajaran terstruktur untuk mempersiapkan santri menjadi profesional pada bidang teknologi
          </p>
        </div>

        {/* Metode Pembelajaran */}
        <div className="mt-12 mx-auto max-w-4xl">
          <div className="bg-white rounded-lg p-6 shadow-sm border" style={{ borderColor: "rgba(44,137,112,0.08)" }}>
            <h3 className="text-xl font-bold mb-4 text-center text-[#2C8970]">Bagaimana Metode Belajarnya?</h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3">
                {[
                  "Kurikulum terstruktur dari teknologi terkini",
                  "Pengajar praktisi dari perusahaan teknologi",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start">
                    <div className="mr-3 mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#2C8970]/10 text-[#2C8970]">
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
                    <span className="text-[#134146]">{item}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                {["Pembelajaran dipercepat dengan bantuan AI", "Project-based learning dengan kasus nyata"].map(
                  (item, idx) => (
                    <div key={idx} className="flex items-start">
                      <div className="mr-3 mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#2C8970]/10 text-[#2C8970]">
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
                      <span className="text-[#134146]">{item}</span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tahapan Belajar */}
        <div className="mt-12 max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-[#134146] mb-6 text-center">Bagaimana Tahapan Belajar?</h3>

          <div className="relative">
            {/* center timeline line */}
            <div
              className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 transform md:-translate-x-1/2"
              style={{ backgroundColor: "rgba(44,137,112,0.14)" }}
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
                <div key={stage.num} className="relative mb-12 md:mb-16">
                  <div className="flex flex-col md:flex-row items-start md:items-center">
                    <div className="flex items-center justify-center z-10 mb-4 md:mb-0 md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
                      <div className="w-8 h-8 rounded-full bg-[#2C8970] text-white flex items-center justify-center font-bold">
                        {stage.num}
                      </div>
                    </div>

                    {stage.side === "left" ? (
                      <>
                        <div className="md:w-1/2 md:pr-12 md:text-right md:mr-4">
                          <div className="bg-white rounded-lg p-6 shadow-sm" style={{ borderColor: "rgba(44,137,112,0.08)", borderWidth: 1 }}>
                            <div className="flex items-center justify-end mb-3 md:hidden">
                              <Icon className="h-6 w-6 text-[#2C8970] mr-2" />
                            </div>
                            <div className="hidden md:flex md:items-center md:justify-end mb-3">
                              <Icon className="h-6 w-6 text-[#2C8970] ml-2" />
                            </div>
                            <h3 className="text-xl font-bold text-[#2C8970] mb-2">{stage.title}</h3>
                            <p className="text-[#134146]/80">{stage.desc}</p>
                          </div>
                        </div>
                        <div className="hidden md:block md:w-1/2"></div>
                      </>
                    ) : (
                      <>
                        <div className="md:w-1/2 hidden md:block"></div>
                        <div className="md:w-1/2 md:pl-12 md:ml-4">
                          <div className="bg-white rounded-lg p-6 shadow-sm" style={{ borderColor: "rgba(44,137,112,0.08)", borderWidth: 1 }}>
                            <div className="flex items-center mb-3">
                              <Icon className="h-6 w-6 text-[#2C8970] mr-2" />
                            </div>
                            <h3 className="text-xl font-bold text-[#2C8970] mb-2">{stage.title}</h3>
                            <p className="text-[#134146]/80 mb-4">{stage.desc}</p>

                            {stage.extended && (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div className="p-4 rounded-lg" style={{ backgroundColor: "rgba(44,137,112,0.04)" }}>
                                  <h4 className="font-bold text-[#134146] mb-2">Programmer</h4>
                                  <ul className="space-y-1 text-[#134146]/80">
                                    <li className="flex items-start">
                                      <span className="mr-2" style={{ color: "#B6CB6C" }}>•</span>
                                      <span>Frontend</span>
                                    </li>
                                    <li className="flex items-start">
                                      <span className="mr-2" style={{ color: "#B6CB6C" }}>•</span>
                                      <span>Backend</span>
                                    </li>
                                  </ul>
                                </div>
                                <div className="p-4 rounded-lg" style={{ backgroundColor: "rgba(44,137,112,0.04)" }}>
                                  <h4 className="font-bold text-[#134146] mb-2">Designer</h4>
                                  <ul className="space-y-1 text-[#134146]/80">
                                    <li className="flex items-start">
                                      <span className="mr-2" style={{ color: "#B6CB6C" }}>•</span>
                                      <span>UI/UX</span>
                                    </li>
                                    <li className="flex items-start">
                                      <span className="mr-2" style={{ color: "#B6CB6C" }}>•</span>
                                      <span>Prototyping</span>
                                    </li>
                                    <li className="flex items-start">
                                      <span className="mr-2" style={{ color: "#B6CB6C" }}>•</span>
                                      <span>Visual Design</span>
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

        <div className="mt-12 text-center">
          <Link
            href="https://forms.gle/92AqMyaUs81tyhLRA"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Button
              className="font-semibold px-6 py-3 rounded-full bg-[#2C8970] text-white transition-colors hover:bg-[#E3B251] hover:text-[#134146]"
            >
              Daftar Sekarang
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
