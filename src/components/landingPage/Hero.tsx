"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FaTelegramPlane, FaChevronDown } from "react-icons/fa";
import Button from "../ui/button/Button";

gsap.registerPlugin(useGSAP);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleBgRef = useRef<HTMLDivElement>(null);
  const avatarCardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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

    gsap.from(avatarCardRef.current, {
      scale: 0.85,
      opacity: 0,
      duration: 1.5,
      ease: "elastic.out(1, 0.75)",
      delay: 0.6,
    });

    // Orbit animation for decorative rings around the avatar container
    gsap.to(".avatar-orbit", {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "linear",
    });

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[92vh] flex flex-col items-center justify-center bg-background text-foreground overflow-hidden py-12 px-4 sm:px-6 lg:px-8 border-b border-border"
    >
      {/* Giant Background Text */}
      <div 
        ref={titleBgRef}
        className="absolute top-[18%] font-display font-black text-[12vw] tracking-tight leading-none text-foreground/5 dark:text-foreground/[0.03] select-none pointer-events-none text-center"
      >
        ZILLA_H3
      </div>

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      {/* Main Hero Grid */}
      <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Copywriting */}
        <div 
          ref={contentRef}
          className="lg:col-span-6 flex flex-col text-center lg:text-left items-center lg:items-start space-y-6"
        >
          <div className="hero-fade-up inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-semibold uppercase tracking-wider">
            ✨ VRChat Avatar Creator
          </div>
          
          <h1 className="hero-fade-up text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05]">
            Premium Virtual <br />
            <span className="text-primary transition-colors duration-300">Identity Design</span>
          </h1>
          
          <p className="hero-fade-up lead text-muted-foreground text-base sm:text-lg max-w-lg">
            Specializing in high-fidelity VRChat avatar creation, custom texturing, detailed clothing adaptions, and full rigging optimization. Let’s make you standout in the virtual worlds.
          </p>
          
          <div className="hero-fade-up flex flex-wrap gap-4 justify-center lg:justify-start pt-2">
            <Button 
              variant="primary" 
              size="lg" 
              onClick={() => window.open("https://t.me/zilla_h3", "_blank")}
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

        {/* Right Side: Showcase Illustration / Mock Graphic */}
        <div className="lg:col-span-6 flex justify-center items-center">
          <div 
            ref={avatarCardRef}
            className="relative w-72 h-96 sm:w-80 sm:h-[450px] rounded-3xl bg-card border border-border shadow-xl dark:shadow-[0_15px_40px_rgba(0,0,0,0.5)] flex items-center justify-center p-8 overflow-hidden group"
          >
            {/* Soft Glowing Orbs in Background */}
            <div className="absolute top-[20%] left-[20%] w-48 h-48 rounded-full bg-primary/10 dark:bg-primary/20 blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute bottom-[20%] right-[10%] w-40 h-40 rounded-full bg-secondary/15 dark:bg-secondary/10 blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />

            {/* Orbiting Ring Decoration */}
            <div className="avatar-orbit absolute w-[360px] h-[360px] border border-dashed border-foreground/10 rounded-full pointer-events-none flex items-center justify-center">
              <div className="absolute top-0 w-3.5 h-3.5 rounded-full bg-primary" />
              <div className="absolute bottom-0 w-2.5 h-2.5 rounded-full bg-secondary" />
            </div>

            {/* Stylized Avatar Illustration */}
            <div className="relative w-full h-full border border-border/60 bg-background/50 backdrop-blur-sm rounded-2xl p-6 flex flex-col justify-between items-center transition-all duration-300 group-hover:border-primary/40 group-hover:bg-background/80 shadow-inner">
              
              {/* Header inside Card */}
              <div className="w-full flex justify-between items-center text-xs text-muted-foreground font-semibold">
                <span className="tracking-widest uppercase">Zilla Model v3.2</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-mono">
                  Ready
                </span>
              </div>

              {/* Silhouette Avatar Graphic */}
              <div className="relative w-40 h-40 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-primary/5 dark:bg-primary/10 animate-pulse border border-primary/20" />
                
                {/* SVG Silhouette with Premium Design Elements */}
                <svg
                  viewBox="0 0 100 100"
                  className="w-28 h-28 text-foreground/80 dark:text-foreground/90 transition-transform duration-500 group-hover:scale-105"
                  fill="currentColor"
                >
                  <path d="M50 15c-8.3 0-15 6.7-15 15s6.7 15 15 15 15-6.7 15-15-6.7-15-15-15zm-22.5 45c-4.1 0-7.5 3.4-7.5 7.5v12.5c0 2.8 2.2 5 5 5h50c2.8 0 5-2.2 5-5V67.5c0-4.1-3.4-7.5-7.5-7.5H27.5z" />
                </svg>
              </div>

              {/* Specs Tags */}
              <div className="w-full space-y-2">
                <div className="text-center font-display font-bold text-sm text-foreground">
                  H3 Optimus Rex
                </div>
                <div className="flex flex-wrap gap-1.5 justify-center">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-muted text-muted-foreground border border-border">
                    VRChat SDK3
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-muted text-muted-foreground border border-border">
                    Quest-Ready
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20">
                    PhysBones
                  </span>
                </div>
              </div>
            </div>

          </div>
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
