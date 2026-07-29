"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { ALL_FONT_OPTIONS, ensureFontsLoaded } from "@/lib/fonts";
import { requiredMarkStyle } from "@/lib/field-styles";

const CAP = 60;

export function FontSelect({
  label,
  value,
  onChange,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (font: string) => void;
  required?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const filtered = useMemo(() => {
    const list = search
      ? ALL_FONT_OPTIONS.filter((f) => f.toLowerCase().includes(search.toLowerCase()))
      : ALL_FONT_OPTIONS;
    return list.slice(0, CAP);
  }, [search]);

  useEffect(() => {
    ensureFontsLoaded([value, ...filtered]);
  }, [value, filtered]);

  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current); }, []);

  const fieldValue = open ? search : search || value;
  const countLabel = search
    ? `${filtered.length} match${filtered.length === 1 ? "" : "es"}`
    : `${ALL_FONT_OPTIONS.length} fonts — type to search`;

  return (
    <div style={{ flex: "1 1 150px", minWidth: 150 }}>
      <div style={{ fontSize: 11, fontWeight: 400, marginBottom: 6, color: "#1A1A1A" }}>
        {label} {required && <span style={requiredMarkStyle}>*</span>}
      </div>
      <div style={{ position: "relative" }}>
        <input
          type="text"
          value={fieldValue}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => {
            if (closeTimer.current) clearTimeout(closeTimer.current);
            setOpen(true);
          }}
          onBlur={() => {
            closeTimer.current = setTimeout(() => setOpen(false), 150);
          }}
          placeholder="Search fonts"
          style={{
            width: "100%",
            border: "1px solid #D8D8D4",
            borderRadius: 6,
            padding: 8,
            fontFamily: "var(--font-manrope), sans-serif",
            fontSize: 11,
            boxSizing: "border-box",
            outline: "none",
            background: "#F4F4F2",
            color: "#1A1A1A",
          }}
        />
        {open && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              marginTop: 4,
              maxHeight: 200,
              overflowY: "auto",
              border: "1px solid #D8D8D4",
              borderRadius: 6,
              background: "#FFFFFF",
              zIndex: 20,
              boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
            }}
          >
            <div
              style={{
                padding: "8px 10px",
                fontSize: 11,
                color: "#555555",
                borderBottom: "1px solid #eee",
                background: "#fafafa",
              }}
            >
              {countLabel}
            </div>
            {filtered.map((name) => (
              <div
                key={name}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  onChange(name);
                  setOpen(false);
                  setSearch("");
                }}
                style={{
                  padding: 8,
                  cursor: "pointer",
                  borderBottom: "1px solid #eee",
                  background: value === name ? "#F4F4F2" : "white",
                  fontFamily: `'${name}',sans-serif`,
                }}
              >
                {name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
