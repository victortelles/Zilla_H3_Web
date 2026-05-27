"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaChevronRight, FaStar, FaProjectDiagram } from "react-icons/fa";
import Button from "../ui/button/Button";
import { useRouter } from "next/navigation";
import { ProjectItem } from "@/types/landingPage/gallery";
import "@/styles/gallery.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const creations: ProjectItem[] = [
    {
      id: "nexus-wolf",
      name: "Nexus Wolf",
      creator: "ZILLA_H3",
      gradientClass: "from-[#2c319d]/20 via-[#2c319d]/5 to-transparent",
      polyCount: "68K Polys",
      tags: ["PhysBones", "Custom Armor", "Glow Maps"],
    },
    {
      id: "viper-synth",
      name: "Viper Synth",
      creator: "ZILLA_H3",
      gradientClass: "from-emerald-500/10 via-emerald-500/[0.02] to-transparent",
      polyCount: "54K Polys",
      tags: ["Quest Ready", "Full Body", "Audio Link"],
    },
    {
      id: "cyber-kitsune",
      name: "Cyber Kitsune",
      creator: "ZILLA_H3",
      gradientClass: "from-rose-500/15 via-rose-500/[0.02] to-transparent",
      polyCount: "70K Polys",
      tags: ["PhysBones", "Tail Physics", "Toggles"],
    },
    {
      id: "primal-seraph",
      name: "Primal Seraph",
      creator: "ZILLA_H3",
      gradientClass: "from-amber-500/15 via-amber-500/[0.02] to-transparent",
      polyCount: "82K Polys",
      tags: ["Quest Ready", "Custom Rig", "Gogo Loco"],
    },
  ];

  useGSAP(() => {
    if (!containerRef.current || !trackRef.current) return;

    const track = trackRef.current;
    const container = containerRef.current;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const scrollAmount = track.offsetWidth - container.offsetWidth;

      // Pin the Gallery container and slide horizontally
      gsap.to(track, {
        x: -scrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${scrollAmount * 2.2}`,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        ScrollTrigger.getAll().forEach(t => t.kill());
      };
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section
      id="gallery"
      ref={containerRef}
      className="relative bg-background border-b border-border overflow-hidden md:h-screen flex flex-col justify-center py-20 md:py-0"
    >
      {/* Decorative Orb */}
      <div className="absolute left-[-5%] top-[20%] w-[350px] h-[350px] rounded-full bg-primary/5 dark:bg-primary/5 blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-12 md:mb-16 text-left">
        <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-2">
          Recent Creations
        </span>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-none text-foreground">
          Featured Avatar Gallery
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base mt-3 max-w-xl">
          Take a look at some of the customized avatars developed, texture-painted, and optimized for VRChat.
        </p>
      </div>

      {/* Scroll Wrapper */}
      <div className="gallery-scroll-wrapper w-full overflow-x-auto md:overflow-x-hidden scrollbar-none">
        <div 
          ref={trackRef}
          className="gallery-horizontal-track pb-6 md:pb-0"
        >
          {creations.map((project) => (
            <div
              key={project.id}
              className="gallery-card-item rounded-3xl border border-border bg-card p-4 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 flex flex-col justify-between h-[360px] md:h-[400px]"
            >
              {/* Graphic Display with Placeholder simulating actual avatars */}
              <div className={`relative aspect-square w-full rounded-2xl bg-gradient-to-tr ${project.gradientClass} border border-border/60 flex items-center justify-center overflow-hidden mb-4 group/card`}>
                
                {/* Tech wireframe lines overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:1rem_1rem] opacity-35" />
                
                <div className="absolute top-3 left-3 p-1.5 rounded-lg bg-background/80 backdrop-blur-md border border-border/60 flex items-center gap-1 text-[10px] font-bold text-foreground">
                  <FaStar className="text-amber-500 w-3 h-3" /> Featured Build
                </div>

                {/* SVG Silhouette representation / Technical Wireframe Model Placeholder */}
                <svg
                  viewBox="0 0 100 100"
                  className="w-24 h-24 text-foreground/20 dark:text-foreground/10 group-hover/card:scale-105 transition-transform duration-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.75"
                >
                  <circle cx="50" cy="50" r="30" strokeDasharray="2 2" />
                  <polygon points="50,15 25,40 50,65 75,40" />
                  <line x1="50" y1="15" x2="50" y2="65" />
                  <line x1="25" y1="40" x2="75" y2="40" />
                  <circle cx="50" cy="40" r="6" fill="currentColor" className="text-primary/30" />
                </svg>
              </div>

              {/* Information */}
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      By {project.creator}
                    </span>
                    <h3 className="font-display font-bold text-lg text-foreground mt-0.5">
                      {project.name}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-muted border border-border text-foreground">
                    {project.polyCount}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[9px] font-semibold px-2 py-0.5 rounded bg-muted/60 border border-border text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Call-to-action Card (View All Projects) */}
          <div className="gallery-card-item flex flex-col justify-between items-center text-center p-6 border border-dashed border-primary/45 rounded-3xl bg-primary/[0.02] hover:bg-primary/[0.04] transition-colors duration-300 h-[360px] md:h-[400px]">
            <div className="flex-1 flex flex-col items-center justify-center space-y-4">
              <div className="p-4 bg-primary/10 border border-primary/20 text-primary rounded-2xl">
                <FaProjectDiagram className="w-8 h-8" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-display font-bold text-xl text-foreground">
                  Explore More
                </h3>
                <p className="font-body text-xs text-muted-foreground leading-relaxed max-w-[200px] mx-auto">
                  Take a look at the full inventory of public builds and creative custom orders.
                </p>
              </div>
            </div>

            <Button
              variant="primary"
              size="md"
              onClick={() => router.push("/project")}
              className="w-full gap-2 mt-4"
            >
              View Projects <FaChevronRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
