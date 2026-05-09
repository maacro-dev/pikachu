import React, { useState } from "react";

interface SelectProps {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export function Select({ value, onChange, options, placeholder }: SelectProps) {
  const [focused, setFocused] = useState(false);
  return (
    <select
      value={value || ""}
      onChange={e => onChange(e.target.value)}
      style={{ borderColor: focused ? "#f59e0b" : "#2e2010", appearance: "none", cursor: "pointer" }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(o => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}
