import type React from "react";

export const requiredMarkStyle: React.CSSProperties = {
  color: "#D64545",
  fontWeight: 700,
};

export const sectionHeaderStyle: React.CSSProperties = {
  background: "#F4F4F2",
  color: "#1A1A1A",
  padding: "24px 32px",
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
};

export const sectionTitleStyle: React.CSSProperties = {
  fontFamily: "var(--font-libre-caslon-display), serif",
  letterSpacing: "0.2px",
  fontSize: 22,
  fontWeight: 400,
  color: "#1A1A1A",
};

export const sectionDescStyle: React.CSSProperties = {
  fontFamily: "var(--font-manrope), sans-serif",
  fontSize: 12,
  fontWeight: 500,
  marginTop: 10,
  lineHeight: 1.5,
  color: "#1A1A1A",
};

export const sectionPadStyle: React.CSSProperties = {
  padding: "23px 32px",
  display: "flex",
  flexDirection: "column",
  gap: 21,
};
