"use client";

import React from "react";

export default function PreloaderLogo() {
  return (
    <div
      className="logo-text relative z-10 flex flex-col items-center gap-6"
    >
      <h1 className="font-display font-black text-6xl md:text-8xl tracking-tight flex items-center select-none text-white">
        <span className="logo-zilla inline-block">ZILLA</span>
        <span className="logo-underscore inline-block text-white mx-[-12px]">_</span>
        <span className="logo-h3 inline-block">ZH3</span>
      </h1>

      {/* Subtitle */}
      <p className="font-body text-sm md:text-base font-semibold tracking-widest text-primary-foreground/70 uppercase animate-pulse select-none">
        Loading Avatar Creator Portfolio
      </p>
    </div>
  );
}
