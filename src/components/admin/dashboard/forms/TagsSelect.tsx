"use client";

import { FaChevronDown, FaChevronUp, FaTimes, FaCheck, FaPlus } from "react-icons/fa";
import { TagsSelectProps } from "@/types/admin/dashboard/forms/Forms.types";

export default function TagsSelect({
  tagsList,
  selectedTags,
  newCustomTag,
  setNewCustomTag,
  isDropdownOpen,
  setIsDropdownOpen,
  dropdownRef,
  onToggleTag,
  onAddCustomTag,
}: TagsSelectProps) {
  return (
    <div className="space-y-1.5 relative" ref={dropdownRef}>
      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex justify-between">
        <span>Specification Tags</span>
        <span className="text-[9px] text-muted-foreground font-normal">
          {selectedTags.length} selected
        </span>
      </label>

      <button
        type="button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="w-full min-h-[44px] py-2 px-4 text-sm rounded-xl border border-border bg-muted/20 text-foreground focus:border-primary focus:outline-none transition-colors flex items-center justify-between font-body cursor-pointer animate-fade-in"
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
                    onToggleTag(tag);
                  }}
                  className="hover:text-destructive cursor-pointer font-bold"
                >
                  <FaTimes className="w-2.5 h-2.5" />
                </span>
              </span>
            ))
          )}
        </div>
        {isDropdownOpen ? (
          <FaChevronUp className="text-muted-foreground w-3 h-3 flex-shrink-0 ml-2" />
        ) : (
          <FaChevronDown className="text-muted-foreground w-3 h-3 flex-shrink-0 ml-2" />
        )}
      </button>

      {isDropdownOpen && (
        <div className="absolute left-0 right-0 mt-1 max-h-72 overflow-y-auto rounded-xl border border-border bg-card shadow-lg z-50 p-2.5 space-y-2 flex flex-col justify-between">
          <div className="overflow-y-auto max-h-48 space-y-0.5">
            {tagsList.map((tag) => {
              const isChecked = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => onToggleTag(tag)}
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
                    onAddCustomTag();
                  }
                }}
                className="flex-1 h-9 px-3 text-sm rounded-lg border border-border bg-muted/10 text-foreground focus:outline-none focus:border-primary font-body"
              />
              <button
                type="button"
                onClick={onAddCustomTag}
                className="h-9 px-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 flex items-center justify-center font-bold text-xs cursor-pointer"
              >
                <FaPlus className="w-2.5 h-2.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
