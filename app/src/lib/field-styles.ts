import type React from "react";

export const fieldInputStyle: React.CSSProperties = {
  width: "100%",
  border: "1px solid #D8D8D4",
  borderRadius: 8,
  padding: "11px 14px",
  fontFamily: "var(--font-manrope), sans-serif",
  fontSize: 13,
  fontWeight: 500,
  background: "#F4F4F2",
  color: "#1A1A1A",
  outline: "none",
  boxSizing: "border-box",
};

export const textareaStyle: React.CSSProperties = {
  ...fieldInputStyle,
  fontWeight: 400,
  lineHeight: 1.55,
  resize: "vertical",
};

export const fieldLabelStyle: React.CSSProperties = {
  fontFamily: "var(--font-manrope), sans-serif",
  fontSize: 12,
  fontWeight: 700,
  color: "#1A1A1A",
};

export const requiredMarkStyle: React.CSSProperties = {
  color: "#D64545",
  fontWeight: 700,
};

export const formattingButtonStyle: React.CSSProperties = {
  width: 22,
  height: 22,
  border: "1px solid #D8D8D4",
  borderRadius: 4,
  background: "#FFFFFF",
  fontSize: 11,
  cursor: "pointer",
  color: "#1A1A1A",
  padding: 0,
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
