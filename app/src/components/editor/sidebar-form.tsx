"use client";

import { useId, type RefObject } from "react";
import type { LogoVariationFile, ProjectData, ProjectPatch } from "@/lib/types";
import { requiredMarkStyle, sectionDescStyle, sectionHeaderStyle, sectionPadStyle, sectionTitleStyle } from "@/lib/field-styles";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { RichTextEditor } from "./rich-text-editor";
import { ArchetypeGrid } from "./archetype-grid";
import { FontSelect } from "./font-select";
import { ImageSlot } from "./image-slot";

export type SectionKey = "foundation" | "values" | "visual" | "stress" | "moodboard" | "logoVariations";

const SECTION_LABELS: Record<SectionKey, string> = {
  foundation: "01. Brand Foundation",
  values: "02. Operating Values & Personality",
  visual: "03. Visual Direction",
  stress: "04. Stress Test & System Laws",
  moodboard: "05. Moodboard Imagery",
  logoVariations: "06. Logo Variations Grid",
};

const inputClass =
  "h-auto w-full rounded-lg border border-[#D8D8D4] bg-[#F4F4F2] px-3.5 py-2.5 font-sans text-editor-body font-medium text-[#1A1A1A] shadow-none outline-none focus-visible:border-[#1A1A1A] focus-visible:ring-2 focus-visible:ring-[#1A1A1A]/15";

const groupLabelClass = "font-sans text-editor-label font-bold text-[#1A1A1A]";

function SectionHeader({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div style={sectionHeaderStyle}>
      <div style={{ flex: 1 }}>
        <h2 style={sectionTitleStyle}>
          {number}&nbsp;&nbsp;{title}
        </h2>
        <div style={sectionDescStyle}>{description}</div>
      </div>
    </div>
  );
}

export function SidebarForm({
  project,
  patch,
  patchImage,
  onColorChange,
  onToggleArchetype,
  onCloseSidebar,
  toolbarHeight,
  sectionRefs,
  completion,
  hoveredSection,
  onHoverSection,
  onScrollToSection,
  onLogoVariationsUpload,
  onLogoVariationRemove,
}: {
  project: ProjectData;
  patch: (p: ProjectPatch) => void;
  patchImage: (p: ProjectPatch) => void;
  onColorChange: (key: "colorPrimary" | "colorSecondary" | "colorAccent1" | "colorAccent2", value: string) => void;
  onToggleArchetype: (id: string) => void;
  onCloseSidebar: () => void;
  toolbarHeight: number;
  sectionRefs: RefObject<Partial<Record<SectionKey, HTMLDivElement>>>;
  completion: Record<SectionKey, boolean>;
  hoveredSection: SectionKey | null;
  onHoverSection: (key: SectionKey | null) => void;
  onScrollToSection: (key: SectionKey) => void;
  onLogoVariationsUpload: (files: FileList) => void;
  onLogoVariationRemove: (id: string) => void;
}) {
  const setRef = (key: SectionKey) => (el: HTMLDivElement | null) => {
    if (el) sectionRefs.current[key] = el;
  };
  const logoUsageRulesId = useId();

  return (
    <>
      <div style={{ padding: "27px 32px", borderBottom: "1px solid #000000", background: "#000000", position: "sticky", top: 0, zIndex: 30 }}>
        <button
          onClick={onCloseSidebar}
          title="Close"
          aria-label="Collapse sidebar"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 40,
            height: toolbarHeight,
            flexShrink: 0,
            background: "transparent",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#CBCBCB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
        <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#CBCBCB", fontWeight: 500, maxWidth: "calc(100% - 72px)" }}>
          Brand Strategy One Pager
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <input
            aria-label="Brand name"
            value={project.brandName}
            onChange={(e) => patch({ brandName: e.target.value })}
            placeholder="Brand Name"
            style={{
              fieldSizing: "content" as never,
              minWidth: 60,
              maxWidth: "100%",
              background: "transparent",
              border: "none",
              borderBottom: "1px solid #444",
              color: "#CBCBCB",
              fontFamily: "var(--font-libre-caslon-display), serif",
              letterSpacing: "0.82px",
              fontSize: 24,
              fontWeight: 400,
              padding: "6px 0",
              outline: "none",
            }}
          />
          <input
            aria-label="Industry"
            value={project.industry}
            onChange={(e) => patch({ industry: e.target.value })}
            placeholder="Type of industry"
            style={{
              fieldSizing: "content" as never,
              minWidth: 60,
              maxWidth: "100%",
              background: "transparent",
              border: "none",
              borderBottom: "1px solid #444",
              color: "#CBCBCB",
              fontFamily: "var(--font-manrope), sans-serif",
              fontSize: 12,
              fontWeight: 600,
              padding: "4px 0",
              outline: "none",
            }}
          />
        </div>
      </div>

      {/* 01. Brand Foundation */}
      <div ref={setRef("foundation")}>
        <SectionHeader number="01." title="Brand Foundation" description="The core of your brand: what you do, who it's for, and why they choose you." />
      </div>
      <div className="om-form-pad" style={sectionPadStyle}>
        <RichTextEditor
          label="What is your service or product? Be literal and concise."
          required
          minHeight={80}
          value={project.businessWhat}
          onChange={(v) => patch({ businessWhat: v })}
        />
        <RichTextEditor
          label="Is there a unique story behind the name — how and why did you start?"
          minHeight={160}
          value={project.originStory}
          onChange={(v) => patch({ originStory: v })}
        />
        <RichTextEditor
          label="Who is your ideal audience? Think age, role, personality, income."
          required
          minHeight={56}
          value={project.idealAudience}
          onChange={(v) => patch({ idealAudience: v })}
        />
        <RichTextEditor
          label="A direct quote from your ideal client describing that stressor"
          minHeight={56}
          placeholder={'"My business deserves to be taken seriously, but..."'}
          value={project.audiencePainQuote}
          onChange={(v) => patch({ audiencePainQuote: v })}
        />
        <RichTextEditor
          label="What core stressor is keeping your ideal client up at 2am?"
          required
          minHeight={56}
          value={project.audiencePain}
          onChange={(v) => patch({ audiencePain: v })}
        />
        <RichTextEditor
          label="Why would customers pick YOU over your competitors?"
          required
          minHeight={56}
          value={project.whyChooseYou}
          onChange={(v) => patch({ whyChooseYou: v })}
        />
        <div>
          <div className={groupLabelClass} style={{ marginBottom: 10 }}>
            Top 2–3 competitors, and the gap you can own <span style={requiredMarkStyle}>*</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {(["competitor1", "competitor2", "competitor3"] as const).map((key, i) => (
              <div key={key} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span className="font-sans text-editor-body font-normal text-[#1A1A1A]">{i + 1}.</span>
                <Input
                  aria-label={`Competitor ${i + 1}`}
                  value={project[key]}
                  onChange={(e) => patch({ [key]: e.target.value } as ProjectPatch)}
                  className={inputClass}
                />
              </div>
            ))}
          </div>
          <div style={{ marginTop: 32 }}>
            <RichTextEditor
              label="The Gap You Can Own"
              required
              minHeight={120}
              placeholder="What visual/verbal gap are they missing? (e.g. all sites are cold corporate blue; there's room for warm, approachable tones)"
              value={project.competitorGap}
              onChange={(v) => patch({ competitorGap: v })}
            />
          </div>
        </div>
      </div>

      {/* 02. Operating Values & Personality */}
      <div ref={setRef("values")}>
        <SectionHeader
          number="02."
          title="Operating Values & Personality"
          description="The operational boundaries that make your brand consistent and instantly recognizable in how it behaves, not just how it looks."
        />
      </div>
      <div className="om-form-pad" style={sectionPadStyle}>
        <div>
          <div className="mb-1 font-sans text-editor-body font-normal text-[#1A1A1A]">
            <b>Select two archetypes that best describe how you naturally run your business</b>{" "}
            <span style={requiredMarkStyle}>*</span>
          </div>
          <ArchetypeGrid selected={project.archetypesSelected} onToggle={onToggleArchetype} />
        </div>

        <div>
          <div className="mb-4 font-sans text-editor-body font-normal text-[#1A1A1A]">
            <b>
              Core value statements <span style={requiredMarkStyle}>*</span>
            </b>
          </div>
          {(
            [
              ["Value 1", "value1Always", "value1Never"],
              ["Value 2", "value2Always", "value2Never"],
            ] as const
          ).map(([label, alwaysKey, neverKey], i) => (
            <div key={label} style={{ marginBottom: i === 0 ? 28 : 0 }}>
              <div className="mb-2.5 font-sans text-editor-label font-bold text-[#666666]">{label}</div>
              <div className="mb-1 font-sans text-[14px] text-[#1A1A1A]">
                <b>&quot;I will always...&quot;</b>
              </div>
              <Input
                aria-label={`${label} — I will always`}
                value={project[alwaysKey]}
                onChange={(e) => patch({ [alwaysKey]: e.target.value } as ProjectPatch)}
                placeholder="deliver clean, one-page execution frameworks."
                className={inputClass}
              />
              <div className="mt-4 mb-1 font-sans text-[14px] text-[#1A1A1A]">
                <b>&quot;I will never...&quot;</b>
              </div>
              <Input
                aria-label={`${label} — I will never`}
                value={project[neverKey]}
                onChange={(e) => patch({ [neverKey]: e.target.value } as ProjectPatch)}
                placeholder="overwhelm clients with dense theory manuals."
                className={inputClass}
              />
            </div>
          ))}
        </div>

        <div>
          <div className="mb-2.5 font-sans text-editor-label font-bold text-[#666666]">
            Craft your core value proposition <span style={requiredMarkStyle}>*</span>
          </div>
          <div className="mt-2 mb-1 font-sans text-editor-body font-medium text-[#333333]">
            <b className="text-[14px] text-[#1A1A1A]">&quot;I help...&quot;</b>
          </div>
          <div style={{ marginBottom: 10 }}>
            <Input aria-label="Target audience" value={project.vpAudience} onChange={(e) => patch({ vpAudience: e.target.value })} placeholder="target audience" className={inputClass} />
          </div>
          <div className="mt-2 mb-1 font-sans text-[14px] font-medium text-[#333333]">
            <b>&quot;achieve...&quot;</b>
          </div>
          <div style={{ marginBottom: 10 }}>
            <Input aria-label="Specific goal or transformation" value={project.vpGoal} onChange={(e) => patch({ vpGoal: e.target.value })} placeholder="specific goal / transformation" className={inputClass} />
          </div>
          <div className="mt-2 mb-1 font-sans text-[14px] font-medium text-[#1A1A1A]">
            <b>&quot;through...&quot;</b>
          </div>
          <Input aria-label="Unique system or values" value={project.vpSystem} onChange={(e) => patch({ vpSystem: e.target.value })} placeholder="your unique system / values" className={inputClass} />
        </div>
      </div>

      {/* 03. Visual Direction */}
      <div ref={setRef("visual")}>
        <SectionHeader number="03." title="Visual Direction" description="Locking in the visual constraints: mood, type, color, and mark." />
      </div>
      <div className="om-form-pad" style={sectionPadStyle}>
        <div>
          <div className={groupLabelClass} style={{ marginBottom: 8 }}>
            Words that describe your desired vibe and look <span style={requiredMarkStyle}>*</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 8 }}>
            <Input aria-label="Vibe word 1" value={project.vibeWord1} onChange={(e) => patch({ vibeWord1: e.target.value })} placeholder="warm" className={inputClass} />
            <Input aria-label="Vibe word 2" value={project.vibeWord2} onChange={(e) => patch({ vibeWord2: e.target.value })} placeholder="confident" className={inputClass} />
            <Input aria-label="Vibe word 3" value={project.vibeWord3} onChange={(e) => patch({ vibeWord3: e.target.value })} placeholder="approachable" className={inputClass} />
            <Input aria-label="Vibe word 4" value={project.vibeWord4} onChange={(e) => patch({ vibeWord4: e.target.value })} placeholder="polished" className={inputClass} />
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 15 }}>
          <FontSelect label="Header font" required value={project.headerFont} onChange={(f) => patch({ headerFont: f })} />
          <FontSelect label="Body font" required value={project.bodyFont} onChange={(f) => patch({ bodyFont: f })} />
          <FontSelect label="Accent font" value={project.accentFont} onChange={(f) => patch({ accentFont: f })} />
        </div>

        <div>
          <div className="mb-2.5 font-sans text-editor-body font-normal text-[#1A1A1A]">
            Strategic color palette <span style={requiredMarkStyle}>*</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(70px, 1fr))", gap: 11 }}>
            {(
              [
                ["colorPrimary", "Primary"],
                ["colorSecondary", "Secondary"],
                ["colorAccent1", "Accent 1"],
                ["colorAccent2", "Accent 2"],
              ] as const
            ).map(([key, label]) => (
              <div key={key} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                <input
                  type="color"
                  aria-label={`${label} color`}
                  className="om-color-swatch"
                  value={project[key]}
                  onChange={(e) => onColorChange(key, e.target.value)}
                  style={{ width: "100%", height: 44, border: "1px solid #D8D8D4", borderRadius: 6, padding: 0, cursor: "pointer" }}
                />
                <div className="font-sans text-editor-label font-semibold uppercase text-[#1A1A1A]">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-2.5 font-sans text-editor-body font-normal text-[#1A1A1A]">
            Primary Logo <span style={requiredMarkStyle}>*</span>
          </div>
          <div style={{ minWidth: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <ImageSlot
              url={project.primaryLogoUrl}
              onUpload={(url) => patchImage({ primaryLogoUrl: url })}
              onRemove={() => patchImage({ primaryLogoUrl: null })}
              placeholder="Drag & drop your logo here"
              fit="contain"
              ring={false}
              style={{ width: 241, maxWidth: "100%", height: 240, border: "2px dashed #1A1A1A", borderRadius: 8, background: "#1A1A1A" }}
            />
          </div>
        </div>

        <div>
          <div className="mb-2.5 font-sans text-editor-body font-normal text-[#1A1A1A]">
            Favicon <span style={requiredMarkStyle}>*</span>
          </div>
          <div style={{ minWidth: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <ImageSlot
              url={project.faviconUrl}
              onUpload={(url) => patchImage({ faviconUrl: url })}
              onRemove={() => patchImage({ faviconUrl: null })}
              placeholder="Drag & drop your favicon here (PNG, JPG, or SVG)"
              fit="contain"
              radius={8}
              ring={false}
              style={{ width: 241, maxWidth: "100%", height: 160, border: "2px dashed #1A1A1A", borderRadius: 8, background: "#1A1A1A" }}
            />
          </div>
        </div>
      </div>

      {/* 04. Stress Test & System Laws */}
      <div ref={setRef("stress")}>
        <SectionHeader
          number="04."
          title="Stress Test & System Laws"
          description="Track the six-step blueprint and lock down the absolute laws of your visual identity."
        />
      </div>
      <div className="om-form-pad" style={{ ...sectionPadStyle, gap: 23 }}>
        <div>
          <div className="mb-2 font-sans text-editor-body font-normal text-[#1A1A1A]">Stress test</div>
          <div className="font-sans text-editor-label font-normal leading-relaxed text-[#1A1A1A]">
            Pulled automatically from your Section 03 upload(s) — shown at 200, 175, 149, 124, and 98px below. Upload only a logo/icon or only a
            wordmark and that mark is tested; upload both and you&apos;ll see both, each labeled.
          </div>
        </div>

        <div>
          <div className="mb-2.5 font-sans text-editor-body font-normal text-[#1A1A1A]">
            The real-world stress test <span style={requiredMarkStyle}>*</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
            <StressTestCard
              title="Dark/Light Mode Test"
              description="On a pure dark and pure light background — does the contrast hold up?"
              pass={project.darkLightPassYes}
              fail={project.darkLightPassNo}
              adjustment={project.darkLightAdj}
              onPass={() => patch({ darkLightPassYes: true, darkLightPassNo: false })}
              onFail={() => patch({ darkLightPassYes: false, darkLightPassNo: true })}
              onAdjustmentChange={(v) => patch({ darkLightAdj: v })}
              adjustmentPlaceholder="Required adjustment (e.g. all-black / all-white logo version)"
            />
            <StressTestCard
              title="Scale Test"
              description="Across website, social, stationery, merchandise — does it hold up at every size?"
              pass={project.scalePassYes}
              fail={project.scalePassNo}
              adjustment={project.scaleAdj}
              onPass={() => patch({ scalePassYes: true, scalePassNo: false })}
              onFail={() => patch({ scalePassYes: false, scalePassNo: true })}
              onAdjustmentChange={(v) => patch({ scaleAdj: v })}
              adjustmentPlaceholder="Required adjustment (e.g. horizontal header version, stackable merch mark)"
            />
          </div>
        </div>

        <div>
          <Label htmlFor={logoUsageRulesId} className="mb-2 block font-sans text-editor-label font-semibold text-[#1A1A1A]">
            Logo usage rules (when to use full wordmark vs. simplified icon) <span style={requiredMarkStyle}>*</span>
          </Label>
          <Textarea
            id={logoUsageRulesId}
            value={project.logoUsageRules}
            onChange={(e) => patch({ logoUsageRules: e.target.value })}
            rows={4}
            className={inputClass}
          />
        </div>
      </div>

      {/* 05. Moodboard Imagery */}
      <div ref={setRef("moodboard")} style={{ background: "#5C5C58", padding: "24px 32px", display: "flex", flexDirection: "column", gap: 8 }}>
        <h2 style={sectionTitleStyle}>05.&nbsp;Moodboard Imagery</h2>
        <div style={sectionDescStyle}>Upload 8 images for the moodboard grid — each will crop to fill its frame.</div>
      </div>
      <div className="om-form-pad" style={{ padding: "23px 32px" }}>
        <div className="mb-4 font-sans text-editor-label font-semibold text-[#1A1A1A]">
          Upload Images <span style={requiredMarkStyle}>*</span>
        </div>
        <div className="om-mood-upload-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
          {project.moodboardImages.map((url, i) => (
            <div key={i} style={{ aspectRatio: "1", width: "100%" }}>
              <ImageSlot
                url={url}
                onUpload={(u) => {
                  const arr = [...project.moodboardImages];
                  arr[i] = u;
                  patchImage({ moodboardImages: arr });
                }}
                onRemove={() => {
                  const arr = [...project.moodboardImages];
                  arr[i] = null;
                  patchImage({ moodboardImages: arr });
                }}
                placeholder={`Image ${i + 1}`}
                fit="cover"
                radius={8}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 06. Logo Variations Grid */}
      <div ref={setRef("logoVariations")} style={{ background: "#5C5C58", padding: "24px 32px", display: "flex", flexDirection: "column", gap: 8 }}>
        <h2 style={sectionTitleStyle}>06.&nbsp;Logo Variations Grid</h2>
        <div style={sectionDescStyle}>
          Upload 3–6 logo variations (icon, wordmark, reversed, mono, stacked, etc.) in one go — they&apos;ll display together in a grid.
        </div>
      </div>
      <div className="om-form-pad" style={{ padding: "23px 32px", display: "flex", flexDirection: "column", gap: 13 }}>
        <div className="font-sans text-editor-label font-semibold text-[#1A1A1A]">
          Logo Variations <span style={requiredMarkStyle}>*</span>
        </div>
        <label
          className="om-file-label"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            border: "1.5px dashed rgba(0,0,0,0.25)",
            borderRadius: 8,
            padding: 21,
            cursor: "pointer",
            textAlign: "center",
            boxSizing: "border-box",
          }}
        >
          <span className="font-sans text-editor-label font-bold text-[#1A1A1A]">Click to upload logo files</span>
          <span className="font-sans text-editor-label font-normal text-[#666666]">Select 3–6 images at once (PNG, JPG, SVG)</span>
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp,image/avif,image/svg+xml"
            multiple
            aria-label="Upload logo variation files"
            onChange={(e) => {
              if (e.target.files?.length) onLogoVariationsUpload(e.target.files);
              e.target.value = "";
            }}
            style={{
              position: "absolute",
              width: 1,
              height: 1,
              padding: 0,
              margin: -1,
              overflow: "hidden",
              clip: "rect(0,0,0,0)",
              whiteSpace: "nowrap",
              border: 0,
            }}
          />
        </label>
        {project.logoVariations.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
            {project.logoVariations.map((item: LogoVariationFile) => (
              <div key={item.id} style={{ position: "relative", aspectRatio: "1", border: "1px solid #D8D8D4", borderRadius: 8, overflow: "hidden", background: "#fff" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.url} alt="" style={{ width: "100%", height: "100%", objectFit: "contain", padding: 8, boxSizing: "border-box" }} />
                <button
                  onClick={() => onLogoVariationRemove(item.id)}
                  aria-label={`Remove ${item.name}`}
                  style={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    border: "none",
                    background: "#1A1A1A",
                    color: "#fff",
                    fontSize: 12,
                    lineHeight: 1,
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="font-sans text-editor-label font-normal text-[#1A1A1A]">
          {project.logoVariations.length === 0
            ? "No logos uploaded yet — add 3–6 to build the grid."
            : `${project.logoVariations.length} of 6 uploaded${project.logoVariations.length < 3 ? " — add at least 3 for a full grid." : "."}`}
        </div>
      </div>

      {/* Section Completion Summary */}
      <div style={{ background: "#5C5C58", padding: "23px 32px", marginTop: 24 }}>
        <h2 style={{ margin: 0, fontFamily: "var(--font-libre-caslon-display), serif", letterSpacing: "0.2px", fontSize: 22, fontWeight: 400, marginBottom: 16, color: "#F4F4F2" }}>
          Section Completion Summary
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
          {(Object.keys(SECTION_LABELS) as SectionKey[]).map((key) => {
            const hovered = hoveredSection === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => onScrollToSection(key)}
                onMouseEnter={() => onHoverSection(key)}
                onMouseLeave={() => onHoverSection(null)}
                className="font-sans text-editor-label"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  border: "none",
                  cursor: "pointer",
                  padding: 8,
                  borderRadius: 4,
                  margin: -8,
                  color: hovered ? "#FFFFFF" : "#F4F4F2",
                  background: hovered ? "rgba(255,255,255,0.12)" : "transparent",
                }}
              >
                <span>{SECTION_LABELS[key]}</span>
                <span style={{ fontSize: 17 }}>{completion[key] ? "✓" : "✕"}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

function StressTestCard({
  title,
  description,
  pass,
  fail,
  adjustment,
  onPass,
  onFail,
  onAdjustmentChange,
  adjustmentPlaceholder,
}: {
  title: string;
  description: string;
  pass: boolean;
  fail: boolean;
  adjustment: string;
  onPass: () => void;
  onFail: () => void;
  onAdjustmentChange: (v: string) => void;
  adjustmentPlaceholder: string;
}) {
  const passId = useId();
  const failId = useId();
  const groupValue = pass ? "pass" : fail ? "fail" : "";

  return (
    <div style={{ border: "1px solid #D8D8D4", borderRadius: 8, padding: "13px 16px", background: "#F4F4F2" }}>
      <div className="font-sans text-editor-label font-bold text-[#1A1A1A]">{title}</div>
      <div className="mt-1 font-sans text-editor-label font-normal text-[#1A1A1A]">{description}</div>
      <RadioGroup
        value={groupValue}
        onValueChange={(v) => (v === "pass" ? onPass() : onFail())}
        className="mt-2 flex flex-row gap-4"
      >
        <div className="flex items-center gap-1.5">
          <RadioGroupItem value="pass" id={passId} className="border-[#1A1A1A] text-[#1A1A1A]" />
          <Label htmlFor={passId} className="cursor-pointer font-sans text-editor-label font-semibold text-[#1A1A1A]">
            Pass
          </Label>
        </div>
        <div className="flex items-center gap-1.5">
          <RadioGroupItem value="fail" id={failId} className="border-[#1A1A1A] text-[#1A1A1A]" />
          <Label htmlFor={failId} className="cursor-pointer font-sans text-editor-label font-semibold text-[#1A1A1A]">
            Fail
          </Label>
        </div>
      </RadioGroup>
      {fail && (
        <input
          value={adjustment}
          onChange={(e) => onAdjustmentChange(e.target.value)}
          aria-label={`${title} — required adjustment`}
          placeholder={adjustmentPlaceholder}
          style={{
            width: "100%",
            marginTop: 8,
            border: "none",
            borderBottom: "1px solid #1A1A1A",
            padding: "6px 2px",
            fontFamily: "var(--font-manrope), sans-serif",
            fontSize: 11,
            outline: "none",
            background: "transparent",
            boxSizing: "border-box",
          }}
        />
      )}
    </div>
  );
}
