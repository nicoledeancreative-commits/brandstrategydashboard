"use client";

import React, { createContext, useCallback, useContext, useRef, useState } from "react";

interface ToastItem {
  id: string;
  message: string;
}

interface ToastContextValue {
  addToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useEditorToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useEditorToast must be used within <EditorToastProvider>");
  return ctx;
}

export function EditorToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: string) => {
    setToasts((list) => list.filter((t) => t.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const addToast = useCallback(
    (message: string) => {
      const id = Date.now() + "_" + Math.random().toString(36).slice(2);
      setToasts((list) => [...list, { id, message }]);
      const timer = setTimeout(() => dismiss(id), 9000);
      timers.current.set(id, timer);
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div
        style={{
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: 100,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          maxWidth: 360,
        }}
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            style={{
              background: "#B3261E",
              color: "#fff",
              borderRadius: 8,
              padding: "11px 14px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.28)",
              display: "flex",
              alignItems: "flex-start",
              gap: 8,
              fontFamily: "'Manrope',sans-serif",
              fontSize: 11,
              fontWeight: 500,
              lineHeight: 1.45,
            }}
          >
            <div style={{ flex: 1 }}>{t.message}</div>
            <button
              onClick={() => dismiss(t.id)}
              style={{
                background: "transparent",
                border: "none",
                color: "#fff",
                fontSize: 15,
                lineHeight: 1,
                cursor: "pointer",
                padding: 0,
                flexShrink: 0,
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
