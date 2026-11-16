import { Link } from "react-router-dom";

type FootLink = { label: string; to: string };
type FootCol = { title: string; links: FootLink[] };

const Footer = () => {
  const cols: FootCol[] = [
    {
      title: "Belanja",
      links: [
        { label: "Pakaian", to: "/catalog?cat=Pakaian" },
        { label: "Stiker", to: "/catalog?cat=Stiker" },
        { label: "Aksesoris", to: "/catalog?cat=Aksesoris" },
        { label: "Home & Art", to: "/catalog?cat=Home%20%26%20Art" },
        { label: "Lacak Pesanan", to: "/track" },
      ],
    },
    {
      title: "Untuk Seniman",
      links: [
        { label: "Mulai Jualan", to: "/sell" },
        { label: "FAQ Kreator", to: "/help" },
        { label: "Royalti & Tip", to: "/sell" },
        { label: "Dashboard Studio", to: "/creator" },
      ],
    },
    {
      title: "Bantuan",
      links: [
        { label: "FAQ", to: "/help" },
        { label: "Kebijakan Retur", to: "/help" },
        { label: "Syarat & Ketentuan", to: "/help" },
        { label: "Hubungi Kami", to: "/contact" },
      ],
    },
  ];

  return (
    <footer className="border-t-2 border-foreground bg-card mt-10">
      <div className="container mx-auto px-4 py-14">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          <div>
            <h3 className="font-hand text-4xl mb-3">
              Ink<span className="text-primary">kraft</span>
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Rumah bagi seniman lokal. Dibangun oleh orang yang ngerti seni.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="font-bold text-sm mb-4 uppercase tracking-wide">{c.title}</h4>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                {c.links.map((l) => (
                  <li key={l.label}><Link to={l.to} className="hover:text-primary transition">{l.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t-2 border-dashed border-foreground/20 pt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Inkkraft. Dibikin pakai ❤ di Indonesia.</p>
          <div className="flex items-center gap-4">
            <span>Pembayaran:</span>
            <div className="flex items-center gap-2 font-semibold">
              <span className="px-2 py-1 sketch-border-sm bg-card text-foreground">QRIS</span>
              <span className="px-2 py-1 sketch-border-sm bg-card text-foreground">GoPay</span>
              <span className="px-2 py-1 sketch-border-sm bg-card text-foreground">VA</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
