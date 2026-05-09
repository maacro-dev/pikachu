import React, { useState } from "react";
import { Trash2, Plus, GripVertical, ImageIcon, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

export interface GalleryItem {
  url: string;
  file?: File;
  alt: string;
  caption?: string;
  order?: number;
}

interface GalleryUploadProps {
  value: GalleryItem[];
  onChange: (v: GalleryItem[]) => void;
}

export function GalleryUpload({ value = [], onChange }: GalleryUploadProps) {
  const [draggingOver, setDraggingOver] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const tooBig = Array.from(files).filter((f) => f.size > 5 * 1024 * 1024);
    if (tooBig.length) {
      alert(`${tooBig.length} file(s) exceed 5MB and were skipped.`);
    }
    const valid = Array.from(files).filter((f) => f.size <= 5 * 1024 * 1024);
    const newItems: GalleryItem[] = valid.map((file, i) => ({
      url: URL.createObjectURL(file),
      file,
      alt: file.name,
      caption: "",
      order: value.length + i + 1,
    }));
    onChange([...value, ...newItems]);
  };

  const remove = (i: number) => {
    const item = value[i];
    if (item.url.startsWith("blob:")) URL.revokeObjectURL(item.url);
    onChange(value.filter((_, idx) => idx !== i));
  };

  const updateCaption = (i: number, caption: string) => {
    const next = [...value];
    next[i] = { ...next[i], caption };
    onChange(next);
  };

  const updateAlt = (i: number, alt: string) => {
    const next = [...value];
    next[i] = { ...next[i], alt };
    onChange(next);
  };

  return (
    <div className="flex flex-col gap-3">
      {value.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {value.map((item, i) => (
            <div
              key={item.url}
              className="group relative rounded-lg overflow-hidden border border-admin-border bg-[#130f08]"
            >
              <img
                src={item.url}
                alt={item.alt}
                className="w-full h-24 object-cover block"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-1.5">
                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="cursor-pointer self-end p-1 rounded-md bg-red-500/80 hover:bg-red-500 text-white transition-colors"
                >
                  <Trash2 size={11} />
                </button>
                <input
                  value={item.caption ?? ""}
                  onChange={(e) => updateCaption(i, e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  placeholder="Caption..."
                  className="w-full text-[10px] bg-black/60 border border-white/10 rounded px-1.5 py-1 text-white placeholder:text-white/40 outline-none focus:border-amber-500/60"
                />
              </div>

              <span className="absolute top-1 left-1 text-[9px] font-bold bg-black/50 text-white/70 rounded px-1 py-0.5 leading-none">
                {i + 1}
              </span>
            </div>
          ))}

          <label className={cn(
            "flex flex-col items-center justify-center h-24 rounded-lg border-[1.5px] border-dashed cursor-pointer transition-colors",
            "border-admin-input hover:border-amber-500/50 text-admin-secondary hover:text-amber-500/70"
          )}>
            <Plus size={18} />
            <span className="text-[10px] mt-1">Add</span>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
          </label>
        </div>
      )}

      {value.length === 0 && (
        <label
          onDragOver={(e) => { e.preventDefault(); setDraggingOver(true); }}
          onDragLeave={() => setDraggingOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDraggingOver(false);
            handleFiles(e.dataTransfer.files);
          }}
          className={cn(
            "flex flex-col items-center justify-center gap-2 rounded-xl border-[1.5px] border-dashed py-8 cursor-pointer transition-all",
            draggingOver
              ? "border-amber-500 bg-amber-500/5 text-amber-400"
              : "border-admin-input bg-[#130f08] text-admin-secondary hover:border-amber-500/40 hover:text-[#7a6a58]"
          )}
        >
          <Upload size={22} />
          <p className="text-[13px]">Drop images here or <span className="text-amber-500 font-semibold">browse</span></p>
          <p className="text-[11px]">JPG, PNG, WebP · max 5MB each · multiple allowed</p>
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </label>
      )}

      {value.length > 0 && (
        <p className="text-[11px] text-admin-secondary">
          {value.length} image{value.length !== 1 ? "s" : ""} · hover a thumbnail to edit caption or remove
        </p>
      )}
    </div>
  );
}
