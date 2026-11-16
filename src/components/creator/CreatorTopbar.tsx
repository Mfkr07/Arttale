import { Bell, Search, Menu } from "lucide-react";
import { Link } from "react-router-dom";

const CreatorTopbar = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b-2 border-foreground">
    <div className="flex items-center gap-4 px-6 h-20">
      <button className="lg:hidden p-2">
        <Menu className="w-5 h-5" strokeWidth={2.5} />
      </button>
      <div className="flex-1 min-w-0">
        <h1 className="font-hand text-3xl leading-none truncate">{title}</h1>
        {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      <div className="hidden md:flex relative w-64">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" strokeWidth={2.5} />
        <input
          placeholder="Cari karya, order..."
          className="w-full sketch-border-sm bg-card pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <Link to="/creator/notifications" aria-label="Notifikasi" className="relative p-2 sketch-border-sm bg-card hover:bg-muted">
        <Bell className="w-4 h-4" strokeWidth={2.5} />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-background">
          3
        </span>
      </Link>
      <div className="flex items-center gap-2 sketch-border-sm bg-card pl-1 pr-3 py-1">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-foreground" />
        <div className="hidden sm:block">
          <div className="text-xs font-bold leading-tight">Studio Tinta</div>
          <div className="text-[10px] text-muted-foreground leading-tight">Verified ✓</div>
        </div>
      </div>
    </div>
  </header>
);

export default CreatorTopbar;
