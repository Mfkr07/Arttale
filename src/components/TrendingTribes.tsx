import { Link } from "react-router-dom";

const tribes = [
  { name: "Anime Lokal", slug: "anime-lokal", count: "1.2k karya", emoji: "🎴", bg: "bg-pink-100" },
  { name: "Gamer Merch", slug: "gamer-merch", count: "890 karya", emoji: "🎮", bg: "bg-violet-100" },
  { name: "Indie Music", slug: "indie-music", count: "640 karya", emoji: "🎵", bg: "bg-amber-100" },
  { name: "Skena Kopi", slug: "skena-kopi", count: "420 karya", emoji: "☕", bg: "bg-stone-100" },
  { name: "Pecinta Alam", slug: "pecinta-alam", count: "780 karya", emoji: "🏕️", bg: "bg-emerald-100" },
  { name: "Receh Republic", slug: "receh-republic", count: "1.8k karya", emoji: "😂", bg: "bg-yellow-100" },
];

const TrendingTribes = () => {
  return (
    <section className="container mx-auto px-4 py-16 md:py-20">
      <div className="text-center mb-10">
        <span className="font-hand text-2xl text-primary">Temukan komunitasmu ⌒</span>
        <h2 className="text-3xl md:text-4xl font-extrabold mt-1">Trending Tribes</h2>
        <p className="text-muted-foreground mt-2 max-w-md mx-auto text-sm">
          Kurasi desain berdasarkan subkultur favoritmu.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {tribes.map((t, i) => (
          <Link
            key={t.name}
            to={`/tribes/${t.slug}`}
            className={`relative ${t.bg} sketch-border p-5 aspect-square flex flex-col items-center justify-center text-center doodle-hover overflow-hidden`}
            style={{ transform: `rotate(${(i % 2 === 0 ? -1.5 : 1.5)}deg)` }}
          >
            {/* doodle pattern */}
            <svg className="absolute inset-0 w-full h-full text-foreground/10 pointer-events-none" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="20" cy="20" r="3" />
              <circle cx="80" cy="30" r="2" />
              <path d="M10 80 Q 20 70, 30 80" strokeLinecap="round" />
              <path d="M70 70 L 80 80" strokeLinecap="round" />
              <circle cx="85" cy="85" r="4" strokeDasharray="2 2" />
            </svg>
            <span className="text-5xl mb-2 relative z-10">{t.emoji}</span>
            <h3 className="font-bold text-sm relative z-10">{t.name}</h3>
            <p className="text-xs text-muted-foreground mt-0.5 relative z-10">{t.count}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TrendingTribes;
