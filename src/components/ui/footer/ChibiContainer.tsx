"use client";

import React from "react";
import "@/styles/chibi.css";

export default function ChibiContainer() {
  const chibis = [
    { name: "zillon", src: "/resources/chibis/zillon.gif" },
    { name: "darrell", src: "/resources/chibis/darrell.gif" },
    { name: "tyler", src: "/resources/chibis/tyler.gif" },
    { name: "8bits", src: "/resources/chibis/8bits.gif" },
    { name: "jocho", src: "/resources/chibis/jocho.gif" },
  ];

  return (
    <div className="w-full flex items-center justify-between px-6 sm:px-16 md:px-24 py-2 overflow-visible select-none border-t border-border/40">

      {chibis.map((chibi, index) => (
        <div
          key={chibi.name}
          className="animate-chibi-bounce flex flex-col items-center justify-center group relative"
          style={{ animationDelay: `${index * 0.4}s` }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={chibi.src}
            alt={chibi.name}
            className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_4px_6px_rgba(0,0,0,0.12)]"
          />
        </div>
      ))}
    </div>
  );
}
