"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { 
  FaUserAlt, 
  FaTshirt, 
  FaPaintBrush, 
  FaCrown, 
  FaGamepad, 
  FaStar 
} from "react-icons/fa";
import { PreloaderProps } from "@/types/landingPage/Preloader.types";

gsap.registerPlugin(useGSAP);

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const zillaRef = useRef<HTMLSpanElement>(null);
  const h3Ref = useRef<HTMLSpanElement>(null);
  const underscoreRef = useRef<HTMLSpanElement>(null);
  
  const cloudsRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  // Background icons data
  const backgroundIcons = [
    { Icon: FaUserAlt, size: "text-2xl", top: "15%", left: "10%", delay: 0 },
    { Icon: FaTshirt, size: "text-4xl", top: "25%", left: "75%", delay: 0.5 },
    { Icon: FaPaintBrush, size: "text-3xl", top: "70%", left: "15%", delay: 0.2 },
    { Icon: FaCrown, size: "text-2xl", top: "80%", left: "80%", delay: 0.8 },
    { Icon: FaGamepad, size: "text-5xl", top: "10%", left: "85%", delay: 0.4 },
    { Icon: FaStar, size: "text-xl", top: "60%", left: "90%", delay: 0.6 },
    { Icon: FaStar, size: "text-3xl", top: "45%", left: "8%", delay: 0.3 },
    { Icon: FaUserAlt, size: "text-3xl", top: "85%", left: "45%", delay: 0.7 },
  ];

  useGSAP(() => {
    if (!containerRef.current) return;

    // Timeline setup
    const tl = gsap.timeline({
      onComplete: () => {
        // Trigger completion callback to transition to Hero
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          onComplete: onComplete,
        });
      }
    });

    // 1. Initial State: clouds fade-in, icons float
    tl.set([zillaRef.current, h3Ref.current], { x: 0 })
      .set(underscoreRef.current, { opacity: 0, scale: 0 })
      .set(".preloader-cloud", { opacity: 0, scale: 0.8 })
      .set(".preloader-icon", { opacity: 0, y: 30 })
      .set(".gallery-box", { opacity: 0, scale: 0.5, y: 50 });

    // 2. Animate clouds and icons
    tl.to(".preloader-cloud", {
      opacity: 0.45,
      scale: 1,
      duration: 1.5,
      stagger: 0.2,
      ease: "power2.out",
    }, 0.2)
    .to(".preloader-icon", {
      opacity: 0.15,
      y: 0,
      duration: 1,
      stagger: 0.1,
      ease: "back.out(1.7)",
    }, 0.4);

    // Continuous floating animations for icons
    gsap.to(".preloader-icon", {
      y: "-=20",
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.15,
    });

    // Slow scrolling clouds
    gsap.to(".preloader-cloud-left", {
      x: "+=50",
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
    gsap.to(".preloader-cloud-right", {
      x: "-=50",
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // 3. Name Animation: ZillaH3 -> Zilla_H3
    // Shift 'Zilla' to the left and 'H3' to the right
    tl.to(zillaRef.current, {
      x: -25,
      duration: 1,
      ease: "power3.inOut",
    }, 1.2)
    .to(h3Ref.current, {
      x: 25,
      duration: 1,
      ease: "power3.inOut",
    }, 1.2);

    // Reveal the underscore in the middle
    tl.to(underscoreRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: "back.out(2)",
    }, 1.8);

    // 4. Staggered reveal of preview cards showing Zilla's creations
    tl.to(".gallery-box", {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "back.out(1.2)",
    }, 2.0);

    // Keep cards displayed briefly before final exit
    tl.to(".gallery-box", {
      opacity: 0,
      scale: 0.8,
      y: -30,
      duration: 0.6,
      stagger: 0.08,
      ease: "power2.in",
    }, 4.2)
    .to(textRef.current, {
      scale: 1.1,
      opacity: 0,
      duration: 0.5,
      ease: "power2.in",
    }, 4.5);

  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#f2eee8] text-[#1b1f3b] overflow-hidden select-none"
    >
      {/* Background Sky Icons */}
      <div ref={iconsRef} className="absolute inset-0 pointer-events-none">
        {backgroundIcons.map(({ Icon, size, top, left, delay }, i) => (
          <div
            key={i}
            className="preloader-icon absolute text-primary/30 dark:text-primary/20"
            style={{ top, left, transitionDelay: `${delay}s` }}
          >
            <Icon className={`${size}`} />
          </div>
        ))}
      </div>

      {/* Floating Clouds */}
      <div ref={cloudsRef} className="absolute inset-0 pointer-events-none">
        {/* Left Side Clouds */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="/resources/cloud-01.png" 
          alt="Cloud Left 1" 
          className="preloader-cloud preloader-cloud-left absolute left-[-5%] top-[10%] w-[35%] max-w-[400px] object-contain select-none pointer-events-none"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="/resources/cloud-03.png" 
          alt="Cloud Left 2" 
          className="preloader-cloud preloader-cloud-left absolute left-[-10%] bottom-[15%] w-[45%] max-w-[500px] object-contain select-none pointer-events-none"
        />

        {/* Right Side Clouds */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="/resources/cloud-02.png" 
          alt="Cloud Right 1" 
          className="preloader-cloud preloader-cloud-right absolute right-[-5%] top-[15%] w-[40%] max-w-[450px] object-contain select-none pointer-events-none"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="/resources/cloud-04.png" 
          alt="Cloud Right 2" 
          className="preloader-cloud preloader-cloud-right absolute right-[-8%] bottom-[20%] w-[38%] max-w-[400px] object-contain select-none pointer-events-none"
        />
      </div>

      {/* Name Logo in the Center */}
      <div 
        ref={textRef} 
        className="relative z-10 flex flex-col items-center gap-6"
      >
        <h1 className="font-display font-black text-6xl md:text-8xl tracking-tight flex items-center select-none">
          <span ref={zillaRef} className="inline-block">ZILLA</span>
          <span ref={underscoreRef} className="inline-block text-primary mx-[-12px]">_</span>
          <span ref={h3Ref} className="inline-block">H3</span>
        </h1>
        
        {/* Subtitle */}
        <p className="font-body text-sm md:text-base font-semibold tracking-widest text-muted-foreground uppercase animate-pulse select-none">
          Loading Avatar Creator Portfolio
        </p>
      </div>

      {/* 4-6 Staggered colored showcase boxes representing creations */}
      <div 
        ref={galleryRef}
        className="absolute bottom-[10%] left-1/2 translate-x-[-50%] flex gap-4 md:gap-6 z-10"
      >
        <div className="gallery-box w-16 h-24 md:w-24 md:h-36 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center font-display font-bold text-xs select-none">
          Texturing
        </div>
        <div className="gallery-box w-16 h-24 md:w-24 md:h-36 rounded-xl bg-[#e05638]/20 border border-[#e05638]/30 flex items-center justify-center font-display font-bold text-xs select-none">
          Clothing
        </div>
        <div className="gallery-box w-16 h-24 md:w-24 md:h-36 rounded-xl bg-[#b55409]/20 border border-[#b55409]/30 flex items-center justify-center font-display font-bold text-xs select-none">
          Bones
        </div>
        <div className="gallery-box w-16 h-24 md:w-24 md:h-36 rounded-xl bg-[#2c319d]/20 border border-[#2c319d]/30 flex items-center justify-center font-display font-bold text-xs select-none">
          Physics
        </div>
        <div className="gallery-box w-16 h-24 md:w-24 md:h-36 rounded-xl bg-[#0f0f0f]/10 border border-foreground/10 flex items-center justify-center font-display font-bold text-xs select-none">
          Custom
        </div>
      </div>
    </div>
  );
}
