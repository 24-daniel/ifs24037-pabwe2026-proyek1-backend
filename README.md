# JadwalIbadah — Backend API

API Express.js + SQLite untuk JadwalIbadah. Dipakai oleh repo frontend **ifs24037-pabwe2026-p1**.

## Menjalankan di komputer lokal
```bash
git clone https://github.com/<username>/ifs24037-pabwe2026-p1-api.git
cd ifs24037-pabwe2026-p1-api
cp .env.example .env
bun install
bun run dev              # http://localhost:8000
```

## Konfigurasi (.env)
| Variabel | Fungsi |
|---|---|
| PORT | Port server |
| DB_PATH | Lokasi file SQLite (di hosting, arahkan ke disk persisten) |
| CORS_ORIGIN | URL frontend yang diizinkan, pisahkan dengan koma jika lebih dari satu |

## Endpoint (`/api/v1`)
| Method | Path | Fungsi |
|---|---|---|
| GET | /events?search=&category=&from= | Daftar kegiatan |
| GET | /events/:id | Detail kegiatan |
| POST | /events | Tambah kegiatan |
| PUT | /events/:id | Ubah kegiatan |
| DELETE | /events/:id | Hapus kegiatan |

## Struktur
`src/features/events`: routes → controller → service → repository (+ validator). Pengujian: `bun test`.

## Menghubungkan dengan frontend (wajib)
- Cek `GET /api/v1/health` setelah deploy.
- Isi `CORS_ORIGIN` dengan URL frontend yang sudah dideploy, mis. `https://ifs24037-pabwe2026-proyek1.xxx`. Beberapa URL dipisah koma.
- Backend harus selalu online saat frontend dinilai Lighthouse, karena halaman memanggil API saat dibuka.
