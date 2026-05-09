import React from "react";
import {
  Utensils,
  ShoppingBag,
  Store,
  Fish,
  IceCreamBowl,
  Landmark,
  TreePine,
  Waves,
  Mountain,
  Camera,
  Star,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Config ─────────────────────────────────────────────────────────────────────

interface BadgeConfig {
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  classes: string;
}

const BADGE_CONFIG: Record<string, BadgeConfig> = {
  // Food types
  local: {
    label: "Local",
    icon: Utensils,
    classes: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
  street: {
    label: "Street",
    icon: ShoppingBag,
    classes: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  },
  restaurant: {
    label: "Restaurant",
    icon: Store,
    classes: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
  seafood: {
    label: "Seafood",
    icon: Fish,
    classes: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  },
  dessert: {
    label: "Dessert",
    icon: IceCreamBowl,
    classes: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  },

  // Attraction types
  heritage: {
    label: "Heritage",
    icon: Landmark,
    classes: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  },
  nature: {
    label: "Nature",
    icon: TreePine,
    classes: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  beach: {
    label: "Beach",
    icon: Waves,
    classes: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  },
  mountain: {
    label: "Mountain",
    icon: Mountain,
    classes: "bg-stone-500/10 text-stone-400 border-stone-500/20",
  },
  sightseeing: {
    label: "Sightseeing",
    icon: Camera,
    classes: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  },
  cultural: {
    label: "Cultural",
    icon: Star,
    classes: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  },
};

const FALLBACK: BadgeConfig = {
  label: "Other",
  icon: MapPin,
  classes: "bg-[#1e1608] text-[#5c5040] border-[#2e2010]",
};

// ── Component ──────────────────────────────────────────────────────────────────

interface TypeBadgeProps {
  type: string;
  className?: string;
}

export function TypeBadge({ type, className }: TypeBadgeProps) {
  const config = BADGE_CONFIG[type?.toLowerCase()] ?? FALLBACK;
  const { label, icon: Icon, classes } = config;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full",
        "text-[10px] font-bold tracking-wide border whitespace-nowrap",
        classes,
        className
      )}
    >
      <Icon size={10} className="shrink-0" />
      {label}
    </span>
  );
}
