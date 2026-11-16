import { Link } from "react-router-dom";
import {
  TrendingUp, TrendingDown, Eye, ShoppingBag, Heart, DollarSign,
  UploadCloud, Sparkles, ArrowRight, Star, MessageCircle, Award, Flame,
} from "lucide-react";
import CreatorSidebar from "@/components/creator/CreatorSidebar";
import CreatorTopbar from "@/components/creator/CreatorTopbar";

const stats = [
  { label: "Pendapatan Bulan Ini", value: "Rp 4.280.000", change: "+22%", up: true, icon: DollarSign, color: "text-primary" },
  { label: "Penjualan", value: "127", change: "+18%", up: true, icon: ShoppingBag, color: "text-foreground" },
  { label: "Views Karya", value: "12.4k", change: "+8%", up: true, icon: Eye, color: "text-foreground" },
  { label: "Tip dari Fans", value: "Rp 340.000", change: "-4%", up: false, icon: Heart, color: "text-destructive" },
];

const designs = [
  { id: 1, title: "Sunset Brutalist", sales: 42, earnings: 1240000, status: "live", trend: "hot" },
  { id: 2, title: "Kucing Filosofis", sales: 31, earnings: 890000, status: "live", trend: "rising" },
  { id: 3, title: "Sketsa Jakarta '98", sales: 18, earnings: 520000, status: "live", trend: "steady" },
  { id: 4, title: "Mantra Pagi", sales: 0, earnings: 0, status: "review", trend: null },
];

const orders = [
  { id: "INK-2841", buyer: "Rama A.", item: "Tee — Sunset Brutalist", price: "Rp 165k", time: "5 menit lalu", status: "new" },
  { id: "INK-2840", buyer: "Sinta P.", item: "Sticker Pack — Kucing", price: "Rp 35k", time: "1 jam lalu", status: "printing" },
  { id: "INK-2839", buyer: "Yoga R.", item: "Hoodie — Sketsa Jakarta", price: "Rp 285k", time: "3 jam lalu", status: "shipped" },
];

const sparkData = [12, 18, 15, 22, 28, 24, 32, 40, 38, 45, 52, 48, 60, 68];

const CreatorDashboard = () => {
  const max = Math.max(...sparkData);

  return (
    <div className="min-h-screen flex bg-background">
      <CreatorSidebar />
      <main className="flex-1 min-w-0">
        <CreatorTopbar title="Hai, Studio Tinta 👋" subtitle="Mood karyamu lagi naik daun. Yuk upload yang baru!" />

        <div className="p-6 space-y-6">
          {/* Hero CTA */}
          <Link
            to="/creator/upload"
            className="block paper-card bg-gradient-to-r from-primary/15 via-primary/5 to-accent/20 p-6 doodle-hover relative overflow-hidden"
          >
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-xl bg-foreground text-background flex items-center justify-center shrink-0">
                <UploadCloud className="w-7 h-7" strokeWidth={2.5} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-hand text-2xl">Upload Studio</span>
                  <span className="text-[10px] font-bold uppercase bg-accent text-accent-foreground px-1.5 py-0.5 rounded">
                    Auto-Mockup
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Satu file PNG transparan → 30+ produk siap jual dalam 60 detik.
                </p>
              </div>
              <ArrowRight className="w-6 h-6" strokeWidth={2.5} />
            </div>
            {/* Doodle decoration */}
            <Sparkles className="absolute top-3 right-3 w-5 h-5 text-primary/40" />
          </Link>

          {/* Stats grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="paper-card p-4">
                <div className="flex items-center justify-between mb-2">
                  <s.icon className={`w-5 h-5 ${s.color}`} strokeWidth={2.5} />
                  <span className={`text-xs font-bold flex items-center gap-0.5 ${s.up ? "text-primary" : "text-destructive"}`}>
                    {s.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {s.change}
                  </span>
                </div>
                <div className="text-xl md:text-2xl font-bold tracking-tight">{s.value}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Earnings chart + leaderboard */}
          <div className="grid lg:grid-cols-3 gap-4">
            <div className="paper-card p-5 lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-hand text-2xl leading-none">Pendapatan 14 Hari</h2>
                  <p className="text-xs text-muted-foreground mt-1">Trend penjualan harian</p>
                </div>
                <select className="sketch-border-sm bg-card text-xs px-3 py-1.5 font-medium focus:outline-none">
                  <option>14 hari terakhir</option>
                  <option>30 hari</option>
                  <option>3 bulan</option>
                </select>
              </div>
              <div className="h-48 flex items-end gap-1.5">
                {sparkData.map((v, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                    <div
                      className="w-full bg-primary rounded-t-md border-2 border-foreground transition-all group-hover:bg-accent"
                      style={{ height: `${(v / max) * 100}%`, boxShadow: "2px 2px 0 0 hsl(var(--foreground))" }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground mt-2">
                <span>2 mgg lalu</span>
                <span>1 mgg lalu</span>
                <span>Hari ini</span>
              </div>
            </div>

            <div className="paper-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-5 h-5 text-accent" strokeWidth={2.5} />
                <h2 className="font-hand text-2xl leading-none">Ranking Tribe</h2>
              </div>
              <div className="text-center py-4">
                <div className="text-5xl font-bold text-primary">#7</div>
                <div className="text-xs text-muted-foreground mt-1">dari 248 kreator "Tipografi"</div>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2 sketch-border-sm bg-secondary">
                  <span>Naik dari peringkat</span><b>#12</b>
                </div>
                <div className="flex justify-between p-2 sketch-border-sm bg-secondary">
                  <span>Sisa untuk Top 5</span><b>23 sales</b>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-dashed border-foreground/30 flex items-center gap-2 text-xs">
                <Flame className="w-4 h-4 text-destructive" />
                <span>Streak upload: <b>9 hari</b></span>
              </div>
            </div>
          </div>

          {/* My designs + recent orders */}
          <div className="grid lg:grid-cols-2 gap-4">
            <div className="paper-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-hand text-2xl leading-none">Karya Top</h2>
                <Link to="/creator/designs" className="text-xs font-bold text-primary hover:underline">Lihat semua →</Link>
              </div>
              <div className="space-y-3">
                {designs.map((d) => (
                  <div key={d.id} className="flex items-center gap-3 p-3 sketch-border-sm bg-card hover:bg-secondary transition">
                    <div className="w-12 h-12 rounded-md border-2 border-foreground bg-gradient-to-br from-primary/30 to-accent/30 shrink-0 flex items-center justify-center font-hand text-2xl">
                      {d.title[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm truncate">{d.title}</span>
                        {d.trend === "hot" && <Flame className="w-3.5 h-3.5 text-destructive" />}
                        {d.trend === "rising" && <TrendingUp className="w-3.5 h-3.5 text-primary" />}
                      </div>
                      <div className="text-[11px] text-muted-foreground">{d.sales} terjual</div>
                    </div>
                    <div className="text-right">
                      {d.status === "live" ? (
                        <>
                          <div className="text-sm font-bold">Rp {(d.earnings / 1000).toFixed(0)}k</div>
                          <span className="text-[9px] font-bold uppercase text-primary">● Live</span>
                        </>
                      ) : (
                        <span className="text-[10px] font-bold uppercase bg-accent text-accent-foreground px-2 py-1 rounded">
                          Review
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="paper-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-hand text-2xl leading-none">Order Terbaru</h2>
                <span className="text-[10px] font-bold uppercase bg-primary text-primary-foreground px-2 py-1 rounded animate-pulse">
                  Live
                </span>
              </div>
              <div className="space-y-3">
                {orders.map((o) => (
                  <div key={o.id} className="flex items-start gap-3 p-3 sketch-border-sm bg-card">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] bg-secondary px-1.5 py-0.5 rounded">{o.id}</span>
                        <span className="text-xs font-semibold">{o.buyer}</span>
                      </div>
                      <div className="text-xs text-muted-foreground truncate mt-0.5">{o.item}</div>
                      <div className="text-[10px] text-muted-foreground mt-1">{o.time}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold">{o.price}</div>
                      <span className={`text-[9px] font-bold uppercase ${
                        o.status === "new" ? "text-primary" : o.status === "printing" ? "text-accent-foreground" : "text-muted-foreground"
                      }`}>
                        {o.status === "new" ? "Baru" : o.status === "printing" ? "Cetak" : "Dikirim"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reviews + tips */}
          <div className="grid lg:grid-cols-2 gap-4">
            <div className="paper-card p-5 bg-accent/10">
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-5 h-5 text-accent fill-accent" strokeWidth={2.5} />
                <h2 className="font-hand text-2xl leading-none">Review Bulan Ini</h2>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="text-5xl font-bold">4.9</div>
                <div>
                  <div className="flex gap-0.5 mb-1">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-accent text-accent" />)}
                  </div>
                  <div className="text-xs text-muted-foreground">dari 87 review</div>
                </div>
              </div>
              <blockquote className="text-sm italic border-l-2 border-foreground pl-3">
                "Sablonnya tebel, warnanya juicy banget! Worth every rupiah." — <b>@rama_a</b>
              </blockquote>
            </div>

            <div className="paper-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <MessageCircle className="w-5 h-5 text-primary" strokeWidth={2.5} />
                <h2 className="font-hand text-2xl leading-none">Pesan Fans</h2>
              </div>
              <div className="space-y-2">
                {[
                  { name: "Sinta P.", msg: "Kak, ada plan release seri Jakarta lagi?", unread: true },
                  { name: "Bagus K.", msg: "Boleh request size 5XL?", unread: true },
                  { name: "Mira T.", msg: "Terima kasih hadiahnya 🙏", unread: false },
                ].map((m, i) => (
                  <div key={i} className="flex items-start gap-3 p-2 hover:bg-secondary rounded-md transition cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-primary border-2 border-foreground shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold">{m.name}</span>
                        {m.unread && <span className="w-2 h-2 rounded-full bg-primary" />}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{m.msg}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreatorDashboard;
