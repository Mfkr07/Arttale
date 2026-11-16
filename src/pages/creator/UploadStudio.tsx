import { useState, useRef } from "react";
import {
  UploadCloud, Sparkles, Wand2, CheckCircle2, X, Image as ImageIcon,
  Shirt, Sticker, Coffee, BookOpen, Palette as PaletteIcon, Eye,
  Tag, DollarSign, Hash, FileText, Loader2, ArrowRight, RotateCw, Layers,
} from "lucide-react";
import CreatorSidebar from "@/components/creator/CreatorSidebar";
import CreatorTopbar from "@/components/creator/CreatorTopbar";

type Step = "upload" | "preview" | "configure" | "publish";

const productCategories = [
  { id: "tee", name: "T-Shirt", icon: Shirt, base: 95000, royalty: 35000, enabled: true },
  { id: "hoodie", name: "Hoodie", icon: Shirt, base: 245000, royalty: 70000, enabled: true },
  { id: "sweater", name: "Sweater", icon: Shirt, base: 195000, royalty: 55000, enabled: true },
  { id: "tote", name: "Tote Bag", icon: ShoppingBagIcon, base: 75000, royalty: 25000, enabled: true },
  { id: "sticker", name: "Sticker Pack", icon: Sticker, base: 25000, royalty: 10000, enabled: true },
  { id: "mug", name: "Mug", icon: Coffee, base: 65000, royalty: 20000, enabled: true },
  { id: "notebook", name: "Notebook", icon: BookOpen, base: 55000, royalty: 18000, enabled: false },
  { id: "poster", name: "Poster A3", icon: ImageIcon, base: 45000, royalty: 15000, enabled: true },
  { id: "phonecase", name: "Phone Case", icon: ImageIcon, base: 85000, royalty: 28000, enabled: false },
  { id: "cap", name: "Baseball Cap", icon: Shirt, base: 95000, royalty: 30000, enabled: false },
];

function ShoppingBagIcon(props: React.SVGProps<SVGSVGElement>) {
  return <Tag {...props} />;
}

const colorways = [
  { name: "Putih", hex: "#FFFFFF" },
  { name: "Hitam", hex: "#1a1a1a" },
  { name: "Krem", hex: "#F5E6D3" },
  { name: "Olive", hex: "#5C6B3D" },
  { name: "Maroon", hex: "#6B1F1F" },
];

const styles = ["Tipografi", "Minimalis", "Ilustrasi", "Vintage", "Parodi", "Streetwear"];

const UploadStudio = () => {
  const [step, setStep] = useState<Step>("upload");
  const [file, setFile] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [products, setProducts] = useState(productCategories);
  const [selectedColors, setSelectedColors] = useState(["Putih", "Hitam", "Krem"]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>(["Tipografi"]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [royaltyMultiplier, setRoyaltyMultiplier] = useState(1);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    setFileName(f.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      setFile(e.target?.result as string);
      setGenerating(true);
      setTimeout(() => {
        setGenerating(false);
        setStep("preview");
      }, 2200);
    };
    reader.readAsDataURL(f);
  };

  const enabledProducts = products.filter((p) => p.enabled);
  const totalEarnings = enabledProducts.reduce((sum, p) => sum + p.royalty * royaltyMultiplier, 0);

  const toggleProduct = (id: string) =>
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p)));

  const toggleColor = (c: string) =>
    setSelectedColors((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));

  const toggleStyle = (s: string) =>
    setSelectedStyles((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  return (
    <div className="min-h-screen flex bg-background">
      <CreatorSidebar />
      <main className="flex-1 min-w-0">
        <CreatorTopbar
          title="Universal Upload Studio"
          subtitle="Satu master file → puluhan produk siap jual"
        />

        {/* Stepper */}
        <div className="px-6 pt-6">
          <div className="paper-card p-4 flex items-center gap-3 overflow-x-auto">
            {[
              { id: "upload", label: "1. Upload Master File", icon: UploadCloud },
              { id: "preview", label: "2. Auto-Mockup Preview", icon: Eye },
              { id: "configure", label: "3. Konfigurasi Produk", icon: Layers },
              { id: "publish", label: "4. Publish", icon: Sparkles },
            ].map((s, i) => {
              const active = s.id === step;
              const done = ["upload", "preview", "configure", "publish"].indexOf(step) > i;
              return (
                <div key={s.id} className="flex items-center gap-3 shrink-0">
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 ${
                    active ? "border-foreground bg-primary text-primary-foreground" :
                    done ? "border-foreground bg-primary/15" : "border-border-soft text-muted-foreground"
                  }`}>
                    {done ? <CheckCircle2 className="w-4 h-4" strokeWidth={2.5} /> : <s.icon className="w-4 h-4" strokeWidth={2.5} />}
                    <span className="text-xs font-bold whitespace-nowrap">{s.label}</span>
                  </div>
                  {i < 3 && <div className="w-6 h-0.5 bg-foreground/20" />}
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-6">
          {/* STEP 1 — UPLOAD */}
          {step === "upload" && !generating && (
            <div className="grid lg:grid-cols-2 gap-6">
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                  const f = e.dataTransfer.files[0];
                  if (f) handleFile(f);
                }}
                onClick={() => inputRef.current?.click()}
                className={`sketch-dashed bg-card p-12 cursor-pointer transition-all flex flex-col items-center justify-center text-center min-h-[440px] ${
                  dragOver ? "bg-primary/10 scale-[1.01]" : "hover:bg-secondary/50"
                }`}
              >
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/png"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                />
                <div className="relative mb-6">
                  <div className="w-24 h-24 rounded-2xl bg-primary/15 border-2 border-foreground flex items-center justify-center">
                    <Wand2 className="w-12 h-12 text-primary" strokeWidth={2} />
                  </div>
                  <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-accent" />
                  <Sparkles className="absolute -bottom-1 -left-2 w-4 h-4 text-primary" />
                </div>
                <h3 className="font-hand text-3xl mb-2">Drop file PNG di sini</h3>
                <p className="text-sm text-muted-foreground mb-1">atau klik untuk pilih file</p>
                <p className="text-xs text-muted-foreground mb-6">PNG transparan • min 3000×3000px • max 25MB</p>
                <button className="bg-foreground text-background px-6 py-2.5 sketch-border-sm font-bold text-sm">
                  Pilih File
                </button>
              </div>

              <div className="space-y-4">
                <div className="paper-card p-5 bg-primary/5">
                  <div className="flex items-center gap-2 mb-3">
                    <Wand2 className="w-5 h-5 text-primary" strokeWidth={2.5} />
                    <h3 className="font-hand text-2xl leading-none">Cara Kerja Auto-Mockup</h3>
                  </div>
                  <ol className="space-y-3 text-sm">
                    {[
                      "Upload satu file PNG transparan dengan resolusi tinggi.",
                      "Sistem otomatis menerapkan ke 30+ template produk.",
                      "Tinjau hasilnya, sesuaikan posisi & warna fabric.",
                      "Publikasikan — fans bisa langsung beli.",
                    ].map((t, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="w-6 h-6 rounded-full bg-foreground text-background text-xs font-bold flex items-center justify-center shrink-0">
                          {i + 1}
                        </span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="paper-card p-5">
                  <h3 className="font-hand text-2xl leading-none mb-3">📋 Checklist Sebelum Upload</h3>
                  <ul className="space-y-2 text-sm">
                    {[
                      "Background sudah transparan",
                      "Resolusi minimum 3000×3000px (300 DPI)",
                      "Font sudah di-outline / rasterize",
                      "Karya original / punya hak komersial",
                    ].map((c, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0" strokeWidth={2.5} />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* GENERATING STATE */}
          {generating && (
            <div className="paper-card p-12 text-center min-h-[440px] flex flex-col items-center justify-center">
              <div className="relative mb-6">
                <div className="w-28 h-28 rounded-full border-2 border-dashed border-foreground animate-spin" />
                <Wand2 className="absolute inset-0 m-auto w-12 h-12 text-primary" strokeWidth={2} />
              </div>
              <h3 className="font-hand text-3xl mb-2">Menerapkan ke 30+ produk...</h3>
              <p className="text-sm text-muted-foreground mb-6">Estimasi 60 detik. Sambil ngopi dulu ☕</p>
              <div className="w-full max-w-md space-y-2">
                {["Memproses master file", "Generate mockup apparel", "Generate mockup aksesoris", "Optimasi resolusi"].map((s, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs">
                    {i < 2 ? <CheckCircle2 className="w-4 h-4 text-primary" /> : <Loader2 className="w-4 h-4 animate-spin text-primary" />}
                    <span className="flex-1 text-left">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2 — PREVIEW */}
          {step === "preview" && (
            <div className="space-y-6">
              <div className="paper-card p-5 bg-primary/5 flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg border-2 border-foreground bg-card overflow-hidden shrink-0">
                  {file && <img src={file} alt={fileName} className="w-full h-full object-contain" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" strokeWidth={2.5} />
                    <h3 className="font-hand text-2xl leading-none">Mockup berhasil dibuat!</h3>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 truncate">
                    {fileName} • Diterapkan ke <b>{enabledProducts.length} produk</b>
                  </p>
                </div>
                <button
                  onClick={() => { setFile(null); setStep("upload"); }}
                  className="px-3 py-2 sketch-border-sm bg-card text-xs font-bold flex items-center gap-1.5 hover:bg-secondary"
                >
                  <RotateCw className="w-3.5 h-3.5" /> Ganti
                </button>
              </div>

              {/* Mockup grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {enabledProducts.map((p) => (
                  <div key={p.id} className="paper-card overflow-hidden group">
                    <div className="aspect-square bg-gradient-to-br from-secondary to-muted relative flex items-center justify-center">
                      <p.icon className="w-20 h-20 text-foreground/15" strokeWidth={1.5} />
                      {file && (
                        <img
                          src={file}
                          alt={p.name}
                          className="absolute inset-0 m-auto w-1/2 h-1/2 object-contain"
                        />
                      )}
                      <span className="absolute top-2 left-2 text-[9px] font-bold uppercase bg-primary text-primary-foreground px-1.5 py-0.5 rounded">
                        Auto
                      </span>
                    </div>
                    <div className="p-3 border-t-2 border-foreground">
                      <div className="font-semibold text-sm">{p.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        Royalti <b className="text-primary">Rp {(p.royalty / 1000).toFixed(0)}k</b>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setStep("upload")}
                  className="px-5 py-2.5 sketch-border-sm bg-card font-bold text-sm hover:bg-secondary"
                >
                  Kembali
                </button>
                <button
                  onClick={() => setStep("configure")}
                  className="px-6 py-2.5 sketch-border-sm bg-primary text-primary-foreground font-bold text-sm flex items-center gap-2"
                >
                  Lanjut ke Konfigurasi <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 — CONFIGURE */}
          {step === "configure" && (
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Product toggles */}
                <div className="paper-card p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-hand text-2xl leading-none">Produk Aktif</h3>
                      <p className="text-xs text-muted-foreground mt-1">Pilih produk yang akan dijual</p>
                    </div>
                    <span className="text-xs font-bold bg-primary/15 px-2 py-1 rounded">
                      {enabledProducts.length} aktif
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {products.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => toggleProduct(p.id)}
                        className={`flex items-center gap-2 p-3 rounded-lg border-2 transition text-left ${
                          p.enabled
                            ? "border-foreground bg-primary/10"
                            : "border-border-soft bg-card opacity-60 hover:opacity-100"
                        }`}
                      >
                        <p.icon className="w-4 h-4 shrink-0" strokeWidth={2.5} />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold truncate">{p.name}</div>
                          <div className="text-[10px] text-muted-foreground">+Rp {(p.royalty / 1000).toFixed(0)}k</div>
                        </div>
                        {p.enabled && <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Colorways */}
                <div className="paper-card p-5">
                  <h3 className="font-hand text-2xl leading-none mb-1">Pilihan Warna Fabric</h3>
                  <p className="text-xs text-muted-foreground mb-4">Berlaku untuk apparel</p>
                  <div className="flex flex-wrap gap-3">
                    {colorways.map((c) => {
                      const active = selectedColors.includes(c.name);
                      return (
                        <button
                          key={c.name}
                          onClick={() => toggleColor(c.name)}
                          className={`flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border-2 transition ${
                            active ? "border-foreground bg-primary/10" : "border-border-soft hover:border-foreground"
                          }`}
                        >
                          <span
                            className="w-7 h-7 rounded-full border-2 border-foreground"
                            style={{ background: c.hex }}
                          />
                          <span className="text-xs font-semibold">{c.name}</span>
                          {active && <CheckCircle2 className="w-3.5 h-3.5 text-primary" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Metadata */}
                <div className="paper-card p-5 space-y-4">
                  <h3 className="font-hand text-2xl leading-none">Detail Karya</h3>
                  <div>
                    <label className="text-xs font-bold flex items-center gap-1.5 mb-1.5">
                      <FileText className="w-3.5 h-3.5" /> Judul Karya
                    </label>
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Contoh: Sunset Brutalist"
                      className="w-full sketch-border-sm bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold flex items-center gap-1.5 mb-1.5">
                      <FileText className="w-3.5 h-3.5" /> Cerita di Balik Karya
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                      placeholder="Inspirasi, makna, atau proses kreatifmu..."
                      className="w-full sketch-border-sm bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold flex items-center gap-1.5 mb-1.5">
                      <Hash className="w-3.5 h-3.5" /> Tag (pisahkan dengan koma)
                    </label>
                    <input
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      placeholder="streetwear, jakarta, vintage"
                      className="w-full sketch-border-sm bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold flex items-center gap-1.5 mb-2">
                      <PaletteIcon className="w-3.5 h-3.5" /> Style / Tribe
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {styles.map((s) => {
                        const active = selectedStyles.includes(s);
                        return (
                          <button
                            key={s}
                            onClick={() => toggleStyle(s)}
                            className={`text-xs px-3 py-1.5 rounded-full border-2 transition ${
                              active
                                ? "bg-foreground text-background border-foreground"
                                : "border-border-soft hover:border-foreground"
                            }`}
                          >
                            {s}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Royalty + Summary */}
              <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
                <div className="paper-card p-5 bg-accent/10">
                  <div className="flex items-center gap-2 mb-3">
                    <DollarSign className="w-5 h-5 text-primary" strokeWidth={2.5} />
                    <h3 className="font-hand text-2xl leading-none">Royalti Kamu</h3>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    Atur multiplier royalti per produk. Default = harga rekomendasi marketplace.
                  </p>
                  <div className="space-y-2 mb-4">
                    {[
                      { v: 0.8, label: "Hemat (lebih banyak penjualan)" },
                      { v: 1, label: "Standar (rekomendasi)" },
                      { v: 1.3, label: "Premium (margin lebih besar)" },
                    ].map((opt) => (
                      <button
                        key={opt.v}
                        onClick={() => setRoyaltyMultiplier(opt.v)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg border-2 transition text-left ${
                          royaltyMultiplier === opt.v
                            ? "border-foreground bg-card"
                            : "border-border-soft bg-card/50 hover:border-foreground"
                        }`}
                      >
                        <div>
                          <div className="text-xs font-bold">×{opt.v}</div>
                          <div className="text-[10px] text-muted-foreground">{opt.label}</div>
                        </div>
                        {royaltyMultiplier === opt.v && <CheckCircle2 className="w-4 h-4 text-primary" />}
                      </button>
                    ))}
                  </div>
                  <div className="border-t-2 border-dashed border-foreground/30 pt-3">
                    <div className="text-[11px] text-muted-foreground">Estimasi royalti per 1 set terjual</div>
                    <div className="font-hand text-4xl text-primary leading-none mt-1">
                      Rp {(totalEarnings / 1000).toFixed(0)}k
                    </div>
                  </div>
                </div>

                <div className="paper-card p-5">
                  <h3 className="font-hand text-2xl leading-none mb-3">Ringkasan</h3>
                  <ul className="space-y-2 text-xs">
                    <li className="flex justify-between"><span className="text-muted-foreground">Produk aktif</span><b>{enabledProducts.length}</b></li>
                    <li className="flex justify-between"><span className="text-muted-foreground">Variasi warna</span><b>{selectedColors.length}</b></li>
                    <li className="flex justify-between"><span className="text-muted-foreground">Tribe</span><b>{selectedStyles.length || "—"}</b></li>
                    <li className="flex justify-between"><span className="text-muted-foreground">Total SKU</span><b>{enabledProducts.length * Math.max(selectedColors.length, 1)}</b></li>
                  </ul>
                </div>

                <button
                  onClick={() => setStep("publish")}
                  disabled={!title || enabledProducts.length === 0}
                  className="w-full px-6 py-3 sketch-border-sm bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Sparkles className="w-4 h-4" /> Kirim untuk Review
                </button>
                <p className="text-[10px] text-center text-muted-foreground -mt-2">
                  Karya direview admin dalam 1-2 jam kerja
                </p>
              </div>
            </div>
          )}

          {/* STEP 4 — PUBLISH SUCCESS */}
          {step === "publish" && (
            <div className="paper-card p-10 max-w-xl mx-auto text-center">
              <div className="w-20 h-20 rounded-full bg-primary/15 border-2 border-foreground mx-auto flex items-center justify-center mb-4">
                <CheckCircle2 className="w-10 h-10 text-primary" strokeWidth={2.5} />
              </div>
              <h2 className="font-hand text-4xl mb-2">Terkirim! 🎉</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Karya <b className="text-foreground">"{title || "Untitled"}"</b> sudah masuk antrian review.
                Kamu akan dapat notifikasi saat sudah live.
              </p>
              <div className="paper-card p-4 bg-secondary text-left text-xs space-y-2 mb-6">
                <div className="flex justify-between"><span className="text-muted-foreground">ID Submission</span><b className="font-mono">SUB-{Date.now().toString().slice(-6)}</b></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Estimasi review</span><b>1-2 jam kerja</b></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Produk siap jual</span><b>{enabledProducts.length} item</b></div>
              </div>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => {
                    setStep("upload"); setFile(null); setTitle(""); setDescription(""); setTags("");
                  }}
                  className="px-5 py-2.5 sketch-border-sm bg-card font-bold text-sm hover:bg-secondary"
                >
                  Upload Lagi
                </button>
                <a
                  href="/creator"
                  className="px-5 py-2.5 sketch-border-sm bg-primary text-primary-foreground font-bold text-sm"
                >
                  Ke Dashboard
                </a>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default UploadStudio;
