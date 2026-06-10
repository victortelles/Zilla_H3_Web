"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaChevronRight, FaStar, FaProjectDiagram } from "react-icons/fa";
import Button from "../ui/button/Button";
import { useRouter } from "next/navigation";
import { GalleryCard } from "@/components/project";
import { Project } from "@/types/project/Project.types";
import EmptyState from "@/components/ui/emptyState/EmptyState";
import "@/styles/gallery.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SkeletonCard = () => (
  <div className="gallery-card-item rounded-3xl border border-border bg-card p-4 shadow-sm animate-pulse flex flex-col justify-between min-h-[360px] md:min-h-[400px]">
    <div className="relative aspect-[4/3] w-full rounded-2xl bg-muted border border-border/60 overflow-hidden flex items-center justify-center">
      <div className="w-12 h-12 rounded-full bg-border" />
    </div>
    <div className="space-y-4 mt-4 text-left">
      <div className="space-y-2">
        <div className="h-3 w-1/3 bg-muted rounded animate-pulse" />
        <div className="h-5 w-2/3 bg-muted rounded animate-pulse" />
      </div>
      <div className="flex gap-2">
        <div className="h-4 w-12 bg-muted rounded animate-pulse" />
        <div className="h-4 w-16 bg-muted rounded animate-pulse" />
      </div>
    </div>
  </div>
);

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // Sort by newest first
          data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          setProjects(data);
        }
      })
      .catch((err) => console.error("Failed to load projects for gallery:", err))
      .finally(() => setLoading(false));
  }, []);

  const featuredProjects = projects.filter((p) => p.featured).slice(0, 5);

  useGSAP(() => {
    if (loading || !containerRef.current || !trackRef.current) return;

    const track = trackRef.current;
    const container = containerRef.current;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      if (featuredProjects.length === 0) return;

      // Pin the Gallery container and slide horizontally
      gsap.to(track, {
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

      // Force ScrollTrigger refresh to ensure calculations are correct
      ScrollTrigger.refresh();

      return () => {
        ScrollTrigger.getAll().forEach(t => t.kill());
      };
    });

    return () => mm.revert();
  }, { dependencies: [loading, featuredProjects.length], scope: containerRef });

  return (
    <section
      id="gallery"
      ref={containerRef}
      className="relative bg-background border-b border-border overflow-hidden lg:h-screen flex flex-col justify-center py-20 lg:py-0"
    >
      {/* Decorative Orb */}
      <div className="absolute left-[-5%] top-[20%] w-[350px] h-[350px] rounded-full bg-primary/5 dark:bg-primary/5 blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-12 md:mb-16 text-left z-10">
        <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-2 font-body">
          Recent Creations
        </span>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-none text-foreground font-display uppercase">
          Featured Avatar Gallery
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base mt-3 max-w-xl font-body leading-relaxed">
          Take a look at some of the customized avatars developed, texture-painted, and optimized for VRChat.
        </p>
      </div>

      {/* Main Content Area */}
      {!loading && featuredProjects.length === 0 ? (
        <EmptyState
          title="Gallery is Empty"
          description="We are currently designing and texturing custom models for our next release. Stay tuned for new showcases, wireframes, and optimized builds!"
          tagText="Creations in Progress"
        />
      ) : (
        /* Scroll Wrapper */
        <div className="gallery-scroll-wrapper w-full overflow-x-auto lg:overflow-x-hidden scrollbar-none z-10">
          <div
            ref={trackRef}
            className="gallery-horizontal-track pb-6 md:pb-0"
          >
            {loading ? (
              /* Loading Skeletons */
              Array.from({ length: 3 }).map((_, idx) => (
                <SkeletonCard key={idx} />
              ))
            ) : (
              /* Render Projects (Up to 5 featured) */
              featuredProjects.map((project, index) => (
                <GalleryCard
                  key={project.id || index}
                  project={project}
                  className="gallery-card-item h-fit min-h-[360px] md:min-h-[400px]"
                />
              ))
            )}

            {/* Call-to-action Card (View All Projects) */}
            <div className="gallery-card-item flex flex-col justify-between items-center text-center p-6 border border-dashed border-primary/45 rounded-3xl bg-primary/[0.02] hover:bg-primary/[0.04] transition-colors duration-300 min-h-[360px] md:min-h-[400px]">
              <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                <div className="p-4 bg-primary/10 border border-primary/20 text-primary rounded-2xl">
                  <FaProjectDiagram className="w-8 h-8" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-display font-bold text-xl text-foreground uppercase tracking-tight">
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
                className="w-full gap-2 mt-4 font-body font-bold text-xs uppercase tracking-wider"
              >
                View Projects <FaChevronRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
