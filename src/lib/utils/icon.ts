import Calendar from "@/components/icons/Calendar.astro";
import MapMarker from "@/components/icons/MapMarker.astro";
import MapPin from "@/components/icons/MapPin.astro";
import Mountains from "@/components/icons/Mountains.astro";
import Trees from "@/components/icons/Trees.astro";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";

export const iconMap: Record<string, AstroComponentFactory> = {
  "map-pin": MapPin,
  "map-marker": MapMarker,
  "mountains": Mountains,
  "calendar": Calendar,
  "trees": Trees
} ;



