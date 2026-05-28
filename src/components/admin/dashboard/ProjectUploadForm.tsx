"use client";

import { useState, useEffect, useRef } from "react";
import {
  FaCloudUploadAlt,
  FaSpinner,
  FaPlus,
  FaChevronDown,
  FaChevronUp,
  FaTimes,
  FaCheck,
} from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/ui/button/Button";

interface ProjectUploadFormProps {
  onProjectAdded: () => void;
}

export default function ProjectUploadForm({ onProjectAdded }: ProjectUploadFormProps) {
  const { showToast } = useAuth();

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [polyCount, setPolyCount] = useState("");
  const [externalLink, setExternalLink] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
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

    if (!title || !description || !finalSpecies || !imageFile) {
      showToast("Please fill all required fields and upload an image.", "error");
      return;
    }

    setIsSubmittingProject(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("species", finalSpecies);
      formData.append("polyCount", polyCount);
      formData.append("tags", selectedTags.join(","));
      formData.append("externalLink", externalLink);
      formData.append("image", imageFile);

      const res = await fetch("/api/projects", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        showToast("New project added to portfolio!", "success");
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

  return (
    <div className="bg-card border border-border p-6 rounded-3xl shadow-sm text-left space-y-6">
      <div>
        <h2 className="font-display font-bold text-lg text-foreground uppercase tracking-tight">
          Upload Creative Project
        </h2>
        <p className="font-body text-xs text-muted-foreground mt-1">
          Publish a new avatar build to the dynamic portfolio registry.
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

          {/* Species Select Dropdown */}
          <div className="space-y-1.5 relative" ref={speciesRef}>
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Species *
            </label>
            <button
              type="button"
              onClick={() => setIsSpeciesDropdownOpen(!isSpeciesDropdownOpen)}
              className="w-full h-11 px-4 text-sm rounded-xl border border-border bg-muted/20 text-foreground focus:border-primary focus:outline-none transition-colors flex items-center justify-between font-body cursor-pointer"
            >
              <span className={selectedSpecies ? "text-foreground font-medium" : "text-muted-foreground"}>
                {selectedSpecies === "other"
                  ? "Other (Write in)"
                  : selectedSpecies || "Select species..."}
              </span>
              {isSpeciesDropdownOpen ? (
                <FaChevronUp className="text-muted-foreground w-3 h-3" />
              ) : (
                <FaChevronDown className="text-muted-foreground w-3 h-3" />
              )}
            </button>

            {isSpeciesDropdownOpen && (
              <div className="absolute left-0 right-0 mt-1 max-h-56 overflow-y-auto rounded-xl border border-border bg-card shadow-lg z-50 p-1.5 space-y-0.5">
                {speciesList.map((sp) => (
                  <button
                    key={sp}
                    type="button"
                    onClick={() => {
                      setSelectedSpecies(sp);
                      setIsSpeciesDropdownOpen(false);
                    }}
                    className={`w-full text-left rounded-lg px-3 py-2 text-sm transition-colors cursor-pointer ${
                      selectedSpecies === sp
                        ? "bg-primary text-primary-foreground font-bold"
                        : "hover:bg-muted text-foreground"
                    }`}
                  >
                    {sp}
                  </button>
                ))}
                <div className="border-t border-border my-1" />
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSpecies("other");
                    setIsSpeciesDropdownOpen(false);
                  }}
                  className={`w-full text-left rounded-lg px-3 py-2 text-sm transition-colors cursor-pointer ${
                    selectedSpecies === "other"
                      ? "bg-primary text-primary-foreground font-bold"
                      : "hover:bg-muted text-foreground"
                  }`}
                >
                  Other (Specify custom species)
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Custom Species Input (if Other selected) */}
        {selectedSpecies === "other" && (
          <div className="space-y-1.5 animate-fade-in">
            <label className="text-[10px] font-bold uppercase tracking-wider text-primary">
              Specify Custom Species *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Avali, Protogen, Dragon"
              value={customSpecies}
              onChange={(e) => setCustomSpecies(e.target.value)}
              className="w-full h-11 px-4 text-sm rounded-xl border border-primary bg-muted/20 text-foreground focus:border-primary focus:outline-none transition-colors font-body"
            />
          </div>
        )}

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

          {/* Tags Dropdown Multi-Select */}
          <div className="space-y-1.5 relative" ref={tagsRef}>
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex justify-between">
              <span>Specification Tags</span>
              <span className="text-[9px] text-muted-foreground font-normal">
                {selectedTags.length} selected
              </span>
            </label>
            
            <button
              type="button"
              onClick={() => setIsTagsDropdownOpen(!isTagsDropdownOpen)}
              className="w-full min-h-[44px] py-2 px-4 text-sm rounded-xl border border-border bg-muted/20 text-foreground focus:border-primary focus:outline-none transition-colors flex items-center justify-between font-body cursor-pointer"
            >
              <div className="flex flex-wrap gap-1 max-w-[90%] text-left">
                {selectedTags.length === 0 ? (
                  <span className="text-muted-foreground">Select tags...</span>
                ) : (
                  selectedTags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 text-xs font-semibold px-2.5 py-1 rounded-lg"
                    >
                      {tag}
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleTag(tag);
                        }}
                        className="hover:text-destructive cursor-pointer font-bold"
                      >
                        <FaTimes className="w-2.5 h-2.5" />
                      </span>
                    </span>
                  ))
                )}
              </div>
              {isTagsDropdownOpen ? (
                <FaChevronUp className="text-muted-foreground w-3 h-3 flex-shrink-0 ml-2" />
              ) : (
                <FaChevronDown className="text-muted-foreground w-3 h-3 flex-shrink-0 ml-2" />
              )}
            </button>

            {isTagsDropdownOpen && (
              <div className="absolute left-0 right-0 mt-1 max-h-72 overflow-y-auto rounded-xl border border-border bg-card shadow-lg z-50 p-2.5 space-y-2 flex flex-col justify-between">
                <div className="overflow-y-auto max-h-48 space-y-0.5">
                  {tagsList.map((tag) => {
                    const isChecked = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleToggleTag(tag)}
                        className={`w-full text-left rounded-lg px-2.5 py-1.5 text-sm transition-colors flex items-center justify-between cursor-pointer ${
                          isChecked
                            ? "bg-primary/10 text-primary font-semibold"
                            : "hover:bg-muted text-foreground"
                        }`}
                      >
                        <span>{tag}</span>
                        {isChecked && <FaCheck className="w-2.5 h-2.5 text-primary" />}
                      </button>
                    );
                  })}
                </div>

                <div className="border-t border-border pt-2.5 mt-1 space-y-1.5">
                  <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block">
                    Add Custom Specification
                  </span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. LipSync"
                      value={newCustomTag}
                      onChange={(e) => setNewCustomTag(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddCustomTag();
                        }
                      }}
                      className="flex-1 h-9 px-3 text-sm rounded-lg border border-border bg-muted/10 text-foreground focus:outline-none focus:border-primary font-body"
                    />
                    <button
                      type="button"
                      onClick={handleAddCustomTag}
                      className="h-9 px-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 flex items-center justify-center font-bold text-xs cursor-pointer"
                    >
                      <FaPlus className="w-2.5 h-2.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* External Redirect Link */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            External Redirect Link (e.g. YouTube, TikTok, VRChat, Instagram)
          </label>
          <input
            type="url"
            placeholder="e.g. https://vrchat.com/home/avatar/avatar_... or social link"
            value={externalLink}
            onChange={(e) => setExternalLink(e.target.value)}
            className="w-full h-11 px-4 text-sm rounded-xl border border-border bg-muted/20 text-foreground focus:border-primary focus:outline-none transition-colors font-body"
          />
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
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Avatar Image Asset * (Max 10MB, PNG/JPEG/WEBP)
          </label>
          
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={triggerFileSelect}
            className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[160px] ${
              dragActive
                ? "border-primary bg-primary/5"
                : "border-border bg-muted/10 hover:border-primary/40 hover:bg-muted/20"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            {imagePreview ? (
              <div className="relative group max-w-xs rounded-lg overflow-hidden border border-border shadow-sm">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-36 w-auto object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                  Change Image
                </div>
              </div>
            ) : (
              <>
                <FaCloudUploadAlt className="w-10 h-10 text-muted-foreground/60 mb-2" />
                <span className="text-xs font-bold text-foreground">
                  Drag and drop file here, or click to upload
                </span>
                <span className="text-[10px] text-muted-foreground mt-1 leading-normal">
                  PNG, JPEG, WEBP files up to 10MB
                </span>
              </>
            )}
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <Button
            variant="primary"
            size="md"
            type="submit"
            disabled={isSubmittingProject}
            className="w-full md:w-auto h-11 px-8 gap-2 font-bold uppercase text-xs tracking-wider"
          >
            {isSubmittingProject ? (
              <>
                <FaSpinner className="w-3.5 h-3.5 animate-spin" /> Uploading build...
              </>
            ) : (
              <>
                <FaPlus className="w-3 h-3" /> Publish Project
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
