import type React from "react";

export const requiredMarkStyle: React.CSSProperties = {
  color: "var(--om-required, #D64545)",
  fontWeight: 700,
};

export const sectionHeaderStyle: React.CSSProperties = {
  background: "var(--om-band-bg, #5C5C58)",
  color: "var(--om-band-fg, #F4F4F2)",
  padding: "24px 32px",
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
};

export const sectionTitleStyle: React.CSSProperties = {
  margin: 0,
  fontFamily: "var(--font-libre-caslon-display), serif",
  letterSpacing: "0.2px",
  fontSize: 22,
  fontWeight: 400,
  color: "var(--om-band-fg, #F4F4F2)",
};

export const sectionDescStyle: React.CSSProperties = {
  fontFamily: "var(--font-manrope), sans-serif",
  fontSize: 12,
  fontWeight: 500,
  marginTop: 10,
  lineHeight: 1.5,
  color: "var(--om-band-desc-fg, #D9D9D5)",
};

export const sectionPadStyle: React.CSSProperties = {
  padding: "23px 32px",
  display: "flex",
  flexDirection: "column",
  gap: 21,
};
