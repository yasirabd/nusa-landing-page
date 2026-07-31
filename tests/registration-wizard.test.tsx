import { afterEach, beforeAll, describe, expect, it, vi } from "vitest"
import { fireEvent, render, screen, within } from "@testing-library/react"
import { RegistrationFormPage } from "@/components/registration-form-page"

const supabaseMocks = vi.hoisted(() => ({
  upload: vi.fn(),
  remove: vi.fn(),
  insert: vi.fn(),
}))

vi.mock("@/utils/supabase/client", () => ({
  createClient: () => ({
    storage: {
      from: () => ({
        upload: supabaseMocks.upload,
        remove: supabaseMocks.remove,
      }),
    },
    from: () => ({ insert: supabaseMocks.insert }),
  }),
}))

beforeAll(() => {
  Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
    configurable: true,
    value: vi.fn(),
  })
})

afterEach(() => {
  localStorage.clear()
  vi.clearAllMocks()
})

function fillPersonalStep() {
  fireEvent.change(screen.getByLabelText(/Nama Lengkap/), {
    target: { value: "Muhammad Abdullah" },
  })
  fireEvent.change(screen.getByLabelText(/Nomor WhatsApp/), {
    target: { value: "6281234567890" },
  })
  fireEvent.change(screen.getByLabelText(/Tempat Lahir/), {
    target: { value: "Semarang" },
  })
  fireEvent.change(screen.getByLabelText(/Tanggal Lahir/), {
    target: { value: "2010-01-15" },
  })
  fireEvent.change(screen.getByLabelText(/Asal Kota/), {
    target: { value: "Kota Semarang" },
  })
  fireEvent.change(screen.getByLabelText(/Alamat Lengkap/), {
    target: { value: "Jalan Pemuda nomor 10, Kota Semarang" },
  })
}

describe("registration wizard", () => {
  it("shows exactly three steps and starts on Data Calon Santri", () => {
    render(<RegistrationFormPage />)

    expect(screen.getByText("Langkah 1 dari 3")).toBeVisible()
    expect(
      screen.getByRole("heading", { level: 2, name: "Data Calon Santri" }),
    ).toBeVisible()
    const progress = screen.getByRole("navigation", { name: "Progres pendaftaran" })
    expect(within(progress).getByText("Data Calon Santri")).toHaveAttribute(
      "aria-current",
      "step",
    )
    expect(screen.getAllByRole("listitem")).toHaveLength(3)
    expect(
      screen.queryByText("Panduan Pembayaran Infaq Pendaftaran"),
    ).not.toBeInTheDocument()
  })

  it("validates the active step and focuses its first invalid field", async () => {
    render(<RegistrationFormPage />)

    fireEvent.click(
      screen.getByRole("button", { name: "Lanjutkan ke Sekolah dan Program" }),
    )

    expect(await screen.findByText("Nama lengkap minimal 3 karakter")).toBeVisible()
    expect(screen.getByLabelText(/Nama Lengkap/)).toHaveFocus()
    expect(screen.getByText("Langkah 1 dari 3")).toBeVisible()
  })

  it("preserves values when moving backward", async () => {
    render(<RegistrationFormPage />)
    fillPersonalStep()

    fireEvent.click(
      screen.getByRole("button", { name: "Lanjutkan ke Sekolah dan Program" }),
    )

    expect(
      await screen.findByRole("heading", { level: 2, name: "Sekolah dan Program" }),
    ).toBeVisible()

    fireEvent.click(
      screen.getByRole("button", { name: "Kembali ke Data Calon Santri" }),
    )

    expect(screen.getByLabelText(/Nama Lengkap/)).toHaveValue("Muhammad Abdullah")
  })
})
