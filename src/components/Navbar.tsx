import { Search, ShoppingBag, User, Menu, ChevronDown, LogOut, Package, Heart, Settings as SettingsIcon, LayoutDashboard, Bell, UserCircle2, LogIn, UserPlus, Shirt, ShoppingBasket, Home as HomeIcon, type LucideIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

type Subcat = { name: string; slug: string };
type Cat = { title: string; icon: LucideIcon; items: Subcat[] };

const PRODUCT_MENU: Cat[] = [
  {
    title: "Pakaian",
    icon: Shirt,
    items: [
      { name: "Kaos", slug: "Kaos" },
      { name: "Hoodie", slug: "Hoodie" },
      { name: "Topi", slug: "Topi" },
      { name: "Kaos Kaki", slug: "Kaos Kaki" },
    ],
  },
  {
    title: "Aksesoris",
    icon: ShoppingBasket,
    items: [
      { name: "Tote Bag", slug: "Tote Bag" },
      { name: "Stiker", slug: "Stiker" },
      { name: "Casing HP", slug: "Casing HP" },
      { name: "Gantungan Kunci", slug: "Gantungan Kunci" },
    ],
  },
  {
    title: "Perlengkapan Rumah",
    icon: HomeIcon,
    items: [
      { name: "Sarung Bantal", slug: "Sarung Bantal" },
      { name: "Mug", slug: "Mug" },
      { name: "Sarung Guling", slug: "Sarung Guling" },
    ],
  },
];

const Navbar = () => {
  const { count } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [produkOpen, setProdukOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const userRef = useRef<HTMLDivElement>(null);
  const closeT = useRef<number | null>(null);

  // Click outside for user dropdown
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const openProduk = () => {
    if (closeT.current) window.clearTimeout(closeT.current);
    setProdukOpen(true);
  };
  const scheduleClose = () => {
    if (closeT.current) window.clearTimeout(closeT.current);
    closeT.current = window.setTimeout(() => setProdukOpen(false), 120);
  };

  const handleLogout = () => {
    logout();
    setUserOpen(false);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b-2 border-foreground">
      <div className="container mx-auto px-4 h-16 md:h-20 flex items-center gap-3 md:gap-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="font-hand text-3xl md:text-4xl text-foreground leading-none">
            Ink<span className="text-primary">kraft</span>
          </span>
        </Link>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-xl mx-4">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground" strokeWidth={2.5} />
            <input
              type="text"
              placeholder="Cari kaos, stiker, atau seniman favoritmu..."
              className="w-full sketch-border-sm bg-card pl-12 pr-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Quick links */}
        <nav className="hidden md:flex items-center gap-5 text-sm font-medium">
          {/* Produk mega-menu */}
          <div
            className="relative"
            onMouseEnter={openProduk}
            onMouseLeave={scheduleClose}
          >
            <button
              className={`flex items-center gap-1 hover:text-primary transition py-2 ${produkOpen ? "text-primary" : ""}`}
              aria-expanded={produkOpen}
              aria-haspopup="true"
              onClick={() => setProdukOpen(o => !o)}
            >
              Produk
              <ChevronDown className={`w-4 h-4 transition-transform ${produkOpen ? "rotate-180" : ""}`} strokeWidth={2.5} />
            </button>
          </div>

          <Link to="/tribes" className="hover:text-primary transition">Tribes</Link>
          <Link to="/sell" className="hover:text-primary transition">Jual</Link>
          <Link to="/track" className="hover:text-primary transition">Lacak</Link>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2 md:gap-3 ml-auto">
          <Link to="/checkout" aria-label="Keranjang" className="relative p-2 hover:text-primary transition">
            <ShoppingBag className="w-5 h-5" strokeWidth={2.5} />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center border-2 border-background">
                {count}
              </span>
            )}
          </Link>

          {/* User dropdown */}
          <div className="relative" ref={userRef}>
            <button
              onClick={() => setUserOpen(o => !o)}
              aria-label="Akun"
              aria-expanded={userOpen}
              className="p-2 hover:text-primary transition flex items-center gap-1"
            >
              {user ? (
                <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground sketch-border-sm flex items-center justify-center text-xs font-bold uppercase">
                  {user.name.slice(0, 1)}
                </span>
              ) : (
                <User className="w-5 h-5" strokeWidth={2.5} />
              )}
            </button>

            {userOpen && (
              <div
                className="absolute right-0 mt-2 w-64 paper-card bg-card p-2 z-50"
                style={{ boxShadow: "4px 4px 0 0 hsl(var(--foreground))" }}
              >
                {user ? (
                  <>
                    <div className="px-3 py-3 border-b-2 border-foreground/15 mb-1">
                      <p className="font-hand text-xl leading-tight">Halo, {user.name}!</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                    <MenuItem to="/account" icon={UserCircle2} onClick={() => setUserOpen(false)}>Akun Saya</MenuItem>
                    <MenuItem to="/account/orders" icon={Package} onClick={() => setUserOpen(false)}>Pesanan</MenuItem>
                    <MenuItem to="/account/wishlist" icon={Heart} onClick={() => setUserOpen(false)}>Wishlist</MenuItem>
                    <MenuItem to="/account/notifications" icon={Bell} onClick={() => setUserOpen(false)}>Notifikasi</MenuItem>
                    <div className="my-1 h-px bg-border-soft" />
                    <MenuItem to="/creator" icon={LayoutDashboard} onClick={() => setUserOpen(false)}>Studio Kreator</MenuItem>
                    <MenuItem to="/account/preferences" icon={SettingsIcon} onClick={() => setUserOpen(false)}>Pengaturan</MenuItem>
                    <div className="my-1 h-px bg-border-soft" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-sm rounded hover:bg-destructive/10 text-destructive"
                    >
                      <LogOut className="w-4 h-4" strokeWidth={2.5} /> Keluar
                    </button>
                  </>
                ) : (
                  <>
                    <div className="px-3 py-3 border-b-2 border-foreground/15 mb-1">
                      <p className="font-hand text-xl leading-tight">Selamat datang!</p>
                      <p className="text-xs text-muted-foreground">Masuk untuk lanjut berkreasi & berbelanja.</p>
                    </div>
                    <Link
                      to="/auth?mode=login"
                      onClick={() => setUserOpen(false)}
                      className="block w-full text-center bg-primary text-primary-foreground sketch-border-sm py-2 text-sm font-semibold hover:bg-primary/90 mb-2 mt-1"
                      style={{ boxShadow: "2px 2px 0 0 hsl(var(--foreground))" }}
                    >
                      <span className="inline-flex items-center gap-1.5"><LogIn className="w-4 h-4" strokeWidth={2.5}/> Masuk</span>
                    </Link>
                    <Link
                      to="/auth?mode=register"
                      onClick={() => setUserOpen(false)}
                      className="block w-full text-center sketch-border-sm bg-card py-2 text-sm font-semibold hover:bg-muted"
                    >
                      <span className="inline-flex items-center gap-1.5"><UserPlus className="w-4 h-4" strokeWidth={2.5}/> Daftar Gratis</span>
                    </Link>
                    <div className="my-2 h-px bg-border-soft" />
                    <MenuItem to="/track" icon={Package} onClick={() => setUserOpen(false)}>Lacak Pesanan</MenuItem>
                    <MenuItem to="/help" icon={SettingsIcon} onClick={() => setUserOpen(false)}>Pusat Bantuan</MenuItem>
                  </>
                )}
              </div>
            )}
          </div>

          <Link
            to="/creator"
            className="hidden sm:inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 sketch-border-sm font-semibold text-sm hover:bg-primary/90"
            style={{ boxShadow: "2px 2px 0 0 hsl(var(--foreground))" }}
          >
            Jual Karyamu
          </Link>
          <button aria-label="Menu" className="md:hidden p-2" onClick={() => setMobileOpen(o => !o)}>
            <Menu className="w-6 h-6" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Mega menu — wide rectangular panel */}
      {produkOpen && (
        <div
          className="hidden md:block absolute left-0 right-0 top-full bg-card border-b-2 border-foreground shadow-xl"
          onMouseEnter={openProduk}
          onMouseLeave={scheduleClose}
        >
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-end justify-between mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Katalog Produk</span>
                <h3 className="font-hand text-3xl leading-none mt-1">Pilih kategori favoritmu</h3>
              </div>
              <Link
                to="/catalog"
                onClick={() => setProdukOpen(false)}
                className="text-sm font-semibold text-primary hover:underline flex items-center gap-1"
              >
                Lihat semua produk →
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {PRODUCT_MENU.map(cat => (
                <div key={cat.title} className="sketch-border-sm bg-background p-4">
                  <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-foreground/15">
                    <span className="w-8 h-8 sketch-border-sm bg-primary/10 flex items-center justify-center">
                      <cat.icon className="w-4 h-4 text-primary" strokeWidth={2.5} />
                    </span>
                    <h4 className="font-hand text-xl leading-none">{cat.title}</h4>
                  </div>
                  <ul className="space-y-1">
                    {cat.items.map(it => (
                      <li key={it.slug}>
                        <Link
                          to={`/catalog?cat=${encodeURIComponent(it.slug)}`}
                          onClick={() => setProdukOpen(false)}
                          className="flex items-center justify-between text-sm py-1.5 px-2 rounded hover:bg-primary/5 hover:text-primary transition group"
                        >
                          <span>{it.name}</span>
                          <span className="opacity-0 group-hover:opacity-100 transition text-primary">→</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile drawer (simple) */}
      {mobileOpen && (
        <div className="md:hidden border-t-2 border-foreground bg-card">
          <div className="p-4 space-y-1">
            {PRODUCT_MENU.map(cat => (
              <details key={cat.title} className="sketch-border-sm bg-background">
                <summary className="px-3 py-2 font-semibold text-sm cursor-pointer flex items-center gap-2">
                  <cat.icon className="w-4 h-4 text-primary" strokeWidth={2.5}/> {cat.title}
                </summary>
                <ul className="px-3 pb-2 space-y-1">
                  {cat.items.map(it => (
                    <li key={it.slug}>
                      <Link to={`/catalog?cat=${encodeURIComponent(it.slug)}`} onClick={() => setMobileOpen(false)} className="block py-1 text-sm hover:text-primary">
                        — {it.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
            <Link to="/tribes" onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-medium">Tribes</Link>
            <Link to="/sell" onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-medium">Jual Karyamu</Link>
            <Link to="/track" onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-medium">Lacak Pesanan</Link>
          </div>
        </div>
      )}
    </header>
  );
};

const MenuItem = ({ to, icon: Icon, children, onClick }: { to: string; icon: LucideIcon; children: React.ReactNode; onClick?: () => void }) => (
  <Link to={to} onClick={onClick} className="flex items-center gap-2.5 px-3 py-2 text-sm rounded hover:bg-muted transition">
    <Icon className="w-4 h-4 text-muted-foreground" strokeWidth={2.5} />
    {children}
  </Link>
);

export default Navbar;
