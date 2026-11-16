import heroImg from "@/assets/hero-illustration.png";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Doodle decorations */}
      <svg className="absolute top-10 left-6 w-16 h-16 text-foreground/30 hidden md:block" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M20 50 Q 35 20, 50 50 T 80 50" />
        <circle cx="50" cy="50" r="3" fill="currentColor" />
      </svg>
      <svg className="absolute bottom-10 right-10 w-20 h-20 text-primary/40 hidden md:block" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M30 30 L70 70 M70 30 L30 70" />
        <circle cx="50" cy="50" r="25" strokeDasharray="4 4" />
      </svg>

      <div className="container mx-auto px-4 py-12 md:py-20 grid lg:grid-cols-2 gap-10 items-center">
        {/* Copy */}
        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 font-hand text-2xl text-primary mb-3">
            <Sparkles className="w-5 h-5" /> Halo, seniman lokal!
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] mb-6 text-balance">
            Coretanmu.
            <br />
            Dicetak. <span className="brush-highlight">Dicintai.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
            Unggah satu desain — sistem kami otomatis menempelkannya ke
            puluhan produk. Tanpa modal, tanpa ribet kirim barang.
            Kamu cukup berkarya.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3.5 rounded-lg font-semibold sketch-border hover:translate-x-[-2px] hover:translate-y-[-2px] transition"
            >
              Jelajahi Karya <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/sell"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3.5 rounded-lg font-semibold sketch-border-violet hover:translate-x-[-2px] hover:translate-y-[-2px] transition"
            >
              Mulai Jualan
            </Link>
          </div>

          <div className="flex items-center gap-6 mt-8 text-sm text-muted-foreground">
            <div>
              <div className="font-bold text-2xl text-foreground">2.4K+</div>
              <div>Seniman aktif</div>
            </div>
            <div className="w-px h-10 bg-foreground/20" />
            <div>
              <div className="font-bold text-2xl text-foreground">50+</div>
              <div>Jenis produk</div>
            </div>
            <div className="w-px h-10 bg-foreground/20" />
            <div>
              <div className="font-bold text-2xl text-foreground">100%</div>
              <div>Tip ke seniman</div>
            </div>
          </div>
        </div>

        {/* Illustration */}
        <div className="relative">
          <div className="absolute inset-0 bg-primary/10 rounded-[40%_60%_50%_50%/60%_40%_60%_40%] blur-2xl" />
          <img
            src={heroImg}
            alt="Ilustrasi seniman menggambar dan karya berubah jadi produk fisik"
            width={1536}
            height={1024}
            className="relative w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
