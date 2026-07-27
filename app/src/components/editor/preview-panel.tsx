"use client";

import type { CSSProperties, ReactNode } from "react";
import type { ProjectData, ProjectPatch } from "@/lib/types";
import { formatBlock } from "@/lib/rich-text";
import { ImageSlot } from "./image-slot";

interface ArchetypeInfo {
  id: string;
  label: string;
  desc: string;
}

interface ColorLaw {
  hex: string;
  label: string;
  col: string;
  height: string;
  textColor: string;
}

export function PreviewPanel({
  project,
  patchImage,
  archetype1,
  archetype2,
  hasBothArchetypes,
  hasProposition,
  competitorPills,
  value1Display,
  value2Display,
  value1Color,
  value2Color,
  aboutPainTextColor,
  aboutGapTextColor,
  colorLaws,
  blockBg,
  blockHeaderColor,
  avatarTestSizes,
}: {
  project: ProjectData;
  patchImage: (p: ProjectPatch) => void;
  archetype1: ArchetypeInfo | null;
  archetype2: ArchetypeInfo | null;
  hasBothArchetypes: boolean;
  hasProposition: boolean;
  competitorPills: string[];
  value1Display: [string, string];
  value2Display: [string, string];
  value1Color: string;
  value2Color: string;
  aboutPainTextColor: string;
  aboutGapTextColor: string;
  colorLaws: ColorLaw[];
  toolbarTextColor: string;
  blockBg: string;
  blockHeaderColor: string;
  avatarTestSizes: readonly number[];
}) {
  const f = project;
  const headerFontFamily = `'${f.headerFont}', sans-serif`;
  const bodyFontFamily = `'${f.bodyFont}', sans-serif`;
  const accentFontFamily = `'${f.accentFont}', serif`;

  return (
    <>
      {/* Primary Logo */}
      <div
        className="om-sheet-wrap"
        style={{
          width: 1180,
          maxWidth: "100%",
          background: blockBg,
          borderRadius: 10,
          padding: 14,
          boxShadow: "0 20px 50px rgba(0,0,0,0.18)",
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 400,
        }}
      >
        <ImageSlot url={f.primaryLogoUrl} placeholder="Primary Logo" fit="contain" radius={10} readOnly style={{ width: 380, height: 380 }} />
      </div>

      {/* Brand Foundation */}
      <Sheet blockBg={blockBg}>
        <SheetTitle headerFontFamily={headerFontFamily} color={blockHeaderColor}>
          Brand Foundation
        </SheetTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            <FoundationCard bodyFontFamily={bodyFontFamily} color={f.colorSecondary} label="WHAT YOU DO" content={f.businessWhat} />
            <FoundationCard bodyFontFamily={bodyFontFamily} color={f.colorSecondary} label="YOUR STORY" content={f.originStory} />
            <FoundationCard bodyFontFamily={bodyFontFamily} color={f.colorSecondary} label="YOUR CUSTOMERS" content={f.idealAudience} />
          </div>

          <div style={{ background: f.colorPrimary, borderRadius: 10, padding: "34px 38px" }}>
            <div style={{ fontFamily: bodyFontFamily, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: aboutPainTextColor, opacity: 0.65, marginBottom: 12 }}>
              THE 2AM PROBLEM
            </div>
            <div style={{ fontFamily: accentFontFamily, fontSize: 23, lineHeight: 1.4, color: aboutPainTextColor, whiteSpace: "pre-wrap", maxWidth: 880, marginBottom: 16 }}>
              {formatBlock(f.audiencePainQuote)}
            </div>
            <div style={{ fontFamily: bodyFontFamily, fontSize: 14, fontWeight: 400, lineHeight: 1.6, color: aboutPainTextColor, opacity: 0.9, whiteSpace: "pre-wrap", maxWidth: 880 }}>
              {formatBlock(f.audiencePain)}
            </div>
          </div>

          <div style={{ display: "flex", gap: 22, alignItems: "flex-start", background: "#FFFFFF", borderLeft: `5px solid ${f.colorSecondary}`, borderRadius: "0 10px 10px 0", padding: "22px 26px", boxShadow: "0 4px 14px rgba(0,0,0,0.06)" }}>
            <div style={{ fontFamily: headerFontFamily, fontSize: 13, fontWeight: 800, letterSpacing: "0.06em", color: f.colorSecondary, textTransform: "uppercase", flexShrink: 0, width: 150 }}>
              Why Choose You
            </div>
            <div style={{ fontFamily: bodyFontFamily, fontSize: 13, lineHeight: 1.6, color: "#1A1A1A", whiteSpace: "pre-wrap" }}>{formatBlock(f.whyChooseYou)}</div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderRadius: 10, overflow: "hidden", boxShadow: "0 4px 14px rgba(0,0,0,0.06)" }}>
            <div style={{ background: "#FFFFFF", padding: "22px 24px" }}>
              <div style={{ fontFamily: bodyFontFamily, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: "#666666", marginBottom: 14 }}>THE MARKET</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start" }}>
                {competitorPills.map((name, i) => (
                  <span key={i} style={{ fontFamily: bodyFontFamily, fontSize: 11, fontWeight: 600, color: "#1A1A1A", background: "#F0F0EC", borderRadius: 20, padding: "6px 14px", whiteSpace: "nowrap" }}>
                    {name}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ background: f.colorAccent2, padding: "22px 24px" }}>
              <div style={{ fontFamily: bodyFontFamily, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: aboutGapTextColor, opacity: 0.75, marginBottom: 14 }}>
                THE GAP YOU CAN OWN
              </div>
              <div style={{ fontFamily: bodyFontFamily, fontSize: 13, fontWeight: 600, lineHeight: 1.6, color: aboutGapTextColor, whiteSpace: "pre-wrap" }}>
                {formatBlock(f.competitorGap)}
              </div>
            </div>
          </div>
        </div>
      </Sheet>

      {/* Operating Values */}
      <Sheet blockBg={blockBg}>
        <SheetTitle headerFontFamily={headerFontFamily} color={blockHeaderColor} marginBottom={20}>
          Operating Values &amp; Personality
        </SheetTitle>
        {hasBothArchetypes && (
          <div style={{ display: "flex", gap: 15, marginBottom: 24 }}>
            <ArchetypeSummaryCard label="ARCHETYPE 1" headerFontFamily={headerFontFamily} bodyFontFamily={bodyFontFamily} archetype={archetype1} />
            <ArchetypeSummaryCard label="ARCHETYPE 2" headerFontFamily={headerFontFamily} bodyFontFamily={bodyFontFamily} archetype={archetype2} />
          </div>
        )}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 23 }}>
          <ValueCard bodyFontFamily={bodyFontFamily} accentFontFamily={accentFontFamily} label="VALUE 1" lines={value1Display} color={value1Color} />
          <ValueCard bodyFontFamily={bodyFontFamily} accentFontFamily={accentFontFamily} label="VALUE 2" lines={value2Display} color={value2Color} />
        </div>
        {hasProposition && (
          <div style={{ marginTop: 23, padding: "21px 24px", background: "#E5E5E5", borderRadius: 8 }}>
            <div style={{ fontFamily: bodyFontFamily, fontSize: 11, fontWeight: 700, letterSpacing: "0.04em", color: "#333333", marginBottom: 8 }}>POSITIONING</div>
            <div style={{ fontFamily: accentFontFamily, fontSize: 22, lineHeight: 1.2, color: "#1A1A1A" }}>
              I help {f.vpAudience} achieve {f.vpGoal} through {f.vpSystem}.
            </div>
          </div>
        )}
      </Sheet>

      {/* Brand System Laws */}
      <Sheet blockBg={blockBg} extraStyle={{ color: "#1A1A1A" }}>
        <SheetTitle headerFontFamily={headerFontFamily} color={blockHeaderColor} marginBottom={32}>
          Brand System Laws
        </SheetTitle>
        <div className="om-laws-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, marginBottom: 36 }}>
          <div>
            <div style={{ fontFamily: bodyFontFamily, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: "#666", marginBottom: 16 }}>EXACT COLOR HEX CODES</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {colorLaws.map((c) => (
                <div
                  key={c.label}
                  style={{
                    gridColumn: c.col,
                    height: c.height,
                    borderRadius: 10,
                    background: c.hex,
                    boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.1)",
                    position: "relative",
                    display: "flex",
                    alignItems: "flex-end",
                    padding: "12px 14px",
                    boxSizing: "border-box",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <span style={{ fontFamily: bodyFontFamily, fontSize: 12, fontWeight: 700, letterSpacing: "0.03em", color: c.textColor }}>{c.label}</span>
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: c.textColor, opacity: 0.85 }}>{c.hex}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: bodyFontFamily, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: "#666", marginBottom: 16 }}>TYPOGRAPHY HIERARCHY</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ padding: "14px 16px", borderRadius: 8, background: "rgba(0,34,34,0.03)" }}>
                <div style={{ fontFamily: headerFontFamily, fontSize: 28, lineHeight: 1.2, color: "#1A1A1A" }}>Header — {f.headerFont}</div>
              </div>
              <div style={{ padding: "14px 16px", borderRadius: 8, background: "rgba(0,34,34,0.03)" }}>
                <div style={{ fontFamily: bodyFontFamily, fontSize: 22, lineHeight: 1.2, color: "#1A1A1A" }}>Body — {f.bodyFont}</div>
              </div>
              <div style={{ padding: "14px 16px", borderRadius: 8, background: "rgba(0,34,34,0.03)" }}>
                <div style={{ fontFamily: accentFontFamily, fontSize: 24, lineHeight: 1.2, color: "#1A1A1A" }}>Accent — {f.accentFont}</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div style={{ fontFamily: bodyFontFamily, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: "#666", marginBottom: 12 }}>LOGO USAGE RULES</div>
          <div style={{ padding: "20px 22px", borderRadius: 8, background: "rgba(0,34,34,0.03)" }}>
            {f.logoUsageRules ? (
              <div style={{ fontFamily: bodyFontFamily, fontSize: 14, lineHeight: 1.7, color: "#333" }}>{f.logoUsageRules}</div>
            ) : (
              <div style={{ fontFamily: bodyFontFamily, fontSize: 14, lineHeight: 1.7, color: "#999", fontStyle: "italic" }}>
                Clear guidelines on when to use your full wordmark versus a simplified icon mark.
              </div>
            )}
          </div>
        </div>
      </Sheet>

      {/* Logo Stress Test */}
      <Sheet blockBg={blockBg} className="om-stress-sheet">
        <SheetTitle headerFontFamily={headerFontFamily} color={blockHeaderColor} marginBottom={8}>
          Logo Stress Test
        </SheetTitle>
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontFamily: headerFontFamily, fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em", marginBottom: 18, marginTop: 32 }}>
            Rounded stress test
          </div>
          <div className="om-stress-row" style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", gap: 31, paddingBottom: 8, marginBottom: 32 }}>
            {avatarTestSizes.map((size) => (
              <div key={size} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 13 }}>
                <div className="om-avatar-frame" style={{ width: size, height: size, flexShrink: 0, borderRadius: "50%", border: "1.5px solid rgba(0,0,0,0.25)", boxSizing: "border-box", overflow: "hidden" }}>
                  <ImageSlot url={f.primaryLogoUrl} placeholder="Logo" shape="circle" fit="contain" readOnly ring={false} style={{ width: "100%", height: "100%" }} />
                </div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, fontWeight: 700, color: "#1A1A1A", whiteSpace: "nowrap" }}>
                  {size} x {size}
                </div>
              </div>
            ))}
          </div>
          <div style={{ fontFamily: headerFontFamily, fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em", marginBottom: 18 }}>
            Square stress test
          </div>
          <div className="om-stress-row" style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", gap: 31, paddingBottom: 8 }}>
            {avatarTestSizes.map((size) => (
              <div key={size} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 13 }}>
                <div className="om-avatar-frame" style={{ width: size, height: size, flexShrink: 0, border: "1.5px solid rgba(0,0,0,0.25)", boxSizing: "border-box", overflow: "hidden" }}>
                  <ImageSlot url={f.primaryLogoUrl} placeholder="Logo" shape="rect" fit="contain" readOnly ring={false} style={{ width: "100%", height: "100%" }} />
                </div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, fontWeight: 700, color: "#1A1A1A", whiteSpace: "nowrap" }}>
                  {size} x {size}
                </div>
              </div>
            ))}
          </div>
          <div style={{ fontFamily: headerFontFamily, fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em", marginBottom: 18 }}>Favicons</div>
          <div className="om-stress-row" style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", gap: 31, paddingBottom: 8 }}>
            {[16, 32].map((size) => (
              <div key={size} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 13 }}>
                <div className="om-avatar-frame" style={{ width: size, height: size, flexShrink: 0, border: "1.5px solid rgba(0,0,0,0.25)", boxSizing: "border-box", overflow: "hidden" }}>
                  <ImageSlot url={f.faviconUrl} placeholder="Icon" shape="rect" fit="contain" readOnly ring={false} style={{ width: "100%", height: "100%" }} />
                </div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, fontWeight: 700, color: "#1A1A1A", whiteSpace: "nowrap" }}>{size}px</div>
              </div>
            ))}
          </div>
        </div>
      </Sheet>

      {/* Dark / Light Mode Test */}
      <Sheet blockBg={blockBg}>
        <SheetTitle headerFontFamily={headerFontFamily} color={blockHeaderColor} marginBottom={20}>
          Dark / Light Mode Test
        </SheetTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", margin: "0 -48px -44px -48px", minHeight: 380 }}>
          <div style={{ background: "#000000", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 17, padding: "39px 32px" }}>
            <div style={{ fontFamily: bodyFontFamily, fontSize: 11, fontWeight: 700, letterSpacing: "0.04em", color: "#FFFFFF" }}>DARK BACKGROUND</div>
            <div style={{ width: 220, height: 140, border: f.modeTestLightUrl ? "none" : "1.5px dashed rgba(0,0,0,0.25)", borderRadius: 8, overflow: "hidden" }}>
              <ImageSlot
                url={f.modeTestLightUrl}
                onUpload={(u) => patchImage({ modeTestLightUrl: u })}
                onRemove={() => patchImage({ modeTestLightUrl: null })}
                placeholder="Drop logo (jpg, png, svg)"
                fit="contain"
                shape="rect"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>
          <div style={{ background: "#FFFFFF", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 17, padding: "39px 32px" }}>
            <div style={{ fontFamily: bodyFontFamily, fontSize: 11, fontWeight: 700, letterSpacing: "0.04em", color: "#1A1A1A" }}>LIGHT BACKGROUND</div>
            <div style={{ width: 220, height: 140, border: f.modeTestDarkUrl ? "none" : "1.5px dashed rgba(255,255,255,0.5)", borderRadius: 8, overflow: "hidden" }}>
              <ImageSlot
                url={f.modeTestDarkUrl}
                onUpload={(u) => patchImage({ modeTestDarkUrl: u })}
                onRemove={() => patchImage({ modeTestDarkUrl: null })}
                placeholder="Drop logo (jpg, png, svg)"
                fit="contain"
                shape="rect"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>
        </div>
      </Sheet>

      {/* Moodboard */}
      <Sheet blockBg={blockBg}>
        <SheetTitle headerFontFamily={headerFontFamily} color={blockHeaderColor}>
          Moodboard Imagery
        </SheetTitle>
        <div className="om-moodboard-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridAutoRows: "24.6cqw", gap: 13 }}>
          {[0, 1, 2, 3].map((i) => (
            <ImageSlot key={i} url={project.moodboardImages[i]} placeholder={`Image ${i + 1}`} fit="cover" radius={8} readOnly style={{ width: "100%", height: "100%" }} />
          ))}
          <div style={{ width: "100%", height: "100%", display: "grid", gridTemplateColumns: "repeat(2,1fr)", gridTemplateRows: "repeat(2,1fr)", borderRadius: 8, overflow: "hidden", border: "1px solid #1A1A1A" }}>
            {colorLaws.map((c) => (
              <div key={c.label} style={{ background: c.hex }} />
            ))}
          </div>
          {[4, 5, 6, 7].map((i) => (
            <ImageSlot key={i} url={project.moodboardImages[i]} placeholder={`Image ${i + 1}`} fit="cover" radius={8} readOnly style={{ width: "100%", height: "100%" }} />
          ))}
        </div>
      </Sheet>

      {/* Logo Variations Grid */}
      <Sheet blockBg={blockBg}>
        <SheetTitle headerFontFamily={headerFontFamily} color={blockHeaderColor}>
          Logo Variations Grid
        </SheetTitle>
        {project.logoVariations.length > 0 ? (
          <div className="om-logo-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 19 }}>
            {project.logoVariations.map((item) => (
              <div key={item.id} style={{ aspectRatio: "1", border: "1px solid #E5E5E5", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", background: "#FAFAF9", padding: 24, boxSizing: "border-box" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.url} alt="" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 19 }}>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} style={{ aspectRatio: "1", background: "transparent", borderRadius: 8, border: "1.5px dashed rgba(0,0,0,0.25)" }} />
            ))}
          </div>
        )}
      </Sheet>
    </>
  );
}

function Sheet({
  blockBg,
  children,
  extraStyle,
  className,
}: {
  blockBg: string;
  children: ReactNode;
  extraStyle?: CSSProperties;
  className?: string;
}) {
  return (
    <div
      className={`om-sheet-wrap${className ? ` ${className}` : ""}`}
      style={{
        width: 1180,
        maxWidth: "100%",
        background: blockBg,
        borderRadius: 10,
        boxShadow: "0 20px 50px rgba(0,0,0,0.18)",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
        padding: "43px 48px",
        ...extraStyle,
      }}
    >
      {children}
    </div>
  );
}

function SheetTitle({
  headerFontFamily,
  color,
  marginBottom = 24,
  children,
}: {
  headerFontFamily: string;
  color: string;
  marginBottom?: number;
  children: ReactNode;
}) {
  return (
    <>
      <div style={{ fontFamily: headerFontFamily, fontSize: 19, fontWeight: 800, textTransform: "uppercase", lineHeight: 1.1, color, letterSpacing: 0 }}>
        {children}
      </div>
      <div style={{ width: 36, height: 4, background: color, margin: `8px 0 ${marginBottom}px 0` }} />
    </>
  );
}

function FoundationCard({ bodyFontFamily, color, label, content }: { bodyFontFamily: string; color: string; label: string; content: string }) {
  return (
    <div style={{ background: "#FFFFFF", borderRadius: 10, padding: "20px 18px 18px", boxShadow: "0 4px 14px rgba(0,0,0,0.06)" }}>
      <div style={{ fontFamily: bodyFontFamily, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color, marginBottom: 8 }}>{label}</div>
      <div style={{ fontFamily: bodyFontFamily, fontSize: 12, lineHeight: 1.6, color: "#1A1A1A", whiteSpace: "pre-wrap" }}>{formatBlock(content)}</div>
    </div>
  );
}

function ArchetypeSummaryCard({
  label,
  headerFontFamily,
  bodyFontFamily,
  archetype,
}: {
  label: string;
  headerFontFamily: string;
  bodyFontFamily: string;
  archetype: ArchetypeInfo | null;
}) {
  return (
    <div style={{ flex: 1, padding: "13px 16px", background: "#E5E5E5", borderRadius: 8 }}>
      <div style={{ fontFamily: bodyFontFamily, fontSize: 11, fontWeight: 700, letterSpacing: "0.04em", color: "#333333", marginBottom: 4 }}>{label}</div>
      {archetype ? (
        <>
          <div style={{ fontFamily: headerFontFamily, fontSize: 13, fontWeight: 800, color: "#1A1A1A" }}>{archetype.label}</div>
          <div style={{ fontFamily: bodyFontFamily, fontSize: 11, color: "#555555", marginTop: 3 }}>{archetype.desc}</div>
        </>
      ) : (
        <div style={{ fontFamily: headerFontFamily, fontSize: 13, fontWeight: 800, color: "#c9c9c3" }}>Select in the form</div>
      )}
    </div>
  );
}

function ValueCard({
  bodyFontFamily,
  accentFontFamily,
  label,
  lines,
  color,
}: {
  bodyFontFamily: string;
  accentFontFamily: string;
  label: string;
  lines: [string, string];
  color: string;
}) {
  return (
    <div style={{ background: "#E5E5E5", borderRadius: 8, padding: "21px 24px" }}>
      <div style={{ fontFamily: bodyFontFamily, fontSize: 11, fontWeight: 700, letterSpacing: "0.04em", color: "#333333", marginBottom: 8 }}>{label}</div>
      <div style={{ fontFamily: accentFontFamily, fontSize: 22, lineHeight: 1.2, color }}>
        {lines[0]}
        <br />
        <br />
        {lines[1]}
      </div>
    </div>
  );
}
