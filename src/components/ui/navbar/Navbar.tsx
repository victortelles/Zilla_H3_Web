"use client";

import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import DarkModeToggle from "../darkmode/DarkModeToggle";
import Button from "../button/Button";
import { NavLink } from "@/types/ui/navbar/Navbar.types";
import { configService } from "@/services/configService";
import { useAuth } from "@/context/AuthContext";
import NavbarDropdown from "./NavbarDropdown";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, authenticated, logout } = useAuth();
  const telegramProfile = configService.getContactTelegram();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks: NavLink[] = [
    { name: "About", href: "/#about" },
    { name: "Services", href: "/#services" },
    { name: "Gallery", href: "/#gallery" },
    { name: "Portfolio", href: "/project" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-display font-black text-xl transition-all duration-300 group-hover:scale-105 shadow-sm">
              Z
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-foreground transition-colors group-hover:text-primary">
              ZILLA<span className="font-light text-muted-foreground group-hover:text-primary/70">_H3</span>
            </span>
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200 py-1.5 group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Utility Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <DarkModeToggle />

          {authenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2.5 p-1 pr-3 rounded-full border border-border bg-card hover:border-primary/50 transition-all cursor-pointer focus:outline-none"
              >
                <img
                  src={user.avatarUrl}
                  alt={user.globalName}
                  className="w-7 h-7 rounded-full object-cover border border-border/80"
                />
                <span className="text-xs font-bold text-foreground">
                  {user.globalName}
                </span>
              </button>

              <AnimatePresence>
                <NavbarDropdown
                  isOpen={isDropdownOpen}
                  onClose={() => setIsDropdownOpen(false)}
                  onLogout={logout}
                />
              </AnimatePresence>
            </div>
          ) : (
            <Button variant="primary" size="sm" onClick={() => window.open(telegramProfile, "_blank")}>
              Get Custom Avatar
            </Button>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-3">
          <DarkModeToggle />
          <button
            onClick={toggleMenu}
            className="inline-flex items-center justify-center p-2 rounded-lg text-foreground/80 hover:text-foreground hover:bg-muted/50 transition-colors cursor-pointer"
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <FaTimes className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu with AnimatePresence */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-background border-b border-border"
          >
            <div className="space-y-1.5 px-4 py-4 sm:px-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-lg px-3 py-2 text-base font-semibold text-foreground/85 hover:text-primary hover:bg-muted/30 transition-all duration-200"
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-4 pb-2 border-t border-border flex flex-col gap-3">
                {authenticated && user ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 px-3 py-2 bg-muted/20 rounded-2xl border border-border/50">
                      <img
                        src={user.avatarUrl}
                        alt={user.globalName}
                        className="w-10 h-10 rounded-full object-cover border border-border"
                      />
                      <div>
                        <div className="text-sm font-bold text-foreground leading-none">{user.globalName}</div>
                        <div className="text-[10px] text-muted-foreground mt-0.5">@{user.username}</div>
                      </div>
                    </div>
                    <Link
                      href="/admin"
                      onClick={() => setIsOpen(false)}
                      className="block rounded-xl px-3 py-2 text-sm font-semibold text-foreground/85 hover:text-primary hover:bg-muted/30 transition-all"
                    >
                      Admin Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        logout();
                      }}
                      className="w-full text-left rounded-xl px-3 py-2 text-sm font-semibold text-destructive hover:bg-destructive/10 transition-all cursor-pointer"
                    >
                      Log Out
                    </button>
                  </div>
                ) : (
                  <Button variant="primary" size="md" className="w-full" onClick={() => window.open(telegramProfile, "_blank")}>
                    Get Custom Avatar
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
