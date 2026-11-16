import { NavLink, Link } from "react-router-dom";
import { LayoutDashboard, UploadCloud, Palette, Wallet, BarChart3, Settings, MessageCircle, LogOut, Sparkles, Bell } from "lucide-react";

const items = [
  { to: "/creator", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/creator/upload", label: "Upload Studio", icon: UploadCloud, hot: true },
  { to: "/creator/designs", label: "Karya Saya", icon: Palette },
  { to: "/creator/earnings", label: "Pendapatan", icon: Wallet },
  { to: "/creator/analytics", label: "Analitik", icon: BarChart3 },
  { to: "/creator/notifications", label: "Notifikasi", icon: Bell },
  { to: "/creator/messages", label: "Pesan", icon: MessageCircle },
  { to: "/creator/settings", label: "Pengaturan", icon: Settings },
];

const CreatorSidebar = () => {
  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r-2 border-foreground bg-card sticky top-0 h-screen">
      <Link to="/" className="px-6 h-20 flex items-center border-b-2 border-foreground">
        <span className="font-hand text-3xl text-foreground leading-none">
          Ink<span className="text-primary">kraft</span>
        </span>
        <span className="ml-2 text-[10px] font-bold uppercase tracking-wider bg-foreground text-background px-1.5 py-0.5 rounded">
          Studio
        </span>
      </Link>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {items.map(({ to, label, icon: Icon, end, hot }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition border-2 ${
                isActive
                  ? "bg-primary/10 border-foreground text-foreground"
                  : "border-transparent hover:bg-muted hover:border-border-soft"
              }`
            }
          >
            <Icon className="w-4 h-4" strokeWidth={2.5} />
            <span className="flex-1">{label}</span>
            {hot && (
              <span className="text-[9px] font-bold uppercase bg-accent text-accent-foreground px-1.5 py-0.5 rounded">
                NEW
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t-2 border-foreground space-y-3">
        <div className="paper-card p-3 bg-primary/5">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-primary" strokeWidth={2.5} />
            <span className="font-hand text-lg leading-none">Tips Hari Ini</span>
          </div>
          <p className="text-xs text-muted-foreground leading-snug">
            Karya tipografi nasional naik <b className="text-foreground">+34%</b> minggu ini. Coba upload sekarang!
          </p>
        </div>
        <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition">
          <LogOut className="w-4 h-4" strokeWidth={2.5} />
          Keluar
        </button>
      </div>
    </aside>
  );
};

export default CreatorSidebar;
