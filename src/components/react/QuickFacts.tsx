import React, { useState, useRef, useEffect } from "react";
import { Input } from "./Input";
import { Button } from "../ui/button";
import { Trash2, Plus, ChevronDown } from "lucide-react";
import { MapPin, Mountain, Calendar, Trees, MapPinned } from "lucide-react";
import { cn } from "@/lib/utils";

// Mirror your iconMap but with lucide-react components
const ICON_OPTIONS = [
  { key: "map-pin", label: "Map Pin", Icon: MapPin },
  { key: "map-marker", label: "Map Marker", Icon: MapPinned },
  { key: "mountains", label: "Mountains", Icon: Mountain },
  { key: "calendar", label: "Calendar", Icon: Calendar },
  { key: "trees", label: "Trees", Icon: Trees },
] as const;

type IconKey = (typeof ICON_OPTIONS)[number]["key"];

const DEFAULT_ICON: IconKey = "map-pin";

function getIcon(key: string) {
  return ICON_OPTIONS.find((o) => o.key === key) ?? ICON_OPTIONS[0];
}


function IconPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (key: IconKey) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { Icon } = getIcon(value);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex items-center gap-1.5 h-9 px-2.5 rounded-md border text-sm transition-colors",
          "border-admin-input bg-transparent text-admin-foreground",
          "hover:border-amber-500/50",
          open && "border-amber-500"
        )}
      >
        <Icon size={15} className="text-amber-500 shrink-0" />
        <ChevronDown
          size={12}
          className={cn("text-admin-secondary transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <div className="absolute z-50 top-full mt-1 left-0 bg-[#1a1208] border border-admin-border rounded-lg p-1.5 flex flex-col gap-0.5 shadow-xl min-w-37.5">
          {ICON_OPTIONS.map(({ key, label, Icon: Ic }) => (
            <button
              key={key}
              type="button"
              onClick={() => { onChange(key); setOpen(false); }}
              className={cn(
                "flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs transition-colors text-left w-full",
                value === key
                  ? "bg-amber-500/15 text-amber-400"
                  : "text-admin-secondary hover:bg-white/5 hover:text-admin-foreground"
              )}
            >
              <Ic size={13} />
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}


interface QuickFactsProps {
  value: Record<string, string>;
  onChange: (v: Record<string, string>) => void;
}

const splitKey = (k: string): { icon: IconKey; label: string } => {
  const idx = k.indexOf(":");
  if (idx === -1) return { icon: DEFAULT_ICON, label: k };
  return { icon: k.slice(0, idx) as IconKey, label: k.slice(idx + 1) };
};
const joinKey = (icon: string, label: string) => `${icon}:${label}`;

export function QuickFacts({ value = {}, onChange }: QuickFactsProps) {
  const [draftIcon, setDraftIcon] = useState<IconKey>(DEFAULT_ICON);
  const [draftLabel, setDraftLabel] = useState("");
  const [draftVal, setDraftVal] = useState("");

  const entries = Object.entries(value);

  const add = () => {
    const label = draftLabel.trim();
    const val = draftVal.trim();
    if (!label) return;
    onChange({ ...value, [joinKey(draftIcon, label)]: val });
    setDraftLabel("");
    setDraftVal("");
    setDraftIcon(DEFAULT_ICON);
  };

  const updateIcon = (oldKey: string, newIcon: IconKey) => {
    const { label } = splitKey(oldKey);
    const next: Record<string, string> = {};
    for (const [k, v] of Object.entries(value)) {
      next[k === oldKey ? joinKey(newIcon, label) : k] = v;
    }
    onChange(next);
  };

  const updateLabel = (oldKey: string, newLabel: string) => {
    const { icon } = splitKey(oldKey);
    const next: Record<string, string> = {};
    for (const [k, v] of Object.entries(value)) {
      next[k === oldKey ? joinKey(icon, newLabel) : k] = v;
    }
    onChange(next);
  };

  const updateVal = (key: string, newVal: string) =>
    onChange({ ...value, [key]: newVal });

  const remove = (key: string) => {
    const next = { ...value };
    delete next[key];
    onChange(next);
  };

  return (
    <div className="flex flex-col gap-2">
      {entries.length > 0 && (
        <div className="grid grid-cols-[auto_1fr_1fr_auto] gap-x-2 gap-y-2 items-center mb-1">
          {/* Column headers */}
          <span />
          <span className="text-[10px] font-bold tracking-widest uppercase text-admin-secondary px-1">
            Label
          </span>
          <span className="text-[10px] font-bold tracking-widest uppercase text-admin-secondary px-1">
            Value
          </span>
          <span />

          {entries.map(([k, v]) => {
            const { icon, label } = splitKey(k);
            return (
              <React.Fragment key={k}>
                <IconPicker
                  value={icon}
                  onChange={(newIcon) => updateIcon(k, newIcon)}
                />
                <Input
                  value={label}
                  onChange={(e) => updateLabel(k, e.target.value)}
                  placeholder="e.g. Population"
                />
                <Input
                  value={v}
                  onChange={(e) => updateVal(k, e.target.value)}
                  placeholder="e.g. ~500,000"
                />
                <Button
                  variant="ghost"
                  onClick={() => remove(k)}
                  className="cursor-pointer text-[#3e3020] hover:text-red-400 transition-colors "
                >
                  <Trash2 size={14} />
                </Button>
              </React.Fragment>
            );
          })}
        </div>
      )}

      {/* Draft row */}
      <div className="grid grid-cols-[auto_1fr_1fr_auto] gap-2 items-center">
        <IconPicker value={draftIcon} onChange={setDraftIcon} />
        <Input
          value={draftLabel}
          onChange={(e) => setDraftLabel(e.target.value)}
          placeholder="Label..."
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), add())}
        />
        <Input
          value={draftVal}
          onChange={(e) => setDraftVal(e.target.value)}
          placeholder="Value..."
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), add())}
        />
        <Button
          type="button"
          onClick={add}
          className="text-admin-background bg-admin-input-active h-8 px-3 cursor-pointer font-semibold shrink-0"
        >
          <Plus size={13} />
        </Button>
      </div>
    </div>
  );
}
