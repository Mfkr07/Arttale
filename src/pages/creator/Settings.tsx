import { useState } from "react";
import CreatorSidebar from "@/components/creator/CreatorSidebar";
import CreatorTopbar from "@/components/creator/CreatorTopbar";
import {
  User, CreditCard, Percent, Bell, Shield, Globe, Palette, Trash2,
  CheckCircle2, AlertCircle, Plus, Eye, EyeOff, Mail, Smartphone, MessageSquare,
  Upload, Save
} from "lucide-react";

type SectionId = "profile" | "payout" | "royalty" | "notifications" | "security" | "branding";

const sections: { id: SectionId; label: string; icon: typeof User; desc: string }[] = [
  { id: "profile", label: "Profil Studio", icon: User, desc: "Nama tampil, bio, link sosial" },
  { id: "payout", label: "Rekening Bank", icon: CreditCard, desc: "Tujuan transfer royalti" },
  { id: "royalty", label: "Royalti Default", icon: Percent, desc: "Bagi hasil per produk" },
  { id: "notifications", label: "Notifikasi", icon: Bell, desc: "Email, push, WhatsApp" },
  { id: "security", label: "Keamanan", icon: Shield, desc: "Password, 2FA, sesi" },
  { id: "branding", label: "Tampilan Toko", icon: Palette, desc: "Cover, warna, layout" },
];

const Toggle = ({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label?: string }) => (
  <button
    onClick={() => onChange(!checked)}
    aria-label={label}
    className={`w-11 h-6 rounded-full border-2 border-foreground transition relative shrink-0 ${
      checked ? "bg-primary" : "bg-muted"
    }`}
  >
    <span className={`absolute top-0.5 w-4 h-4 bg-card border-2 border-foreground rounded-full transition ${checked ? "left-5" : "left-0.5"}`} />
  </button>
);

const Field = ({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) => (
  <div>
    <label className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-1.5 block">{label}</label>
    {children}
    {hint && <p className="text-xs text-muted-foreground mt-1.5">{hint}</p>}
  </div>
);

const inputClass = "w-full sketch-border-sm bg-card px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary";

const Settings = () => {
  const [active, setActive] = useState<SectionId>("profile");
  const [saving, setSaving] = useState(false);
  const [showAccount, setShowAccount] = useState(false);

  const [royalty, setRoyalty] = useState({ tshirt: 25, hoodie: 22, sticker: 35, mug: 28 });
  const [notif, setNotif] = useState({
    emailOrder: true, emailPayout: true, emailMarketing: false,
    pushOrder: true, pushChat: true, pushFollow: false,
    waOrder: true, waPayout: false,
  });
  const [twoFA, setTwoFA] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1200);
  };

  return (
    <div className="min-h-screen flex bg-background">
      <CreatorSidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <CreatorTopbar title="Pengaturan" subtitle="Atur profil, rekening, royalti, dan preferensi notifikasi" />

        <main className="flex-1 px-4 md:px-6 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 max-w-6xl mx-auto">
            {/* Section nav */}
            <nav className="paper-card p-3 h-fit lg:sticky lg:top-24 self-start">
              <div className="space-y-1">
                {sections.map((s) => {
                  const Icon = s.icon;
                  const isActive = active === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setActive(s.id)}
                      className={`w-full flex items-start gap-3 p-3 rounded-lg text-left border-2 transition ${
                        isActive ? "bg-primary/10 border-foreground" : "border-transparent hover:bg-muted"
                      }`}
                    >
                      <Icon className="w-4 h-4 mt-0.5 shrink-0" strokeWidth={2.5} />
                      <div className="min-w-0">
                        <div className="text-sm font-bold leading-tight">{s.label}</div>
                        <div className="text-[11px] text-muted-foreground leading-tight mt-0.5">{s.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </nav>

            {/* Section content */}
            <div className="space-y-5">
              {active === "profile" && (
                <div className="paper-card p-6 space-y-5">
                  <header className="border-b-2 border-dashed border-border-soft pb-4">
                    <h2 className="font-hand text-3xl">Profil Studio</h2>
                    <p className="text-sm text-muted-foreground">Informasi yang muncul di storefront publik kamu.</p>
                  </header>

                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-foreground shadow-[3px_3px_0_0_hsl(var(--foreground))] flex items-center justify-center font-hand text-3xl text-background">ST</div>
                    <div>
                      <button className="sketch-border-sm bg-card px-3 py-2 text-xs font-bold flex items-center gap-2 hover:bg-muted">
                        <Upload className="w-3.5 h-3.5" strokeWidth={2.5} /> Ganti foto
                      </button>
                      <p className="text-[11px] text-muted-foreground mt-1.5">PNG/JPG, min. 400x400</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Nama Studio">
                      <input className={inputClass} defaultValue="Studio Tinta" />
                    </Field>
                    <Field label="Username" hint="inkkraft.id/@username">
                      <input className={inputClass} defaultValue="studiotinta" />
                    </Field>
                  </div>

                  <Field label="Bio singkat" hint="Maks 160 karakter">
                    <textarea className={inputClass} rows={3} defaultValue="Bikin desain dari ngopi sambil dengerin lagu indie. Karya kami menceritakan Indonesia." />
                  </Field>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Lokasi"><input className={inputClass} defaultValue="Yogyakarta, ID" /></Field>
                    <Field label="Website"><input className={inputClass} defaultValue="studiotinta.id" /></Field>
                  </div>
                </div>
              )}

              {active === "payout" && (
                <div className="paper-card p-6 space-y-5">
                  <header className="border-b-2 border-dashed border-border-soft pb-4">
                    <h2 className="font-hand text-3xl">Rekening Bank</h2>
                    <p className="text-sm text-muted-foreground">Royalti akan ditransfer ke rekening utama tiap pencairan.</p>
                  </header>

                  <div className="sketch-border-sm bg-primary/5 p-4 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" strokeWidth={2.5} />
                    <div className="text-sm">
                      <b>Rekening terverifikasi.</b> Pencairan berikutnya: <b>2 Mei 2026</b> · Saldo siap: <b>Rp4.825.000</b>
                    </div>
                  </div>

                  {/* Active account */}
                  <div className="sketch-border-sm bg-card p-4">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-md bg-foreground text-background flex items-center justify-center font-bold text-xs">BCA</div>
                        <div>
                          <div className="font-bold">Bank Central Asia</div>
                          <div className="text-xs text-muted-foreground">a.n. Rama Pratama Wibowo</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold uppercase bg-primary text-primary-foreground px-2 py-0.5 rounded">Utama</span>
                    </div>
                    <div className="flex items-center justify-between border-t-2 border-dashed border-border-soft pt-3">
                      <code className="text-sm font-mono">{showAccount ? "8765 4321 098" : "•••• •••• 098"}</code>
                      <button onClick={() => setShowAccount(!showAccount)} className="text-xs flex items-center gap-1 hover:underline">
                        {showAccount ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        {showAccount ? "Sembunyikan" : "Lihat"}
                      </button>
                    </div>
                  </div>

                  <button className="w-full sketch-dashed py-4 text-sm font-bold flex items-center justify-center gap-2 hover:bg-muted/50 transition">
                    <Plus className="w-4 h-4" strokeWidth={2.5} /> Tambah rekening cadangan
                  </button>

                  <Field label="NPWP (opsional)" hint="Untuk pengurangan PPh otomatis 0.5%">
                    <input className={inputClass} placeholder="00.000.000.0-000.000" />
                  </Field>
                </div>
              )}

              {active === "royalty" && (
                <div className="paper-card p-6 space-y-5">
                  <header className="border-b-2 border-dashed border-border-soft pb-4">
                    <h2 className="font-hand text-3xl">Royalti Default</h2>
                    <p className="text-sm text-muted-foreground">Persentase yang kamu terima per item terjual. Bisa di-override per karya.</p>
                  </header>

                  <div className="sketch-border-sm bg-accent/10 p-3 flex items-start gap-2 text-xs">
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" strokeWidth={2.5} />
                    <span>Royalti minimum <b>15%</b>, maksimum <b>40%</b>. Sisanya untuk biaya produksi, packaging, & pengiriman.</span>
                  </div>

                  <div className="space-y-4">
                    {[
                      { key: "tshirt" as const, label: "T-Shirt", base: 95000 },
                      { key: "hoodie" as const, label: "Hoodie", base: 245000 },
                      { key: "sticker" as const, label: "Sticker Pack", base: 35000 },
                      { key: "mug" as const, label: "Mug", base: 65000 },
                    ].map((p) => {
                      const earn = Math.round((p.base * royalty[p.key]) / 100);
                      return (
                        <div key={p.key} className="sketch-border-sm bg-card p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <div className="font-bold text-sm">{p.label}</div>
                              <div className="text-xs text-muted-foreground">Harga jual Rp{p.base.toLocaleString("id-ID")}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-lg text-primary">{royalty[p.key]}%</div>
                              <div className="text-[11px] text-muted-foreground">≈ Rp{earn.toLocaleString("id-ID")}/item</div>
                            </div>
                          </div>
                          <input
                            type="range" min={15} max={40}
                            value={royalty[p.key]}
                            onChange={(e) => setRoyalty({ ...royalty, [p.key]: +e.target.value })}
                            className="w-full accent-primary"
                          />
                          <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                            <span>15%</span><span>40%</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {active === "notifications" && (
                <div className="paper-card p-6 space-y-5">
                  <header className="border-b-2 border-dashed border-border-soft pb-4">
                    <h2 className="font-hand text-3xl">Saluran Notifikasi</h2>
                    <p className="text-sm text-muted-foreground">Pilih bagaimana Inkkraft menghubungimu.</p>
                  </header>

                  {[
                    {
                      icon: Mail, title: "Email", channel: "rama@studiotinta.id",
                      items: [
                        { key: "emailOrder", label: "Pesanan baru & status produksi" },
                        { key: "emailPayout", label: "Pencairan & laporan keuangan" },
                        { key: "emailMarketing", label: "Tips & promo Inkkraft" },
                      ]
                    },
                    {
                      icon: Smartphone, title: "Push notification", channel: "iPhone 14 · Pixel 7",
                      items: [
                        { key: "pushOrder", label: "Pesanan masuk" },
                        { key: "pushChat", label: "Chat dari pembeli" },
                        { key: "pushFollow", label: "Pengikut & like baru" },
                      ]
                    },
                    {
                      icon: MessageSquare, title: "WhatsApp", channel: "+62 812-3456-7890",
                      items: [
                        { key: "waOrder", label: "Notifikasi pesanan urgent" },
                        { key: "waPayout", label: "Konfirmasi pencairan" },
                      ]
                    },
                  ].map((ch) => {
                    const Icon = ch.icon;
                    return (
                      <div key={ch.title} className="sketch-border-sm bg-card p-4">
                        <div className="flex items-center gap-3 mb-3 pb-3 border-b-2 border-dashed border-border-soft">
                          <div className="w-9 h-9 sketch-border-sm bg-primary/10 flex items-center justify-center">
                            <Icon className="w-4 h-4" strokeWidth={2.5} />
                          </div>
                          <div className="flex-1">
                            <div className="font-bold text-sm">{ch.title}</div>
                            <div className="text-xs text-muted-foreground">{ch.channel}</div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          {ch.items.map((it) => (
                            <label key={it.key} className="flex items-center justify-between gap-3 cursor-pointer">
                              <span className="text-sm">{it.label}</span>
                              <Toggle
                                checked={notif[it.key as keyof typeof notif]}
                                onChange={(v) => setNotif({ ...notif, [it.key]: v })}
                                label={it.label}
                              />
                            </label>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {active === "security" && (
                <div className="paper-card p-6 space-y-5">
                  <header className="border-b-2 border-dashed border-border-soft pb-4">
                    <h2 className="font-hand text-3xl">Keamanan Akun</h2>
                    <p className="text-sm text-muted-foreground">Lindungi studio dari akses tidak sah.</p>
                  </header>

                  <div className="sketch-border-sm bg-card p-4">
                    <div className="font-bold text-sm mb-3">Ganti password</div>
                    <div className="space-y-3">
                      <input type="password" className={inputClass} placeholder="Password lama" />
                      <input type="password" className={inputClass} placeholder="Password baru" />
                      <input type="password" className={inputClass} placeholder="Konfirmasi password baru" />
                    </div>
                  </div>

                  <div className="sketch-border-sm bg-card p-4 flex items-center justify-between gap-4">
                    <div>
                      <div className="font-bold text-sm flex items-center gap-2">
                        Two-Factor Authentication
                        {twoFA && <span className="text-[10px] font-bold uppercase bg-primary text-primary-foreground px-1.5 py-0.5 rounded">Aktif</span>}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Tambah kode dari aplikasi authenticator saat login.</p>
                    </div>
                    <Toggle checked={twoFA} onChange={setTwoFA} label="2FA" />
                  </div>

                  <div className="sketch-border-sm bg-card p-4">
                    <div className="font-bold text-sm mb-3">Sesi aktif</div>
                    <div className="space-y-2">
                      {[
                        { device: "MacBook Pro · Chrome", loc: "Yogyakarta · Sekarang", current: true },
                        { device: "iPhone 14 · Inkkraft App", loc: "Yogyakarta · 2 jam lalu" },
                      ].map((s, i) => (
                        <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-border-soft last:border-0">
                          <div>
                            <div className="font-medium">{s.device} {s.current && <span className="text-[10px] text-primary font-bold ml-1">SAAT INI</span>}</div>
                            <div className="text-xs text-muted-foreground">{s.loc}</div>
                          </div>
                          {!s.current && <button className="text-xs text-destructive font-bold hover:underline">Keluar</button>}
                        </div>
                      ))}
                    </div>
                  </div>

                  <button className="w-full sketch-border-sm bg-destructive/5 text-destructive p-4 text-sm font-bold flex items-center justify-center gap-2 hover:bg-destructive/10">
                    <Trash2 className="w-4 h-4" strokeWidth={2.5} /> Hapus akun studio
                  </button>
                </div>
              )}

              {active === "branding" && (
                <div className="paper-card p-6 space-y-5">
                  <header className="border-b-2 border-dashed border-border-soft pb-4">
                    <h2 className="font-hand text-3xl">Tampilan Toko</h2>
                    <p className="text-sm text-muted-foreground">Sesuaikan kesan visual storefront publik kamu.</p>
                  </header>

                  <Field label="Cover storefront">
                    <div className="sketch-dashed h-32 flex items-center justify-center bg-gradient-to-br from-primary/30 to-accent/20 cursor-pointer hover:bg-muted/30 transition">
                      <div className="text-center">
                        <Upload className="w-5 h-5 mx-auto mb-1" strokeWidth={2.5} />
                        <div className="text-xs font-bold">Upload cover (1920x480)</div>
                      </div>
                    </div>
                  </Field>

                  <Field label="Warna aksen">
                    <div className="flex gap-2">
                      {["bg-primary", "bg-accent", "bg-destructive", "bg-emerald-500", "bg-sky-500", "bg-pink-500"].map((c, i) => (
                        <button key={c} aria-label={`Warna ${i + 1}`} className={`w-9 h-9 rounded-full ${c} border-2 border-foreground ${i === 0 ? "ring-2 ring-foreground ring-offset-2" : ""}`} />
                      ))}
                    </div>
                  </Field>

                  <Field label="Layout grid karya">
                    <div className="grid grid-cols-3 gap-2">
                      {["Padat", "Standar", "Lega"].map((l, i) => (
                        <button key={l} className={`sketch-border-sm py-3 text-sm font-bold ${i === 1 ? "bg-foreground text-background" : "bg-card hover:bg-muted"}`}>
                          {l}
                        </button>
                      ))}
                    </div>
                  </Field>

                  <div className="sketch-border-sm bg-card p-4 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm flex items-center gap-2"><Globe className="w-4 h-4" strokeWidth={2.5} /> Storefront publik</div>
                      <p className="text-xs text-muted-foreground mt-1">Tampilkan toko kamu di pencarian Inkkraft.</p>
                    </div>
                    <Toggle checked={true} onChange={() => {}} label="Public" />
                  </div>
                </div>
              )}

              {/* Save bar */}
              <div className="sticky bottom-4 paper-card p-3 flex items-center justify-between gap-3 bg-card/95 backdrop-blur">
                <p className="text-xs text-muted-foreground">Perubahan disimpan otomatis ke draft.</p>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="sketch-border-sm bg-foreground text-background px-5 py-2 text-sm font-bold flex items-center gap-2 disabled:opacity-60"
                >
                  {saving ? <>Menyimpan...</> : <><Save className="w-4 h-4" strokeWidth={2.5} /> Simpan perubahan</>}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
