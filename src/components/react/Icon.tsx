import React from "react";

const ICON_PATHS: Record<string, string> = {
  upload: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12",
  edit: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
  trash: "M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
  plus: "M12 5v14M5 12h14",
  close: "M18 6L6 18M6 6l12 12",
  globe: "M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8zM2 12h20",
  chevron: "M15 18l-6-6 6-6",
  check: "M20 6L9 17l-5-5",
  image: "M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-4.5 5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM5 15l4-4 3 3 5-5 3 3V19H5v-4z",
  district: "M21 10V3h-7v7h7zm-9 0V3H5v7h7zm9 9v-7h-7v7h7zm-9 0v-7H5v7h7z",
  municipality: "M3 21h18M3 10h18M5 6l7-3 7 3v4H5V6z",
  attractions: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-5h4v2h-4zm0-4h4v2h-4zm0-4h4v2h-4z",
  festivals: "M12 2 1 21h22L12 2zm0 4.8L18.6 20H5.4L12 6.8z",
  foods: "M17 2a5 5 0 0 0-5 5v5H7a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-2V7a3 3 0 0 1 6 0v2h2V7a5 5 0 0 0-5-5z",
  events: "M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 16H5V10h14v10z",
};


export function Icon({ name, size = 16 }: { name: string; size: number }) {
  const path = ICON_PATHS[name] || "";
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: "block" }}
    >
      <path d={path} />
    </svg>
  );
}
