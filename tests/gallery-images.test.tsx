import { readFileSync } from "node:fs"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { GallerySection } from "@/components/gallery-section"

const galleryItems = [
  {
    name: "MPLS",
    image: "/images/gallery-1-mpls.webp",
    width: 1280,
    height: 720,
    mobileWidth: 640,
  },
  {
    name: "Bersukaria: City Tour Mataram",
    image: "/images/gallery-2-bersukaria-mataram.webp",
    width: 1280,
    height: 960,
    mobileWidth: 640,
  },
  {
    name: "IT Camp",
    image: "/images/gallery-3-itcamp.webp",
    width: 1280,
    height: 720,
    mobileWidth: 640,
  },
  {
    name: "IT Camp: Outbond",
    image: "/images/gallery-4-itcamp.webp",
    width: 1280,
    height: 720,
    mobileWidth: 640,
  },
  {
    name: "NUSA Mengajar",
    image: "/images/gallery-5-nusa-mengajar.webp",
    width: 1280,
    height: 720,
    mobileWidth: 640,
  },
  {
    name: "Bersukaria: City Tour Legend Culinary (English)",
    image: "/images/gallery-6-bersukaria-jajan.webp",
    width: 1280,
    height: 720,
    mobileWidth: 640,
  },
  {
    name: "Google I/O Extended Semarang",
    image: "/images/gallery-7-googleio.webp",
    width: 1280,
    height: 848,
    mobileWidth: 640,
  },
  {
    name: "Talking to Stranger",
    image: "/images/gallery-8-talk-with-stranger.webp",
    width: 1280,
    height: 960,
    mobileWidth: 640,
  },
  {
    name: "Takziah Tetangga",
    image: "/images/gallery-9-takziyah.webp",
    width: 1280,
    height: 720,
    mobileWidth: 640,
  },
  {
    name: "Jualan di Market Day",
    image: "/images/gallery-10-jualan.webp",
    width: 1280,
    height: 960,
    mobileWidth: 640,
  },
  {
    name: "Jualan di Car Free Day",
    image: "/images/gallery-11-jualan-cfd.webp",
    width: 960,
    height: 1280,
    mobileWidth: 480,
  },
  {
    name: "Leadership Camp",
    image: "/images/gallery-12-camp.webp",
    width: 1280,
    height: 960,
    mobileWidth: 640,
  },
] as const

const gallerySizes =
  "(max-width: 767px) calc(100vw - 2rem), (max-width: 1279px) calc(50vw - 3rem), 584px"

function getImageSourcePath(image: HTMLElement) {
  const source = new URL(image.getAttribute("src") ?? "", "http://localhost")

  return source.pathname === "/_next/image" ? source.searchParams.get("url") : source.pathname
}

describe("optimized gallery rendering", () => {
  it("renders 12 descriptive responsive WebP images", () => {
    render(<GallerySection />)

    expect(screen.getAllByRole("img")).toHaveLength(12)

    for (const item of galleryItems) {
      const image = screen.getByRole("img", { name: item.name })
      expect(getImageSourcePath(image)).toBe(item.image)
      expect(image).toHaveAttribute("width", String(item.width))
      expect(image).toHaveAttribute("height", String(item.height))
      expect(image).toHaveAttribute("sizes", gallerySizes)
    }
  })

  it("provides a real responsive WebP source set without the Next image optimizer", () => {
    const { container } = render(<GallerySection />)
    const sources = container.querySelectorAll("picture source[type='image/webp']")

    expect(sources).toHaveLength(12)

    for (const item of galleryItems) {
      const source = container.querySelector(`article[aria-label="${item.name}"] source`)
      expect(source).toHaveAttribute(
        "srcset",
        `${item.image.replace(".webp", "-640.webp")} ${item.mobileWidth}w, ${item.image} ${item.width}w`,
      )
      expect(source).toHaveAttribute("sizes", gallerySizes)
    }
  })

  it("uses Next Image and restrained motion classes", () => {
    const source = readFileSync("components/gallery-section.tsx", "utf8")
    const globalStyles = readFileSync("app/globals.css", "utf8")

    expect(source).toContain('import Image from "next/image"')
    expect(source).not.toContain("<img")
    expect(source).not.toContain("transition-all")
    expect(source).not.toContain("duration-500")
    expect(source).not.toContain("duration-700")
    expect(source).toContain("gallery-card")
    expect(source).toContain("gallery-image")
    expect(globalStyles).toContain("@media (hover: hover) and (pointer: fine)")
    expect(globalStyles).toContain(".gallery-card:hover .gallery-image")
    expect(globalStyles).toContain("@media (prefers-reduced-motion: reduce)")
    expect(globalStyles).toContain("transform: none !important")
  })
})
