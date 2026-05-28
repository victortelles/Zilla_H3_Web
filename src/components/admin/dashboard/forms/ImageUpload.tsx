"use client";

import { FaCloudUploadAlt } from "react-icons/fa";
import { ImageUploadProps } from "@/types/admin/dashboard/forms/Forms.types";

export default function ImageUpload({
  imagePreview,
  dragActive,
  onDrag,
  onDrop,
  onChange,
  triggerFileSelect,
  fileInputRef,
}: ImageUploadProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        Avatar Image Asset * (Max 10MB, PNG/JPEG/WEBP)
      </label>

      <div
        onDragEnter={onDrag}
        onDragOver={onDrag}
        onDragLeave={onDrag}
        onDrop={onDrop}
        onClick={triggerFileSelect}
        className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[160px] animate-fade-in ${
          dragActive
            ? "border-primary bg-primary/5"
            : "border-border bg-muted/10 hover:border-primary/40 hover:bg-muted/20"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={onChange}
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
  );
}
