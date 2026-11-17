import { useState, useMemo, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Package, Truck, Home, CheckCircle2, Search, Copy, MapPin, Phone,
  MessageCircle, Star, Printer, Box, ArrowRight, Camera, Sparkles, Check
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { findOrder, getStoredOrders, StoredOrder, OrderStep } from "@/lib/orders";

const stepMeta: { key: OrderStep; label: string; icon: any }[] = [
  { key: "received", label: "Pesanan Diterima", icon: CheckCircle2 },
  { key: "printing", label: "Sedang Dicetak", icon: Printer },
  { key: "packed", label: "Siap Dikirim", icon: Box },
  { key: "shipping", label: "Dalam Pengiriman", icon: Truck },
  { key: "delivered", label: "Sampai Tujuan", icon: Home },
];

const stepKeyToIndex: Record<OrderStep, number> = {
  received: 0,
  printing: 1,
  packed: 2,
  shipping: 3,
  delivered: 4,
};

const fmt = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;

const OrderTracking = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [storedOrders, setStoredOrders] = useState<StoredOrder[]>([]);

  useEffect(() => {
    setStoredOrders(getStoredOrders());
  }, []);

  const defaultId = useMemo(() => {
    if (id) return id;
    if (storedOrders.length > 0) return storedOrders[0].id;
    return "INK-2024-0042";
  }, [id, storedOrders]);

  const [orderId, setOrderId] = useState(defaultId);
  const [searchInput, setSearchInput] = useState(defaultId);

  useEffect(() => {
    if (id) {
      setOrderId(id);
      setSearchInput(id);
    } else if (storedOrders.length > 0 && !id) {
      setOrderId(storedOrders[0].id);
      setSearchInput(storedOrders[0].id);
    }
  }, [id, storedOrders]);

  const currentOrder = useMemo(() => {
    return findOrder(orderId) || storedOrders.find((o) => o.id === orderId) || storedOrders[0];
  }, [orderId, storedOrders]);

  const currentStepIdx = currentOrder ? stepKeyToIndex[currentOrder.status] ?? 1 : 1;

  const dynamicSteps = useMemo(() => {
    if (!currentOrder) return [];
    return stepMeta.map((s, i) => {
      let timeText = "—";
      if (s.key === "received") timeText = currentOrder.payment.paidAt;
      else if (s.key === "printing") timeText = currentStepIdx >= 1 ? currentOrder.createdAt : "Antrean Vendor";
      else if (s.key === "packed") timeText = currentStepIdx >= 2 ? "Selesai QC & Packing" : "Menunggu Selesai Cetak";
      else if (s.key === "shipping") timeText = currentStepIdx >= 3 ? "Pickup Kurir" : "Menunggu Kurir";
      else if (s.key === "delivered") timeText = currentStepIdx >= 4 ? "Terkirim" : "Estimasi " + currentOrder.estimatedDelivery;

      return {
        ...s,
        time: timeText,
      };
    });
  }, [currentOrder, currentStepIdx]);

  const copyId = () => {
    if (currentOrder) {
      navigator.clipboard.writeText(currentOrder.id);
      toast.success("Nomor pesanan disalin");
    }
  };

  const copyResi = () => {
    if (currentOrder) {
      navigator.clipboard.writeText(currentOrder.courier.trackingNumber);
      toast.success("Nomor resi kurir disalin");
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchInput.trim();
    if (!query) return;
    setOrderId(query);
    navigate(`/track/${query}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
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

            <form onSubmit={handleSearch} className="mt-5 flex gap-2 max-w-lg">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" strokeWidth={2.5} />
                <input
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Mis. INK-2026-1234 atau INK-2024-0042"
                  className="w-full sketch-border-sm bg-card pl-12 pr-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="bg-primary text-primary-foreground px-5 py-3 sketch-border-sm font-bold text-sm hover:translate-x-[-1px] hover:translate-y-[-1px] transition"
                style={{ boxShadow: "3px 3px 0 0 hsl(var(--foreground))" }}
              >
                Lacak
              </button>
            </form>

            {/* Quick Switcher for Stored Orders */}
            {storedOrders.length > 0 && (
              <div className="mt-4 flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-muted-foreground">Pesanan Kamu:</span>
                {storedOrders.map((o) => (
                  <button
                    key={o.id}
                    onClick={() => {
                      setOrderId(o.id);
                      setSearchInput(o.id);
                      navigate(`/track/${o.id}`);
                    }}
                    className={`text-xs px-2.5 py-1 rounded-md border-2 font-mono transition ${
                      o.id.toUpperCase() === orderId.toUpperCase()
                        ? "bg-foreground text-background border-foreground font-bold shadow-[2px_2px_0_0_hsl(var(--primary))]"
                        : "bg-card border-foreground/30 hover:border-foreground"
                    }`}
                  >
                    #{o.id} {o.status === "printing" ? "🎨" : o.status === "shipping" ? "🚚" : "📦"}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {currentOrder ? (
        <section className="container mx-auto px-4 py-10">
          {/* Order header */}
          <div className="paper-card p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <span className={`text-xs font-bold inline-flex items-center gap-1 px-3 py-1 rounded-full ${
                currentOrder.status === "printing" ? "bg-accent text-accent-foreground border-2 border-foreground/30" :
                currentOrder.status === "shipping" ? "bg-primary text-primary-foreground" :
                "bg-emerald-100 text-emerald-800 border-2 border-emerald-700/30"
              }`}>
                {currentOrder.status === "printing" ? <Printer className="w-3.5 h-3.5" /> : <Truck className="w-3.5 h-3.5" />}
                {currentOrder.statusLabel}
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold mt-2 leading-tight">Pesanan #{currentOrder.id}</h2>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-muted-foreground">
                <span>Dibuat: {currentOrder.createdAt}</span>
                <span>•</span>
                <span>Estimasi tiba: <span className="font-bold text-foreground">{currentOrder.estimatedDelivery}</span></span>
                <button onClick={copyId} className="inline-flex items-center gap-1 hover:text-primary font-semibold">
                  <Copy className="w-3.5 h-3.5" /> Salin ID
                </button>
              </div>
            </div>
            <div className="flex gap-2">
              <a
                href="https://wa.me/?text=Halo%20Admin%20Arttale,%20saya%20mau%20tanya%20pesanan%20saya"
                target="_blank"
                rel="noreferrer"
                className="bg-card sketch-border-sm px-4 py-2.5 font-bold text-sm inline-flex items-center gap-1.5 hover:bg-muted"
              >
                <MessageCircle className="w-4 h-4" /> Chat Support
              </a>
              <button
                onClick={() => window.print()}
                className="bg-foreground text-background sketch-border-sm px-4 py-2.5 font-bold text-sm hover:bg-foreground/90"
              >
                Invoice
              </button>
            </div>
          </div>

          {/* Status timeline */}
          <div className="paper-card p-5 md:p-8 mt-6">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-extrabold text-lg">Status Produksi & Pengiriman</h3>
              <span className="font-hand text-xl text-primary hidden md:inline">
                {currentOrder.status === "printing" ? "Seniman & Vendor sedang menyiapkan karyamu ✿" : "Sabar ya, kreasi sedang meluncur ✿"}
              </span>
            </div>

            {/* Desktop horizontal */}
            <div className="hidden md:block mt-6">
              <div className="relative">
                <div className="absolute top-6 left-0 right-0 h-1 bg-secondary border-y-2 border-foreground rounded-full" />
                <div
                  className="absolute top-6 left-0 h-1 bg-primary border-y-2 border-foreground rounded-full transition-all"
                  style={{ width: `${(currentStepIdx / (dynamicSteps.length - 1)) * 100}%` }}
                />
                <ol className="relative grid grid-cols-5 gap-2">
                  {dynamicSteps.map((s, i) => {
                    const Icon = s.icon;
                    const done = i <= currentStepIdx;
                    const active = i === currentStepIdx;
                    return (
                      <li key={s.key} className="flex flex-col items-center text-center">
                        <div
                          className={`w-12 h-12 rounded-full border-2 border-foreground flex items-center justify-center transition ${
                            done ? "bg-primary text-primary-foreground" : "bg-card"
                          } ${active ? "ring-4 ring-accent scale-105" : ""}`}
                          style={{ boxShadow: "2px 2px 0 0 hsl(var(--foreground))" }}
                        >
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
              {dynamicSteps.map((s, i) => {
                const Icon = s.icon;
                const done = i <= currentStepIdx;
                return (
                  <li key={s.key} className="relative">
                    <div className={`absolute -left-[34px] w-10 h-10 rounded-full border-2 border-foreground flex items-center justify-center ${
                      done ? "bg-primary text-primary-foreground" : "bg-card"
                    }`}>
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
                    <span className="font-hand text-xl text-primary">Kurir & Pengiriman ✦</span>
                    <h3 className="font-extrabold text-lg leading-tight mt-1">
                      {currentOrder.courier.name} — Resi {currentOrder.courier.trackingNumber}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Berat {currentOrder.courier.weight} • {currentOrder.courier.route}
                    </p>
                  </div>
                  <div className="w-14 h-14 rounded-full bg-primary-soft border-2 border-foreground flex items-center justify-center shrink-0">
                    <Truck className="w-6 h-6" strokeWidth={2.5} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <button
                    onClick={copyResi}
                    className="bg-card sketch-border-sm py-2.5 font-bold text-sm inline-flex items-center justify-center gap-1.5 hover:bg-muted"
                  >
                    <Copy className="w-4 h-4" /> Salin Resi
                  </button>
                  <a
                    href="https://www.google.com/search?q=cek+resi+kurir"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-card sketch-border-sm py-2.5 font-bold text-sm inline-flex items-center justify-center gap-1.5 hover:bg-muted"
                  >
                    Lacak di Ekspedisi <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Journey log */}
              <div className="paper-card p-5">
                <h3 className="font-extrabold text-lg">Perjalanan Paket & Work Order</h3>
                <ol className="mt-4 relative pl-6 border-l-2 border-dashed border-foreground space-y-5">
                  {currentOrder.journey.map((j, i) => (
                    <li key={i} className="relative">
                      <div className={`absolute -left-[28px] top-1 w-4 h-4 rounded-full border-2 border-foreground ${
                        i === 0 ? "bg-primary" : "bg-card"
                      }`} />
                      <p className="text-xs font-bold text-muted-foreground">{j.time}</p>
                      <p className="text-sm font-medium leading-snug mt-0.5">{j.event}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">— {j.agent}</p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Items */}
              <div className="paper-card p-5">
                <h3 className="font-extrabold text-lg mb-4">Item dalam Pesanan ({currentOrder.items.length})</h3>
                <ul className="divide-y-2 divide-border-soft">
                  {currentOrder.items.map((it, idx) => (
                    <li key={it.id || idx} className="py-3 first:pt-0 last:pb-0 flex items-center gap-4">
                      <div className={`w-16 h-16 ${it.bg || "bg-primary-soft"} rounded-lg border-2 border-foreground flex items-center justify-center shrink-0 text-3xl`}>
                        {it.emoji || <Package className="w-6 h-6" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm leading-tight">{it.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          oleh <strong>{it.artist}</strong> • Qty {it.qty}
                          {it.color && it.color !== "—" ? ` • Warna: ${it.color}` : ""}
                          {it.size ? ` • Size: ${it.size}` : ""}
                          {it.quality ? ` • ${it.quality}` : ""}
                        </p>
                        {it.tip && it.tip > 0 ? (
                          <span className="text-[10px] font-semibold text-primary font-hand inline-block mt-0.5">
                            + Termasuk Tip Seniman ({fmt(it.tip * it.qty)})
                          </span>
                        ) : null}
                      </div>
                      <div className="text-right">
                        <p className="font-extrabold text-sm">{fmt(it.price * it.qty)}</p>
                        <p className="text-[10px] text-muted-foreground">@{fmt(it.price)}</p>
                      </div>
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
                <p className="font-bold text-sm">{currentOrder.shippingAddress.name}</p>
                <p className="text-sm text-muted-foreground mt-1 leading-snug">
                  {currentOrder.shippingAddress.address}, {currentOrder.shippingAddress.city} {currentOrder.shippingAddress.zip}
                </p>
                <p className="text-xs text-muted-foreground mt-2 inline-flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" /> {currentOrder.shippingAddress.phone}
                </p>
              </div>

              <div className="paper-card p-5">
                <h3 className="font-extrabold text-lg mb-3">Ringkasan Pembayaran</h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Subtotal Produk</dt>
                    <dd>{fmt(currentOrder.payment.subtotal)}</dd>
                  </div>
                  {currentOrder.payment.totalTip > 0 && (
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Tip Seniman (100%)</dt>
                      <dd className="text-primary font-semibold">{fmt(currentOrder.payment.totalTip)}</dd>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Ongkir ({currentOrder.courier.name})</dt>
                    <dd>{fmt(currentOrder.payment.shippingPrice)}</dd>
                  </div>
                  {currentOrder.payment.shippingSubsidy > 0 && (
                    <div className="flex justify-between">
                      <dt className="text-primary font-semibold">Subsidi Ongkir</dt>
                      <dd className="text-primary font-semibold">- {fmt(currentOrder.payment.shippingSubsidy)}</dd>
                    </div>
                  )}
                  {currentOrder.payment.voucherDiscount > 0 && (
                    <div className="flex justify-between">
                      <dt className="text-primary font-semibold">Diskon Voucher</dt>
                      <dd className="text-primary font-semibold">- {fmt(currentOrder.payment.voucherDiscount)}</dd>
                    </div>
                  )}
                  <div className="flex justify-between border-t-2 border-dashed border-foreground pt-2 mt-2">
                    <dt className="font-extrabold">Total Bayar</dt>
                    <dd className="font-extrabold text-base text-foreground">{fmt(currentOrder.payment.total)}</dd>
                  </div>
                </dl>
                <p className="text-xs text-muted-foreground mt-3">
                  Dibayar via {currentOrder.payment.method} — {currentOrder.payment.paidAt}
                </p>
              </div>

              <div className="paper-card p-5 bg-accent/30">
                <span className="font-hand text-xl">Sudah sampai? ⭐</span>
                <h3 className="font-extrabold text-lg leading-tight">Tinggalkan video review</h3>
                <p className="text-xs text-muted-foreground mt-2">
                  Dapat <span className="font-bold text-foreground">voucher diskon 10%</span> & dukung sang seniman.
                </p>
                <Link
                  to="/write-review"
                  className="w-full mt-4 bg-foreground text-background sketch-border-sm py-2.5 font-bold text-sm inline-flex items-center justify-center gap-1.5 hover:bg-foreground/90"
                >
                  <Camera className="w-4 h-4" /> Unggah Video
                </Link>
                <Link
                  to="/write-review"
                  className="w-full mt-2 bg-card sketch-border-sm py-2.5 font-bold text-sm inline-flex items-center justify-center gap-1.5 hover:bg-muted"
                >
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
      ) : (
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="paper-card max-w-md mx-auto p-8">
            <div className="text-5xl mb-3">🔍</div>
            <h2 className="font-hand text-3xl mb-2">Pesanan Tidak Ditemukan</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Nomor pesanan #{orderId} tidak terdaftar di sistem. Coba cek kembali nomor pesanannya.
            </p>
            <Link to="/catalog" className="bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-bold sketch-border-violet">
              Kembali ke Katalog
            </Link>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default OrderTracking;
