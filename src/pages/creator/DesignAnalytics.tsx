import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft, Eye, ShoppingBag, Heart, MessageCircle, TrendingUp, TrendingDown,
  Share2, Download, MapPin, Smartphone, Monitor, Tablet, Sparkles, Star,
  ExternalLink, Target, Image as ImageIcon, ChevronDown, Trophy,
} from "lucide-react";
import CreatorSidebar from "@/components/creator/CreatorSidebar";
import CreatorTopbar from "@/components/creator/CreatorTopbar";

const fmt = (n: number) => "Rp " + n.toLocaleString("id-ID");

const trend30 = [
  4, 6, 5, 8, 11, 9, 7, 12, 14, 10, 13, 18, 16, 15, 19, 22, 20, 24, 21, 26,
  28, 25, 30, 33, 29, 35, 38, 34, 41, 44,
];

const productPerf = [
  { name: "Kaos Reguler", sales: 64, revenue: 1_280_000, conv: 4.2, trend: "up" },
  { name: "Hoodie Premium", sales: 38, revenue: 1_120_000, conv: 3.1, trend: "up" },
  { name: "Tote Bag", sales: 31, revenue: 526_000, conv: 5.8, trend: "up" },
  { name: "Kaos Oversize", sales: 24, revenue: 528_000, conv: 2.4, trend: "down" },
  { name: "Pack Stiker", sales: 18, revenue: 153_000, conv: 6.1, trend: "up" },
  { name: "Topi Baseball", sales: 9, revenue: 216_000, conv: 1.8, trend: "down" },
];

const cities = [
  { city: "Jakarta", pct: 32 },
  { city: "Bandung", pct: 18 },
  { city: "Surabaya", pct: 14 },
  { city: "Yogyakarta", pct: 11 },
  { city: "Makassar", pct: 7 },
  { city: "Lainnya", pct: 18 },
];

const traffic = [
  { src: "Pencarian Inkkraft", visits: 4_820, pct: 38 },
  { src: "Tribe: Pop Culture", visits: 3_120, pct: 25 },
  { src: "Beranda (Trending)", visits: 1_950, pct: 16 },
  { src: "Instagram (kreator)", visits: 1_320, pct: 10 },
  { src: "TikTok review", visits: 760, pct: 6 },
  { src: "Lainnya", visits: 480, pct: 5 },
];

const reviews = [
  { user: "Anomali_22", rating: 5, time: "2 hari lalu", text: "Cetakannya tajam banget, warnanya persis preview. Auto borong satu lagi!", product: "Kaos Reguler" },
  { user: "RaraSenja", rating: 5, time: "4 hari lalu", text: "Bahannya adem & desainnya iconic. Dapet banyak pujian pas dipake nongkrong.", product: "Hoodie Premium" },
  { user: "Bujang_K", rating: 4, time: "1 minggu lalu", text: "Tote bagnya kuat, jahitannya rapi. Cuma agak lama dikirim aja.", product: "Tote Bag" },
];

const ranges = ["7 hari", "30 hari", "90 hari", "Sepanjang masa"];

const DesignAnalytics = () => {
  const { id = "DSG-204" } = useParams();
  const [range, setRange] = useState("30 hari");

  const totalViews = 12_450;
  const totalSales = 184;
  const revenue = 3_240_000;
  const conv = ((totalSales / totalViews) * 100).toFixed(2);
  const max = Math.max(...trend30);

  return (
    <div className="min-h-screen flex bg-background">
      <CreatorSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <CreatorTopbar title="Analitik Karya" subtitle={`Performa detail untuk ${id}`} />

        <main className="flex-1 p-4 md:p-8 space-y-6 max-w-[1400px] w-full mx-auto">
          {/* Breadcrumb */}
          <Link to="/creator/designs" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" strokeWidth={2.5}/> Kembali ke Karya Saya
          </Link>

          {/* Hero */}
          <section className="paper-card p-6 md:p-8 bg-gradient-to-br from-primary/5 via-card to-accent/10">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-48 aspect-square sketch-border bg-gradient-to-br from-amber-200 to-rose-300 flex items-center justify-center shrink-0">
                <ImageIcon className="w-16 h-16 text-foreground/30" strokeWidth={1.5}/>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="bg-primary text-primary-foreground text-[10px] font-bold uppercase px-2 py-1 sketch-border-sm">Tayang</span>
                  <span className="bg-accent text-accent-foreground text-[10px] font-bold uppercase px-2 py-1 sketch-border-sm flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" strokeWidth={2}/> Karya Pilihan
                  </span>
                  <span className="text-xs font-mono text-muted-foreground">{id}</span>
                </div>
                <h1 className="font-hand text-5xl md:text-6xl leading-none">Pop Tropis Sunset</h1>
                <p className="text-sm text-muted-foreground mt-2">
                  Tribe: <Link to="/tribes" className="text-primary font-semibold hover:underline">Pop Culture</Link>{" "}
                  · Diterbitkan 24 Mar 2026 · 22 produk aktif
                </p>

                <div className="flex flex-wrap items-center gap-2 mt-5">
                  <button className="sketch-border-sm bg-card hover:bg-muted px-3 py-2 text-sm flex items-center gap-2">
                    <Calendar /> {range}
                    <ChevronDown className="w-4 h-4" strokeWidth={2.5}/>
                  </button>
                  <Link to={`/product/${id}`}
                    className="sketch-border-sm bg-card hover:bg-muted px-3 py-2 text-sm flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" strokeWidth={2.5}/> Lihat di toko
                  </Link>
                  <button className="sketch-border-sm bg-card hover:bg-muted px-3 py-2 text-sm flex items-center gap-2">
                    <Share2 className="w-4 h-4" strokeWidth={2.5}/> Bagikan
                  </button>
                  <button className="sketch-border-sm bg-card hover:bg-muted px-3 py-2 text-sm flex items-center gap-2">
                    <Download className="w-4 h-4" strokeWidth={2.5}/> Ekspor laporan
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Quick stats */}
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <KPI icon={Eye} label="Total Views" value={totalViews.toLocaleString("id-ID")} delta="+24%" up/>
            <KPI icon={ShoppingBag} label="Penjualan" value={String(totalSales)} delta="+18%" up/>
            <KPI icon={TrendingUp} label="Konversi" value={`${conv}%`} delta="+0.4%" up/>
            <KPI icon={Sparkles} label="Pendapatan" value={fmt(revenue)} delta="+22%" up highlight/>
          </section>

          {/* Trend chart */}
          <section className="paper-card p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-hand text-3xl leading-none">Performa Harian</h3>
                <p className="text-xs text-muted-foreground mt-1">30 hari terakhir · views vs penjualan</p>
              </div>
              <div className="flex items-center gap-1 sketch-border-sm bg-card p-1">
                {ranges.map(r => (
                  <button key={r} onClick={() => setRange(r)}
                    className={`px-2.5 py-1 text-xs font-medium rounded transition ${
                      range === r ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    }`}>{r}</button>
                ))}
              </div>
            </div>

            {/* SVG sparkline */}
            <div className="relative h-56">
              <svg viewBox="0 0 600 200" preserveAspectRatio="none" className="w-full h-full">
                {[0, 50, 100, 150, 200].map(y => (
                  <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="hsl(var(--border-soft))" strokeDasharray="2 4"/>
                ))}
                <polyline
                  fill="hsl(var(--primary) / 0.15)"
                  stroke="none"
                  points={`0,200 ${trend30.map((v, i) => `${(i / (trend30.length - 1)) * 600},${200 - (v / max) * 180}`).join(" ")} 600,200`}
                />
                <polyline
                  fill="none" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                  points={trend30.map((v, i) => `${(i / (trend30.length - 1)) * 600},${200 - (v / max) * 180}`).join(" ")}
                />
                {trend30.map((v, i) => i % 5 === 0 && (
                  <circle key={i} cx={(i / (trend30.length - 1)) * 600} cy={200 - (v / max) * 180}
                    r="4" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="2.5"/>
                ))}
              </svg>
              <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 sketch-border-sm">
                Puncak: 44 views
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs mt-3">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-primary"/>Views</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-primary/15 border border-primary/40"/>Tren naik</span>
            </div>
          </section>

          {/* Engagement + funnel */}
          <section className="grid lg:grid-cols-3 gap-5">
            <div className="paper-card p-6">
              <h3 className="font-hand text-2xl leading-none mb-4">Engagement</h3>
              <Engagement icon={Heart} label="Suka / save" value="1.284" delta="+12%"/>
              <Engagement icon={MessageCircle} label="Komentar" value="86" delta="+5%"/>
              <Engagement icon={Share2} label="Dibagikan" value="312" delta="+19%"/>
              <Engagement icon={ShoppingBag} label="Add to cart" value="498" delta="+24%"/>
            </div>

            <div className="paper-card p-6 lg:col-span-2">
              <h3 className="font-hand text-2xl leading-none mb-1">Funnel Konversi</h3>
              <p className="text-xs text-muted-foreground mb-5">Dari view hingga checkout sukses.</p>
              {[
                { label: "View karya", value: 12_450, pct: 100 },
                { label: "Klik produk", value: 4_120, pct: 33 },
                { label: "Add to cart", value: 498, pct: 4 },
                { label: "Mulai checkout", value: 261, pct: 2.1 },
                { label: "Pesanan sukses", value: 184, pct: 1.5 },
              ].map((f, i, arr) => (
                <div key={f.label} className="mb-3 last:mb-0">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{f.label}</span>
                    <span className="text-muted-foreground">
                      {f.value.toLocaleString("id-ID")} <span className="text-xs">({f.pct}%)</span>
                    </span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden border border-foreground/20">
                    <div className="h-full bg-gradient-to-r from-primary to-accent transition-all"
                      style={{ width: `${(f.value / arr[0].value) * 100}%` }}/>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Product performance */}
          <section className="paper-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-hand text-3xl leading-none">Performa per Produk</h3>
                <p className="text-xs text-muted-foreground mt-1">Penjualan & konversi tiap varian.</p>
              </div>
              <Link to="/creator/designs" className="text-xs text-primary font-semibold hover:underline">
                Atur produk →
              </Link>
            </div>
            <div className="overflow-x-auto -mx-6 px-6">
              <table className="w-full text-sm min-w-[640px]">
                <thead>
                  <tr className="border-b-2 border-foreground/20 text-xs uppercase text-muted-foreground">
                    <th className="text-left py-3 font-semibold">Produk</th>
                    <th className="text-right py-3 font-semibold">Penjualan</th>
                    <th className="text-right py-3 font-semibold">Pendapatan</th>
                    <th className="text-right py-3 font-semibold">Konversi</th>
                    <th className="text-right py-3 font-semibold">Tren</th>
                  </tr>
                </thead>
                <tbody>
                  {productPerf.map(p => (
                    <tr key={p.name} className="border-b border-border-soft hover:bg-muted/40">
                      <td className="py-3.5 font-medium">{p.name}</td>
                      <td className="py-3.5 text-right">{p.sales}</td>
                      <td className="py-3.5 text-right font-semibold">{fmt(p.revenue)}</td>
                      <td className="py-3.5 text-right">
                        <span className="inline-flex items-center gap-1.5">
                          <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: `${(p.conv / 7) * 100}%` }}/>
                          </div>
                          {p.conv}%
                        </span>
                      </td>
                      <td className="py-3.5 text-right">
                        {p.trend === "up" ? (
                          <span className="text-primary inline-flex items-center gap-1 text-xs font-bold">
                            <TrendingUp className="w-3.5 h-3.5" strokeWidth={3}/> Naik
                          </span>
                        ) : (
                          <span className="text-muted-foreground inline-flex items-center gap-1 text-xs font-bold">
                            <TrendingDown className="w-3.5 h-3.5" strokeWidth={3}/> Turun
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Audience */}
          <section className="grid lg:grid-cols-3 gap-5">
            <div className="paper-card p-6">
              <h3 className="font-hand text-2xl leading-none mb-1">Lokasi Pembeli</h3>
              <p className="text-xs text-muted-foreground mb-5">Top kota berdasarkan penjualan.</p>
              <div className="space-y-3">
                {cities.map(c => (
                  <div key={c.city}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-primary" strokeWidth={2.5}/>{c.city}
                      </span>
                      <span className="text-muted-foreground">{c.pct}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${c.pct}%` }}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="paper-card p-6">
              <h3 className="font-hand text-2xl leading-none mb-1">Sumber Trafik</h3>
              <p className="text-xs text-muted-foreground mb-5">Dari mana pembeli datang.</p>
              <div className="space-y-3">
                {traffic.map(t => (
                  <div key={t.src} className="flex items-center justify-between gap-3 text-sm">
                    <span className="font-medium truncate">{t.src}</span>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-muted-foreground text-xs">{t.visits.toLocaleString("id-ID")}</span>
                      <span className="bg-primary/15 text-primary text-[10px] font-bold px-1.5 py-0.5 rounded">{t.pct}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="paper-card p-6">
              <h3 className="font-hand text-2xl leading-none mb-1">Perangkat</h3>
              <p className="text-xs text-muted-foreground mb-5">Akses dari mana saja.</p>
              <div className="space-y-4">
                <DeviceBar icon={Smartphone} label="Mobile" pct={68}/>
                <DeviceBar icon={Monitor} label="Desktop" pct={24}/>
                <DeviceBar icon={Tablet} label="Tablet" pct={8}/>
              </div>
              <div className="paper-card p-3 bg-accent/15 mt-5">
                <p className="text-xs">
                  <Sparkles className="w-3.5 h-3.5 inline mr-1 text-primary" strokeWidth={2.5}/>
                  Mayoritas mobile — pastikan judul karyamu pendek & ikonik.
                </p>
              </div>
            </div>
          </section>

          {/* Reviews + insight */}
          <section className="grid lg:grid-cols-3 gap-5">
            <div className="paper-card p-6 lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-hand text-2xl leading-none">Ulasan Terbaru</h3>
                  <p className="text-xs text-muted-foreground mt-1">Rata-rata rating 4.8 / 5 (62 ulasan)</p>
                </div>
                <button className="text-xs text-primary font-semibold hover:underline">Lihat semua →</button>
              </div>
              <div className="space-y-3">
                {reviews.map(r => (
                  <div key={r.user} className="sketch-border-sm bg-card p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-foreground"/>
                        <div>
                          <p className="text-sm font-semibold leading-none">@{r.user}</p>
                          <p className="text-[11px] text-muted-foreground mt-0.5">{r.product} · {r.time}</p>
                        </div>
                      </div>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-3.5 h-3.5 ${i < r.rating ? "fill-accent text-accent" : "text-muted"}`} strokeWidth={2}/>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-snug">"{r.text}"</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="paper-card p-6 bg-primary/5">
              <Trophy className="w-7 h-7 text-primary mb-2" strokeWidth={2.5}/>
              <h3 className="font-hand text-2xl leading-none mb-2">Karya bintang!</h3>
              <p className="text-sm text-muted-foreground mb-5">
                Karya ini ada di <b className="text-foreground">5% teratas</b> tribe Pop Culture bulan ini.
              </p>

              <div className="space-y-3 text-sm">
                <Insight icon={Target} text="Coba naikkan multiplier royalti ke ×1.3 — permintaan sedang tinggi."/>
                <Insight icon={Sparkles} text="Aktifkan produk Mug & Case HP, audiens mobile cocok untuk ini."/>
                <Insight icon={TrendingUp} text="Buat varian colorway baru — pembeli sering cari versi malam hari."/>
              </div>

              <Link to="/creator/upload"
                className="mt-6 w-full bg-primary text-primary-foreground sketch-border-sm py-3 font-semibold text-sm flex items-center justify-center gap-2"
                style={{ boxShadow: "3px 3px 0 0 hsl(var(--foreground))" }}>
                Buat Varian Baru →
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

/* ---------- helpers ---------- */

const Calendar = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const KPI = ({ icon: Icon, label, value, delta, up, highlight }: {
  icon: any; label: string; value: string; delta: string; up?: boolean; highlight?: boolean;
}) => (
  <div className={`paper-card p-5 ${highlight ? "bg-primary/5" : ""}`}>
    <div className="flex items-center justify-between mb-2">
      <div className={`w-9 h-9 sketch-border-sm flex items-center justify-center ${highlight ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"}`}>
        <Icon className="w-4 h-4" strokeWidth={2.5}/>
      </div>
      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded flex items-center gap-1 ${
        up ? "bg-primary/15 text-primary" : "bg-destructive/15 text-destructive"
      }`}>
        {up ? <TrendingUp className="w-3 h-3" strokeWidth={3}/> : <TrendingDown className="w-3 h-3" strokeWidth={3}/>}
        {delta}
      </span>
    </div>
    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
    <p className="font-hand text-3xl leading-none mt-1">{value}</p>
  </div>
);

const Engagement = ({ icon: Icon, label, value, delta }: { icon: any; label: string; value: string; delta: string }) => (
  <div className="flex items-center justify-between py-3 border-b border-border-soft last:border-0 last:pb-0 first:pt-0">
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 sketch-border-sm bg-primary/10 text-primary flex items-center justify-center">
        <Icon className="w-4 h-4" strokeWidth={2.5}/>
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-bold text-base leading-none mt-0.5">{value}</p>
      </div>
    </div>
    <span className="text-xs font-bold text-primary flex items-center gap-1">
      <TrendingUp className="w-3 h-3" strokeWidth={3}/>{delta}
    </span>
  </div>
);

const DeviceBar = ({ icon: Icon, label, pct }: { icon: any; label: string; pct: number }) => (
  <div>
    <div className="flex justify-between text-sm mb-1.5">
      <span className="font-medium flex items-center gap-2"><Icon className="w-4 h-4 text-primary" strokeWidth={2.5}/>{label}</span>
      <span className="text-muted-foreground">{pct}%</span>
    </div>
    <div className="h-2 bg-muted rounded-full overflow-hidden border border-foreground/20">
      <div className="h-full bg-primary" style={{ width: `${pct}%` }}/>
    </div>
  </div>
);

const Insight = ({ icon: Icon, text }: { icon: any; text: string }) => (
  <div className="flex items-start gap-2.5">
    <Icon className="w-4 h-4 text-primary mt-0.5 shrink-0" strokeWidth={2.5}/>
    <p className="leading-snug">{text}</p>
  </div>
);

export default DesignAnalytics;
