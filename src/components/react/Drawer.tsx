import React from "react";
import { Icon } from "./Icon";

interface DrawerProps extends React.PropsWithChildren {
  open: boolean;
  title: string;
  onClose: () => void;
}

export function Drawer({ open, title, onClose, children }: DrawerProps) {
  return (
    <>
      {open && <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 40, backdropFilter: "blur(2px)" }} />}
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0, width: "min(680px, 95vw)",
        background: "#0f0b06", borderLeft: "1px solid #1e1608",
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
        zIndex: 50, display: "flex", flexDirection: "column",
        boxShadow: open ? "-20px 0 60px rgba(0,0,0,0.5)" : "none",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: "1px solid #1e1608", flexShrink: 0 }}>
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#f0e6d3" }}>{title}</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#5c5040", cursor: "pointer", padding: 4 }}>
            <Icon name="close" size={18} />
          </button>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
          {children}
        </div>
      </div>
    </>
  );
}
