import { CartItem } from "@/context/CartContext";

export type OrderStep = "received" | "printing" | "packed" | "shipping" | "delivered";

export interface OrderItem {
  id: string | number;
  productId?: number;
  title: string;
  artist: string;
  qty: number;
  price: number;
  emoji?: string;
  bg?: string;
  color?: string;
  size?: string;
  quality?: string;
  tip?: number;
}

export interface JourneyEvent {
  time: string;
  event: string;
  agent: string;
}

export interface OrderRecipient {
  name: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
}

export interface StoredOrder {
  id: string;
  createdAt: string;
  estimatedDelivery: string;
  status: OrderStep;
  statusLabel: string;
  items: OrderItem[];
  shippingAddress: OrderRecipient;
  courier: {
    id: string;
    name: string;
    trackingNumber: string;
    weight: string;
    route: string;
    price: number;
    eta: string;
  };
  payment: {
    method: string;
    paidAt: string;
    subtotal: number;
    totalTip: number;
    shippingPrice: number;
    shippingSubsidy: number;
    voucherDiscount: number;
    total: number;
  };
  journey: JourneyEvent[];
}

const STORAGE_KEY = "arttale_orders";

// Seed historical orders so the tracking & account pages always have realistic examples
export const SEED_ORDERS: StoredOrder[] = [
  {
    id: "INK-2024-0042",
    createdAt: "Sen, 22 Apr 2024 • 14:32",
    estimatedDelivery: "26–27 Apr 2024",
    status: "shipping",
    statusLabel: "DALAM PENGIRIMAN",
    items: [
      { id: 1, title: "Mecha Sunda — Kaos Hitam", artist: "Sari Wibisono", qty: 1, price: 169000, bg: "bg-pink-100", emoji: "🤖", color: "Hitam", size: "L" },
      { id: 2, title: "Senja di Bromo — Sticker Pack", artist: "Studio Kabut", qty: 2, price: 35000, bg: "bg-emerald-100", emoji: "🌋", size: "Die-cut" },
    ],
    shippingAddress: {
      name: "Rama Pratama",
      phone: "+62 812-3456-7890",
      address: "Jl. Kemang Selatan VIII No. 12, Bangka, Mampang Prapatan",
      city: "Jakarta Selatan, DKI Jakarta",
      zip: "12730",
    },
    courier: {
      id: "reg",
      name: "JNE Reguler",
      trackingNumber: "JNE-8829104821",
      weight: "0.6 kg",
      route: "Bandung ➝ Jakarta Selatan",
      price: 18000,
      eta: "2-3 hari",
    },
    payment: {
      method: "QRIS",
      paidAt: "22 Apr 2024 • 14:32",
      subtotal: 239000,
      totalTip: 5000,
      shippingPrice: 18000,
      shippingSubsidy: 0,
      voucherDiscount: 0,
      total: 257000,
    },
    journey: [
      { time: "Kam, 25 Apr • 08:20", event: "Paket diterima kurir JNE di hub Bandung Selatan menuju kota tujuan.", agent: "JNE Hub Bandung" },
      { time: "Rab, 24 Apr • 16:45", event: "Paket selesai dikemas rapi, menunggu pickup kurir.", agent: "Workshop Inkkraft Bandung" },
      { time: "Rab, 24 Apr • 11:02", event: "QC selesai. Kualitas cetak sablon lolos inspeksi.", agent: "Tim QC" },
      { time: "Sel, 23 Apr • 09:10", event: "Mulai proses cetak DTF + heat press di kain katun.", agent: "Vendor Rekanan #BDG-04" },
      { time: "Sen, 22 Apr • 14:32", event: "Pesanan dibayar & otomatis dikonfirmasi oleh sistem.", agent: "Sistem Arttale" },
    ],
  },
  {
    id: "INK-2841",
    createdAt: "24 Apr 2026 • 10:15",
    estimatedDelivery: "27–28 Apr 2026",
    status: "shipping",
    statusLabel: "DIKIRIM",
    items: [
      { id: 101, title: "Hoodie 'Liar Tapi Tenang'", artist: "Bayu Krisna", qty: 1, price: 389000, bg: "bg-stone-800", emoji: "🧥", size: "XL", quality: "Heavyweight" },
    ],
    shippingAddress: {
      name: "Rara Pratiwi",
      phone: "+62 812-3456-7890",
      address: "Jl. Dago Asri No. 12, Coblong",
      city: "Bandung, Jawa Barat",
      zip: "40135",
    },
    courier: {
      id: "exp",
      name: "SiCepat Express",
      trackingNumber: "SCP-901847291",
      weight: "0.8 kg",
      route: "Jakarta ➝ Bandung",
      price: 22000,
      eta: "1-2 hari",
    },
    payment: {
      method: "GoPay",
      paidAt: "24 Apr 2026 • 10:15",
      subtotal: 389000,
      totalTip: 10000,
      shippingPrice: 22000,
      shippingSubsidy: 10000,
      voucherDiscount: 0,
      total: 401000,
    },
    journey: [
      { time: "Jum, 25 Apr • 10:00", event: "Paket sedang dalam perjalanan kurir ke alamat tujuan.", agent: "SiCepat Hub Dago" },
      { time: "Kam, 24 Apr • 16:30", event: "Paket selesai dicetak dan di-pickup kurir.", agent: "Vendor Jakarta" },
    ],
  },
  {
    id: "INK-2828",
    createdAt: "12 Apr 2026 • 13:00",
    estimatedDelivery: "15 Apr 2026",
    status: "delivered",
    statusLabel: "SELESAI",
    items: [
      { id: 102, title: "Pack Stiker Lokal Vol.3", artist: "Studio Ombak", qty: 1, price: 75000, bg: "bg-blue-100", emoji: "🌊", size: "Die-cut" },
    ],
    shippingAddress: {
      name: "Rara Pratiwi",
      phone: "+62 812-3456-7890",
      address: "Jl. Dago Asri No. 12, Coblong",
      city: "Bandung, Jawa Barat",
      zip: "40135",
    },
    courier: {
      id: "reg",
      name: "J&T Reguler",
      trackingNumber: "JT-491029481",
      weight: "0.2 kg",
      route: "Surabaya ➝ Bandung",
      price: 12000,
      eta: "2-3 hari",
    },
    payment: {
      method: "Virtual Account",
      paidAt: "12 Apr 2026 • 13:00",
      subtotal: 75000,
      totalTip: 0,
      shippingPrice: 12000,
      shippingSubsidy: 0,
      voucherDiscount: 0,
      total: 87000,
    },
    journey: [
      { time: "Sen, 15 Apr • 11:20", event: "Paket telah diterima oleh penerima (Rara Pratiwi).", agent: "Kurir J&T" },
      { time: "Min, 14 Apr • 08:30", event: "Paket tiba di Bandung gateway.", agent: "J&T Gateway" },
    ],
  },
];

export function getStoredOrders(): StoredOrder[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Seed default orders to local storage if empty
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_ORDERS));
      return SEED_ORDERS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (e) {
    console.error("Failed to parse stored orders:", e);
  }
  return SEED_ORDERS;
}

export function saveOrder(order: StoredOrder): void {
  try {
    const current = getStoredOrders();
    // Prepend new order
    const updated = [order, ...current.filter((o) => o.id !== order.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error("Failed to save order to localStorage:", e);
  }
}

export function findOrder(id: string): StoredOrder | undefined {
  if (!id) return undefined;
  const orders = getStoredOrders();
  const cleanId = id.trim().toUpperCase();
  return orders.find((o) => o.id.toUpperCase() === cleanId);
}

export function createOrderFromCheckout(params: {
  items: CartItem[];
  recipient: OrderRecipient;
  courierId: string;
  courierName: string;
  courierPrice: number;
  courierEta: string;
  paymentMethod: string;
  subtotal: number;
  totalTip: number;
  shippingSubsidy: number;
  voucherDiscount: number;
  total: number;
}): StoredOrder {
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const orderId = `INK-2026-${randomSuffix}`;
  const now = new Date();

  const formattedDate = now.toLocaleDateString("id-ID", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const formattedTime = now.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const nowStr = `${formattedDate} • ${formattedTime}`;

  // Estimate delivery 3-5 days from now
  const estStart = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
  const estEnd = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000);
  const estStr = `${estStart.getDate()}–${estEnd.getDate()} ${estEnd.toLocaleDateString("id-ID", { month: "short", year: "numeric" })}`;

  const cleanCity = params.recipient.city || "Jakarta";
  const cityCode = cleanCity.slice(0, 3).toUpperCase().replace(/[^A-Z]/g, "BDG");
  const trackingNumber = `${params.courierName.split(" ")[0].toUpperCase()}-${Date.now().toString().slice(-8)}`;

  const newOrder: StoredOrder = {
    id: orderId,
    createdAt: nowStr,
    estimatedDelivery: estStr,
    status: "printing",
    statusLabel: "SEDANG DICETAK",
    items: params.items.map((it) => ({
      id: it.id,
      productId: it.productId,
      title: it.title,
      artist: it.artist,
      qty: it.qty,
      price: it.price,
      emoji: it.emoji,
      bg: it.bg,
      color: it.color,
      size: it.size,
      quality: it.quality,
      tip: it.tip,
    })),
    shippingAddress: {
      name: params.recipient.name,
      phone: params.recipient.phone,
      address: params.recipient.address,
      city: params.recipient.city,
      zip: params.recipient.zip,
    },
    courier: {
      id: params.courierId,
      name: params.courierName,
      trackingNumber,
      weight: `${Math.max(0.4, (params.items.reduce((s, i) => s + i.qty, 0) * 0.35)).toFixed(1)} kg`,
      route: `Workshop Rekanan (${cityCode}) ➝ ${params.recipient.city || "Alamat Pembeli"}`,
      price: params.courierPrice,
      eta: params.courierEta,
    },
    payment: {
      method: params.paymentMethod,
      paidAt: nowStr,
      subtotal: params.subtotal,
      totalTip: params.totalTip,
      shippingPrice: params.courierPrice,
      shippingSubsidy: params.shippingSubsidy,
      voucherDiscount: params.voucherDiscount,
      total: params.total,
    },
    journey: [
      {
        time: nowStr,
        event: "Work order berhasil diteruskan ke vendor percetakan terdekat. Antrean cetak dibuat.",
        agent: `Vendor Rekanan #${cityCode}-01`,
      },
      {
        time: nowStr,
        event: `Pesanan dibayar via ${params.paymentMethod} & terverifikasi otomatis. Tip Rp ${params.totalTip.toLocaleString("id-ID")} disalurkan ke kreator.`,
        agent: "Sistem Arttale",
      },
    ],
  };

  saveOrder(newOrder);
  return newOrder;
}
