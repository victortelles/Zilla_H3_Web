"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FaSpinner, FaChevronLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Navbar from "@/components/ui/navbar/Navbar";
import Footer from "@/components/ui/footer/Footer";
import Button from "@/components/ui/button/Button";
import Pagination from "@/components/ui/pagination/Pagination";
import ProjectCard from "./ProjectCard";
import { Project } from "@/types/project/Project.types";
import EmptyState from "@/components/ui/emptyState/EmptyState";

gsap.registerPlugin(useGSAP);

export default function ProjectPortfolio() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const PROJECTS_PER_PAGE = 6;

  const gridRef = useRef<HTMLDivElement>(null);

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
      .catch((err) => console.error("Failed to load projects:", err))
      .finally(() => setLoading(false));
  }, []);

  // Pagination bounds
  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
  const visibleProjects = projects.slice(startIndex, startIndex + PROJECTS_PER_PAGE);

  // Trigger GSAP entrance animation on initial load
  useEffect(() => {
    if (!loading && projects.length > 0) {
      gsap.fromTo(
        ".portfolio-project-card",
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.out",
          delay: 0.1,
        }
      );
    }
  }, [loading, projects.length]);

  // GSAP animation for page changes (Exit Left -> Swap -> Entry Right)
  const handlePageChange = (newPage: number) => {
    if (newPage === currentPage || newPage < 1 || newPage > totalPages) return;

    gsap.to(".portfolio-project-card", {
      x: -40,
      opacity: 0,
      duration: 0.25,
      stagger: 0.03,
      ease: "power2.in",
      onComplete: () => {
        // Swap data in state
        setCurrentPage(newPage);

        // Scroll to grid container
        if (gridRef.current) {
          gridRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }

        // Animate new cards in from the right
        gsap.fromTo(
          ".portfolio-project-card",
          { x: 40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.35,
            stagger: 0.04,
            ease: "power2.out",
            delay: 0.1,
          }
        );
      },
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12 relative overflow-hidden">
        {/* Grid Pattern Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none z-0" />

        {/* Navigation & Header */}
        <div className="space-y-6 text-left animate-fade-in-up">
          <div>
            <Button
              variant="outline"
              size="md"
              onClick={() => router.push("/")}
              className="gap-2.5 text-sm font-bold font-body"
            >
              <FaChevronLeft className="w-3.5 h-3.5" /> Return Home
            </Button>
          </div>

          <div className="max-w-2xl">
            <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-2">
              PORTFOLIO COLLECTION
            </span>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-none text-foreground uppercase font-display">
              Custom Creations
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base mt-4 leading-relaxed font-body">
              Explore the comprehensive catalog of custom model designs, wireframe details, and texture work created for VRChat and virtual platforms.
            </p>
          </div>
        </div>

        {/* Dynamic Project Showcase Grid */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center space-y-4">
            <FaSpinner className="w-10 h-10 animate-spin text-primary" />
            <span className="text-xs font-semibold text-muted-foreground tracking-wider font-body">
              Syncing portfolio database...
            </span>
          </div>
        ) : projects.length === 0 ? (
          <EmptyState
            title="No Projects Found"
            description="The database registry is currently empty. Check back later or sign in to upload new creations."
            tagText="Database Registry"
          />
        ) : (
          <div className="space-y-12">
            <div
              ref={gridRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start scroll-mt-20"
            >
              {visibleProjects.map((project, index) => (
                <ProjectCard key={project.id || index} project={project} />
              ))}
            </div>

            {/* Pagination Component - Only visible when projects exceed the limit of 6 */}
            {projects.length > PROJECTS_PER_PAGE && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
