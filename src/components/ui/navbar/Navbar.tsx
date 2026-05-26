"use client";

import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import DarkModeToggle from "../darkmode/DarkModeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: "Inicio", href: "#inicio" },
    { name: "Componentes", href: "#componentes" },
    { name: "Tipografías", href: "#tipografias" },
    { name: "Colores", href: "#colores" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo Placeholder */}
        <div className="flex items-center gap-2">
          <a href="#" className="flex items-center gap-1 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-display font-black text-xl transition-all duration-300 group-hover:scale-105 shadow-sm">
              Z
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-foreground transition-colors group-hover:text-primary">
              ZILLA<span className="font-light text-muted-foreground group-hover:text-primary/70">H3</span>
            </span>
          </a>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Utility Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <DarkModeToggle />
          <button className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer">
            Empezar
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-3">
          <DarkModeToggle />
          <button
            onClick={toggleMenu}
            className="inline-flex items-center justify-center p-2 rounded-md text-foreground/80 hover:text-foreground hover:bg-muted/50 transition-colors cursor-pointer"
            aria-expanded="false"
          >
            <span className="sr-only">Abrir menú principal</span>
            {isOpen ? <FaTimes className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-background border-b border-border ${
          isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-1 px-4 py-3 sm:px-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block rounded-md px-3 py-2 text-base font-medium text-foreground/80 hover:text-primary hover:bg-muted/30 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 pb-2 border-t border-border flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Acceso rápido</span>
            <button className="w-full inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 cursor-pointer">
              Empezar
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
