"use client";

import { motion } from "framer-motion";
import { ButtonProps } from "@/types/ui/button/Button.types";

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-body font-semibold tracking-wide border border-transparent transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring/40 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary:
      "bg-primary text-primary-foreground shadow-[0_4px_12px_rgba(var(--primary-rgb),0.15)] hover:bg-primary/95 hover:shadow-[0_4px_20px_rgba(var(--primary-rgb),0.3)]",
    secondary:
      "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/90",
    accent:
      "bg-accent text-accent-foreground shadow-sm hover:bg-accent/90",
    outline:
      "border-border bg-transparent text-foreground hover:bg-muted/40 hover:border-foreground/20",
    ghost:
      "bg-transparent text-foreground hover:bg-muted/50",
    destructive:
      "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  };

  const sizes = {
    sm: "px-3.5 py-1.5 text-xs rounded-md",
    md: "px-5 py-2.5 text-sm rounded-lg",
    lg: "px-7 py-3 text-base rounded-xl",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
