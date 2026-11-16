import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Flame, Trophy, Users, Sparkles, MessageCircle, Heart, Crown,
  Gamepad2, Music, Coffee, Mountain, Laugh, Palette, ArrowRight, Plus, Pin
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const tribes = [
  { slug: "anime-lokal", name: "Anime Lokal", emoji: "🎴", icon: Sparkles, count: 1240, members: "12.4k", growth: "+18%", bg: "bg-pink-100", desc: "Karya bertema anime, manga, & budaya pop Jepang dengan sentuhan lokal." },
  { slug: "gamer-merch", name: "Gamer Merch", emoji: "🎮", icon: Gamepad2, count: 890, members: "9.1k", growth: "+12%", bg: "bg-violet-100", desc: "Merch untuk para gamer—dari MOBA, RPG, hingga retro pixel art." },
  { slug: "indie-music", name: "Indie Music", emoji: "🎵", icon: Music, count: 640, members: "5.8k", growth: "+24%", bg: "bg-amber-100", desc: "Tribute scene musik indie, gigs, dan album art lokal." },
  { slug: "skena-kopi", name: "Skena Kopi", emoji: "☕", icon: Coffee, count: 420, members: "3.2k", growth: "+8%", bg: "bg-stone-100", desc: "Untuk pecinta kopi, barista, dan budaya kafe." },
  { slug: "pecinta-alam", name: "Pecinta Alam", emoji: "🏕️", icon: Mountain, count: 780, members: "6.7k", growth: "+15%", bg: "bg-emerald-100", desc: "Karya outdoor, naik gunung, camping, dan konservasi." },
  { slug: "receh-republic", name: "Receh Republic", emoji: "😂", icon: Laugh, count: 1820, members: "21.3k", growth: "+32%", bg: "bg-yellow-100", desc: "Meme, parodi, plesetan—humor receh kelas berat." },
];

const leaderboard = [
  { rank: 1, name: "Sari Wibisono", handle: "@sariwbs", tribe: "Anime Lokal", sales: 1284, avatar: "SW", color: "bg-pink-200" },
  { rank: 2, name: "Doni Kreatif", handle: "@dnkreatif", tribe: "Receh Republic", sales: 1102, avatar: "DK", color: "bg-yellow-200" },
  { rank: 3, name: "Studio Kabut", handle: "@studio.kabut", tribe: "Pecinta Alam", sales: 968, avatar: "SK", color: "bg-emerald-200" },
  { rank: 4, name: "Pixel Brewer", handle: "@pixelbrew", tribe: "Gamer Merch", sales: 842, avatar: "PB", color: "bg-violet-200" },
  { rank: 5, name: "Nadia Tjong", handle: "@nadiatj", tribe: "Indie Music", sales: 731, avatar: "NT", color: "bg-amber-200" },
];

const featuredWorks = [
  { id: "tw-1", title: "Senja di Bromo", artist: "Studio Kabut", tribe: "Pecinta Alam", likes: 423, bg: "bg-emerald-100" },
  { id: "tw-2", title: "Receh Banget Sih", artist: "Doni Kreatif", tribe: "Receh Republic", likes: 891, bg: "bg-yellow-100" },
  { id: "tw-3", title: "Mecha Sunda", artist: "Sari Wibisono", tribe: "Anime Lokal", likes: 612, bg: "bg-pink-100" },
  { id: "tw-4", title: "Ngopi Dulu Bro", artist: "Barista Hitam", tribe: "Skena Kopi", likes: 287, bg: "bg-stone-100" },
  { id: "tw-5", title: "Last Boss Down", artist: "Pixel Brewer", tribe: "Gamer Merch", likes: 504, bg: "bg-violet-100" },
  { id: "tw-6", title: "Gigs Malam Minggu", artist: "Nadia Tjong", tribe: "Indie Music", likes: 348, bg: "bg-amber-100" },
];

const discussions = [
  { pinned: true, title: "📌 Aturan main Tribe & cara naik leaderboard", author: "Mod Inkkraft", replies: 42, tribe: "Umum" },
  { pinned: false, title: "Lagi cari kolaborator buat seri 'Mecha Nusantara'", author: "@sariwbs", replies: 18, tribe: "Anime Lokal" },
  { pinned: false, title: "Tips bikin sticker design biar gak pecah saat print", author: "@dnkreatif", replies: 27, tribe: "Receh Republic" },
  { pinned: false, title: "Drop sketch kalian di sini—weekly challenge!", author: "@pixelbrew", replies: 56, tribe: "Gamer Merch" },
  { pinned: false, title: "Rekomendasi font untuk lirik di kaos band", author: "@nadiatj", replies: 14, tribe: "Indie Music" },
];

const Tribes = () => {
  const { slug } = useParams();
  const [active, setActive] = useState(slug ?? "all");
  const activeTribe = tribes.find((t) => t.slug === active);

  const filteredWorks = active === "all"
    ? featuredWorks
    : featuredWorks.filter((w) => w.tribe === activeTribe?.name);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-soft via-background to-amber-50 border-b-2 border-foreground overflow-hidden">
        <svg className="absolute top-6 right-8 w-24 h-24 text-foreground/15 hidden md:block" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 50 Q 35 20, 50 50 T 80 50" strokeLinecap="round" />
          <circle cx="20" cy="50" r="3" />
          <circle cx="80" cy="50" r="3" />
        </svg>
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-3xl">
            <span className="font-hand text-2xl md:text-3xl text-primary">Komunitas Inkkraft 🪐</span>
            <h1 className="text-4xl md:text-5xl font-extrabold mt-1 leading-tight">
              Temukan <span className="brush-highlight">tribe</span>-mu, bertumbuh bareng seniman.
            </h1>
            <p className="text-muted-foreground mt-3 text-base md:text-lg max-w-xl">
              Setiap tribe adalah subkultur. Diskusi, kolaborasi, lihat papan peringkat, dan dukung karya yang menggetarkan hatimu.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 sketch-border-sm font-bold text-sm" style={{ boxShadow: "3px 3px 0 0 hsl(var(--foreground))" }}>
                <Plus className="w-4 h-4" /> Buat Tribe Baru
              </button>
              <Link to="/catalog" className="inline-flex items-center gap-2 bg-card px-5 py-3 sketch-border-sm font-bold text-sm">
                Jelajah Karya <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tribe pills */}
      <section className="container mx-auto px-4 pt-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-1 px-1">
          <button
            onClick={() => setActive("all")}
            className={`shrink-0 px-4 py-2 sketch-border-sm font-bold text-sm whitespace-nowrap ${active === "all" ? "bg-foreground text-background" : "bg-card"}`}
          >
            Semua Tribe
          </button>
          {tribes.map((t) => (
            <button
              key={t.slug}
              onClick={() => setActive(t.slug)}
              className={`shrink-0 inline-flex items-center gap-1.5 px-4 py-2 sketch-border-sm font-bold text-sm whitespace-nowrap ${active === t.slug ? "bg-foreground text-background" : "bg-card"}`}
            >
              <span>{t.emoji}</span> {t.name}
            </button>
          ))}
        </div>
      </section>

      {/* Tribe Grid */}
      {active === "all" ? (
        <section className="container mx-auto px-4 py-10">
          <div className="flex items-end justify-between mb-6">
            <div>
              <span className="font-hand text-2xl text-primary">Daftar tribe ⌒</span>
              <h2 className="text-2xl md:text-3xl font-extrabold">Pilih komunitasmu</h2>
            </div>
            <span className="text-sm text-muted-foreground hidden md:block">{tribes.length} tribe aktif</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {tribes.map((t, i) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.slug}
                  onClick={() => setActive(t.slug)}
                  className={`relative ${t.bg} sketch-border p-6 text-left doodle-hover overflow-hidden`}
                  style={{ transform: `rotate(${(i % 2 === 0 ? -0.6 : 0.6)}deg)` }}
                >
                  <div className="flex items-start justify-between">
                    <div className="w-14 h-14 rounded-full bg-card border-2 border-foreground flex items-center justify-center text-3xl">
                      {t.emoji}
                    </div>
                    <span className="text-xs font-bold bg-card border-2 border-foreground px-2 py-1 rounded-full inline-flex items-center gap-1">
                      <Flame className="w-3 h-3 text-destructive" /> {t.growth}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-xl mt-4 inline-flex items-center gap-2">
                    <Icon className="w-5 h-5" /> {t.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1.5 leading-snug">{t.desc}</p>
                  <div className="flex items-center gap-4 mt-4 text-xs font-medium">
                    <span className="inline-flex items-center gap-1"><Palette className="w-3.5 h-3.5" /> {t.count} karya</span>
                    <span className="inline-flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {t.members}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      ) : (
        <section className="container mx-auto px-4 py-10">
          <div className={`relative ${activeTribe?.bg} sketch-border p-6 md:p-8 overflow-hidden`}>
            <div className="flex flex-col md:flex-row md:items-center gap-5">
              <div className="w-20 h-20 rounded-full bg-card border-2 border-foreground flex items-center justify-center text-4xl shrink-0">
                {activeTribe?.emoji}
              </div>
              <div className="flex-1">
                <span className="font-hand text-xl text-primary">Selamat datang di</span>
                <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">{activeTribe?.name}</h2>
                <p className="text-sm text-muted-foreground mt-1 max-w-xl">{activeTribe?.desc}</p>
                <div className="flex flex-wrap gap-4 mt-3 text-sm font-medium">
                  <span className="inline-flex items-center gap-1.5"><Palette className="w-4 h-4" /> {activeTribe?.count} karya</span>
                  <span className="inline-flex items-center gap-1.5"><Users className="w-4 h-4" /> {activeTribe?.members} anggota</span>
                  <span className="inline-flex items-center gap-1.5"><Flame className="w-4 h-4 text-destructive" /> Pertumbuhan {activeTribe?.growth}</span>
                </div>
              </div>
              <button className="bg-primary text-primary-foreground px-5 py-3 sketch-border-sm font-bold text-sm whitespace-nowrap" style={{ boxShadow: "3px 3px 0 0 hsl(var(--foreground))" }}>
                + Gabung Tribe
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Main grid: Featured + Leaderboard */}
      <section className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured works */}
          <div className="lg:col-span-2">
            <div className="flex items-end justify-between mb-5">
              <div>
                <span className="font-hand text-2xl text-primary">Sedang naik daun ✦</span>
                <h2 className="text-2xl md:text-3xl font-extrabold">Karya Pilihan</h2>
              </div>
              <Link to="/catalog" className="text-sm font-bold inline-flex items-center gap-1 hover:text-primary">
                Lihat semua <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {filteredWorks.length === 0 ? (
              <div className="paper-card p-10 text-center">
                <p className="font-hand text-2xl text-primary">Belum ada karya pilihan disini.</p>
                <p className="text-sm text-muted-foreground mt-1">Jadilah yang pertama mengunggah!</p>
                <Link to="/creator/upload" className="inline-flex mt-4 bg-primary text-primary-foreground px-4 py-2 sketch-border-sm font-bold text-sm">
                  Unggah Karya
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {filteredWorks.map((w, i) => (
                  <Link
                    key={w.id}
                    to={`/product/${w.id}`}
                    className="paper-card p-3 doodle-hover block"
                    style={{ transform: `rotate(${(i % 2 === 0 ? -0.5 : 0.5)}deg)` }}
                  >
                    <div className={`relative aspect-square ${w.bg} rounded-lg border-2 border-foreground flex items-center justify-center overflow-hidden`}>
                      <span className="font-hand text-3xl text-foreground/60 px-3 text-center">{w.title}</span>
                      <span className="absolute top-2 left-2 text-[10px] font-bold bg-card border-2 border-foreground px-1.5 py-0.5 rounded-full">
                        {w.tribe}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-3 px-1">
                      <div className="text-xs">
                        <p className="font-bold leading-tight">{w.title}</p>
                        <p className="text-muted-foreground">oleh {w.artist}</p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-bold">
                        <Heart className="w-3.5 h-3.5 text-destructive" /> {w.likes}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Discussion board */}
            <div className="mt-10">
              <div className="flex items-end justify-between mb-5">
                <div>
                  <span className="font-hand text-2xl text-primary">Obrolan tribe ✎</span>
                  <h2 className="text-2xl md:text-3xl font-extrabold">Diskusi Hangat</h2>
                </div>
                <button className="text-sm font-bold inline-flex items-center gap-1 bg-card sketch-border-sm px-3 py-2">
                  <Plus className="w-4 h-4" /> Mulai Topik
                </button>
              </div>
              <div className="paper-card divide-y-2 divide-foreground">
                {discussions.map((d, i) => (
                  <div key={i} className="p-4 flex items-start gap-3 hover:bg-secondary transition">
                    <div className="w-10 h-10 rounded-full bg-primary-soft border-2 border-foreground flex items-center justify-center shrink-0">
                      {d.pinned ? <Pin className="w-4 h-4" /> : <MessageCircle className="w-4 h-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm leading-tight truncate">{d.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {d.author} • <span className="font-medium">{d.tribe}</span>
                      </p>
                    </div>
                    <span className="text-xs font-bold inline-flex items-center gap-1 shrink-0">
                      <MessageCircle className="w-3.5 h-3.5" /> {d.replies}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Leaderboard + CTA */}
          <aside className="space-y-6">
            <div className="paper-card p-5">
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-5 h-5 text-accent-foreground" />
                <h3 className="font-extrabold text-lg">Leaderboard Bulan Ini</h3>
              </div>
              <ol className="space-y-3">
                {leaderboard.map((l) => (
                  <li key={l.rank} className="flex items-center gap-3">
                    <div className="relative">
                      <div className={`w-11 h-11 rounded-full ${l.color} border-2 border-foreground flex items-center justify-center font-bold text-sm`}>
                        {l.avatar}
                      </div>
                      {l.rank === 1 && <Crown className="absolute -top-2.5 -right-1 w-4 h-4 text-accent fill-accent" strokeWidth={2.5} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm leading-tight truncate">
                        <span className="font-hand text-base text-primary mr-1">#{l.rank}</span>
                        {l.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">{l.handle} • {l.tribe}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-extrabold text-sm">{l.sales}</p>
                      <p className="text-[10px] text-muted-foreground -mt-0.5">terjual</p>
                    </div>
                  </li>
                ))}
              </ol>
              <button className="w-full mt-5 bg-card sketch-border-sm py-2.5 font-bold text-sm hover:bg-secondary">
                Lihat Top 100
              </button>
            </div>

            <div className="paper-card p-5 bg-primary-soft">
              <span className="font-hand text-xl text-primary">Punya scene sendiri?</span>
              <h3 className="font-extrabold text-lg leading-tight mt-1">Ajukan tribe baru</h3>
              <p className="text-xs text-muted-foreground mt-2">
                Komunitas niche-mu pantas punya rumah. Kami review tiap minggu.
              </p>
              <button className="w-full mt-4 bg-foreground text-background sketch-border-sm py-2.5 font-bold text-sm">
                Ajukan Sekarang
              </button>
            </div>

            <div className="paper-card p-5">
              <h3 className="font-extrabold text-lg leading-tight">Rules of the Tribe</h3>
              <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
                <li>✦ Hormati karya orang lain — no rip-off.</li>
                <li>✦ Kritik membangun, bukan menjatuhkan.</li>
                <li>✦ Karya orisinil naik ranking lebih cepat.</li>
                <li>{"✦ Kolaborasi > kompetisi."}</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Tribes;
