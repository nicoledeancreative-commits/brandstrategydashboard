"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ARCHETYPE_DEFS, AVATAR_TEST_SIZES, type ProjectData, type ProjectPatch } from "@/lib/types";
import { bestTextColor, contrastColor, contrastRatio } from "@/lib/contrast";
import { formatBlock } from "@/lib/rich-text";
import { useEditorToast, EditorToastProvider } from "./toast-host";
import { SidebarForm, type SectionKey } from "./sidebar-form";
import { PreviewPanel } from "./preview-panel";

const MOBILE_BREAKPOINT = 1140;

function isSectionComplete(section: SectionKey, project: ProjectData): boolean {
  switch (section) {
    case "foundation":
      return !!(
        project.businessWhat &&
        project.idealAudience &&
        project.audiencePain &&
        project.whyChooseYou &&
        project.competitor1 &&
        project.competitorGap
      );
    case "values":
      return !!(
        project.archetypesSelected.length === 2 &&
        project.value1Always &&
        project.value1Never &&
        project.value2Always &&
        project.value2Never &&
        project.vpAudience &&
        project.vpGoal &&
        project.vpSystem
      );
    case "visual":
      return !!(
        project.vibeWord1 &&
        project.vibeWord2 &&
        project.vibeWord3 &&
        project.vibeWord4 &&
        project.headerFont &&
        project.bodyFont &&
        project.colorPrimary &&
        project.colorAccent1 &&
        project.colorAccent2 &&
        project.colorSecondary
      );
    case "stress":
      return !!(
        project.logoUsageRules &&
        (project.darkLightPassYes || project.darkLightPassNo) &&
        (project.scalePassYes || project.scalePassNo)
      );
    case "moodboard":
      return project.moodboardImages.every((u) => u != null);
    case "logoVariations":
      return project.logoVariations.length > 0;
  }
}

function EditorInner({ initialProject }: { initialProject: ProjectData }) {
  const router = useRouter();
  const { addToast } = useEditorToast();

  const [project, setProject] = useState<ProjectData>(initialProject);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [suppressSidebarTransition, setSuppressSidebarTransition] = useState(false);
  const [leftPanelWidth, setLeftPanelWidth] = useState(32);
  const [isResizing, setIsResizing] = useState(false);
  const [hoveredSection, setHoveredSection] = useState<SectionKey | null>(null);
  const [justSaved, setJustSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const [toolbarHeight, setToolbarHeight] = useState(70);

  const leftPanelRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const panelContentRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Partial<Record<SectionKey, HTMLDivElement>>>({});

  // ---- Persistence -------------------------------------------------------

  const persistPatch = useCallback(
    async (partial: ProjectPatch) => {
      try {
        const res = await fetch(`/api/projects/${project.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(partial),
        });
        if (!res.ok) throw new Error();
      } catch {
        addToast("Could not save that change — check your connection.");
      }
    },
    [project.id, addToast]
  );

  /** Local-only update (matches the prototype: text/color edits live in memory until Save is clicked). */
  const patch = useCallback((partial: ProjectPatch) => {
    setProject((p) => ({ ...p, ...partial }));
  }, []);

  /** Image fields persist immediately, independent of the Save button — matches the prototype's image-slot behavior. */
  const patchImage = useCallback(
    (partial: ProjectPatch) => {
      setProject((p) => ({ ...p, ...partial }));
      persistPatch(partial);
    },
    [persistPatch]
  );

  const runContrastChecks = useCallback(
    (p: ProjectData, changed: "all" | (keyof ProjectData)[]) => {
      const touched = (k: string) => changed === "all" || (changed as string[]).includes(k);
      if (touched("colorSecondary") || touched("colorAccent1")) {
        const ratio = contrastRatio(p.colorSecondary, p.colorAccent1);
        if (ratio < 4.5) {
          addToast(
            `Contrast error: block header text (Secondary) on block background (Accent 1) is only ${ratio.toFixed(2)}:1 — fails WCAG AA (needs 4.5:1).`
          );
        }
      }
      if (touched("colorSecondary")) {
        const best = bestTextColor(p.colorSecondary);
        if (best.ratio < 4.5) {
          addToast(
            `Contrast error: no readable text color for the header background (Secondary) — best is ${best.ratio.toFixed(2)}:1, fails WCAG AA.`
          );
        }
      }
      if (touched("colorAccent1")) {
        const bodyRatio = contrastRatio("#1A1A1A", p.colorAccent1);
        if (bodyRatio < 4.5) {
          addToast(
            `Contrast error: default block body text on new block background (Accent 1) is only ${bodyRatio.toFixed(2)}:1 — fails WCAG AA (needs 4.5:1).`
          );
        }
      }
    },
    [addToast]
  );

  // Contrast check once on mount, matching the prototype's componentDidMount() call.
  useEffect(() => {
    runContrastChecks(initialProject, "all");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleColorChange = useCallback(
    (key: "colorPrimary" | "colorSecondary" | "colorAccent1" | "colorAccent2", value: string) => {
      const next = { ...project, [key]: value };
      patch({ [key]: value });
      if (key === "colorSecondary" || key === "colorAccent1") {
        runContrastChecks(next, [key]);
      }
    },
    [project, patch, runContrastChecks]
  );

  // ---- Save / Reset -------------------------------------------------------

  const handleSave = useCallback(async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/projects/${project.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
      });
      if (!res.ok) throw new Error();
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 2000);
    } catch {
      addToast("Could not save — check your connection and try again.");
    } finally {
      setSaving(false);
    }
  }, [project, addToast]);

  const handleReset = useCallback(async () => {
    setResetOpen(false);
    try {
      const res = await fetch(`/api/projects/${project.id}`, { method: "PUT" });
      if (!res.ok) throw new Error();
      const fresh = await res.json();
      setProject(fresh);
      addToast("All fields and images have been reset.");
    } catch {
      addToast("Could not reset this project.");
    }
  }, [project.id, addToast]);

  // ---- Layout: mobile detection, resizer, toolbar height ------------------

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    const handle = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
      setSuppressSidebarTransition(true);
      const t = setTimeout(() => setSuppressSidebarTransition(false), 50);
      return () => clearTimeout(t);
    };
    handle(mq);
    mq.addEventListener("change", handle);
    return () => mq.removeEventListener("change", handle);
  }, []);

  useEffect(() => {
    if (!isResizing) return;
    const onMove = (e: MouseEvent) => {
      const container = leftPanelRef.current?.parentElement;
      if (!container) return;
      const newWidth = (e.clientX / container.clientWidth) * 100;
      if (newWidth > 25 && newWidth < 75) {
        setLeftPanelWidth(newWidth);
        localStorage.setItem("brandDashboardLeftPanelWidth", String(Math.round(newWidth)));
      }
    };
    const onUp = () => {
      document.body.classList.remove("om-resizing");
      setIsResizing(false);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
  }, [isResizing]);

  useEffect(() => {
    // One-time hydration of a persisted preference from localStorage (unavailable during SSR,
    // so it can't be a lazy useState initializer) — not a state cascade, just a mount-time read.
    const saved = localStorage.getItem("brandDashboardLeftPanelWidth");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved) setLeftPanelWidth(parseInt(saved, 10));
  }, []);

  useEffect(() => {
    const measure = () => {
      if (toolbarRef.current) {
        const h = toolbarRef.current.getBoundingClientRect().height;
        if (h) setToolbarHeight(Math.round(h));
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [isMobile, sidebarOpen]);

  const scrollToSection = useCallback((key: SectionKey) => {
    const el = sectionRefs.current[key];
    if (el && leftPanelRef.current) {
      leftPanelRef.current.scrollTop = el.offsetTop - 20;
    }
  }, []);

  // ---- Archetypes ----------------------------------------------------------

  const toggleArchetype = useCallback(
    (id: string) => {
      const sel = project.archetypesSelected;
      let next: string[];
      if (sel.includes(id)) next = sel.filter((x) => x !== id);
      else if (sel.length < 2) next = [...sel, id];
      else next = [sel[1], id];
      patch({ archetypesSelected: next });
    },
    [project.archetypesSelected, patch]
  );

  // ---- Logo variations grid -------------------------------------------------

  const handleLogoVariationsUpload = useCallback(
    async (files: FileList) => {
      const slotsLeft = 6 - project.logoVariations.length;
      const list = Array.from(files).slice(0, Math.max(0, slotsLeft));
      const uploaded = [];
      for (const file of list) {
        const form = new FormData();
        form.append("file", file);
        try {
          const res = await fetch("/api/upload", { method: "POST", body: form });
          if (!res.ok) throw new Error();
          const { url } = await res.json();
          uploaded.push({ id: `logo_${Date.now()}_${Math.random().toString(36).slice(2)}`, url, name: file.name });
        } catch {
          addToast(`Could not upload "${file.name}".`);
        }
      }
      if (uploaded.length) {
        const next = [...project.logoVariations, ...uploaded].slice(0, 6);
        patchImage({ logoVariations: next });
      }
    },
    [project.logoVariations, patchImage, addToast]
  );

  const removeLogoVariation = useCallback(
    (id: string) => {
      patchImage({ logoVariations: project.logoVariations.filter((f) => f.id !== id) });
    },
    [project.logoVariations, patchImage]
  );

  // ---- Export ---------------------------------------------------------------

  const captureFullPreview = useCallback(async () => {
    const html2canvas = (await import("html2canvas")).default;
    const root = panelContentRef.current;
    if (!root) throw new Error("preview not ready");
    // The font pickers eagerly load every visible option's Google Fonts stylesheet (up to ~180
    // <link> tags across the three dropdowns). html2canvas's document clone re-resolves every
    // stylesheet it finds, so that many in-flight font requests can stall the clone indefinitely.
    // Only the three fonts actually used in the design matter for the exported image, so pull the
    // rest out of the live document for the duration of the capture and restore them afterward.
    const keepEncoded = [project.headerFont, project.bodyFont, project.accentFont]
      .filter(Boolean)
      .map((name) => encodeURIComponent(name).replace(/%20/g, "+"));
    const allFontLinks = Array.from(document.querySelectorAll<HTMLLinkElement>('link[href*="fonts.googleapis.com"]'));
    // Disabling (rather than removing) sidesteps any DOM-position bookkeeping — nothing to
    // restore into the right spot afterward, and it's immune to head mutations mid-capture.
    const toRestore: HTMLLinkElement[] = [];
    for (const link of allFontLinks) {
      if (!link.disabled && !keepEncoded.some((enc) => link.href.includes(enc))) {
        link.disabled = true;
        toRestore.push(link);
      }
    }
    try {
      return await html2canvas(root, {
        backgroundColor: project.colorPrimary,
        scale: 2,
        useCORS: true,
      });
    } finally {
      toRestore.forEach((link) => { link.disabled = false; });
    }
  }, [project.colorPrimary, project.headerFont, project.bodyFont, project.accentFont]);

  const exportPNG = useCallback(async () => {
    try {
      const canvas = await captureFullPreview();
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = (project.brandName || "brand-dashboard").toLowerCase().replace(/[^a-z0-9]+/g, "-") + ".png";
        a.click();
        URL.revokeObjectURL(url);
      });
    } catch {
      addToast("Could not generate PNG. Try again.");
    }
  }, [captureFullPreview, project.brandName, addToast]);

  const exportPDF = useCallback(async () => {
    try {
      const canvas = await captureFullPreview();
      const { jsPDF } = await import("jspdf");
      const MAX_DIM = 10500;
      let source: HTMLCanvasElement = canvas;
      const maxSide = Math.max(canvas.width, canvas.height);
      if (maxSide > MAX_DIM) {
        const factor = MAX_DIM / maxSide;
        const scaled = document.createElement("canvas");
        scaled.width = Math.round(canvas.width * factor);
        scaled.height = Math.round(canvas.height * factor);
        scaled.getContext("2d")?.drawImage(canvas, 0, 0, scaled.width, scaled.height);
        source = scaled;
      }
      const w = source.width;
      const h = source.height;
      const doc = new jsPDF({ unit: "px", format: [w, h], orientation: w > h ? "landscape" : "portrait" });
      doc.addImage(source.toDataURL("image/png"), "PNG", 0, 0, w, h);
      doc.save((project.brandName || "brand-dashboard").toLowerCase().replace(/[^a-z0-9]+/g, "-") + ".pdf");
    } catch {
      addToast("Could not generate PDF. Try again.");
    }
  }, [captureFullPreview, project.brandName, addToast]);

  // ---- Computed / derived values ---------------------------------------------

  const completion = useMemo(
    () => ({
      foundation: isSectionComplete("foundation", project),
      values: isSectionComplete("values", project),
      visual: isSectionComplete("visual", project),
      stress: isSectionComplete("stress", project),
      moodboard: isSectionComplete("moodboard", project),
      logoVariations: isSectionComplete("logoVariations", project),
    }),
    [project]
  );

  const archetype1Id = project.archetypesSelected[0];
  const archetype2Id = project.archetypesSelected[1];
  const archetype1 = ARCHETYPE_DEFS.find((a) => a.id === archetype1Id) ?? null;
  const archetype2 = ARCHETYPE_DEFS.find((a) => a.id === archetype2Id) ?? null;
  const hasBothArchetypes = !!(archetype1 && archetype2 && project.value1Always && project.value2Always);
  const hasProposition = !!(project.vpAudience && project.vpGoal && project.vpSystem);
  const competitorPills = [project.competitor1, project.competitor2, project.competitor3].filter(Boolean);

  const hasValue1 = !!(project.value1Always || project.value1Never);
  const hasValue2 = !!(project.value2Always || project.value2Never);
  const value1Display: [string, string] = hasValue1
    ? [`I will always ${project.value1Always || "..."}`, `I will never ${project.value1Never || "..."}`]
    : ["I will always...", "I will never..."];
  const value2Display: [string, string] = hasValue2
    ? [`I will always ${project.value2Always || "..."}`, `I will never ${project.value2Never || "..."}`]
    : ["I will always...", "I will never..."];
  const value1Color = hasValue1 ? "#1A1A1A" : "#8a8a86";
  const value2Color = hasValue2 ? "#1A1A1A" : "#8a8a86";

  const aboutPainTextColor = contrastColor(project.colorPrimary);
  const aboutGapTextColor = bestTextColor(project.colorAccent2).color;

  const colorLaws = useMemo(
    () =>
      [
        { hex: project.colorPrimary, label: "Primary", col: "1 / 3", height: "128px" },
        { hex: project.colorSecondary, label: "Secondary", col: "1 / 3", height: "92px" },
        { hex: project.colorAccent1, label: "Accent 1", col: "1 / 2", height: "64px" },
        { hex: project.colorAccent2, label: "Accent 2", col: "2 / 3", height: "64px" },
      ].map((c) => ({ ...c, textColor: contrastColor(c.hex) })),
    [project.colorPrimary, project.colorSecondary, project.colorAccent1, project.colorAccent2]
  );

  const toolbarBg = project.colorSecondary;
  const toolbarTextColor = bestTextColor(project.colorSecondary).color;
  const pageBg = project.colorPrimary;
  const blockBg = project.colorAccent1;
  const blockHeaderColor = project.colorSecondary;

  const dashboardTitle = project.brandName
    ? `${project.brandName} Brand Dashboard — Live Preview`
    : "Brand Dashboard — Live Preview";

  const leftPanelStyle = isMobile
    ? sidebarOpen
      ? {
          position: "fixed" as const,
          top: 0,
          left: 0,
          height: "100%",
          width: "85vw",
          minWidth: 320,
          maxWidth: "85vw",
          overflowY: "auto" as const,
          borderRight: "1px solid #E5E5E0",
          background: "#FFFFFF",
          zIndex: 50,
          boxShadow: "0 0 40px rgba(0,0,0,0.35)",
          transition: suppressSidebarTransition ? "none" : "transform .25s ease",
          transform: "translateX(0)",
        }
      : {
          width: 40,
          minWidth: 40,
          maxWidth: 40,
          height: "100%",
          overflow: "hidden" as const,
          borderRight: "none",
          background: "#FFFFFF",
          position: "relative" as const,
          padding: 0,
        }
    : sidebarOpen
      ? {
          width: `${leftPanelWidth}%`,
          minWidth: 320,
          maxWidth: 540,
          height: "100%",
          overflowY: "auto" as const,
          borderRight: "1px solid #E5E5E0",
          background: "#FFFFFF",
          position: "relative" as const,
        }
      : {
          width: 40,
          minWidth: 40,
          maxWidth: 40,
          height: "100%",
          overflow: "hidden" as const,
          borderRight: "none",
          background: "#FFFFFF",
          position: "relative" as const,
          padding: 0,
        };

  return (
    <div
      className="om-app-root"
      style={{
        display: "flex",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        fontFamily: "'Manrope',sans-serif",
        background: "#F4F4F2",
        color: "#1A1A1A",
        position: "relative",
      }}
    >
      {isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 40 }}
        />
      )}

      <div ref={leftPanelRef} className="om-left-panel" style={leftPanelStyle}>
        {!sidebarOpen ? (
          <div style={{ width: 40, height: "100%", background: "#FFFFFF", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <button
              onClick={() => setSidebarOpen(true)}
              title="Edit brand details"
              aria-label="Edit brand details"
              style={{
                width: 40,
                height: toolbarHeight,
                flexShrink: 0,
                background: "#F4F4F2",
                border: "none",
                borderBottom: "1px solid #E5E5E0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                padding: 0,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                <path d="m15 5 4 4" />
              </svg>
            </button>
          </div>
        ) : (
          <SidebarForm
            project={project}
            patch={patch}
            patchImage={patchImage}
            onColorChange={handleColorChange}
            onToggleArchetype={toggleArchetype}
            onCloseSidebar={() => setSidebarOpen(false)}
            toolbarHeight={toolbarHeight}
            sectionRefs={sectionRefs}
            completion={completion}
            hoveredSection={hoveredSection}
            onHoverSection={setHoveredSection}
            onScrollToSection={scrollToSection}
            onLogoVariationsUpload={handleLogoVariationsUpload}
            onLogoVariationRemove={removeLogoVariation}
          />
        )}
      </div>

      {!isMobile && sidebarOpen && (
        <div
          onMouseDown={() => {
            document.body.classList.add("om-resizing");
            setIsResizing(true);
          }}
          style={{ width: 8, height: "100%", background: "transparent", cursor: "col-resize", position: "relative", zIndex: 6, userSelect: "none" }}
        />
      )}

      <div
        className="om-right-panel"
        style={{ flex: 1, minWidth: 320, height: "100%", overflowY: "auto", background: pageBg, containerType: "inline-size" }}
      >
        <div
          ref={toolbarRef}
          className="om-toolbar"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
            padding: "15px 32px",
            background: toolbarBg,
            color: toolbarTextColor,
            flexWrap: isMobile ? "wrap" : "nowrap",
          }}
        >
          <div
            style={{
              textAlign: "left",
              fontFamily: `'${project.headerFont}',sans-serif`,
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              wordBreak: "break-word",
            }}
          >
            {dashboardTitle}
          </div>
          <div style={{ display: "flex", gap: 8, position: "relative", flexShrink: 0 }}>
            <Button
              variant="outline"
              onClick={() => router.push("/")}
              style={{ background: "transparent", color: toolbarTextColor, borderColor: toolbarTextColor }}
            >
              All Projects
            </Button>
            <button
              onClick={handleSave}
              disabled={saving}
              style={{
                background: "transparent",
                color: toolbarTextColor,
                border: `1px solid ${toolbarTextColor}`,
                borderRadius: 5,
                padding: "9px 16px",
                fontFamily: "'Manrope',sans-serif",
                fontWeight: 500,
                fontSize: 11,
                cursor: "pointer",
              }}
            >
              {justSaved ? "Saved ✓" : "Save"}
            </button>
            <button
              onClick={() => setResetOpen(true)}
              title="Reset all fields"
              aria-label="Reset all fields"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 38,
                height: 38,
                flexShrink: 0,
                background: "transparent",
                border: `1px solid ${toolbarTextColor}`,
                borderRadius: 5,
                cursor: "pointer",
                boxSizing: "border-box",
              }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={toolbarTextColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 3-6.7" />
                <path d="M3 4v5h5" />
              </svg>
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  style={{
                    background: "transparent",
                    color: toolbarTextColor,
                    border: `1px solid ${toolbarTextColor}`,
                    borderRadius: 5,
                    padding: "9px 16px",
                    fontFamily: "'Manrope',sans-serif",
                    fontWeight: 500,
                    fontSize: 11,
                    cursor: "pointer",
                  }}
                >
                  Export
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={exportPDF}>Export as PDF</DropdownMenuItem>
                <DropdownMenuItem onClick={exportPNG}>Export as PNG</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div
          ref={panelContentRef}
          className="om-panel-content"
          style={{ padding: "47px 40px 80px 40px", display: "flex", flexDirection: "column", alignItems: "center", gap: 31, background: pageBg }}
        >
          <PreviewPanel
            project={project}
            patchImage={patchImage}
            archetype1={archetype1}
            archetype2={archetype2}
            hasBothArchetypes={hasBothArchetypes}
            hasProposition={hasProposition}
            competitorPills={competitorPills}
            value1Display={value1Display}
            value2Display={value2Display}
            value1Color={value1Color}
            value2Color={value2Color}
            aboutPainTextColor={aboutPainTextColor}
            aboutGapTextColor={aboutGapTextColor}
            colorLaws={colorLaws}
            toolbarTextColor={toolbarTextColor}
            blockBg={blockBg}
            blockHeaderColor={blockHeaderColor}
            avatarTestSizes={AVATAR_TEST_SIZES}
          />
        </div>
      </div>

      <AlertDialog open={resetOpen} onOpenChange={setResetOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset all fields and uploaded images?</AlertDialogTitle>
            <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleReset}>Reset</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export function Editor({ initialProject }: { initialProject: ProjectData }) {
  return (
    <EditorToastProvider>
      <EditorInner initialProject={initialProject} />
    </EditorToastProvider>
  );
}

// Re-exported for the preview panel's rich-text rendering.
export { formatBlock };
