"use client";

import React from "react";

interface PreloaderCardProps {
  title: string;
  imageSrc: string;
  glowImageSrc?: string;
  isTexturing?: boolean;
  badgeSrc?: string;
}

export default function PreloaderCard({
  title,
  imageSrc,
  glowImageSrc,
  isTexturing = false,
  badgeSrc,
}: PreloaderCardProps) {
  return (
    <div className={`gallery-box relative flex flex-col items-center justify-between p-2 md:p-3 rounded-2xl bg-white/5 dark:bg-black/30 border border-white/10 backdrop-blur-md w-[76px] h-[120px] md:w-32 md:h-48 lg:w-40 lg:h-64 shadow-xl select-none ${badgeSrc ? "" : "overflow-hidden"}`}>
      {/* Dark overlay gradient to make character stand out */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

      {/* Tilted Pop-in Badge */}
      {badgeSrc && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={badgeSrc}
          alt="Badge"
          className="badge-pop absolute -top-1.5 -right-1.5 md:-top-2 md:-right-2 w-7 h-7 md:w-11 md:h-11 lg:w-14 lg:h-14 object-contain z-30 transform rotate-12 drop-shadow-[0_0_6px_rgba(255,255,255,0.4)] select-none pointer-events-none"
        />
      )}

      {/* Image container */}
      <div className="relative w-full flex-1 flex items-center justify-center overflow-hidden mb-1 md:mb-2">
        {isTexturing ? (
          <>
            {/* Base Character Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc}
              alt={`${title} Base`}
              className="absolute max-h-full max-w-full object-contain bottom-0 select-none pointer-events-none"
            />
            {/* Glowing Character Overlay (Reversed initial clipPath) */}
            {glowImageSrc && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={glowImageSrc}
                alt={`${title} Glow`}
                className="paint-glow absolute max-h-full max-w-full object-contain bottom-0 select-none pointer-events-none z-10"
                style={{ clipPath: "inset(100% 0% 0% 0%)" }}
              />
            )}
            {/* Scanning Laser Line */}
            <div className="scan-line absolute left-0 right-0 h-[2px] bg-cyan-400 shadow-[0_0_8px_#22d3ee,0_0_15px_#22d3ee] z-20 pointer-events-none opacity-0" />
          </>
        ) : (
          /* Standard Character Image */
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageSrc}
            alt={title}
            className="absolute max-h-full max-w-full object-contain bottom-0 select-none pointer-events-none transition-transform duration-500 hover:scale-105"
          />
        )}
      </div>

      {/* Label section */}
      <div className="relative z-10 w-full text-center border-t border-white/10 pt-1 md:pt-2">
        <span className="block font-display font-extrabold text-[8px] md:text-xs lg:text-sm tracking-wider text-white uppercase">
          {title}
        </span>
      </div>
    </div>
  );
}
