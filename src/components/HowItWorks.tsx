import { Upload, ShoppingCart, Printer, Bike } from "lucide-react";

const steps = [
  { icon: Upload, title: "Unggah Desain", desc: "Drop satu PNG. Sistem auto-mockup ke 50+ produk.", n: "01" },
  { icon: ShoppingCart, title: "Pesanan Masuk", desc: "Konsumen pilih produk, warna, ukuran. Bayar via QRIS.", n: "02" },
  { icon: Printer, title: "Vendor Cetak", desc: "Vendor terdekat menerima work order otomatis.", n: "03" },
  { icon: Bike, title: "Kurir Kirim", desc: "Resi terbit otomatis. Konsumen happy, kamu cuan.", n: "04" },
];

const HowItWorks = () => {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24 relative">
      <div className="text-center mb-14">
        <span className="font-hand text-2xl text-primary">Simpel banget kok ✦</span>
        <h2 className="text-4xl md:text-5xl font-extrabold mt-2">Cara Kerjanya</h2>
        <p className="text-muted-foreground mt-3 max-w-md mx-auto">
          Empat langkah dari coretan jadi cuan. Serius, segampang itu.
        </p>
      </div>

      {/* Dashed treasure-map line on desktop */}
      <svg className="hidden lg:block absolute top-1/2 left-12 right-12 h-24 -translate-y-1/2 text-foreground/30 z-0 pointer-events-none" viewBox="0 0 1200 100" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 8" strokeLinecap="round" preserveAspectRatio="none">
        <path d="M50 50 Q 250 -10, 400 50 T 800 50 T 1150 50" />
      </svg>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {steps.map(({ icon: Icon, title, desc, n }, i) => (
          <div
            key={title}
            className="paper-card p-6 relative bg-card"
            style={{ transform: `rotate(${(i % 2 === 0 ? -1 : 1) * 0.8}deg)` }}
          >
            <span className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-primary text-primary-foreground sketch-border-sm flex items-center justify-center font-hand text-xl">
              {n}
            </span>
            <div className="w-14 h-14 rounded-lg bg-primary-soft border-2 border-foreground flex items-center justify-center mb-4">
              <Icon className="w-7 h-7 text-foreground" strokeWidth={2.2} />
            </div>
            <h3 className="font-bold text-lg mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
