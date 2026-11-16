import { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Heart, Eye, SlidersHorizontal, X, Search, Palette, Pencil, Brush } from "lucide-react";

type Product = {
  id: number; title: string; artist: string; price: number;
  category: string; style: string; bg: string; design: string;
  bestseller?: boolean;
};

const ALL_PRODUCTS: Product[] = [
  { id: 1, title: "Cosmic Cat Vibes", artist: "Rara Doodles", price: 145000, category: "Pakaian", style: "Ilustrasi", bg: "bg-foreground", design: "🐱", bestseller: true },
  { id: 2, title: "Local Brew Forever", artist: "Kopi & Kanvas", price: 65000, category: "Stiker", style: "Tipografi", bg: "bg-amber-100", design: "☕" },
  { id: 3, title: "Pegunungan Sunyi", artist: "Bumi Studio", price: 85000, category: "Aksesoris", style: "Minimalis", bg: "bg-stone-100", design: "🏔️" },
  { id: 4, title: "Senja di Jogja", artist: "Indra Lukis", price: 175000, category: "Pakaian", style: "Vintage", bg: "bg-primary/20", design: "🌅", bestseller: true },
  { id: 5, title: "Garage Punk Dreams", artist: "Riot Press", price: 35000, category: "Stiker", style: "Parodi", bg: "bg-red-100", design: "🎸" },
  { id: 6, title: "Nasi Goreng Society", artist: "Lapar Club", price: 155000, category: "Pakaian", style: "Tipografi", bg: "bg-yellow-100", design: "🍳" },
  { id: 7, title: "Mountain Soul", artist: "Bumi Studio", price: 110000, category: "Aksesoris", style: "Minimalis", bg: "bg-emerald-100", design: "⛰️" },
  { id: 8, title: "Ngopi Dulu", artist: "Kopi & Kanvas", price: 95000, category: "Home & Art", style: "Tipografi", bg: "bg-card", design: "☕" },
  { id: 9, title: "Pixel Wibu Forever", artist: "Otaku Press", price: 45000, category: "Stiker", style: "Ilustrasi", bg: "bg-pink-100", design: "🎴" },
  { id: 10, title: "Indie Tape Vol.3", artist: "Riot Press", price: 165000, category: "Pakaian", style: "Vintage", bg: "bg-stone-200", design: "📼" },
  { id: 11, title: "Hujan Jakarta", artist: "Indra Lukis", price: 125000, category: "Home & Art", style: "Minimalis", bg: "bg-blue-100", design: "☔" },
  { id: 12, title: "Receh Republic", artist: "Lapar Club", price: 40000, category: "Stiker", style: "Parodi", bg: "bg-yellow-100", design: "😂" },
];

const CATEGORIES = ["Pakaian", "Aksesoris", "Stiker", "Home & Art"];
const STYLES = [
  { name: "Tipografi", icon: Pencil },
  { name: "Minimalis", icon: SlidersHorizontal },
  { name: "Ilustrasi", icon: Brush },
  { name: "Vintage", icon: Palette },
  { name: "Parodi", icon: Pencil },
];
const SWATCHES = [
  { name: "Hitam", cls: "bg-foreground" },
  { name: "Putih", cls: "bg-background border-foreground/40" },
  { name: "Abu", cls: "bg-stone-400" },
  { name: "Violet", cls: "bg-primary" },
  { name: "Maroon", cls: "bg-red-900" },
  { name: "Cream", cls: "bg-amber-100" },
];
const SORTS = ["Paling Laku", "Terbaru", "Harga Terendah", "Harga Tertinggi"];

const fmt = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;

const Catalog = () => {
  const [params] = useSearchParams();
  const initialCat = params.get("cat");
  const [query, setQuery] = useState(params.get("q") || "");
  const [cats, setCats] = useState<string[]>(initialCat ? [initialCat] : []);
  useEffect(() => {
    const c = params.get("cat");
    if (c) setCats([c]);
    const q = params.get("q");
    if (q !== null) setQuery(q);
  }, [params]);
  const [styles, setStyles] = useState<string[]>([]);
  const [swatches, setSwatches] = useState<string[]>([]);
  const [sort, setSort] = useState("Paling Laku");
  const [maxPrice, setMaxPrice] = useState(200000);
  const [openFilter, setOpenFilter] = useState(false);

  const toggle = (arr: string[], v: string, set: (s: string[]) => void) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const filtered = useMemo(() => {
    let list = ALL_PRODUCTS.filter((p) => {
      if (query && !p.title.toLowerCase().includes(query.toLowerCase()) && !p.artist.toLowerCase().includes(query.toLowerCase())) return false;
      if (cats.length && !cats.includes(p.category)) return false;
      if (styles.length && !styles.includes(p.style)) return false;
      if (p.price > maxPrice) return false;
      return true;
    });
    if (sort === "Harga Terendah") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "Harga Tertinggi") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "Terbaru") list = [...list].reverse();
    if (sort === "Paling Laku") list = [...list].sort((a, b) => Number(!!b.bestseller) - Number(!!a.bestseller));
    return list;
  }, [query, cats, styles, sort, maxPrice]);

  const activeCount = cats.length + styles.length + swatches.length + (maxPrice < 200000 ? 1 : 0);
  const clearAll = () => { setCats([]); setStyles([]); setSwatches([]); setMaxPrice(200000); };

  const FilterPanel = (
    <div className="space-y-7">
      {/* Header doodle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brush className="w-5 h-5 text-primary" strokeWidth={2.5} />
          <Pencil className="w-5 h-5 text-foreground" strokeWidth={2.5} />
          <Palette className="w-5 h-5 text-accent-foreground" strokeWidth={2.5} />
          <h3 className="font-hand text-2xl ml-1">Filter</h3>
        </div>
        {activeCount > 0 && (
          <button onClick={clearAll} className="text-xs underline underline-offset-4 hover:text-primary">
            Reset
          </button>
        )}
      </div>

      {/* Category */}
      <div>
        <h4 className="font-bold text-sm mb-3 uppercase tracking-wide">Kategori</h4>
        <div className="space-y-2">
          {CATEGORIES.map((c) => (
            <label key={c} className="flex items-center gap-3 cursor-pointer group">
              <span className={`w-5 h-5 border-2 border-foreground rounded flex items-center justify-center transition ${cats.includes(c) ? "bg-primary text-primary-foreground" : "bg-card group-hover:bg-muted"}`}>
                {cats.includes(c) && (
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="w-3.5 h-3.5">
                    <path d="M3 8 L7 12 L13 4" />
                  </svg>
                )}
              </span>
              <input type="checkbox" className="sr-only" checked={cats.includes(c)} onChange={() => toggle(cats, c, setCats)} />
              <span className="text-sm">{c}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Style */}
      <div>
        <h4 className="font-bold text-sm mb-3 uppercase tracking-wide">Gaya Desain</h4>
        <div className="flex flex-wrap gap-2">
          {STYLES.map(({ name, icon: Icon }) => {
            const on = styles.includes(name);
            return (
              <button
                key={name}
                onClick={() => toggle(styles, name, setStyles)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border-2 transition ${
                  on ? "bg-foreground text-background border-foreground shadow-[2px_2px_0_0_hsl(var(--primary))]" : "bg-card border-foreground/30 hover:border-foreground"
                }`}
              >
                <Icon className="w-3.5 h-3.5" strokeWidth={2.5} />
                {name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Swatches */}
      <div>
        <h4 className="font-bold text-sm mb-3 uppercase tracking-wide">Warna Kain</h4>
        <div className="flex flex-wrap gap-3">
          {SWATCHES.map((s) => {
            const on = swatches.includes(s.name);
            return (
              <button
                key={s.name}
                onClick={() => toggle(swatches, s.name, setSwatches)}
                aria-label={s.name}
                title={s.name}
                className={`w-9 h-9 rounded-full border-2 ${s.cls} ${on ? "border-primary ring-2 ring-primary ring-offset-2 ring-offset-background scale-110" : "border-foreground hover:scale-105"} transition`}
              />
            );
          })}
        </div>
      </div>

      {/* Price */}
      <div>
        <h4 className="font-bold text-sm mb-3 uppercase tracking-wide">Harga Maksimal</h4>
        <input
          type="range"
          min={20000}
          max={200000}
          step={5000}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-primary"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>Rp 20rb</span>
          <span className="font-hand text-base text-primary">≤ {fmt(maxPrice)}</span>
        </div>
      </div>

      {/* Doodle footer */}
      <div className="pt-4 border-t-2 border-dashed border-foreground/20 text-center">
        <span className="font-hand text-lg text-muted-foreground">temukan harta karunmu ✦</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero strip */}
      <section className="border-b-2 border-foreground bg-card">
        <div className="container mx-auto px-4 py-8">
          <span className="font-hand text-2xl text-primary">Jelajahi Galeri ✿</span>
          <h1 className="text-3xl md:text-4xl font-extrabold mt-1">Semua Karya Seniman Lokal</h1>

          <div className="mt-5 relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" strokeWidth={2.5} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari kaos, stiker, atau nama seniman..."
              className="w-full sketch-border-sm bg-background pl-12 pr-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-8 grid lg:grid-cols-[260px_1fr] gap-8">
        {/* Sidebar — desktop */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 paper-card p-5">{FilterPanel}</div>
        </aside>

        {/* Mobile filter sheet */}
        {openFilter && (
          <div className="lg:hidden fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm" onClick={() => setOpenFilter(false)}>
            <div className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-background border-l-2 border-foreground p-5 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-hand text-2xl">Filter</h3>
                <button onClick={() => setOpenFilter(false)} aria-label="Tutup" className="w-9 h-9 rounded-full border-2 border-foreground flex items-center justify-center">
                  <X className="w-4 h-4" strokeWidth={2.5} />
                </button>
              </div>
              {FilterPanel}
              <button onClick={() => setOpenFilter(false)} className="mt-6 w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold sketch-border-violet">
                Lihat {filtered.length} hasil
              </button>
            </div>
          </div>
        )}

        {/* Results */}
        <section>
          {/* Toolbar */}
          <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setOpenFilter(true)}
                className="lg:hidden inline-flex items-center gap-2 px-4 py-2 sketch-border-sm bg-card font-semibold text-sm"
              >
                <SlidersHorizontal className="w-4 h-4" strokeWidth={2.5} />
                Filter {activeCount > 0 && <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 text-[11px] flex items-center justify-center">{activeCount}</span>}
              </button>
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">{filtered.length}</strong> karya ditemukan
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground hidden sm:inline">Urutkan:</span>
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="appearance-none sketch-border-sm bg-card pl-3 pr-9 py-2 font-semibold text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {SORTS.map((s) => <option key={s}>{s}</option>)}
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-xs">▼</span>
              </div>
            </div>
          </div>

          {/* Active chips */}
          {activeCount > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {[...cats, ...styles, ...swatches].map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-soft border-2 border-foreground text-xs font-semibold">
                  {tag}
                  <button
                    aria-label={`Hapus ${tag}`}
                    onClick={() => {
                      setCats(cats.filter((x) => x !== tag));
                      setStyles(styles.filter((x) => x !== tag));
                      setSwatches(swatches.filter((x) => x !== tag));
                    }}
                  >
                    <X className="w-3 h-3" strokeWidth={3} />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Grid or empty */}
          {filtered.length === 0 ? (
            <div className="paper-card p-12 text-center">
              <div className="text-6xl mb-3">🔍</div>
              <h3 className="font-hand text-3xl mb-1">Belum ada yang cocok</h3>
              <p className="text-sm text-muted-foreground mb-4">Coba ubah filter atau kata kuncimu.</p>
              <button onClick={clearAll} className="bg-foreground text-background px-5 py-2.5 rounded-md font-semibold sketch-border-sm">
                Reset Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((p) => (
                <Link to={`/product/${p.id}`} key={p.id} className="paper-card overflow-hidden group block hover:-translate-y-1 transition-transform">
                  <div className={`relative aspect-square ${p.bg} flex items-center justify-center border-b-2 border-foreground overflow-hidden`}>
                    <span className="text-7xl md:text-8xl group-hover:scale-110 transition-transform duration-300">{p.design}</span>
                    <span className="absolute top-2 left-2 bg-background border-2 border-foreground text-xs font-semibold px-2 py-0.5 rounded">
                      {p.category}
                    </span>
                    {p.bestseller && (
                      <span className="absolute top-2 right-12 bg-accent border-2 border-foreground text-[11px] font-bold px-2 py-0.5 rounded">★ HOT</span>
                    )}
                    <button aria-label="Suka" onClick={(e) => { e.preventDefault(); }} className="absolute top-2 right-2 w-8 h-8 rounded-full bg-background border-2 border-foreground flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition">
                      <Heart className="w-4 h-4" strokeWidth={2.5} />
                    </button>
                    <span className="absolute bottom-2 right-2 flex items-center gap-1 text-xs bg-background/90 px-2 py-0.5 rounded border border-foreground/20">
                      <Eye className="w-3 h-3" /> 1.2k
                    </span>
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-sm leading-tight line-clamp-1">{p.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">oleh {p.artist}</p>
                    <p className="font-bold text-sm mt-2">{fmt(p.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          {filtered.length > 0 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              {[1, 2, 3, "...", 8].map((n, i) => (
                <button
                  key={i}
                  className={`min-w-10 h-10 px-3 rounded-md font-semibold text-sm border-2 ${
                    n === 1 ? "bg-foreground text-background border-foreground" : "bg-card border-foreground/30 hover:border-foreground"
                  }`}
                >
                  {n}
                </button>
              ))}
              <button className="min-w-10 h-10 px-3 rounded-md font-semibold text-sm border-2 bg-card border-foreground/30 hover:border-foreground">
                →
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Catalog;
