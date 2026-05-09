import React from "react";
import { useState } from "react";
import { Input } from "./Input";
import { Button } from "../ui/button";
import { Trash2, Plus, GripVertical } from "lucide-react";

interface GettingThereStepsProps {
  value: string[];
  onChange: (v: string[]) => void;
}

export function GettingThereSteps({ value = [], onChange }: GettingThereStepsProps) {
  const [draft, setDraft] = useState("");

  const add = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    onChange([...value, trimmed]);
    setDraft("");
  };

  const update = (i: number, text: string) => {
    const next = [...value];
    next[i] = text;
    onChange(next);
  };

  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i));

  return (
    <div className="flex flex-col gap-2">
      {value.map((step, i) => (
        <div key={i} className="flex items-center gap-2 group">
          <span className="text-admin-secondary shrink-0 select-none">
            <GripVertical size={14} />
          </span>
          <span className="text-3xs font-bold text-admin-secondary ">
            {i + 1}.
          </span>
          <Input
            value={step}
            onChange={(e) => update(i, e.target.value)}
            className="flex-1"
          />
          <Button
            variant="ghost"
            onClick={() => remove(i)}
            className="cursor-pointer text-[#3e3020] hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
          >
            <Trash2 size={14} />
          </Button>
        </div>
      ))}

      <div className="flex items-center gap-2 mt-2">
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="e.g. Ride a jeepney to the town plaza..."
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), add())}
          className="flex-1"
        />
        <Button
          onClick={add}
          className="text-admin-background bg-admin-input-active h-8 px-3 gap-1.5 cursor-pointer font-semibold shrink-0"
        >
          <Plus size={13} /> Add Step
        </Button>
      </div>
    </div>
  );
}
