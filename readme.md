# NASI PECELS – Web Profil UMKM Kuliner Khas Blitar

Dokumentasi proyek web profil usaha kuliner **NASI PECELS** yang disajikan sebagai **Tugas 1 Mata Kuliah Pemrograman Web (WebPro)**, Program Studi Teknik Informatika, Universitas Islam Balitar (UNISBA).

## Live Preview

pecels.vercel.app

## Deskripsi Proyek

Website ini memuat informasi lengkap mengenai **NASI PECELS**, sebuah usaha UMKM kuliner nasi pecel khas Blitar yang dikelola oleh Ibu Sri Wahyuni. Proyek dibangun menggunakan struktur HTML5 semantik, tata letak CSS murni (tanpa *framework*), dan JavaScript sederhana untuk navigasi aktif.

## Struktur Direktori Proyek

```
.
├── index.html                  # Halaman Utama / Beranda
├── tentang.html                # Halaman Profil & Sejarah Usaha
├── menu.html                   # Halaman Daftar Menu & Harga
├── bahan.html                  # Halaman Bahan dan Bumbu
├── proses.html                 # Halaman Tujuh Tahap Proses Produksi
├── tim.html                    # Halaman Identitas Kelompok 4
├── kontak.html                 # Halaman Kontak & Panduan Pemesanan
├── style.css                   # Berkas Tata Letak & Gaya Utama
├── script.js                   # Berkas JS Navigasi Aktif
└── gambar/                     # Direktori Aset Gambar
    ├── logo.png                # Logo Usaha NASI PECELS
    ├── banner.jpg              # Banner Utama Beranda (16:9 / 5:2)
    ├── tentang-usaha.jpg       # Suasana Tempat Usaha & Etalase
    ├── kontak-lokasi.jpg       # Foto Depan Lokasi Tempat Usaha
    ├── foto-kelompok.jpg       # Foto Anggota Kelompok 4
    ├── menu-pecel-original.jpg # Foto Menu Utama Pecel Original
    ├── lauk-telur.jpg          # Foto Lauk Telur Dadar
    ├── lauk-lele.jpg           # Foto Lauk Lele Goreng
    ├── lauk-ayam.jpg           # Foto Lauk Ayam Goreng
    ├── lauk-rempela.jpg        # Foto Lauk Sate Rempela
    ├── minuman-teh.jpg         # Foto Minuman Teh
    ├── minuman-jeruk.jpg       # Foto Minuman Jeruk
    ├── minuman-kopi.jpg        # Foto Minuman Kopi
    ├── bahan-nasi-putih.jpg    # Foto Bahan Nasi Putih
    ├── bahan-sayuran.jpg       # Foto Bahan Sayuran Rebus
    ├── bahan-kacang-tanah.jpg  # Foto Bahan Kacang Tanah
    ├── bahan-cabai.jpg         # Foto Bahan Cabai
    ├── bahan-gula-merah.jpg    # Foto Bahan Gula Merah
    ├── bahan-kencur.jpg        # Foto Bahan Kencur
    ├── bahan-bawang-putih.jpg  # Foto Bahan Bawang Putih
    ├── bahan-daun-jeruk.jpg    # Foto Bahan Daun Jeruk
    ├── bahan-garam.jpg         # Foto Bahan Garam
    ├── bahan-pelengkap.jpg     # Foto Rempeyek / Pelengkap
    ├── proses-1-persiapan-bahan.jpg
    ├── proses-2-pembersihan-sayuran.jpg
    ├── proses-3-perebusan-sayuran.jpg
    ├── proses-4-pembuatan-sambal.jpg
    ├── proses-5-pengolahan-lauk.jpg
    ├── proses-6-penyajian.jpg
    └── proses-7-pengemasan.jpg

```

## Halaman Web

1. **Beranda (`index.html`)**

   * Pengenalan singkat pecel khas Blitar dan keunggulan NASI PECELS.

   * Banner utama dan navigasi pintas ke halaman lainnya.

2. **Tentang Kami (`tentang.html`)**

   * Latar belakang usaha, timeline sejarah perkembangan (2018–2026).

   * Visi, misi, nilai usaha, dan peran UMKM dalam pelestarian kuliner lokal.

3. **Menu (`menu.html`)**

   * Daftar Pecel Original, pilihan lauk pendamping (telur, lele, ayam, rempela), serta opsi minuman.

   * Rekap tabel harga dan simulasi perhitungan total belanjaan.

4. **Bahan dan Bumbu (`bahan.html`)**

   * Penjelasan 10 bahan utama pecel beserta fungsinya terhadap cita rasa.  
5. **Proses Produksi (`proses.html`)**

   * 7 tahapan produksi dari persiapan bahan hingga pengemasan *takeaway*.  
6. **Tim Kami (`tim.html`)**

   * Identitas mata kuliah, pengampu, serta pembagian tugas 5 anggota Kelompok 4\.  
7. **Kontak (`kontak.html`)**

   * Tabel data operasional, jam buka, lokasi, dan etika pemesanan via WhatsApp.

## Identitas Penyusun (Kelompok 4\)

* **Mata Kuliah:** Pemrograman Web (WebPro) – Tugas 1

* **Program Studi:** Teknik Informatika (Semester 3\)

* **Fakultas:** Fakultas Teknik dan Informatika

* **Perguruan Tinggi:** Universitas Islam Balitar (UNISBA)

* **Dosen Pengampu:** Abdi Pandu Kusuma, S.Kom., M.T.

### Anggota Kelompok

| Nama | NIM | Jabatan / Peran |
| :---- | :---- | :---- |
| **Rendra Adnan Farid** | 25104410036 | Ketua Kelompok |
| **Nahrul Mubarok** | 25104410062 | Penyusun Program (HTML) |
| **Dila Rahma Wakhida** | 25104410042 | Pencari Konten |
| **Raffi Ahmad Alfahrezy** | 25104410050 | Penyusun Laporan |
| **Dhia Al Fitria** | 25104410082 | Penyusun Laporan |

Teknologi & Fitur Sederhana

* **HTML5 Semantik:** Penggunaan `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<figure>`, `<figcaption>`, dan `<footer>`.

* **CSS Custom Properties (Variables):** Penggunaan warna tema tradisional (`--krem`, `--pasir`, `--emas`, `--hijau`, `--teks`).

* **CSS Grid & Flexbox:** Pengaturan galeri kartu berskala konsisten dengan `subgrid` dan tampilan responsif (mobile-friendly).

* **JavaScript Navigasi:** Skrip singkat (`script.js`) untuk mendeteksi halaman aktif dan menambahkan atribut `aria-current="page"`.