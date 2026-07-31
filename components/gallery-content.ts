export const GALLERY_IMAGE_SIZES =
  "(max-width: 767px) calc(100vw - 2rem), (max-width: 1279px) calc(50vw - 3rem), 584px"

export interface GalleryItem {
  name: string
  description: string
  image: string
  width: number
  height: number
  objectPosition?: string
}

export const GALLERY_ITEMS: readonly GalleryItem[] = [
  {
    name: "MPLS",
    description: "Masa Pengenalan Lingkungan Sekolah untuk Santri Baru.",
    image: "/images/gallery-1-mpls.webp",
    width: 1280,
    height: 720,
  },
  {
    name: "Bersukaria: City Tour Mataram",
    description: "Kegiatan keliling kota sambil belajar sejarah Mataram di Kota Semarang",
    image: "/images/gallery-2-bersukaria-mataram.webp",
    width: 1280,
    height: 960,
  },
  {
    name: "IT Camp",
    description: "Mengajar materi IT seperti Design, Game Development, dan Programming untuk anak-anak.",
    image: "/images/gallery-3-itcamp.webp",
    width: 1280,
    height: 720,
  },
  {
    name: "IT Camp: Outbond",
    description: "Melatih kerjasama tim dan kepemimpinan.",
    image: "/images/gallery-4-itcamp.webp",
    width: 1280,
    height: 720,
  },
  {
    name: "NUSA Mengajar",
    description: "Mengajar materi IT ke sekolah lain atau masyarakat.",
    image: "/images/gallery-5-nusa-mengajar.webp",
    width: 1280,
    height: 720,
  },
  {
    name: "Bersukaria: City Tour Legend Culinary (English)",
    description: "Belajar sejarah kuliner legendaris di Semarang dalam bahasa Inggris.",
    image: "/images/gallery-6-bersukaria-jajan.webp",
    width: 1280,
    height: 720,
  },
  {
    name: "Google I/O Extended Semarang",
    description: "Belajar teknologi terbaru dari Google I/O Extended Semarang.",
    image: "/images/gallery-7-googleio.webp",
    width: 1280,
    height: 848,
  },
  {
    name: "Talking to Stranger",
    description: "Ngobrol dengan orang seluruh dunia dengan Bahasa Inggris.",
    image: "/images/gallery-8-talk-with-stranger.webp",
    width: 1280,
    height: 960,
  },
  {
    name: "Takziah Tetangga",
    description: "Takziah ke tetangga yang berduka.",
    image: "/images/gallery-9-takziyah.webp",
    width: 1280,
    height: 720,
  },
  {
    name: "Jualan di Market Day",
    description: "Berani jualan menawarkan jasa buat website.",
    image: "/images/gallery-10-jualan.webp",
    width: 1280,
    height: 960,
  },
  {
    name: "Jualan di Car Free Day",
    description: "Berani jualan di Car Free Day.",
    image: "/images/gallery-11-jualan-cfd.webp",
    width: 960,
    height: 1280,
  },
  {
    name: "Leadership Camp",
    description: "Kegiatan untuk mengembangkan karakter dan leadership.",
    image: "/images/gallery-12-camp.webp",
    width: 1280,
    height: 960,
  },
]
