import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check, Package, Truck, Home, Copy, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { findOrder } from "@/lib/orders";

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const urlId = searchParams.get("id");

  const orderId = useMemo(() => {
    return urlId || ("INK-2024-" + Math.floor(Math.random() * 90000 + 10000));
  }, [urlId]);

  const order = useMemo(() => findOrder(orderId), [orderId]);

  const copy = () => {
    navigator.clipboard.writeText(orderId);
    toast.success("Nomor pesanan disalin");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-12 max-w-3xl">
        {/* Hero */}
        <div className="text-center mb-10 relative">
          {/* confetti doodles */}
          <svg className="absolute -top-2 left-1/4 w-12 h-12 text-primary -rotate-12" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M5 20 L 15 20 M20 5 L 20 15 M30 30 L 35 35" />
            <circle cx="10" cy="10" r="2" fill="currentColor" />
          </svg>
          <svg className="absolute top-4 right-1/4 w-14 h-14 text-accent rotate-12" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M20 5 L 22 18 L 35 20 L 22 22 L 20 35 L 18 22 L 5 20 L 18 18 Z" fill="currentColor" />
          </svg>

          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary text-primary-foreground sketch-border-violet mb-5 relative">
            <Check className="w-12 h-12" strokeWidth={3} />
          </div>
          <span className="font-hand text-3xl text-primary block">Yeay, pesananmu masuk! ✦</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-2">Terima Kasih</h1>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto">
            Senimannya udah dapet kabar dan vendor terdekat siap mencetak karyanya.
          </p>
        </div>

        {/* Order ID */}
        <div className="paper-card p-5 flex items-center justify-between gap-3 flex-wrap mb-8">
          <div>
            <p className="text-xs text-muted-foreground">Nomor Pesanan</p>
            <p className="font-mono font-bold text-lg">{orderId}</p>
          </div>
          <button onClick={copy} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md border-2 border-foreground bg-card text-sm font-semibold hover:bg-muted">
            <Copy className="w-3.5 h-3.5" /> Salin
          </button>
        </div>

        {/* Timeline */}
        <div className="paper-card p-6 mb-8">
          <h2 className="font-hand text-2xl mb-5">Perjalanan pesananmu</h2>
          <div className="relative">
            <svg className="absolute left-[18px] top-8 bottom-8 w-1 text-foreground/30" preserveAspectRatio="none" viewBox="0 0 4 200" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4">
              <path d="M2 0 L 2 200" />
            </svg>
            {[
              { icon: Check, t: "Pesanan diterima", d: "Pembayaran berhasil & dikonfirmasi", on: true },
              { icon: Package, t: "Sedang dicetak", d: "Vendor lokal mulai produksi (1–2 hari)", on: false },
              { icon: Truck, t: "Dalam pengiriman", d: "Resi otomatis dikirim ke email", on: false },
              { icon: Home, t: "Sampai di rumahmu", d: "Estimasi 3–5 hari ke depan", on: false },
            ].map(({ icon: Icon, t, d, on }) => (
              <div key={t} className="relative flex items-start gap-4 pb-6 last:pb-0">
                <div className={`relative z-10 w-10 h-10 rounded-full border-2 border-foreground flex items-center justify-center shrink-0 ${
                  on ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground"
                }`}>
                  <Icon className="w-4 h-4" strokeWidth={2.5} />
                </div>
                <div className="pt-1.5">
                  <p className={`font-bold text-sm ${on ? "" : "text-muted-foreground"}`}>{t}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insentif review */}
        <div className="p-5 rounded-xl border-2 border-dashed border-foreground/40 bg-accent/30 flex items-center gap-4 flex-wrap mb-8">
          <span className="text-4xl">🎁</span>
          <div className="flex-1 min-w-[200px]">
            <p className="font-bold">Begitu paket sampai...</p>
            <p className="text-sm text-muted-foreground">
              Unggah video unboxing & dapatkan voucher ongkir 10%!
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 flex-wrap justify-center">
          <Link
            to={`/track/${orderId}`}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-bold sketch-border-violet inline-flex items-center gap-2 hover:translate-x-[-2px] hover:translate-y-[-2px] transition"
          >
            <Truck className="w-5 h-5" /> Lacak Pesanan Saya
          </Link>
          <Link to="/catalog" className="bg-foreground text-background px-6 py-3 rounded-lg font-semibold sketch-border">
            Lanjut Belanja
          </Link>
          <Link to="/" className="bg-card border-2 border-foreground px-6 py-3 rounded-lg font-semibold hover:bg-muted">
            Kembali ke Beranda
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderSuccess;
