"use client";

import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { SpeciesSelectProps } from "@/types/admin/dashboard/forms/Forms.types";

export default function SpeciesSelect({
  speciesList,
  selectedSpecies,
  setSelectedSpecies,
  customSpecies,
  setCustomSpecies,
  isDropdownOpen,
  setIsDropdownOpen,
  dropdownRef,
}: SpeciesSelectProps) {
  return (
    <>
      {/* Species Select Dropdown */}
      <div className="space-y-1.5 relative" ref={dropdownRef}>
        <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          Species *
        </label>
        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full h-11 px-4 text-sm rounded-xl border border-border bg-muted/20 text-foreground focus:border-primary focus:outline-none transition-colors flex items-center justify-between font-body cursor-pointer animate-fade-in"
        >
          <span className={selectedSpecies ? "text-foreground font-medium" : "text-muted-foreground"}>
            {selectedSpecies === "other"
              ? "Other (Write in)"
              : selectedSpecies || "Select species..."}
          </span>
          {isDropdownOpen ? (
            <FaChevronUp className="text-muted-foreground w-3 h-3" />
          ) : (
            <FaChevronDown className="text-muted-foreground w-3 h-3" />
          )}
        </button>

        {isDropdownOpen && (
          <div className="absolute left-0 right-0 mt-1 max-h-56 overflow-y-auto rounded-xl border border-border bg-card shadow-lg z-50 p-1.5 space-y-0.5">
            {speciesList.map((sp) => (
              <button
                key={sp}
                type="button"
                onClick={() => {
                  setSelectedSpecies(sp);
                  setIsDropdownOpen(false);
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
                setIsDropdownOpen(false);
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
    </>
  );
}
