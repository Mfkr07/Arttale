import { Link } from "react-router-dom";
import { Sparkles, Upload, Coins, Rocket, Check, ArrowRight, Palette, TrendingUp, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const benefits = [
  { icon: Coins, t: "Royalti hingga 40%", d: "Atur sendiri persentase per produk. Default 20%, transparan." },
  { icon: Rocket, t: "Tanpa modal, tanpa stok", d: "Kami yang produksi & kirim. Kamu fokus berkarya." },
  { icon: Users, t: "Komunitas 12k+ kreator", d: "Tribes, leaderboard, kolab antar seniman aktif." },
  { icon: TrendingUp, t: "Dashboard analitik real-time", d: "Lihat performa tiap karya, optimasi konversi." },
];

const steps = [
  { n: "01", t: "Daftar Gratis", d: "Cukup email & nama studio. Selesai dalam 2 menit." },
  { n: "02", t: "Unggah Karya", d: "Drop satu PNG, sistem auto-mockup ke 50+ produk." },
  { n: "03", t: "Atur Harga & Royalti", d: "Slider royalti per kategori. Set & lupakan." },
  { n: "04", t: "Cuan Mengalir", d: "Cek penjualan tiap hari, tarik saldo kapan aja." },
];

const faqs = [
  { q: "Apa saja yang dibutuhkan untuk daftar?", a: "Cuma email aktif. Nomor rekening boleh ditambah belakangan saat mau cairkan saldo." },
  { q: "Format desain apa yang diterima?", a: "PNG transparan, minimal 3000×3000px, 300 DPI. Sistem akan reject otomatis jika resolusi kurang." },
  { q: "Apakah eksklusif?", a: "Tidak. Karya tetap milikmu dan boleh dijual di platform lain." },
];

const SellWithUs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="container mx-auto px-4 py-12 md:py-20 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-2 font-hand text-2xl text-primary mb-3">
              <Sparkles className="w-5 h-5" /> Untuk Seniman Lokal
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.05] mb-5">
              Jual karyamu, <span className="brush-highlight">tanpa modal</span>.
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg mb-7 leading-relaxed">
              Unggah satu desain — kami urus produksi, packing, kirim, sampai customer service. Royalti masuk otomatis ke rekeningmu.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/auth" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3.5 sketch-border-violet font-bold hover:-translate-y-0.5 transition">
                Daftar Gratis <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/help" className="inline-flex items-center gap-2 bg-card px-6 py-3.5 sketch-border-sm font-bold hover:bg-muted">
                Baca FAQ Kreator
              </Link>
            </div>
            <p className="font-hand text-2xl text-muted-foreground mt-5">← cuma butuh email aja!</p>
          </div>
          <div className="paper-card bg-card p-8 relative" style={{ transform: "rotate(1.5deg)" }}>
            <Palette className="w-16 h-16 text-primary mb-4" strokeWidth={1.5} />
            <p className="font-hand text-3xl leading-tight">"Bulan pertama udah bisa bayar sewa studio. Gokil sih."</p>
            <p className="text-sm text-muted-foreground mt-4">— Sari Wibisono, @sariwbs · 1.2k penjualan</p>
            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              <div className="sketch-border-sm bg-background p-3"><div className="font-extrabold text-2xl">2.4k+</div><div className="text-xs text-muted-foreground">Seniman</div></div>
              <div className="sketch-border-sm bg-background p-3"><div className="font-extrabold text-2xl">50+</div><div className="text-xs text-muted-foreground">Produk</div></div>
              <div className="sketch-border-sm bg-background p-3"><div className="font-extrabold text-2xl">40%</div><div className="text-xs text-muted-foreground">Royalti</div></div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="container mx-auto px-4 py-12">
          <div className="text-center mb-10">
            <span className="font-hand text-2xl text-primary">Kenapa Inkkraft? ✦</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-1">Dirancang untuk seniman</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map(({ icon: Icon, t, d }, i) => (
              <div key={t} className="paper-card p-5 bg-card" style={{ transform: `rotate(${i % 2 ? 0.8 : -0.8}deg)` }}>
                <div className="w-12 h-12 rounded-lg bg-primary-soft border-2 border-foreground flex items-center justify-center mb-3">
                  <Icon className="w-6 h-6" strokeWidth={2.2} />
                </div>
                <h3 className="font-extrabold">{t}</h3>
                <p className="text-sm text-muted-foreground mt-1 leading-snug">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Steps */}
        <section className="container mx-auto px-4 py-12">
          <div className="text-center mb-10">
            <span className="font-hand text-2xl text-primary">Cara Kerjanya ✿</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-1">Empat langkah, mulai cuan</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map(({ n, t, d }, i) => (
              <div key={n} className="paper-card p-5 bg-card relative" style={{ transform: `rotate(${i % 2 ? 1 : -1}deg)` }}>
                <span className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-primary text-primary-foreground sketch-border-sm flex items-center justify-center font-hand text-xl">{n}</span>
                <h3 className="font-extrabold mt-2">{t}</h3>
                <p className="text-sm text-muted-foreground mt-1">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Royalty calculator preview */}
        <section className="container mx-auto px-4 py-12">
          <div className="paper-card p-6 md:p-10 bg-accent/40 max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-2">Simulasi Royalti</h2>
            <p className="text-sm text-muted-foreground mb-5">Misal kamu jual desain di 3 produk:</p>
            <ul className="space-y-2 text-sm">
              {[
                { p: "Kaos Reguler · Rp 145.000 × 50 pcs", r: 1_450_000 },
                { p: "Stiker A6 · Rp 25.000 × 200 pcs", r: 1_000_000 },
                { p: "Tote Bag · Rp 95.000 × 30 pcs", r: 570_000 },
              ].map((x) => (
                <li key={x.p} className="flex justify-between gap-3 border-b-2 border-dashed border-foreground/20 pb-2">
                  <span>{x.p}</span>
                  <b>Rp {x.r.toLocaleString("id-ID")}</b>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center mt-4 pt-3 border-t-2 border-foreground">
              <span className="font-extrabold">Royalti per bulan (20%)</span>
              <span className="font-extrabold text-2xl text-primary">Rp 3.020.000</span>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="container mx-auto px-4 py-12 max-w-3xl">
          <h2 className="text-3xl font-extrabold mb-6 text-center">FAQ Singkat</h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="sketch-border-sm bg-card p-4">
                <summary className="font-bold cursor-pointer flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> {f.q}</summary>
                <p className="text-sm text-muted-foreground mt-2 pl-6">{f.a}</p>
              </details>
            ))}
          </div>
          <Link to="/help" className="block text-center text-sm font-semibold underline underline-offset-4 mt-5 hover:text-primary">
            Lihat semua FAQ →
          </Link>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 py-16">
          <div className="bg-foreground text-background sketch-border-violet p-8 md:p-12 text-center rounded-2xl">
            <Upload className="w-12 h-12 mx-auto mb-4 text-primary" strokeWidth={2} />
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3">Siap unggah karya pertama?</h2>
            <p className="text-background/70 mb-6 max-w-md mx-auto">Daftar sekarang, gratis selamanya. Tanpa biaya tersembunyi.</p>
            <Link to="/auth" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-4 sketch-border-sm font-bold">
              Mulai Sekarang <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SellWithUs;
