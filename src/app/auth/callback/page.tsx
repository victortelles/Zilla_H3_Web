"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { FaCheckCircle, FaExclamationTriangle, FaSpinner } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/ui/navbar/Navbar";
import Footer from "@/components/ui/footer/Footer";

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { checkSession, showToast } = useAuth();

  const status = searchParams.get("status");
  const message = searchParams.get("message") || "An error occurred during authentication.";

  useEffect(() => {
    if (status === "success") {
      checkSession().then(() => {
        showToast("Logged in successfully!", "success");
        const timer = setTimeout(() => {
          router.push("/admin");
        }, 2000);
        return () => clearTimeout(timer);
      });
    }
  }, [status, router, checkSession, showToast]);

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  } as const;

  return (
    <div className="flex-1 bg-background text-foreground transition-all duration-300 flex flex-col items-center justify-center min-h-[70vh] p-4 relative overflow-hidden">
      {/* Background Decorative Grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none z-0" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        className="w-full max-w-md bg-card border border-border p-8 rounded-3xl shadow-xl text-center relative z-10 space-y-6"
      >
        {status === "success" ? (
          <>
            <div className="flex justify-center">
              <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-success/10 text-success border border-success/25">
                <FaCheckCircle className="w-8 h-8" />
                <span className="absolute w-2 h-2 bg-success rounded-full animate-ping top-1 right-1" />
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="font-display font-black text-2xl tracking-tight text-foreground uppercase">
                Success
              </h1>
              <p className="font-body text-sm text-muted-foreground">
                Whitelisted account verified! Preparing your administrative workspace...
              </p>
            </div>
            <div className="flex items-center justify-center gap-2.5 text-xs text-primary font-bold">
              <FaSpinner className="w-4 h-4 animate-spin" /> Redirecting to Dashboard...
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-destructive/10 text-destructive border border-destructive/25">
                <FaExclamationTriangle className="w-8 h-8" />
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="font-display font-black text-2xl tracking-tight text-foreground uppercase">
                Access Denied
              </h1>
              <p className="font-body text-sm text-muted-foreground max-w-xs mx-auto">
                {message}
              </p>
            </div>
            <div className="pt-2 flex justify-center gap-4">
              <button
                onClick={() => router.push("/")}
                className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:opacity-90 active:scale-95 transition-all shadow-md cursor-pointer animate-pulse"
              >
                Return Home
              </button>
              <button
                onClick={() => router.push("/api/auth/discord/login")}
                className="px-5 py-2.5 rounded-xl bg-muted border border-border text-foreground text-xs font-bold hover:bg-muted/70 active:scale-95 transition-all cursor-pointer"
              >
                Try Again
              </button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={
        <div className="flex-1 flex items-center justify-center min-h-[70vh] bg-background">
          <FaSpinner className="w-8 h-8 animate-spin text-primary" />
        </div>
      }>
        <AuthCallbackContent />
      </Suspense>
      <Footer />
    </>
  );
}
