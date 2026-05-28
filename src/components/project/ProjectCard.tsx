"use client";

import { useState } from "react";
import { FaStar, FaExternalLinkAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { Project } from "@/types/project/Project.types";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const textLimit = 120;
  const isLongText = project.description.length > textLimit;

  return (
    <div className="portfolio-project-card group/card rounded-3xl border border-border bg-card p-4 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 flex flex-col justify-between h-fit">
      <div>
        {/* Image container */}
        <div className="relative aspect-[4/3] w-full rounded-2xl bg-muted border border-border/60 overflow-hidden shadow-inner flex items-center justify-center">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover group-hover/card:scale-[1.03] transition-transform duration-500"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

          {/* Species Badge */}
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-xl bg-background/85 backdrop-blur-md border border-border/80 flex items-center gap-1.5 text-[9px] font-bold text-foreground shadow-sm uppercase tracking-wider font-body">
            <FaStar className="text-amber-500 w-3 h-3" /> {project.species}
          </div>

          {/* External redirection link icon (top right corner) */}
          {project.externalLink && (
            <a
              href={project.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-3 right-3 p-2 rounded-xl bg-background/85 backdrop-blur-md border border-border/80 text-foreground hover:text-primary transition-all duration-200 shadow-sm flex items-center justify-center cursor-pointer z-10"
              aria-label="External redirect link"
            >
              <FaExternalLinkAlt className="w-3 h-3" />
            </a>
          )}
        </div>

        {/* Body Content */}
        <div className="mt-5 space-y-3.5 text-left">
          <div className="flex justify-between items-start gap-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground font-body">
                By {project.creator}
              </span>
              <h3 className="font-display font-bold text-xl text-foreground mt-0.5 group-hover/card:text-primary transition-colors">
                {project.name}
              </h3>
            </div>
            <span className="text-[9px] font-mono font-bold px-2 py-1 rounded-lg bg-muted border border-border text-foreground tracking-tight whitespace-nowrap shadow-sm">
              {project.polyCount || "Unspecified"}
            </span>
          </div>

          <div className="relative">
            <motion.div
              initial={false}
              animate={{ height: isLongText && !isExpanded ? "60px" : "auto" }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden font-body text-xs text-muted-foreground leading-relaxed relative text-left"
            >
              <p>{project.description}</p>
              {isLongText && !isExpanded && (
                <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-card to-transparent pointer-events-none" />
              )}
            </motion.div>
          </div>

          {isLongText && (
            <div className="flex items-center gap-3 my-3 text-muted-foreground select-none">
              <div className="h-[1px] flex-1 bg-border" />
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-primary font-bold text-[10px] uppercase tracking-wider hover:underline focus:outline-none cursor-pointer"
              >
                {isExpanded ? "View Less" : "View More"}
              </button>
              <div className="h-[1px] flex-1 bg-border" />
            </div>
          )}
        </div>
      </div>

      {/* Tags footer (Removed line divider and spacing, enlarged tags text size) */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.tags.map((tag, idx) => (
          <span
            key={idx}
            className="text-xs font-semibold px-2 py-0.5 rounded-md bg-muted/60 border border-border text-muted-foreground hover:border-primary/20 hover:text-foreground transition-all cursor-default font-body"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
