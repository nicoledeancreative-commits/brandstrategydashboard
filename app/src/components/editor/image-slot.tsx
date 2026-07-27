"use client";

import React, { useCallback, useRef, useState } from "react";
import { ImageIcon } from "lucide-react";
import { useEditorToast } from "./toast-host";

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
  style,
}: ImageSlotProps) {
  const { addToast } = useEditorToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [busy, setBusy] = useState(false);
  const [hovered, setHovered] = useState(false);
  const dragDepth = useRef(0);

  const borderRadius =
    shape === "circle" ? "50%" : shape === "rect" ? 0 : radius;

  const ingest = useCallback(
    async (file: File | undefined) => {
      if (!file) return;
      if (!ACCEPT.split(",").includes(file.type)) {
        addToast("Drop a PNG, JPEG, WebP, AVIF, or SVG image.");
        return;
      }
      setBusy(true);
      try {
        const uploadedUrl = await uploadFile(file);
        onUpload?.(uploadedUrl);
      } catch {
        addToast("Could not upload that image. Try again.");
      } finally {
        setBusy(false);
      }
    },
    [addToast, onUpload]
  );

  const handleClick = () => {
    if (readOnly || busy) return;
    inputRef.current?.click();
  };

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        overflow: "hidden",
        background: url ? "transparent" : "rgba(0,0,0,0.04)",
        borderRadius,
        cursor: readOnly ? "default" : "pointer",
        ...style,
      }}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
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
        !readOnly && (
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
              color: "rgba(0,0,0,0.55)",
              font: "13px/1.3 system-ui,-apple-system,sans-serif",
            }}
          >
            <ImageIcon size={26} strokeWidth={1.6} style={{ opacity: 0.45 }} />
            <div style={{ maxWidth: "90%", fontWeight: 500, letterSpacing: "0.01em" }}>
              {busy ? "Uploading…" : placeholder}
            </div>
            {!busy && (
              <div style={{ fontSize: 11 }}>
                or <u style={{ textUnderlineOffset: 2 }}>browse files</u>
              </div>
            )}
          </div>
        )
      )}

      {ring && !url && !readOnly && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            borderRadius,
            border: `1.5px dashed ${dragOver ? "#01817F" : "rgba(0,0,0,0.25)"}`,
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
            outline: "2px solid #01817F",
            outlineOffset: -2,
            background: "rgba(1,129,127,0.10)",
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
            opacity: hovered ? 1 : 0,
            pointerEvents: hovered ? "auto" : "none",
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
  font: "11px/1 system-ui,-apple-system,sans-serif",
};
