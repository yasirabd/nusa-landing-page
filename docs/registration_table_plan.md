# Rencana Implementasi Database Form Pendaftaran

Rencana ini menjelaskan struktur tabel Supabase dan Storage Bucket yang dibutuhkan untuk menyimpan data dari halaman form pendaftaran (`components/registration-form-page.tsx`).

## User Review Required

> [!NOTE]
> **Keputusan Workflow WhatsApp (Telah Dikonfirmasi)**
> Alur pengalihan ke WhatsApp secara otomatis dihapus. Form hanya akan menyimpan data ke database Supabase dan menampilkan *Success UI* di website yang menginformasikan bahwa Admin NUSA akan segera menghubungi pendaftar.

> [!TIP]
> **Autentikasi (RLS - Row Level Security)**
> Karena ini adalah form pendaftaran publik (tanpa login), kita harus mengatur kebijakan (policy) RLS di tabel dan storage agar semua orang (anon) hanya bisa melakukan INSERT, tapi tidak bisa membaca data pendaftar lain (SELECT).

## Proposed Changes

### 1. Supabase Database: Tabel `registrations`
Tabel ini akan menyimpan seluruh data teks pendaftaran santri. Berdasarkan validasi Zod schema, field yang dibutuhkan adalah:

- `id`: `uuid` (Primary Key, autogenerate)
- `created_at`: `timestamp with time zone` (autogenerate)
- `nama`: `text` (Not Null)
- `no_whatsapp`: `text` (Not Null)
- `pilihan_program`: `text` (Not Null)
- `bukti_transfer_url`: `text` (Not Null) — Berisi path/URL file yang diunggah ke storage.
- `pernyataan_setuju`: `boolean` (Not Null, default `true`)
- `status`: `text` (default `'pending'`) — *Tambahan opsional yang sangat berguna untuk Admin mengelola pendaftar (pending, verified, rejected).*

### 2. Supabase Storage: Bucket `payment_receipts`
File unggahan (`buktTransfer`) bertipe gambar/PDF dengan maksimal ukuran 10MB. Data ini tidak bisa disimpan langsung ke tabel database biasa.
- Kita akan membuat bucket publik (atau private) bernama `payment_receipts`.
- File akan diunggah ke sini terlebih dahulu, kemudian path file-nya (`/payment_receipts/id-file.png`) akan disimpan ke kolom `bukti_transfer_url` di tabel `registrations`.

### 3. Perubahan pada Frontend

#### [MODIFY] components/registration-form-page.tsx
- Modifikasi fungsi `onSubmit` untuk melakukan proses asinkron berikut:
  1. Mengunggah file bukti transfer ke bucket `payment_receipts` menggunakan *Supabase Client*.
  2. Mendapatkan path/URL dari file yang berhasil diunggah.
  3. Menyimpan data formulir (`nama`, `noWhatsapp`, dll) beserta URL file tersebut ke dalam tabel `registrations`.
  4. Menangani state *loading* (`isSubmitting`) dan error handling jika proses ke database gagal.
  5. Mengubah tampilan *Success UI* bawaan untuk menginformasikan bahwa "Data berhasil disimpan dan Admin akan segera menghubungi Anda" (menghilangkan tombol/redirect ke WhatsApp).

## Verification Plan

### Manual Verification
1. Menjalankan SQL query di dashboard Supabase untuk membuat tabel dan bucket.
2. Mencoba mengisi form secara langsung di `http://localhost:3000/daftar`.
3. Memastikan gambar/PDF masuk ke *Storage Bucket*.
4. Memastikan data teks dan referensi gambar masuk ke *Table* `registrations`.
5. Memastikan tidak ada *error TypeScript* (TS) atau *unhandled promise rejections*.
