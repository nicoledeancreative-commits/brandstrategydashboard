"use client";

import { ARCHETYPE_DEFS } from "@/lib/types";

export function ArchetypeGrid({
  selected,
  onToggle,
}: {
  selected: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 8, marginTop: 10 }}>
      {ARCHETYPE_DEFS.map((a) => {
        const isSel = selected.includes(a.id);
        return (
          <button
            key={a.id}
            type="button"
            aria-pressed={isSel}
            onClick={() => onToggle(a.id)}
            style={{
              border: "1px solid var(--om-input-border, #D8D8D4)",
              background: isSel ? "var(--om-accent-bg, #1A1A1A)" : "var(--om-input-bg, #F4F4F2)",
              borderRadius: 8,
              padding: "11px 10px",
              cursor: "pointer",
              textAlign: "center",
              transition: "all .15s",
            }}
          >
            <div style={{ fontFamily: "var(--font-manrope), sans-serif", fontSize: 11, fontWeight: 700, color: isSel ? "var(--om-accent-fg, #FFFFFF)" : "var(--om-text, #1A1A1A)" }}>
              {a.label}
            </div>
            <div style={{ fontFamily: "var(--font-manrope), sans-serif", fontSize: 10.5, marginTop: 4, color: isSel ? "var(--om-accent-desc, #CBCBCB)" : "var(--om-text-muted, #666666)", lineHeight: 1.4 }}>
              {a.desc}
            </div>
          </button>
        );
      })}
    </div>
  );
}
