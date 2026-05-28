"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import Notification from "@/components/ui/notification/Notification";
import { NotificationType } from "@/types/ui/notification/Notification.types";
import { User, AuthContextType, ToastItem } from "@/types/context/AuthContext.types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((message: string, type: NotificationType) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const checkSession = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/discord/me");
      if (res.ok) {
        const data = (await res.json()) as { authenticated: boolean; user?: User };
        if (data.authenticated && data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Failed to check auth status:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    const fetchSession = async () => {
      try {
        const res = await fetch("/api/auth/discord/me");
        if (res.ok && active) {
          const data = (await res.json()) as { authenticated: boolean; user?: User };
          if (data.authenticated && data.user) {
            setUser(data.user);
          } else {
            setUser(null);
          }
        } else if (active) {
          setUser(null);
        }
      } catch (err) {
        console.error("Failed to check auth status:", err);
        if (active) setUser(null);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchSession();
    return () => {
      active = false;
    };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    window.location.href = "/api/auth/discord/logout";
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authenticated: !!user,
        checkSession,
        logout,
        showToast,
      }}
    >
      {children}

      {/* Global Toast Notifications overlay */}
      <div className="fixed top-4 right-4 z-[99999] flex flex-col gap-2.5 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <Notification
              key={toast.id}
              id={toast.id}
              message={toast.message}
              type={toast.type}
              onClose={removeToast}
            />
          ))}
        </AnimatePresence>
      </div>
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
