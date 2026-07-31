import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest"
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react"
import { readFileSync } from "node:fs"
import { RegistrationFormPage } from "@/components/registration-form-page"
import { REGISTRATION_DRAFT_KEY } from "@/components/registration/registration-schema"

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

beforeEach(() => {
  supabaseMocks.upload.mockResolvedValue({ error: null })
  supabaseMocks.insert.mockResolvedValue({ error: null })
  supabaseMocks.remove.mockResolvedValue({ error: null })
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

function fillSchoolStep() {
  fireEvent.change(screen.getByLabelText(/Sekolah Asal/), {
    target: { value: "SMPN 1 Semarang" },
  })
  fireEvent.change(screen.getByLabelText(/Lokasi Sekolah/), {
    target: { value: "Kota Semarang, Jawa Tengah" },
  })
  fireEvent.change(screen.getByLabelText(/Dari mana kamu tahu tentang NUSA/), {
    target: { value: "Sosial Media" },
  })
  fireEvent.click(screen.getByRole("radio", { name: /Programmer/ }))
}

async function reachPaymentStep() {
  fillPersonalStep()
  fireEvent.click(
    screen.getByRole("button", { name: "Lanjutkan ke Sekolah dan Program" }),
  )
  await screen.findByRole("heading", { level: 2, name: "Sekolah dan Program" })
  fillSchoolStep()
  fireEvent.click(
    screen.getByRole("button", {
      name: "Lanjutkan ke Pembayaran dan Konfirmasi",
    }),
  )
  await screen.findByRole("heading", {
    level: 2,
    name: "Pembayaran dan Konfirmasi",
  })
}

async function submitCompletedWizard() {
  await reachPaymentStep()
  const receipt = new File(["receipt"], "receipt.pdf", {
    type: "application/pdf",
  })
  fireEvent.change(
    screen.getByLabelText(/Upload Bukti Transfer/, { selector: "input" }),
    { target: { files: [receipt] } },
  )
  fireEvent.click(screen.getByLabelText(/uang yang sudah ditransfer/i))
  fireEvent.click(screen.getByRole("button", { name: "Kirim Pendaftaran" }))
}

describe("registration wizard", () => {
  it("states male-student eligibility before form entry", () => {
    render(<RegistrationFormPage />)

    expect(
      screen.getByText("Pendaftaran hanya untuk calon santri laki-laki."),
    ).toBeVisible()
    expect(
      screen.getByText(
        "Lengkapi data identitas calon santri. Estimasi waktu 2 menit.",
      ),
    ).toBeVisible()
    expect(
      screen.queryByText(/Bagian ini biasanya selesai dalam sekitar 2 menit/),
    ).not.toBeInTheDocument()
  })

  it("shows the current SPMB 2027/2028 intake", () => {
    render(<RegistrationFormPage />)

    expect(
      screen.getByText(/NUSA Boarding School.*SPMB 2027\/2028/),
    ).toBeVisible()
  })

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

  it("restores a safe draft at no later than step two", async () => {
    localStorage.setItem(
      REGISTRATION_DRAFT_KEY,
      JSON.stringify({
        version: 1,
        step: 2,
        values: {
          namaLengkap: "Muhammad Abdullah",
          nomorWhatsapp: "6281234567890",
          tempatLahir: "Semarang",
          tanggalLahir: "2010-01-15",
          asalKota: "Kota Semarang",
          alamatLengkap: "Jalan Pemuda nomor 10, Kota Semarang",
          sekolahAsal: "SMPN 1 Semarang",
          lokasiSekolah: "Kota Semarang, Jawa Tengah",
          sumberInformasi: "Sosial Media",
          pilihanProgram: "programmer",
        },
      }),
    )

    render(<RegistrationFormPage />)

    expect(await screen.findByText("Langkah 2 dari 3")).toBeVisible()
    expect(screen.getByLabelText(/Sekolah Asal/)).toHaveValue("SMPN 1 Semarang")
    expect(screen.getByRole("status")).toHaveTextContent("Draft pendaftaran dipulihkan")
  })

  it("reminds restored applicants to select the receipt again", async () => {
    localStorage.setItem(
      REGISTRATION_DRAFT_KEY,
      JSON.stringify({
        version: 1,
        step: 2,
        values: {
          namaLengkap: "Muhammad Abdullah",
          nomorWhatsapp: "6281234567890",
          tempatLahir: "Semarang",
          tanggalLahir: "2010-01-15",
          asalKota: "Kota Semarang",
          alamatLengkap: "Jalan Pemuda nomor 10, Kota Semarang",
          sekolahAsal: "SMPN 1 Semarang",
          lokasiSekolah: "Kota Semarang, Jawa Tengah",
          sumberInformasi: "Sosial Media",
          pilihanProgram: "programmer",
        },
      }),
    )
    render(<RegistrationFormPage />)

    fireEvent.click(
      await screen.findByRole("button", {
        name: "Lanjutkan ke Pembayaran dan Konfirmasi",
      }),
    )

    expect(
      await screen.findByText(/pilih kembali bukti transfer/i),
    ).toBeVisible()
  })

  it("persists ordinary field values without receipt or consent", async () => {
    render(<RegistrationFormPage />)
    fireEvent.change(screen.getByLabelText(/Nama Lengkap/), {
      target: { value: "Muhammad Abdullah" },
    })

    await waitFor(() => {
      const saved = JSON.parse(localStorage.getItem(REGISTRATION_DRAFT_KEY) ?? "null")
      expect(saved.values.namaLengkap).toBe("Muhammad Abdullah")
      expect(saved.values).not.toHaveProperty("buktTransfer")
      expect(saved.values).not.toHaveProperty("pernyataan")
    })
  })

  it("asks before deleting entered data", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {})
    render(<RegistrationFormPage />)

    fireEvent.click(screen.getByRole("button", { name: "Reset Form" }))

    expect(
      screen.getByRole("alertdialog", { name: "Hapus data pendaftaran?" }),
    ).toBeVisible()
    expect(screen.getByRole("button", { name: "Batal" })).toBeVisible()
    expect(screen.getByRole("button", { name: "Ya, hapus data" })).toBeVisible()
    expect(consoleError.mock.calls.flat().join(" ")).not.toContain(
      "Function components cannot be given refs",
    )
    consoleError.mockRestore()
  })

  it("clears the browser draft only after reset is confirmed", async () => {
    render(<RegistrationFormPage />)
    fireEvent.change(screen.getByLabelText(/Nama Lengkap/), {
      target: { value: "Muhammad Abdullah" },
    })
    await waitFor(() =>
      expect(localStorage.getItem(REGISTRATION_DRAFT_KEY)).not.toBeNull(),
    )

    fireEvent.click(screen.getByRole("button", { name: "Reset Form" }))
    fireEvent.click(screen.getByRole("button", { name: "Ya, hapus data" }))

    await waitFor(() => {
      expect(localStorage.getItem(REGISTRATION_DRAFT_KEY)).toBeNull()
      expect(screen.getByLabelText(/Nama Lengkap/)).toHaveValue("")
    })
  })

  it("shows a readable final summary with edit actions", async () => {
    render(<RegistrationFormPage />)
    await reachPaymentStep()

    const summary = screen.getByRole("region", { name: "Ringkasan pendaftaran" })
    expect(within(summary).getByText("Muhammad Abdullah")).toBeVisible()
    expect(within(summary).getByText("SMPN 1 Semarang")).toBeVisible()
    expect(within(summary).getByText("Programmer")).toBeVisible()

    fireEvent.click(
      within(summary).getByRole("button", { name: "Ubah Data Calon Santri" }),
    )
    expect(
      await screen.findByRole("heading", { level: 2, name: "Data Calon Santri" }),
    ).toBeVisible()
  })

  it("does not call Supabase before the final valid submission", async () => {
    render(<RegistrationFormPage />)
    await reachPaymentStep()

    expect(supabaseMocks.upload).not.toHaveBeenCalled()
    expect(supabaseMocks.insert).not.toHaveBeenCalled()

    fireEvent.click(screen.getByRole("button", { name: "Kirim Pendaftaran" }))
    expect(await screen.findByText("Bukti transfer wajib diupload")).toBeVisible()
    expect(supabaseMocks.upload).not.toHaveBeenCalled()
  })

  it("uploads the receipt and inserts the registration after confirmation", async () => {
    render(<RegistrationFormPage />)
    await submitCompletedWizard()

    await waitFor(() => expect(supabaseMocks.upload).toHaveBeenCalledTimes(1))
    expect(supabaseMocks.upload).toHaveBeenCalledWith(
      expect.stringMatching(/\.pdf$/),
      expect.any(File),
      { contentType: "application/pdf", upsert: false },
    )
    expect(supabaseMocks.insert).toHaveBeenCalledWith(
      expect.objectContaining({
        nama_lengkap: "Muhammad Abdullah",
        sekolah_asal: "SMPN 1 Semarang",
        pilihan_program: "programmer",
        pernyataan_setuju: true,
      }),
    )
    expect(await screen.findByText("Pendaftaran Berhasil!")).toBeVisible()
    expect(localStorage.getItem(REGISTRATION_DRAFT_KEY)).toBeNull()
  })

  it("removes an uploaded receipt when database insertion fails", async () => {
    supabaseMocks.insert.mockResolvedValueOnce({
      error: { message: "insert failed" },
    })
    render(<RegistrationFormPage />)
    await submitCompletedWizard()

    await waitFor(() =>
      expect(supabaseMocks.remove).toHaveBeenCalledWith([expect.stringMatching(/\.pdf$/)]),
    )
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Gagal menyimpan data pendaftaran: insert failed",
    )
    expect(
      screen.getByRole("heading", { level: 2, name: "Pembayaran dan Konfirmasi" }),
    ).toBeVisible()
  })

  it("defines restrained responsive interaction styles", () => {
    const css = readFileSync("app/globals.css", "utf8")
    const pageSource = readFileSync("components/registration-form-page.tsx", "utf8")

    expect(css).toContain(".registration-action")
    expect(css).toContain("transition: background-color 150ms")
    expect(css).toContain("transform: scale(0.97)")
    expect(css).toContain("@media (hover: hover) and (pointer: fine)")
    expect(css).toContain("@media (prefers-reduced-motion: reduce)")
    expect(css).not.toMatch(/\.registration-action\s*\{[^}]*transition:\s*all/)
    const finePointerStart = css.lastIndexOf(
      "@media (hover: hover) and (pointer: fine)",
    )
    const reducedMotionStart = css.lastIndexOf(
      "@media (prefers-reduced-motion: reduce)",
    )
    const finePointerStyles = css.slice(finePointerStart, reducedMotionStart)
    const reducedMotionStyles = css.slice(reducedMotionStart)

    expect(finePointerStyles).toContain(
      ".registration-action-primary:hover:not(:disabled)",
    )
    expect(finePointerStyles).toContain(
      ".registration-action-secondary:hover:not(:disabled)",
    )
    expect(reducedMotionStyles).toContain(".registration-action:active:not(:disabled)")
    expect(reducedMotionStyles).toContain("transform: none")
    expect(css.indexOf(".registration-action {")).toBeLessThan(reducedMotionStart)
    expect(pageSource).toContain("registration-actions sticky bottom-0")
    expect(pageSource).toContain("sm:static")
    expect(css).toContain("env(safe-area-inset-bottom)")
    expect(pageSource).not.toContain("transition-all")
  })

  it("uses SPMB 2027/2028 in registration metadata", () => {
    const metadataSource = readFileSync("app/daftar/page.tsx", "utf8")

    expect(metadataSource).toContain("SPMB 2027/2028")
    expect(metadataSource).not.toContain("2026-2027")
  })
})
