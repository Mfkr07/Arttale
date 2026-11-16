import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User, Package, Heart, MapPin, CreditCard, Bell, Shield, HelpCircle,
  LogOut, ChevronRight, Settings, Star, Gift, Wallet, Edit3, Camera,
  Mail, Phone, Calendar, Eye, EyeOff, Check, X, Plus, Trash2, Award,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Section =
  | "overview" | "orders" | "wishlist" | "addresses" | "payments"
  | "reviews" | "rewards" | "notifications" | "security" | "preferences" | "help";

const Account = () => {
  const navigate = useNavigate();
  const [section, setSection] = useState<Section>("overview");

  const user = {
    name: "Rara Pratiwi",
    handle: "@rara.p",
    email: "rara.pratiwi@email.com",
    phone: "+62 812-3456-7890",
    joined: "Maret 2024",
    tier: "Sketcher",
    points: 1240,
    nextTier: "Inker",
    pointsToNext: 760,
  };

  const stats = [
    { label: "Pesanan", value: 18, icon: Package, color: "bg-primary/15 text-primary" },
    { label: "Wishlist", value: 32, icon: Heart, color: "bg-destructive/15 text-destructive" },
    { label: "Ulasan", value: 11, icon: Star, color: "bg-accent/30 text-accent-foreground" },
    { label: "Poin", value: "1.2K", icon: Gift, color: "bg-primary/15 text-primary" },
  ];

  const menu: { id: Section; label: string; icon: any; badge?: string }[] = [
    { id: "overview", label: "Ringkasan", icon: User },
    { id: "orders", label: "Pesanan Saya", icon: Package, badge: "2 aktif" },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "reviews", label: "Ulasan Saya", icon: Star },
    { id: "addresses", label: "Alamat", icon: MapPin },
    { id: "payments", label: "Metode Pembayaran", icon: CreditCard },
    { id: "rewards", label: "Poin & Reward", icon: Gift },
    { id: "notifications", label: "Notifikasi", icon: Bell },
    { id: "security", label: "Keamanan", icon: Shield },
    { id: "preferences", label: "Preferensi", icon: Settings },
    { id: "help", label: "Bantuan", icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="border-b-2 border-foreground bg-gradient-to-br from-primary-soft to-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-end gap-6">
            <div className="relative">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-primary text-primary-foreground sketch-border flex items-center justify-center font-hand text-5xl"
                style={{ boxShadow: "4px 4px 0 0 hsl(var(--foreground))" }}>
                R
              </div>
              <button className="absolute -bottom-1 -right-1 w-9 h-9 bg-card sketch-border-sm rounded-full flex items-center justify-center hover:bg-accent">
                <Camera className="w-4 h-4" strokeWidth={2.5} />
              </button>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-hand text-4xl md:text-5xl">Halo, {user.name.split(" ")[0]}!</h1>
                <span className="inline-flex items-center gap-1 bg-accent text-accent-foreground sketch-border-sm px-2 py-0.5 text-xs font-bold">
                  <Award className="w-3 h-3" /> {user.tier}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{user.email} • Bergabung {user.joined}</p>
              <div className="mt-3 max-w-md">
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold">{user.points} poin</span>
                  <span className="text-muted-foreground">{user.pointsToNext} lagi ke {user.nextTier}</span>
                </div>
                <div className="h-2 bg-muted sketch-border-sm overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: "62%" }} />
                </div>
              </div>
            </div>
            <button
              onClick={() => setSection("preferences")}
              className="inline-flex items-center gap-2 bg-card sketch-border-sm px-4 py-2 font-semibold text-sm hover:bg-muted self-start md:self-end"
              style={{ boxShadow: "2px 2px 0 0 hsl(var(--foreground))" }}
            >
              <Edit3 className="w-4 h-4" /> Edit Profil
            </button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 grid lg:grid-cols-[260px_1fr] gap-6">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <nav className="bg-card sketch-border p-2 space-y-0.5">
            {menu.map((m) => (
              <button
                key={m.id}
                onClick={() => setSection(m.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-left transition ${
                  section === m.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
              >
                <m.icon className="w-4 h-4" strokeWidth={2.5} />
                <span className="flex-1">{m.label}</span>
                {m.badge && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 ${
                    section === m.id ? "bg-primary-foreground text-primary" : "bg-accent text-accent-foreground"
                  }`}>
                    {m.badge}
                  </span>
                )}
              </button>
            ))}
            <div className="border-t-2 border-foreground my-2" />
            <button
              onClick={() => navigate("/auth")}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-left text-destructive hover:bg-destructive/10"
            >
              <LogOut className="w-4 h-4" strokeWidth={2.5} />
              <span>Keluar</span>
            </button>
          </nav>
        </aside>

        {/* Content */}
        <main className="min-w-0">
          {section === "overview" && <Overview stats={stats} setSection={setSection} user={user} />}
          {section === "orders" && <Orders />}
          {section === "wishlist" && <Wishlist />}
          {section === "reviews" && <Reviews />}
          {section === "addresses" && <Addresses />}
          {section === "payments" && <Payments />}
          {section === "rewards" && <Rewards user={user} />}
          {section === "notifications" && <NotificationPrefs />}
          {section === "security" && <Security />}
          {section === "preferences" && <Preferences user={user} />}
          {section === "help" && <HelpSection />}
        </main>
      </div>

      <Footer />
    </div>
  );
};

/* ----- Sub-sections ----- */

const SectionShell = ({ title, desc, children, action }: any) => (
  <div className="space-y-4">
    <div className="flex items-start justify-between gap-4 flex-wrap">
      <div>
        <h2 className="font-hand text-3xl">{title}</h2>
        {desc && <p className="text-sm text-muted-foreground mt-1">{desc}</p>}
      </div>
      {action}
    </div>
    {children}
  </div>
);

const Overview = ({ stats, setSection, user }: any) => (
  <SectionShell title="Ringkasan akun" desc="Aktivitas terbaru dan statistik kamu di Inkkraft.">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map((s: any) => (
        <div key={s.label} className="bg-card sketch-border-sm p-4">
          <div className={`w-9 h-9 ${s.color} flex items-center justify-center mb-2`}>
            <s.icon className="w-4 h-4" strokeWidth={2.5} />
          </div>
          <div className="font-hand text-3xl leading-none">{s.value}</div>
          <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
        </div>
      ))}
    </div>

    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-card sketch-border p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold">Pesanan terbaru</h3>
          <button onClick={() => setSection("orders")} className="text-xs text-primary font-semibold inline-flex items-center gap-1">
            Lihat semua <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="space-y-2">
          {[
            { id: "INK-2841", title: "Hoodie 'Liar Tapi Tenang'", status: "Dikirim", color: "bg-primary/15 text-primary" },
            { id: "INK-2828", title: "Pack Stiker Lokal Vol.3", status: "Selesai", color: "bg-emerald-500/15 text-emerald-700" },
          ].map((o) => (
            <Link to={`/track/${o.id}`} key={o.id} className="flex items-center gap-3 p-2 hover:bg-muted -mx-2 rounded">
              <div className="w-10 h-10 bg-muted sketch-border-sm" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold truncate">{o.title}</div>
                <div className="text-xs text-muted-foreground">{o.id}</div>
              </div>
              <span className={`text-[10px] font-bold px-2 py-1 ${o.color}`}>{o.status}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-card sketch-border p-5">
        <h3 className="font-bold mb-3">Aksi cepat</h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            { to: "/track", icon: Package, label: "Lacak Pesanan" },
            { to: "/catalog", icon: Heart, label: "Belanja Lagi" },
            { to: "/write-review", icon: Star, label: "Tulis Ulasan" },
            { to: "/help", icon: HelpCircle, label: "Bantuan" },
          ].map((a) => (
            <Link key={a.label} to={a.to}
              className="flex flex-col items-center justify-center gap-1.5 p-3 sketch-border-sm hover:bg-muted text-center">
              <a.icon className="w-5 h-5" strokeWidth={2.5} />
              <span className="text-xs font-semibold">{a.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>

    <div className="bg-gradient-to-r from-accent/40 to-primary-soft sketch-border p-5 flex items-center gap-4 flex-wrap">
      <Wallet className="w-10 h-10" strokeWidth={2} />
      <div className="flex-1 min-w-[200px]">
        <h3 className="font-hand text-2xl leading-tight">Inkkraft Wallet</h3>
        <p className="text-sm text-muted-foreground">Saldo Rp 0 — top-up untuk checkout lebih cepat.</p>
      </div>
      <button className="bg-foreground text-background px-4 py-2 sketch-border-sm font-semibold text-sm">Top-up</button>
    </div>
  </SectionShell>
);

const Orders = () => {
  const orders = [
    { id: "INK-2841", date: "24 Apr 2026", title: "Hoodie 'Liar Tapi Tenang'", artist: "Bayu Krisna", total: "Rp 389.000", status: "Dikirim", color: "bg-primary/15 text-primary" },
    { id: "INK-2828", date: "12 Apr 2026", title: "Pack Stiker Lokal Vol.3", artist: "Studio Ombak", total: "Rp 75.000", status: "Selesai", color: "bg-emerald-500/15 text-emerald-700" },
    { id: "INK-2799", date: "02 Apr 2026", title: "Tee 'Senja Jakarta'", artist: "Rina Halim", total: "Rp 165.000", status: "Selesai", color: "bg-emerald-500/15 text-emerald-700" },
    { id: "INK-2754", date: "18 Mar 2026", title: "Print A3 'Rumah Tua'", artist: "Adi Pranoto", total: "Rp 120.000", status: "Dibatalkan", color: "bg-destructive/15 text-destructive" },
  ];
  return (
    <SectionShell title="Pesanan saya" desc="Riwayat dan status pesanan kamu.">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {["Semua", "Diproses", "Dikirim", "Selesai", "Dibatalkan"].map((t, i) => (
          <button key={t} className={`px-3 py-1.5 text-xs font-semibold sketch-border-sm whitespace-nowrap ${i === 0 ? "bg-foreground text-background" : "bg-card hover:bg-muted"}`}>
            {t}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {orders.map((o) => (
          <div key={o.id} className="bg-card sketch-border p-4 flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-20 h-20 bg-muted sketch-border-sm shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-[10px] font-bold px-2 py-0.5 ${o.color}`}>{o.status}</span>
                <span className="text-xs text-muted-foreground">{o.id} • {o.date}</span>
              </div>
              <div className="font-semibold mt-1">{o.title}</div>
              <div className="text-xs text-muted-foreground">oleh {o.artist}</div>
              <div className="font-hand text-2xl mt-1">{o.total}</div>
            </div>
            <div className="flex sm:flex-col gap-2 sm:justify-center">
              <Link to={`/track/${o.id}`} className="flex-1 sm:flex-none text-center bg-foreground text-background px-4 py-2 sketch-border-sm font-semibold text-xs">Lacak</Link>
              <Link to="/write-review" className="flex-1 sm:flex-none text-center bg-card sketch-border-sm px-4 py-2 font-semibold text-xs hover:bg-muted">Ulasan</Link>
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  );
};

const Wishlist = () => (
  <SectionShell title="Wishlist" desc="Karya yang kamu simpan untuk dibeli nanti."
    action={<Link to="/catalog" className="text-xs text-primary font-semibold">+ Jelajahi katalog</Link>}>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-card sketch-border-sm overflow-hidden group">
          <div className="aspect-square bg-muted relative">
            <button className="absolute top-2 right-2 w-8 h-8 bg-background sketch-border-sm rounded-full flex items-center justify-center">
              <Heart className="w-4 h-4 fill-destructive text-destructive" />
            </button>
          </div>
          <div className="p-3">
            <div className="text-xs text-muted-foreground">Bayu Krisna</div>
            <div className="text-sm font-semibold truncate">Tee 'Mimpi Pendek' #{i + 1}</div>
            <div className="font-hand text-xl mt-1">Rp 159.000</div>
            <button className="w-full mt-2 bg-foreground text-background py-1.5 sketch-border-sm text-xs font-semibold">+ Keranjang</button>
          </div>
        </div>
      ))}
    </div>
  </SectionShell>
);

const Reviews = () => (
  <SectionShell title="Ulasan saya" desc="11 ulasan • rata-rata 4.6 ⭐"
    action={<Link to="/write-review" className="text-xs text-primary font-semibold">+ Tulis ulasan baru</Link>}>
    {[
      { product: "Hoodie 'Liar Tapi Tenang'", rating: 5, text: "Bahan tebal, sablonnya rapi. Worth it banget!", date: "20 Apr 2026" },
      { product: "Pack Stiker Lokal Vol.3", rating: 4, text: "Desainnya lucu, tapi pengiriman agak lama.", date: "10 Apr 2026" },
    ].map((r, i) => (
      <div key={i} className="bg-card sketch-border p-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="font-semibold">{r.product}</div>
          <div className="text-xs text-muted-foreground">{r.date}</div>
        </div>
        <div className="flex gap-0.5 my-2">
          {Array.from({ length: 5 }).map((_, s) => (
            <Star key={s} className={`w-4 h-4 ${s < r.rating ? "fill-accent text-accent" : "text-muted-foreground"}`} />
          ))}
        </div>
        <p className="text-sm">{r.text}</p>
        <div className="flex gap-3 mt-3 text-xs">
          <button className="font-semibold hover:text-primary">Edit</button>
          <button className="font-semibold text-destructive hover:underline">Hapus</button>
        </div>
      </div>
    ))}
  </SectionShell>
);

const Addresses = () => (
  <SectionShell title="Alamat pengiriman" desc="Kelola alamat untuk checkout lebih cepat."
    action={<button className="inline-flex items-center gap-1 bg-foreground text-background px-3 py-1.5 sketch-border-sm text-xs font-semibold"><Plus className="w-3 h-3" /> Tambah alamat</button>}>
    {[
      { label: "Rumah", name: "Rara Pratiwi", phone: "+62 812-3456-7890", addr: "Jl. Kemang Raya No.42, RT 03/RW 05, Bangka, Mampang Prapatan, Jakarta Selatan 12730", primary: true },
      { label: "Kantor", name: "Rara Pratiwi", phone: "+62 812-3456-7890", addr: "Gedung Sentral Senayan II Lt.5, Jl. Asia Afrika No.8, Senayan, Jakarta Pusat 10270", primary: false },
    ].map((a, i) => (
      <div key={i} className="bg-card sketch-border p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold bg-muted px-2 py-0.5">{a.label}</span>
              {a.primary && <span className="text-[10px] font-bold bg-primary text-primary-foreground px-2 py-0.5">Utama</span>}
            </div>
            <div className="font-semibold mt-2">{a.name}</div>
            <div className="text-xs text-muted-foreground">{a.phone}</div>
            <p className="text-sm mt-1">{a.addr}</p>
          </div>
          <div className="flex flex-col gap-1">
            <button className="p-2 hover:bg-muted"><Edit3 className="w-4 h-4" /></button>
            <button className="p-2 hover:bg-destructive/10 text-destructive"><Trash2 className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
    ))}
  </SectionShell>
);

const Payments = () => (
  <SectionShell title="Metode pembayaran" desc="Simpan kartu untuk checkout lebih cepat."
    action={<button className="inline-flex items-center gap-1 bg-foreground text-background px-3 py-1.5 sketch-border-sm text-xs font-semibold"><Plus className="w-3 h-3" /> Tambah</button>}>
    {[
      { type: "VISA", last: "4821", exp: "08/27", primary: true },
      { type: "GoPay", last: "•• 7890", exp: "—", primary: false },
    ].map((p, i) => (
      <div key={i} className="bg-card sketch-border p-4 flex items-center gap-4">
        <div className="w-14 h-10 bg-foreground text-background flex items-center justify-center font-bold text-xs sketch-border-sm">{p.type}</div>
        <div className="flex-1">
          <div className="font-semibold">•••• •••• •••• {p.last}</div>
          <div className="text-xs text-muted-foreground">Exp {p.exp} {p.primary && "• Utama"}</div>
        </div>
        <button className="text-destructive hover:bg-destructive/10 p-2"><Trash2 className="w-4 h-4" /></button>
      </div>
    ))}
  </SectionShell>
);

const Rewards = ({ user }: any) => (
  <SectionShell title="Poin & Reward" desc="Tukar poin dengan voucher dan benefit eksklusif.">
    <div className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground sketch-border p-6">
      <div className="text-xs uppercase tracking-wider opacity-90">Saldo poin</div>
      <div className="font-hand text-6xl leading-none mt-1">{user.points}</div>
      <div className="text-sm mt-2 opacity-90">Tier {user.tier} • {user.pointsToNext} poin lagi ke {user.nextTier}</div>
    </div>
    <h3 className="font-bold mt-4">Tukar poin</h3>
    <div className="grid sm:grid-cols-2 gap-3">
      {[
        { name: "Voucher Rp 25.000", cost: 500 },
        { name: "Free shipping", cost: 300 },
        { name: "Voucher Rp 50.000", cost: 950 },
        { name: "Sticker pack eksklusif", cost: 1500 },
      ].map((r) => (
        <div key={r.name} className="bg-card sketch-border-sm p-4 flex items-center justify-between">
          <div>
            <div className="font-semibold text-sm">{r.name}</div>
            <div className="text-xs text-muted-foreground">{r.cost} poin</div>
          </div>
          <button disabled={user.points < r.cost} className="bg-foreground text-background px-3 py-1.5 sketch-border-sm text-xs font-semibold disabled:opacity-40">
            Tukar
          </button>
        </div>
      ))}
    </div>
  </SectionShell>
);

const Toggle = ({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) => (
  <button onClick={() => onChange(!checked)}
    className={`w-11 h-6 sketch-border-sm relative transition ${checked ? "bg-primary" : "bg-muted"}`}>
    <span className={`absolute top-0.5 w-4 h-4 bg-background border-2 border-foreground transition ${checked ? "left-6" : "left-0.5"}`} />
  </button>
);

const NotificationPrefs = () => {
  const [prefs, setPrefs] = useState({
    orderEmail: true, orderPush: true, orderWA: false,
    promoEmail: false, promoPush: true,
    drop: true, social: true, system: true,
  });
  const set = (k: keyof typeof prefs) => (v: boolean) => setPrefs({ ...prefs, [k]: v });
  const groups = [
    {
      title: "Pesanan & Pengiriman",
      items: [
        { k: "orderEmail" as const, label: "Email" },
        { k: "orderPush" as const, label: "Push notification" },
        { k: "orderWA" as const, label: "WhatsApp" },
      ],
    },
    {
      title: "Promo & Voucher",
      items: [
        { k: "promoEmail" as const, label: "Email" },
        { k: "promoPush" as const, label: "Push notification" },
      ],
    },
    {
      title: "Lainnya",
      items: [
        { k: "drop" as const, label: "Drop karya baru dari kreator favorit" },
        { k: "social" as const, label: "Aktivitas sosial (komentar, like)" },
        { k: "system" as const, label: "Pengumuman sistem & update" },
      ],
    },
  ];
  return (
    <SectionShell title="Notifikasi" desc="Atur kanal notifikasi yang ingin kamu terima.">
      {groups.map((g) => (
        <div key={g.title} className="bg-card sketch-border p-4">
          <div className="font-bold mb-3">{g.title}</div>
          <div className="space-y-3">
            {g.items.map((it) => (
              <div key={it.k} className="flex items-center justify-between">
                <div className="text-sm">{it.label}</div>
                <Toggle checked={prefs[it.k]} onChange={set(it.k)} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </SectionShell>
  );
};

const Security = () => {
  const [showPwd, setShowPwd] = useState(false);
  return (
    <SectionShell title="Keamanan" desc="Lindungi akunmu dengan password kuat dan 2FA.">
      <div className="bg-card sketch-border p-4 space-y-3">
        <div className="font-bold">Ubah password</div>
        {["Password lama", "Password baru", "Konfirmasi password"].map((l) => (
          <div key={l}>
            <label className="text-xs font-semibold block mb-1">{l}</label>
            <div className="relative">
              <input type={showPwd ? "text" : "password"} className="w-full sketch-border-sm bg-background px-3 py-2 text-sm pr-9" />
              <button onClick={() => setShowPwd(!showPwd)} className="absolute right-2 top-1/2 -translate-y-1/2 p-1">
                {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        ))}
        <button className="bg-foreground text-background px-4 py-2 sketch-border-sm text-sm font-semibold">Simpan password</button>
      </div>

      <div className="bg-card sketch-border p-4 flex items-center justify-between">
        <div>
          <div className="font-bold">Verifikasi 2 langkah (2FA)</div>
          <div className="text-xs text-muted-foreground">Tambahkan lapisan keamanan via SMS/authenticator.</div>
        </div>
        <Toggle checked={false} onChange={() => {}} />
      </div>

      <div className="bg-card sketch-border p-4">
        <div className="font-bold mb-3">Sesi aktif</div>
        <div className="space-y-2">
          {[
            { device: "Chrome • MacBook Pro", loc: "Jakarta, ID", current: true },
            { device: "Safari • iPhone 15", loc: "Jakarta, ID", current: false },
          ].map((s, i) => (
            <div key={i} className="flex items-center justify-between text-sm">
              <div>
                <div className="font-semibold">{s.device} {s.current && <span className="text-[10px] bg-primary text-primary-foreground px-1.5 py-0.5 ml-1">Saat ini</span>}</div>
                <div className="text-xs text-muted-foreground">{s.loc}</div>
              </div>
              {!s.current && <button className="text-xs font-semibold text-destructive">Keluar</button>}
            </div>
          ))}
        </div>
      </div>

      <div className="sketch-border p-4 border-destructive">
        <div className="font-bold text-destructive">Hapus akun</div>
        <p className="text-xs text-muted-foreground mt-1 mb-3">Tindakan permanen — semua data akan dihapus.</p>
        <button className="bg-destructive text-destructive-foreground px-3 py-1.5 sketch-border-sm text-xs font-semibold">Hapus akun</button>
      </div>
    </SectionShell>
  );
};

const Preferences = ({ user }: any) => {
  const [form, setForm] = useState({ name: user.name, handle: user.handle, email: user.email, phone: user.phone, bio: "Suka kaos lokal & stiker absurd." });
  return (
    <SectionShell title="Preferensi & Profil" desc="Info publik, bahasa, dan tema tampilan.">
      <div className="bg-card sketch-border p-4 space-y-3">
        <div className="font-bold">Info profil</div>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { k: "name", label: "Nama lengkap", icon: User },
            { k: "handle", label: "Username", icon: User },
            { k: "email", label: "Email", icon: Mail },
            { k: "phone", label: "No. HP", icon: Phone },
          ].map((f) => (
            <div key={f.k}>
              <label className="text-xs font-semibold block mb-1">{f.label}</label>
              <div className="relative">
                <f.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input value={(form as any)[f.k]} onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
                  className="w-full sketch-border-sm bg-background pl-9 pr-3 py-2 text-sm" />
              </div>
            </div>
          ))}
        </div>
        <div>
          <label className="text-xs font-semibold block mb-1">Bio</label>
          <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })}
            rows={3} className="w-full sketch-border-sm bg-background px-3 py-2 text-sm" />
        </div>
      </div>

      <div className="bg-card sketch-border p-4 grid sm:grid-cols-2 gap-3">
        <div>
          <div className="font-bold mb-2">Bahasa</div>
          <select className="w-full sketch-border-sm bg-background px-3 py-2 text-sm">
            <option>Bahasa Indonesia</option>
            <option>English</option>
          </select>
        </div>
        <div>
          <div className="font-bold mb-2">Mata uang</div>
          <select className="w-full sketch-border-sm bg-background px-3 py-2 text-sm">
            <option>IDR (Rp)</option>
            <option>USD ($)</option>
          </select>
        </div>
        <div>
          <div className="font-bold mb-2">Tema</div>
          <div className="flex gap-2">
            {["Terang", "Gelap", "Sistem"].map((t, i) => (
              <button key={t} className={`flex-1 sketch-border-sm py-2 text-xs font-semibold ${i === 0 ? "bg-foreground text-background" : "bg-background hover:bg-muted"}`}>{t}</button>
            ))}
          </div>
        </div>
        <div>
          <div className="font-bold mb-2">Tanggal lahir</div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="date" className="w-full sketch-border-sm bg-background pl-9 pr-3 py-2 text-sm" />
          </div>
        </div>
      </div>

      <div className="sticky bottom-4 bg-card sketch-border p-3 flex items-center justify-between"
        style={{ boxShadow: "4px 4px 0 0 hsl(var(--foreground))" }}>
        <div className="text-xs text-muted-foreground inline-flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Perubahan belum disimpan</div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 sketch-border-sm text-xs font-semibold hover:bg-muted inline-flex items-center gap-1"><X className="w-3 h-3" /> Batal</button>
          <button className="bg-primary text-primary-foreground px-4 py-1.5 sketch-border-sm text-xs font-semibold">Simpan perubahan</button>
        </div>
      </div>
    </SectionShell>
  );
};

const HelpSection = () => (
  <SectionShell title="Bantuan & dukungan" desc="Temukan jawaban atau hubungi tim kami.">
    <div className="grid sm:grid-cols-2 gap-3">
      <Link to="/help" className="bg-card sketch-border p-5 hover:bg-muted">
        <HelpCircle className="w-6 h-6 mb-2" strokeWidth={2.5} />
        <div className="font-bold">Pusat Bantuan</div>
        <div className="text-xs text-muted-foreground">FAQ, panduan, kebijakan pengembalian.</div>
      </Link>
      <Link to="/contact" className="bg-card sketch-border p-5 hover:bg-muted">
        <Mail className="w-6 h-6 mb-2" strokeWidth={2.5} />
        <div className="font-bold">Hubungi Kami</div>
        <div className="text-xs text-muted-foreground">Live chat, email, WhatsApp support.</div>
      </Link>
    </div>
  </SectionShell>
);

export default Account;
