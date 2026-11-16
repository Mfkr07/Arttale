import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Package, Truck, Home, CheckCircle2, Search, Copy, MapPin, Phone,
  MessageCircle, Star, Printer, Box, ArrowRight, Camera
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const steps = [
  { key: "received", label: "Pesanan Diterima", icon: CheckCircle2, time: "Sen, 22 Apr • 14:32" },
  { key: "printing", label: "Sedang Dicetak", icon: Printer, time: "Sel, 23 Apr • 09:10" },
  { key: "packed", label: "Siap Dikirim", icon: Box, time: "Rab, 24 Apr • 16:45" },
  { key: "shipping", label: "Dalam Pengiriman", icon: Truck, time: "Kam, 25 Apr • 08:20" },
  { key: "delivered", label: "Sampai Tujuan", icon: Home, time: "—" },
];

const items = [
  { id: 1, title: "Mecha Sunda — Kaos Hitam", artist: "Sari Wibisono", qty: 1, price: 169000, bg: "bg-pink-100" },
  { id: 2, title: "Senja di Bromo — Sticker Pack", artist: "Studio Kabut", qty: 2, price: 35000, bg: "bg-emerald-100" },
];

const journey = [
  { time: "Kam, 25 Apr • 08:20", event: "Paket diterima kurir JNE di hub Bandung Selatan.", agent: "JNE Hub Bandung" },
  { time: "Rab, 24 Apr • 16:45", event: "Paket selesai dikemas, menunggu pickup kurir.", agent: "Workshop Inkkraft Bandung" },
  { time: "Rab, 24 Apr • 11:02", event: "QC selesai. Estimasi pickup malam ini.", agent: "Tim QC" },
  { time: "Sel, 23 Apr • 09:10", event: "Mulai proses cetak DTF + heat press.", agent: "Vendor #BDG-04" },
  { time: "Sen, 22 Apr • 14:32", event: "Pesanan dibayar & dikonfirmasi.", agent: "Sistem Inkkraft" },
];

const OrderTracking = () => {
  const { id } = useParams();
  const [orderId, setOrderId] = useState(id ?? "INK-2024-0042");
  const [searchInput, setSearchInput] = useState(orderId);

  const currentStepIdx = 3; // Dalam pengiriman
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = 18000;
  const total = subtotal + shipping;

  const copyId = () => navigator.clipboard.writeText(orderId);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero / Search */}
      <section className="relative bg-gradient-to-br from-amber-50 via-background to-primary-soft border-b-2 border-foreground overflow-hidden">
        <svg className="absolute top-6 right-10 w-28 h-28 text-foreground/15 hidden md:block" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10 70 Q 30 30, 50 60 T 90 50" strokeLinecap="round" />
          <path d="M70 50 L 90 50 L 85 45 M 90 50 L 85 55" strokeLinecap="round" />
        </svg>
        <div className="container mx-auto px-4 py-10 md:py-14">
          <div className="max-w-3xl">
            <span className="font-hand text-2xl md:text-3xl text-primary">Lacak pesanan ✉</span>
            <h1 className="text-3xl md:text-4xl font-extrabold mt-1 leading-tight">
              Ke mana <span className="brush-highlight">paketmu</span> sekarang?
            </h1>
            <p className="text-muted-foreground mt-2 text-sm md:text-base max-w-lg">
              Masukkan nomor pesanan untuk melihat tahap produksi & pengiriman secara real-time.
            </p>
            <form
              onSubmit={(e) => { e.preventDefault(); setOrderId(searchInput); }}
              className="mt-5 flex gap-2 max-w-lg"
            >
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" strokeWidth={2.5} />
                <input
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Mis. INK-2024-0042"
                  className="w-full sketch-border-sm bg-card pl-12 pr-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none"
                />
              </div>
              <button className="bg-primary text-primary-foreground px-5 py-3 sketch-border-sm font-bold text-sm" style={{ boxShadow: "3px 3px 0 0 hsl(var(--foreground))" }}>
                Lacak
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10">
        {/* Order header */}
        <div className="paper-card p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <span className="text-xs font-bold inline-flex items-center gap-1 bg-accent/40 px-2 py-1 rounded-full">
              <Truck className="w-3 h-3" /> DALAM PENGIRIMAN
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold mt-2 leading-tight">Pesanan #{orderId}</h2>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-muted-foreground">
              <span>Dibuat: 22 Apr 2024</span>
              <span>•</span>
              <span>Estimasi tiba: <span className="font-bold text-foreground">26–27 Apr 2024</span></span>
              <button onClick={copyId} className="inline-flex items-center gap-1 hover:text-primary">
                <Copy className="w-3.5 h-3.5" /> Salin ID
              </button>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="bg-card sketch-border-sm px-4 py-2.5 font-bold text-sm inline-flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4" /> Chat Support
            </button>
            <button className="bg-foreground text-background sketch-border-sm px-4 py-2.5 font-bold text-sm">
              Invoice
            </button>
          </div>
        </div>

        {/* Status timeline */}
        <div className="paper-card p-5 md:p-8 mt-6">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-extrabold text-lg">Status Produksi & Pengiriman</h3>
            <span className="font-hand text-xl text-primary hidden md:inline">Sabar ya, kreasi sedang lahir ✿</span>
          </div>

          {/* Desktop horizontal */}
          <div className="hidden md:block mt-6">
            <div className="relative">
              <div className="absolute top-6 left-0 right-0 h-1 bg-secondary border-y-2 border-foreground rounded-full" />
              <div
                className="absolute top-6 left-0 h-1 bg-primary border-y-2 border-foreground rounded-full transition-all"
                style={{ width: `${(currentStepIdx / (steps.length - 1)) * 100}%` }}
              />
              <ol className="relative grid grid-cols-5 gap-2">
                {steps.map((s, i) => {
                  const Icon = s.icon;
                  const done = i <= currentStepIdx;
                  const active = i === currentStepIdx;
                  return (
                    <li key={s.key} className="flex flex-col items-center text-center">
                      <div className={`w-12 h-12 rounded-full border-2 border-foreground flex items-center justify-center ${done ? "bg-primary text-primary-foreground" : "bg-card"} ${active ? "ring-4 ring-accent" : ""}`} style={{ boxShadow: "2px 2px 0 0 hsl(var(--foreground))" }}>
                        <Icon className="w-5 h-5" strokeWidth={2.5} />
                      </div>
                      <p className={`mt-3 text-xs font-bold ${done ? "" : "text-muted-foreground"}`}>{s.label}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{s.time}</p>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>

          {/* Mobile vertical */}
          <ol className="md:hidden mt-4 relative pl-6 border-l-2 border-dashed border-foreground space-y-5">
            {steps.map((s, i) => {
              const Icon = s.icon;
              const done = i <= currentStepIdx;
              return (
                <li key={s.key} className="relative">
                  <div className={`absolute -left-[34px] w-10 h-10 rounded-full border-2 border-foreground flex items-center justify-center ${done ? "bg-primary text-primary-foreground" : "bg-card"}`}>
                    <Icon className="w-4 h-4" strokeWidth={2.5} />
                  </div>
                  <p className={`text-sm font-bold ${done ? "" : "text-muted-foreground"}`}>{s.label}</p>
                  <p className="text-xs text-muted-foreground">{s.time}</p>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Two-column: courier + journey | sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Courier card */}
            <div className="paper-card p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="font-hand text-xl text-primary">Kurirmu hari ini ✦</span>
                  <h3 className="font-extrabold text-lg leading-tight mt-1">JNE REG — Resi 1234567890123</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Berat 0.6 kg • Bandung ➝ Jakarta Selatan
                  </p>
                </div>
                <div className="w-14 h-14 rounded-full bg-primary-soft border-2 border-foreground flex items-center justify-center shrink-0">
                  <Truck className="w-6 h-6" strokeWidth={2.5} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <button className="bg-card sketch-border-sm py-2.5 font-bold text-sm inline-flex items-center justify-center gap-1.5">
                  <Copy className="w-4 h-4" /> Salin Resi
                </button>
                <a href="https://www.jne.co.id/id/tracking/trace" target="_blank" rel="noopener noreferrer" className="bg-card sketch-border-sm py-2.5 font-bold text-sm inline-flex items-center justify-center gap-1.5">
                  Buka di JNE <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Journey log */}
            <div className="paper-card p-5">
              <h3 className="font-extrabold text-lg">Perjalanan Paket</h3>
              <ol className="mt-4 relative pl-6 border-l-2 border-dashed border-foreground space-y-5">
                {journey.map((j, i) => (
                  <li key={i} className="relative">
                    <div className={`absolute -left-[28px] top-1 w-4 h-4 rounded-full border-2 border-foreground ${i === 0 ? "bg-primary" : "bg-card"}`} />
                    <p className="text-xs font-bold text-muted-foreground">{j.time}</p>
                    <p className="text-sm font-medium leading-snug mt-0.5">{j.event}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">— {j.agent}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Items */}
            <div className="paper-card p-5">
              <h3 className="font-extrabold text-lg mb-4">Item dalam Pesanan</h3>
              <ul className="divide-y-2 divide-border-soft">
                {items.map((it) => (
                  <li key={it.id} className="py-3 first:pt-0 last:pb-0 flex items-center gap-4">
                    <div className={`w-16 h-16 ${it.bg} rounded-lg border-2 border-foreground flex items-center justify-center shrink-0`}>
                      <Package className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm leading-tight">{it.title}</p>
                      <p className="text-xs text-muted-foreground">oleh {it.artist} • Qty {it.qty}</p>
                    </div>
                    <p className="font-extrabold text-sm">Rp {(it.price * it.qty).toLocaleString("id-ID")}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="paper-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-primary" />
                <h3 className="font-extrabold text-lg">Alamat Pengiriman</h3>
              </div>
              <p className="font-bold text-sm">Rama Pratama</p>
              <p className="text-sm text-muted-foreground mt-1 leading-snug">
                Jl. Kemang Selatan VIII No. 12, Bangka, Mampang Prapatan, Jakarta Selatan, DKI Jakarta 12730
              </p>
              <p className="text-xs text-muted-foreground mt-2 inline-flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" /> +62 812-3456-7890
              </p>
            </div>

            <div className="paper-card p-5">
              <h3 className="font-extrabold text-lg mb-3">Ringkasan Pembayaran</h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>Rp {subtotal.toLocaleString("id-ID")}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Ongkir</dt><dd>Rp {shipping.toLocaleString("id-ID")}</dd></div>
                <div className="flex justify-between border-t-2 border-dashed border-foreground pt-2 mt-2">
                  <dt className="font-extrabold">Total</dt>
                  <dd className="font-extrabold">Rp {total.toLocaleString("id-ID")}</dd>
                </div>
              </dl>
              <p className="text-xs text-muted-foreground mt-3">Dibayar via QRIS — 22 Apr 2024.</p>
            </div>

            <div className="paper-card p-5 bg-accent/30">
              <span className="font-hand text-xl">Sudah sampai? ⭐</span>
              <h3 className="font-extrabold text-lg leading-tight">Tinggalkan video review</h3>
              <p className="text-xs text-muted-foreground mt-2">
                Dapat <span className="font-bold text-foreground">cashback Rp 15.000</span> & dukung sang seniman.
              </p>
              <Link to="/write-review" className="w-full mt-4 bg-foreground text-background sketch-border-sm py-2.5 font-bold text-sm inline-flex items-center justify-center gap-1.5">
                <Camera className="w-4 h-4" /> Unggah Video
              </Link>
              <Link to="/write-review" className="w-full mt-2 bg-card sketch-border-sm py-2.5 font-bold text-sm inline-flex items-center justify-center gap-1.5">
                <Star className="w-4 h-4" /> Beri Rating
              </Link>
            </div>

            <Link to="/catalog" className="block paper-card p-5 hover:bg-secondary transition">
              <p className="font-hand text-xl text-primary">Belanja lagi?</p>
              <p className="text-sm font-bold mt-1 inline-flex items-center gap-1">
                Jelajah karya baru <ArrowRight className="w-4 h-4" />
              </p>
            </Link>
          </aside>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OrderTracking;
