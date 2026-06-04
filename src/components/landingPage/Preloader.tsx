"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { PreloaderProps } from "@/types/landingPage/Preloader.types";
import PreloaderBackground from "./Preloader/PreloaderBackground";
import PreloaderLogo from "./Preloader/PreloaderLogo";
import PreloaderCard from "./Preloader/PreloaderCard";

gsap.registerPlugin(useGSAP);

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

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

    // 1. Initial State: clouds fade-in, icons float, card badge hidden
    tl.set([".logo-zilla", ".logo-h3"], { x: 0 })
      .set(".logo-underscore", { opacity: 0, scale: 0 })
      .set(".preloader-cloud", { opacity: 0, scale: 0.8 })
      .set(".preloader-icon", { opacity: 0, y: 30 })
      .set(".gallery-box", { opacity: 0, scale: 0.5, y: 50 })
      .set(".badge-pop", { opacity: 0, scale: 0 });

    // 2. Animate clouds and icons
    tl.to(".preloader-cloud", {
      opacity: 0.65,
      scale: 1,
      duration: 1.5,
      stagger: 0.2,
      ease: "power2.out",
    }, 0.2)
      .to(".preloader-icon", {
        opacity: 0.25,
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
    tl.to(".logo-zilla", {
      x: -25,
      duration: 1,
      ease: "power3.inOut",
    }, 1.2)
      .to(".logo-h3", {
        x: 25,
        duration: 1,
        ease: "power3.inOut",
      }, 1.2);

    // Reveal the underscore in the middle
    tl.to(".logo-underscore", {
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

    // Audio link scan animation for the first card (Texturing) - Reversed (bottom to top)
    tl.fromTo(".scan-line", {
      top: "100%",
      opacity: 0
    }, {
      opacity: 1,
      duration: 0.1
    }, 2.3)
      .to(".scan-line", {
        top: "0%",
        duration: 1.6,
        ease: "power1.inOut"
      }, 2.3)
      .to(".scan-line", {
        opacity: 0,
        duration: 0.2
      }, 3.9);

    tl.fromTo(".paint-glow", {
      clipPath: "inset(100% 0% 0% 0%)"
    }, {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1.6,
      ease: "power1.inOut"
    }, 2.3);

    // Pop animation for the Custom card badge (FuralityUltra) as the card settles
    tl.to(".badge-pop", {
      opacity: 1,
      scale: 2,
      duration: 0.5,
      ease: "back.out(2.5)",
    }, 2.9);

    // Standalone looping pulse for the glowing audio-link texture
    gsap.to(".paint-glow", {
      opacity: 0.5,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 3.9
    });

    // Keep cards displayed briefly before final exit
    tl.to(".gallery-box", {
      opacity: 0,
      scale: 0.8,
      y: -30,
      duration: 0.6,
      stagger: 0.08,
      ease: "power2.in",
    }, 4.2)
      .to(".logo-text", {
        scale: 1.1,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
      }, 4.5);

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-primary text-primary-foreground overflow-hidden select-none"
    >
      <PreloaderBackground />

      <PreloaderLogo />

      {/* Staggered showcase cards representing creations */}
      <div
        className="absolute bottom-[8%] left-1/2 translate-x-[-50%] flex -space-x-2 md:space-x-4 lg:space-x-6 z-10 w-auto px-4 justify-center items-center overflow-visible"
      >
        <PreloaderCard
          title="Texturing"
          imageSrc="/resources/pre-loader/C_paint_1.png"
          glowImageSrc="/resources/pre-loader/C_paint_2.png"
          isTexturing={true}
        />
        <PreloaderCard
          title="Clothing"
          imageSrc="/resources/pre-loader/C_Clothes.png"
        />
        <PreloaderCard
          title="Bones"
          imageSrc="/resources/pre-loader/C_accessory.png"
        />
        <PreloaderCard
          title="Physics"
          imageSrc="/resources/pre-loader/C_Physics.png"
        />
        <PreloaderCard
          title="Custom"
          imageSrc="/resources/pre-loader/C_custom.png"
          badgeSrc="/resources/pre-loader/FuralityUltra.webp"
        />
      </div>
    </div>
  );
}
