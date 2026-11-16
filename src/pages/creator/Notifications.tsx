import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Bell, BellOff, Check, CheckCheck, Trash2, Filter, Search, Settings,
  ShoppingBag, Heart, MessageCircle, Wallet, Sparkles, AlertTriangle,
  TrendingUp, Star, Trophy, Megaphone, ChevronDown, ArrowUpRight,
} from "lucide-react";
import CreatorSidebar from "@/components/creator/CreatorSidebar";
import CreatorTopbar from "@/components/creator/CreatorTopbar";

type Cat = "all" | "orders" | "social" | "earnings" | "system" | "tips";

type Notif = {
  id: string;
  cat: Exclude<Cat, "all">;
  icon: any;
  title: string;
  body: string;
  time: string;
  group: "Hari ini" | "Kemarin" | "Minggu ini" | "Lebih lama";
  read: boolean;
  cta?: { label: string; to: string };
  accent?: string;
  pinned?: boolean;
};

const initial: Notif[] = [
  { id: "n1", cat: "orders", icon: ShoppingBag, title: "Pesanan baru ✨ ORD-30184", body: "Anomali_22 membeli Hoodie Premium · Pop Tropis Sunset (1 pcs).", time: "5 menit lalu", group: "Hari ini", read: false, cta: { label: "Lihat pesanan", to: "/creator" }, accent: "bg-primary text-primary-foreground", pinned: true },
  { id: "n2", cat: "earnings", icon: Wallet, title: "Royalti masuk +Rp 58.000", body: "Penjualan Hoodie Premium telah disettle ke saldo studio kamu.", time: "12 menit lalu", group: "Hari ini", read: false, cta: { label: "Buka dompet", to: "/creator/earnings" }, accent: "bg-accent text-accent-foreground" },
  { id: "n3", cat: "social", icon: Heart, title: "RaraSenja menyukai karyamu", body: "Pop Tropis Sunset mendapat 12 like baru dalam 1 jam terakhir.", time: "38 menit lalu", group: "Hari ini", read: false, accent: "bg-primary/15 text-primary" },
  { id: "n4", cat: "tips", icon: Trophy, title: "Karya bintang 🏆", body: "Pop Tropis Sunset masuk top 5% tribe Pop Culture minggu ini.", time: "2 jam lalu", group: "Hari ini", read: false, cta: { label: "Lihat analitik", to: "/creator/analytics/DSG-204" }, accent: "bg-foreground text-background" },
  { id: "n5", cat: "social", icon: MessageCircle, title: "Komentar baru di Botani Senja", body: "@bujang_k: \"Versi colorway hijau kapan ya? Auto checkout deh.\"", time: "5 jam lalu", group: "Hari ini", read: true, accent: "bg-primary/15 text-primary" },

  { id: "n6", cat: "orders", icon: TrendingUp, title: "Trending naik +34%", body: "Karya Tipografi Nasional dilihat 2.3k orang dalam 24 jam.", time: "Kemarin · 19:42", group: "Kemarin", read: true, accent: "bg-accent text-accent-foreground" },
  { id: "n7", cat: "earnings", icon: Wallet, title: "Payout terjadwal", body: "Rp 1.840.000 akan dicairkan ke BCA ••• 8821 hari Senin.", time: "Kemarin · 09:10", group: "Kemarin", read: true, cta: { label: "Cek payout", to: "/creator/earnings" }, accent: "bg-accent text-accent-foreground" },
  { id: "n8", cat: "system", icon: AlertTriangle, title: "Verifikasi bank diperlukan", body: "Lengkapi data NPWP untuk meningkatkan limit payout mingguan.", time: "Kemarin · 08:00", group: "Kemarin", read: false, cta: { label: "Verifikasi sekarang", to: "/creator" }, accent: "bg-destructive/15 text-destructive" },

  { id: "n9", cat: "tips", icon: Sparkles, title: "Karya minggu ini cocok untuk apparel gelap", body: "Pasar pakaian hitam naik 28%. Coba upload varian dark mode!", time: "3 hari lalu", group: "Minggu ini", read: true, accent: "bg-primary/15 text-primary" },
  { id: "n10", cat: "social", icon: Star, title: "Ulasan 5 bintang baru", body: "RaraSenja: \"Bahannya adem & desainnya iconic. Pujian terus!\"", time: "4 hari lalu", group: "Minggu ini", read: true, accent: "bg-accent text-accent-foreground" },
  { id: "n11", cat: "system", icon: Megaphone, title: "Update kebijakan royalti", body: "Mulai 1 Mei, multiplier maksimum naik dari ×1.3 menjadi ×1.5.", time: "5 hari lalu", group: "Minggu ini", read: true, cta: { label: "Baca detail", to: "/creator" }, accent: "bg-foreground text-background" },

  { id: "n12", cat: "orders", icon: ShoppingBag, title: "Pesanan ORD-29812 dikirim", body: "Paket sudah diterima JNE Reg ke Bandung. Estimasi tiba 2 hari.", time: "2 minggu lalu", group: "Lebih lama", read: true, accent: "bg-primary/15 text-primary" },
  { id: "n13", cat: "tips", icon: Sparkles, title: "Studio aktif 30 hari ✨", body: "Selamat! Konsistensi upload kamu di atas rata-rata 78% kreator.", time: "3 minggu lalu", group: "Lebih lama", read: true, accent: "bg-accent text-accent-foreground" },
];

const cats: { id: Cat; label: string; icon: any }[] = [
  { id: "all", label: "Semua", icon: Bell },
  { id: "orders", label: "Pesanan", icon: ShoppingBag },
  { id: "earnings", label: "Pendapatan", icon: Wallet },
  { id: "social", label: "Sosial", icon: Heart },
  { id: "tips", label: "Tips & Tren", icon: Sparkles },
  { id: "system", label: "Sistem", icon: AlertTriangle },
];

const Notifications = () => {
  const [items, setItems] = useState<Notif[]>(initial);
  const [cat, setCat] = useState<Cat>("all");
  const [q, setQ] = useState("");
  const [onlyUnread, setOnlyUnread] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = useMemo(
    () => items.filter(n =>
      (cat === "all" || n.cat === cat) &&
      (!onlyUnread || !n.read) &&
      (q === "" || (n.title + n.body).toLowerCase().includes(q.toLowerCase()))
    ),
    [items, cat, q, onlyUnread]
  );

  const grouped = useMemo(() => {
    const order = ["Hari ini", "Kemarin", "Minggu ini", "Lebih lama"] as const;
    return order.map(g => ({ group: g, items: filtered.filter(n => n.group === g) })).filter(g => g.items.length);
  }, [filtered]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: items.filter(i => !i.read).length };
    items.forEach(i => { if (!i.read) c[i.cat] = (c[i.cat] || 0) + 1; });
    return c;
  }, [items]);

  const unreadTotal = items.filter(i => !i.read).length;

  const markAllRead = () => setItems(items.map(i => ({ ...i, read: true })));
  const markRead = (id: string) => setItems(items.map(i => i.id === id ? { ...i, read: true } : i));
  const remove = (id: string) => setItems(items.filter(i => i.id !== id));
  const bulkRead = () => { setItems(items.map(i => selected.includes(i.id) ? { ...i, read: true } : i)); setSelected([]); };
  const bulkDelete = () => { setItems(items.filter(i => !selected.includes(i.id))); setSelected([]); };
  const toggle = (id: string) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  return (
    <div className="min-h-screen flex bg-background">
      <CreatorSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <CreatorTopbar title="Notifikasi" subtitle="Pusat kabar studio kamu — pesanan, royalti, & insight." />

        <main className="flex-1 p-4 md:p-8 max-w-[1400px] w-full mx-auto">
          <div className="grid lg:grid-cols-[280px_1fr] gap-6">
            {/* Sidebar filter */}
            <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
              <div className="paper-card p-5 bg-gradient-to-br from-primary/10 to-accent/10">
                <div className="flex items-center gap-2 mb-2">
                  <Bell className="w-5 h-5 text-primary" strokeWidth={2.5}/>
                  <span className="text-xs font-bold uppercase tracking-wider">Belum dibaca</span>
                </div>
                <p className="font-hand text-5xl leading-none">{unreadTotal}</p>
                <button onClick={markAllRead}
                  className="mt-3 w-full sketch-border-sm bg-card hover:bg-muted py-2 text-xs font-semibold flex items-center justify-center gap-1.5">
                  <CheckCheck className="w-3.5 h-3.5" strokeWidth={2.5}/> Tandai semua dibaca
                </button>
              </div>

              <div className="paper-card p-3 space-y-1">
                {cats.map(c => {
                  const Icon = c.icon;
                  const n = counts[c.id] || 0;
                  return (
                    <button key={c.id} onClick={() => setCat(c.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition border-2 ${
                        cat === c.id ? "bg-primary/10 border-foreground" : "border-transparent hover:bg-muted"
                      }`}>
                      <Icon className="w-4 h-4" strokeWidth={2.5}/>
                      <span className="flex-1 text-left">{c.label}</span>
                      {n > 0 && (
                        <span className="text-[10px] font-bold bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                          {n}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <Link to="/creator"
                className="paper-card p-4 block bg-card hover:bg-muted/40 transition">
                <div className="flex items-center gap-2 mb-1">
                  <Settings className="w-4 h-4 text-primary" strokeWidth={2.5}/>
                  <span className="text-sm font-semibold">Preferensi notifikasi</span>
                </div>
                <p className="text-xs text-muted-foreground">Atur channel email, push, & WhatsApp.</p>
              </Link>
            </aside>

            {/* Feed */}
            <section className="space-y-4">
              {/* Tools */}
              <div className="paper-card p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={2.5}/>
                  <input value={q} onChange={e => setQ(e.target.value)} placeholder="Cari notifikasi..."
                    className="w-full sketch-border-sm bg-card pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"/>
                </div>
                <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
                  <input type="checkbox" checked={onlyUnread} onChange={e => setOnlyUnread(e.target.checked)}
                    className="w-4 h-4 accent-primary"/>
                  Hanya belum dibaca
                </label>
                <button className="sketch-border-sm bg-card hover:bg-muted px-3 py-2 text-sm flex items-center gap-2">
                  <Filter className="w-4 h-4" strokeWidth={2.5}/> Urutan
                  <ChevronDown className="w-4 h-4" strokeWidth={2.5}/>
                </button>
              </div>

              {/* Bulk bar */}
              {selected.length > 0 && (
                <div className="paper-card p-3 bg-primary/5 flex items-center gap-3">
                  <span className="text-sm font-semibold">{selected.length} dipilih</span>
                  <div className="ml-auto flex gap-2">
                    <button onClick={bulkRead} className="sketch-border-sm bg-card px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 hover:bg-muted">
                      <Check className="w-3.5 h-3.5" strokeWidth={3}/> Tandai dibaca
                    </button>
                    <button onClick={bulkDelete} className="sketch-border-sm bg-destructive/10 text-destructive px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 hover:bg-destructive/20">
                      <Trash2 className="w-3.5 h-3.5" strokeWidth={2.5}/> Hapus
                    </button>
                    <button onClick={() => setSelected([])} className="text-xs text-muted-foreground hover:text-foreground px-2">Batal</button>
                  </div>
                </div>
              )}

              {/* Groups */}
              {grouped.map(g => (
                <div key={g.group}>
                  <div className="flex items-center gap-3 mb-2 px-1">
                    <h3 className="font-hand text-2xl">{g.group}</h3>
                    <span className="text-xs text-muted-foreground">{g.items.length} item</span>
                    <div className="flex-1 h-px bg-border-soft"/>
                  </div>
                  <div className="space-y-2">
                    {g.items.map(n => {
                      const Icon = n.icon;
                      return (
                        <article key={n.id}
                          className={`paper-card p-4 flex gap-3 transition ${
                            !n.read ? "bg-primary/[0.04]" : ""
                          } ${selected.includes(n.id) ? "ring-2 ring-primary" : ""}`}>
                          <input type="checkbox" checked={selected.includes(n.id)} onChange={() => toggle(n.id)}
                            className="mt-1 w-4 h-4 accent-primary shrink-0"/>

                          <div className={`w-11 h-11 sketch-border-sm flex items-center justify-center shrink-0 ${n.accent || "bg-primary/10 text-primary"}`}>
                            <Icon className="w-5 h-5" strokeWidth={2.5}/>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start gap-2 mb-1">
                              <h4 className={`font-semibold leading-tight ${!n.read ? "text-foreground" : "text-foreground/80"}`}>
                                {n.title}
                              </h4>
                              {!n.read && <span className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" aria-label="Belum dibaca"/>}
                              {n.pinned && (
                                <span className="text-[9px] font-bold uppercase bg-accent text-accent-foreground px-1.5 py-0.5 rounded shrink-0">
                                  Penting
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground leading-snug mb-2">{n.body}</p>
                            <div className="flex items-center gap-3 flex-wrap">
                              <span className="text-[11px] text-muted-foreground">{n.time}</span>
                              {n.cta && (
                                <Link to={n.cta.to}
                                  className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                                  onClick={() => markRead(n.id)}>
                                  {n.cta.label} <ArrowUpRight className="w-3 h-3" strokeWidth={3}/>
                                </Link>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col gap-1 shrink-0">
                            {!n.read && (
                              <button onClick={() => markRead(n.id)} aria-label="Tandai dibaca"
                                className="p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-primary">
                                <Check className="w-4 h-4" strokeWidth={2.5}/>
                              </button>
                            )}
                            <button onClick={() => remove(n.id)} aria-label="Hapus"
                              className="p-1.5 hover:bg-destructive/10 rounded text-muted-foreground hover:text-destructive">
                              <Trash2 className="w-4 h-4" strokeWidth={2.5}/>
                            </button>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Empty */}
              {grouped.length === 0 && (
                <div className="paper-card p-12 text-center">
                  <BellOff className="w-10 h-10 text-muted-foreground mx-auto mb-3" strokeWidth={2}/>
                  <p className="font-hand text-3xl mb-1">Tidak ada notifikasi</p>
                  <p className="text-sm text-muted-foreground">Coba ubah filter atau hapus pencarian.</p>
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Notifications;
