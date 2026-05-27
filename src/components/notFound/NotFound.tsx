"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FaHome } from "react-icons/fa";
import Navbar from "../ui/navbar/Navbar";
import Footer from "../ui/footer/Footer";

gsap.registerPlugin(useGSAP);

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const invincibleRef = useRef<HTMLImageElement>(null);
  const isAnimatingRef = useRef(false);

  useGSAP(() => {
    // Glitch animation loop for 404 text
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });

    tl.to(".glitch-text-red", {
      clipPath: "inset(40% 0 61% 0)",
      x: -5,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    })
      .to(".glitch-text-blue", {
        clipPath: "inset(92% 0 1% 0)",
        x: 5,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
      }, 0.1)
      .to(".glitch-text-main", {
        skewX: 10,
        duration: 0.05,
        yoyo: true,
        repeat: 1,
      }, 0.2)
      .to([".glitch-text-red", ".glitch-text-blue"], {
        clipPath: "inset(0 0 0 0)",
        x: 0,
        duration: 0.05,
      }, 0.3)
      .to(".glitch-text-main", {
        skewX: 0,
        duration: 0.05,
      }, 0.3);

    // Random mini glitches
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.4) {
        gsap.to(".glitch-text-red", {
          x: gsap.utils.random(-8, 8),
          y: gsap.utils.random(-4, 4),
          duration: 0.05,
          yoyo: true,
          repeat: 1,
        });
        gsap.to(".glitch-text-blue", {
          x: gsap.utils.random(-8, 8),
          y: gsap.utils.random(-4, 4),
          duration: 0.05,
          yoyo: true,
          repeat: 1,
        });
      }
    }, 350);

    // Invincible Easter Egg
    const triggerEasterEgg = () => {
      if (isAnimatingRef.current || !invincibleRef.current || !containerRef.current) return;

      isAnimatingRef.current = true;
      const mainWidth = containerRef.current.clientWidth || window.innerWidth;
      const imgWidth = invincibleRef.current.clientWidth || 500;

      const easterEggTl = gsap.timeline({
        onComplete: () => {
          isAnimatingRef.current = false;
          gsap.set(invincibleRef.current, { x: 0, opacity: 0 });
        }
      });

      easterEggTl.set(invincibleRef.current, { x: 0, opacity: 0 })
        .to(invincibleRef.current, {
          opacity: 0.5,
          duration: 0.8,
        })
        .to(invincibleRef.current, {
          x: -(mainWidth + imgWidth),
          duration: 8,
          ease: "linear",
        }, 0)
        .to(invincibleRef.current, {
          opacity: 0,
          duration: 0.8,
        }, "-=0.8");
    };

    // Check every 24 seconds with 10% chance of appearing
    const easterEggInterval = setInterval(() => {
      if (Math.random() < 0.10) {
        triggerEasterEgg();
      }
    }, 24000);

    return () => {
      clearInterval(glitchInterval);
      clearInterval(easterEggInterval);
    };
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col bg-primary text-primary-foreground">
      <Navbar />

      <main className="relative flex-1 flex flex-col items-center justify-center overflow-hidden px-4 py-20 text-center">
        {/* Grid Background Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40 pointer-events-none z-0" />

        {/* Ambient glow */}
        <div className="absolute w-[350px] h-[350px] rounded-full bg-white/10 blur-[100px] pointer-events-none z-0 animate-pulse" />

        {/* Invincible Easter Egg Image */}
        <img
          ref={invincibleRef}
          src="/resources/404/invencible.png"
          alt="Invincible Easter Egg"
          className="absolute bottom-0 left-full h-[35vh] md:h-[50vh] w-auto object-contain opacity-0 pointer-events-none select-none z-[2]"
        />

        <div className="relative z-10 space-y-8 max-w-lg mx-auto">
          {/* Glitch 404 Heading */}
          <div className="relative inline-block select-none">
            <h1
              ref={titleRef}
              className="glitch-text-main font-display font-black text-8xl md:text-9xl tracking-tighter leading-none"
            >
              404
            </h1>

            {/* Cloned Layers for glitch effect */}
            <h1 className="glitch-text-red absolute inset-0 font-display font-black text-8xl md:text-9xl tracking-tighter leading-none text-secondary opacity-70 pointer-events-none z-10 select-none mix-blend-screen">
              404
            </h1>
            <h1 className="glitch-text-blue absolute inset-0 font-display font-black text-8xl md:text-9xl tracking-tighter leading-none text-accent opacity-70 pointer-events-none z-20 select-none mix-blend-screen">
              404
            </h1>
          </div>

          <div className="space-y-3">
            <h2 className="font-display font-bold text-2xl md:text-3xl tracking-tight uppercase">
              ERROR: PAGE LOST IN THE METAVERSE
            </h2>
            <p className="font-body text-sm md:text-base text-primary-foreground/80 leading-relaxed max-w-md mx-auto">
              The coordinate you followed has collapsed or been de-allocated. Ensure the address is correct or jump back to reality.
            </p>
          </div>

          <div className="pt-4 flex justify-center">
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary-foreground px-6 text-sm font-bold text-primary hover:bg-primary-foreground/90 transition-all shadow-md active:scale-95 z-10"
            >
              <FaHome className="w-4 h-4" /> Return Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
