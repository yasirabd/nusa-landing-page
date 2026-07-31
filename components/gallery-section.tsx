import Image from "next/image"
import { GALLERY_IMAGE_SIZES, GALLERY_ITEMS } from "@/components/gallery-content"

const COLORS = {
  darkBase: "#134146",
  surface: "#F0FAF7",
}

export function GallerySection() {
  return (
    <section
      id="kehidupan-santri"
      className="scroll-mt-20 py-24 md:py-32 lg:py-40"
      style={{ backgroundColor: COLORS.surface }}
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto mb-16 max-w-4xl text-center md:mb-24">
          <h2
            className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
            style={{ color: COLORS.darkBase }}
          >
            Galeri Kegiatan
          </h2>
          <p
            className="mx-auto max-w-2xl text-base font-medium leading-relaxed opacity-80 sm:text-lg"
            style={{ color: COLORS.darkBase }}
          >
            Momen-momen berharga kegiatan{" "}
            <span className="font-righteous font-normal tracking-wide">NUSA</span> Boarding School
          </p>
        </div>

        <div className="mx-auto grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
          {GALLERY_ITEMS.map((item) => (
            <article
              key={item.image}
              className="gallery-card group relative overflow-hidden rounded-3xl border border-transparent bg-black shadow-sm transition-[border-color,box-shadow] duration-[180ms] hover:border-[#42CDBA]/50 hover:shadow-xl"
              aria-label={item.name}
            >
              <div className="relative aspect-video w-full overflow-hidden">
                <picture>
                  <source
                    type="image/webp"
                    srcSet={`${item.image.replace(".webp", "-640.webp")} ${item.mobileWidth}w, ${item.image} ${item.width}w`}
                    sizes={GALLERY_IMAGE_SIZES}
                  />
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={item.width}
                    height={item.height}
                    sizes={GALLERY_IMAGE_SIZES}
                    className="gallery-image h-full w-full object-cover transition-transform duration-[180ms]"
                    style={{ objectPosition: item.objectPosition }}
                  />
                </picture>

                <div className="absolute inset-0 flex flex-col justify-end bg-[linear-gradient(to_top,rgba(19,65,70,0.95),rgba(19,65,70,0.6)_40%,rgba(0,0,0,0)_80%)] p-6 text-left md:p-8">
                  <div className="w-full">
                    <h3 className="mb-2 text-lg font-semibold text-white drop-shadow-sm md:text-xl">
                      {item.name}
                    </h3>
                    <p className="text-sm font-medium leading-relaxed text-white/90 md:text-base">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
