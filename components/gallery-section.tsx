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

const COLORS = {
  primary: "#2C8970",
  secondary: "#42CDBA",
  darkBase: "#134146",
  accent: "#F3B233",
  white: "#F7F7F2",
  surface: "#F0FAF7",
}

export function GallerySection() {
  return (
    <section className="py-24 md:py-32 lg:py-40" style={{ backgroundColor: COLORS.surface }}>
      {/* Container back to max-w-7xl for panoramic 2-columns */}
      <div className="container px-4 md:px-8 max-w-7xl mx-auto">
        <div className="mx-auto max-w-4xl text-center mb-16 md:mb-24">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6" style={{ color: COLORS.darkBase }}>
            Galeri Kegiatan
          </h2>
          <p className="text-base sm:text-lg font-medium leading-relaxed max-w-2xl mx-auto opacity-80" style={{ color: COLORS.darkBase }}>
            Momen-momen berharga kegiatan <span className="font-righteous font-normal tracking-wide">NUSA</span> Boarding School
          </p>
        </div>
        
        {/* Restored to massive 2-Col Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mx-auto">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-3xl bg-black border drop-shadow-sm hover:shadow-xl transition-all duration-500 border-transparent hover:border-[#42CDBA]/50 ring-offset-0 hover:ring-2 hover:ring-[#42CDBA]/30"
              aria-label={item.name}
            >
              {/* Image Container 16:9 */}
              <div className="relative overflow-hidden w-full h-full aspect-video">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Dark Base Teal Glass Overlay */}
                <div
                  className="absolute inset-0 flex flex-col justify-end p-6 md:p-8"
                  style={{
                    background: "linear-gradient(to top, rgba(19,65,70,0.95), rgba(19,65,70,0.6) 40%, rgba(0,0,0,0) 80%)",
                  }}
                >
                  <div className="w-full transition-transform duration-500 transform lg:translate-y-5 lg:group-hover:translate-y-0 text-left">
                    <h3 className="text-white text-lg md:text-xl font-semibold drop-shadow-sm mb-2">
                      {item.name}
                    </h3>

                    {/* Deskripsi Statis di Mobile, Ninja/Fade-up turunkan teks ke text-sm/base agar tak nutupin foto */}
                    <p className="text-sm md:text-base font-medium text-white/90 leading-relaxed block lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500">
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
