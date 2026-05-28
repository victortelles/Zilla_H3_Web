"use client";

import { User } from "@/types/context/AuthContext.types";

interface WelcomeBannerProps {
  user: User | null;
  onLogout: () => void;
}

export default function WelcomeBanner({ user, onLogout }: WelcomeBannerProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl border border-border bg-card shadow-sm">
      <div className="flex items-center gap-4 text-left">
        <img
          src={user?.avatarUrl || ""}
          alt={user?.globalName || "Admin"}
          className="w-14 h-14 rounded-2xl border border-border object-cover shadow-sm"
        />
        <div>
          <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
            ADMINISTRATIVE WORKSPACE
          </span>
          <h1 className="font-display font-black text-2xl tracking-tight text-foreground uppercase mt-0.5 animate-fade-in">
            Welcome, {user?.globalName || "Administrator"}
          </h1>
        </div>
      </div>
      <button
        onClick={onLogout}
        className="px-4 py-2 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive/15 text-xs font-bold transition-colors cursor-pointer focus:outline-none"
      >
        Logout session
      </button>
    </div>
  );
}
