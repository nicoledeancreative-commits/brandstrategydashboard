"use client";

import { useRef } from "react";
import { applyInlineMarker, applyBulletToggle } from "@/lib/rich-text";
import { fieldLabelStyle, formattingButtonStyle, requiredMarkStyle, textareaStyle } from "@/lib/field-styles";

export function RichTextarea({
  label,
  required = false,
  value,
  onChange,
  rows,
  placeholder,
  minHeight,
}: {
  label: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  rows: number;
  placeholder?: string;
  minHeight?: number;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const runOnSelection = (fn: (el: HTMLTextAreaElement) => { value: string; start: number; end: number } | null) => {
    const el = ref.current;
    if (!el) return;
    const result = fn(el);
    if (!result) return;
    onChange(result.value);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(result.start, result.end);
    });
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8, marginBottom: 8 }}>
        <div style={fieldLabelStyle}>
          {label} {required && <span style={requiredMarkStyle}>*</span>}
        </div>
        <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
          <button
            type="button"
            title="Bold selection"
            onClick={() => runOnSelection((el) => applyInlineMarker(el, value, "**"))}
            style={{ ...formattingButtonStyle, fontWeight: 800 }}
          >
            B
          </button>
          <button
            type="button"
            title="Italicize selection"
            onClick={() => runOnSelection((el) => applyInlineMarker(el, value, "_"))}
            style={{ ...formattingButtonStyle, fontStyle: "italic" }}
          >
            I
          </button>
          <button
            type="button"
            title="Bullet list"
            onClick={() => runOnSelection((el) => applyBulletToggle(el, value))}
            style={{ ...formattingButtonStyle, fontSize: 12 }}
          >
            •
          </button>
        </div>
      </div>
      <textarea
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        style={minHeight ? { ...textareaStyle, minHeight } : textareaStyle}
      />
    </div>
  );
}
