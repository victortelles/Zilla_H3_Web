"use client";

import { useState, useEffect, useRef } from "react";
import { FaSpinner, FaPlus } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/ui/button/Button";
import { SpeciesSelect, TagsSelect, ImageUpload } from "./forms";
import { Project } from "@/types/admin/dashboard/Admin.types";

interface ProjectUploadFormProps {
  onProjectAdded: () => void;
  editingProject: Project | null;
  onCancelEdit: () => void;
  projects: Project[];
}

export default function ProjectUploadForm({
  onProjectAdded,
  editingProject,
  onCancelEdit,
  projects,
}: ProjectUploadFormProps) {
  const { showToast } = useAuth();

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [polyCount, setPolyCount] = useState("");
  const [externalLink, setExternalLink] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isSubmittingProject, setIsSubmittingProject] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // Species state
  const [speciesList, setSpeciesList] = useState<string[]>([]);
  const [selectedSpecies, setSelectedSpecies] = useState<string>("");
  const [customSpecies, setCustomSpecies] = useState<string>("");
  const [isSpeciesDropdownOpen, setIsSpeciesDropdownOpen] = useState(false);

  // Tags state
  const [tagsList, setTagsList] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newCustomTag, setNewCustomTag] = useState<string>("");
  const [isTagsDropdownOpen, setIsTagsDropdownOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const speciesRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);

  // Fetch species and tags on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [speciesRes, tagsRes] = await Promise.all([
          fetch("/api/species"),
          fetch("/api/tags"),
        ]);
        if (speciesRes.ok) {
          const speciesData = await speciesRes.json();
          setSpeciesList(speciesData);
        }
        if (tagsRes.ok) {
          const tagsData = await tagsRes.json();
          setTagsList(tagsData);
        }
      } catch (error) {
        console.error("Failed to load species or tags lists:", error);
      }
    };
    fetchData();
  }, []);

  // Populate form fields in Edit Mode
  useEffect(() => {
    if (editingProject) {
      setTitle(editingProject.name || "");
      setDescription(editingProject.description || "");
      setPolyCount(editingProject.polyCount || "");
      setExternalLink(editingProject.externalLink || "");
      setIsFeatured(editingProject.featured || false);
      setSelectedTags(editingProject.tags || []);

      // Determine species dropdown selection
      if (editingProject.species) {
        if (speciesList.includes(editingProject.species)) {
          setSelectedSpecies(editingProject.species);
          setCustomSpecies("");
        } else {
          setSelectedSpecies("other");
          setCustomSpecies(editingProject.species);
        }
      } else {
        setSelectedSpecies("");
        setCustomSpecies("");
      }

      // Show existing image as preview
      setImagePreview(editingProject.image || null);
      setImageFile(null);
    } else {
      // Clear fields for normal mode
      setTitle("");
      setDescription("");
      setPolyCount("");
      setExternalLink("");
      setIsFeatured(false);
      setSelectedTags([]);
      setSelectedSpecies("");
      setCustomSpecies("");
      setImageFile(null);
      setImagePreview(null);
    }
  }, [editingProject, speciesList]);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (speciesRef.current && !speciesRef.current.contains(event.target as Node)) {
        setIsSpeciesDropdownOpen(false);
      }
      if (tagsRef.current && !tagsRef.current.contains(event.target as Node)) {
        setIsTagsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Drag and drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetImage(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetImage(e.target.files[0]);
    }
  };

  const validateAndSetImage = (file: File) => {
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      showToast("Invalid format. Only PNG, JPEG, and WEBP are supported.", "error");
      return;
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      showToast("File size exceeds 10MB limit.", "error");
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  // Add tag custom
  const handleAddCustomTag = () => {
    const trimmed = newCustomTag.trim();
    if (!trimmed) return;

    // Check if it's already selected
    if (selectedTags.includes(trimmed)) {
      showToast("Tag is already selected.", "info");
      setNewCustomTag("");
      return;
    }

    // Add to tagsList if it doesn't exist
    if (!tagsList.some(t => t.toLowerCase() === trimmed.toLowerCase())) {
      setTagsList((prev) => [...prev, trimmed]);
    }

    // Select it
    setSelectedTags((prev) => [...prev, trimmed]);
    setNewCustomTag("");
  };

  // Toggle pre-existing tag
  const handleToggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Project form submit
  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();

    // Determine species value to upload
    const finalSpecies = selectedSpecies === "other" ? customSpecies.trim() : selectedSpecies;

    if (!title || !description || !finalSpecies || (!imageFile && !editingProject)) {
      showToast("Please fill all required fields and upload an image.", "error");
      return;
    }

    // Featured limit validation
    if (isFeatured) {
      const otherFeatured = projects.filter((p) => p.featured && p.id !== editingProject?.id);
      if (otherFeatured.length >= 5) {
        showToast("Maximum limit of 5 featured projects has been reached. Please uncheck another project first.", "error");
        return;
      }
    }

    setIsSubmittingProject(true);
    try {
      const formData = new FormData();
      if (editingProject) {
        formData.append("id", editingProject.id);
      }
      formData.append("title", title);
      formData.append("description", description);
      formData.append("species", finalSpecies);
      formData.append("polyCount", polyCount);
      formData.append("tags", selectedTags.join(","));
      formData.append("externalLink", externalLink);
      formData.append("featured", isFeatured ? "true" : "false");
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const method = editingProject ? "PUT" : "POST";
      const res = await fetch("/api/projects", {
        method,
        body: formData,
      });

      if (res.ok) {
        showToast(
          editingProject
            ? "Project updated successfully!"
            : "New project added to portfolio!",
          "success"
        );
        // Reset form
        setTitle("");
        setDescription("");
        setSelectedSpecies("");
        setCustomSpecies("");
        setPolyCount("");
        setSelectedTags([]);
        setExternalLink("");
        setImageFile(null);
        setImagePreview(null);
        setIsFeatured(false);
        // Refresh items in parent
        onProjectAdded();

        // Refresh dropdown databases from server to fetch newly added options
        const [speciesRes, tagsRes] = await Promise.all([
          fetch("/api/species"),
          fetch("/api/tags"),
        ]);
        if (speciesRes.ok) {
          const speciesData = await speciesRes.json();
          setSpeciesList(speciesData);
        }
        if (tagsRes.ok) {
          const tagsData = await tagsRes.json();
          setTagsList(tagsData);
        }
      } else {
        const errData = (await res.json()) as { error?: string };
        showToast(errData.error || "Failed to save project.", "error");
      }
    } catch (error) {
      console.error("Error saving project:", error);
      showToast("Network error saving project.", "error");
    } finally {
      setIsSubmittingProject(false);
    }
  };

  const featuredCount = projects.filter((p) => p.featured).length;

  return (
    <div className="bg-card border border-border p-6 rounded-3xl shadow-sm text-left space-y-6">
      <div>
        <h2 className="font-display font-bold text-lg text-foreground uppercase tracking-tight">
          {editingProject ? `Edit Creative Project: ${editingProject.name}` : "Upload Creative Project"}
        </h2>
        <p className="font-body text-xs text-muted-foreground mt-1">
          {editingProject
            ? "Modify this build details in the dynamic portfolio registry."
            : "Publish a new avatar build to the dynamic portfolio registry."}
        </p>
      </div>

      <form onSubmit={handleAddProject} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Project Title */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Project Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Nexus Wolf"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-11 px-4 text-sm rounded-xl border border-border bg-muted/20 text-foreground focus:border-primary focus:outline-none transition-colors font-body"
            />
          </div>

          <SpeciesSelect
            speciesList={speciesList}
            selectedSpecies={selectedSpecies}
            setSelectedSpecies={setSelectedSpecies}
            customSpecies={customSpecies}
            setCustomSpecies={setCustomSpecies}
            isDropdownOpen={isSpeciesDropdownOpen}
            setIsDropdownOpen={setIsSpeciesDropdownOpen}
            dropdownRef={speciesRef}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Poly Count */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Poly Count
            </label>
            <input
              type="text"
              placeholder="e.g. 68K Polys"
              value={polyCount}
              onChange={(e) => setPolyCount(e.target.value)}
              className="w-full h-11 px-4 text-sm rounded-xl border border-border bg-muted/20 text-foreground focus:border-primary focus:outline-none transition-colors font-body"
            />
          </div>

          <TagsSelect
            tagsList={tagsList}
            selectedTags={selectedTags}
            newCustomTag={newCustomTag}
            setNewCustomTag={setNewCustomTag}
            isDropdownOpen={isTagsDropdownOpen}
            setIsDropdownOpen={setIsTagsDropdownOpen}
            dropdownRef={tagsRef}
            onToggleTag={handleToggleTag}
            onAddCustomTag={handleAddCustomTag}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* External Redirect Link */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              External Redirect Link
            </label>
            <input
              type="url"
              placeholder="e.g. https://vrchat.com/home/avatar/... or social link"
              value={externalLink}
              onChange={(e) => setExternalLink(e.target.value)}
              className="w-full h-11 px-4 text-sm rounded-xl border border-border bg-muted/20 text-foreground focus:border-primary focus:outline-none transition-colors font-body"
            />
          </div>

          {/* Featured Status Selector */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Featured Status
              </label>
              <span className="text-[9px] font-mono font-bold text-muted-foreground">
                {featuredCount}/5 Featured
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsFeatured(!isFeatured)}
              className={`w-full h-11 px-4 rounded-xl border transition-all duration-200 flex items-center justify-between cursor-pointer font-body text-sm ${
                isFeatured
                  ? "bg-primary/10 border-primary text-primary font-bold"
                  : "bg-muted/20 border-border text-muted-foreground"
              }`}
            >
              <span>{isFeatured ? "Featured (On Landing Page)" : "Not Featured"}</span>
              <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                isFeatured ? "bg-primary border-primary text-white" : "border-border bg-background"
              }`}>
                {isFeatured && (
                  <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 20 20">
                    <path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/>
                  </svg>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Brief Description *
          </label>
          <textarea
            required
            rows={4}
            placeholder="Provide details about the custom textures, armor, shader modifications, and optimization workflows used in this build."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-4 text-sm rounded-xl border border-border bg-muted/20 text-foreground focus:border-primary focus:outline-none transition-colors resize-none leading-relaxed font-body"
          />
        </div>

        {/* Drag and Drop Image Box */}
        <ImageUpload
          imagePreview={imagePreview}
          dragActive={dragActive}
          onDrag={handleDrag}
          onDrop={handleDrop}
          onChange={handleFileChange}
          triggerFileSelect={triggerFileSelect}
          fileInputRef={fileInputRef}
        />

        <div className="pt-2 flex justify-end gap-3">
          {editingProject && (
            <Button
              variant="outline"
              size="md"
              type="button"
              onClick={onCancelEdit}
              className="w-full md:w-auto h-11 px-8 gap-2 font-bold uppercase text-xs tracking-wider"
            >
              Cancel Edit
            </Button>
          )}
          <Button
            variant="primary"
            size="md"
            type="submit"
            disabled={isSubmittingProject}
            className="w-full md:w-auto h-11 px-8 gap-2 font-bold uppercase text-xs tracking-wider"
          >
            {isSubmittingProject ? (
              <>
                <FaSpinner className="w-3.5 h-3.5 animate-spin" /> {editingProject ? "Updating build..." : "Uploading build..."}
              </>
            ) : (
              <>
                {editingProject ? "Update Project" : "Publish Project"}
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
