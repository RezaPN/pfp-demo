# PFP Example

Demo penggunaan pustaka OpenPGP untuk menghasilkan kunci, mengenkripsi, dan mendekripsi file.

## Persyaratan

Pastikan Anda telah menginstal Node.js dan npm di sistem Anda.

## Instalasi

1. Clone repositori ini.
2. Jalankan perintah berikut untuk menginstal dependensi:

```bash
npm install
```

## Skrip yang Tersedia

### 1. Menghasilkan Kunci

Untuk menghasilkan pasangan kunci (public-key dan private-key), jalankan perintah berikut:

```bash
npm run generate-key
```

Anda akan diminta memasukkan:
- Nama
- Email
- Passphrase

Pasangan kunci akan disimpan di folder `secure_keys`:
- `secure_keys/private.key`
- `secure_keys/public.key`

### 2. Mengenkripsi File

Untuk mengenkripsi file, jalankan perintah berikut:

```bash
npm run encrypt-file
```

Skrip ini akan mengenkripsi file `username.csv` yang ada di dalam folder `file`. Jika Anda ingin mengenkripsi file lain, ubah kode dalam `encryptFile.mjs` sesuai dengan nama file yang diinginkan.

File yang terenkripsi akan disimpan dengan nama `username.csv.pgp` di dalam folder yang sama.

### 3. Mendekripsi File

Untuk mendekripsi file, jalankan perintah berikut:

```bash
npm run decrypt-file
```

Anda akan diminta memasukkan passphrase. Jika passphrase benar, file `username_encrypted.csv.pgp` akan didekripsi dan hasilnya disimpan sebagai `username_decrypted.csv` di dalam folder `file`. Jika passphrase salah, skrip akan mengeluarkan error.

## Struktur Proyek

```
.
├── secure_keys
│   ├── private.key
│   └── public.key
├── file
│   ├── username.csv
│   ├── username_encrypted.csv.pgp
│   └── username_decrypted.csv
├── generateKey.mjs
├── encryptFile.mjs
├── decryptFile.mjs
├── package.json
└── README.md
```

- `secure_keys`: Folder untuk menyimpan kunci publik dan privat.
- `file`: Folder untuk menyimpan file asli, terenkripsi, dan didekripsi.
- `generateKey.mjs`: Skrip untuk menghasilkan kunci.
- `encryptFile.mjs`: Skrip untuk mengenkripsi file.
- `decryptFile.mjs`: Skrip untuk mendekripsi file.
- `package.json`: File konfigurasi npm.
- `README.md`: Dokumentasi proyek.

## Catatan

- Pastikan untuk tidak membagikan kunci privat (`private.key`) kepada siapa pun.
- Selalu ingat passphrase yang Anda gunakan untuk mengenkripsi kunci privat.

## Lisensi

Proyek ini dilisensikan di bawah lisensi ISC.
```

Dengan file `README.md` ini, pengguna akan memiliki panduan yang jelas tentang cara menggunakan skrip yang tersedia dalam proyek Anda.