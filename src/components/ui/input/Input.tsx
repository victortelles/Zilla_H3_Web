"use client";

import { InputProps } from "@/types/ui/input/Input.types";

export default function Input({
  label,
  error,
  className = "",
  id,
  ...props
}: InputProps) {
  return (
    <div className="w-full space-y-1.5 text-left">
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-semibold uppercase tracking-wider text-foreground/70"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          className={`w-full rounded-lg border border-border bg-card/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-300 focus:bg-card focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 disabled:opacity-50 disabled:pointer-events-none ${
            error ? "border-destructive focus:ring-destructive/10" : ""
          } ${className}`}
          {...props}
        />
      </div>
      {error && (
        <span className="block text-xs font-medium text-destructive animate-fadeIn">
          {error}
        </span>
      )}
    </div>
  );
}
