"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { NavbarDropdownProps } from "@/types/ui/navbar/NavbarDropdown.types";

export default function NavbarDropdown({ isOpen, onClose, onLogout }: NavbarDropdownProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="absolute right-0 mt-2 w-48 rounded-2xl border border-border bg-card p-1.5 shadow-lg z-50 text-left"
    >
      <Link
        href="/admin"
        onClick={onClose}
        className="block rounded-xl px-3 py-2 text-xs font-normal hover:bg-muted text-foreground transition-colors"
      >
        Admin Dashboard
      </Link>
      <Link
        href="/"
        onClick={onClose}
        className="block rounded-xl px-3 py-2 text-xs font-normal hover:bg-muted text-foreground transition-colors"
      >
        Home Page
      </Link>
      <hr className="my-1 border-border" />
      <button
        onClick={() => {
          onClose();
          onLogout();
        }}
        className="w-full text-left rounded-xl px-3 py-2 text-xs font-semibold text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
      >
        Log Out
      </button>
    </motion.div>
  );
}
