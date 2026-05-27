"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaTelegramPlane, FaTools, FaCheckCircle, FaStar } from "react-icons/fa";
import Button from "../ui/button/Button";
import StatusBadge from "../ui/statusBadge/StatusBadge";
import { configService } from "@/services/configService";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const commissionStatus = configService.getCommissionStatus();
  const telegramUrl = configService.getContactTelegram();

  useGSAP(() => {
    // Scroll triggered animations
    gsap.from(".about-animate-left", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      },
      x: -50,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: "power3.out",
    });

    gsap.from(".about-animate-right", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      },
      x: 50,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
    });

  }, { scope: containerRef });

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-card border-b border-border overflow-hidden"
    >
      {/* Decorative Orbs */}
      <div className="absolute right-[-10%] top-[10%] w-[350px] h-[350px] rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute left-[-10%] bottom-[10%] w-[350px] h-[350px] rounded-full bg-secondary/5 dark:bg-secondary/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Side: Copywriting */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          <div className="about-animate-left inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
            <FaTools className="w-3.5 h-3.5" /> Who is Zilla_H3?
          </div>
          
          <h2 className="about-animate-left text-3xl sm:text-4xl font-black tracking-tight leading-tight">
            Crafting Digital Identities <br />
            For The Metaverse
          </h2>
          
          <p className="about-animate-left text-muted-foreground leading-relaxed text-base sm:text-lg">
            I am a dedicated virtual designer specializing in custom VRChat avatar creations and texturing. With extensive experience in Unity setup, avatar physics (PhysBones), and clothing adaptations, I transform conceptual styles into fully optimized 3D digital creations.
          </p>

          {/* Checklist */}
          <div className="about-animate-left grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {[
              "Highly optimized VRChat models",
              "Unity setup & packaging ready",
              "Clean custom UV mapping",
              "Accessory rigging & weighting",
              "Dynamic PhysBones settings",
              "Quest compatibility exports",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-foreground/80 font-medium">
                <FaCheckCircle className="text-primary h-4.5 w-4.5 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="about-animate-left pt-4">
            <Button 
              variant="primary" 
              size="lg" 
              onClick={() => window.open(telegramUrl, "_blank")}
              className="gap-2"
            >
              <FaTelegramPlane className="w-4 h-4" /> Message me on Telegram
            </Button>
          </div>
        </div>

        {/* Right Side: Creator Image Box & Commission Status */}
        <div className="about-animate-right lg:col-span-5 flex flex-col items-center">
          
          {/* Creator Profile Representation Card */}
          <div className="relative w-full max-w-sm rounded-3xl overflow-hidden border border-border bg-background p-4 shadow-lg transition-transform duration-300 hover:scale-[1.01]">
            {/* Header / Graphic Representation */}
            <div className="relative aspect-square w-full rounded-2xl bg-card border border-border/80 flex items-center justify-center overflow-hidden mb-5 group">
              {/* Backglow mesh */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-secondary/5 to-transparent opacity-60 group-hover:scale-105 transition-transform duration-700" />
              
              {/* Overlay elements */}
              <div className="absolute top-4 left-4 p-2 rounded-xl bg-background/80 backdrop-blur-md border border-border/60 flex items-center gap-1.5 text-xs font-bold text-foreground">
                <FaStar className="text-amber-500" /> Lead Artist
              </div>

              {/* Character mockup SVG / Avatar Graphic */}
              <svg 
                viewBox="0 0 100 100" 
                className="w-44 h-44 text-muted-foreground/30 dark:text-muted-foreground/20 group-hover:scale-105 transition-transform duration-500"
                fill="currentColor"
              >
                <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                <path d="M50 20c-7.2 0-13 5.8-13 13 0 5.2 3.1 9.7 7.5 11.8v10.2h11V44.8c4.4-2.1 7.5-6.6 7.5-11.8 0-7.2-5.8-13-13-13zm-17 48c-4.4 0-8 3.6-8 8v6c0 1.1.9 2 2 2h46c1.1 0 2-.9 2-2v-6c0-4.4-3.6-8-8-8H33z" />
              </svg>
            </div>

            {/* Availability Container underneath */}
            <div className="w-full bg-card/60 border border-border/80 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-col text-center sm:text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Availability State
                </span>
                <span className="text-sm font-display font-bold text-foreground mt-0.5">
                  Commission Status
                </span>
              </div>
              <StatusBadge status={commissionStatus} />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
