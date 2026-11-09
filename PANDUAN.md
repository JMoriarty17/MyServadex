# FGO Catalogue: panduan deploy + sinkron

Ada DUA repo di GitHub:

| Repo | Isi | Visibilitas |
|---|---|---|
| `fgo-catalogue` | kode aplikasi (isi folder ini) | publik (agar bisa jadi github.io) |
| `fgo-data` | hanya `fgo-collection.json` | **PRIVATE** |

Data koleksimu hanya ada di `fgo-data`. Aplikasi membacanya lewat token.

## 1. Deploy aplikasi
1. GitHub → New repository → nama `fgo-catalogue` → Public → Create.
2. Add file → Upload files → upload ISI folder ini (`index.html`, `sw.js`, `manifest.webmanifest`, folder `icons`, `.gitignore`). `PANDUAN.md` tidak wajib.
3. Settings → Pages → Source: Deploy from a branch → Branch `main` / `(root)` → Save.
4. Tunggu 1–2 menit. Alamat: `https://USERNAME.github.io/fgo-catalogue/`

## 2. Buat repo data (private)
1. New repository → nama `fgo-data` → **Private** → Create.
2. Add file → Upload files → upload `fgo-collection.json` milikmu (nama file harus persis sama).
   (Boleh dilewati. Kalau repo kosong, aplikasi akan membuat filenya dari data di perangkat yang pertama connect.)

## 3. Buat token
1. GitHub → foto profil → Settings → Developer settings → Personal access tokens → **Fine-grained tokens** → Generate new token.
2. Token name: `fgo-sync`. Expiration: 1 year (catat tanggalnya; kalau habis, buat token baru).
3. Repository access: **Only select repositories** → pilih `fgo-data`.
4. Repository permissions → **Contents: Read and write**.
5. Generate token → salin (hanya muncul sekali).

## 4. Hubungkan di tiap perangkat
1. Buka aplikasinya → halaman **Home** → panel **Cloud sync**.
2. Isi `NAMAKAMU/fgo-data` dan tempel token → **Connect**.
3. Selesai. Perubahan tersimpan otomatis beberapa detik setelah edit, dan data terbaru diambil saat aplikasi dibuka.
   Ikon ☁ di pojok atas: hijau = sudah sinkron, kuning = menunggu/offline, merah = ada masalah (arahkan kursor / lihat panel Home).

## 5. Install di HP
- Android (Chrome): menu ⋮ → Install app / Add to Home screen.
- iPhone (Safari): Share → Add to Home Screen.
Setelah ter-install, lakukan langkah 4 di aplikasi yang ter-install (penyimpanannya terpisah dari browser biasa).

## Catatan keamanan
- Aplikasi menolak connect ke repo yang masih PUBLIC.
- Token hanya tersimpan di browser perangkat itu dan tidak ikut ke Export atau ke repo.
- Token hanya punya akses ke `fgo-data`. Kalau HP hilang: GitHub → Settings → Developer settings → revoke tokennya.
- Jangan tempel token di perangkat milik orang lain.
- Semua halaman github.io milikmu berbagi satu "origin" browser. Kalau kamu juga menghosting halaman pihak ketiga di akun yang sama, pertimbangkan akun terpisah.

## Cara kerja sinkron (singkat)
Per servant, edit yang paling baru menang. Penghapusan dicatat supaya servant yang dihapus tidak muncul lagi dari perangkat lain. Import file JSON bersifat otoritatif (menimpa isi koleksi). Export tetap bisa dipakai sebagai backup.
