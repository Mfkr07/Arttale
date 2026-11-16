import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Wallet, TrendingUp, Download, Calendar, Filter, ArrowDownToLine, Info,
  CheckCircle2, Clock, AlertCircle, Banknote, CreditCard, Landmark, Sparkles,
  ArrowUpRight, ChevronDown, Search,
} from "lucide-react";
import CreatorSidebar from "@/components/creator/CreatorSidebar";
import CreatorTopbar from "@/components/creator/CreatorTopbar";

const fmt = (n: number) => "Rp " + n.toLocaleString("id-ID");

const monthly = [
  { m: "Sep", v: 1.2 }, { m: "Okt", v: 2.1 }, { m: "Nov", v: 1.8 },
  { m: "Des", v: 3.4 }, { m: "Jan", v: 2.9 }, { m: "Feb", v: 4.2 },
  { m: "Mar", v: 5.1 }, { m: "Apr", v: 6.3 },
];

const breakdown = [
  { label: "Royalti penjualan produk", value: 4_870_000, color: "bg-primary" },
  { label: "Tip dari pembeli", value: 920_000, color: "bg-accent" },
  { label: "Bonus tribe juara", value: 350_000, color: "bg-foreground" },
  { label: "Reward video review", value: 160_000, color: "bg-primary/40" },
];

const transactions = [
  { id: "TRX-2041", date: "24 Apr 2026", type: "Penjualan", item: "Kaos Pop Tropis · Rara", amount: 38_500, status: "settled" },
  { id: "TRX-2040", date: "24 Apr 2026", type: "Tip", item: "dari @anomali_22", amount: 15_000, status: "settled" },
  { id: "TRX-2039", date: "23 Apr 2026", type: "Penjualan", item: "Stiker Pack Receh Edition", amount: 12_000, status: "pending" },
  { id: "TRX-2038", date: "23 Apr 2026", type: "Penjualan", item: "Hoodie Tipografi Nasional", amount: 64_000, status: "settled" },
  { id: "TRX-2037", date: "22 Apr 2026", type: "Bonus", item: "Tribe Juara Mingguan #2", amount: 100_000, status: "settled" },
  { id: "TRX-2036", date: "22 Apr 2026", type: "Penjualan", item: "Tote Bag Botani Series", amount: 28_500, status: "refund" },
  { id: "TRX-2035", date: "21 Apr 2026", type: "Penjualan", item: "Kaos Pop Tropis · Rara", amount: 38_500, status: "settled" },
];

const payouts = [
  { id: "PYO-118", date: "20 Apr 2026", amount: 1_240_000, method: "BCA ••• 8821", status: "completed" },
  { id: "PYO-117", date: "13 Apr 2026", amount: 980_000, method: "BCA ••• 8821", status: "completed" },
  { id: "PYO-116", date: "06 Apr 2026", amount: 1_120_000, method: "GoPay ••• 0918", status: "completed" },
  { id: "PYO-115", date: "30 Mar 2026", amount: 760_000, method: "BCA ••• 8821", status: "completed" },
];

const Earnings = () => {
  const [showPayout, setShowPayout] = useState(false);
  const [range, setRange] = useState("30 hari");
  const [filter, setFilter] = useState("Semua");

  const totalEarn = 6_300_000;
  const available = 1_840_000;
  const pending = 420_000;
  const lifetime = 38_750_000;
  const max = Math.max(...monthly.map(m => m.v));

  return (
    <div className="min-h-screen flex bg-background">
      <CreatorSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <CreatorTopbar title="Pendapatan" subtitle="Dompet & riwayat penarikan studio kamu" />

        <main className="flex-1 p-4 md:p-8 space-y-8 max-w-[1400px] w-full mx-auto">
          {/* Header */}
          <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Pendapatan</span>
              <h1 className="font-hand text-5xl md:text-6xl mt-1">Dompet Studio</h1>
              <p className="text-muted-foreground text-sm mt-1">
                Pantau royalti, tip, dan tarik saldo kapan saja.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="sketch-border-sm bg-card hover:bg-muted px-3 py-2 text-sm flex items-center gap-2">
                <Calendar className="w-4 h-4" strokeWidth={2.5}/> {range}
                <ChevronDown className="w-4 h-4" strokeWidth={2.5}/>
              </button>
              <button className="sketch-border-sm bg-card hover:bg-muted px-3 py-2 text-sm flex items-center gap-2">
                <Download className="w-4 h-4" strokeWidth={2.5}/> Ekspor
              </button>
            </div>
          </header>

          {/* Wallet hero */}
          <section className="grid lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 paper-card p-6 md:p-8 bg-gradient-to-br from-primary/10 via-card to-accent/10 relative overflow-hidden">
              <div className="absolute -top-6 -right-6 w-40 h-40 rounded-full bg-primary/10 blur-2xl" />
              <div className="flex items-start justify-between gap-4 relative">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Wallet className="w-5 h-5 text-primary" strokeWidth={2.5} />
                    <span className="text-sm font-semibold">Saldo tersedia</span>
                    <span className="text-[10px] font-bold uppercase bg-primary/15 text-primary px-2 py-0.5 rounded">Live</span>
                  </div>
                  <p className="font-hand text-6xl md:text-7xl leading-none">{fmt(available)}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    + {fmt(pending)} sedang diproses (rilis dalam 2-3 hari)
                  </p>
                </div>
                <div className="hidden md:flex flex-col items-end text-right">
                  <span className="text-xs text-muted-foreground">Pendapatan bulan ini</span>
                  <p className="font-hand text-3xl">{fmt(totalEarn)}</p>
                  <span className="text-xs text-primary flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3.5 h-3.5" strokeWidth={3}/> +18% vs bulan lalu
                  </span>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button onClick={() => setShowPayout(true)}
                  className="bg-primary text-primary-foreground sketch-border-sm px-5 py-3 font-semibold text-sm flex items-center gap-2 hover:bg-primary/90"
                  style={{ boxShadow: "3px 3px 0 0 hsl(var(--foreground))" }}>
                  <ArrowDownToLine className="w-4 h-4" strokeWidth={2.5}/> Tarik Saldo
                </button>
                <button className="sketch-border-sm bg-card px-5 py-3 font-semibold text-sm flex items-center gap-2 hover:bg-muted">
                  <Banknote className="w-4 h-4" strokeWidth={2.5}/> Atur Rekening
                </button>
                <Link to="/creator/upload"
                  className="sketch-border-sm bg-accent text-accent-foreground px-5 py-3 font-semibold text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4" strokeWidth={2.5}/> Upload Karya Baru
                </Link>
              </div>
            </div>

            {/* Side stats */}
            <div className="space-y-4">
              <StatCard icon={TrendingUp} label="Total seumur hidup" value={fmt(lifetime)} sub="sejak Mar 2024"/>
              <StatCard icon={Clock} label="Payout terjadwal" value="Senin, 28 Apr" sub="otomatis tiap minggu"/>
              <StatCard icon={Info} label="Royalti aktif" value="25%" sub="ubah di Pengaturan" link="/creator/settings"/>
            </div>
          </section>

          {/* Chart + breakdown */}
          <section className="grid lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 paper-card p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-hand text-3xl leading-none">Trend Pendapatan</h3>
                  <p className="text-xs text-muted-foreground mt-1">8 bulan terakhir (juta rupiah)</p>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary"/> Bersih diterima
                </div>
              </div>
              <div className="flex items-end gap-3 h-56">
                {monthly.map((d, i) => {
                  const h = (d.v / max) * 100;
                  const last = i === monthly.length - 1;
                  return (
                    <div key={d.m} className="flex-1 flex flex-col items-center gap-2">
                      <div className="relative w-full flex-1 flex items-end">
                        <div className={`w-full ${last ? "bg-primary" : "bg-primary/40"} border-2 border-foreground rounded-t-md transition-all hover:bg-primary`}
                          style={{ height: `${h}%` }}>
                          {last && (
                            <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs font-bold bg-foreground text-background px-2 py-0.5 rounded whitespace-nowrap">
                              {d.v}jt
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground font-medium">{d.m}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="paper-card p-6">
              <h3 className="font-hand text-3xl leading-none mb-1">Sumber Pendapatan</h3>
              <p className="text-xs text-muted-foreground mb-5">30 hari terakhir</p>
              <div className="space-y-4">
                {breakdown.map(b => {
                  const total = breakdown.reduce((s, x) => s + x.value, 0);
                  const pct = (b.value / total) * 100;
                  return (
                    <div key={b.label}>
                      <div className="flex items-center justify-between text-sm mb-1.5">
                        <span className="font-medium">{b.label}</span>
                        <span className="text-muted-foreground">{fmt(b.value)}</span>
                      </div>
                      <div className="h-2.5 bg-muted rounded-full overflow-hidden border border-foreground/20">
                        <div className={`h-full ${b.color}`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Tabs: transactions + payouts */}
          <section className="paper-card p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5">
              <h3 className="font-hand text-3xl leading-none">Riwayat Transaksi</h3>
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={2.5}/>
                  <input placeholder="Cari ID / produk..."
                    className="sketch-border-sm bg-card pl-9 pr-3 py-2 text-sm w-56 focus:outline-none focus:ring-2 focus:ring-primary"/>
                </div>
                <div className="flex gap-1 sketch-border-sm p-1 bg-card">
                  {["Semua", "Penjualan", "Tip", "Bonus"].map(t => (
                    <button key={t} onClick={() => setFilter(t)}
                      className={`px-3 py-1 text-xs font-medium rounded transition ${
                        filter === t ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                      }`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="overflow-x-auto -mx-6 px-6">
              <table className="w-full text-sm min-w-[640px]">
                <thead>
                  <tr className="border-b-2 border-foreground/20 text-xs uppercase text-muted-foreground">
                    <th className="text-left py-3 font-semibold">ID</th>
                    <th className="text-left py-3 font-semibold">Tanggal</th>
                    <th className="text-left py-3 font-semibold">Tipe</th>
                    <th className="text-left py-3 font-semibold">Detail</th>
                    <th className="text-right py-3 font-semibold">Jumlah</th>
                    <th className="text-right py-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map(t => (
                    <tr key={t.id} className="border-b border-border-soft hover:bg-muted/40 transition">
                      <td className="py-3.5 font-mono text-xs">{t.id}</td>
                      <td className="py-3.5 text-muted-foreground">{t.date}</td>
                      <td className="py-3.5">
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                          t.type === "Tip" ? "bg-accent/30 text-foreground" :
                          t.type === "Bonus" ? "bg-primary/15 text-primary" :
                          "bg-muted text-foreground"
                        }`}>{t.type}</span>
                      </td>
                      <td className="py-3.5">{t.item}</td>
                      <td className={`py-3.5 text-right font-semibold ${t.status === "refund" ? "text-destructive" : ""}`}>
                        {t.status === "refund" ? "-" : "+"}{fmt(t.amount)}
                      </td>
                      <td className="py-3.5 text-right">
                        <StatusPill status={t.status as any} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span>Menampilkan 7 dari 142 transaksi</span>
              <button className="text-primary font-semibold hover:underline flex items-center gap-1">
                Lihat semua <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={3}/>
              </button>
            </div>
          </section>

          {/* Payouts history */}
          <section className="paper-card p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-hand text-3xl leading-none">Riwayat Penarikan</h3>
                <p className="text-xs text-muted-foreground mt-1">Semua penarikan saldo ke rekening kamu.</p>
              </div>
              <button className="sketch-border-sm bg-card px-3 py-2 text-sm hover:bg-muted flex items-center gap-2">
                <Filter className="w-4 h-4" strokeWidth={2.5}/> Filter
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {payouts.map(p => (
                <div key={p.id} className="sketch-border-sm bg-card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-muted-foreground">{p.id}</span>
                    <span className="text-[10px] font-bold uppercase bg-primary/15 text-primary px-2 py-0.5 rounded flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" strokeWidth={3}/> Selesai
                    </span>
                  </div>
                  <p className="font-hand text-3xl leading-none">{fmt(p.amount)}</p>
                  <div className="mt-3 pt-3 border-t border-border-soft text-xs space-y-1">
                    <div className="flex justify-between"><span className="text-muted-foreground">Tanggal</span><span>{p.date}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Metode</span><span>{p.method}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Help band */}
          <section className="paper-card p-6 bg-accent/10 flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="w-12 h-12 sketch-border-sm bg-card flex items-center justify-center shrink-0">
              <Info className="w-5 h-5 text-primary" strokeWidth={2.5}/>
            </div>
            <div className="flex-1">
              <p className="font-hand text-2xl leading-none mb-1">Bagaimana royalti dihitung?</p>
              <p className="text-sm text-muted-foreground">
                Royalti default 25% dari harga jual setelah biaya cetak & platform. Naikkan multiplier
                hingga ×1.3 di Upload Studio untuk karya populer.
              </p>
            </div>
            <button className="sketch-border-sm bg-card px-4 py-2 text-sm font-semibold hover:bg-muted">
              Pelajari Selengkapnya
            </button>
          </section>
        </main>
      </div>

      {showPayout && <PayoutModal available={available} onClose={() => setShowPayout(false)} />}
    </div>
  );
};

/* ---------- helpers ---------- */

const StatCard = ({ icon: Icon, label, value, sub, link }:
  { icon: any; label: string; value: string; sub?: string; link?: string }) => {
  const Tag: any = link ? Link : "div";
  return (
    <Tag {...(link ? { to: link } : {})} className="paper-card p-5 block hover:bg-muted/40 transition">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-primary" strokeWidth={2.5}/>
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      </div>
      <p className="font-hand text-3xl leading-none">{value}</p>
      {sub && <p className="text-xs text-muted-foreground mt-1.5">{sub}</p>}
    </Tag>
  );
};

const StatusPill = ({ status }: { status: "settled" | "pending" | "refund" }) => {
  const map = {
    settled: { label: "Terbayar", icon: CheckCircle2, cls: "bg-primary/15 text-primary" },
    pending: { label: "Diproses", icon: Clock, cls: "bg-accent/30 text-foreground" },
    refund: { label: "Refund", icon: AlertCircle, cls: "bg-destructive/15 text-destructive" },
  }[status];
  const Icon = map.icon;
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-1 rounded ${map.cls}`}>
      <Icon className="w-3 h-3" strokeWidth={3}/> {map.label}
    </span>
  );
};

const PayoutModal = ({ available, onClose }: { available: number; onClose: () => void }) => {
  const [method, setMethod] = useState("bank");
  const [amount, setAmount] = useState(available.toString());
  const fee = method === "bank" ? 4500 : method === "ewallet" ? 2500 : 0;
  const num = Number(amount) || 0;
  const receive = Math.max(0, num - fee);

  return (
    <div className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-card paper-card w-full max-w-lg p-6 md:p-8" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Tarik Saldo</span>
            <h3 className="font-hand text-4xl mt-1">Cairkan ke rekening</h3>
          </div>
          <button onClick={onClose} className="sketch-border-sm bg-card w-8 h-8 flex items-center justify-center hover:bg-muted">✕</button>
        </div>

        <div className="paper-card p-4 bg-primary/5 mb-5">
          <p className="text-xs text-muted-foreground">Saldo tersedia</p>
          <p className="font-hand text-4xl text-primary">{fmt(available)}</p>
        </div>

        <label className="block mb-4">
          <span className="text-sm font-medium block mb-1.5">Jumlah penarikan</span>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold">Rp</span>
            <input value={Number(amount).toLocaleString("id-ID")}
              onChange={e => setAmount(e.target.value.replace(/\D/g, ""))}
              className="w-full sketch-border-sm bg-background pl-10 pr-20 py-3 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-primary"/>
            <button onClick={() => setAmount(available.toString())}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded hover:bg-primary/20">
              MAX
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-1.5">Minimum penarikan {fmt(100_000)}</p>
        </label>

        <div className="space-y-2 mb-5">
          <span className="text-sm font-medium block">Metode transfer</span>
          {[
            { id: "bank", icon: Landmark, label: "Bank Transfer (BCA ••• 8821)", fee: "Rp 4.500" },
            { id: "ewallet", icon: CreditCard, label: "E-Wallet (GoPay ••• 0918)", fee: "Rp 2.500" },
            { id: "instant", icon: Sparkles, label: "Instant Payout (premium)", fee: "Gratis · 5 menit" },
          ].map(m => (
            <button key={m.id} onClick={() => setMethod(m.id)}
              className={`w-full sketch-border-sm bg-card p-3 flex items-center gap-3 text-left transition ${
                method === m.id ? "ring-2 ring-primary bg-primary/5" : "hover:bg-muted"
              }`}>
              <m.icon className="w-5 h-5 text-primary" strokeWidth={2.5}/>
              <div className="flex-1">
                <p className="text-sm font-medium">{m.label}</p>
                <p className="text-xs text-muted-foreground">Biaya: {m.fee}</p>
              </div>
              <div className={`w-4 h-4 rounded-full border-2 border-foreground ${method === m.id ? "bg-primary" : ""}`}/>
            </button>
          ))}
        </div>

        <div className="paper-card p-4 bg-muted/40 space-y-1.5 text-sm mb-5">
          <div className="flex justify-between"><span className="text-muted-foreground">Penarikan</span><span>{fmt(num)}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Biaya transfer</span><span>- {fmt(fee)}</span></div>
          <div className="flex justify-between font-semibold pt-2 border-t border-border-soft">
            <span>Diterima</span><span className="font-hand text-2xl text-primary">{fmt(receive)}</span>
          </div>
        </div>

        <button onClick={onClose}
          className="w-full bg-primary text-primary-foreground sketch-border-sm py-3 font-semibold hover:bg-primary/90"
          style={{ boxShadow: "3px 3px 0 0 hsl(var(--foreground))" }}>
          Konfirmasi Penarikan
        </button>
      </div>
    </div>
  );
};

export default Earnings;
