import React from "react";
import { useState } from "react";
import { Input } from "./Input";
import { Button } from "../ui/button";

interface TagsInputProps {
  value: string[];
  onChange: (v: string[]) => void;
}

export function TagsInput({ value = [], onChange }: TagsInputProps) {
  const safeValue = value ?? [];
  const [input, setInput] = useState("");
  const add = () => {
    const t = input.trim().toLowerCase();
    if (t && !value.includes(t)) { onChange([...value, t]); setInput(""); }
  };
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {safeValue.map(tag => (
          <span key={tag} className="flex items-center gap-2 bg-admin-accent text-admin-primary px-2.5 py-1 rounded-2xl text-xs font-medium">
            {tag}
            <button
              onClick={() => onChange(value.filter(t => t !== tag))}
              className="bg-transparent border-none text-amber-500 cursor-pointer p-0 leading-none"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-4">
        <Input value={input} onChange={({ target }) => { setInput(target.value) }} placeholder="Add tag..." style={{ flex: 1 }} />
        <Button onClick={add} className="text-admin-background bg-admin-input-active px-4 h-8 cursor-pointer font-semibold">Add</Button>
      </div>
    </div>
  );
}
