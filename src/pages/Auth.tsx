import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Mail, Lock, User as UserIcon, Eye, EyeOff, Check, ShoppingBag, Palette, Sparkles, Apple } from "lucide-react";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";

type Mode = "login" | "register" | "role" | "onboard-buyer" | "onboard-creator" | "forgot";
type Role = "buyer" | "creator" | null;

const GoogleIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
);

const Auth = () => {
  const [params] = useSearchParams();
  const initial = (params.get("mode") as Mode) || "login";
  const [mode, setMode] = useState<Mode>(initial);
  const [showPwd, setShowPwd] = useState(false);
  const [role, setRole] = useState<Role>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget as HTMLFormElement);
    const email = (fd.get("email") as string) || "kamu@inkkraft.id";
    if (mode === "login") {
      login({ name: email.split("@")[0] || "Sahabat Tinta", email });
      navigate("/");
    }
    else if (mode === "register") setMode("role");
    else if (mode === "forgot") setMode("login");
  };

  const pickRole = (r: Role) => {
    setRole(r);
    setMode(r === "buyer" ? "onboard-buyer" : "onboard-creator");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <header className="h-16 md:h-20 border-b-2 border-foreground flex items-center px-4 md:px-8">
        <Link to="/" className="flex items-center gap-2 text-sm font-medium hover:text-primary">
          <ArrowLeft className="w-4 h-4" strokeWidth={2.5} /> Kembali ke beranda
        </Link>
        <Link to="/" className="ml-auto font-hand text-3xl">
          Ink<span className="text-primary">kraft</span>
        </Link>
      </header>

      <main className="flex-1 grid lg:grid-cols-2">
        {/* Left — illustrated panel */}
        <aside className="hidden lg:flex flex-col justify-between bg-primary/5 border-r-2 border-foreground p-12 relative overflow-hidden">
          <div>
            <span className="inline-block bg-accent text-accent-foreground sketch-border-sm px-3 py-1 text-xs font-bold uppercase tracking-wider mb-6">
              {mode === "register" || mode === "role" ? "Bergabung" : "Selamat Datang Kembali"}
            </span>
            <h1 className="font-hand text-6xl leading-tight mb-4">
              {mode === "register" || mode === "role"
                ? <>Tinta baru, <br/><span className="brush-highlight">cerita baru.</span></>
                : <>Halo, <br/><span className="brush-highlight">teman seniman!</span></>}
            </h1>
            <p className="text-muted-foreground max-w-sm">
              Marketplace print on demand untuk seniman lokal & pencari karya unik. Setiap tinta punya cerita.
            </p>
          </div>

          {/* Doodle stack */}
          <div className="relative h-72">
            <div className="absolute top-0 left-0 paper-card p-5 w-56 rotate-[-6deg]">
              <Palette className="w-6 h-6 text-primary mb-2" strokeWidth={2.5} />
              <p className="font-hand text-2xl leading-none">10K+ Karya</p>
              <p className="text-xs text-muted-foreground mt-1">dari 1.200 seniman lokal</p>
            </div>
            <div className="absolute top-16 left-40 paper-card p-5 w-52 rotate-[4deg] bg-accent/20">
              <Sparkles className="w-6 h-6 text-foreground mb-2" strokeWidth={2.5} />
              <p className="font-hand text-2xl leading-none">Auto-Mockup</p>
              <p className="text-xs text-muted-foreground mt-1">1 file → 30+ produk</p>
            </div>
            <div className="absolute top-44 left-12 paper-card p-5 w-60 rotate-[-2deg]">
              <ShoppingBag className="w-6 h-6 text-primary mb-2" strokeWidth={2.5} />
              <p className="font-hand text-2xl leading-none">Print on Demand</p>
              <p className="text-xs text-muted-foreground mt-1">Tanpa stok, tanpa risiko.</p>
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            "Setiap tinta yang kau tuang, jadi cerita yang dipakai orang." — Inkkraft
          </p>
        </aside>

        {/* Right — form */}
        <section className="flex items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-md">
            {mode === "login" && (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h2 className="font-hand text-5xl mb-2">Masuk</h2>
                  <p className="text-sm text-muted-foreground">Lanjutkan kreasi & belanjamu.</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button type="button" className="sketch-border-sm bg-card hover:bg-muted py-2.5 flex items-center justify-center gap-2 text-sm font-medium">
                    <GoogleIcon /> Google
                  </button>
                  <button type="button" className="sketch-border-sm bg-card hover:bg-muted py-2.5 flex items-center justify-center gap-2 text-sm font-medium">
                    <Apple className="w-4 h-4" strokeWidth={2.5} /> Apple
                  </button>
                </div>

                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex-1 h-px bg-border-soft" />atau pakai email<span className="flex-1 h-px bg-border-soft" />
                </div>

                <Field icon={Mail} label="Email" type="email" placeholder="kamu@email.com" />
                <Field
                  icon={Lock} label="Kata Sandi" type={showPwd ? "text" : "password"} placeholder="••••••••"
                  trailing={
                    <button type="button" onClick={() => setShowPwd(s => !s)} className="text-muted-foreground hover:text-foreground">
                      {showPwd ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                    </button>
                  }
                />
                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 accent-primary" /> Ingat saya
                  </label>
                  <button type="button" onClick={() => setMode("forgot")} className="text-primary font-semibold hover:underline">
                    Lupa kata sandi?
                  </button>
                </div>

                <button type="submit" className="w-full bg-primary text-primary-foreground sketch-border-sm py-3 font-semibold hover:bg-primary/90"
                  style={{ boxShadow: "3px 3px 0 0 hsl(var(--foreground))" }}>
                  Masuk ke Studio
                </button>

                <p className="text-sm text-center text-muted-foreground">
                  Belum punya akun?{" "}
                  <button type="button" onClick={() => setMode("register")} className="text-primary font-semibold hover:underline">
                    Daftar gratis
                  </button>
                </p>
              </form>
            )}

            {mode === "register" && (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h2 className="font-hand text-5xl mb-2">Daftar</h2>
                  <p className="text-sm text-muted-foreground">Mulai dalam 30 detik. Tanpa biaya.</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button type="button" className="sketch-border-sm bg-card hover:bg-muted py-2.5 flex items-center justify-center gap-2 text-sm font-medium">
                    <GoogleIcon /> Google
                  </button>
                  <button type="button" className="sketch-border-sm bg-card hover:bg-muted py-2.5 flex items-center justify-center gap-2 text-sm font-medium">
                    <Apple className="w-4 h-4" strokeWidth={2.5} /> Apple
                  </button>
                </div>

                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex-1 h-px bg-border-soft" />atau pakai email<span className="flex-1 h-px bg-border-soft" />
                </div>

                <Field icon={UserIcon} label="Nama panggilan" placeholder="cth. Rizky" />
                <Field icon={Mail} label="Email" type="email" placeholder="kamu@email.com" />
                <Field icon={Lock} label="Kata Sandi" type="password" placeholder="Min. 8 karakter" hint="Gunakan kombinasi huruf, angka, & simbol." />

                <label className="flex items-start gap-2 text-xs text-muted-foreground">
                  <input type="checkbox" defaultChecked className="mt-0.5 w-4 h-4 accent-primary" />
                  Saya setuju dengan{" "}
                  <a className="text-primary font-semibold hover:underline">Syarat Layanan</a>{" "}dan{" "}
                  <a className="text-primary font-semibold hover:underline">Kebijakan Privasi</a>.
                </label>

                <button type="submit" className="w-full bg-primary text-primary-foreground sketch-border-sm py-3 font-semibold hover:bg-primary/90"
                  style={{ boxShadow: "3px 3px 0 0 hsl(var(--foreground))" }}>
                  Lanjut → Pilih Peran
                </button>

                <p className="text-sm text-center text-muted-foreground">
                  Sudah punya akun?{" "}
                  <button type="button" onClick={() => setMode("login")} className="text-primary font-semibold hover:underline">
                    Masuk di sini
                  </button>
                </p>
              </form>
            )}

            {mode === "forgot" && (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h2 className="font-hand text-5xl mb-2">Reset Kata Sandi</h2>
                  <p className="text-sm text-muted-foreground">Kami kirimkan tautan reset ke emailmu.</p>
                </div>
                <Field icon={Mail} label="Email" type="email" placeholder="kamu@email.com" />
                <button type="submit" className="w-full bg-primary text-primary-foreground sketch-border-sm py-3 font-semibold hover:bg-primary/90"
                  style={{ boxShadow: "3px 3px 0 0 hsl(var(--foreground))" }}>
                  Kirim Tautan Reset
                </button>
                <button type="button" onClick={() => setMode("login")} className="w-full text-sm text-muted-foreground hover:text-foreground">
                  ← Kembali ke Masuk
                </button>
              </form>
            )}

            {mode === "role" && (
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">Langkah 2 dari 3</span>
                  <h2 className="font-hand text-5xl mt-1 mb-2">Kamu di sini sebagai...</h2>
                  <p className="text-sm text-muted-foreground">Pilih peran utama. Bisa diubah kapan saja.</p>
                </div>

                <RoleCard
                  selected={role === "buyer"}
                  onClick={() => pickRole("buyer")}
                  icon={ShoppingBag}
                  title="Sebagai Pembeli"
                  desc="Cari karya unik dari seniman lokal. Belanja, koleksi, dukung."
                  perks={["Kurasi karya pilihan tribe", "Diskon awal & subsidi ongkir", "Lacak pesanan real-time"]}
                />
                <RoleCard
                  selected={role === "creator"}
                  onClick={() => pickRole("creator")}
                  icon={Palette}
                  title="Sebagai Seniman"
                  desc="Upload sekali, jual ke 30+ produk otomatis. Tanpa stok."
                  perks={["Auto-Mockup ke puluhan produk", "Royalti hingga 30%", "Studio analitik & payout cepat"]}
                  highlight
                />

                <button onClick={() => setMode("register")} className="w-full text-sm text-muted-foreground hover:text-foreground">
                  ← Ubah data daftar
                </button>
              </div>
            )}

            {mode === "onboard-buyer" && (
              <OnboardBuyer onDone={() => navigate("/catalog")} />
            )}
            {mode === "onboard-creator" && (
              <OnboardCreator onDone={() => navigate("/creator")} />
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

/* ---------- helpers ---------- */

const Field = ({
  icon: Icon, label, type = "text", placeholder, trailing, hint,
}: { icon: any; label: string; type?: string; placeholder?: string; trailing?: React.ReactNode; hint?: string }) => (
  <label className="block">
    <span className="text-sm font-medium block mb-1.5">{label}</span>
    <div className="relative">
      <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={2.5} />
      <input
        type={type}
        placeholder={placeholder}
        className="w-full sketch-border-sm bg-card pl-10 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      />
      {trailing && <div className="absolute right-3 top-1/2 -translate-y-1/2">{trailing}</div>}
    </div>
    {hint && <p className="text-xs text-muted-foreground mt-1.5">{hint}</p>}
  </label>
);

const RoleCard = ({
  selected, onClick, icon: Icon, title, desc, perks, highlight,
}: { selected: boolean; onClick: () => void; icon: any; title: string; desc: string; perks: string[]; highlight?: boolean }) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-full text-left p-5 sketch-border bg-card transition relative ${selected ? "ring-2 ring-primary" : ""}`}
  >
    {highlight && (
      <span className="absolute -top-3 right-4 bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-wider px-2 py-1 sketch-border-sm">
        Populer
      </span>
    )}
    <div className="flex items-start gap-4">
      <div className={`w-12 h-12 sketch-border-sm flex items-center justify-center shrink-0 ${highlight ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"}`}>
        <Icon className="w-6 h-6" strokeWidth={2.5} />
      </div>
      <div className="flex-1">
        <h3 className="font-hand text-2xl leading-none">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1.5">{desc}</p>
        <ul className="mt-3 space-y-1">
          {perks.map(p => (
            <li key={p} className="flex items-center gap-2 text-xs">
              <Check className="w-3.5 h-3.5 text-primary" strokeWidth={3} /> {p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </button>
);

/* ---------- onboarding flows ---------- */

const OnboardBuyer = ({ onDone }: { onDone: () => void }) => {
  const [step, setStep] = useState(1);
  const tribes = ["Anime Lokal", "Receh Republic", "Tipografi Nasional", "Streetwear Kustom", "Botani & Alam", "Pop Culture"];
  const [picked, setPicked] = useState<string[]>([]);
  const toggle = (t: string) => setPicked(p => p.includes(t) ? p.filter(x => x !== t) : [...p, t]);

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-primary">Langkah 3 dari 3 · Pembeli</span>
        <h2 className="font-hand text-5xl mt-1 mb-2">
          {step === 1 ? "Pilih tribe favoritmu" : "Siap berburu karya!"}
        </h2>
        <p className="text-sm text-muted-foreground">
          {step === 1 ? "Minimal 2 tribe untuk personalisasi feed-mu." : "Kami sudah meraciknya khusus untukmu."}
        </p>
      </div>

      {step === 1 ? (
        <>
          <div className="flex flex-wrap gap-2">
            {tribes.map(t => (
              <button
                key={t}
                onClick={() => toggle(t)}
                className={`sketch-border-sm px-4 py-2 text-sm font-medium transition ${
                  picked.includes(t) ? "bg-primary text-primary-foreground" : "bg-card hover:bg-muted"
                }`}
              >
                {picked.includes(t) && <Check className="w-3.5 h-3.5 inline mr-1.5" strokeWidth={3} />}
                {t}
              </button>
            ))}
          </div>
          <button
            disabled={picked.length < 2}
            onClick={() => setStep(2)}
            className="w-full bg-primary text-primary-foreground sketch-border-sm py-3 font-semibold disabled:opacity-50"
            style={{ boxShadow: "3px 3px 0 0 hsl(var(--foreground))" }}
          >
            Lanjut ({picked.length}/2)
          </button>
        </>
      ) : (
        <>
          <div className="paper-card p-5 bg-accent/10">
            <Sparkles className="w-6 h-6 text-primary mb-2" strokeWidth={2.5} />
            <p className="font-hand text-2xl">Voucher selamat datang!</p>
            <p className="text-sm text-muted-foreground mt-1">
              Pakai kode <b className="text-foreground">INKKRAFT10</b> untuk diskon 10% pesanan pertamamu.
            </p>
          </div>
          <button onClick={onDone} className="w-full bg-primary text-primary-foreground sketch-border-sm py-3 font-semibold"
            style={{ boxShadow: "3px 3px 0 0 hsl(var(--foreground))" }}>
            Mulai Berburu →
          </button>
        </>
      )}
    </div>
  );
};

const OnboardCreator = ({ onDone }: { onDone: () => void }) => {
  const [step, setStep] = useState(1);
  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-primary">Langkah 3 dari 3 · Seniman</span>
        <h2 className="font-hand text-5xl mt-1 mb-2">
          {step === 1 ? "Profil studio kamu" : "Studio siap dibuka!"}
        </h2>
        <p className="text-sm text-muted-foreground">
          {step === 1 ? "Beri tahu pembeli sedikit tentang dirimu." : "Upload karya pertama dan biarkan auto-mockup bekerja."}
        </p>
      </div>

      {step === 1 ? (
        <>
          <Field icon={UserIcon} label="Nama studio / alias" placeholder="cth. Tinta Senja Studio" />
          <label className="block">
            <span className="text-sm font-medium block mb-1.5">Bio singkat</span>
            <textarea rows={3} placeholder="Aku suka menggambar pop-art tropis dengan sentuhan humor..."
              className="w-full sketch-border-sm bg-card p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
          </label>
          <label className="block">
            <span className="text-sm font-medium block mb-1.5">Tribe utamamu</span>
            <select className="w-full sketch-border-sm bg-card p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
              <option>Pilih tribe...</option>
              <option>Anime Lokal</option>
              <option>Receh Republic</option>
              <option>Tipografi Nasional</option>
              <option>Streetwear Kustom</option>
            </select>
          </label>
          <button onClick={() => setStep(2)} className="w-full bg-primary text-primary-foreground sketch-border-sm py-3 font-semibold"
            style={{ boxShadow: "3px 3px 0 0 hsl(var(--foreground))" }}>
            Lanjut →
          </button>
        </>
      ) : (
        <>
          <div className="paper-card p-5 bg-primary/5 space-y-3">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-primary" strokeWidth={3} />
              <p className="font-medium text-sm">Studio aktif dengan royalti default 25%</p>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-primary" strokeWidth={3} />
              <p className="font-medium text-sm">Auto-Mockup siap menerapkan ke 30+ produk</p>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-primary" strokeWidth={3} />
              <p className="font-medium text-sm">Payout otomatis tiap minggu (min. Rp 100.000)</p>
            </div>
          </div>
          <button onClick={onDone} className="w-full bg-primary text-primary-foreground sketch-border-sm py-3 font-semibold"
            style={{ boxShadow: "3px 3px 0 0 hsl(var(--foreground))" }}>
            Buka Studio →
          </button>
        </>
      )}
    </div>
  );
};

export default Auth;
