# 🚀 Arafil Azmi - Portfolio Website

Portfolio modern berbasis **Node.js + Express** dengan desain dark theme yang elegan dan responsive.

---

## 📋 Daftar Isi

- [Quick Start](#-quick-start)
- [Fitur](#-fitur)
- [Struktur Folder](#-struktur-folder)
- [Cara Menjalankan](#-cara-menjalankan)
- [Customization](#-customization)
- [API Endpoints](#-api-endpoints)
- [Deployment](#-deployment)

---

## ⚡ Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Jalankan Server

**Development Mode (dengan auto-reload):**

```bash
npm run dev
```

**Production Mode:**

```bash
npm start
```

### 3. Buka di Browser

```
http://localhost:3000
```

Selesai! 🎉

---

## ✨ Fitur

✅ **Dark Theme Modern** - Background hitam dengan gradient elegan
✅ **Fully Responsive** - Optimal di desktop, tablet, dan mobile
✅ **Animasi Smooth** - Meteor effects, AOS scroll animations
✅ **Contact Form API** - Endpoint untuk submit pesan kontak
✅ **CV Download** - Button untuk download CV Anda
✅ **Server-Side Rendering** - Cepat dengan Express + EJS
✅ **Auto-Reload Development** - Menggunakan Nodemon
✅ **Easy Customization** - Struktur kode yang clean

---

## 📂 Struktur Folder

```
Portofolio/
├── server.js                    # Express server (MAIN)
├── package.json                 # Node.js dependencies
├── .env.example                 # Environment template
├── README.md                    # Dokumentasi ini
│
├── views/
│   ├── index.ejs               # Halaman utama portfolio
│   ├── 404.ejs                 # Halaman 404
│   └── error.ejs               # Halaman error
│
├── public/                      # Static files (CSS, JS, images)
│   ├── css/
│   │   └── style.css           # Stylesheet lengkap
│   ├── js/
│   │   └── script.js           # Client-side JavaScript
│   └── assets/
│       ├── icontitle.png       # Favicon
│       ├── CV-ArafilAzmi.pdf   # File CV (opsional)
│       └── img/
│           ├── profile.jpg     # Foto profil
│           ├── Gereja.png
│           ├── Analisis.png
│           ├── Epolis.png
│           ├── Bps.png
│           ├── Weather.jpg
│           └── Coffee.png
│
└── node_modules/               # Installed packages
```

---

## 🚀 Cara Menjalankan (DETAILED)

### Persiapan Awal

**Windows, macOS, atau Linux:**

```bash
npm install
```

### Development Mode (Recommended)

Jalankan dengan auto-reload saat ada perubahan file:

```bash
npm run dev
```

Output akan terlihat seperti:

```
╔═══════════════════════════════════════════════════════╗
║       🚀 Portfolio Server Running                    ║
╠═══════════════════════════════════════════════════════╣
║  URL: http://localhost:3000                          ║
║  Mode: development                                   ║
║  Watching files for changes...                       ║
║  Press CTRL+C to stop                               ║
╚═══════════════════════════════════════════════════════╝
```

### Production Mode

Jalankan di production:

```bash
npm start
```

### Membuka di Browser

1. Buka browser (Chrome, Firefox, Safari, Edge)
2. Masuk ke: **`http://localhost:3000`**
3. Portfolio Anda akan tampil ✨

### Menghentikan Server

Tekan **`CTRL + C`** di terminal

---

## ⚙️ Konfigurasi

### Mengubah Port (Jika 3000 sudah terpakai)

**Cara 1: Menggunakan Environment Variable**

```bash
PORT=3001 npm run dev
```

**Cara 2: Edit server.js**

```javascript
// Baris 3 di server.js
const PORT = process.env.PORT || 3001; // Ubah 3000 ke 3001
```

**Cara 3: Menggunakan .env file**

```bash
# Copy .env.example ke .env
cp .env.example .env

# Edit .env
PORT=3001
NODE_ENV=development
```

### Mengecek Port yang Sedang Terpakai

**Windows:**

```bash
netstat -ano | findstr :3000
```

**macOS/Linux:**

```bash
lsof -i :3000
```

---

## 🎨 Customization

### 1. Mengubah Nama & Judul

Edit di `views/index.ejs` baris awal:

```html
<h1>Halo, Saya Arafil Azmi</h1>
<p>Web Developer | Data Enthusiast</p>
```

### 2. Menambah/Edit Project

Di section Projects di `views/index.ejs`:

```html
<div class="project-card">
  <img src="/assets/img/[nama-file-gambar].png" alt="[nama-project]" />
  <h5>[Nama Project]</h5>
  <p>[Deskripsi singkat project]</p>
  <div class="tech-tags">
    <span class="tech-tag">HTML5</span>
    <span class="tech-tag">CSS3</span>
  </div>
</div>
```

### 3. Mengubah Skills

Edit section Skills di `views/index.ejs`:

```html
<span class="skill-tag">JavaScript</span>
<span class="skill-tag">Node.js</span>
<span class="skill-tag">Express</span>
```

### 4. Mengubah Warna Tema

Edit CSS variables di `public/css/style.css`:

```css
:root {
  --primary-color: #ffffff; /* Warna utama */
  --dark-bg: #0f0f0f; /* Background gelap */
  --text-light: #ffffff; /* Warna teks terang */
  --text-muted: #b0b0b0; /* Warna teks gelap/redup */
}
```

Warna yang bisa diubah:

- `--primary-color`: Warna accent utama
- `--dark-bg`: Warna background
- `--card-bg`: Warna background card
- `--text-light`: Warna teks terang
- `--text-muted`: Warna teks gelap/redup

### 5. Update Email & Social Links

Cari dan ubah di `views/index.ejs`:

- Email: `rafiazmi0812@gmail.com` → email Anda
- GitHub: URL GitHub profile Anda
- LinkedIn: URL LinkedIn profile Anda
- Instagram: Handle Instagram Anda

---

## 📡 API Endpoints

### POST /api/contact

Endpoint untuk submit form kontak.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Inquiry",
  "message": "Hello, I want to discuss..."
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Pesan berhasil dikirim!"
}
```

**Error Response (400):**

```json
{
  "success": false,
  "message": "Semua field harus diisi!"
}
```

---

## 🌟 Fitur JavaScript

### Download CV

- Klik tombol "Download CV" di hero section
- File otomatis download ke device Anda

### Contact Form

- Isi form: Name, Email, Subject, Message
- Klik "Kirim Pesan"
- Data dikirim ke API `/api/contact`
- Notifikasi success/error akan muncul
- Form otomatis direset setelah sukses

### Keyboard Shortcuts

- **Tekan H**: Jump ke Home section
- **Tekan C**: Jump ke Contact section

### Active Navigation

- Menu otomatis highlight sesuai section yang sedang dilihat saat scroll
- Smooth scroll saat klik menu

### Animations

- **Meteor Effects**: Animasi meteor yang turun dari atas
- **AOS Scroll**: Elemen animate saat masuk viewport
- **Hover Effects**: Smooth transitions pada hover

---

## 📦 Dependencies

| Package | Versi    | Fungsi                 |
| ------- | -------- | ---------------------- |
| express | ^4.18.2  | Web framework          |
| ejs     | Built-in | Template engine        |
| dotenv  | ^16.3.1  | Environment variables  |
| nodemon | ^3.0.1   | Auto-reload (dev only) |

Install semua sekaligus dengan:

```bash
npm install
```

---

## 🛠️ Technologies

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **EJS** - Template engine

### Frontend

- **HTML5** - Markup
- **CSS3** - Modern styling (Gradient, Flexbox, Grid)
- **JavaScript ES6+** - Interaktif & dynamic

### Libraries

- **Bootstrap 5** - Responsive components
- **AOS.js** - Scroll animations
- **Font Awesome 6** - Icon library
- **Google Fonts** - Typography

---

## 🚀 Deployment

### Vercel (Recommended for Node.js)

```bash
npm install -g vercel
vercel
```

Follow prompts untuk deploy ke Vercel.

### Heroku

```bash
heroku login
heroku create your-app-name
git push heroku main
heroku open
```

### Railway

1. Push ke GitHub
2. Connect repository di railway.app
3. Deploy automatically

### DigitalOcean / VPS

```bash
# SSH ke server
ssh user@your-server-ip

# Clone & setup
git clone https://github.com/your/repo.git
cd Portofolio

npm install
npm start
```

---

## 🐛 Troubleshooting

### Error: "Cannot find module 'express'"

```bash
npm install
```

### Port sudah terpakai (Port 3000 already in use)

```bash
# Gunakan port berbeda
PORT=3001 npm run dev

# Atau cek proses yang menggunakan port 3000
netstat -ano | findstr :3000  # Windows
lsof -i :3000                 # macOS/Linux
```

### Images tidak tampil

Pastikan file image ada di `public/assets/img/`:

- Cek nama file sesuai dengan yang di `index.ejs`
- Paths harus format: `/assets/img/filename.png` (bukan `../assets/...`)

### Form tidak berfungsi

1. Check browser console (F12) untuk errors
2. Check terminal console untuk server errors
3. Pastikan server masih running

### Server tidak bisa dijalankan

```bash
# Clear node_modules & install ulang
rm -r node_modules
npm install

# Jalankan ulang
npm run dev
```

---

## 📱 Browser Support

✅ Chrome (Latest)
✅ Firefox (Latest)
✅ Safari (Latest)
✅ Edge (Latest)
✅ Mobile Browsers

---

## 📞 Contact & Support

- Email: rafiazmi0812@gmail.com
- GitHub: github.com/Apileeee
- LinkedIn: linkedin.com/in/arafil-azmi-5b3605323/
- Instagram: @arafilazmi

---

## 📚 Learn More

- **Node.js Docs**: https://nodejs.org/docs/
- **Express.js**: https://expressjs.com/
- **EJS Documentation**: https://ejs.co/
- **Bootstrap 5**: https://getbootstrap.com/
- **JavaScript**: https://developer.mozilla.org/en-US/docs/Web/JavaScript/

---
