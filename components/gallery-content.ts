export const GALLERY_FEATURED_IMAGE_SIZES =
  "(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) calc(100vw - 4rem), (max-width: 1279px) calc(50vw - 2.5rem), 584px"

export const GALLERY_TILE_IMAGE_SIZES =
  "(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) calc(50vw - 3rem), (max-width: 1279px) calc(25vw - 2rem), 284px"

export const GALLERY_WIDE_TILE_IMAGE_SIZES =
  "(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) calc(50vw - 3rem), (max-width: 1279px) calc(50vw - 2.5rem), 584px"

export interface GalleryItem {
  name: string
  description: string
  image: string
  width: number
  height: number
  mobileWidth: number
  mobileHeight: number
  objectPosition?: string
}

export const GALLERY_ITEMS: readonly GalleryItem[] = [
  {
    name: "MPLS",
    description: "Masa Pengenalan Lingkungan Sekolah untuk Santri Baru.",
    image: "/images/gallery-1-mpls.webp",
    width: 1280,
    height: 720,
    mobileWidth: 640,
    mobileHeight: 360,
  },
  {
    name: "Bersukaria: City Tour Mataram",
    description: "Kegiatan keliling kota sambil belajar sejarah Mataram di Kota Semarang",
    image: "/images/gallery-2-bersukaria-mataram.webp",
    width: 1280,
    height: 960,
    mobileWidth: 640,
    mobileHeight: 480,
  },
  {
    name: "IT Camp",
    description: "Mengajar materi IT seperti Design, Game Development, dan Programming untuk anak-anak.",
    image: "/images/gallery-3-itcamp.webp",
    width: 1280,
    height: 720,
    mobileWidth: 640,
    mobileHeight: 360,
  },
  {
    name: "IT Camp: Outbond",
    description: "Melatih kerjasama tim dan kepemimpinan.",
    image: "/images/gallery-4-itcamp.webp",
    width: 1280,
    height: 720,
    mobileWidth: 640,
    mobileHeight: 360,
  },
  {
    name: "NUSA Mengajar",
    description: "Mengajar materi IT ke sekolah lain atau masyarakat.",
    image: "/images/gallery-5-nusa-mengajar.webp",
    width: 1280,
    height: 720,
    mobileWidth: 640,
    mobileHeight: 360,
  },
  {
    name: "Bersukaria: City Tour Legend Culinary (English)",
    description: "Belajar sejarah kuliner legendaris di Semarang dalam bahasa Inggris.",
    image: "/images/gallery-6-bersukaria-jajan.webp",
    width: 1280,
    height: 720,
    mobileWidth: 640,
    mobileHeight: 360,
  },
  {
    name: "Google I/O Extended Semarang",
    description: "Belajar teknologi terbaru dari Google I/O Extended Semarang.",
    image: "/images/gallery-7-googleio.webp",
    width: 1280,
    height: 848,
    mobileWidth: 640,
    mobileHeight: 424,
  },
  {
    name: "Talking to Stranger",
    description: "Ngobrol dengan orang seluruh dunia dengan Bahasa Inggris.",
    image: "/images/gallery-8-talk-with-stranger.webp",
    width: 1280,
    height: 960,
    mobileWidth: 640,
    mobileHeight: 480,
  },
  {
    name: "Takziah Tetangga",
    description: "Takziah ke tetangga yang berduka.",
    image: "/images/gallery-9-takziyah.webp",
    width: 1280,
    height: 720,
    mobileWidth: 640,
    mobileHeight: 360,
  },
  {
    name: "Jualan di Market Day",
    description: "Berani jualan menawarkan jasa buat website.",
    image: "/images/gallery-10-jualan.webp",
    width: 1280,
    height: 960,
    mobileWidth: 640,
    mobileHeight: 480,
  },
  {
    name: "Jualan di Car Free Day",
    description: "Berani jualan di Car Free Day.",
    image: "/images/gallery-11-jualan-cfd.webp",
    width: 960,
    height: 1280,
    mobileWidth: 480,
    mobileHeight: 640,
  },
  {
    name: "Leadership Camp",
    description: "Kegiatan untuk mengembangkan karakter dan leadership.",
    image: "/images/gallery-12-camp.webp",
    width: 1280,
    height: 960,
    mobileWidth: 640,
    mobileHeight: 480,
  },
]

const LANDING_GALLERY_ORDER = [
  "NUSA Mengajar",
  "IT Camp",
  "Jualan di Car Free Day",
  "MPLS",
  "Talking to Stranger",
  "Takziah Tetangga",
  "Jualan di Market Day",
  "Leadership Camp",
  "Google I/O Extended Semarang",
  "Bersukaria: City Tour Mataram",
  "IT Camp: Outbond",
  "Bersukaria: City Tour Legend Culinary (English)",
] as const

export const LANDING_GALLERY_ITEMS: readonly GalleryItem[] = LANDING_GALLERY_ORDER.map(
  (name) => {
    const item = GALLERY_ITEMS.find((galleryItem) => galleryItem.name === name)

    if (!item) {
      throw new Error(`Gallery item not found: ${name}`)
    }

    return item
  },
)
