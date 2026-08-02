export const siteConfig = {
  url: new URL("https://nusabs.sch.id"),
  name: "NUSA Boarding School",
  alternateName: "NUSA Boarding School Semarang",
  title: "NUSA Boarding School Semarang | Sekolah IT Islami",
  description:
    "Boarding school islami tingkat SMA di Kota Semarang dengan jurusan Programmer dan Designer. SPMB NUSA Boarding School 2027/2028 sudah dibuka.",
  email: "info@nusabs.sch.id",
  telephone: "+62 813-9270-6707",
  location: {
    locality: "Semarang",
    region: "Jawa Tengah",
    country: "Indonesia",
  },
  socialLinks: [
    "https://instagram.com/nusaboardingschool",
    "https://youtube.com/nusaboardingschool",
    "https://tiktok.com/@nusaboardingschool",
    "https://facebook.com/nusaboardingschool",
  ],
  assets: {
    logo: "/icons/logo.png",
    socialImage: "/images/nusa-hero-image.webp",
  },
  registration: {
    title: "SPMB 2027/2028 | NUSA Boarding School",
    description:
      "SPMB NUSA Boarding School 2027/2028 sudah dibuka. Isi formulir pendaftaran calon santri laki-laki untuk jurusan Programmer atau Designer.",
  },
} as const
