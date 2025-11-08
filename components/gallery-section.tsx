import Image from "next/image"

const galleryItems = [
  {
    name: "MPLS",
    description: "Masa Pengenalan Lingkungan Sekolah untuk Santri Baru.",
    image: "images/gallery-1-mpls.jpg?text=MPLS",
  },
  {
    name: "Bersukaria: City Tour Mataram",
    description: "Kegiatan keliling kota sambil belajar sejarah Mataram di Kota Semarang",
    image: "images/gallery-2-bersukaria-mataram.jpg?text=Bersukaria Mataram",
  },
  {
    name: "IT Camp",
    description: "Mengajar materi IT seperti Design, Game Development, dan Programming untuk anak-anak.",
    image: "images/gallery-3-itcamp.jpg?text=IT Camp",
  },
  {
    name: "IT Camp: Outbond",
    description: "Melatih kerjasama tim dan kepemimpinan.",
    image: "images/gallery-4-itcamp.jpg?text=Outbond",
  },
  {
    name: "NUSA Mengajar",
    description: "Mengajar materi IT ke sekolah lain atau masyarakat.",
    image: "images/gallery-5-nusa-mengajar.jpg?text=NUSA Mengajar",
  },
  {
    name: "Bersukaria: City Tour Legend Culinary (English)",
    description: "Belajar sejarah kuliner legendaris di Semarang dalam bahasa Inggris.",
    image: "images/gallery-6-bersukaria-jajan.jpg?text=Bersukaria Legend Culinary",
  },
  {
    name: "Google I/O Extended Semarang",
    description: "Belajar teknologi terbaru dari Google I/O Extended Semarang.",
    image: "images/gallery-7-googleio.png?text=Google I/O Extended Semarang",
  },
  {
    name: "Talking to Stranger",
    description: "Ngobrol dengan orang seluruh dunia dengan Bahasa Inggris.",
    image: "images/gallery-8-talk-with-stranger.jpg?text=Talking to Stranger",
  },
  {
    name: "Takziah Tetangga",
    description: "Takziah ke tetangga yang berduka.",
    image: "images/gallery-9-takziyah.jpg?text=Takziyah",
  },
  {
    name: "Jualan di Market Day",
    description: "Berani jualan menawarkan jasa buat website.",
    image: "images/gallery-10-jualan.jpg?text=Jualan di Market Day",
  },
  {
    name: "Jualan di Car Free Day",
    description: "Berani jualan di Car Free Day.",
    image: "images/gallery-11-jualan-cfd.jpeg?text=Jualan di Car Free Day",
  },
  {
    name: "Leadership Camp",
    description: "Kegiatan untuk mengembangkan karakter dan leadership.",
    image: "images/gallery-12-camp.jpg?text=Leadership Camp",
  },
]

export function GallerySection() {
  return (
    <section className="py-12 md:py-16 lg:py-20" style={{ backgroundColor: "#F7FCF9" }}>
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter text-[#134146] sm:text-4xl">Galeri Kegiatan</h2>
          <p className="mt-4 text-[#134146]/80">Momen-momen berharga kegiatan NUSA Boarding School</p>
        </div>
       <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              className="relative overflow-hidden rounded-xl shadow-sm bg-white"
              aria-label={item.name}
            >
              {/* image container */}
              <div className="relative overflow-hidden group">
                <img src={item.image} alt={item.name} className="w-full h-full aspect-[16/9] object-cover" />

                <div
                  className="absolute inset-0 flex items-end justify-center p-6 transition-opacity duration-300 opacity-80"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(227,178,81,0.95), rgba(227,178,81,0.55) 35%, rgba(0,0,0,0) 70%)",
                  }}
                >
                  <div className="w-full text-center transition-all duration-300 transform group-hover:-translate-y-2">
                    <h3 className="text-white text-lg md:text-xl font-semibold drop-shadow-sm">
                      {item.name}
                    </h3>

                    {/* Deskripsi: hidden dulu, muncul dengan slide-up saat hover */}
                    <p className="mt-2 text-lg text-white/90 max-w-md mx-auto opacity-0 max-h-0 overflow-hidden transition-all duration-300 group-hover:opacity-100 group-hover:max-h-40 group-hover:translate-y-0">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
