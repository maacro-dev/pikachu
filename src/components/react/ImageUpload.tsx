import React, { useState } from "react";
import { Upload, X, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ImageValue = { url: string; file?: File; alt?: string } | null;

interface ImageUploadProps {
  value: ImageValue;
  onChange: (v: ImageValue) => void;
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [dragging, setDragging] = useState(false);
  const [hovering, setHovering] = useState(false);

  const handleFile = (file: File | null | undefined) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("File exceeds 5MB limit.");
      return;
    }
    const url = URL.createObjectURL(file);
    onChange({ url, file, alt: file.name });
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (value?.url?.startsWith("blob:")) URL.revokeObjectURL(value.url);
    onChange(null);
  };

  if (value?.url) {
    return (
      <div
        className="relative rounded-xl overflow-hidden border border-admin-border"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <img
          src={value.url}
          alt={value.alt}
          className="w-full h-48 object-cover block"
        />
        {/* Gradient overlay always present */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

        {/* Hover actions */}
        <div className={cn(
          "absolute inset-0 bg-black/40 flex items-center justify-center gap-3 transition-opacity",
          hovering ? "opacity-100" : "opacity-0"
        )}>
          <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer backdrop-blur-sm transition-colors border border-white/10">
            <Upload size={12} /> Replace
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
          </label>
          <button
            type="button"
            onClick={handleRemove}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/80 hover:bg-red-500 text-white text-xs font-semibold cursor-pointer backdrop-blur-sm transition-colors"
          >
            <X size={12} /> Remove
          </button>
        </div>

        {/* Filename badge */}
        <span className="absolute bottom-2 left-3 text-[10px] text-white/60 truncate max-w-[80%]">
          {value.alt}
        </span>
      </div>
    );
  }

  return (
    <label
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        handleFile(e.dataTransfer.files[0]);
      }}
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-xl border-[1.5px] border-dashed py-10 cursor-pointer transition-all",
        dragging
          ? "border-amber-500 bg-amber-500/5 text-amber-400"
          : "border-[#2e2010] bg-[#130f08] text-[#5c5040] hover:border-amber-500/40 hover:text-[#7a6a58]"
      )}
    >
      <div className={cn(
        "p-3 rounded-full transition-colors",
        dragging ? "bg-amber-500/10" : "bg-[#1e1608]"
      )}>
        <ImageIcon size={22} />
      </div>
      <p className="text-[13px]">
        Drop image here or <span className="text-amber-500 font-semibold">browse</span>
      </p>
      <p className="text-[11px]">JPG, PNG, WebP · max 5MB</p>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </label>
  );
}
