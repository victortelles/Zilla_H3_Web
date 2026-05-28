import { RefObject, DragEvent, ChangeEvent } from "react";

export interface SpeciesSelectProps {
  speciesList: string[];
  selectedSpecies: string;
  setSelectedSpecies: (species: string) => void;
  customSpecies: string;
  setCustomSpecies: (custom: string) => void;
  isDropdownOpen: boolean;
  setIsDropdownOpen: (open: boolean) => void;
  dropdownRef: RefObject<HTMLDivElement | null>;
}

export interface TagsSelectProps {
  tagsList: string[];
  selectedTags: string[];
  newCustomTag: string;
  setNewCustomTag: (tag: string) => void;
  isDropdownOpen: boolean;
  setIsDropdownOpen: (open: boolean) => void;
  dropdownRef: RefObject<HTMLDivElement | null>;
  onToggleTag: (tag: string) => void;
  onAddCustomTag: () => void;
}

export interface ImageUploadProps {
  imagePreview: string | null;
  dragActive: boolean;
  onDrag: (e: DragEvent) => void;
  onDrop: (e: DragEvent) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  triggerFileSelect: () => void;
  fileInputRef: RefObject<HTMLInputElement | null>;
}
