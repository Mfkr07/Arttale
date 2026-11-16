import { Shirt, Sticker, Coffee, Smartphone, ShoppingBag, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const items = [
  { icon: Shirt, label: "Kaos Hitam", color: "bg-foreground text-background", to: "/catalog?cat=Pakaian" },
  { icon: Sticker, label: "Stiker Keren", color: "bg-primary text-primary-foreground", to: "/catalog?cat=Stiker" },
  { icon: Smartphone, label: "Casing HP", color: "bg-card", to: "/catalog?cat=Aksesoris" },
  { icon: ShoppingBag, label: "Tote Bag", color: "bg-accent text-accent-foreground", to: "/catalog?cat=Aksesoris" },
  { icon: Coffee, label: "Mug", color: "bg-card", to: "/catalog?cat=Home%20%26%20Art" },
  { icon: BookOpen, label: "Art Print", color: "bg-card", to: "/catalog?cat=Home%20%26%20Art" },
];

const QuickAccess = () => {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex gap-4 md:gap-8 overflow-x-auto pb-4 scrollbar-hide justify-start md:justify-center">
        {items.map(({ icon: Icon, label, color, to }) => (
          <Link
            key={label}
            to={to}
            className="flex flex-col items-center gap-2 shrink-0 doodle-hover group"
          >
            <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full sketch-border flex items-center justify-center ${color}`}>
              <Icon className="w-7 h-7 md:w-9 md:h-9" strokeWidth={2.2} />
            </div>
            <span className="text-xs md:text-sm font-medium">{label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default QuickAccess;
