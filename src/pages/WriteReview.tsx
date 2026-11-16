import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Star, Upload, X, Camera, ArrowLeft, Gift } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const tags = ["Bahan adem", "Sablon rapi", "Sesuai gambar", "Pengiriman cepat", "Packaging gemas", "Ukuran pas", "Warna akurat", "Wangi"];

const WriteReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState("");
  const [picked, setPicked] = useState<string[]>([]);
  const [media, setMedia] = useState<string[]>([]);

  const togglePick = (t: string) => setPicked((p) => p.includes(t) ? p.filter(x => x !== t) : [...p, t]);
  const addMedia = () => setMedia((m) => [...m, ["📦", "👕", "📸", "🎁"][m.length % 4]]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) return toast.error("Pilih rating dulu ya");
    toast.success("Ulasan terkirim! Voucher diskon ongkir 10% sudah masuk akunmu.");
    setTimeout(() => navigate(id ? `/product/${id}` : "/catalog"), 800);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-10 max-w-3xl">
        <Link to={id ? `/product/${id}` : "/catalog"} className="inline-flex items-center gap-1.5 text-sm font-bold text-muted-foreground hover:text-foreground mb-5">
          <ArrowLeft className="w-4 h-4" /> Kembali
        </Link>

        <div className="text-center mb-8">
          <span className="font-hand text-2xl text-primary">Cerita pengalamanmu ✿</span>
          <h1 className="text-3xl md:text-4xl font-extrabold mt-1">Tulis Ulasan</h1>
          <p className="text-sm text-muted-foreground mt-2">Bantu seniman & pembeli lain dengan ulasan jujurmu.</p>
        </div>

        {/* Reward banner */}
        <div className="paper-card p-4 bg-accent/40 flex items-center gap-3 mb-6">
          <Gift className="w-7 h-7 text-foreground shrink-0" />
          <div className="text-sm">
            <p className="font-extrabold">Voucher diskon ongkir 10%</p>
            <p className="text-muted-foreground">Otomatis masuk akun setelah ulasan dipublikasi.</p>
          </div>
        </div>

        <form onSubmit={submit} className="paper-card p-6 md:p-8 space-y-6">
          {/* Product preview */}
          <div className="flex items-center gap-4 pb-5 border-b-2 border-dashed border-foreground/20">
            <div className="w-16 h-16 bg-primary-soft border-2 border-foreground rounded-lg flex items-center justify-center text-3xl">🐱</div>
            <div>
              <p className="font-extrabold text-sm">Cosmic Cat Vibes</p>
              <p className="text-xs text-muted-foreground">Kaos Premium · Hitam · Size L</p>
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-bold mb-2">Rating</label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} type="button" onClick={() => setRating(n)} onMouseEnter={() => setHover(n)} onMouseLeave={() => setHover(0)}>
                  <Star className={`w-9 h-9 transition ${(hover || rating) >= n ? "fill-accent text-accent" : "text-foreground/30"}`} strokeWidth={2} />
                </button>
              ))}
              <span className="ml-2 font-hand text-2xl text-muted-foreground">
                {(hover || rating) === 5 ? "Mantap!" : (hover || rating) === 4 ? "Bagus" : (hover || rating) === 3 ? "Lumayan" : (hover || rating) >= 1 ? "Hmm..." : ""}
              </span>
            </div>
          </div>

          {/* Tag chips */}
          <div>
            <label className="block text-sm font-bold mb-2">Apa yang kamu suka?</label>
            <div className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <button type="button" key={t} onClick={() => togglePick(t)}
                  className={`px-3 py-1.5 sketch-border-sm text-sm font-semibold ${picked.includes(t) ? "bg-primary text-primary-foreground" : "bg-card"}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Text */}
          <div>
            <label className="block text-sm font-bold mb-2">Ceritamu (opsional)</label>
            <textarea value={text} onChange={(e) => setText(e.target.value)} rows={5} maxLength={500}
              placeholder="Bagaimana bahannya? Sesuai ekspektasi? Cocok dipakai kapan?"
              className="w-full sketch-border-sm bg-card px-3 py-2.5 text-sm" />
            <p className="text-xs text-muted-foreground mt-1 text-right">{text.length}/500</p>
          </div>

          {/* Media */}
          <div>
            <label className="block text-sm font-bold mb-2">Foto / video (max 4)</label>
            <div className="grid grid-cols-4 gap-3">
              {media.map((m, i) => (
                <div key={i} className="relative aspect-square bg-pink-100 sketch-border-sm flex items-center justify-center text-4xl">
                  {m}
                  <button type="button" onClick={() => setMedia(media.filter((_, x) => x !== i))}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-foreground text-background rounded-full flex items-center justify-center">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              {media.length < 4 && (
                <button type="button" onClick={addMedia} className="aspect-square sketch-border-sm bg-card flex flex-col items-center justify-center gap-1 text-muted-foreground hover:bg-muted">
                  <Camera className="w-6 h-6" />
                  <span className="text-[10px] font-bold">Tambah</span>
                </button>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-2 inline-flex items-center gap-1"><Upload className="w-3 h-3" /> Video unboxing dapat <b>cashback Rp 15.000</b> ekstra.</p>
          </div>

          <div className="flex gap-3 pt-3 border-t-2 border-dashed border-foreground/20">
            <button type="button" onClick={() => navigate(-1)} className="flex-1 sketch-border-sm bg-card py-3 font-bold text-sm">Batal</button>
            <button type="submit" className="flex-[2] bg-primary text-primary-foreground sketch-border-sm py-3 font-bold text-sm">Kirim Ulasan</button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default WriteReview;
