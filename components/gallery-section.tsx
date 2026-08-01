import Image from "next/image"
import { Instagram } from "lucide-react"
import {
  GALLERY_FEATURED_IMAGE_SIZES,
  GALLERY_TILE_IMAGE_SIZES,
  GALLERY_WIDE_TILE_IMAGE_SIZES,
  LANDING_GALLERY_ITEMS,
} from "@/components/gallery-content"

const COLORS = {
  darkBase: "#134146",
  surface: "#F0FAF7",
}

export function GallerySection() {
  return (
    <section
      id="kehidupan-santri"
      className="scroll-mt-20 py-16 md:py-20 lg:py-24"
      style={{ backgroundColor: COLORS.surface }}
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-10 max-w-2xl md:mb-12">
          <h2
            className="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
            style={{ color: COLORS.darkBase }}
          >
            Kehidupan Santri di <span className="font-righteous font-normal">NUSA</span>
          </h2>
          <p
            className="text-base font-medium leading-relaxed opacity-80 sm:text-lg"
            style={{ color: COLORS.darkBase }}
          >
            Beragam kegiatan yang membentuk skill, karakter, keberanian, dan kepedulian santri.
          </p>
        </div>

        <div
          id="gallery-kegiatan-lengkap"
          className="grid gap-4 md:grid-cols-2 lg:auto-rows-[220px] lg:grid-cols-4"
        >
          {LANDING_GALLERY_ITEMS.map((item, index) => {
            const isFeatured = index === 0
            const imageSizes = isFeatured
              ? GALLERY_FEATURED_IMAGE_SIZES
              : index === 1
                ? GALLERY_WIDE_TILE_IMAGE_SIZES
                : GALLERY_TILE_IMAGE_SIZES

            return (
              <article
                key={item.image}
                className={`relative h-[240px] overflow-hidden rounded-2xl bg-[#134146] md:h-[260px] lg:h-full ${
                  isFeatured
                    ? "md:col-span-2 lg:col-span-2 lg:row-span-2"
                    : index === 1
                      ? "lg:col-span-2"
                      : ""
                }`}
                aria-label={item.name}
              >
                <div className="relative h-full w-full overflow-hidden">
                  <picture>
                    <source
                      type="image/webp"
                      srcSet={`${item.image.replace(".webp", "-640.webp")} ${item.mobileWidth}w, ${item.image} ${item.width}w`}
                      sizes={imageSizes}
                    />
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={item.width}
                      height={item.height}
                      sizes={imageSizes}
                      className="absolute inset-0 h-full w-full object-cover"
                      style={{ objectPosition: item.objectPosition }}
                    />
                  </picture>

                  <div className="absolute inset-0 flex flex-col justify-end bg-[linear-gradient(to_top,rgba(8,35,39,0.94),rgba(19,65,70,0.52)_44%,transparent_78%)] p-5 text-left md:p-6">
                    <div className="w-full">
                      <h3
                        className={`${isFeatured ? "text-xl md:text-2xl" : "text-lg"} mb-1.5 font-bold leading-tight text-white`}
                      >
                        {item.name}
                      </h3>
                      <p
                        className={`${isFeatured ? "md:max-w-xl md:text-base" : "text-sm"} font-medium leading-relaxed text-white/85`}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <div className="mt-8 flex">
          <a
            href="https://instagram.com/nusaboardingschool"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-[#134146]/20 px-6 py-2.5 text-sm font-bold text-[#134146] transition-[background-color,border-color,color,transform] duration-150 hover:border-[#134146]/35 hover:bg-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#42CDBA] focus-visible:ring-offset-2 active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100"
          >
            <Instagram aria-hidden="true" className="size-4" />
            Lihat Update Terbaru di Instagram
          </a>
        </div>
      </div>
    </section>
  )
}
