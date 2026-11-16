# Art Spark Studio

Saya ingin membuat sebuah sistem website print on demand

1. Alur Sistem Keseluruhan (Macro System Flow)

Sistem ini bergerak secara asinkron dan otomatis, menghubungkan tiga entitas utama tanpa memerlukan intervensi manual dari pihak admin (kecuali untuk moderasi).

Injeksi Aset (Fase Kreator): Kreator mengunggah satu master file (PNG transparan). Sistem Auto-Mockup memproses gambar tersebut dan menerapkannya secara serentak ke puluhan jenis produk (Apparel, Stiker, Aksesoris). Sistem langsung mengkalkulasi harga jual berdasarkan modal dasar dari vendor terdekat ditambah margin kreator.

Penemuan & Transaksi (Fase Konsumen): Konsumen menemukan produk melalui mesin pencari internal atau Tribes (komunitas). Konsumen menyesuaikan produk (warna, ukuran), menambahkan opsi "Tip untuk Kreator", dan melakukan pembayaran melalui Payment Gateway Lokal (QRIS/E-Wallet/VA).

Fulfillment Terdistribusi (Fase Vendor & Logistik): Setelah pembayaran valid, sistem memecah pesanan (jika ada berbagai jenis produk) dan mengirimkan work order beserta aset resolusi tinggi ke vendor yang relevan. Vendor mencetak, mengemas, dan menekan tombol Ready to Ship. API Logistik secara otomatis memanggil kurir, dan nomor resi terbit untuk konsumen.

Distribusi Keuntungan (Fase Finansial): Setelah pesanan selesai, sistem membagi pendapatan: Modal pokok diteruskan ke vendor, "Tip" 100% dan Royalti diteruskan ke wallet kreator, dan komisi masuk ke platform.

2. Spektrum Produk & Mesin Auto-Mockup

Meniru skalabilitas TeePublic, kreator tidak perlu mengunggah gambar berkali-kali. Sistem Auto-Mockup Anda akan menangani berbagai variasi produk:

Apparel: Kaos (Standard, Premium, Heavyweight), Hoodie, Crewneck, Tank Top.

Aksesoris: Topi (Baseball Cap, Bucket Hat), Tote Bag, Casing HP.

Home & Art: Art Print (Poster), Mug, Stiker Die-Cut (potongan mengikuti bentuk gambar).

3. Arsitektur Halaman & Rincian Fitur (UX Flow & Page Breakdown)

Berikut adalah navigasi dan detail isi dari setiap halaman, diurutkan berdasarkan perjalanan pengguna (User Journey).

A. Elemen Global (Selalu Tampil)

Top Navigation Bar: Logo kiri, Search Bar berukuran besar di tengah (dengan auto-suggest), Quick Links (Pakaian, Stiker, Art, Tribes). Di sisi kanan terdapat ikon Keranjang, Profil, dan tombol "Jual Karyamu" (Call to Action khusus kreator).

Footer: Tautan Bantuan, Lacak Pesanan, FAQ Kreator, Syarat & Ketentuan, Kebijakan Retur, dan Logo Pembayaran/Logistik.

B. Landing Page (Beranda Utama Konsumen)

Halaman ini dirancang untuk konversi cepat (seperti TeePublic), memfasilitasi pengguna untuk langsung menemukan apa yang mereka cari tanpa banyak klik.

Hero Banner (Dinamis): Menampilkan promo harian atau karya dari Artist of the Month.

Quick Access Bar: Deretan ikon bulat di bawah banner untuk akses instan ke produk terlaris: "Stiker Keren", "Kaos Hitam", "Casing HP", "Topi".

Trending Tribes (Fandom Hub): Menampilkan blok visual untuk komunitas spesifik (Misal: Gamer Merch, Anime Local, Indie Music). Klik pada blok ini akan membawa pengguna ke kurasi desain khusus tema tersebut.

Recently Added / Fresh Art: Menampilkan desain-desain terbaru yang diunggah ke platform.

Creator CTA Banner: Sebuah blok horizontal bertuliskan, "Punya desain sendiri? Buka tokomu dalam 5 menit dan mulai hasilkan uang."

C. Halaman Pencarian & Katalog (Search Results)

Halaman ini sangat krusial. UX yang baik di sini menentukan apakah konsumen jadi membeli atau pergi.

Advanced Filtering (Sisi Kiri): Filter komprehensif untuk memudahkan kurasi:

Kategori Produk: Pakaian Dewasa, Anak, Aksesoris, Stiker.

Gaya Desain (Art Style): Tipografi, Minimalis, Ilustrasi, Vintage, Parodi.

Warna Kain/Dasar: Pilihan warna (swatches).

Urutkan (Sort By): Paling Laku, Terbaru, Harga Terendah.

Product Grid (Area Utama): Menampilkan mockup produk dengan watermark halus, harga dinamis (sudah disesuaikan dengan geolokasi pengguna), dan nama kreator.

D. Halaman Detail Produk (Product Page)

Tempat konsumen mengambil keputusan akhir. Harus bersih, transparan, dan informatif.

Dynamic Image Gallery: Gambar besar produk. Jika konsumen mengganti warna kaos, gambar utama langsung berubah warna secara real-time.

Variasi & Spesifikasi: Pilihan ukuran (S-XXL) dilengkapi tautan Size Chart lokal (cm), dan pilihan kualitas bahan (Standard vs Premium).

The "Killer Feature" - Tip the Artist: Toggle interaktif (Opsional: Rp 5.000 / Rp 10.000 / Rp 20.000) yang dijabarkan dengan teks empati: "Dukung seniman ini untuk terus berkarya."

The "Killer Feature" - Optional Video Review: Bagian ulasan di bawah produk. Pelanggan dapat mengunggah foto atau video unboxing pendek. Karena ini opsional, platform memberikan insentif gamifikasi (Misal: "Unggah ulasan video dan dapatkan voucher diskon ongkir 10% untuk pembelian berikutnya!").

Artist Profile Block: Foto profil kreator, tombol Follow, dan tautan Lihat karya lainnya dari kreator ini.

E. Halaman Checkout & Keranjang

Cart Summary: Rincian belanja.

Dynamic Price Localization: Input kecamatan/kode pos. Sistem langsung menghitung ongkir paling efisien dari pabrik vendor terdekat dengan alamat pengiriman, memberikan subsidi ongkir silang jika memenuhi syarat.

Payment Hub: Integrasi API langsung ke QRIS, GoPay, dan Virtual Account untuk pembayaran dalam 1 klik.

F. Halaman "Sell Your Art" (Onboarding Kreator)

Halaman promosi untuk menarik seniman mendaftar.

Value Proposition: Penjelasan "Tanpa Modal, Tanpa Ribet Kirim Barang".

One-Click Sign Up: Pendaftaran cepat terintegrasi dengan Google/Apple Account.

G. Dashboard Kreator & Upload Studio (Behind the Scenes)

Ruang kerja kreator yang dibuat sangat intuitif.

Overview Tab: Grafik pendapatan, jumlah views pada toko, dan daftar produk paling populer.

Universal Upload Studio: Kreator menyeret (drag and drop) satu file PNG besar. Sistem langsung memunculkan grid berisi semua jenis produk (Kaos, Stiker, Mug, Topi). Kreator dapat mematikan (disable) produk yang dirasa tidak cocok dengan desainnya (misalnya, desain kotak tidak cocok untuk cetak topi).

Tribe Assignment: Saat upload, kreator bisa mencentang maksimal 2 Tribes agar desainnya masuk ke kategori komunitas yang tepat.

Wallet & Payout: Tabel riwayat masuknya Royalti + Tip, serta tombol "Cairkan Dana" ke rekening bank.

Desain

Dengan pendekatan minimalis namun dipenuhi elemen lineart dan doodle organik, platform Anda langsung mengomunikasikan identitasnya secara visual: "Ini adalah rumah bagi para seniman, dibangun oleh orang yang mengerti seni." Mari kita rancang konsep UI/UX dengan tema "The Artist's Sketchbook", beserta prompt AI komprehensif yang siap Anda gunakan.

1. Konsep UI/UX: "The Artist's Sketchbook"

Kunci dari gaya ini adalah keseimbangan. Jika terlalu banyak doodle, website akan terlihat berantakan dan menyulitkan navigasi belanja (UX akan turun). Oleh karena itu, kita memadukan struktur e-commerce yang sangat bersih (minimalist) dengan aksen coretan tangan.

Latar Belakang (The Paper): Putih tulang atau Off-White (#FAFAFA) yang bersih, menyerupai kertas sketsa premium. Tanpa drop-shadow yang tebal, diganti dengan garis tepi (outline) hitam tipis ala komik/sketsa untuk memisahkan kotak-kotak produk.

Tipografi (The Ink): Menggunakan perpaduan font Sans-Serif modern (untuk nama produk dan harga agar mudah dibaca) dengan aksen font Handwriting (tulisan tangan) untuk judul utama atau ajakan bertindak (misal: tulisan "Support Your Local Artist!" di atas tombol).

Ikonografi (The Tools): Mengganti ikon standar (seperti keranjang belanja atau kaca pembesar) dengan ikon yang digambar tangan (hand-drawn lineart).

Aksen Warna: Dominasi hitam-putih (monokrom lineart) yang secara strategis ditimpa dengan "percikan" (brush stroke atau watercolor effect) warna aksen Creative Violet (#6C5CE7) untuk menonjolkan tombol-tombol penting.

2. Implementasi Visual di Setiap Halaman (UX Storytelling)

Berikut adalah penerapan gaya doodle pada alur fitur yang sudah kita susun sebelumnya:

A. Landing Page (Beranda Utama Konsumen & Kreator)

Hero Section: Alih-alih menggunakan foto studio, gunakan ilustrasi lineart yang besar. Gambar seorang ilustrator sedang menggambar di tablet digitalnya, dan dari ujung penanya "keluar" garis-garis yang membentuk kaos, tote bag, stiker, dan casing HP, melayang ke arah sekumpulan anak muda (konsumen) yang tersenyum. Ini melambangkan interaksi langsung.

Bagian "Cara Kerja" (Visual Storytelling 4 Langkah): Seperti yang Anda sarankan, teks panjang dihilangkan. Diganti dengan 4 doodle berurutan yang saling terhubung dengan garis putus-putus seperti rute peta harta karun:

Doodle orang tersenyum mengunggah karya ke ikon cloud (Upload Desain).

Doodle ikon keranjang dengan tanda checklist (Pesanan Masuk).

Doodle mesin cetak lucu sedang menyablon kaos (Produksi).

Doodle kurir sedang mengendarai skuter membawa paket berlogo platform Anda (Kirim).

Trending Tribes: Kotak-kotak kategorinya (Wibu, Indie, dll) menggunakan background coretan pattern bebas (doodle pattern) yang merepresentasikan subkultur tersebut.

B. Halaman Katalog & Filter (Pencarian)

Struktur tetap grid rapi untuk memudahkan belanja. Namun, bingkai setiap produk digambar dengan gaya rough edge (garis yang sedikit tidak rata seperti digambar tangan).

Fitur Filter: Terdapat ikon doodle kuas, pensil, dan palet cat di bagian atas menu sidebar filter.

C. Halaman Detail Produk

Auto-Mockup Gallery: Foto produk terlihat realistis, namun elemen di sekitarnya (seperti tanda panah untuk slider foto) menggunakan gaya tulisan tangan.

Video Review (Opsional): Diberi frame yang menyerupai bingkai polaroid atau selotip kertas (washi tape) di ujung sudutnya, memberikan kesan kliping jurnal.

Tip the Artist: Tombol ini dihiasi dengan ilustrasi doodle koin receh atau gambar toples kaca bertuliskan "Tip Jar".

D. Halaman "Sell Your Art" & Creator Dashboard

Onboarding: Ilustrasi seniman yang sedang merentangkan tangan dengan tulisan "Zero Capital, 100% Fun".

Upload Studio: Area drag-and-drop digambarkan dengan garis putus-putus berbentuk kotak sketsa, dan instruksinya menggunakan handwritten font.

3. Prompt Master untuk Google Stitch AI (Atau AI Image Generator lainnya)

Karena AI image generator bekerja paling baik dengan bahasa Inggris yang deskriptif dan detail, saya telah menyusun prompt khusus untuk menghasilkan desain UI yang minimalis namun dipenuhi elemen seni doodle.

Instruksi: Salin prompt di bawah ini. Prompt ini dibagi menjadi beberapa bagian agar Anda bisa men-generate halaman satu per satu dengan hasil yang konsisten.

Prompt 1: The Global Style & Landing Page Hero

Prompt: A high-fidelity UI/UX web design for a modern Print-on-Demand platform landing page. The aesthetic is "Minimalist Artist Sketchbook" combined with clean e-commerce layout. Background is clean off-white (#FAFAFA). The hero section features a beautiful, expressive hand-drawn black line-art illustration (doodle style) showing a young artist drawing on a tablet, and their creative lines magically transforming into physical products like t-shirts, tote bags, and stickers floating towards happy customers. The UI elements include a top navigation bar with hand-drawn style icons, a large search bar, and a prominent call-to-action button colored in vibrant Creative Violet (#6C5CE7) with a subtle brush-stroke edge. Humanistic, personal, aesthetic, Dribbble style, high resolution.

Prompt 2: The "How It Works" Storytelling Section

Prompt: UI/UX web design component for a "How it works" section on a Print-on-Demand website. Minimalist off-white background. The layout features a visual storytelling journey using 4 charming, hand-drawn doodle illustrations connected by a dashed dashed line like a treasure map. Step 1: A cute doodle of an artist uploading art to a cloud. Step 2: A doodle of a shopping cart receiving an order. Step 3: A friendly printing machine pressing a t-shirt. Step 4: A doodle of a delivery courier on a scooter. Minimal text, organic and fun line-art style, black ink with slight splashes of violet color. Clean, aesthetic, approachable web UI design.

Prompt 3: Product Detail Page & "Tip the Artist" Feature

Prompt: A UI/UX web design for an e-commerce product detail page on an artistic Print-on-Demand platform. Left side: A highly realistic photo mockup of a t-shirt with a cool graphic design. Right side: Clean typography for product name and price, variant selectors (color, size) enclosed in rough, hand-drawn style outline boxes. Below the variants, a unique "Tip the Artist" feature designed as a cute hand-drawn doodle of a glass "Tip Jar" with a violet button. Below that, an optional "Video Review" section framed like polaroid photos attached with doodle washi tape. Minimalist, artistic, friendly, Dribbble aesthetic.

Prompt 4: Creator Upload Studio (Dashboard)

Prompt: UI/UX web design for an artist's creator dashboard on a Print-on-Demand platform. Minimalist workspace layout. Left side features a drag-and-drop upload zone with a hand-drawn dashed border and a doodle icon of a magical wand. Right side shows an auto-mockup preview grid displaying a t-shirt, sticker, and baseball cap. The sidebar navigation uses custom hand-drawn line-art icons. The overall vibe is a digital sketchbook, combining highly functional clean UI with creative, humanistic doodle art accents in black ink and violet. Professional, inspiring, artistic layout.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://arttale.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/07687224-9355-4176-892c-f3b9a64264b4).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
#   A r t t a l e  
 