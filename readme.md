# 🚀 Web Voting App (Fullstack)

Web App Voting untuk tugas **Cloud Computing** menggunakan **Firebase Realtime Database**.

Project ini terdiri dari **Backend** dan **Frontend** yang dapat dijalankan secara bersamaan menggunakan `concurrently`.

---

# 📁 Struktur Project

web-voting
│
├── backend/ # Node.js + Express API
│ ├── package.json
│
├── frontend/ # Vite + Tailwind + AlpineJS
│ ├── package.json
│
└── package.json # Root project (menjalankan backend + frontend)

# 🛠 Teknologi yang Digunakan

## Backend

- Node.js
- Express
- Cors
- Firebase Realtime Database

## Frontend

- Vite
- TailwindCSS
- AlpineJS

## Tools

- concurrently → menjalankan backend dan frontend secara bersamaan

---

# ⚙️ Instalasi Project

Clone repository terlebih dahulu:

```bash
git clone <repo-url>
cd web-voting
```

Install dependency root project

```bash
npm install
```

Install dependency backend

```bash
cd backend
npm install
```

Install dependency frontend

```bash
cd ../frontend
npm install
```

## Menjalankan Project

Project ini menggunakan concurrently untuk menjalankan backend dan frontend secara bersamaan.

Jalankan perintah berikut di root project:

```bash
npm run dev
```

Script tersebut akan menjalankan:

backend → npm run dev --prefix backend
frontend → npm run dev --prefix frontend

Jika berhasil, terminal akan menampilkan dua proses berjalan bersamaan.
Contoh output:

[backend] Server running on http://localhost:5001
[frontend] VITE ready in 300 ms
[frontend] Local: http://localhost:5173

## Menjalankan Seeder Database

```bash
npm run seed
```
