import { useState } from "react";
import { toast } from "sonner";
import { Mail, Phone, MapPin, MessageCircle, Send, Instagram, Twitter } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Contact = () => {
  const [topic, setTopic] = useState("Pesanan");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Pesan terkirim! Tim kami balas <24 jam ke emailmu.");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="text-center mb-10">
          <span className="font-hand text-2xl text-primary">Sapa kami ✿</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-1">Hubungi Inkkraft</h1>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto">
            Punya kendala, kolaborasi, atau saran? Pilih cara yang paling nyaman.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <aside className="space-y-4 lg:col-span-1">
            <div className="paper-card p-5">
              <MessageCircle className="w-7 h-7 text-primary mb-2" />
              <h3 className="font-extrabold">Live Chat</h3>
              <p className="text-sm text-muted-foreground mt-1">Senin–Sabtu, 09.00–21.00 WIB</p>
              <button className="mt-3 w-full bg-foreground text-background sketch-border-sm py-2 font-bold text-sm">Mulai Chat</button>
            </div>
            <div className="paper-card p-5">
              <Mail className="w-7 h-7 text-primary mb-2" />
              <h3 className="font-extrabold">Email</h3>
              <a href="mailto:halo@inkkraft.id" className="text-sm hover:text-primary">halo@inkkraft.id</a>
              <p className="text-xs text-muted-foreground mt-1">Untuk kerjasama: kolab@inkkraft.id</p>
            </div>
            <div className="paper-card p-5">
              <Phone className="w-7 h-7 text-primary mb-2" />
              <h3 className="font-extrabold">WhatsApp</h3>
              <p className="text-sm">+62 812-3000-1234</p>
            </div>
            <div className="paper-card p-5">
              <MapPin className="w-7 h-7 text-primary mb-2" />
              <h3 className="font-extrabold">Studio</h3>
              <p className="text-sm text-muted-foreground leading-snug">Jl. Riau No. 18, Bandung 40115</p>
            </div>
            <div className="flex gap-2">
              <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex-1 sketch-border-sm bg-card p-3 flex items-center justify-center hover:bg-muted"><Instagram className="w-5 h-5" /></a>
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="flex-1 sketch-border-sm bg-card p-3 flex items-center justify-center hover:bg-muted"><Twitter className="w-5 h-5" /></a>
            </div>
          </aside>

          <form onSubmit={submit} className="paper-card p-6 md:p-8 lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-extrabold">Kirim pesan</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-sm font-bold">Nama</span>
                <input required className="mt-1 w-full sketch-border-sm bg-card px-3 py-2.5 text-sm" placeholder="Nama lengkap" />
              </label>
              <label className="block">
                <span className="text-sm font-bold">Email</span>
                <input required type="email" className="mt-1 w-full sketch-border-sm bg-card px-3 py-2.5 text-sm" placeholder="kamu@email.com" />
              </label>
            </div>
            <label className="block">
              <span className="text-sm font-bold">Topik</span>
              <div className="mt-1 flex flex-wrap gap-2">
                {["Pesanan", "Pembayaran", "Akun Seniman", "Kerjasama", "Lainnya"].map((t) => (
                  <button type="button" key={t} onClick={() => setTopic(t)}
                    className={`px-3 py-1.5 sketch-border-sm text-sm font-semibold ${topic === t ? "bg-primary text-primary-foreground" : "bg-card"}`}>
                    {t}
                  </button>
                ))}
              </div>
            </label>
            <label className="block">
              <span className="text-sm font-bold">Pesan</span>
              <textarea required rows={6} className="mt-1 w-full sketch-border-sm bg-card px-3 py-2.5 text-sm" placeholder="Ceritakan detailnya..." />
            </label>
            <button type="submit" className="bg-primary text-primary-foreground sketch-border-sm px-5 py-3 font-bold text-sm inline-flex items-center gap-2">
              <Send className="w-4 h-4" /> Kirim Pesan
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
