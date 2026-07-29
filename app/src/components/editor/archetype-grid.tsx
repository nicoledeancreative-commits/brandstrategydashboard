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
          <div
            key={a.id}
            onClick={() => onToggle(a.id)}
            style={{
              border: "1px solid #D8D8D4",
              background: isSel ? "#1A1A1A" : "#F4F4F2",
              borderRadius: 8,
              padding: "11px 10px",
              cursor: "pointer",
              textAlign: "center",
              transition: "all .15s",
            }}
          >
            <div style={{ fontFamily: "var(--font-manrope), sans-serif", fontSize: 11, fontWeight: 700, color: isSel ? "#FFFFFF" : "#1A1A1A" }}>
              {a.label}
            </div>
            <div style={{ fontSize: 10.5, marginTop: 4, color: isSel ? "#CBCBCB" : "#666666", lineHeight: 1.4 }}>
              {a.desc}
            </div>
          </div>
        );
      })}
    </div>
  );
}
