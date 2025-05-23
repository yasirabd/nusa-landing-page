import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  Instagram,
  Laptop,
  Book,
  Phone,
  BicepsFlexed,
  Youtube,
  Rocket,
  Briefcase,
  LightbulbIcon,
  Layers,
  GraduationCapIcon,
  Building,
} from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="text-xl font-bold text-[#2C8970]">
              NUSA <span className="text-[#134146]">Boarding School</span>
            </div>
          </Link>
          <div className="hidden md:block">
            <div className="text-sm font-medium text-[#B6CB6C]">#100 Hari Belajar, Besoknya Gajian</div>
          </div>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" className="text-[#2C8970]">
              <span className="sr-only">Menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white py-12 md:py-16 lg:py-20">
          <div className="absolute inset-0 z-0 opacity-5">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" className="text-[#2C8970]">
              <pattern id="islamic-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M10,0 L20,10 L10,20 L0,10 Z" fill="currentColor" fillOpacity="0.2" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#islamic-pattern)" />
            </svg>
          </div>
          <div className="container relative z-10 px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div>
                  <h1 className="text-3xl font-bold tracking-tighter text-[#134146] sm:text-4xl md:text-5xl">
                    NUSA Boarding School Semarang
                  </h1>
                  <p className="mt-2 text-xl font-medium text-[#2C8970]">Penerimaan Santri Baru</p>
                  <p className="mt-1 text-lg font-medium text-[#134146]">Tahun Pelajaran 2025–2026</p>
                  <p className="mt-1 text-lg font-medium text-[#134146]">Jenjang Pendidikan SMA/SMK</p>
                </div>
                <div className="inline-block rounded-lg bg-[#B6CB6C]/20 px-3 py-1 text-sm font-medium text-[#134146]">
                  Kuota Tersisa 10 Santri Ikhwan!
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Link href="https://wa.me/62812392706707" target="_blank" rel="noopener noreferrer">
                    <Button
                      className="w-full bg-white text-[#2C8970] hover:bg-[#2C8970]/10 sm:w-auto"
                      variant="outline"
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      Konsultasi WhatsApp
                    </Button>
                  </Link>
                  <Link href="https://s.id/GabungNurusSunnah">
                    <Button className="w-full bg-[#2C8970] text-white hover:bg-[#2C8970]/90 sm:w-auto">
                      Daftar Sekarang
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="overflow-hidden rounded-lg">
                  <Image
                    src="/placeholder-nusa.svg?height=300&width=500"
                    alt="NUSA Boarding School"
                    width={500}
                    height={300}
                    className="h-auto w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose NUSA */}
        <section className="bg-[#F8FAF9] py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter text-[#134146] sm:text-4xl">Kenapa Memilih NUSA?</h2>
              <p className="mt-4 text-[#134146]/80">
                Kami menawarkan pendidikan berkualitas dengan pembelaran berbasis project
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {/* Kolom Pertama */}
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-xl font-bold text-[#2C8970]">Keunggulan Akademik</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
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
                    <span className="text-[#134146]">
                      Sekolah unggul berbasis IT dan Qur'ani satu-satunya di Semarang
                    </span>
                  </li>
                  <li className="flex items-start">
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
                    <span className="text-[#134146]">
                      Program pembelajaran intensif dengan pendekatan bootcamp yang fokus pada praktik dan portfolio
                    </span>
                  </li>
                  <li className="flex items-start">
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
                    <span className="text-[#134146]">
                      Tenaga pengajar profesional: praktisi industri, lulusan kampus diniyyah ternama
                    </span>
                  </li>
                  <li className="flex items-start">
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
                    <span className="text-[#134146]">
                      Santri menguasai bidang teknologi, tahfidz, diniyyah, dan bahasa Inggris
                    </span>
                  </li>
                </ul>
              </div>

              {/* Kolom Kedua */}
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-xl font-bold text-[#2C8970]">Pengembangan Potensi</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
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
                    <span className="text-[#134146]">
                      Program yang bisa mengasah skill leadership dan kemandirian menjadi Muslim Tangguh
                    </span>
                  </li>
                  <li className="flex items-start">
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
                    <span className="text-[#134146]">Sekolah full praktik siap langsung kerja</span>
                  </li>
                  <li className="flex items-start">
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
                    <span className="text-[#134146]">
                      Kegiatan siswa beragam untuk membentuk mental tangguh
                    </span>
                  </li>
                  <li className="flex items-start">
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
                    <span className="text-[#134146]">
                      Santri berpeluang mampu memiliki pendapatan setelah 100 hari belajar
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Program Utama - 100 Hari Belajar */}
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl rounded-xl bg-gradient-to-r from-[#2C8970] to-[#134146] p-8 md:p-12 text-white shadow-lg">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">"100 Hari Belajar, Besoknya Gajian"</h2>
                <p className="mt-4 text-white/90 max-w-2xl mx-auto">
                  Program pembelajaran intensif dengan pendekatan bootcamp yang fokus pada praktik dan portfolio
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-3">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 rounded-full bg-white/10 p-4">
                    <Rocket className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">100 Hari Pertama</h3>
                  <p className="text-white/80">
                    Pembelajaran intensif seperti bootcamp, fokus pada skill praktis yang dibutuhkan industri
                  </p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 rounded-full bg-white/10 p-4">
                    <Briefcase className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Langsung Berkarya</h3>
                  <p className="text-white/80">
                    Setelah 100 hari, santri sudah bisa mulai berkarya dan menghasilkan, baik melalui freelance, remote
                    work, atau project berbayar
                  </p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 rounded-full bg-white/10 p-4">
                    <LightbulbIcon className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Belajar Sambil Praktik</h3>
                  <p className="text-white/80">
                    Pembelajaran selanjutnya dilakukan sambil mengerjakan project nyata dan magang di perusahaan partner
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Jurusan Programmer & Designer */}
        <section className="bg-[#F8FAF9] py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter text-[#134146] sm:text-4xl">
                Jurusan Programmer & Designer
              </h2>
              <p className="mt-4 text-[#134146]/80">
                Tahapan pembelajaran terstruktur untuk mempersiapkan santri menjadi profesional di bidang teknologi
              </p>
            </div>

            {/* Metode Pembelajaran */}
            <div className="mt-12 mx-auto max-w-3xl">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-[#2C8970]/10">
                <h3 className="text-xl font-bold text-[#2C8970] mb-4 text-center">Bagaimana Metode Belajarnya?</h3>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-3">
                    <div className="flex items-start">
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
                      <span className="text-[#134146]">Kurikulum terstruktur dari industri teknologi terkini</span>
                    </div>
                    <div className="flex items-start">
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
                      <span className="text-[#134146]">Pengajar praktisi dari perusahaan teknologi</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start">
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
                      <span className="text-[#134146]">Pembelajaran dipercepat dengan bantuan AI</span>
                    </div>
                    <div className="flex items-start">
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
                      <span className="text-[#134146]">Project-based learning dengan kasus nyata</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tahapan Belajar */}
            <div className="mt-12">
              <h3 className="text-xl font-bold text-[#134146] mb-6 text-center">Bagaimana Tahapan Awal Belajar?</h3>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-[#2C8970]/20 transform md:-translate-x-1/2"></div>

                {/* Stage 1 */}
                <div className="relative mb-12 md:mb-16">
                  <div className="flex flex-col md:flex-row items-start md:items-center">
                    <div className="flex items-center justify-center z-10 mb-4 md:mb-0 md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
                      <div className="w-8 h-8 rounded-full bg-[#2C8970] text-white flex items-center justify-center font-bold">
                        1
                      </div>
                    </div>

                    <div className="md:w-1/2 md:pr-12 md:text-right md:mr-4">
                      <div className="bg-white rounded-lg p-6 shadow-sm border border-[#2C8970]/10">
                        <div className="flex items-center justify-end mb-3 md:hidden">
                          <Laptop className="h-6 w-6 text-[#2C8970] mr-2" />
                        </div>
                        <div className="hidden md:flex md:items-center md:justify-end mb-3">
                          <Laptop className="h-6 w-6 text-[#2C8970] ml-2" />
                        </div>
                        <h3 className="text-xl font-bold text-[#2C8970] mb-2">Persiapan (1 Bulan)</h3>
                        <p className="text-[#134146]/80">Persiapan kemampuan dasar komputer</p>
                      </div>
                    </div>

                    <div className="hidden md:block md:w-1/2"></div>
                  </div>
                </div>

                {/* Stage 2 */}
                <div className="relative mb-12 md:mb-16">
                  <div className="flex flex-col md:flex-row items-start md:items-center">
                    <div className="flex items-center justify-center z-10 mb-4 md:mb-0 md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
                      <div className="w-8 h-8 rounded-full bg-[#2C8970] text-white flex items-center justify-center font-bold">
                        2
                      </div>
                    </div>

                    <div className="md:w-1/2 hidden md:block"></div>

                    <div className="md:w-1/2 md:pl-12 md:ml-4">
                      <div className="bg-white rounded-lg p-6 shadow-sm border border-[#2C8970]/10">
                        <div className="flex items-center mb-3">
                          <Layers className="h-6 w-6 text-[#2C8970] mr-2" />
                        </div>
                        <h3 className="text-xl font-bold text-[#2C8970] mb-2">Tahap Awal (3-4 Bulan)</h3>
                        <p className="text-[#134146]/80 mb-4">
                          Mempelajari dasar-dasar programming dan design untuk memahami kedua bidang sebelum memilih
                          fokus
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <div className="bg-[#2C8970]/5 p-4 rounded-lg">
                            <h4 className="font-bold text-[#134146] mb-2">Programmer</h4>
                            <ul className="space-y-1 text-[#134146]/80">
                              <li className="flex items-start">
                                <span className="mr-2 text-[#B6CB6C]">•</span>
                                <span>Frontend</span>
                              </li>
                              <li className="flex items-start">
                                <span className="mr-2 text-[#B6CB6C]">•</span>
                                <span>Backend</span>
                              </li>
                            </ul>
                          </div>

                          <div className="bg-[#2C8970]/5 p-4 rounded-lg">
                            <h4 className="font-bold text-[#134146] mb-2">Designer</h4>
                            <ul className="space-y-1 text-[#134146]/80">
                              <li className="flex items-start">
                                <span className="mr-2 text-[#B6CB6C]">•</span>
                                <span>UI/UX</span>
                              </li>
                              <li className="flex items-start">
                                <span className="mr-2 text-[#B6CB6C]">•</span>
                                <span>Prototyping</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stage 3 */}
                <div className="relative mb-12 md:mb-16">
                  <div className="flex flex-col md:flex-row items-start md:items-center">
                    <div className="flex items-center justify-center z-10 mb-4 md:mb-0 md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
                      <div className="w-8 h-8 rounded-full bg-[#2C8970] text-white flex items-center justify-center font-bold">
                        3
                      </div>
                    </div>

                    <div className="md:w-1/2 md:pr-12 md:text-right md:mr-4">
                      <div className="bg-white rounded-lg p-6 shadow-sm border border-[#2C8970]/10">
                        <div className="flex items-center justify-end mb-3 md:hidden">
                          <GraduationCapIcon className="h-6 w-6 text-[#2C8970] mr-2" />
                        </div>
                        <div className="hidden md:flex md:items-center md:justify-end mb-3">
                          <GraduationCapIcon className="h-6 w-6 text-[#2C8970] ml-2" />
                        </div>
                        <h3 className="text-xl font-bold text-[#2C8970] mb-2">
                          Tahap Belajar dan Berkarya (2 Tahun)
                        </h3>
                        <p className="text-[#134146]/80">Belajar dan berkarya sesuai dengan fokus bidang yang dipilih</p>
                      </div>
                    </div>

                    <div className="hidden md:block md:w-1/2"></div>
                  </div>
                </div>

                {/* Stage 4 */}
                <div className="relative">
                  <div className="flex flex-col md:flex-row items-start md:items-center">
                    <div className="flex items-center justify-center z-10 mb-4 md:mb-0 md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
                      <div className="w-8 h-8 rounded-full bg-[#2C8970] text-white flex items-center justify-center font-bold">
                        4
                      </div>
                    </div>

                    <div className="md:w-1/2 hidden md:block"></div>

                    <div className="md:w-1/2 md:pl-12 md:ml-4">
                      <div className="bg-white rounded-lg p-6 shadow-sm border border-[#2C8970]/10">
                        <div className="flex items-center mb-3">
                          <Building className="h-6 w-6 text-[#2C8970] mr-2" />
                        </div>
                        <h3 className="text-xl font-bold text-[#2C8970] mb-2">Tahap Magang Kerja (1 Tahun)</h3>
                        <p className="text-[#134146]/80">
                          Pengalaman kerja nyata di perusahaan
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Kurikulum NUSA */}
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter text-[#134146] sm:text-4xl">Kurikulum NUSA</h2>
              <p className="mt-4 text-[#134146]/80">
                Terdapat 4 Pilar Utama di NUSA Boarding School
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {/* Pilar 1: Teknologi Informasi */}
              <div className="rounded-lg border border-[#2C8970]/20 bg-white p-6 shadow-sm">
                <div className="mb-4 rounded-full bg-[#2C8970]/10 p-3 text-[#2C8970] inline-flex">
                  <Laptop className="h-8 w-8" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-[#134146]">Teknologi Informasi (TI)</h3>
                <ul className="space-y-2 text-[#134146]/80">
                  <li className="flex items-start">
                    <span className="mr-2 mt-1 text-[#B6CB6C]">•</span>
                    <span>Tiap Semester Menulis 1 Buku Teknologi</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1 text-[#B6CB6C]">•</span>
                    <span>Tiap Bulan Rilis 1 Aplikasi atau Web</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1 text-[#B6CB6C]">•</span>
                    <span>Tiap Pekan Upload 1 Video Tutorial</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1 text-[#B6CB6C]">•</span>
                    <span>Tiap Hari Push Code ke Github</span>
                  </li>
                </ul>
              </div>

              {/* Pilar 2: Bahasa Inggris */}
              <div className="rounded-lg border border-[#2C8970]/20 bg-white p-6 shadow-sm">
                <div className="mb-4 rounded-full bg-[#2C8970]/10 p-3 text-[#2C8970] inline-flex">
                  <BookOpen className="h-8 w-8" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-[#134146]">Bahasa Inggris</h3>
                <ul className="space-y-2 text-[#134146]/80">
                  <li className="flex items-start">
                    <span className="mr-2 mt-1 text-[#B6CB6C]">•</span>
                    <span>English Day: Senin-Jumat Full English</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1 text-[#B6CB6C]">•</span>
                    <span>Morning Show: Presentasi Pagi dalam Bahasa Inggris</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1 text-[#B6CB6C]">•</span>
                    <span>Tech Talk: Diskusi IT dalam Bahasa Inggris</span>
                  </li>
                </ul>
              </div>

              {/* Pilar 3: Pendidikan Agama */}
              <div className="rounded-lg border border-[#2C8970]/20 bg-white p-6 shadow-sm">
                <div className="mb-4 rounded-full bg-[#2C8970]/10 p-3 text-[#2C8970] inline-flex">
                  <Book className="h-8 w-8" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-[#134146]">Pendidikan Agama</h3>
                <ul className="space-y-2 text-[#134146]/80">
                  <li className="flex items-start">
                    <span className="mr-2 mt-1 text-[#B6CB6C]">•</span>
                    <span>Tahfidz: 3 Juz</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1 text-[#B6CB6C]">•</span>
                    <span>Aqidah, adab, sirah</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1 text-[#B6CB6C]">•</span>
                    <span>Fiqih kontemporer; mu'amalah, teknologi</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1 text-[#B6CB6C]">•</span>
                    <span>Dakwah Digital: Konten Dakwah Islam di Media Sosial</span>
                  </li>
                </ul>
              </div>

              {/* Pilar 4: Muslim Tangguh */}
              <div className="rounded-lg border border-[#2C8970]/20 bg-white p-6 shadow-sm">
                <div className="mb-4 rounded-full bg-[#2C8970]/10 p-3 text-[#2C8970] inline-flex">
                  <BicepsFlexed className="h-8 w-8" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-[#134146]">Muslim Tangguh</h3>
                <ul className="space-y-2 text-[#134146]/80">
                  <li className="flex items-start">
                    <span className="mr-2 mt-1 text-[#B6CB6C]">•</span>
                    <span>Potong Urat Malu: Berani Jualan di CFD</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1 text-[#B6CB6C]">•</span>
                    <span>Mission Impossible: Jual Air Mineral Botol Harga 10rb</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1 text-[#B6CB6C]">•</span>
                    <span>Business Survival: Bertahan 7 Hari, Modal 50rb, Pulang Bawa Jutaan</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1 text-[#B6CB6C]">•</span>
                    <span>Keliling Backpaker 3 Negara dengan Uang Sendiri</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1 text-[#B6CB6C]">•</span>
                    <span>Outbond Melatih Mental dan Fisik</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1 text-[#B6CB6C]">•</span>
                    <span>Laki-laki Bisa Masak</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1 text-[#B6CB6C]">•</span>
                    <span>Bersih Bareng NUSA (Keliling Masjid Bersih Pekanan)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1 text-[#B6CB6C]">•</span>
                    <span>Siap Ditolak, Mental Juara</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1 text-[#B6CB6C]">•</span>
                    <span>Jago jualan digital</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1 text-[#B6CB6C]">•</span>
                    <span>NUSA Mengajar</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1 text-[#B6CB6C]">•</span>
                    <span>dan banyak kegiatan lainnya...</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Teaching Team */}
        <section className="bg-[#F8FAF9] py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter text-[#134146] sm:text-4xl">Tim Pengajar NUSA</h2>
              <p className="mt-4 text-[#134146]/80">Tenaga pengajar profesional dan berpengalaman di bidangnya</p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
              {[
                {
                  name: "Yasir Abdur Rohman, S.Kom",
                  role: "Kepala Sekolah",
                  image: "/profile-yasir.png?height=300&width=300",
                },
                {
                  name: "Ariaseta Setia Alam",
                  role: "CEO KodingWorks & CTO Pesan.io",
                  image: "/profile-ariaseta.jpg?height=300&width=300",
                },
              ].map((teacher, index) => (
                <div key={index} className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-sm">
                  <div className="mb-4 overflow-hidden rounded-full">
                    <Image
                      src={teacher.image || "/placeholder.svg"}
                      alt={teacher.name}
                      width={120}
                      height={120}
                      className="h-32 w-32 object-cover"
                    />
                  </div>
                  <h3 className="mb-1 text-lg font-bold text-[#134146]">{teacher.name}</h3>
                  <p className="text-sm text-[#134146]/70">{teacher.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter text-[#134146] sm:text-4xl">Galeri Kegiatan</h2>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              {[
                { name: "IT/Coding Class", image: "/coding-class.png?height=300&width=400&text=IT/Coding Class" },
                { name: "Ramadan Bootcamp", image: "/ramadan-bootcamp.png?height=300&width=400&text=Ramadan Bootcamp" },
                { name: "IT Camp", image: "/it-camp.png?height=300&width=400&text=IT Camp" },
                { name: "Outbond", image: "/outbond.png?height=300&width=400&text=Outbond" },
                {
                  name: "Berani Jualan di CFD",
                  image: "/berani-jualan.png?height=300&width=400&text=Berani Jualan di CFD",
                },
                {
                  name: "Buat Website dengan AI",
                  image: "/website-ai.png?height=300&width=400&text=Buat Website dengan AI",
                },
                { name: "NUSA Mengajar", image: "/nusa-mengajar.png?height=300&width=400&text=NUSA Mengajar" },
                { name: "Tech Talk", image: "/tech-talk.png?height=300&width=400&text=Tech Talk" },
              ].map((item, index) => (
                <div key={index} className="overflow-hidden rounded-lg">
                  <div className="relative">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={400}
                      height={300}
                      className="transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                      <p className="text-white font-medium p-3">{item.name}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-[#F8FAF9] py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter text-[#134146] sm:text-4xl">Testimoni</h2>
              <p className="mt-4 text-[#134146]/80">Apa kata mereka tentang NUSA Boarding School</p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {[
                {
                  name: "Dr. Ir. Edy Susilo, MT",
                  role: "Ketua Yayasan Islam Nurus Sunnah",
                  quote:
                    "NUSA membekali anak-anak untuk punya lifeskill dalam bidang IT dan memiliki karakter yang baik.",
                  image: "/user.png?height=100&width=100",
                },
                {
                  name: "Dr.Eng. Adi Wibowo, S.Si., M.Kom",
                  role: "Wali Murid SD Islam Nurus Sunnah",
                  quote:
                    "Keren banget! NUSA tidak hanya fokus ke ilmu agama dan akhlak mulia sesuai tuntunan Ahlus Sunnah wal Jama’ah, tetapi juga menyiapkan generasi Qur’ani yang menguasai teknologi. Semoga makin sukses dan terus istiqamah!",
                  image: "/user.png?height=100&width=100",
                },
                {
                  name: "Izzul Fairuz Mahendra",
                  role: "Santri NUSA Boarding School 2025",
                  quote:
                    "Satu-satunya sekolah IT yang ada di Semarang.",
                  image: "/user.png?height=100&width=100",
                },
                {
                  name: "M. Fahri",
                  role: "Santri NUSA Boarding School 2025",
                  quote:
                    "NUSA mengajarkan bisnis hingga dapat uang menggunakan teknologi terbaru.",
                  image: "/user.png?height=100&width=100",
                },
              ].map((testimonial, index) => (
                <div key={index} className="rounded-lg bg-white p-6 shadow-sm">
                  <div className="mb-4 flex items-center">
                    <div className="mr-4 overflow-hidden rounded-full">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={60}
                        height={60}
                        className="h-14 w-14 object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#134146]">{testimonial.name}</h3>
                      <p className="text-sm text-[#134146]/70">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="italic text-[#134146]/80">"{testimonial.quote}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

       {/* Fee Information */}
        <section className="py-12 md:py-16 lg:py-20 bg-[#2C8970] text-white">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Informasi Biaya</h2>
            </div>

            {/* Uang Pendaftaran - Small Row */}
            <div className="mt-8 mx-auto max-w-md">
              <div className="text-center">
                <p className="text-xl font-bold text-white">Pendaftaran: 275ribu</p>
              </div>
            </div>

            {/* Main Fee Information - 3 Columns */}
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {/* Uang Masuk */}
              <div className="rounded-lg border-2 border-white/30 bg-white/10 p-6 text-center backdrop-blur-sm">
                <h3 className="mb-2 text-xl font-bold">Uang Masuk</h3>
                <p className="mb-2 text-2xl font-bold text-white">20jt</p>
                <p className="mb-4 inline-block rounded-md bg-[#B6CB6C] px-3 py-1 text-sm font-medium text-[#134146]">Bisa dicicil hingga lulus</p>
                <div className="text-left">
                  <p className="font-medium mb-2">Sudah Termasuk:</p>
                  <ul className="space-y-1 text-white/80">
                    <li className="flex items-start">
                      <span className="mr-2 text-[#B6CB6C]">•</span>
                      <span>Biaya Masuk</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-[#B6CB6C]">•</span>
                      <span>Biaya Pengembangan Pendidikan</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-[#B6CB6C]">•</span>
                      <span>Biaya Organisasi Santri</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-[#B6CB6C]">•</span>
                      <span>Uang Semester 1</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-[#B6CB6C]">•</span>
                      <span>Uang SPP Bulan Juli 2025</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-[#B6CB6C]">•</span>
                      <span>Seragam Sekolah</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-[#B6CB6C]">•</span>
                      <span>Buku/modul pembelajaran</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-[#B6CB6C]">•</span>
                      <span>Kebutuhan Asrama</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Uang Bulanan */}
              <div className="rounded-lg border-2 border-white/30 bg-white/10 p-6 text-center backdrop-blur-sm">
                <h3 className="mb-2 text-xl font-bold">Uang Bulanan</h3>
                <p className="mb-4 text-2xl font-bold text-white">2jt</p>
                <div className="text-left">
                  <p className="font-medium mb-2">Sudah Termasuk:</p>
                  <ul className="space-y-1 text-white/80">
                    <li className="flex items-start">
                      <span className="mr-2 text-[#B6CB6C]">•</span>
                      <span>Makan 3x sehari</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-[#B6CB6C]">•</span>
                      <span>Fasilitas kesehatan dasar</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-[#B6CB6C]">•</span>
                      <span>Biaya pendidikan</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-[#B6CB6C]">•</span>
                      <span>Ujian sekolah/semester</span>
                    </li>
                  </ul>
                  <p className="mt-2 text-xs text-white/70">*Dibayar paling lambat tanggal 10 setiap bulan</p>
                </div>
              </div>

              {/* Uang Semester */}
              <div className="rounded-lg border-2 border-white/30 bg-white/10 p-6 text-center backdrop-blur-sm">
                <h3 className="mb-2 text-xl font-bold">Uang Semester</h3>
                <p className="mb-4 text-2xl font-bold text-white">1jt</p>
                <div className="text-left">
                  <p className="font-medium mb-2">Sudah Termasuk:</p>
                  <ul className="space-y-1 text-white/80">
                    <li className="flex items-start">
                      <span className="mr-2 text-[#B6CB6C]">•</span>
                      <span>Program Muslim Tangguh</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-[#B6CB6C]">•</span>
                      <span>Kegiatan ekstrakurikuler</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-[#B6CB6C]">•</span>
                      <span>Program entrepreneur</span>
                    </li>
                  </ul>
                  <p className="mt-2 text-xs text-white/70">*Dibayar paling lambat tiap awal semester</p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center text-sm text-white/70">
              <p>* Tersedia program beasiswa untuk santri berprestasi dan kurang mampu</p>
              <p>* Pembayaran dapat diangsur sesuai kebijakan pondok</p>
            </div>
          </div>
        </section>

        {/* Partner Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tighter text-[#134146] sm:text-4xl">Partner Kami</h2>
              <p className="mt-4 text-[#134146]/80">Bekerja sama beberapa perusahaan di industri teknologi</p>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
              {[
                { name: "KodingWorks", logo: "/KodingWorks.png?height=80&width=180&text=KodingWorks" },
                { name: "Pesanio", logo: "/Pesanio.png?height=80&width=180&text=Pesanio" },
                { name: "Programmer Kecil", logo: "/ProgrammerKecil.png?height=80&width=180&text=Programmer Kecil" },
                { name: "Sanditheta", logo: "/Sanditheta.png?height=80&width=180&text=Sanditheta" },
              ].map((partner) => (
                <div key={partner.name} className="flex items-center justify-center">
                  <Image
                    src={partner.logo || "/placeholder.svg"}
                    alt={`${partner.name} Logo`}
                    width={180}
                    height={80}
                    className="h-16 w-auto object-contain hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Registration Form - Simplified */}
        <section id="daftar" className="bg-[#2C8970]/10 py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-lg">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold tracking-tighter text-[#134146] sm:text-4xl">
                    Jadilah Bagian dari Muslim Tangguh Jago IT
                  </h2>
                </div>
                <div className="flex justify-center md:justify-end">
                  <Link href="https://s.id/GabungNurusSunnah" target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="bg-[#2C8970] text-white hover:bg-[#2C8970]/90 text-lg px-8 py-6">
                      Daftar Sekarang Juga
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-[#134146] text-white">
        <div className="container px-4 py-12 md:px-6 md:py-16">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="text-xl font-bold">
                NUSA <span className="text-[#B6CB6C]">Boarding School</span>
              </div>
              <p className="mt-4 text-white/70">Membentuk generasi Muslim yang tangguh dan jago IT</p>
              <div className="mt-6 flex space-x-4">
                <Link
                  href="https://instagram.com/nusaboardingschool"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
                >
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link
                  href="https://youtube.com/nusaboardingschool"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
                >
                  <Youtube className="h-5 w-5" />
                  <span className="sr-only">YouTube</span>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold">Kontak & Lokasi</h3>
              <address className="not-italic text-white/70">
                <p>Jalan Jabungan, Kel. Jabungan, Kec. Banyumanik, Kota Semarang 50266</p>
                <p className="mt-4">Informasi Sekolah:</p>
                <p className="mt-1">Ustadz Yasir - 081392706707</p>
                <p className="mt-4">info@nusabs.sch.id</p>
              </address>
            </div>
            <div>
              
            </div>
          </div>
          <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-white/60">
            <p>&copy; {new Date().getFullYear()} NUSA Boarding School</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
