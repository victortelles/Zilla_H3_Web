"use client";

import React from "react";
import { HiSparkles } from "react-icons/hi";
import { EmptyStateProps } from "@/types/ui/emptyState/EmptyState.types";

export default function EmptyState({
  title = "No Creations Yet",
  description = "Our avatar collection is currently being prepared. Check back soon for custom designs, wireframe details, and optimized texture work!",
  tagText = "Creations in Progress",
}: EmptyStateProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-center z-10 animate-fade-in py-8">
      <div className="w-full max-w-xl py-12 px-8 border border-dashed border-border/80 rounded-3xl text-center space-y-6 bg-card/25 backdrop-blur-md relative overflow-hidden group shadow-lg flex flex-col items-center">
        {/* Technical wireframe grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-20 pointer-events-none z-0" />

        {/* Soft backglow */}
        <div className="absolute w-48 h-48 rounded-full bg-primary/5 blur-3xl pointer-events-none z-0" />

        <div className="relative z-10 flex flex-col items-center space-y-4">
          {/* Medium-large bouncing chibi icon */}
          <div className="relative flex items-center justify-center p-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/resources/chibis/zillon.gif"
              alt="Zillon Chibi"
              className="w-24 h-24 sm:w-28 sm:h-28 object-contain animate-chibi-bounce select-none drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)]"
            />
          </div>

          <div className="space-y-2.5">
            {tagText && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-widest font-body">
                <HiSparkles className="w-2.5 h-2.5" /> {tagText}
              </div>
            )}

            <h3 className="font-display font-black text-2xl text-foreground uppercase tracking-tight">
              {title}
            </h3>

            <p className="font-body text-xs sm:text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
