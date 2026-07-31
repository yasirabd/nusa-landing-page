import { createHash } from "node:crypto"
import { execFileSync } from "node:child_process"
import { existsSync, readFileSync, statSync } from "node:fs"
import path from "node:path"
import { describe, expect, it } from "vitest"
import { GALLERY_ITEMS } from "@/components/gallery-content"

const imageDirectory = path.resolve("public/images")
const maxDeliveredBytes = 500 * 1024
const maxGalleryBytes = 3 * 1024 * 1024

const galleryAssets = [
  "gallery-1-mpls.webp",
  "gallery-2-bersukaria-mataram.webp",
  "gallery-3-itcamp.webp",
  "gallery-4-itcamp.webp",
  "gallery-5-nusa-mengajar.webp",
  "gallery-6-bersukaria-jajan.webp",
  "gallery-7-googleio.webp",
  "gallery-8-talk-with-stranger.webp",
  "gallery-9-takziyah.webp",
  "gallery-10-jualan.webp",
  "gallery-11-jualan-cfd.webp",
  "gallery-12-camp.webp",
] as const

const galleryMobileAssets = galleryAssets.map((filename) => filename.replace(".webp", "-640.webp"))

const sourceAssets = [
  "nusa-hero-image.png",
  "gallery-1-mpls.jpg",
  "gallery-2-bersukaria-mataram.jpg",
  "gallery-3-itcamp.jpg",
  "gallery-4-itcamp.jpg",
  "gallery-5-nusa-mengajar.jpg",
  "gallery-6-bersukaria-jajan.jpg",
  "gallery-7-googleio.png",
  "gallery-8-talk-with-stranger.jpg",
  "gallery-9-takziyah.jpg",
  "gallery-10-jualan.jpg",
  "gallery-11-jualan-cfd.jpeg",
  "gallery-12-camp.jpg",
] as const

function assetPath(filename: string) {
  return path.join(imageDirectory, filename)
}

function sha256(filename: string) {
  return createHash("sha256").update(readFileSync(assetPath(filename))).digest("hex").toUpperCase()
}

function dimensions(filename: string) {
  return execFileSync(
    "ffprobe",
    [
      "-v",
      "error",
      "-select_streams",
      "v:0",
      "-show_entries",
      "stream=width,height",
      "-of",
      "csv=s=x:p=0",
      assetPath(filename),
    ],
    { encoding: "utf8" },
  ).trim()
}

describe("optimized landing images", () => {
  it("keeps every original source image available", () => {
    for (const filename of sourceAssets) {
      expect(existsSync(assetPath(filename)), filename).toBe(true)
    }
  })

  it("keeps every original source image byte-for-byte unchanged", () => {
    const manifest = JSON.parse(
      readFileSync(path.resolve("scripts/landing-image-source-hashes.json"), "utf8"),
    ) as Record<string, string>

    for (const filename of sourceAssets) {
      expect(sha256(filename), filename).toBe(manifest[filename])
    }
  })

  it("keeps the optimized hero below 500 KB", () => {
    const heroPath = assetPath("nusa-hero-image.webp")

    expect(existsSync(heroPath)).toBe(true)
    expect(statSync(heroPath).size).toBeLessThanOrEqual(maxDeliveredBytes)
  })

  it("keeps every optimized gallery image below 500 KB", () => {
    for (const filename of [...galleryAssets, ...galleryMobileAssets]) {
      const filenamePath = assetPath(filename)
      expect(existsSync(filenamePath), filename).toBe(true)
      expect(statSync(filenamePath).size, filename).toBeLessThanOrEqual(maxDeliveredBytes)
    }
  })

  it("keeps the combined optimized gallery below 3 MB", () => {
    const totalBytes = galleryAssets.reduce(
      (total, filename) => total + statSync(assetPath(filename)).size,
      0,
    )

    expect(totalBytes).toBeLessThan(maxGalleryBytes)
  })

  it(
    "matches committed gallery metadata to the generated binaries",
    () => {
      for (const item of GALLERY_ITEMS) {
        expect(dimensions(path.basename(item.image)), item.image).toBe(
          `${item.width}x${item.height}`,
        )
        expect(dimensions(path.basename(item.image).replace(".webp", "-640.webp"))).toBe(
          `${item.mobileWidth}x${item.mobileHeight}`,
        )
      }

      expect(dimensions("nusa-hero-image.webp")).toBe("1200x794")
      expect(dimensions("nusa-hero-image-640.webp")).toBe("640x424")
    },
    15_000,
  )

  it("generates to validated temporary files before replacing committed assets", () => {
    const source = readFileSync("scripts/generate-landing-images.ps1", "utf8")

    expect(source).toContain("libwebp")
    expect(source).toContain(".tmp.webp")
    expect(source).toContain("Get-FileHash")
    expect(source).toContain("Move-Item")
  })
})
