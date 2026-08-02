import { readFileSync } from "node:fs"
import { fireEvent, render, screen } from "@testing-library/react"
import { renderToStaticMarkup } from "react-dom/server"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { Header } from "@/components/header"

let pathname = "/"

vi.mock("next/navigation", () => ({
  usePathname: () => pathname,
}))

describe("Header", () => {
  beforeEach(() => {
    pathname = "/"
  })

  it("renders all destinations and the registration CTA", () => {
    render(<Header />)

    expect(screen.getAllByRole("link", { name: "Program" })[0]).toHaveAttribute(
      "href",
      "#program",
    )
    expect(screen.getAllByRole("link", { name: "FAQ" })[0]).toHaveAttribute(
      "href",
      "#faq",
    )
    expect(screen.getByRole("link", { name: "Daftar Sekarang" })).toHaveAttribute(
      "href",
      "/daftar",
    )
  })

  it("provides a keyboard shortcut to the landing content", () => {
    render(<Header />)

    expect(
      screen.getByRole("link", { name: "Lewati ke konten utama" }),
    ).toHaveAttribute("href", "#main-content")
    for (const page of [
      "app/page.tsx",
      "app/daftar/page.tsx",
      "app/test/page.tsx",
      "app/test/kepribadian/page.tsx",
      "app/test/penjurusan/page.tsx",
      "app/test/selesai/page.tsx",
    ]) {
      expect(readFileSync(page, "utf8")).toContain('<main id="main-content"')
    }
  })

  it("opens an accessible mobile navigation sheet", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {})
    render(<Header />)

    const trigger = screen.getByRole("button", { name: "Buka menu navigasi" })
    expect(trigger).toHaveAttribute("aria-expanded", "false")

    fireEvent.click(trigger)

    expect(screen.getByRole("dialog")).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { name: "Navigasi utama" }),
    ).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Close" })).toHaveClass("size-11")
    expect(consoleError).not.toHaveBeenCalled()
    consoleError.mockRestore()
  })

  it("closes the mobile sheet after selecting a destination", () => {
    render(<Header />)

    fireEvent.click(screen.getByRole("button", { name: "Buka menu navigasi" }))
    const dialog = screen.getByRole("dialog")
    fireEvent.click(dialog.querySelector('a[href="#program"]') as HTMLAnchorElement)

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })

  it("renders a no-JavaScript mobile navigation fallback", () => {
    const markup = renderToStaticMarkup(<Header />)

    expect(markup).toContain("<noscript")
    expect(markup).toContain("Navigasi tanpa JavaScript")
    expect(markup).toContain('href="#program"')
    expect(markup).toContain('href="#faq"')
  })

  it("links secondary pages back to homepage sections", () => {
    pathname = "/daftar"
    render(<Header />)

    expect(screen.getAllByRole("link", { name: "Biaya" })[0]).toHaveAttribute(
      "href",
      "/#biaya",
    )
  })
})
