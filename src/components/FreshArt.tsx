import { Heart, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const products = [
  { id: 1, title: "Cosmic Cat Vibes", artist: "Rara Doodles", price: "Rp 145.000", tag: "Kaos", color: "bg-foreground", design: "🐱" },
  { id: 2, title: "Local Brew Forever", artist: "Kopi & Kanvas", price: "Rp 65.000", tag: "Stiker", color: "bg-amber-100", design: "☕" },
  { id: 3, title: "Pegunungan Sunyi", artist: "Bumi Studio", price: "Rp 85.000", tag: "Tote Bag", color: "bg-stone-100", design: "🏔️" },
  { id: 4, title: "Senja di Jogja", artist: "Indra Lukis", price: "Rp 175.000", tag: "Hoodie", color: "bg-primary/20", design: "🌅" },
  { id: 5, title: "Garage Punk Dreams", artist: "Riot Press", price: "Rp 35.000", tag: "Stiker", color: "bg-red-100", design: "🎸" },
  { id: 6, title: "Nasi Goreng Society", artist: "Lapar Club", price: "Rp 155.000", tag: "Kaos", color: "bg-yellow-100", design: "🍳" },
  { id: 7, title: "Mountain Soul", artist: "Bumi Studio", price: "Rp 110.000", tag: "Casing HP", color: "bg-emerald-100", design: "⛰️" },
  { id: 8, title: "Ngopi Dulu", artist: "Kopi & Kanvas", price: "Rp 95.000", tag: "Mug", color: "bg-card", design: "☕" },
];

const FreshArt = () => {
  return (
    <section id="explore" className="container mx-auto px-4 py-16">
      <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
        <div>
          <span className="font-hand text-2xl text-primary">Baru aja diunggah ✿</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-1">Karya Segar Hari Ini</h2>
        </div>
        <Link to="/catalog" className="text-sm font-semibold underline underline-offset-4 hover:text-primary">
          Lihat semua →
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {products.map((p) => (
          <Link to={`/product/${p.id}`} key={p.id} className="paper-card overflow-hidden group cursor-pointer hover:-translate-y-1 transition-transform block">
            <div className={`relative aspect-square ${p.color} flex items-center justify-center border-b-2 border-foreground overflow-hidden`}>
              <span className="text-7xl md:text-8xl group-hover:scale-110 transition-transform duration-300">
                {p.design}
              </span>
              <span className="absolute top-2 left-2 bg-background border-2 border-foreground text-xs font-semibold px-2 py-0.5 rounded">
                {p.tag}
              </span>
              <button aria-label="Suka" className="absolute top-2 right-2 w-8 h-8 rounded-full bg-background border-2 border-foreground flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition">
                <Heart className="w-4 h-4" strokeWidth={2.5} />
              </button>
              <span className="absolute bottom-2 right-2 flex items-center gap-1 text-xs bg-background/90 px-2 py-0.5 rounded border border-foreground/20">
                <Eye className="w-3 h-3" /> 1.2k
              </span>
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-sm leading-tight line-clamp-1">{p.title}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">oleh {p.artist}</p>
              <p className="font-bold text-sm mt-2">{p.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FreshArt;
