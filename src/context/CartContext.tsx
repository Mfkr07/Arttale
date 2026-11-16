import { createContext, useContext, useState, ReactNode } from "react";

export type CartItem = {
  id: string;
  productId: number;
  title: string;
  artist: string;
  emoji: string;
  bg: string;
  color: string;
  size: string;
  quality: string;
  price: number;
  tip: number;
  qty: number;
};

type CartContextType = {
  items: CartItem[];
  add: (item: Omit<CartItem, "id">) => void;
  update: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  count: number;
  subtotal: number;
};

const CartContext = createContext<CartContextType | null>(null);

// Seed data so flow bisa dilihat tanpa harus add dulu
const SEED: CartItem[] = [
  {
    id: "seed-1", productId: 1, title: "Cosmic Cat Vibes", artist: "Rara Doodles",
    emoji: "🐱", bg: "bg-foreground", color: "Hitam", size: "M", quality: "Standard",
    price: 145000, tip: 5000, qty: 1,
  },
  {
    id: "seed-2", productId: 5, title: "Garage Punk Dreams", artist: "Riot Press",
    emoji: "🎸", bg: "bg-red-100", color: "—", size: "Die-cut", quality: "Vinyl",
    price: 35000, tip: 0, qty: 2,
  },
];

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(SEED);

  const add: CartContextType["add"] = (item) =>
    setItems((prev) => [...prev, { ...item, id: `it-${Date.now()}` }]);
  const update = (id: string, qty: number) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i)));
  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));
  const clear = () => setItems([]);

  const count = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + (i.price + i.tip) * i.qty, 0);

  return (
    <CartContext.Provider value={{ items, add, update, remove, clear, count, subtotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};

export const fmt = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;
