import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search, Filter, Plus, MoreHorizontal, Eye, Pencil, Trash2, Copy, BarChart3,
  CheckCircle2, Clock, AlertCircle, EyeOff, LayoutGrid, List as ListIcon,
  Sparkles, Star, ChevronDown, Image as ImageIcon, ArrowUpRight,
} from "lucide-react";
import CreatorSidebar from "@/components/creator/CreatorSidebar";
import CreatorTopbar from "@/components/creator/CreatorTopbar";

const fmt = (n: number) => "Rp " + n.toLocaleString("id-ID");

type Status = "live" | "review" | "draft" | "rejected" | "paused";

const designs = [
  { id: "DSG-204", title: "Pop Tropis Sunset", tribe: "Pop Culture", status: "live" as Status, products: 22, sales: 184, revenue: 3_240_000, views: 12_450, royalty: 1.2, updated: "2 jam lalu", featured: true, hue: "from-amber-200 to-rose-300" },
  { id: "DSG-203", title: "Receh Republic Vol.4", tribe: "Receh Republic", status: "live" as Status, products: 18, sales: 96, revenue: 1_120_000, views: 8_910, royalty: 1.0, updated: "1 hari lalu", featured: false, hue: "from-violet-200 to-fuchsia-300" },
  { id: "DSG-202", title: "Tipografi Nasional", tribe: "Tipografi", status: "review" as Status, products: 12, sales: 0, revenue: 0, views: 312, royalty: 1.0, updated: "3 jam lalu", featured: false, hue: "from-slate-200 to-zinc-300" },
  { id: "DSG-201", title: "Botani Senja Series", tribe: "Botani & Alam", status: "live" as Status, products: 24, sales: 142, revenue: 2_460_000, views: 9_820, royalty: 1.1, updated: "3 hari lalu", featured: true, hue: "from-emerald-200 to-teal-300" },
  { id: "DSG-200", title: "Anime Lokal: Pasar", tribe: "Anime Lokal", status: "draft" as Status, products: 0, sales: 0, revenue: 0, views: 0, royalty: 1.0, updated: "5 hari lalu", featured: false, hue: "from-sky-200 to-indigo-300" },
  { id: "DSG-199", title: "Streetwear Kustom #7", tribe: "Streetwear", status: "paused" as Status, products: 16, sales: 64, revenue: 980_000, views: 5_410, royalty: 0.9, updated: "1 minggu lalu", featured: false, hue: "from-stone-300 to-neutral-400" },
  { id: "DSG-198", title: "Mantra Kopi Pagi", tribe: "Tipografi", status: "live" as Status, products: 14, sales: 73, revenue: 1_080_000, views: 4_320, royalty: 1.0, updated: "1 minggu lalu", featured: false, hue: "from-orange-200 to-amber-300" },
  { id: "DSG-197", title: "Pop-Art Tropis Mini", tribe: "Pop Culture", status: "rejected" as Status, products: 0, sales: 0, revenue: 0, views: 0, royalty: 1.0, updated: "2 minggu lalu", featured: false, hue: "from-pink-200 to-rose-300" },
];

const tabs: { id: Status | "all"; label: string }[] = [
  { id: "all", label: "Semua" },
  { id: "live", label: "Tayang" },
  { id: "review", label: "Direview" },
  { id: "draft", label: "Draf" },
  { id: "paused", label: "Dijeda" },
  { id: "rejected", label: "Ditolak" },
];

const Designs = () => {
  const [tab, setTab] = useState<Status | "all">("all");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [openProducts, setOpenProducts] = useState<string | null>(null);
  const [openEdit, setOpenEdit] = useState<string | null>(null);

  const filtered = useMemo(
    () => designs.filter(d =>
      (tab === "all" || d.status === tab) &&
      (q === "" || d.title.toLowerCase().includes(q.toLowerCase()))
    ),
    [tab, q]
  );

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: designs.length };
    designs.forEach(d => { c[d.status] = (c[d.status] || 0) + 1; });
    return c;
  }, []);

  const toggleSelect = (id: string) =>
    setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  const totalRevenue = designs.reduce((s, d) => s + d.revenue, 0);
  const totalSales = designs.reduce((s, d) => s + d.sales, 0);
  const liveCount = designs.filter(d => d.status === "live").length;

  return (
    <div className="min-h-screen flex bg-background">
      <CreatorSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <CreatorTopbar title="Karya Saya" subtitle="Kelola koleksi desainmu, atur produk, & pantau performa." />

        <main className="flex-1 p-4 md:p-8 space-y-6 max-w-[1400px] w-full mx-auto">
          {/* Header / hero */}
          <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Studio</span>
              <h1 className="font-hand text-5xl md:text-6xl mt-1">Galeri Karya</h1>
              <p className="text-muted-foreground text-sm mt-1">
                {designs.length} karya · {liveCount} tayang aktif · {totalSales} terjual · {fmt(totalRevenue)} total
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="sketch-border-sm bg-card hover:bg-muted px-3 py-2 text-sm flex items-center gap-2">
                <Filter className="w-4 h-4" strokeWidth={2.5}/> Filter
                <ChevronDown className="w-4 h-4" strokeWidth={2.5}/>
              </button>
              <Link to="/creator/upload"
                className="bg-primary text-primary-foreground sketch-border-sm px-4 py-2 text-sm font-semibold flex items-center gap-2 hover:bg-primary/90"
                style={{ boxShadow: "3px 3px 0 0 hsl(var(--foreground))" }}>
                <Plus className="w-4 h-4" strokeWidth={2.5}/> Upload Karya
              </Link>
            </div>
          </header>

          {/* Tabs + tools */}
          <section className="paper-card p-4 flex flex-col lg:flex-row lg:items-center gap-3">
            <div className="flex-1 flex items-center gap-1 overflow-x-auto sketch-border-sm bg-card p-1">
              {tabs.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)}
                  className={`shrink-0 px-3 py-1.5 text-xs font-semibold rounded transition flex items-center gap-1.5 ${
                    tab === t.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}>
                  {t.label}
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                    tab === t.id ? "bg-primary-foreground/20" : "bg-muted-foreground/20"
                  }`}>{counts[t.id] ?? 0}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={2.5}/>
                <input value={q} onChange={e => setQ(e.target.value)} placeholder="Cari judul karya..."
                  className="sketch-border-sm bg-card pl-9 pr-3 py-2 text-sm w-56 focus:outline-none focus:ring-2 focus:ring-primary"/>
              </div>
              <div className="sketch-border-sm bg-card flex">
                <button onClick={() => setView("grid")} aria-label="Grid"
                  className={`p-2 ${view === "grid" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>
                  <LayoutGrid className="w-4 h-4" strokeWidth={2.5}/>
                </button>
                <button onClick={() => setView("list")} aria-label="List"
                  className={`p-2 ${view === "list" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>
                  <ListIcon className="w-4 h-4" strokeWidth={2.5}/>
                </button>
              </div>
            </div>
          </section>

          {/* Bulk action bar */}
          {selected.length > 0 && (
            <div className="paper-card p-4 bg-primary/5 flex flex-wrap items-center gap-3 sticky top-20 z-30">
              <span className="text-sm font-semibold">{selected.length} karya dipilih</span>
              <div className="flex flex-wrap gap-2 ml-auto">
                <button className="sketch-border-sm bg-card px-3 py-1.5 text-xs font-medium hover:bg-muted flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" strokeWidth={2.5}/> Tayangkan
                </button>
                <button className="sketch-border-sm bg-card px-3 py-1.5 text-xs font-medium hover:bg-muted flex items-center gap-1.5">
                  <EyeOff className="w-3.5 h-3.5" strokeWidth={2.5}/> Jeda
                </button>
                <button className="sketch-border-sm bg-card px-3 py-1.5 text-xs font-medium hover:bg-muted flex items-center gap-1.5">
                  <Copy className="w-3.5 h-3.5" strokeWidth={2.5}/> Duplikat
                </button>
                <button className="sketch-border-sm bg-destructive/10 text-destructive px-3 py-1.5 text-xs font-medium hover:bg-destructive/20 flex items-center gap-1.5">
                  <Trash2 className="w-3.5 h-3.5" strokeWidth={2.5}/> Hapus
                </button>
                <button onClick={() => setSelected([])} className="text-xs text-muted-foreground hover:text-foreground px-2">
                  Batal
                </button>
              </div>
            </div>
          )}

          {/* Grid view */}
          {view === "grid" && (
            <section className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map(d => (
                <DesignCard
                  key={d.id} d={d}
                  selected={selected.includes(d.id)}
                  onSelect={() => toggleSelect(d.id)}
                  onProducts={() => setOpenProducts(d.id)}
                  onEdit={() => setOpenEdit(d.id)}
                />
              ))}
              {/* Add new tile */}
              <Link to="/creator/upload"
                className="sketch-dashed bg-card/50 hover:bg-primary/5 transition flex flex-col items-center justify-center text-center p-8 min-h-[280px] doodle-hover">
                <div className="w-14 h-14 sketch-border-sm bg-primary text-primary-foreground flex items-center justify-center mb-3">
                  <Plus className="w-6 h-6" strokeWidth={3}/>
                </div>
                <p className="font-hand text-2xl">Karya baru</p>
                <p className="text-xs text-muted-foreground mt-1">Drop file PNG, sisanya kami urus.</p>
              </Link>
            </section>
          )}

          {/* List view */}
          {view === "list" && (
            <section className="paper-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[860px]">
                  <thead>
                    <tr className="border-b-2 border-foreground/20 text-xs uppercase text-muted-foreground bg-muted/30">
                      <th className="py-3 pl-4 w-10">
                        <input type="checkbox"
                          checked={selected.length === filtered.length && filtered.length > 0}
                          onChange={() => setSelected(selected.length === filtered.length ? [] : filtered.map(d => d.id))}
                          className="w-4 h-4 accent-primary"/>
                      </th>
                      <th className="text-left py-3 font-semibold">Karya</th>
                      <th className="text-left py-3 font-semibold">Status</th>
                      <th className="text-right py-3 font-semibold">Produk</th>
                      <th className="text-right py-3 font-semibold">Views</th>
                      <th className="text-right py-3 font-semibold">Sales</th>
                      <th className="text-right py-3 font-semibold">Pendapatan</th>
                      <th className="text-right py-3 pr-4 font-semibold">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(d => (
                      <tr key={d.id} className="border-b border-border-soft hover:bg-muted/40 transition">
                        <td className="py-3 pl-4">
                          <input type="checkbox" checked={selected.includes(d.id)} onChange={() => toggleSelect(d.id)}
                            className="w-4 h-4 accent-primary"/>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 sketch-border-sm bg-gradient-to-br ${d.hue} flex items-center justify-center shrink-0`}>
                              <ImageIcon className="w-5 h-5 text-foreground/60" strokeWidth={2}/>
                            </div>
                            <div>
                              <p className="font-semibold flex items-center gap-1.5">
                                {d.title}
                                {d.featured && <Star className="w-3.5 h-3.5 fill-accent text-accent" strokeWidth={2}/>}
                              </p>
                              <p className="text-xs text-muted-foreground">{d.id} · {d.tribe} · {d.updated}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3"><StatusBadge s={d.status}/></td>
                        <td className="py-3 text-right">
                          <button onClick={() => setOpenProducts(d.id)}
                            className="text-primary font-semibold hover:underline">
                            {d.products}
                          </button>
                        </td>
                        <td className="py-3 text-right text-muted-foreground">{d.views.toLocaleString("id-ID")}</td>
                        <td className="py-3 text-right font-semibold">{d.sales}</td>
                        <td className="py-3 text-right font-semibold">{d.revenue ? fmt(d.revenue) : "—"}</td>
                        <td className="py-3 pr-4 text-right">
                          <div className="inline-flex items-center gap-1">
                            <button onClick={() => setOpenEdit(d.id)} title="Edit"
                              className="p-1.5 hover:bg-primary/10 hover:text-primary rounded">
                              <Pencil className="w-4 h-4" strokeWidth={2.5}/>
                            </button>
                            <button className="p-1.5 hover:bg-muted rounded" title="Lainnya">
                              <MoreHorizontal className="w-4 h-4" strokeWidth={2.5}/>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {filtered.length === 0 && (
            <div className="paper-card p-12 text-center">
              <Sparkles className="w-10 h-10 text-primary mx-auto mb-3" strokeWidth={2.5}/>
              <p className="font-hand text-3xl mb-1">Belum ada karya di sini</p>
              <p className="text-sm text-muted-foreground mb-4">Coba pilih tab lain atau upload karya baru.</p>
              <Link to="/creator/upload" className="inline-flex bg-primary text-primary-foreground sketch-border-sm px-4 py-2 text-sm font-semibold"
                style={{ boxShadow: "3px 3px 0 0 hsl(var(--foreground))" }}>
                <Plus className="w-4 h-4 mr-1.5" strokeWidth={2.5}/> Upload Karya
              </Link>
            </div>
          )}
        </main>
      </div>

      {openProducts && (
        <ProductsModal
          design={designs.find(d => d.id === openProducts)!}
          onClose={() => setOpenProducts(null)}
        />
      )}

      {openEdit && (
        <EditDesignModal
          design={designs.find(d => d.id === openEdit)!}
          onClose={() => setOpenEdit(null)}
        />
      )}
    </div>
  );
};

/* ---------- design card ---------- */

const DesignCard = ({ d, selected, onSelect, onProducts, onEdit }: {
  d: typeof designs[number]; selected: boolean; onSelect: () => void; onProducts: () => void; onEdit: () => void;
}) => (
  <div className={`paper-card overflow-hidden flex flex-col transition ${selected ? "ring-2 ring-primary" : ""}`}>
    {/* Cover */}
    <div className={`relative aspect-[4/3] bg-gradient-to-br ${d.hue} flex items-center justify-center`}>
      <ImageIcon className="w-12 h-12 text-foreground/30" strokeWidth={1.5}/>
      <input type="checkbox" checked={selected} onChange={onSelect}
        className="absolute top-3 left-3 w-4 h-4 accent-primary cursor-pointer"/>
      <div className="absolute top-3 right-3 flex gap-1.5">
        {d.featured && (
          <span className="bg-accent text-accent-foreground text-[10px] font-bold uppercase px-2 py-1 sketch-border-sm flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" strokeWidth={2}/> Pilihan
          </span>
        )}
        <StatusBadge s={d.status}/>
      </div>
      <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
        <span className="text-[10px] font-mono bg-foreground/80 text-background px-1.5 py-0.5 rounded">{d.id}</span>
        {d.royalty !== 1.0 && (
          <span className="bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 sketch-border-sm">
            ×{d.royalty.toFixed(1)} royalti
          </span>
        )}
      </div>
    </div>

    {/* Body */}
    <div className="p-4 flex flex-col flex-1">
      <div className="flex items-start justify-between gap-2 mb-1">
        <h3 className="font-semibold leading-tight line-clamp-1 flex-1">{d.title}</h3>
        <button className="p-1 -mr-1 hover:bg-muted rounded shrink-0">
          <MoreHorizontal className="w-4 h-4" strokeWidth={2.5}/>
        </button>
      </div>
      <p className="text-xs text-muted-foreground mb-3">{d.tribe} · {d.updated}</p>

      <div className="grid grid-cols-3 gap-2 text-center mb-4">
        <Stat label="Produk" value={d.products}/>
        <Stat label="Sales" value={d.sales}/>
        <Stat label="Views" value={d.views >= 1000 ? `${(d.views/1000).toFixed(1)}k` : d.views}/>
      </div>

      <div className="text-xs text-muted-foreground mb-3">Pendapatan</div>
      <div className="font-hand text-2xl leading-none mb-4">{d.revenue ? fmt(d.revenue) : "—"}</div>

      <div className="mt-auto grid grid-cols-3 gap-1.5">
        <button onClick={onProducts}
          className="sketch-border-sm bg-card text-xs font-medium py-2 hover:bg-muted flex items-center justify-center gap-1">
          <LayoutGrid className="w-3.5 h-3.5" strokeWidth={2.5}/> Produk
        </button>
        <Link to={`/creator/analytics/${d.id}`}
          className="sketch-border-sm bg-card text-xs font-medium py-2 hover:bg-muted flex items-center justify-center gap-1">
          <BarChart3 className="w-3.5 h-3.5" strokeWidth={2.5}/> Stats
        </Link>
        <button onClick={onEdit} className="sketch-border-sm bg-primary text-primary-foreground text-xs font-medium py-2 hover:bg-primary/90 flex items-center justify-center gap-1">
          <Pencil className="w-3.5 h-3.5" strokeWidth={2.5}/> Edit
        </button>
      </div>
    </div>
  </div>
);

const Stat = ({ label, value }: { label: string; value: number | string }) => (
  <div className="sketch-border-sm bg-muted/40 py-1.5">
    <div className="font-bold text-sm leading-none">{value}</div>
    <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">{label}</div>
  </div>
);

/* ---------- status badge ---------- */

const StatusBadge = ({ s }: { s: Status }) => {
  const map = {
    live: { label: "Tayang", icon: CheckCircle2, cls: "bg-primary text-primary-foreground" },
    review: { label: "Direview", icon: Clock, cls: "bg-accent text-accent-foreground" },
    draft: { label: "Draf", icon: Pencil, cls: "bg-muted text-foreground" },
    paused: { label: "Dijeda", icon: EyeOff, cls: "bg-foreground text-background" },
    rejected: { label: "Ditolak", icon: AlertCircle, cls: "bg-destructive text-destructive-foreground" },
  }[s];
  const Icon = map.icon;
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-1 sketch-border-sm ${map.cls}`}>
      <Icon className="w-3 h-3" strokeWidth={3}/> {map.label}
    </span>
  );
};

/* ---------- products modal ---------- */

const productCategories = [
  {
    label: "Pakaian",
    items: [
      { id: "tee", name: "Kaos Reguler", price: 145_000, enabled: true, royalty: 28_500 },
      { id: "oversize", name: "Kaos Oversize", price: 165_000, enabled: true, royalty: 32_000 },
      { id: "hoodie", name: "Hoodie Premium", price: 295_000, enabled: true, royalty: 58_000 },
      { id: "longsleeve", name: "Lengan Panjang", price: 175_000, enabled: false, royalty: 34_000 },
      { id: "crop", name: "Crop Tee", price: 135_000, enabled: false, royalty: 26_000 },
    ],
  },
  {
    label: "Aksesoris",
    items: [
      { id: "tote", name: "Tote Bag", price: 85_000, enabled: true, royalty: 17_000 },
      { id: "cap", name: "Topi Baseball", price: 125_000, enabled: true, royalty: 24_000 },
      { id: "phone", name: "Case HP", price: 95_000, enabled: false, royalty: 19_000 },
    ],
  },
  {
    label: "Stiker & Cetak",
    items: [
      { id: "sticker", name: "Pack Stiker (10)", price: 35_000, enabled: true, royalty: 8_500 },
      { id: "poster", name: "Poster A3", price: 65_000, enabled: true, royalty: 13_000 },
      { id: "mug", name: "Mug Keramik", price: 75_000, enabled: false, royalty: 15_000 },
    ],
  },
];

const ProductsModal = ({ design, onClose }: { design: typeof designs[number]; onClose: () => void }) => {
  const [enabled, setEnabled] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    productCategories.forEach(c => c.items.forEach(i => { init[i.id] = i.enabled; }));
    return init;
  });

  const total = Object.values(enabled).filter(Boolean).length;
  const toggle = (id: string) => setEnabled(s => ({ ...s, [id]: !s[id] }));

  return (
    <div className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-card paper-card w-full max-w-3xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="p-6 border-b-2 border-foreground/15 flex items-start gap-4">
          <div className={`w-16 h-16 sketch-border-sm bg-gradient-to-br ${design.hue} flex items-center justify-center shrink-0`}>
            <ImageIcon className="w-6 h-6 text-foreground/50" strokeWidth={2}/>
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Atur Produk</span>
            <h3 className="font-hand text-3xl leading-tight">{design.title}</h3>
            <p className="text-xs text-muted-foreground mt-1">
              {total} produk aktif dari {productCategories.reduce((s, c) => s + c.items.length, 0)} pilihan
            </p>
          </div>
          <button onClick={onClose} className="sketch-border-sm bg-card w-8 h-8 flex items-center justify-center hover:bg-muted">✕</button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {productCategories.map(cat => {
            const activeInCat = cat.items.filter(i => enabled[i.id]).length;
            return (
              <div key={cat.label}>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-hand text-xl">{cat.label}</h4>
                  <span className="text-xs text-muted-foreground">{activeInCat}/{cat.items.length} aktif</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {cat.items.map(p => (
                    <label key={p.id}
                      className={`sketch-border-sm p-3 flex items-center gap-3 cursor-pointer transition ${
                        enabled[p.id] ? "bg-primary/5" : "bg-card hover:bg-muted/40"
                      }`}>
                      <Switch on={enabled[p.id]} onClick={() => toggle(p.id)}/>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm leading-tight">{p.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Harga {fmt(p.price)} · Royalti <b className="text-primary">{fmt(p.royalty)}</b>
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            );
          })}

          <div className="paper-card p-4 bg-accent/10 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5" strokeWidth={2.5}/>
            <p className="text-xs text-muted-foreground">
              <b className="text-foreground">Tips Auto-Mockup:</b> aktifkan minimal 1 produk per kategori untuk
              memaksimalkan jangkauan. Karya populer rata-rata aktif di 18+ produk.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t-2 border-foreground/15 flex items-center justify-between gap-3 bg-muted/20">
          <div className="text-sm">
            <span className="text-muted-foreground">Total aktif:</span>{" "}
            <span className="font-hand text-2xl text-primary">{total}</span>{" "}
            <span className="text-muted-foreground">produk</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="sketch-border-sm bg-card px-4 py-2 text-sm hover:bg-muted">Batal</button>
            <button onClick={onClose}
              className="bg-primary text-primary-foreground sketch-border-sm px-4 py-2 text-sm font-semibold flex items-center gap-1.5"
              style={{ boxShadow: "3px 3px 0 0 hsl(var(--foreground))" }}>
              Simpan Perubahan <ArrowUpRight className="w-4 h-4" strokeWidth={2.5}/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Switch = ({ on, onClick }: { on: boolean; onClick: () => void }) => (
  <button type="button" onClick={onClick}
    className={`relative w-10 h-6 rounded-full border-2 border-foreground transition shrink-0 ${
      on ? "bg-primary" : "bg-muted"
    }`}>
    <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-background border border-foreground transition-transform ${
      on ? "translate-x-4" : ""
    }`}/>
  </button>
);

export default Designs;

/* ---------- edit design modal ---------- */

const EditDesignModal = ({ design, onClose }: { design: typeof designs[number]; onClose: () => void }) => {
  const [title, setTitle] = useState(design.title);
  const [tribe, setTribe] = useState(design.tribe);
  const [status, setStatus] = useState<Status>(design.status);
  const [royalty, setRoyalty] = useState(design.royalty);
  const [featured, setFeatured] = useState(design.featured);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>(["lokal", design.tribe.toLowerCase()]);
  const [tagInput, setTagInput] = useState("");

  const tribes = ["Pop Culture", "Receh Republic", "Tipografi", "Botani & Alam", "Anime Lokal", "Streetwear", "Minimalis", "Folk Nusantara"];
  const statuses: { id: Status; label: string }[] = [
    { id: "live", label: "Tayang" },
    { id: "draft", label: "Draf" },
    { id: "paused", label: "Dijeda" },
    { id: "review", label: "Direview" },
  ];

  const addTag = () => {
    const t = tagInput.trim().toLowerCase();
    if (t && !tags.includes(t)) setTags([...tags, t]);
    setTagInput("");
  };

  return (
    <div className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-card paper-card w-full max-w-3xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b-2 border-foreground/15 flex items-start gap-4">
          <div className={`w-16 h-16 sketch-border-sm bg-gradient-to-br ${design.hue} flex items-center justify-center shrink-0`}>
            <Pencil className="w-6 h-6 text-foreground/60" strokeWidth={2}/>
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Edit Karya</span>
            <h3 className="font-hand text-3xl leading-tight">{design.title}</h3>
            <p className="text-xs text-muted-foreground mt-1">{design.id} · Terakhir diperbarui {design.updated}</p>
          </div>
          <button onClick={onClose} className="sketch-border-sm bg-card w-8 h-8 flex items-center justify-center hover:bg-muted">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Cover Karya</label>
            <div className="flex items-center gap-3">
              <div className={`w-28 h-28 sketch-border-sm bg-gradient-to-br ${design.hue} flex items-center justify-center`}>
                <ImageIcon className="w-8 h-8 text-foreground/40" strokeWidth={1.5}/>
              </div>
              <div className="flex-1 space-y-2">
                <button className="sketch-border-sm bg-card hover:bg-muted px-3 py-2 text-sm font-medium w-full flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" strokeWidth={2.5}/> Ganti file desain
                </button>
                <p className="text-xs text-muted-foreground">PNG transparan, min. 4500×4500px, max 25MB.</p>
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">Judul Karya</label>
            <input value={title} onChange={e => setTitle(e.target.value)}
              className="w-full sketch-border-sm bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"/>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">Deskripsi Singkat</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3}
              placeholder="Ceritakan inspirasi & kisah di balik karyamu..."
              className="w-full sketch-border-sm bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"/>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">Tribe</label>
              <select value={tribe} onChange={e => setTribe(e.target.value)}
                className="w-full sketch-border-sm bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                {tribes.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">Status Tayang</label>
              <div className="grid grid-cols-2 gap-1.5">
                {statuses.map(s => (
                  <button key={s.id} onClick={() => setStatus(s.id)}
                    className={`sketch-border-sm py-2 text-xs font-semibold transition ${
                      status === s.id ? "bg-primary text-primary-foreground" : "bg-card hover:bg-muted"
                    }`}>{s.label}</button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">Tag</label>
            <div className="sketch-border-sm bg-card p-2 flex flex-wrap gap-1.5 min-h-[44px]">
              {tags.map(t => (
                <span key={t} className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded flex items-center gap-1">
                  #{t}
                  <button onClick={() => setTags(tags.filter(x => x !== t))} className="hover:text-destructive">✕</button>
                </span>
              ))}
              <input value={tagInput} onChange={e => setTagInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
                placeholder="Tambah tag..." className="flex-1 min-w-[120px] bg-transparent text-sm focus:outline-none"/>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Tekan Enter untuk menambah. Tag membantu pembeli menemukan karyamu.</p>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center justify-between">
              <span>Pengganda Royalti</span>
              <span className="text-primary font-hand text-2xl normal-case tracking-normal">×{royalty.toFixed(1)}</span>
            </label>
            <input type="range" min={0.8} max={1.5} step={0.1} value={royalty}
              onChange={e => setRoyalty(Number(e.target.value))}
              className="w-full accent-primary"/>
            <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
              <span>×0.8 (lebih murah)</span><span>×1.0 default</span><span>×1.5 premium</span>
            </div>
          </div>

          <label className="sketch-border-sm bg-card p-3 flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={featured} onChange={e => setFeatured(e.target.checked)} className="w-4 h-4 accent-primary"/>
            <div className="flex-1">
              <p className="font-semibold text-sm flex items-center gap-1.5">
                <Star className={`w-4 h-4 ${featured ? "fill-accent text-accent" : "text-muted-foreground"}`} strokeWidth={2}/>
                Tandai sebagai Pilihan
              </p>
              <p className="text-xs text-muted-foreground">Karya pilihan tampil di posisi teratas storefront-mu.</p>
            </div>
          </label>

          <div className="paper-card p-4 bg-destructive/5 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" strokeWidth={2.5}/>
            <div className="flex-1">
              <p className="text-sm font-semibold text-destructive mb-1">Zona Berbahaya</p>
              <p className="text-xs text-muted-foreground mb-2">Menghapus karya tidak bisa dibatalkan. Riwayat penjualan tetap tersimpan.</p>
              <button className="sketch-border-sm bg-destructive/10 text-destructive px-3 py-1.5 text-xs font-medium hover:bg-destructive/20 flex items-center gap-1.5">
                <Trash2 className="w-3.5 h-3.5" strokeWidth={2.5}/> Hapus Karya
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 border-t-2 border-foreground/15 flex items-center justify-between gap-3 bg-muted/20">
          <span className="text-xs text-muted-foreground">Perubahan akan tayang setelah disetujui kurator (1×24 jam).</span>
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="sketch-border-sm bg-card px-4 py-2 text-sm hover:bg-muted">Batal</button>
            <button onClick={onClose}
              className="bg-primary text-primary-foreground sketch-border-sm px-4 py-2 text-sm font-semibold flex items-center gap-1.5"
              style={{ boxShadow: "3px 3px 0 0 hsl(var(--foreground))" }}>
              Simpan Perubahan <ArrowUpRight className="w-4 h-4" strokeWidth={2.5}/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
