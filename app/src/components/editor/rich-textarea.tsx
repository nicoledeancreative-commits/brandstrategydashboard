"use client";

import { useId, useRef } from "react";
import { applyInlineMarker, applyBulletToggle } from "@/lib/rich-text";
import { requiredMarkStyle } from "@/lib/field-styles";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const formatButtonClass =
  "flex h-[22px] w-[22px] items-center justify-center rounded border border-[#D8D8D4] bg-white text-editor-label text-[#1A1A1A] hover:bg-[#F4F4F2]";

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
  const id = useId();

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
      <div className="mb-2 flex items-baseline justify-between gap-2">
        <Label htmlFor={id} className="font-sans text-editor-label font-bold text-[#1A1A1A]">
          {label} {required && <span style={requiredMarkStyle}>*</span>}
        </Label>
        <div className="flex flex-shrink-0 gap-1">
          <button type="button" title="Bold selection" onClick={() => runOnSelection((el) => applyInlineMarker(el, value, "**"))} className={cn(formatButtonClass, "font-extrabold")}>
            B
          </button>
          <button type="button" title="Italicize selection" onClick={() => runOnSelection((el) => applyInlineMarker(el, value, "_"))} className={cn(formatButtonClass, "italic")}>
            I
          </button>
          <button type="button" title="Bullet list" onClick={() => runOnSelection((el) => applyBulletToggle(el, value))} className={formatButtonClass}>
            •
          </button>
        </div>
      </div>
      <Textarea
        id={id}
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        style={minHeight ? { minHeight } : undefined}
        className="w-full rounded-lg border border-[#D8D8D4] bg-[#F4F4F2] px-3.5 py-2.5 font-sans text-editor-body font-normal leading-relaxed text-[#1A1A1A] shadow-none outline-none focus-visible:border-[#1A1A1A] focus-visible:ring-2 focus-visible:ring-[#1A1A1A]/15"
      />
    </div>
  );
}
