"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FaTelegramPlane, FaChevronDown } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import Button from "../ui/button/Button";
import { configService } from "@/services/configService";

gsap.registerPlugin(useGSAP);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleBgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const telegramProfile = configService.getContactTelegram();

  useGSAP(() => {
    // Entrances for Hero elements
    gsap.from(titleBgRef.current, {
      y: -100,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out",
      delay: 0.1,
    });

    gsap.from(".hero-fade-up", {
      y: 40,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: "power3.out",
      delay: 0.3,
    });

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] flex flex-col items-center justify-center bg-background text-foreground overflow-hidden py-12 px-4 sm:px-6 lg:px-8 border-b border-border"
    >
      {/* Hero Background Images (Light & Dark Switching) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/resources/hero/bg-lightmode-hero.png"
        alt="Hero Background Light"
        className="absolute inset-0 w-full h-full object-cover opacity-[0.25] dark:opacity-0 transition-opacity duration-300 pointer-events-none z-0"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/resources/hero/bg-darkmode-hero.png"
        alt="Hero Background Dark"
        className="absolute inset-0 w-full h-full object-cover opacity-0 dark:opacity-[0.25] transition-opacity duration-300 pointer-events-none z-0"
      />

      {/* Giant Background Text */}
      <div
        ref={titleBgRef}
        className="absolute top-[18%] font-display font-black text-[12vw] tracking-tight leading-none text-foreground/5 dark:text-foreground/[0.03] select-none pointer-events-none text-center z-1"
      >
        ZILLA_ZH3
      </div>

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none z-1" />

      {/* Main Hero centered Layout */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-4xl w-full flex flex-col items-center text-center space-y-6 px-4"
      >
        <div className="hero-fade-up inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-semibold uppercase tracking-wider">
          <HiSparkles className="w-3.5 h-3.5" /> VRChat Avatar Creator
        </div>

        <h1 className="hero-fade-up text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05]">
          Zilla-ZH3 <br />
          <span className="text-primary transition-colors duration-300">Works</span>
        </h1>

        <p className="hero-fade-up lead text-muted-foreground text-base sm:text-xl max-w-2xl leading-relaxed">
          Creating artwork with VRChat avatars, texturing, clothing adaptations, rigging and optimization.
        </p>

        <div className="hero-fade-up flex flex-wrap gap-4 justify-center pt-4">
          <Button
            variant="primary"
            size="lg"
            onClick={() => window.open(telegramProfile, "_blank")}
            className="gap-2"
          >
            <FaTelegramPlane className="w-4 h-4" /> Commission Now
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
          >
            Explore Services
          </Button>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <button
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-6 flex flex-col items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors cursor-pointer select-none"
      >
        <span>Discover Portfolio</span>
        <FaChevronDown className="animate-bounce" />
      </button>
    </section>
  );
}
