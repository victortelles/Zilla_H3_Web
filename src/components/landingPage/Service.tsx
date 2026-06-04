"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaPaintBrush, FaCrown, FaTshirt, FaRunning, FaHammer, FaEye } from "react-icons/fa";
import { ServiceItem } from "@/types/landingPage/service";
import Lightbox from "@/components/ui/lightbox/Lightbox";
import "@/styles/services.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Service() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const services: ServiceItem[] = [
    {
      id: "texturing",
      icon: <FaPaintBrush className="w-8 h-8 text-primary" />,
      title: "Avatar Texturing",
      desc: "Tailored custom maps (Albedo, Normal, Metallic, Roughness) designed to give your avatar distinct personality and texture fidelity.",
      bgColor: "bg-primary/5 border-primary/20",
      image: "/resources/services/ATexturing.png",
    },
    {
      id: "accessories",
      icon: <FaCrown className="w-8 h-8 text-amber-500" />,
      title: "Accessory Integration",
      desc: "Weighting, rigging, and parenting wings, weapons, glasses, and dynamic jewelry perfectly mapped to your avatar's bone structure.",
      bgColor: "bg-amber-500/5 border-amber-500/20",
      image: "/resources/services/AIntegration.png",
    },
    {
      id: "clothing",
      icon: <FaTshirt className="w-8 h-8 text-emerald-500" />,
      title: "Clothing Adaptation",
      desc: "Refitting external garments, shirts, hoodies, shoes, and armor to seamlessly match your specific base model with zero mesh clip.",
      bgColor: "bg-emerald-500/5 border-emerald-500/20",
      image: "/resources/services/CAdaptation.png",
    },
    {
      id: "physics",
      icon: <FaRunning className="w-8 h-8 text-rose-500" />,
      title: "PhysBones Setup",
      desc: "Optimized physics configuration for hair, ears, tail, breasts, and cloth elements to ensure fluid, realistic in-game movements.",
      bgColor: "bg-rose-500/5 border-rose-500/20",
      image: "/resources/services/BSetup.png",
    },
    {
      id: "re-sculpt",
      icon: <FaHammer className="w-8 h-8 text-purple-500" />,
      title: "Re-sculpts",
      desc: "Custom mesh edits, facial expression adjustments, shape keys, and body proportion tuning to reshape your avatar exactly as you envision.",
      bgColor: "bg-purple-500/5 border-purple-500/20",
    },
  ];

  useGSAP(() => {
    if (!containerRef.current || !trackRef.current) return;

    const track = trackRef.current;
    const container = containerRef.current;

    // Use MatchMedia to toggle pinning based on screen width
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // Pin the outer container and scroll the inner track horizontally
      const pinTrigger = gsap.to(track, {
        x: () => -(track.offsetWidth - container.offsetWidth),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => "+=" + Math.max(1200, window.innerHeight * 1.5),
          invalidateOnRefresh: true,
        },
      });

      // Animate card internal images slightly on scroll (Parallax effect)
      gsap.utils.toArray<HTMLElement>(".parallax-img").forEach((img) => {
        gsap.to(img, {
          xPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            containerAnimation: pinTrigger,
            start: "left right",
            end: "right left",
            scrub: true,
          },
        });
      });

      return () => {
        // Cleanup ScrollTriggers
        ScrollTrigger.getAll().forEach(t => t.kill());
      };
    });

    // Clean up media queries on unmount
    return () => mm.revert();

  }, { scope: containerRef });

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative bg-background border-b border-border overflow-hidden lg:h-screen flex flex-col justify-center py-20 lg:py-0"
    >
      {/* Background decoration */}
      <div className="absolute right-[-5%] bottom-[10%] w-[400px] h-[400px] rounded-full bg-secondary/5 dark:bg-secondary/5 blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-12 md:mb-16 text-left">
        <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-2">
          Specializations
        </span>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-none text-foreground">
          My services
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base mt-3 max-w-xl">
          Here is a breakdown of the specific modifications and design services I provide for VRChat & custom avatar creators.
        </p>
      </div>

      {/* Scroll Wrapper */}
      <div className="services-scroll-wrapper w-full overflow-x-auto lg:overflow-x-hidden scrollbar-none">
        <div
          ref={trackRef}
          className="services-horizontal-track pb-6 md:pb-0"
        >
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`service-card-item rounded-3xl border bg-card p-8 flex flex-col justify-between h-[360px] md:h-[400px] shadow-sm hover:shadow-md hover:border-primary/30 transition-all ${service.bgColor}`}
            >
              {/* Card Header */}
              <div className="flex justify-between items-start">
                <div className="p-4 bg-background border border-border rounded-2xl shadow-inner">
                  {service.icon}
                </div>
                <span className="font-mono text-5xl font-black text-foreground/10 select-none">
                  0{index + 1}
                </span>
              </div>

              {/* Card Description */}
              <div className="space-y-3">
                <h3 className="font-display font-bold text-xl sm:text-2xl text-foreground">
                  {service.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {service.desc}
                </p>
              </div>

              {/* Custom SVG Graphic Grid mimicking avatar specs / Example Button */}
              <div className="w-full h-12 rounded-xl bg-background/50 border border-border/80 p-2 flex items-center justify-between overflow-hidden">
                <div className="flex gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                  <span className="h-1.5 w-1.5 rounded-full bg-foreground/20" />
                </div>
                {service.image ? (
                  <button
                    onClick={() => setActiveImage(service.image || null)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border border-primary text-primary hover:bg-primary/10 bg-transparent transition-all active:scale-95 cursor-pointer"
                  >
                    <FaEye className="w-3.5 h-3.5" />
                    <span>Example</span>
                  </button>
                ) : (
                  <div className="text-[10px] font-mono text-muted-foreground select-none pr-1">
                    No preview available
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Lightbox
        isOpen={activeImage !== null}
        imageSrc={activeImage}
        onClose={() => setActiveImage(null)}
      />
    </section>
  );
}
