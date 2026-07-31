import { fireEvent, render, screen } from "@testing-library/react"
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
    expect(consoleError).not.toHaveBeenCalled()
    consoleError.mockRestore()
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
