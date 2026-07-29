"use client";

import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import { ALL_FONT_OPTIONS, ensureFontsLoaded } from "@/lib/fonts";
import { requiredMarkStyle } from "@/lib/field-styles";
import { Label } from "@/components/ui/label";

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
  const [activeIndex, setActiveIndex] = useState(-1);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const optionRefs = useRef<Array<HTMLDivElement | null>>([]);
  const id = useId();
  const listboxId = `${id}-listbox`;

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

  useEffect(() => {
    if (!open) return;
    const currentIndex = filtered.indexOf(value);
    setActiveIndex(currentIndex >= 0 ? currentIndex : -1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (activeIndex < 0) return;
    optionRefs.current[activeIndex]?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const selectOption = (name: string) => {
    onChange(name);
    setOpen(false);
    setSearch("");
  };

  const fieldValue = open ? search : search || value;
  const countLabel = search
    ? `${filtered.length} match${filtered.length === 1 ? "" : "es"}`
    : `${ALL_FONT_OPTIONS.length} fonts — type to search`;
  const activeOptionId = open && activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined;

  return (
    <div style={{ flex: "1 1 150px", minWidth: 150 }}>
      <Label htmlFor={id} className="mb-1.5 block font-sans text-editor-label font-bold text-[#1A1A1A]">
        {label} {required && <span style={requiredMarkStyle}>*</span>}
      </Label>
      <div style={{ position: "relative" }}>
        <input
          id={id}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={activeOptionId}
          autoComplete="off"
          value={fieldValue}
          onChange={(e) => {
            setSearch(e.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            if (closeTimer.current) clearTimeout(closeTimer.current);
            setOpen(true);
          }}
          onBlur={() => {
            closeTimer.current = setTimeout(() => setOpen(false), 150);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              if (!open) {
                setOpen(true);
                return;
              }
              setActiveIndex((i) => (filtered.length ? (i + 1) % filtered.length : -1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              if (!open) {
                setOpen(true);
                return;
              }
              setActiveIndex((i) => (filtered.length ? (i - 1 + filtered.length) % filtered.length : -1));
            } else if (e.key === "Enter") {
              if (open && activeIndex >= 0 && filtered[activeIndex]) {
                e.preventDefault();
                selectOption(filtered[activeIndex]);
              }
            } else if (e.key === "Escape") {
              if (open) {
                e.preventDefault();
                setOpen(false);
                setSearch("");
              }
            }
          }}
          placeholder="Search fonts"
          style={{
            width: "100%",
            border: "1px solid #D8D8D4",
            borderRadius: 8,
            padding: "10px 14px",
            fontFamily: "var(--font-manrope), sans-serif",
            fontSize: 13,
            fontWeight: 500,
            boxSizing: "border-box",
            outline: "none",
            background: "#F4F4F2",
            color: "#1A1A1A",
          }}
        />
        {open && (
          <div
            role="listbox"
            id={listboxId}
            aria-label={`${label} options`}
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
            {filtered.map((name, i) => (
              <div
                key={name}
                ref={(el) => { optionRefs.current[i] = el; }}
                id={`${listboxId}-option-${i}`}
                role="option"
                aria-selected={value === name}
                onMouseDown={(e) => e.preventDefault()}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => selectOption(name)}
                style={{
                  padding: 8,
                  cursor: "pointer",
                  borderBottom: "1px solid #eee",
                  background: i === activeIndex ? "#E8E8E4" : value === name ? "#F4F4F2" : "white",
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
