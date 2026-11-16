import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CreatorCTA = () => {
  return (
    <section id="sell" className="container mx-auto px-4 py-16 md:py-20">
      <div className="relative bg-foreground text-background sketch-border-violet rounded-2xl p-8 md:p-14 overflow-hidden">
        {/* Doodle decorations */}
        <svg className="absolute top-6 right-6 w-24 h-24 text-primary/60" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M50 10 L55 40 L85 40 L62 58 L70 88 L50 70 L30 88 L38 58 L15 40 L45 40 Z" />
        </svg>
        <svg className="absolute bottom-4 left-6 w-20 h-20 text-background/30" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="50" cy="50" r="30" strokeDasharray="4 4" />
          <path d="M35 50 L 65 50 M50 35 L 50 65" strokeLinecap="round" />
        </svg>

        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-2 font-hand text-3xl text-primary mb-3">
            <Sparkles className="w-6 h-6" /> Punya desain sendiri?
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-5">
            Buka tokomu dalam <br />
            <span className="ink-underline">5 menit</span>, mulai cuan hari ini.
          </h2>
          <p className="text-background/70 text-lg mb-7 max-w-lg">
            Zero modal. Zero kirim barang. Kamu fokus berkarya, kami urus
            cetak, kemas, dan logistik.
          </p>

          <div className="flex flex-wrap gap-3 items-center">
            <Link
              to="/auth"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3.5 rounded-lg font-semibold hover:opacity-90 transition"
              style={{ border: "2px solid hsl(var(--background))", boxShadow: "4px 4px 0 0 hsl(var(--background))" }}
            >
              Daftar Gratis <ArrowRight className="w-4 h-4" />
            </Link>
            <span className="font-hand text-2xl text-background/80">
              ← cuma butuh email aja!
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreatorCTA;
