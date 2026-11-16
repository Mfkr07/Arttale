import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  BadgeCheck, MapPin, Calendar, Users, Heart, Share2, MessageCircle,
  Instagram, Globe, Twitter, Sparkles, TrendingUp, Award, Eye, ShoppingBag,
  Filter, Grid3x3, Star, Flame
} from "lucide-react";

const works = [
  { id: "w1", title: "Senja di Malioboro", tribe: "Anime Lokal", price: 145000, sold: 234, likes: 1820, hot: true, color: "from-orange-300 to-pink-300" },
  { id: "w2", title: "Receh Republik Vol. 3", tribe: "Receh Republik", price: 95000, sold: 512, likes: 3210, hot: true, color: "from-yellow-300 to-orange-400" },
  { id: "w3", title: "Tipografi Merdeka", tribe: "Nasionalis", price: 125000, sold: 189, likes: 945, color: "from-red-300 to-rose-400" },
  { id: "w4", title: "Kucing Anime Series", tribe: "Anime Lokal", price: 110000, sold: 423, likes: 2104, color: "from-purple-300 to-indigo-400" },
  { id: "w5", title: "Quotes Bapack", tribe: "Receh Republik", price: 85000, sold: 678, likes: 4012, hot: true, color: "from-emerald-300 to-teal-400" },
  { id: "w6", title: "Wayang Modern", tribe: "Budaya", price: 165000, sold: 92, likes: 521, color: "from-amber-300 to-yellow-400" },
  { id: "w7", title: "Jakarta Skyline", tribe: "Urban", price: 135000, sold: 156, likes: 778, color: "from-sky-300 to-blue-400" },
  { id: "w8", title: "Doodle Pisang Goreng", tribe: "Receh Republik", price: 75000, sold: 891, likes: 5320, hot: true, color: "from-lime-300 to-green-400" },
];

const collections = [
  { name: "Indonesia Bercerita", count: 12, color: "bg-primary/10" },
  { name: "Daily Doodles", count: 28, color: "bg-accent/20" },
  { name: "Edisi Terbatas", count: 6, color: "bg-destructive/10" },
];

const reviews = [
  { name: "Arini K.", rating: 5, comment: "Kualitas printing-nya juara! Tinta-nya tajam, motif tetap clear walau dicuci 10x.", time: "2 hari lalu", verified: true },
  { name: "Bagas P.", rating: 5, comment: "Desain Receh Republik bikin ngakak tiap dipake ke kantor. Disuruh share toko terus 😂", time: "5 hari lalu", verified: true },
  { name: "Citra L.", rating: 4, comment: "Sukaaa banget, packaging-nya juga estetik bgt. Cuma agak lama sampainya.", time: "1 minggu lalu", verified: true },
];

const tabs = [
  { id: "works", label: "Karya", icon: Grid3x3 },
  { id: "collections", label: "Koleksi", icon: Award },
  { id: "reviews", label: "Ulasan", icon: Star },
  { id: "about", label: "Tentang", icon: Sparkles },
];

const filters = ["Semua", "Terlaris", "Terbaru", "Anime Lokal", "Receh Republik"];

const CreatorStorefront = () => {
  useParams();
  const [tab, setTab] = useState("works");
  const [filter, setFilter] = useState("Semua");
  const [following, setFollowing] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Cover */}
        <section className="relative h-48 md:h-64 bg-gradient-to-br from-primary/30 via-accent/20 to-primary/40 border-b-2 border-foreground overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, hsl(var(--foreground)) 1px, transparent 0)", backgroundSize: "20px 20px" }} />
          <div className="absolute top-6 right-6 hidden md:block font-hand text-6xl text-foreground/15 -rotate-6">studio tinta ✦</div>
        </section>

        {/* Profile header */}
        <section className="container mx-auto px-4 -mt-16 md:-mt-20 relative">
          <div className="paper-card p-5 md:p-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Avatar */}
              <div className="relative -mt-16 md:-mt-20">
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-primary via-accent to-primary border-4 border-foreground shadow-[6px_6px_0_0_hsl(var(--foreground))] flex items-center justify-center font-hand text-5xl text-background">
                  ST
                </div>
                <span className="absolute bottom-1 right-1 bg-background border-2 border-foreground rounded-full p-1.5">
                  <BadgeCheck className="w-5 h-5 text-primary fill-primary/20" strokeWidth={2.5} />
                </span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h1 className="text-2xl md:text-3xl font-bold">Studio Tinta</h1>
                  <span className="text-xs font-bold uppercase bg-foreground text-background px-2 py-0.5 rounded">Top Creator</span>
                  <span className="text-xs font-bold uppercase bg-accent text-accent-foreground px-2 py-0.5 rounded border-2 border-foreground">Lvl 24</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">@studiotinta · Ilustrator visual budaya & receh nusantara</p>

                <p className="text-sm leading-relaxed max-w-2xl mb-4">
                  Bikin desain dari ngopi sambil dengerin lagu indie. <span className="brush-highlight font-semibold">Karya kami menceritakan Indonesia</span> — dari Malioboro sampe meme bapack di grup WA. Open commission untuk merch komunitas!
                </p>

                <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" strokeWidth={2.5} /> Yogyakarta, ID</span>
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" strokeWidth={2.5} /> Bergabung Mar 2023</span>
                  <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" strokeWidth={2.5} /> studiotinta.id</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setFollowing(!following)}
                    className={`sketch-border-sm px-5 py-2 text-sm font-bold transition ${
                      following ? "bg-card text-foreground" : "bg-foreground text-background"
                    }`}
                  >
                    {following ? "✓ Mengikuti" : "+ Ikuti"}
                  </button>
                  <Link to="/messages/studio-tinta" className="sketch-border-sm bg-card px-4 py-2 text-sm font-bold flex items-center gap-2 hover:bg-muted">
                    <MessageCircle className="w-4 h-4" strokeWidth={2.5} /> Pesan
                  </Link>
                  <button aria-label="Bagikan" className="sketch-border-sm bg-card p-2 hover:bg-muted">
                    <Share2 className="w-4 h-4" strokeWidth={2.5} />
                  </button>
                  <button aria-label="Suka" className="sketch-border-sm bg-card p-2 hover:bg-muted">
                    <Heart className="w-4 h-4" strokeWidth={2.5} />
                  </button>
                  <div className="ml-auto flex items-center gap-1">
                    <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="sketch-border-sm bg-card p-2 hover:bg-muted"><Instagram className="w-4 h-4" strokeWidth={2.5} /></a>
                    <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="sketch-border-sm bg-card p-2 hover:bg-muted"><Twitter className="w-4 h-4" strokeWidth={2.5} /></a>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-6 border-t-2 border-dashed border-border-soft">
              {[
                { label: "Karya", value: "127", icon: Grid3x3 },
                { label: "Pengikut", value: "12.4K", icon: Users },
                { label: "Terjual", value: "3.2K", icon: ShoppingBag },
                { label: "Rating", value: "4.9", icon: Star },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <s.icon className="w-4 h-4 mx-auto mb-1 text-primary" strokeWidth={2.5} />
                  <div className="text-2xl font-bold">{s.value}</div>
                  <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="container mx-auto px-4 mt-8">
          <div className="flex gap-1 border-b-2 border-foreground overflow-x-auto">
            {tabs.map((t) => {
              const Icon = t.icon;
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-bold whitespace-nowrap border-b-4 -mb-0.5 transition ${
                    active ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" strokeWidth={2.5} />
                  {t.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* Tab content */}
        <section className="container mx-auto px-4 py-8">
          {tab === "works" && (
            <>
              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <Filter className="w-4 h-4 text-muted-foreground" strokeWidth={2.5} />
                {filters.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`text-xs font-bold px-3 py-1.5 sketch-border-sm transition ${
                      filter === f ? "bg-foreground text-background" : "bg-card hover:bg-muted"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {works.map((w) => (
                  <Link key={w.id} to={`/product/${w.id}`} className="paper-card overflow-hidden doodle-hover">
                    <div className={`relative aspect-square bg-gradient-to-br ${w.color} border-b-2 border-foreground flex items-center justify-center`}>
                      <span className="font-hand text-3xl text-foreground/40">{w.title.charAt(0)}</span>
                      {w.hot && (
                        <span className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-[10px] font-bold uppercase px-2 py-0.5 rounded flex items-center gap-1 border-2 border-foreground">
                          <Flame className="w-3 h-3" strokeWidth={3} /> Hot
                        </span>
                      )}
                      <button aria-label="Suka" className="absolute top-2 right-2 bg-background/90 border-2 border-foreground rounded-full p-1.5 hover:bg-card">
                        <Heart className="w-3.5 h-3.5" strokeWidth={2.5} />
                      </button>
                    </div>
                    <div className="p-3">
                      <div className="text-[10px] font-bold uppercase text-primary tracking-wide mb-0.5">{w.tribe}</div>
                      <h3 className="font-bold text-sm leading-tight line-clamp-1 mb-2">{w.title}</h3>
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-sm">Rp{(w.price / 1000).toFixed(0)}K</div>
                        <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                          <Heart className="w-3 h-3" strokeWidth={2.5} /> {w.likes > 999 ? `${(w.likes / 1000).toFixed(1)}K` : w.likes}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}

          {tab === "collections" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {collections.map((c) => (
                <div key={c.name} className={`paper-card p-6 ${c.color}`}>
                  <Award className="w-8 h-8 mb-3" strokeWidth={2.5} />
                  <h3 className="font-bold text-lg mb-1">{c.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{c.count} karya tematik</p>
                  <button className="sketch-border-sm bg-card px-3 py-1.5 text-xs font-bold hover:bg-muted">Lihat koleksi →</button>
                </div>
              ))}
            </div>
          )}

          {tab === "reviews" && (
            <div className="max-w-3xl mx-auto space-y-4">
              <div className="paper-card p-5 flex flex-col md:flex-row items-center gap-6">
                <div className="text-center">
                  <div className="text-5xl font-bold">4.9</div>
                  <div className="flex justify-center gap-0.5 my-1">
                    {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-4 h-4 fill-accent text-accent" strokeWidth={2} />)}
                  </div>
                  <div className="text-xs text-muted-foreground">428 ulasan</div>
                </div>
                <div className="flex-1 w-full space-y-1.5">
                  {[5, 4, 3, 2, 1].map((s, i) => (
                    <div key={s} className="flex items-center gap-2 text-xs">
                      <span className="w-4">{s}★</span>
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden border border-border-soft">
                        <div className="h-full bg-accent" style={{ width: `${[88, 8, 3, 1, 0][i]}%` }} />
                      </div>
                      <span className="w-10 text-right text-muted-foreground">{[88, 8, 3, 1, 0][i]}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {reviews.map((r, i) => (
                <div key={i} className="paper-card p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-foreground" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm">{r.name}</span>
                        {r.verified && <BadgeCheck className="w-3.5 h-3.5 text-primary" strokeWidth={2.5} />}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="flex">{Array.from({ length: r.rating }).map((_, j) => <Star key={j} className="w-3 h-3 fill-accent text-accent" strokeWidth={2} />)}</span>
                        · {r.time}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed">{r.comment}</p>
                </div>
              ))}
            </div>
          )}

          {tab === "about" && (
            <div className="max-w-3xl mx-auto space-y-5">
              <div className="paper-card p-6">
                <h2 className="font-hand text-3xl mb-3">Cerita Studio</h2>
                <p className="text-sm leading-relaxed text-muted-foreground mb-3">
                  Studio Tinta lahir dari obsesi dua sahabat di Jogja: Rama (ilustrator) dan Wina (kurator budaya). Mereka percaya bahwa <b className="text-foreground">setiap kota di Indonesia punya estetika sendiri</b> yang layak dirayakan, dari warung kopi pinggir kali sampe arsitektur kolonial yang sering kelewatan.
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Sejak 2023 kami telah berkolaborasi dengan 14 komunitas lokal dan menyumbang <b className="text-foreground">Rp48jt</b> dari hasil penjualan ke kegiatan seni murid sekolah dasar.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="paper-card p-5 bg-primary/5">
                  <TrendingUp className="w-6 h-6 mb-2 text-primary" strokeWidth={2.5} />
                  <div className="text-2xl font-bold">98%</div>
                  <div className="text-xs text-muted-foreground">Pesanan tepat waktu</div>
                </div>
                <div className="paper-card p-5 bg-accent/10">
                  <Eye className="w-6 h-6 mb-2" strokeWidth={2.5} />
                  <div className="text-2xl font-bold">2.4 jam</div>
                  <div className="text-xs text-muted-foreground">Rata-rata respon chat</div>
                </div>
              </div>

              <div className="paper-card p-6">
                <h3 className="font-bold text-lg mb-3">Tribes yang diikuti</h3>
                <div className="flex flex-wrap gap-2">
                  {["Anime Lokal", "Receh Republik", "Nasionalis", "Budaya", "Urban Sketcher"].map((t) => (
                    <span key={t} className="text-xs font-bold sketch-border-sm bg-card px-3 py-1.5">#{t}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CreatorStorefront;
