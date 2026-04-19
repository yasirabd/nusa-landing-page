# Rencana Revisi Form Pendaftaran & Database

Dokumen ini merinci perubahan yang diperlukan pada komponen `registration-form-page.tsx` dan skema tabel Supabase `registrations` untuk mengakomodasi field pendaftaran yang baru dan lebih lengkap.

---

## User Review Required

> [!IMPORTANT]
> Tabel `registrations` yang sudah ada di Supabase akan **diubah skemanya** (kolom baru ditambahkan, kolom lama dihapus) dan **seluruh data dummy akan dihapus** sebelum migrasi dijalankan.

> [!NOTE]
> Field `no_whatsapp` yang ada saat ini akan diganti menjadi `nomor_whatsapp` agar lebih konsisten dengan penamaan field baru.

---

## Proposed Changes

### 1. Database: Tabel `registrations` (Supabase)

#### Skema Kolom Baru

| Kolom | Tipe | Constraint | Keterangan |
|---|---|---|---|
| `id` | `uuid` | PK, autogenerate | Tidak berubah |
| `created_at` | `timestamptz` | default `now()` | Tidak berubah |
| `nama_lengkap` | `text` | NOT NULL | Ganti dari `nama` |
| `nomor_whatsapp` | `text` | NOT NULL | Ganti dari `no_whatsapp` |
| `tempat_lahir` | `text` | NOT NULL | **Baru** |
| `tanggal_lahir` | `date` | NOT NULL | **Baru** |
| `asal_kota` | `text` | NOT NULL | **Baru** |
| `alamat_lengkap` | `text` | NOT NULL | **Baru** |
| `sekolah_asal` | `text` | NOT NULL | **Baru** |
| `lokasi_sekolah` | `text` | NOT NULL | **Baru** |
| `sumber_informasi` | `text` | NOT NULL | **Baru** — nilai dari pilihan list |
| `pilihan_program` | `text` | NOT NULL | Tidak berubah |
| `bukti_transfer_url` | `text` | NOT NULL | Tidak berubah |
| `pernyataan_setuju` | `boolean` | NOT NULL, default `true` | Tidak berubah |
| `status` | `text` | default `'pending'` | Tidak berubah |

#### Langkah Migrasi SQL
1. **Hapus semua data dummy**: `TRUNCATE TABLE registrations RESTART IDENTITY CASCADE;`
2. **Drop kolom lama** yang diganti namanya: `nama`, `no_whatsapp`
3. **Add kolom baru**: `nama_lengkap`, `nomor_whatsapp`, `tempat_lahir`, `tanggal_lahir`, `asal_kota`, `alamat_lengkap`, `sekolah_asal`, `lokasi_sekolah`, `sumber_informasi`
4. **RLS policies** yang sudah ada tetap dipertahankan

---

### 2. Frontend: `components/registration-form-page.tsx`

#### [MODIFY] Zod Schema

Tambahkan field baru dan rename field lama:

```typescript
const schema = z.object({
  // A. Personal Information
  namaLengkap: z.string().min(3, "Nama lengkap minimal 3 karakter"),
  nomorWhatsapp: z.string().regex(/^62\d{8,13}$/, "Format: 628xxxxxxxxx"),
  tempatLahir: z.string().min(2, "Tempat lahir wajib diisi"),
  tanggalLahir: z.string().min(1, "Tanggal lahir wajib diisi"),
  asalKota: z.string().min(2, "Asal kota wajib diisi"),
  alamatLengkap: z.string().min(10, "Alamat lengkap minimal 10 karakter"),

  // B. School Information
  sekolahAsal: z.string().min(3, "Nama sekolah minimal 3 karakter"),
  lokasiSekolah: z.string().min(2, "Lokasi sekolah wajib diisi"),

  // C. Tambahan Informasi
  sumberInformasi: z.string().min(1, "Pilih sumber informasi"),
  pilihanProgram: z.string().min(1, "Pilih program terlebih dahulu"),

  // D. Pembayaran
  buktTransfer: z.any()...
  pernyataan: z.literal(true, ...)
})
```

#### [MODIFY] Layout Form — 4 Seksi Bergaya Card-Group

Struktur form diubah menjadi 4 grup dengan judul seksi masing-masing:

**A. Informasi Pribadi**
- `namaLengkap` → TextInput
- `nomorWhatsapp` → TextInput dengan prefix `+62` visual
- `tempatLahir` → TextInput
- `tanggalLahir` → `<input type="date">` styled
- `asalKota` → TextInput
- `alamatLengkap` → `<textarea>` styled (multiline)

**B. Informasi Sekolah**
- `sekolahAsal` → TextInput
- `lokasiSekolah` → TextInput

**C. Tambahan Informasi**
- `sumberInformasi` → `<select>` dropdown bergaya custom dengan opsi:
  - Sosial Media
  - Iklan Digital (Iklan FB/IG, Sponsored Post, dll)
  - Iklan Offline (Brosur, Spanduk, dll)
  - Acara Sekolah
  - Rekomendasi dari Orangtua / Saudara
  - Rekomendasi dari Guru / Sekolah
  - Teman / Komunitas
  - Berita / Artikel / Media Online
  - Lainnya
  - Tidak Ada
- `pilihanProgram` → ProgramSelector card (sudah ada, dipertahankan)

**D. Pembayaran Pendaftaran**
- Info box panduan infaq (sudah ada)
- `buktTransfer` → Upload area (sudah ada)
- `pernyataan` → Checkbox (sudah ada)

#### [MODIFY] Tombol Submit
- Teks diubah dari `"Submit"` / `"Mengirim..."` menjadi `"Register"` / `"Mendaftar..."`

#### [MODIFY] `onSubmit` — Mapping Field ke Supabase
Sesuaikan field mapping dengan kolom baru:

```typescript
await supabase.from("registrations").insert({
  nama_lengkap: data.namaLengkap,
  nomor_whatsapp: data.nomorWhatsapp,
  tempat_lahir: data.tempatLahir,
  tanggal_lahir: data.tanggalLahir,
  asal_kota: data.asalKota,
  alamat_lengkap: data.alamatLengkap,
  sekolah_asal: data.sekolahAsal,
  lokasi_sekolah: data.lokasiSekolah,
  sumber_informasi: data.sumberInformasi,
  pilihan_program: data.pilihanProgram,
  bukti_transfer_url: filePath,
  pernyataan_setuju: true,
  status: "pending",
})
```

---

## Verification Plan

### Automated / Dev
- Pastikan tidak ada TypeScript error (`tsc --noEmit` atau dev server tidak error)
- Pastikan semua field memiliki validasi Zod yang tepat

### Manual Verification
1. Buka `http://localhost:3000/daftar`
2. Isi semua field di setiap seksi (A, B, C, D)
3. Upload bukti transfer (gambar/PDF)
4. Centang pernyataan
5. Klik tombol **Register**
6. Pastikan Success UI tampil dengan pesan admin akan menghubungi
7. Cek di Supabase Dashboard → Table Editor → `registrations`: baris baru muncul dengan semua kolom terisi
8. Cek di Supabase Dashboard → Storage → `payment_receipts`: file upload tersimpan
