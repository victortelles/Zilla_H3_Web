"use client";

import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import DarkModeToggle from "../darkmode/DarkModeToggle";
import Button from "../button/Button";
import { NavLink } from "@/types/ui/navbar/Navbar.types";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks: NavLink[] = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Gallery", href: "#gallery" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <a href="#" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-display font-black text-xl transition-all duration-300 group-hover:scale-105 shadow-sm">
              Z
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-foreground transition-colors group-hover:text-primary">
              ZILLA<span className="font-light text-muted-foreground group-hover:text-primary/70">_H3</span>
            </span>
          </a>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200 py-1.5 group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Utility Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <DarkModeToggle />
          <Button variant="primary" size="sm" onClick={() => window.open("https://t.me/zilla_h3", "_blank")}>
            Get Custom Avatar
          </Button>
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
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-lg px-3 py-2 text-base font-semibold text-foreground/85 hover:text-primary hover:bg-muted/30 transition-all duration-200"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 pb-2 border-t border-border flex flex-col gap-3">
                <Button variant="primary" size="md" className="w-full" onClick={() => window.open("https://t.me/zilla_h3", "_blank")}>
                  Get Custom Avatar
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
