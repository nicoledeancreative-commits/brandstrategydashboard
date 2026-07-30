"use client";

import React, { useCallback, useRef, useState } from "react";
import { ImageIcon } from "lucide-react";
import { toast } from "sonner";

const ACCEPT = "image/png,image/jpeg,image/webp,image/avif,image/svg+xml";

async function uploadFile(file: File): Promise<string> {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch("/api/upload", { method: "POST", body: form });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error || "Upload failed");
  }
  const body = await res.json();
  return body.url as string;
}

export interface ImageSlotProps {
  url: string | null;
  onUpload?: (url: string) => void;
  onRemove?: () => void;
  placeholder?: string;
  shape?: "rect" | "rounded" | "circle";
  radius?: number;
  fit?: "cover" | "contain";
  readOnly?: boolean;
  /** Draws the component's own thin dashed empty-state ring. Disable when the caller already supplies a border via `style`. */
  ring?: boolean;
  /** Use a light placeholder text/icon color for slots with a dark background. */
  dark?: boolean;
  style?: React.CSSProperties;
}

export function ImageSlot({
  url,
  onUpload,
  onRemove,
  placeholder = "Drop an image",
  shape = "rounded",
  radius = 12,
  fit = "cover",
  readOnly = false,
  ring = true,
  dark = false,
  style,
}: ImageSlotProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [busy, setBusy] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const dragDepth = useRef(0);
  const showControls = hovered || focused;

  const borderRadius =
    shape === "circle" ? "50%" : shape === "rect" ? 0 : radius;

  const ingest = useCallback(
    async (file: File | undefined) => {
      if (!file) return;
      if (!ACCEPT.split(",").includes(file.type)) {
        toast.error("Drop a PNG, JPEG, WebP, AVIF, or SVG image.");
        return;
      }
      setBusy(true);
      try {
        const uploadedUrl = await uploadFile(file);
        onUpload?.(uploadedUrl);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Could not upload that image. Try again.");
      } finally {
        setBusy(false);
      }
    },
    [onUpload]
  );

  const handleClick = () => {
    if (readOnly || busy) return;
    inputRef.current?.click();
  };

  return (
    <div
      className="om-image-slot"
      role={readOnly ? undefined : "button"}
      tabIndex={readOnly ? undefined : 0}
      aria-label={readOnly ? undefined : url ? "Replace image" : placeholder}
      style={{
        position: "relative",
        display: "inline-block",
        overflow: "hidden",
        background: "transparent",
        borderRadius,
        cursor: readOnly ? "default" : "pointer",
        ...style,
      }}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (readOnly || busy || e.target !== e.currentTarget) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
      }}
      onDragEnter={(e) => {
        if (readOnly) return;
        e.preventDefault();
        e.stopPropagation();
        dragDepth.current++;
        setDragOver(true);
      }}
      onDragOver={(e) => {
        if (readOnly) return;
        e.preventDefault();
        e.stopPropagation();
      }}
      onDragLeave={(e) => {
        if (readOnly) return;
        e.preventDefault();
        e.stopPropagation();
        dragDepth.current = Math.max(0, dragDepth.current - 1);
        if (dragDepth.current === 0) setDragOver(false);
      }}
      onDrop={(e) => {
        if (readOnly) return;
        e.preventDefault();
        e.stopPropagation();
        dragDepth.current = 0;
        setDragOver(false);
        ingest(e.dataTransfer.files?.[0]);
      }}
    >
      {!readOnly && (
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT}
          hidden
          onChange={(e) => {
            ingest(e.target.files?.[0]);
            e.target.value = "";
          }}
        />
      )}

      {url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          alt=""
          draggable={false}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: fit,
            userSelect: "none",
          }}
        />
      ) : (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            textAlign: "center",
            padding: 12,
            boxSizing: "border-box",
            color: dark ? "rgba(255,255,255,0.65)" : "var(--om-text-muted, #6B6B6B)",
            fontFamily: "var(--font-manrope), sans-serif",
            fontSize: 13,
            lineHeight: 1.3,
          }}
        >
          <ImageIcon size={26} strokeWidth={1.6} style={{ opacity: 0.45 }} />
          <div style={{ maxWidth: "90%", fontWeight: 500, letterSpacing: "0.01em" }}>
            {busy ? "Uploading…" : placeholder}
          </div>
          {!readOnly && !busy && (
            <div style={{ fontSize: 11 }}>
              or <u style={{ textUnderlineOffset: 2 }}>browse files</u>
            </div>
          )}
        </div>
      )}

      {ring && !url && !readOnly && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            borderRadius,
            border: `1.5px dashed ${dragOver ? (dark ? "#FFFFFF" : "var(--om-text, #1A1A1A)") : dark ? "rgba(255,255,255,0.3)" : "var(--om-dashed-border, rgba(0,0,0,0.25))"}`,
            transition: "border-color .12s",
          }}
        />
      )}
      {dragOver && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            outline: `2px solid ${dark ? "#FFFFFF" : "var(--om-text, #1A1A1A)"}`,
            outlineOffset: -2,
            background: dark ? "rgba(255,255,255,0.08)" : "var(--om-dragover-bg, rgba(0,0,0,0.06))",
            borderRadius,
          }}
        />
      )}

      {!readOnly && url && (onUpload || onRemove) && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            gap: 6,
            zIndex: 2,
            opacity: showControls ? 1 : 0,
            pointerEvents: showControls ? "auto" : "none",
            transition: "opacity .12s",
          }}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              inputRef.current?.click();
            }}
            style={controlButtonStyle}
          >
            Replace
          </button>
          {onRemove && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              style={controlButtonStyle}
            >
              Remove
            </button>
          )}
        </div>
      )}
    </div>
  );
}

const controlButtonStyle: React.CSSProperties = {
  appearance: "none",
  border: 0,
  borderRadius: 6,
  padding: "5px 10px",
  cursor: "pointer",
  background: "rgba(0,0,0,.65)",
  color: "#fff",
  fontFamily: "var(--font-manrope), sans-serif",
  fontSize: 11,
  lineHeight: 1,
};
