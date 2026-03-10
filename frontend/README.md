# Web Voting Frontend 🗳️

Frontend modern untuk Sistem E-Voting Desa Maju Jaya, dirancang dengan fokus pada pengalaman pengguna (UX) yang premium, responsivitas mobile, dan performa tinggi.

## ✨ Fitur Unggulan
- **Dashboard Interaktif**: Ringkasan data statistik yang informatif.
- **Manajemen Warga Modern**: Antarmuka CRUD yang bersih dengan modal dan validasi real-time.
- **Dark & Light Mode**: Dukungan tema gelap/terang yang tersimpan secara persisten melalui cookie untuk mencegah *flash* saat reload.
- **Mobile Friendly**: Sidebar adaptif dan layout fleksibel untuk semua ukuran layar.
- **Aestetik Premium**: Menggunakan prinsip *Glassmorphism*, font Plus Jakarta Sans, dan animasi halus.

## 🛠️ Teknologi
- **Framework**: Vite (Build tool ultra-cepat)
- **Styling**: Tailwind CSS v4 (Sistem utility terbaru)
- **Interaktivitas**: Alpine.js (Ringan dan deklaratif)
- **Design System**: Kustom utilitas CSS untuk konsistensi visual.

## ⚙️ Persiapan

1. **Instalasi Dependensi**
   ```bash
   npm install
   ```

2. **Menjalankan Mode Pengembangan**
   ```bash
   npm run dev
   ```

3. **Membangun untuk Produksi**
   ```bash
   npm run build
   ```

Aplikasi akan berjalan di `http://localhost:5173`. Pastikan backend sudah menyala di port `5001` agar data warga dapat tersinkronisasi.

## 🎨 Detail Desain (Tailwind v4)
Projek ini menggunakan fitur terbaru dari **Tailwind CSS v4**, termasuk:
- `@custom-variant dark`: Untuk kontrol tema yang presisi.
- `@utility`: Mendefinisikan class reusable seperti `.card` dan `.glass-sidebar` langsung di CSS.
- Strategi `selector`: Memastikan tema sinkron dengan preferensi pengguna di aplikasi, bukan hanya pengaturan sistem operasi.

## 📱 Responsivitas
- **Desktop**: Sidebar menetap di samping dengan area konten yang luas.
- **Mobile**: Sidebar tersembunyi dengan menu hamburger dan overlay blur untuk fokus pengguna.
