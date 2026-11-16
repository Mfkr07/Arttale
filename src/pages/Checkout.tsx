import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart, fmt } from "@/context/CartContext";
import {
  Check, ChevronLeft, Minus, Plus, Trash2, MapPin, Truck,
  CreditCard, ShieldCheck, QrCode, Wallet, Building2, Tag, Sparkles,
} from "lucide-react";

type Step = 1 | 2 | 3;

const COURIERS = [
  { id: "reg", label: "Reguler", eta: "3–5 hari", price: 12000, icon: "🛵" },
  { id: "exp", label: "Express", eta: "1–2 hari", price: 22000, icon: "🚚" },
  { id: "sd", label: "Same Day", eta: "Hari ini", price: 35000, icon: "⚡" },
];

const PAYMENTS = [
  { id: "qris", label: "QRIS", desc: "Scan & bayar dari e-wallet apapun", icon: QrCode, badge: "Populer" },
  { id: "gopay", label: "GoPay", desc: "Saldo & PayLater", icon: Wallet },
  { id: "ovo", label: "OVO", desc: "Saldo OVO", icon: Wallet },
  { id: "va", label: "Virtual Account", desc: "BCA, Mandiri, BNI, BRI", icon: Building2 },
  { id: "card", label: "Kartu Kredit/Debit", desc: "Visa, Mastercard, JCB", icon: CreditCard },
];

const STEPS = [
  { n: 1, label: "Keranjang" },
  { n: 2, label: "Pengiriman" },
  { n: 3, label: "Pembayaran" },
] as const;

const Stepper = ({ step }: { step: Step }) => (
  <div className="flex items-center justify-center gap-2 md:gap-4 mb-8">
    {STEPS.map((s, i) => {
      const done = step > s.n;
      const active = step === s.n;
      return (
        <div key={s.n} className="flex items-center gap-2 md:gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-9 h-9 rounded-full border-2 border-foreground flex items-center justify-center font-bold text-sm transition ${
              done ? "bg-primary text-primary-foreground" :
              active ? "bg-foreground text-background shadow-[2px_2px_0_0_hsl(var(--primary))]" :
              "bg-card text-muted-foreground"
            }`}>
              {done ? <Check className="w-4 h-4" strokeWidth={3} /> : s.n}
            </div>
            <span className={`text-sm font-semibold hidden sm:block ${active || done ? "text-foreground" : "text-muted-foreground"}`}>
              {s.label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <svg className="w-8 md:w-14 h-3 text-foreground/40" viewBox="0 0 60 10" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round">
              <path d="M2 5 L 58 5" />
            </svg>
          )}
        </div>
      );
    })}
  </div>
);

const Checkout = () => {
  const navigate = useNavigate();
  const { items, update, remove, subtotal, count } = useCart();
  const [step, setStep] = useState<Step>(1);

  // Shipping
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [courier, setCourier] = useState("reg");

  // Payment
  const [payment, setPayment] = useState("qris");
  const [voucher, setVoucher] = useState("");
  const [voucherApplied, setVoucherApplied] = useState(0);

  const shippingPrice = COURIERS.find((c) => c.id === courier)!.price;
  // Subsidi ongkir kalau subtotal > 200rb
  const shippingSubsidy = subtotal > 200000 ? Math.min(shippingPrice, 10000) : 0;
  const finalShipping = Math.max(0, shippingPrice - shippingSubsidy);
  const total = subtotal + finalShipping - voucherApplied;
  const totalTip = items.reduce((s, i) => s + i.tip * i.qty, 0);

  const applyVoucher = () => {
    if (voucher.trim().toUpperCase() === "INKKRAFT10") {
      setVoucherApplied(Math.round(subtotal * 0.1));
      toast.success("Voucher diterapkan! Diskon 10%");
    } else if (voucher.trim()) {
      toast.error("Kode voucher tidak ditemukan");
      setVoucherApplied(0);
    }
  };

  const canProceedShipping = name && phone && zip && address && city;

  const handlePay = () => {
    toast.success("Pesanan berhasil dibuat!");
    setTimeout(() => navigate("/order-success"), 600);
  };

  // ==== EMPTY STATE ====
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-20">
          <div className="paper-card max-w-md mx-auto p-10 text-center">
            <div className="text-7xl mb-3">🛒</div>
            <h2 className="font-hand text-4xl mb-2">Keranjangmu kosong</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Yuk jelajahi karya seniman lokal dan dukung mereka.
            </p>
            <Link to="/catalog" className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold sketch-border-violet">
              Jelajahi Karya
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <Link to="/catalog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-4">
          <ChevronLeft className="w-4 h-4" /> Lanjut belanja
        </Link>

        <h1 className="text-3xl md:text-4xl font-extrabold mb-1">Checkout</h1>
        <p className="font-hand text-xl text-primary mb-6">selangkah lagi sampai di rumah ✦</p>

        <Stepper step={step} />

        <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
          {/* ============ MAIN ============ */}
          <div>
            {/* ---- STEP 1: CART ---- */}
            {step === 1 && (
              <div className="space-y-4">
                {items.map((it) => (
                  <div key={it.id} className="paper-card p-4 flex gap-4">
                    <div className={`w-24 h-24 sm:w-28 sm:h-28 ${it.bg} border-2 border-foreground rounded-lg flex items-center justify-center shrink-0`}>
                      <span className="text-5xl">{it.emoji}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold leading-tight">{it.title}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">oleh {it.artist}</p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        <span className="text-[11px] px-2 py-0.5 rounded border border-foreground/30 bg-card">{it.color}</span>
                        <span className="text-[11px] px-2 py-0.5 rounded border border-foreground/30 bg-card">{it.size}</span>
                        <span className="text-[11px] px-2 py-0.5 rounded border border-foreground/30 bg-card">{it.quality}</span>
                      </div>
                      {it.tip > 0 && (
                        <p className="text-xs text-primary mt-2 font-semibold inline-flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> +{fmt(it.tip)} tip untuk seniman
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-3 gap-2 flex-wrap">
                        <div className="flex items-center sketch-border-sm bg-card">
                          <button onClick={() => update(it.id, it.qty - 1)} aria-label="Kurangi" className="w-8 h-9 flex items-center justify-center hover:bg-muted">
                            <Minus className="w-3.5 h-3.5" strokeWidth={2.5} />
                          </button>
                          <span className="w-8 text-center font-bold text-sm">{it.qty}</span>
                          <button onClick={() => update(it.id, it.qty + 1)} aria-label="Tambah" className="w-8 h-9 flex items-center justify-center hover:bg-muted">
                            <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
                          </button>
                        </div>
                        <p className="font-bold">{fmt((it.price + it.tip) * it.qty)}</p>
                      </div>
                    </div>
                    <button onClick={() => remove(it.id)} aria-label="Hapus" className="self-start p-2 text-muted-foreground hover:text-destructive transition">
                      <Trash2 className="w-4 h-4" strokeWidth={2.2} />
                    </button>
                  </div>
                ))}

                {/* Voucher */}
                <div className="paper-card p-4 bg-accent/30">
                  <label className="text-sm font-semibold flex items-center gap-2 mb-2">
                    <Tag className="w-4 h-4" /> Punya kode voucher?
                  </label>
                  <div className="flex gap-2">
                    <input
                      value={voucher}
                      onChange={(e) => setVoucher(e.target.value)}
                      placeholder="Contoh: INKKRAFT10"
                      className="flex-1 sketch-border-sm bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button onClick={applyVoucher} className="bg-foreground text-background px-5 py-2.5 rounded-md font-semibold text-sm sketch-border-sm">
                      Pakai
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ---- STEP 2: SHIPPING ---- */}
            {step === 2 && (
              <div className="space-y-6">
                <section className="paper-card p-5">
                  <h2 className="font-hand text-2xl mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" /> Alamat Pengiriman
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Field label="Nama Penerima" value={name} onChange={setName} placeholder="Nama lengkap" />
                    <Field label="No. HP" value={phone} onChange={setPhone} placeholder="0812..." />
                    <Field label="Kota" value={city} onChange={setCity} placeholder="Misal: Bandung" />
                    <Field label="Kode Pos" value={zip} onChange={setZip} placeholder="40123" />
                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold uppercase tracking-wide block mb-1.5">Alamat Lengkap</label>
                      <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        rows={3}
                        placeholder="Jalan, RT/RW, kelurahan, kecamatan..."
                        className="w-full sketch-border-sm bg-card px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      />
                    </div>
                  </div>
                  {zip && (
                    <div className="mt-4 p-3 rounded-md bg-primary-soft border-2 border-dashed border-primary text-sm flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <p>Vendor terdekatmu di <strong>Bandung Kota</strong>. Biaya cetak sudah dioptimasi 🎉</p>
                    </div>
                  )}
                </section>

                <section className="paper-card p-5">
                  <h2 className="font-hand text-2xl mb-4 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-primary" /> Pilih Kurir
                  </h2>
                  <div className="space-y-2">
                    {COURIERS.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setCourier(c.id)}
                        className={`w-full text-left flex items-center gap-4 p-3 rounded-lg border-2 transition ${
                          courier === c.id ? "border-primary bg-primary-soft shadow-[3px_3px_0_0_hsl(var(--foreground))]" : "border-foreground/30 hover:border-foreground"
                        }`}
                      >
                        <span className="text-3xl">{c.icon}</span>
                        <div className="flex-1">
                          <div className="font-bold text-sm">{c.label}</div>
                          <div className="text-xs text-muted-foreground">{c.eta}</div>
                        </div>
                        <span className="font-bold text-sm">{fmt(c.price)}</span>
                      </button>
                    ))}
                  </div>
                  {shippingSubsidy > 0 && (
                    <p className="text-xs text-primary mt-3 font-semibold">
                      ✦ Belanjamu di atas Rp 200rb — subsidi ongkir {fmt(shippingSubsidy)} otomatis aktif!
                    </p>
                  )}
                </section>
              </div>
            )}

            {/* ---- STEP 3: PAYMENT ---- */}
            {step === 3 && (
              <div className="space-y-5">
                <section className="paper-card p-5">
                  <h2 className="font-hand text-2xl mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary" /> Metode Pembayaran
                  </h2>
                  <div className="space-y-2">
                    {PAYMENTS.map((p) => {
                      const Icon = p.icon;
                      const on = payment === p.id;
                      return (
                        <button
                          key={p.id}
                          onClick={() => setPayment(p.id)}
                          className={`w-full flex items-center gap-4 p-3 rounded-lg border-2 transition text-left ${
                            on ? "border-primary bg-primary-soft shadow-[3px_3px_0_0_hsl(var(--foreground))]" : "border-foreground/30 hover:border-foreground"
                          }`}
                        >
                          <div className="w-11 h-11 rounded-md border-2 border-foreground bg-card flex items-center justify-center shrink-0">
                            <Icon className="w-5 h-5" strokeWidth={2.2} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm">{p.label}</span>
                              {p.badge && <span className="text-[10px] bg-accent border border-foreground px-1.5 py-0.5 rounded font-bold">{p.badge}</span>}
                            </div>
                            <div className="text-xs text-muted-foreground">{p.desc}</div>
                          </div>
                          <span className={`w-5 h-5 rounded-full border-2 border-foreground flex items-center justify-center ${on ? "bg-primary" : "bg-card"}`}>
                            {on && <span className="w-2 h-2 rounded-full bg-background" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </section>

                <div className="paper-card p-5 bg-foreground text-background">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-8 h-8 text-primary shrink-0" strokeWidth={2.2} />
                    <p className="text-sm leading-snug">
                      Pembayaran aman dengan enkripsi end-to-end. Dana ditahan
                      hingga pesananmu sampai dengan selamat.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ---- NAV BUTTONS ---- */}
            <div className="flex items-center justify-between mt-8 gap-3">
              {step > 1 ? (
                <button
                  onClick={() => setStep((s) => (s - 1) as Step)}
                  className="inline-flex items-center gap-1.5 px-5 py-3 rounded-lg font-semibold border-2 border-foreground bg-card hover:bg-muted"
                >
                  <ChevronLeft className="w-4 h-4" /> Kembali
                </button>
              ) : (
                <span />
              )}

              {step < 3 ? (
                <button
                  onClick={() => {
                    if (step === 2 && !canProceedShipping) {
                      toast.error("Lengkapi alamat pengiriman dulu ya");
                      return;
                    }
                    setStep((s) => (s + 1) as Step);
                  }}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-bold sketch-border-violet hover:translate-x-[-2px] hover:translate-y-[-2px] transition"
                >
                  Lanjutkan
                </button>
              ) : (
                <button
                  onClick={handlePay}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-bold sketch-border-violet hover:translate-x-[-2px] hover:translate-y-[-2px] transition"
                >
                  Bayar Sekarang
                </button>
              )}
            </div>
          </div>

          {/* ============ ORDER SUMMARY (sticky) ============ */}
          <aside className="lg:sticky lg:top-24">
            <div className="paper-card p-5">
              <h3 className="font-hand text-2xl mb-4">Ringkasan</h3>

              <div className="space-y-2.5 text-sm pb-4 border-b-2 border-dashed border-foreground/20">
                <Row label={`Subtotal (${count} item)`} value={fmt(subtotal - totalTip)} />
                {totalTip > 0 && <Row label="Tip untuk seniman" value={fmt(totalTip)} accent />}
                {step >= 2 && (
                  <>
                    <Row label="Ongkir" value={fmt(shippingPrice)} />
                    {shippingSubsidy > 0 && (
                      <Row label="Subsidi ongkir" value={`- ${fmt(shippingSubsidy)}`} accent />
                    )}
                  </>
                )}
                {voucherApplied > 0 && (
                  <Row label={`Voucher (${voucher.toUpperCase()})`} value={`- ${fmt(voucherApplied)}`} accent />
                )}
              </div>

              <div className="flex items-end justify-between pt-4">
                <span className="font-bold">Total</span>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Termasuk pajak</p>
                  <p className="text-2xl font-extrabold">{fmt(step >= 2 ? total : subtotal)}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t-2 border-dashed border-foreground/20">
                <p className="font-hand text-base text-primary leading-snug">
                  100% tip langsung ke kantong seniman ♥
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const Field = ({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) => (
  <div>
    <label className="text-xs font-bold uppercase tracking-wide block mb-1.5">{label}</label>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full sketch-border-sm bg-card px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
    />
  </div>
);

const Row = ({ label, value, accent }: { label: string; value: string; accent?: boolean }) => (
  <div className="flex items-center justify-between">
    <span className="text-muted-foreground">{label}</span>
    <span className={`font-semibold ${accent ? "text-primary" : ""}`}>{value}</span>
  </div>
);

export default Checkout;
