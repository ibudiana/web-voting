# Web Voting Backend 🗳️

Backend dari Sistem E-Voting Desa Maju Jaya, dibangun menggunakan **Node.js**, **Express**, dan **Firebase Realtime Database**.

## 🚀 Fitur Utama

- **Manajemen Warga (CRUD)**: Kelola data pemilih dengan mudah.
- **Repository Pattern**: Struktur kode yang bersih dan mudah dirawat.
- **Integrasi Firebase**: Sinkronisasi data real-time.
- **Seeding Database**: Script otomatis untuk mengisi data awal.

## 🛠️ Teknologi

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: Firebase Realtime DB
- **Tools**: Nodemon (development), Dotenv (manajemen env)

## ⚙️ Persiapan Lab

1. **Instalasi Dependensi**

   ```bash
   npm install
   ```

2. **Konfigurasi Environment**
   Buat file `.env` di root folder backend dan isi dengan kredensial Firebase Anda:

   ```env
   PUBLIC_FIREBASE_API_KEY=your_api_key
   PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   PUBLIC_FIREBASE_DATABASE_URL=your_db_url # wajib untuk (Realtime Database)
   PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_id
   PUBLIC_FIREBASE_APP_ID=your_app_id
   PORT=5001
   ```

3. **Seeding Data (Opsional)**
   Gunakan perintah ini untuk mengisi database dengan data warga awal:
   ```bash
   npm run seed
   ```

## 📖 Cara Menjalankan

- **Mode Pengembangan (dengan Hot Reload)**:
  ```bash
  npm run dev
  ```
- **Mode Produksi**:
  ```bash
  npm start
  ```

Server akan berjalan secara default di `http://localhost:5001`.

## 📍 API Endpoints

- `GET /api/users` - Ambil semua warga
- `POST /api/users` - Tambah warga baru
- `PUT /api/users/:id` - Update data warga
- `DELETE /api/users/:id` - Hapus warga
