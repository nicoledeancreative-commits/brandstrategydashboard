// WCAG contrast helpers — ported from the design prototype.

export function relLuminance(hex: string): number {
  const c = (hex || "#ffffff").replace("#", "");
  if (c.length !== 6) return 1;
  let r = parseInt(c.substr(0, 2), 16) / 255;
  let g = parseInt(c.substr(2, 2), 16) / 255;
  let b = parseInt(c.substr(4, 2), 16) / 255;
  [r, g, b] = [r, g, b].map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(hex1: string, hex2: string): number {
  const L1 = relLuminance(hex1);
  const L2 = relLuminance(hex2);
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}

export function bestTextColor(bgHex: string): { color: string; ratio: number } {
  const rw = contrastRatio(bgHex, "#FFFFFF");
  const rb = contrastRatio(bgHex, "#000000");
  return rw >= rb ? { color: "#FFFFFF", ratio: rw } : { color: "#1A1A1A", ratio: rb };
}

/** Quick perceptual-luminance based black/white pick (not a strict WCAG ratio) — used for swatch labels. */
export function contrastColor(hex: string): string {
  const c = (hex || "#ffffff").replace("#", "");
  if (c.length !== 6) return "#1A1A1A";
  const r = parseInt(c.substr(0, 2), 16);
  const g = parseInt(c.substr(2, 2), 16);
  const b = parseInt(c.substr(4, 2), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.6 ? "#1A1A1A" : "#FFFFFF";
}
