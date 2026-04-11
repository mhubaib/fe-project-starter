# FE Project Starter

Project ini adalah starter template modern berbasis **React 19** dan **Vite 7**, dirancang untuk membangun aplikasi web yang cepat, skalabel, dan *developer-friendly*. Starter ini menggunakan arsitektur berbasis fitur (Feature-Sliced Design/Domain-Driven) dan telah terintegrasi dengan berbagai tool standar industri terkini.

## 🚀 Fitur Utama & Paket yang Digunakan

Starter project ini dibangun menggunakan teknologi berikut:

- **Framework & Build Tool:** [React 19](https://react.dev/) + [Vite 7](https://vitejs.dev/)
- **Routing:** [TanStack Router](https://tanstack.com/router) (File-based routing yang type-safe)
- **Data Fetching & Caching:** [TanStack Query v5](https://tanstack.com/query) dipadukan dengan [Axios](https://axios-http.com/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) dengan konfigurasi Vite plugin
- **UI Components:** [Shadcn UI](https://ui.shadcn.com/) & [Radix UI](https://www.radix-ui.com/)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/) (ringan dan cepat)
- **Form & Validasi:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Lainnya:** `next-themes` (Dark/Light mode), `sonner` (Toast notifications)

---

## 📂 Struktur Folder

Project ini menggunakan pendekatan modular dan berbasis domain untuk mempermudah skalabilitas seiring membesarnya ukuran aplikasi. `src/` directory terbagi menjadi:

```text
src/
├── components/   # Komponen UI global atau reusable (termasuk shadcn ui di `ui/`)
├── contexts/     # React Context providers (opsional jika menggunakan zustand)
├── features/     # Feature-Slice Design: Modul spesifik per-domain bisnis (e.g., auth, users, products)
├── hooks/        # Custom hooks global (e.g., useMobile)
├── lib/          # Utilities dan konfigurasi global (e.g., axios client, utils tailwind merge)
├── routes/       # File-based routing (Konfigurasi halaman dan path TanStack Router)
├── stores/       # Global State management menggunakan Zustand
├── types/        # Definisi TypeScript global
└── styles.css    # Style global & impor file Tailwind
```

---

## 🛣️ Struktur Routing (TanStack Router)

Routing dalam project ini dikendalikan sepenuhnya melalui struktur folder di dalam `src/routes/`. TanStack Router menggunakan sistem *File-based Routing*.

- `__root.tsx`: Layanan base layout root aplikasi. Semua route akan berada di bawah ini.
- `index.tsx`: File untuk route beranda (path: `/`).
- **Pathless Routes (Group)**: Folder yang diawali dan diakhiri dengan tanda kurung, seperti `(auth)`, berguna untuk mengelompokkan layout logic tanpa menambah path pada URL.
- **Layout Routes**: Folder dengan awalan _ (underscore) seperti `_authenticated` mendefinisikan layout UI bersama dan logic untuk semua route di bawahnya (misal: proteksi halaman/harus login) namun *underscore tidak masuk ke URL path*.
- Route Tree dan types route akan otomatis di-*generate* di `src/routeTree.gen.ts` oleh Vite plugin ketika kita mengubah/menambah file di dalam `routes/`.

---

## 🛠️ Cara Menambahkan Fitur Baru

Untuk memastikan project tetap rapi dan terukur, direkomendasikan membuat fitur dengan arsitektur **Feature-Bounded** pada folder `features/`.

1. **Buat Folder Domain Baru**
   Misalnya kita ingin membuat fitur kelola pengguna. Buat folder `src/features/users/`.
   
2. **Kelompokkan Modul Fitur Tersebut**
   Di dalam folder `users/`, bagi logic ke dalam folder spesifik:
   - `hooks/` : Berisi custom hooks TanStack Query dan endpoint function call (e.g., `useGetUsers.ts`).
   - `components/` : Komponen UI yang **hanya** dipakai di fitur user.
   - `types/` : Interface dan Zod Schema untuk fitur tersebut.
   - `page/` : Folder untuk halaman jika fitur tersebut memiliki beberapa halaman.
   - `stores/` : Zustand store jika fitur butuh local global state kecil.

3. **Gunakan di Halaman Route**
   Setelah fitur dibuat, kombinasikan komponen-komponennya pada `src/routes/`. 
   Misalkan ingin membuat halaman `/users`, buat file `src/routes/_authenticated/users/index.tsx` (jika harus login) dan impor komponen dari `src/features/users/components/...`.

---

## 💻 Memulai Development

Ikuti langkah beikut untuk menjalankan aplikasi di lokal:

1. Buat file environment lokal (jika perlu):
   ```bash
   cp .env-example .env
   ```

2. Install dependencies menggunakan `pnpm`:
   ```bash
   pnpm install
   ```

3. Jalankan development server:
   ```bash
   pnpm dev
   ```

## 📦 Build Project

Untuk mem-build project siap produksi:

```bash
pnpm build
```

## 💅 Styling & Formatting

Project sudah terkonfigurasi ganda dengan `eslint` dan `prettier`. Sebelum push, pastikan kode rapi:

```bash
pnpm lint     # Menjalankan ESLint
pnpm format   # Mengecek dengan Prettier
pnpm check    # Menjalankan auto-fix format & linting
```
