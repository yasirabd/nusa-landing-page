import { readFileSync } from "node:fs"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import * as galleryContent from "@/components/gallery-content"
import { GallerySection } from "@/components/gallery-section"

const approvedOrder = [
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

const featuredSizes =
  "(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) calc(100vw - 4rem), (max-width: 1279px) calc(50vw - 2.5rem), 584px"
const tileSizes =
  "(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) calc(50vw - 3rem), (max-width: 1279px) calc(25vw - 2rem), 284px"
const wideTileSizes =
  "(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) calc(50vw - 3rem), (max-width: 1279px) calc(50vw - 2.5rem), 584px"

function getImageSourcePath(image: HTMLElement) {
  const source = new URL(image.getAttribute("src") ?? "", "http://localhost")

  return source.pathname === "/_next/image" ? source.searchParams.get("url") : source.pathname
}

describe("editorial gallery rendering", () => {
  it("shows all twelve curated activities immediately in the approved order", () => {
    render(<GallerySection />)

    expect(
      screen.getByRole("heading", { name: "Kehidupan Santri di NUSA" }),
    ).toBeVisible()
    expect(
      screen.getByText(
        "Beragam kegiatan yang membentuk skill, karakter, keberanian, dan kepedulian santri.",
      ),
    ).toBeVisible()

    expect(screen.getAllByRole("img").map((image) => image.getAttribute("alt"))).toEqual(
      approvedOrder,
    )

    const featured = screen.getByRole("article", { name: "NUSA Mengajar" })
    expect(featured).toHaveClass(
      "h-[240px]",
      "md:h-[260px]",
      "md:col-span-2",
      "lg:col-span-2",
      "lg:row-span-2",
    )

    expect(screen.getByRole("article", { name: "IT Camp" })).toHaveClass(
      "h-[240px]",
      "md:h-[260px]",
      "lg:col-span-2",
    )

    const grid = featured.parentElement as HTMLElement
    expect(grid).toHaveClass(
      "md:grid-cols-2",
      "lg:grid-cols-4",
      "lg:auto-rows-[220px]",
    )
  })

  it("shows every activity without a disclosure interaction", () => {
    render(<GallerySection />)

    expect(screen.getAllByRole("img")).toHaveLength(12)
    expect(
      screen.queryByRole("button", { name: "Lihat Semua 12 Kegiatan" }),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole("button", { name: "Tampilkan Lebih Sedikit" }),
    ).not.toBeInTheDocument()
  })

  it("keeps Instagram optional and accessible", () => {
    render(<GallerySection />)

    expect(
      screen.getByRole("heading", { name: "Ikuti kegiatan terbaru NUSA" }),
    ).toBeVisible()
    expect(
      screen.getByText(
        "Dokumentasi dan kabar kegiatan santri lainnya kami bagikan secara rutin di Instagram.",
      ),
    ).toBeVisible()

    const instagram = screen.getByRole("link", {
      name: "Ikuti NUSA di Instagram",
    })
    const footer = instagram.parentElement as HTMLElement

    expect(instagram).toHaveAttribute(
      "href",
      "https://instagram.com/nusaboardingschool",
    )
    expect(instagram).toHaveAttribute("target", "_blank")
    expect(instagram).toHaveAttribute("rel", "noopener noreferrer")
    expect(footer).toHaveClass(
      "flex-col",
      "border-t",
      "md:flex-row",
      "md:items-center",
      "md:justify-between",
    )

    expect(instagram).toHaveClass(
      "min-h-12",
      "w-full",
      "md:w-auto",
      "bg-[#134146]",
      "text-white",
      "text-sm",
      "duration-150",
      "active:scale-[0.97]",
      "focus-visible:ring-2",
      "focus-visible:ring-[#134146]",
      "motion-reduce:active:scale-100",
    )
    expect(instagram).not.toHaveClass("transition-all")
    expect(instagram).not.toHaveClass("shadow-lg", "shadow-xl", "min-h-14")
  })

  it("preserves all canonical records and responsive WebP sources", () => {
    const canonical = galleryContent.GALLERY_ITEMS
    const landing = (
      galleryContent as typeof galleryContent & {
        LANDING_GALLERY_ITEMS?: typeof canonical
      }
    ).LANDING_GALLERY_ITEMS

    expect(canonical).toHaveLength(12)
    expect(new Set(canonical.map(({ name }) => name)).size).toBe(12)
    expect(landing?.map(({ name }) => name)).toEqual(approvedOrder)

    render(<GallerySection />)

    const recordByName = new Map(canonical.map((item) => [item.name, item]))
    for (const [index, name] of approvedOrder.entries()) {
      const item = recordByName.get(name)
      const image = screen.getByRole("img", { name })
      const article = screen.getByRole("article", { name })
      const source = article.querySelector("source[type='image/webp']")

      expect(item).toBeDefined()
      expect(getImageSourcePath(image)).toBe(item?.image)
      expect(image).toHaveAttribute("width", String(item?.width))
      expect(image).toHaveAttribute("height", String(item?.height))
      const expectedSizes =
        index === 0 ? featuredSizes : index === 1 ? wideTileSizes : tileSizes
      expect(image).toHaveAttribute("sizes", expectedSizes)
      expect(source).toHaveAttribute(
        "srcset",
        `${item?.image.replace(".webp", "-640.webp")} ${item?.mobileWidth}w, ${item?.image} ${item?.width}w`,
      )
    }
  })

  it("keeps captions visible and removes decorative gallery motion", () => {
    render(<GallerySection />)

    for (const name of approvedOrder) {
      const item = galleryContent.GALLERY_ITEMS.find((candidate) => candidate.name === name)
      expect(screen.getByText(name)).toBeVisible()
      expect(screen.getByText(item?.description ?? "")).toBeVisible()
    }

    const source = readFileSync("components/gallery-section.tsx", "utf8")
    const globalStyles = readFileSync("app/globals.css", "utf8")

    expect(source).toContain('import Image from "next/image"')
    expect(source).not.toContain("<img")
    expect(source).not.toContain("carousel")
    expect(source).not.toContain("hover:-translate")
    expect(source).not.toContain("hover:scale")
    expect(source).not.toContain("group-hover:scale")
    expect(source).not.toContain("transition-all")
    expect(source).not.toContain("duration-300")
    expect(source).not.toContain("duration-500")
    expect(source).not.toContain("duration-700")
    expect(source).not.toContain("useState")
    expect(source).not.toContain('"use client"')
    expect(source).not.toContain("ChevronDown")
    expect(source).not.toContain("aria-expanded")
    expect(source).not.toContain("aria-controls")
    expect(globalStyles).not.toContain(".gallery-card:hover .gallery-image")
    expect(globalStyles).not.toContain(".gallery-image {")
  })
})
