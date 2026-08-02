import Image from "next/image"
import { Instagram } from "lucide-react"
import {
  GALLERY_FEATURED_IMAGE_SIZES,
  GALLERY_TILE_IMAGE_SIZES,
  GALLERY_WIDE_TILE_IMAGE_SIZES,
  LANDING_GALLERY_ITEMS,
} from "@/components/gallery-content"

export function GallerySection() {
  return (
    <section
      id="kehidupan-santri"
      className="section-spacing-standard scroll-mt-20 bg-brand-surface"
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-8 max-w-2xl md:mb-10">
          <h2
            className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl"
            style={{ color: "var(--color-brand-dark)" }}
          >
            Kehidupan Santri di <span className="font-righteous font-normal">NUSA</span>
          </h2>
          <p
            className="text-base font-medium leading-relaxed opacity-80 sm:text-lg"
            style={{ color: "var(--color-brand-dark)" }}
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
                className={`relative h-[240px] overflow-hidden rounded-2xl bg-brand-dark md:h-[260px] lg:h-full ${
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

        <div className="mt-6 flex flex-col gap-5 border-t border-brand-dark/15 pt-5 md:mt-8 md:flex-row md:items-center md:justify-between md:gap-8 md:pt-6">
          <div className="max-w-2xl">
            <h3 className="text-lg font-bold text-brand-dark">
              Ikuti kegiatan terbaru NUSA
            </h3>
            <p className="mt-1 text-sm font-medium leading-relaxed text-brand-dark/75 sm:text-base">
              Dokumentasi dan kabar kegiatan santri lainnya kami bagikan secara rutin di Instagram.
            </p>
          </div>

          <a
            href="https://instagram.com/nusaboardingschool"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 w-full shrink-0 items-center justify-center gap-2 rounded-full border-2 border-brand-dark bg-brand-dark px-6 py-2.5 text-sm font-bold text-white transition-[background-color,border-color,color,transform] duration-150 hover:border-brand-depth hover:bg-brand-depth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:ring-offset-2 active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100 md:w-auto"
          >
            <Instagram aria-hidden="true" className="size-4" />
            Ikuti NUSA di Instagram
          </a>
        </div>
      </div>
    </section>
  )
}
