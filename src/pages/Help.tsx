import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, HelpCircle, MessageCircle, Mail, Truck, RotateCcw, CreditCard, Palette, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const categories = [
  { icon: Truck, label: "Pengiriman", color: "bg-primary-soft" },
  { icon: RotateCcw, label: "Retur & Refund", color: "bg-accent" },
  { icon: CreditCard, label: "Pembayaran", color: "bg-pink-100" },
  { icon: Palette, label: "Untuk Seniman", color: "bg-emerald-100" },
  { icon: ShieldCheck, label: "Akun & Keamanan", color: "bg-yellow-100" },
  { icon: HelpCircle, label: "Lainnya", color: "bg-stone-100" },
];

const faqs = [
  { q: "Berapa lama pesanan saya sampai?", a: "Setelah pembayaran terkonfirmasi, kami butuh 2-3 hari untuk produksi (Print on Demand) dan 2-4 hari untuk pengiriman. Total estimasi 4-7 hari kerja." },
  { q: "Bagaimana cara melacak pesanan?", a: "Buka halaman Lacak Pesanan, masukkan nomor order. Kamu juga akan menerima notifikasi email & WA setiap status berubah." },
  { q: "Apakah bisa retur jika tidak sesuai?", a: "Bisa! Retur gratis dalam 7 hari kalau ada cacat produksi (sablon miring, jahitan rusak, salah ukuran kirim). Karena Print on Demand, retur karena salah pilih ukuran tidak berlaku." },
  { q: "Metode pembayaran apa saja yang didukung?", a: "QRIS (semua bank/e-wallet), Virtual Account (BCA/Mandiri/BNI/BRI), GoPay, OVO, DANA, ShopeePay, dan kartu kredit Visa/Mastercard." },
  { q: "Bagaimana cara mendaftar sebagai seniman?", a: "Klik 'Jual Karyamu' di pojok kanan atas, daftar gratis dengan email, lalu unggah desain pertamamu. Tim kurasi akan review dalam 1-2 jam kerja." },
  { q: "Berapa royalti yang saya dapatkan?", a: "Default 20% dari harga produk untuk semua kategori. Kamu bisa atur sendiri di Studio Settings, dengan minimum 10% dan maksimum 40%." },
  { q: "Kapan royalti dicairkan?", a: "Saldo bisa ditarik kapan saja minimum Rp 50.000 ke rekening bank atau e-wallet. Pencairan reguler 1-2 hari kerja, instant 30 menit (dengan fee)." },
  { q: "Apakah desain saya aman dari plagiat?", a: "Setiap unggahan otomatis dipindai mesin kami, plus watermark digital. Kalau menemukan plagiat, lapor ke tim—kami takedown dalam 24 jam." },
];

const Help = () => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="text-center mb-10">
          <span className="font-hand text-2xl text-primary">Lagi bingung? ✿</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-1">Pusat Bantuan</h1>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto">
            Jawaban paling sering ditanya. Kalau masih kurang, langsung chat tim kami.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {categories.map(({ icon: Icon, label, color }) => (
            <button key={label} className={`${color} sketch-border-sm p-4 flex flex-col items-center gap-2 doodle-hover`}>
              <Icon className="w-7 h-7" strokeWidth={2.2} />
              <span className="text-xs font-bold text-center leading-tight">{label}</span>
            </button>
          ))}
        </div>

        <div className="paper-card p-6 md:p-8">
          <h2 className="text-2xl font-extrabold mb-5">Pertanyaan Populer</h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="sketch-border-sm bg-card overflow-hidden">
                <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-4 text-left">
                  <span className="font-bold text-sm md:text-base">{f.q}</span>
                  <ChevronDown className={`w-5 h-5 shrink-0 transition ${open === i ? "rotate-180" : ""}`} />
                </button>
                {open === i && <p className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed border-t-2 border-dashed border-foreground/20 pt-3">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mt-10">
          <Link to="/contact" className="paper-card p-6 bg-primary text-primary-foreground hover:-translate-y-1 transition-transform">
            <MessageCircle className="w-8 h-8 mb-3" strokeWidth={2.2} />
            <h3 className="font-extrabold text-xl">Chat tim Inkkraft</h3>
            <p className="text-sm opacity-90 mt-1">Senin–Sabtu, 09.00–21.00 WIB.</p>
          </Link>
          <a href="mailto:halo@inkkraft.id" className="paper-card p-6 bg-accent hover:-translate-y-1 transition-transform">
            <Mail className="w-8 h-8 mb-3" strokeWidth={2.2} />
            <h3 className="font-extrabold text-xl">Email kami</h3>
            <p className="text-sm opacity-90 mt-1">halo@inkkraft.id — balas &lt;24 jam.</p>
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Help;
