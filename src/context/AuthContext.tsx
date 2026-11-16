import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type User = { name: string; email: string; avatar?: string } | null;

interface AuthCtx {
  user: User;
  login: (u: NonNullable<User>) => void;
  logout: () => void;
}

const Ctx = createContext<AuthCtx>({ user: null, login: () => {}, logout: () => {} });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("inkkraft_user");
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  const login = (u: NonNullable<User>) => {
    setUser(u);
    localStorage.setItem("inkkraft_user", JSON.stringify(u));
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("inkkraft_user");
  };

  return <Ctx.Provider value={{ user, login, logout }}>{children}</Ctx.Provider>;
};

export const useAuth = () => useContext(Ctx);
