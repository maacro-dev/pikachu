import React from "react";
import { Icon } from "./Icon";
import { cn } from "@/lib/utils";
import { StatusBadge } from "./StatusBadge";
import { useStore } from "@nanostores/react"
import { $adminData } from "@/lib/store/admin-store";

export type ContentStatus = "published" | "draft" | (string & {});
type ContentType = | "district" | "municipality" | "attractions" | "festivals" | "foods" | "events" | (string & {});

type StatIcon = "district" | "municipality" | "globe" | "check";

interface StatItem {
  label: string;
  value: number;
  icon: StatIcon;
  colorClass: string;
}


const TYPE_STYLES: Record<string, string> = {
  district: "bg-amber-500/10 text-amber-400",
  municipality: "bg-violet-500/10 text-violet-400",
  attractions: "bg-sky-500/10 text-sky-400",
  festivals: "bg-pink-500/10 text-pink-400",
  foods: "bg-orange-500/10 text-orange-400",
  events: "bg-emerald-500/10 text-emerald-400",
};

const STAT_ICON_STYLES: Record<StatIcon, string> = {
  district: "text-amber-400",
  municipality: "text-violet-400",
  globe: "text-sky-400",
  check: "text-emerald-400",
};

export function Dashboard() {

  const { data: { districts, municipalities, attractions, foods, festivals, events } } = useStore($adminData);
  const content = [...attractions, ...foods, ...festivals, ...events];

  const stats: StatItem[] = [
    {
      label: "Districts",
      value: districts.length,
      icon: "district",
      colorClass: STAT_ICON_STYLES.district,
    },
    {
      label: "Municipalities",
      value: municipalities.length,
      icon: "municipality",
      colorClass: STAT_ICON_STYLES.municipality,
    },
    {
      label: "Total Content",
      value: content.length,
      icon: "globe",
      colorClass: STAT_ICON_STYLES.globe,
    },
    {
      label: "Published",
      value: content.filter((c) => c.status === "published").length,
      icon: "check",
      colorClass: STAT_ICON_STYLES.check,
    },
  ];

  const recent = [...content].slice(-4).reverse();

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-[clamp(2rem,5vw,3.2rem)] text-admin-foreground">
          Dashboard
        </h1>
        <p className="m-0 text-[13px] text-admin-secondary">
          Welcome back — here&apos;s your content overview.
        </p>
      </div>

      <div className="mb-8 grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-3">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col gap-2.5 rounded-xl border border-admin-border bg-[#0f0b06] p-4" >
            <div className={s.colorClass}>
              <Icon name={s.icon} size={20} />
            </div>
            <div className="text-2xl font-semibold leading-none text-admin-foreground">
              {s.value}
            </div>
            <div className="text-xs font-bold uppercase tracking-widest text-admin-secondary">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div>
        <div className="mb-4 text-[10px] font-extrabold uppercase tracking-[0.14em] text-admin-secondary">
          Recent Content
        </div>

        <div className="overflow-hidden rounded-xl border border-admin-border bg-[#0f0b06]">
          {recent.map((item, i) => (
            <div key={item.id} className={`flex items-center gap-3 px-4 py-3.5 ${i < recent.length - 1 ? "border-b border-[#130f08]" : ""}`} >
              <TypeBadge type={item.type} />
              <div className="min-w-0 flex-1">
                <div className="truncate text-[13px] font-semibold text-admin-foreground">
                  {item.name}
                </div>
                <div className="font-mono text-[11px] text-admin-secondary">
                  {item.slug}
                </div>
              </div>

              <StatusBadge status={item.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


function TypeBadge({ type }: { type: ContentType }) {
  const classes = TYPE_STYLES[type] ?? "bg-neutral-500/10 text-neutral-400";
  return (
    <span
      className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em]", classes)} >
      {type}
    </span>
  );
}
