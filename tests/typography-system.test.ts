import { readFileSync, readdirSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"

function getSourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name)

    if (entry.isDirectory()) {
      return getSourceFiles(path)
    }

    return /\.(?:ts|tsx|css)$/.test(entry.name) ? [path] : []
  })
}

const applicationFiles = [
  ...getSourceFiles("app"),
  ...getSourceFiles("components"),
]
const applicationSource = applicationFiles
  .map((path) => readFileSync(path, "utf8"))
  .join("\n")

describe("NUSA typography system", () => {
  it("loads only the approved application, brand, and editorial fonts", () => {
    const layout = readFileSync("app/layout.tsx", "utf8")

    expect(layout).toContain('import { GeistSans } from "geist/font/sans"')
    expect(layout).toContain('import { Righteous } from "next/font/google"')
    expect(layout).toContain('variable: "--font-righteous"')
    expect(layout).toContain(
      "`${GeistSans.variable} ${righteous.variable} font-sans`",
    )

    for (const removedFont of [
      "Work_Sans",
      "V0_Font_Work_Sans",
      "Inter",
      "Inconsolata",
      "V0_Font_Inconsolata",
      "V0_Font_Noto_Serif",
      "Noto_Serif",
      "--font-noto-serif",
      "_v0_fontVariables",
    ]) {
      expect(layout).not.toContain(removedFont)
    }
  })

  it("maps global font tokens without weight overrides", () => {
    const styles = readFileSync("app/globals.css", "utf8")

    expect(styles).toContain("--font-sans: var(--font-geist-sans);")
    expect(styles).toContain('--font-serif: "Romulo", serif;')
    expect(styles).toContain("--font-mono: ui-monospace, SFMono-Regular")
    expect(styles).toContain('font-family: "Romulo";')
    expect(styles).toContain(
      'src: url("https://framerusercontent.com/assets/V6SPt5QT5vOzThTYDvKoxVfGcQ.woff2") format("woff2");',
    )
    expect(styles).not.toContain("--font-noto-serif")
    expect(styles).toMatch(
      /\.font-righteous\s*\{\s*font-family:\s*var\(--font-righteous\);\s*\}/,
    )

    for (const removedPattern of [
      ".font-bold {",
      ".font-extrabold {",
      ".font-black {",
      "--v0-font-work-sans",
      "--v0-font-inconsolata",
    ]) {
      expect(styles).not.toContain(removedPattern)
    }
  })

  it("uses the approved component-level font roles without changing copy", () => {
    expect(applicationSource).not.toContain("font-work-sans")

    for (const path of [
      "components/curriculum-section.tsx",
      "components/nusa-tagline.tsx",
      "components/footer.tsx",
      "components/registration-section.tsx",
    ]) {
      const source = readFileSync(path, "utf8")

      expect(source).toContain("font-serif")
      expect(source).toContain("italic")
      expect(source).toContain("font-normal")
      expect(source).not.toContain("font-serif italic font-medium")
    }

    expect(readFileSync("components/testimonials-section.tsx", "utf8")).toContain(
      "font-serif italic",
    )

    for (const copy of [
      "Muslim Tangguh, Jago IT",
      "Muslim Tangguh Jago IT",
      "Faith at Heart. Tech in Hand. Purpose in Action.",
      "Jadilah bagian dari",
    ]) {
      expect(applicationSource).toContain(copy)
    }
  })

  it("keeps Righteous limited to NUSA brand marks", () => {
    const matches = Array.from(
      applicationSource.matchAll(
        /<span[^>]*className="[^"]*font-righteous[^"]*"[^>]*>([\s\S]*?)<\/span>/g,
      ),
    )

    expect(matches.length).toBeGreaterThan(0)
    for (const match of matches) {
      expect(match[1]).toContain("NUSA")
    }
  })

  it("keeps restored Tailwind weights within the approved hierarchy", () => {
    expect(applicationSource).not.toContain("font-black")

    for (const path of applicationFiles) {
      if (
        path
          .replaceAll("\\", "/")
          .endsWith("components/nusa-tagline.tsx")
      ) {
        continue
      }

      const source = readFileSync(path, "utf8")
      expect(source).not.toMatch(/<h[2-4][^>]*font-extrabold/)
    }

    for (const path of ["app/test/page.tsx", "app/test/selesai/page.tsx"]) {
      const source = readFileSync(path, "utf8")
      expect(source).not.toMatch(/<span[^>]*font-extrabold/)
    }
  })
})
