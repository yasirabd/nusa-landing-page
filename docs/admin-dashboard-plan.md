# Admin Dashboard Plan

## Tujuan
Membangun fitur dashboard admin yang aman untuk memantau progres calon santri, mulai dari pendaftaran hingga penyelesaian tes, dengan akses login khusus admin melalui `/login` yang disembunyikan dari publik.

## Ruang Lingkup Fitur
1. Halaman login admin di `/login`.
2. Penguatan skema dan aturan akses Supabase untuk data admin.
3. Dashboard admin untuk memantau proses calon santri:
   - Sudah mendaftar.
   - Sudah mengerjakan tes.
   - Status perkembangan per calon santri.
4. Menyembunyikan akses `/login` dari pengguna umum.

---

## 1) Login Admin di `/login`

### Kebutuhan
- Admin bisa masuk lewat email/password (atau provider lain yang dipilih).
- Hanya akun berstatus admin yang bisa masuk ke dashboard.
- Setelah login sukses, redirect ke halaman dashboard admin.

### Rencana Implementasi
- Buat route `/login` dengan form autentikasi.
- Tambahkan validasi server-side untuk memastikan role pengguna adalah `admin`.
- Simpan session menggunakan mekanisme auth Supabase + middleware route protection.
- Buat route dashboard terproteksi, misalnya `/admin`.

### Deliverable
- UI login admin.
- Guard untuk route admin.
- Redirect login/logout yang konsisten.

---

## 2) Update Supabase untuk Fitur Admin

### Kebutuhan Data
- Entitas admin (mapping user -> role admin).
- Entitas calon santri (profil pendaftar).
- Entitas progress tes/seleksi (status tahapan).

### Rencana Perubahan Supabase
- Tambahkan atau pastikan tabel/kolom berikut tersedia:
  - `profiles` (id, email, full_name, role).
  - `registrations` (id, user_id, created_at, status_pendaftaran, dsb).
  - `student_tests` (existing) sebagai sumber status tes per pendaftar.
  - Opsional: buat `test_submissions_view` jika butuh format khusus dashboard tanpa mengubah tabel utama.
- Tetapkan nilai role admin pada akun yang berwenang.
- Buat/rapikan **Row Level Security (RLS)**:
  - Admin: bisa baca data monitoring yang diperlukan.
  - User biasa: hanya bisa baca/tulis data milik sendiri.
- Siapkan view/materialized view opsional untuk ringkasan dashboard (misalnya total pendaftar, total sudah tes).

### Deliverable
- Skema dan policy Supabase terdokumentasi.
- Query dashboard yang aman dan efisien.

---

## 3) Dashboard Monitoring Calon Santri

### Kebutuhan Tampilan
- Statistik utama:
  - Total pendaftar.
  - Total yang sudah mengerjakan tes.
  - Total yang belum mengerjakan tes.
- Tabel detail per calon santri:
  - Nama
  - Email
  - Tanggal daftar
  - Status pendaftaran
  - Status tes
  - Tanggal submit tes (jika ada)
- Filter minimum:
  - Berdasarkan status tes.
  - Berdasarkan rentang waktu pendaftaran.

### Rencana Implementasi
- Buat halaman `/admin` dengan komponen:
  - Summary cards.
  - Data table + filter.
- Ambil data dari Supabase via server component / server action / API route sesuai arsitektur saat ini.
- Tambahkan pagination jika data tumbuh besar.
- Tambahkan empty state + loading state.

### Deliverable
- Dashboard admin yang menampilkan progress calon santri secara real-time/near real-time.

---

## 4) Menyembunyikan Link `/login`

### Kebutuhan
- Link login admin tidak tampil pada navbar/footer/public page.
- Akses tetap bisa dilakukan oleh admin yang mengetahui URL.

### Rencana Implementasi
- Hapus/hindari penempatan link `/login` dari seluruh komponen publik.
- Tambahkan `robots` rule agar `/login` tidak diindeks mesin pencari:
  - Meta robots `noindex, nofollow` pada halaman login.
  - (Opsional) aturan tambahan di `robots.txt`.
- (Opsional) tambahkan rate limit / bot protection di endpoint login.

### Catatan Keamanan Penting
Menyembunyikan link **bukan** mekanisme keamanan utama. Keamanan utama tetap pada:
- autentikasi,
- otorisasi role admin,
- dan RLS Supabase.

### Deliverable
- `/login` tidak terekspos di UI publik.
- Proteksi tetap ketat meskipun URL diketahui orang lain.

---

## 5) Hal yang Sebelumnya Terlewat (Wajib Ditambahkan)

### A. Definisi Status Proses yang Baku
Agar dashboard benar-benar berguna, perlu kamus status yang konsisten end-to-end.

Contoh status minimum:
- `registered`
- `test_in_progress`
- `test_submitted`
- `passed`
- `failed`
- `follow_up`

**Output tambahan:** dokumen mapping status + aturan transisi status.

### B. Audit Trail Aktivitas Admin
Perubahan data penting oleh admin perlu jejak audit.

Minimal event yang dicatat:
- login admin berhasil/gagal,
- perubahan status calon santri,
- export data,
- perubahan catatan internal.

**Output tambahan:** tabel `admin_audit_logs` + retensi data log.

### C. Aksi Operasional di Dashboard
Dashboard saat ini baru “lihat data”. Biasanya admin juga perlu tindakan:
- update status manual,
- tambah catatan internal,
- assign PIC (opsional),
- trigger notifikasi lanjutan (opsional).

**Output tambahan:** daftar aksi + siapa yang berhak melakukannya.

### D. Search, Sort, dan Export Data
Filter saja biasanya belum cukup ketika data makin besar.

Tambahan minimum:
- pencarian nama/email,
- sorting tanggal daftar / status,
- export CSV untuk kebutuhan operasional.

### E. Pengamanan Login Lebih Lengkap
Selain hidden link, tambahkan kontrol keamanan:
- batas percobaan login,
- cooldown sementara,
- opsi 2FA untuk admin,
- notifikasi login mencurigakan (opsional).

### F. Observability dan Alerting
Perlu monitoring agar issue cepat terdeteksi:
- error rate query dashboard,
- gagal login berulang,
- latensi endpoint admin.

### G. Non-Functional Requirement (NFR)
Tetapkan target teknis:
- SLA/SLO akses dashboard,
- batas latensi halaman admin,
- pagination default,
- strategi indexing query utama.

### H. QA Matrix yang Lebih Rinci
Perlu testcase yang lebih spesifik, termasuk:
- role matrix (admin vs non-admin vs unauthenticated),
- data edge case (data kosong, duplikat, status tidak valid),
- uji keamanan akses URL langsung,
- uji performa saat data besar.

---


## 6) Standar UI Dashboard (Wajib Ikut `docs/style.md`)

### Prinsip Utama
Seluruh UI `/admin` wajib mengikuti style guide proyek agar konsisten dengan identitas brand.

### Aturan Implementasi UI
- **Color palette wajib** mengikuti palette resmi (Dark Base `#134146`, Primary `#2C8970`, Secondary `#42CDBA`, Accent `#F3B233`, Surface `#F0FAF7`, White `#F7F7F2`).
- **Dilarang** memperkenalkan warna baru di luar style guide untuk elemen utama dashboard.
- **Typography** wajib memakai `Work Sans` untuk heading, body, label, table, dan button.
- **Hierarchy**: heading tegas, body mudah dibaca, label/action jelas untuk kebutuhan operasional admin.
- **Layout**: data-heavy tetapi tetap clean; gunakan card + table dengan spacing yang cukup dan alignment yang rapi.
- **Visual style**: rounded card, shadow lembut, highlight secukupnya; hindari visual terlalu flat maupun terlalu ramai.
- **States wajib**: default, hover, active, disabled, error, empty, loading, success harus konsisten secara visual.
- **A11y dasar**: kontras warna teks-terhadap-background harus aman dibaca pada komponen tabel/filter/form.

### Mapping Komponen Dashboard ke Style Guide
- Summary cards: Surface/White background, teks Dark Base, angka utama bisa Primary.
- CTA utama (mis. Export, Simpan perubahan): gunakan Accent `#F3B233` dengan kontras teks yang baik.
- Badge status: gunakan sistem warna yang turunan palette resmi (bukan warna arbitrer).
- Data table: header jelas, border/divider lembut berbasis opacity Dark Base.
- Form login `/login`: visual konsisten dengan komponen publik namun tetap sederhana dan fokus.

### Deliverable
- UI spec ringkas untuk halaman `/admin` dan `/login` yang merujuk langsung ke `docs/style.md`.
- Checklist design QA agar implementasi FE bisa divalidasi sebelum release.

## Tahapan Eksekusi (Revisi)
1. Finalisasi model data + kamus status + RLS di Supabase.
2. Implementasi login admin + route guard + hardening autentikasi.
3. Implementasi UI dashboard + search/filter/sort/pagination.
4. Implementasi aksi operasional (update status, catatan, export).
5. Tambahkan audit trail + observability dasar.
6. QA matrix lengkap + sign-off acceptance criteria.

## Acceptance Criteria (Revisi)
- Admin bisa login di `/login` dan masuk ke `/admin`.
- User non-admin tidak bisa mengakses dashboard admin.
- Dashboard menampilkan data pendaftar dan status tes dengan benar.
- Link `/login` tidak muncul di UI publik.
- RLS Supabase mencegah akses data lintas role yang tidak berhak.
- Status proses menggunakan kamus status yang konsisten.
- Aktivitas admin kritikal tercatat pada audit log.
- Admin dapat search/filter/sort dan export data sesuai kebutuhan operasional.

## Risiko & Mitigasi
- **Risiko:** Role admin salah konfigurasi.  
  **Mitigasi:** Seed/skrip penetapan role + checklist verifikasi.
- **Risiko:** Query dashboard lambat saat data besar.  
  **Mitigasi:** Index kolom filter utama + pagination + profiling query.
- **Risiko:** URL `/login` tetap ditemukan pihak luar.  
  **Mitigasi:** Pastikan auth/authorization tetap ketat, tambahkan monitoring login attempt.
- **Risiko:** Data operasional berubah tanpa jejak.  
  **Mitigasi:** Audit trail wajib untuk aksi kritikal.


## 7) Validasi Tabel Supabase yang Sudah Ada (Sebelum Implementasi)

> Menjawab pertanyaan: **"apakah tabel existing sudah dicek?"**
>
> Dari repository ini, yang bisa diverifikasi hanya referensi tabel di kode/dokumen. Verifikasi final struktur kolom, RLS, index, dan trigger tetap harus dicek langsung di Supabase project dashboard/SQL editor.

### Hasil Cek dari Kode Saat Ini
- `registrations` **sudah dipakai aktif** di form pendaftaran dan test koneksi.
- `student_tests` **sudah dipakai aktif** untuk update hasil tes.
- `profiles` dan `admin_audit_logs` **belum terlihat dipakai langsung** di kode saat ini (masih menjadi kebutuhan plan admin dashboard).

### Checklist Audit Wajib di Supabase (Existing vs Needed)
1. Konfirmasi tabel existing: `registrations`, `student_tests`, `profiles` (jika ada).
2. Audit kolom kunci tiap tabel:
   - PK, FK, `created_at`, kolom status, relasi `user_id/registration_id`.
3. Audit policy RLS per tabel:
   - anon/authenticated/admin access matrix.
4. Audit index query dashboard:
   - index untuk `created_at`, `status`, `registration_id`, `user_id`.
5. Audit trigger/function yang sudah aktif:
   - pastikan tidak konflik dengan flow dashboard admin baru.
6. Putuskan strategi migrasi:
   - **alter existing table** (preferred jika kompatibel) vs **create new table**.

### Keputusan Implementasi yang Direkomendasikan
- Prioritaskan **reuse tabel existing** (`registrations`, `student_tests`) agar minim migrasi.
- Tambahkan kolom yang kurang secara incremental (migration SQL terpisah, reversible).
- Buat tabel baru hanya jika memang domain berbeda (contoh: `admin_audit_logs`).
- Setelah audit selesai, update dokumen ini dengan mapping final: `existing column -> dashboard field`.


## 8) Rekomendasi Final: Reuse Existing, Buat Tabel Baru Hanya Jika Wajib

### Keputusan yang Direkomendasikan
Gunakan prinsip berikut:
1. **Pakai tabel existing dulu** (`registrations`, `student_tests`, dan tabel auth/profile yang sudah ada).
2. **Tambah kolom seperlunya** jika ada gap data untuk dashboard admin.
3. **Buat tabel baru hanya jika domain data benar-benar baru** dan tidak cocok disimpan di tabel existing.

### Kapan Cukup Pakai Existing Table
- Data yang dibutuhkan masih satu domain dengan pendaftaran/tes.
- Relasi ke `registration_id` atau `user_id` sudah jelas.
- Penambahan hanya berupa atribut tambahan (status, timestamp, catatan ringan).
- RLS dan query performa masih bisa dipenuhi dengan index tambahan.

### Kapan Harus Buat Table Baru
- Ada domain baru yang perlu histori/event log terpisah (contoh ideal: `admin_audit_logs`).
- Struktur data bersifat one-to-many besar dan akan membebani tabel utama jika digabung.
- Kebutuhan retensi/akses data berbeda signifikan dari tabel asal.
- Membutuhkan jejak immutable (append-only) untuk audit/compliance.

### Rekomendasi Praktis untuk Kasus Ini
- **Tetap gunakan** `registrations` dan `student_tests` sebagai sumber utama dashboard.
- **Pertimbangkan menambah** `profiles.role` (jika belum ada) untuk RBAC admin.
- **Buat tabel baru `admin_audit_logs`** hanya untuk kebutuhan audit trail aksi admin (karena ini domain log terpisah dan append-only).
- Selain itu, hindari membuat tabel baru sampai ada kebutuhan yang tidak bisa dipenuhi oleh tabel existing.


## 9) Hasil Review Ulang Plan

### Temuan Penting
- **Konsistensi penamaan tabel tes** sudah diselaraskan ke `student_tests` (sesuai implementasi existing), agar tidak membingungkan antara plan dan kode saat ini.
- Strategi data tetap: reuse existing table terlebih dahulu, migration incremental, tabel baru hanya untuk domain terpisah.

### Open Questions Sebelum Eksekusi
1. Apakah `profiles.role` sudah tersedia di project Supabase aktif?
2. Apakah status tes akan disimpan di `student_tests` saja, atau perlu kolom ringkasan di `registrations` untuk query cepat?
3. Siapa saja role admin yang dibutuhkan (super_admin vs operator) untuk policy RLS yang lebih granular?

### Rekomendasi Next Step
- Jalankan audit SQL di Supabase untuk memastikan schema real-time.
- Kunci keputusan status taxonomy + mapping field final.
- Mulai MVP dashboard dengan read-only dulu, lalu tambah aksi operasional bertahap.


## 10) Final Sanity Check Plan (Gate Sebelum Development)

Gunakan checklist ini sebagai *go/no-go* sebelum mulai coding:

- [ ] **Scope lock:** Fitur MVP jelas (login admin, monitoring status, filter, basic export).
- [ ] **Schema lock:** Mapping field final disepakati (`registrations` + `student_tests` + `profiles.role`).
- [ ] **Security lock:** Matrix role + RLS + route guard `/admin` tervalidasi.
- [ ] **UI lock:** Wireframe/admin UI disetujui dan sesuai `docs/style.md`.
- [ ] **Ops lock:** Audit trail minimal (`admin_audit_logs`) disepakati event dan retensinya.
- [ ] **Perf lock:** Query utama sudah ada index dan batas pagination default.
- [ ] **QA lock:** Test case role/access/data edge case disiapkan sebelum merge.

### Definisi MVP yang Disarankan
1. Admin login (`/login`) + proteksi role `admin`.
2. Dashboard read-only: summary + table + filter + search + pagination.
3. Status progression terbaca dari existing table (`registrations` + `student_tests`).
4. Export CSV dasar.
5. Audit log minimal untuk login dan perubahan status.

### Hal yang Bisa Masuk Phase 2
- 2FA wajib untuk semua admin.
- Alerting lanjutan dan dashboard observability penuh.
- Assignment PIC, automation notifikasi lanjutan, dan reporting lanjutan.
