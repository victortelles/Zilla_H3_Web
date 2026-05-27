"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaChevronRight, FaStar, FaProjectDiagram } from "react-icons/fa";
import Button from "../ui/button/Button";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ProjectItem {
  id: string;
  name: string;
  creator: string;
  gradientClass: string;
  polyCount: string;
  tags: string[];
}

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const creations: ProjectItem[] = [
    {
      id: "nexus-wolf",
      name: "Nexus Wolf",
      creator: "ZILLA_H3",
      gradientClass: "from-blue-600/20 via-purple-600/10 to-transparent",
      polyCount: "68,000 Polys",
      tags: ["PhysBones", "Custom Armor", "Glow Maps"],
    },
    {
      id: "viper-synth",
      name: "Viper Synth",
      creator: "ZILLA_H3",
      gradientClass: "from-emerald-600/20 via-teal-600/10 to-transparent",
      polyCount: "54,200 Polys",
      tags: ["Quest Ready", "Full Body", "Audio Link"],
    },
    {
      id: "cyber-kitsune",
      name: "Cyber Kitsune",
      creator: "ZILLA_H3",
      gradientClass: "from-rose-600/20 via-amber-600/10 to-transparent",
      polyCount: "70,500 Polys",
      tags: ["PhysBones", "Tail Physics", "Toggles"],
    },
  ];

  useGSAP(() => {
    // Staggered reveal for gallery cards
    gsap.from(".gallery-card-anim", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
    });

  }, { scope: containerRef });

  return (
    <section 
      id="gallery" 
      ref={containerRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-card border-b border-border overflow-hidden"
    >
      {/* Decorative Orbs */}
      <div className="absolute left-[-5%] top-[20%] w-[350px] h-[350px] rounded-full bg-primary/5 dark:bg-primary/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <span className="text-primary font-bold text-xs uppercase tracking-widest block">
            Recent Creations
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
            Featured Avatar Gallery
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Take a look at some of the customized avatars developed, texture-painted, and optimized for VRChat.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {creations.map((project) => (
            <div 
              key={project.id}
              className="gallery-card-anim group flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-background p-4 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Graphic Display */}
              <div className={`relative aspect-square w-full rounded-2xl bg-gradient-to-tr ${project.gradientClass} border border-border/60 flex items-center justify-center overflow-hidden mb-5`}>
                {/* Visual Mesh Tag */}
                <div className="absolute top-3 left-3 p-1.5 rounded-lg bg-background/80 backdrop-blur-md border border-border/60 flex items-center gap-1 text-[10px] font-bold text-foreground">
                  <FaStar className="text-amber-500 w-3 h-3" /> Featured
                </div>

                {/* SVG Silhouette representation */}
                <svg
                  viewBox="0 0 100 100"
                  className="w-24 h-24 text-muted-foreground/30 dark:text-muted-foreground/20 group-hover:scale-105 transition-transform duration-500"
                  fill="currentColor"
                >
                  <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
                  <path d="M50 25c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zm-14 36c-3.3 0-6 2.7-6 6v4h40v-4c0-3.3-2.7-6-6-6H36z" />
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
          <div className="gallery-card-anim flex flex-col justify-between items-center text-center p-6 border border-dashed border-primary/45 rounded-3xl bg-primary/[0.02] hover:bg-primary/[0.04] transition-colors duration-300">
            <div className="flex-1 flex flex-col items-center justify-center space-y-4">
              <div className="p-4 bg-primary/10 border border-primary/20 text-primary rounded-2xl">
                <FaProjectDiagram className="w-8 h-8" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-display font-bold text-xl text-foreground">
                  Explore More
                </h3>
                <p className="font-body text-xs text-muted-foreground leading-relaxed max-w-[200px]">
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
