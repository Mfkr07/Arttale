import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ChevronLeft, ChevronRight, Heart, Share2, Star, Truck,
  ShieldCheck, RotateCcw, ArrowLeft, Plus, Minus, Sparkles,
} from "lucide-react";

const colors = [
  { name: "Hitam", hex: "#0E0E0E", bg: "bg-foreground" },
  { name: "Putih", hex: "#FAFAFA", bg: "bg-background" },
  { name: "Abu", hex: "#9CA3AF", bg: "bg-stone-400" },
  { name: "Violet", hex: "#6C5CE7", bg: "bg-primary" },
  { name: "Maroon", hex: "#7F1D1D", bg: "bg-red-900" },
];
const sizes = ["S", "M", "L", "XL", "XXL"];
const qualities = [
  { id: "std", label: "Standard", price: 145000, desc: "Cotton 24s, ringan" },
  { id: "prm", label: "Premium", price: 175000, desc: "Cotton 30s, halus" },
  { id: "hvy", label: "Heavyweight", price: 215000, desc: "Cotton 20s, tebal" },
];
const tips = [0, 5000, 10000, 20000];

const ProductDetail = () => {
  useParams();
  const navigate = useNavigate();
  const { add } = useCart();
  const [colorIdx, setColorIdx] = useState(0);
  const [size, setSize] = useState("M");
  const [quality, setQuality] = useState("std");
  const [qty, setQty] = useState(1);
  const [tip, setTip] = useState(5000);
  const [imgIdx, setImgIdx] = useState(0);

  const activeColor = colors[colorIdx];
  const basePrice = qualities.find((q) => q.id === quality)!.price;
  const total = (basePrice + tip) * qty;
  const fmt = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;

  // 4 mockup variants — represented as colored panels with the artwork emoji
  const gallery = [
    { label: "Tampak Depan" },
    { label: "Tampak Belakang" },
    { label: "Detail Sablon" },
    { label: "Dipakai Model" },
  ];

  const buildItem = () => ({
    productId: 1,
    title: "Cosmic Cat Vibes",
    artist: "Rara Doodles",
    emoji: "🐱",
    bg: activeColor.bg,
    color: activeColor.name,
    size,
    quality: qualities.find((q) => q.id === quality)!.label,
    price: basePrice,
    tip,
    qty,
  });

  const handleAddToCart = () => {
    add(buildItem());
    toast.success("Ditambahkan ke keranjang!");
  };

  const handleBuyNow = () => {
    add(buildItem());
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 pt-6">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="w-4 h-4" /> Kembali ke katalog
        </Link>
      </div>

      <main className="container mx-auto px-4 py-6 grid lg:grid-cols-2 gap-10 lg:gap-14">
        {/* ==== GALLERY ==== */}
        <div className="space-y-4">
          <div
            className="relative aspect-square sketch-border rounded-2xl flex items-center justify-center overflow-hidden transition-colors"
            style={{ backgroundColor: activeColor.hex }}
          >
            {/* Artwork */}
            <span
              className={`text-[10rem] md:text-[14rem] leading-none transition-transform duration-500 ${
                imgIdx === 1 ? "rotate-180 opacity-60" : imgIdx === 2 ? "scale-150" : ""
              }`}
            >
              🐱
            </span>

            {/* hand-drawn arrows */}
            <button
              onClick={() => setImgIdx((i) => (i - 1 + gallery.length) % gallery.length)}
              aria-label="Sebelumnya"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background border-2 border-foreground flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition"
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
            </button>
            <button
              onClick={() => setImgIdx((i) => (i + 1) % gallery.length)}
              aria-label="Berikutnya"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background border-2 border-foreground flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition"
            >
              <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
            </button>

            <span className="absolute bottom-3 left-3 font-hand text-2xl text-background bg-foreground/80 px-3 py-1 rounded-md">
              {gallery[imgIdx].label}
            </span>

            <div className="absolute top-3 right-3 flex gap-2">
              <button aria-label="Suka" className="w-10 h-10 rounded-full bg-background border-2 border-foreground flex items-center justify-center hover:bg-primary hover:text-primary-foreground">
                <Heart className="w-4 h-4" strokeWidth={2.5} />
              </button>
              <button aria-label="Bagikan" className="w-10 h-10 rounded-full bg-background border-2 border-foreground flex items-center justify-center hover:bg-primary hover:text-primary-foreground">
                <Share2 className="w-4 h-4" strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* Thumbs */}
          <div className="grid grid-cols-4 gap-3">
            {gallery.map((g, i) => (
              <button
                key={g.label}
                onClick={() => setImgIdx(i)}
                className={`aspect-square rounded-lg border-2 flex items-center justify-center text-3xl transition ${
                  imgIdx === i ? "border-primary shadow-[3px_3px_0_0_hsl(var(--primary))]" : "border-foreground/40 hover:border-foreground"
                }`}
                style={{ backgroundColor: activeColor.hex }}
              >
                <span className="opacity-90">🐱</span>
              </button>
            ))}
          </div>
        </div>

        {/* ==== INFO ==== */}
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold mb-3">
            <span className="px-2 py-1 sketch-border-sm bg-card">KAOS</span>
            <span className="px-2 py-1 sketch-border-sm bg-accent">★ Best Seller</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-3">
            Cosmic Cat <span className="brush-highlight">Vibes</span>
          </h1>

          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-5">
            <div className="flex items-center gap-1 text-foreground">
              <Star className="w-4 h-4 fill-accent text-accent" strokeWidth={2} />
              <span className="font-semibold">4.9</span>
            </div>
            <span>·</span>
            <span>328 ulasan</span>
            <span>·</span>
            <span>1.2k terjual</span>
          </div>

          <div className="flex items-end gap-3 mb-7">
            <span className="text-4xl font-extrabold">{fmt(basePrice)}</span>
            <span className="text-lg text-muted-foreground line-through mb-1">Rp 195.000</span>
            <span className="font-hand text-2xl text-primary mb-1">hemat 25%!</span>
          </div>

          {/* Color */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm">
                Warna: <span className="font-normal text-muted-foreground">{activeColor.name}</span>
              </h3>
            </div>
            <div className="flex gap-3">
              {colors.map((c, i) => (
                <button
                  key={c.name}
                  onClick={() => setColorIdx(i)}
                  aria-label={c.name}
                  className={`w-11 h-11 rounded-full border-2 transition ${c.bg} ${
                    colorIdx === i
                      ? "border-primary ring-2 ring-primary ring-offset-2 ring-offset-background scale-110"
                      : "border-foreground hover:scale-105"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm">Ukuran</h3>
              <button className="text-xs font-semibold underline underline-offset-4 hover:text-primary">
                📏 Lihat Size Chart
              </button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`min-w-12 h-11 px-4 rounded-md font-semibold text-sm border-2 transition ${
                    size === s
                      ? "bg-foreground text-background border-foreground shadow-[2px_2px_0_0_hsl(var(--primary))]"
                      : "bg-card border-foreground/40 hover:border-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quality */}
          <div className="mb-6">
            <h3 className="font-semibold text-sm mb-3">Kualitas Bahan</h3>
            <div className="grid sm:grid-cols-3 gap-2">
              {qualities.map((q) => (
                <button
                  key={q.id}
                  onClick={() => setQuality(q.id)}
                  className={`text-left p-3 rounded-lg border-2 transition ${
                    quality === q.id
                      ? "border-primary bg-primary-soft shadow-[3px_3px_0_0_hsl(var(--foreground))]"
                      : "border-foreground/30 hover:border-foreground"
                  }`}
                >
                  <div className="font-bold text-sm">{q.label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{q.desc}</div>
                  <div className="text-sm font-semibold mt-1.5">{fmt(q.price)}</div>
                </button>
              ))}
            </div>
          </div>

          {/* === KILLER FEATURE: TIP JAR === */}
          <div className="relative paper-card p-5 mb-6 bg-primary-soft">
            <svg className="absolute -top-5 -right-3 w-20 h-20 text-foreground" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              {/* Tip jar doodle */}
              <path d="M30 35 L30 85 Q30 90 35 90 L65 90 Q70 90 70 85 L70 35" />
              <path d="M25 35 L75 35" />
              <path d="M35 25 L65 25 L70 35 L30 35 Z" />
              <text x="50" y="68" fontFamily="Caveat, cursive" fontSize="18" fontWeight="700" textAnchor="middle" fill="currentColor" stroke="none">TIP</text>
              <circle cx="50" cy="15" r="3" fill="currentColor" />
              <path d="M40 18 L 35 12 M60 18 L 65 12" />
            </svg>

            <div className="max-w-[75%]">
              <span className="font-hand text-2xl text-primary flex items-center gap-1">
                <Sparkles className="w-5 h-5" /> Tip untuk Seniman
              </span>
              <p className="text-sm text-muted-foreground mt-1 mb-4">
                100% masuk ke kantong kreator. Dukung mereka biar terus berkarya.
              </p>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {tips.map((t) => (
                <button
                  key={t}
                  onClick={() => setTip(t)}
                  className={`py-2.5 rounded-md text-sm font-semibold border-2 transition ${
                    tip === t
                      ? "bg-primary text-primary-foreground border-foreground shadow-[2px_2px_0_0_hsl(var(--foreground))]"
                      : "bg-card border-foreground/30 hover:border-foreground"
                  }`}
                >
                  {t === 0 ? "Lain kali" : `+${(t / 1000)}rb`}
                </button>
              ))}
            </div>
          </div>

          {/* Qty + CTA */}
          <div className="flex items-stretch gap-3 mb-4">
            <div className="flex items-center sketch-border-sm bg-card">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Kurangi" className="w-11 h-12 flex items-center justify-center hover:bg-muted">
                <Minus className="w-4 h-4" strokeWidth={2.5} />
              </button>
              <span className="w-10 text-center font-bold">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} aria-label="Tambah" className="w-11 h-12 flex items-center justify-center hover:bg-muted">
                <Plus className="w-4 h-4" strokeWidth={2.5} />
              </button>
            </div>
            <button onClick={handleAddToCart} className="flex-1 bg-card border-2 border-foreground rounded-lg font-semibold hover:bg-muted transition" style={{ boxShadow: "3px 3px 0 0 hsl(var(--foreground))" }}>
              + Keranjang
            </button>
          </div>

          <button onClick={handleBuyNow} className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-bold text-lg sketch-border-violet hover:translate-x-[-2px] hover:translate-y-[-2px] transition flex items-center justify-between px-6">
            <span>Beli Sekarang</span>
            <span>{fmt(total)}</span>
          </button>

          {/* Trust */}
          <div className="grid grid-cols-3 gap-2 mt-6 text-xs">
            {[
              { icon: Truck, t: "Cetak di vendor terdekatmu" },
              { icon: ShieldCheck, t: "Garansi cetak 100%" },
              { icon: RotateCcw, t: "Retur 7 hari" },
            ].map(({ icon: Icon, t }) => (
              <div key={t} className="flex flex-col items-center text-center gap-1.5 p-3 rounded-lg border-2 border-dashed border-foreground/30">
                <Icon className="w-5 h-5 text-primary" strokeWidth={2.2} />
                <span className="text-muted-foreground leading-tight">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* === ARTIST PROFILE === */}
      <section className="container mx-auto px-4 py-10">
        <div className="paper-card p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-accent border-2 border-foreground flex items-center justify-center text-4xl shrink-0">
            🎨
          </div>
          <div className="flex-1">
            <span className="font-hand text-xl text-primary">Senimannya:</span>
            <h3 className="text-2xl font-extrabold">Rara Doodles</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Ilustrator asal Bandung. Suka kucing, kopi, dan hal-hal absurd.
              48 karya · 4.2k followers
            </p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <button className="flex-1 md:flex-none bg-foreground text-background px-5 py-2.5 rounded-md font-semibold sketch-border-sm hover:bg-foreground/90">
              + Follow
            </button>
            <button className="flex-1 md:flex-none border-2 border-foreground px-5 py-2.5 rounded-md font-semibold hover:bg-muted">
              Lihat Toko
            </button>
          </div>
        </div>
      </section>

      {/* === REVIEWS — POLAROID/WASHI === */}
      <section className="container mx-auto px-4 py-10">
        <div className="flex items-end justify-between flex-wrap gap-3 mb-2">
          <div>
            <span className="font-hand text-2xl text-primary">Kata mereka ✿</span>
            <h2 className="text-3xl md:text-4xl font-extrabold">Ulasan & Unboxing</h2>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 fill-accent text-accent" />
            <span className="font-bold text-xl">4.9</span>
            <span className="text-muted-foreground text-sm">/ 328 ulasan</span>
          </div>
        </div>

        {/* Incentive banner */}
        <div className="mt-4 mb-8 p-4 rounded-lg bg-accent/40 border-2 border-dashed border-foreground/40 flex items-center gap-3 flex-wrap">
          <span className="text-2xl">🎁</span>
          <p className="text-sm flex-1 min-w-[200px]">
            <strong>Unggah video unboxing</strong> dan dapatkan voucher{" "}
            <strong>diskon ongkir 10%</strong> untuk pembelian berikutnya!
          </p>
          <Link to="/write-review" className="text-sm bg-foreground text-background px-4 py-2 rounded-md font-semibold sketch-border-sm">
            Tulis Ulasan
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: "Dimas A.", text: "Bahannya lembut bgt, sablonnya rapi! Worth banget.", rating: 5, color: "bg-pink-100", rot: -2, video: false, emoji: "👕" },
            { name: "Sinta R.", text: "Datang lebih cepat dari estimasi. Packagingnya gemas.", rating: 5, color: "bg-yellow-100", rot: 1.5, video: true, emoji: "📦" },
            { name: "Bagus W.", text: "Warnanya pas kayak di foto. Si seniman makasi yaa!", rating: 5, color: "bg-emerald-100", rot: -1, video: false, emoji: "🐱" },
          ].map((r) => (
            <article
              key={r.name}
              className="relative bg-card paper-card p-3 pb-5"
              style={{ transform: `rotate(${r.rot}deg)` }}
            >
              {/* washi tape */}
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-primary/60 rotate-2 border-l-2 border-r-2 border-foreground/20" />

              <div className={`relative aspect-[4/3] ${r.color} border-2 border-foreground rounded-md flex items-center justify-center overflow-hidden`}>
                <span className="text-7xl">{r.emoji}</span>
                {r.video && (
                  <span className="absolute inset-0 flex items-center justify-center bg-foreground/30">
                    <span className="w-14 h-14 rounded-full bg-background border-2 border-foreground flex items-center justify-center">
                      <span className="w-0 h-0 border-y-[10px] border-y-transparent border-l-[14px] border-l-foreground ml-1" />
                    </span>
                  </span>
                )}
              </div>

              <div className="px-1 pt-3">
                <div className="flex items-center gap-1 mb-1">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="font-hand text-xl leading-snug">"{r.text}"</p>
                <p className="text-xs text-muted-foreground mt-2">— {r.name}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductDetail;
