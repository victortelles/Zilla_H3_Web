"use client";

import { useState } from "react";
import { FaTrash, FaInfoCircle, FaSpinner, FaExternalLinkAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { Project } from "@/types/admin/dashboard/Admin.types";

interface ProjectRegistryProps {
  projects: Project[];
  isLoading: boolean;
  onDeleteProject: (id: string, name: string) => void;
}

function ProjectRegistryCard({
  project,
  onDelete,
}: {
  project: Project;
  onDelete: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const textLimit = 120;
  
  if (!project) return null;

  const descriptionText = project.description || "";
  const isLongText = descriptionText.length > textLimit;

  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm p-4 hover:border-primary/20 transition-all flex flex-col justify-between h-fit">
      <div className="space-y-4">
        {/* Image display */}
        <div className="relative aspect-video rounded-xl bg-muted border border-border/60 overflow-hidden shadow-inner">
          <img
            src={project.image || "/resources/logo.png"}
            alt={project.name || "Project Image"}
            className="w-full h-full object-cover"
          />
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-background/80 backdrop-blur-sm border border-border/80 text-[9px] font-bold text-foreground">
            {project.species || "Unspecified"}
          </span>

          {/* External redirection link icon (top right corner) */}
          {project.externalLink && (
            <a
              href={project.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-2 right-2 p-1.5 rounded-lg bg-background/85 backdrop-blur-md border border-border/80 text-foreground hover:text-primary transition-all duration-200 shadow-sm flex items-center justify-center cursor-pointer z-10"
              aria-label="External redirect link"
            >
              <FaExternalLinkAlt className="w-2.5 h-2.5" />
            </a>
          )}
        </div>

        <div className="space-y-1">
          <h3 className="font-display font-bold text-base text-foreground">
            {project.name || "Untitled Creation"}
          </h3>
          <div className="relative text-left font-body text-[11px] text-muted-foreground leading-relaxed">
            <div className="relative">
              <motion.div
                initial={false}
                animate={{ height: isLongText && !isExpanded ? "60px" : "auto" }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden relative"
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

        {/* Meta info tags */}
        <div className="flex flex-wrap gap-1.5">
          {(project.tags || []).map((tag, idx) => (
            <span
              key={idx}
              className="text-xs px-2 py-0.5 rounded-md bg-muted border border-border text-muted-foreground font-semibold"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between">
        <span className="text-[9px] font-mono text-muted-foreground">
          {project.polyCount || "No PolyCount"}
        </span>
        <button
          onClick={onDelete}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive hover:text-white transition-all text-[10px] font-bold cursor-pointer"
        >
          <FaTrash className="w-3.5 h-4" />
        </button>
      </div>
    </div>
  );
}

export default function ProjectRegistry({
  projects,
  isLoading,
  onDeleteProject,
}: ProjectRegistryProps) {
  if (isLoading) {
    return (
      <div className="bg-card border border-border p-6 rounded-3xl shadow-sm text-left">
        <div>
          <h2 className="font-display font-bold text-lg text-foreground uppercase tracking-tight">
            Portfolio Project Registry
          </h2>
          <p className="font-body text-xs text-muted-foreground mt-1">
            Active projects displayed in the public grid. Deleting items clears local files.
          </p>
        </div>
        <div className="py-20 flex flex-col items-center justify-center space-y-3">
          <FaSpinner className="w-8 h-8 animate-spin text-primary" />
          <span className="text-xs text-muted-foreground font-medium">Loading inventory...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border p-6 rounded-3xl shadow-sm text-left space-y-6">
      <div>
        <h2 className="font-display font-bold text-lg text-foreground uppercase tracking-tight">
          Portfolio Project Registry
        </h2>
        <p className="font-body text-xs text-muted-foreground mt-1">
          Active projects displayed in the public grid. Deleting items clears local files.
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="py-12 border border-dashed border-border rounded-2xl text-center space-y-2.5">
          <FaInfoCircle className="w-8 h-8 text-muted-foreground/60 mx-auto" />
          <h3 className="font-display font-bold text-sm text-foreground uppercase">Inventory is Empty</h3>
          <p className="font-body text-xs text-muted-foreground max-w-xs mx-auto">
            No custom avatar projects have been saved. Fill the form above to post your first creation.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {projects.map((project, index) => (
            <ProjectRegistryCard
              key={project.id || index}
              project={project}
              onDelete={() => onDeleteProject(project.id || "", project.name || "")}
            />
          ))}
        </div>
      )}
    </div>
  );
}
