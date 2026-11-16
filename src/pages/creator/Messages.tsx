import { useState, useMemo, useRef, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import CreatorSidebar from "@/components/creator/CreatorSidebar";
import CreatorTopbar from "@/components/creator/CreatorTopbar";
import {
  Search, Send, Paperclip, Image as ImageIcon, Smile, MoreVertical,
  CheckCheck, Check, Phone, Info, Pin, Archive, ShoppingBag, Star,
  ArrowLeft, Filter, Circle
} from "lucide-react";

type Message = {
  id: string;
  from: "me" | "them";
  text?: string;
  attachment?: { type: "image" | "order"; label: string };
  time: string;
  status?: "sent" | "delivered" | "read";
};

type Conversation = {
  id: string;
  name: string;
  handle: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  pinned?: boolean;
  tag?: "buyer" | "creator" | "support";
  avatar: string;
  context?: { order: string; product: string };
  messages: Message[];
};

const conversations: Conversation[] = [
  {
    id: "arini-k",
    name: "Arini Kusuma",
    handle: "@arinikus",
    lastMessage: "Mas, hoodie-nya bisa custom ukuran XXL gak?",
    time: "Baru saja",
    unread: 2,
    online: true,
    pinned: true,
    tag: "buyer",
    avatar: "from-pink-300 to-rose-400",
    context: { order: "INK-2841", product: "Senja di Malioboro Hoodie" },
    messages: [
      { id: "m1", from: "them", text: "Halo kak, salam kenal! Saya naksir banget hoodie Senja di Malioboro 🌅", time: "10:14" },
      { id: "m2", from: "me", text: "Halo Arini, makasih banyak! Lagi cari ukuran apa nih?", time: "10:16", status: "read" },
      { id: "m3", from: "them", attachment: { type: "image", label: "screenshot_size.jpg" }, time: "10:18" },
      { id: "m4", from: "them", text: "Mas, hoodie-nya bisa custom ukuran XXL gak? Biasa beli L tapi mau dipakein ke pacar 😅", time: "10:18" },
      { id: "m5", from: "me", text: "Bisa banget Arini! Untuk XXL ada tambahan Rp25rb. Estimasi produksi 3-4 hari setelah konfirmasi.", time: "10:21", status: "delivered" },
      { id: "m6", from: "them", text: "Wah okeee, langsung checkout aja kalo gitu!", time: "10:24" },
    ],
  },
  {
    id: "bagas-p",
    name: "Bagas Pratama",
    handle: "@bagaspr",
    lastMessage: "Sip mas, ditunggu ya paketnya 🙏",
    time: "12 mnt",
    unread: 0,
    online: true,
    tag: "buyer",
    avatar: "from-amber-300 to-orange-400",
    context: { order: "INK-2839", product: "Receh Republik Tee" },
    messages: [
      { id: "m1", from: "them", text: "Mas resi udah ada belum?", time: "Kemarin" },
      { id: "m2", from: "me", text: "Sudah dikirim Bagas! Resi: JNE-872193847. Estimasi 2-3 hari sampe Bandung.", time: "09:22", status: "read" },
      { id: "m3", from: "them", text: "Sip mas, ditunggu ya paketnya 🙏", time: "09:24" },
    ],
  },
  {
    id: "citra-l",
    name: "Citra Larasati",
    handle: "@citral",
    lastMessage: "Karyanya keren bgttt, ada koleksi lain?",
    time: "2 jam",
    unread: 1,
    online: false,
    tag: "buyer",
    avatar: "from-violet-300 to-purple-400",
    messages: [
      { id: "m1", from: "them", text: "Hai! Aku liat karyamu di Tribe Anime Lokal 😍", time: "08:15" },
      { id: "m2", from: "them", text: "Karyanya keren bgttt, ada koleksi lain?", time: "08:16" },
    ],
  },
  {
    id: "dimas-w",
    name: "Dimas Wijaya",
    handle: "@dimaswj",
    lastMessage: "Thanks mas, packagingnya estetik 👌",
    time: "Kemarin",
    unread: 0,
    online: false,
    tag: "buyer",
    avatar: "from-emerald-300 to-teal-400",
    messages: [
      { id: "m1", from: "them", text: "Thanks mas, packagingnya estetik 👌", time: "Kemarin 16:42" },
    ],
  },
  {
    id: "eka-handayani",
    name: "Eka Handayani",
    handle: "@ekahdy",
    lastMessage: "Kolab buat merch komunitas Jogja gimana?",
    time: "Kemarin",
    unread: 0,
    online: false,
    tag: "creator",
    avatar: "from-sky-300 to-blue-400",
    messages: [
      { id: "m1", from: "them", text: "Halo Studio Tinta! Aku Eka dari Komunitas Sepeda Jogja.", time: "Kemarin 14:00" },
      { id: "m2", from: "them", text: "Kolab buat merch komunitas Jogja gimana?", time: "Kemarin 14:01" },
    ],
  },
  {
    id: "support",
    name: "Inkkraft Support",
    handle: "@support",
    lastMessage: "Tiket #4421 sudah diselesaikan ✓",
    time: "3 hari",
    unread: 0,
    online: true,
    tag: "support",
    avatar: "from-foreground to-foreground",
    messages: [
      { id: "m1", from: "them", text: "Tiket #4421 sudah diselesaikan ✓ Selamat berkarya!", time: "3 hari lalu" },
    ],
  },
];

const filterTabs = [
  { id: "all", label: "Semua" },
  { id: "unread", label: "Belum dibaca" },
  { id: "buyer", label: "Pembeli" },
  { id: "creator", label: "Kreator" },
];

const Messages = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState<string>(params.id || conversations[0].id);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [draft, setDraft] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    return conversations.filter((c) => {
      if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.lastMessage.toLowerCase().includes(search.toLowerCase())) return false;
      if (filter === "unread") return c.unread > 0;
      if (filter === "buyer" || filter === "creator") return c.tag === filter;
      return true;
    });
  }, [filter, search]);

  const active = conversations.find((c) => c.id === activeId) ?? conversations[0];

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [activeId]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    setDraft("");
    setTimeout(() => scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }), 50);
  };

  const totalUnread = conversations.reduce((s, c) => s + c.unread, 0);

  return (
    <div className="min-h-screen flex bg-background">
      <CreatorSidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <CreatorTopbar title="Pesan" subtitle={`${totalUnread} pesan belum dibaca · Rata-rata respon 2.4 jam`} />

        <main className="flex-1 px-3 md:px-6 py-4 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] lg:grid-cols-[320px_1fr_280px] gap-4 h-[calc(100vh-7.5rem)]">
            {/* Conversation list */}
            <aside className={`paper-card flex flex-col overflow-hidden ${activeId && "hidden md:flex"}`}>
              <div className="p-3 border-b-2 border-foreground space-y-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" strokeWidth={2.5} />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cari pesan..."
                    className="w-full sketch-border-sm bg-background pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="flex gap-1 overflow-x-auto">
                  {filterTabs.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setFilter(t.id)}
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-md whitespace-nowrap border-2 transition ${
                        filter === t.id ? "bg-foreground text-background border-foreground" : "bg-card border-border-soft hover:border-foreground"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                {filtered.length === 0 && (
                  <div className="p-6 text-center text-sm text-muted-foreground">Tidak ada percakapan.</div>
                )}
                {filtered.map((c) => {
                  const isActive = c.id === activeId;
                  return (
                    <button
                      key={c.id}
                      onClick={() => { setActiveId(c.id); navigate(`/creator/messages/${c.id}`, { replace: true }); }}
                      className={`w-full flex items-start gap-3 p-3 border-b border-border-soft text-left transition ${
                        isActive ? "bg-primary/10" : "hover:bg-muted/50"
                      }`}
                    >
                      <div className="relative shrink-0">
                        <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${c.avatar} border-2 border-foreground`} />
                        {c.online && <Circle className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 fill-emerald-500 text-background stroke-[3]" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-sm truncate">{c.name}</span>
                          {c.pinned && <Pin className="w-3 h-3 text-primary shrink-0" strokeWidth={2.5} />}
                          <span className="ml-auto text-[10px] text-muted-foreground shrink-0">{c.time}</span>
                        </div>
                        <p className={`text-xs truncate mt-0.5 ${c.unread > 0 ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                          {c.lastMessage}
                        </p>
                      </div>
                      {c.unread > 0 && (
                        <span className="shrink-0 min-w-[18px] h-[18px] px-1.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-foreground">
                          {c.unread}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* Conversation thread */}
            <section className="paper-card flex flex-col overflow-hidden">
              {/* Thread header */}
              <header className="px-4 py-3 border-b-2 border-foreground flex items-center gap-3">
                <button onClick={() => navigate(-1)} aria-label="Kembali" className="md:hidden p-1">
                  <ArrowLeft className="w-5 h-5" strokeWidth={2.5} />
                </button>
                <div className="relative">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${active.avatar} border-2 border-foreground`} />
                  {active.online && <Circle className="absolute -bottom-0.5 -right-0.5 w-3 h-3 fill-emerald-500 text-background stroke-[3]" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <Link to={`/creator/${active.handle.replace("@", "")}`} className="font-bold text-sm truncate hover:underline">{active.name}</Link>
                    {active.tag === "buyer" && <span className="text-[9px] font-bold uppercase bg-accent text-accent-foreground px-1.5 py-0.5 rounded">Pembeli</span>}
                    {active.tag === "creator" && <span className="text-[9px] font-bold uppercase bg-primary text-primary-foreground px-1.5 py-0.5 rounded">Kreator</span>}
                  </div>
                  <p className="text-[11px] text-muted-foreground">{active.online ? "Online sekarang" : "Terakhir aktif 2 jam lalu"}</p>
                </div>
                <button aria-label="Telpon" className="hidden md:flex p-2 sketch-border-sm bg-card hover:bg-muted">
                  <Phone className="w-4 h-4" strokeWidth={2.5} />
                </button>
                <button onClick={() => setShowInfo(!showInfo)} aria-label="Info" className="lg:hidden p-2 sketch-border-sm bg-card hover:bg-muted">
                  <Info className="w-4 h-4" strokeWidth={2.5} />
                </button>
                <button aria-label="Lainnya" className="p-2 sketch-border-sm bg-card hover:bg-muted">
                  <MoreVertical className="w-4 h-4" strokeWidth={2.5} />
                </button>
              </header>

              {/* Order context bar */}
              {active.context && (
                <div className="px-4 py-2.5 bg-primary/5 border-b-2 border-dashed border-border-soft flex items-center gap-2 text-xs">
                  <ShoppingBag className="w-3.5 h-3.5 text-primary shrink-0" strokeWidth={2.5} />
                  <span className="text-muted-foreground">Diskusi terkait:</span>
                  <Link to={`/track/${active.context.order}`} className="font-bold hover:underline">{active.context.order}</Link>
                  <span className="text-muted-foreground">·</span>
                  <span className="truncate">{active.context.product}</span>
                </div>
              )}

              {/* Messages */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-5 space-y-3 bg-background/50">
                <div className="text-center">
                  <span className="text-[11px] text-muted-foreground bg-background border border-border-soft rounded-full px-3 py-1">Hari ini</span>
                </div>
                {active.messages.map((m) => {
                  const mine = m.from === "me";
                  return (
                    <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[78%] ${mine ? "items-end" : "items-start"} flex flex-col gap-1`}>
                        {m.attachment?.type === "image" && (
                          <div className={`sketch-border-sm overflow-hidden ${mine ? "bg-primary/20" : "bg-card"}`}>
                            <div className="w-48 h-32 bg-gradient-to-br from-muted to-border-soft flex items-center justify-center">
                              <ImageIcon className="w-8 h-8 text-muted-foreground" strokeWidth={2} />
                            </div>
                            <div className="px-2 py-1 text-[10px] text-muted-foreground border-t border-border-soft">{m.attachment.label}</div>
                          </div>
                        )}
                        {m.text && (
                          <div
                            className={`sketch-border-sm px-3.5 py-2.5 text-sm leading-snug ${
                              mine ? "bg-primary text-primary-foreground" : "bg-card"
                            }`}
                          >
                            {m.text}
                          </div>
                        )}
                        <div className={`flex items-center gap-1 text-[10px] text-muted-foreground px-1 ${mine ? "flex-row-reverse" : ""}`}>
                          <span>{m.time}</span>
                          {mine && m.status === "read" && <CheckCheck className="w-3 h-3 text-primary" strokeWidth={2.5} />}
                          {mine && m.status === "delivered" && <CheckCheck className="w-3 h-3" strokeWidth={2.5} />}
                          {mine && m.status === "sent" && <Check className="w-3 h-3" strokeWidth={2.5} />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick replies */}
              <div className="px-3 pt-2 flex gap-1.5 overflow-x-auto border-t border-border-soft">
                {["Terima kasih! 🙌", "Siap, cek DM ya", "Estimasi 3-4 hari", "Bisa custom kok"].map((q) => (
                  <button
                    key={q}
                    onClick={() => setDraft(q)}
                    className="text-[11px] font-medium whitespace-nowrap sketch-border-sm bg-card px-2.5 py-1 hover:bg-muted"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Composer */}
              <form onSubmit={handleSend} className="p-3 border-t-2 border-foreground flex items-end gap-2">
                <button type="button" aria-label="Lampirkan" className="p-2 sketch-border-sm bg-card hover:bg-muted shrink-0">
                  <Paperclip className="w-4 h-4" strokeWidth={2.5} />
                </button>
                <button type="button" aria-label="Foto" className="p-2 sketch-border-sm bg-card hover:bg-muted shrink-0 hidden sm:block">
                  <ImageIcon className="w-4 h-4" strokeWidth={2.5} />
                </button>
                <div className="flex-1 relative">
                  <input
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder="Tulis pesan..."
                    className="w-full sketch-border-sm bg-background pl-3 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button type="button" aria-label="Emoji" className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:text-primary">
                    <Smile className="w-4 h-4" strokeWidth={2.5} />
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={!draft.trim()}
                  className="p-2.5 sketch-border-sm bg-foreground text-background hover:bg-foreground/90 disabled:opacity-40 shrink-0"
                  aria-label="Kirim"
                >
                  <Send className="w-4 h-4" strokeWidth={2.5} />
                </button>
              </form>
            </section>

            {/* Info panel */}
            <aside className={`paper-card overflow-y-auto p-5 ${showInfo ? "block" : "hidden lg:block"}`}>
              <div className="flex flex-col items-center text-center pb-5 border-b-2 border-dashed border-border-soft">
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${active.avatar} border-2 border-foreground shadow-[3px_3px_0_0_hsl(var(--foreground))] mb-3`} />
                <h3 className="font-bold">{active.name}</h3>
                <p className="text-xs text-muted-foreground">{active.handle}</p>
                <Link to={`/creator/${active.handle.replace("@", "")}`} className="mt-3 sketch-border-sm bg-card px-3 py-1.5 text-xs font-bold hover:bg-muted">
                  Lihat profil
                </Link>
              </div>

              <div className="py-4 border-b-2 border-dashed border-border-soft">
                <h4 className="text-xs font-bold uppercase text-muted-foreground mb-3">Statistik</h4>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div>
                    <div className="text-xl font-bold">5</div>
                    <div className="text-[10px] uppercase text-muted-foreground">Pesanan</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold flex items-center justify-center gap-0.5">4.9 <Star className="w-3.5 h-3.5 fill-accent text-accent" strokeWidth={0} /></div>
                    <div className="text-[10px] uppercase text-muted-foreground">Rating</div>
                  </div>
                </div>
              </div>

              {active.context && (
                <div className="py-4 border-b-2 border-dashed border-border-soft">
                  <h4 className="text-xs font-bold uppercase text-muted-foreground mb-3">Pesanan terkait</h4>
                  <Link to={`/track/${active.context.order}`} className="block sketch-border-sm bg-card p-3 hover:bg-muted">
                    <div className="text-[11px] text-muted-foreground">#{active.context.order}</div>
                    <div className="text-sm font-bold mt-0.5">{active.context.product}</div>
                    <div className="text-[10px] uppercase font-bold text-primary mt-1.5">Sedang diproduksi →</div>
                  </Link>
                </div>
              )}

              <div className="py-4 space-y-2">
                <button className="w-full text-left text-sm flex items-center gap-2 px-2 py-2 hover:bg-muted rounded">
                  <Pin className="w-4 h-4" strokeWidth={2.5} /> Sematkan percakapan
                </button>
                <button className="w-full text-left text-sm flex items-center gap-2 px-2 py-2 hover:bg-muted rounded">
                  <Archive className="w-4 h-4" strokeWidth={2.5} /> Arsipkan
                </button>
                <button className="w-full text-left text-sm flex items-center gap-2 px-2 py-2 hover:bg-muted rounded text-destructive">
                  <Filter className="w-4 h-4" strokeWidth={2.5} /> Blokir & laporkan
                </button>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Messages;
