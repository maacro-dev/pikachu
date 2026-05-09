import React from "react";

interface ToggleProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}

export function Toggle({ checked, onChange, label }: ToggleProps) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", userSelect: "none" }}>
      <div
        onClick={() => onChange(!checked)}
        style={{
          width: 40, height: 22, borderRadius: 11, background: checked ? "#f59e0b" : "#2e2010",
          position: "relative", transition: "background 0.25s", flexShrink: 0,
          border: `1px solid ${checked ? "#f59e0b" : "#3e3020"}`,
        }}
      >
        <div style={{
          position: "absolute", top: 2, left: checked ? 19 : 2,
          width: 16, height: 16, borderRadius: "50%", background: checked ? "#1a1208" : "#5c5040",
          transition: "left 0.25s",
        }} />
      </div>
      <span style={{ fontSize: 13, color: "#a8967c" }}>{label}</span>
    </label>
  );
}
