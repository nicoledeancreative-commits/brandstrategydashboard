import type { ProjectModel } from "@/generated/prisma/models";
import type { LogoVariationFile, ProjectData, ProjectPatch, ProjectSummary } from "@/lib/types";

function parseJsonArray<T>(raw: string, fallback: T[]): T[] {
  try {
    const v = JSON.parse(raw);
    return Array.isArray(v) ? v : fallback;
  } catch {
    return fallback;
  }
}

export function toProjectData(row: ProjectModel): ProjectData {
  return {
    id: row.id,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
    brandName: row.brandName,
    industry: row.industry,
    businessWhat: row.businessWhat,
    originStory: row.originStory,
    idealAudience: row.idealAudience,
    audiencePainQuote: row.audiencePainQuote,
    audiencePain: row.audiencePain,
    whyChooseYou: row.whyChooseYou,
    competitor1: row.competitor1,
    competitor2: row.competitor2,
    competitor3: row.competitor3,
    competitorGap: row.competitorGap,
    archetypesSelected: parseJsonArray<string>(row.archetypesSelected, []).slice(0, 2),
    value1Always: row.value1Always,
    value1Never: row.value1Never,
    value2Always: row.value2Always,
    value2Never: row.value2Never,
    vpAudience: row.vpAudience,
    vpGoal: row.vpGoal,
    vpSystem: row.vpSystem,
    vibeWord1: row.vibeWord1,
    vibeWord2: row.vibeWord2,
    vibeWord3: row.vibeWord3,
    vibeWord4: row.vibeWord4,
    headerFont: row.headerFont,
    bodyFont: row.bodyFont,
    accentFont: row.accentFont,
    colorPrimary: row.colorPrimary,
    colorSecondary: row.colorSecondary,
    colorAccent1: row.colorAccent1,
    colorAccent2: row.colorAccent2,
    darkLightPassYes: row.darkLightPassYes,
    darkLightPassNo: row.darkLightPassNo,
    darkLightAdj: row.darkLightAdj,
    scalePassYes: row.scalePassYes,
    scalePassNo: row.scalePassNo,
    scaleAdj: row.scaleAdj,
    logoUsageRules: row.logoUsageRules,
    primaryLogoUrl: row.primaryLogoUrl,
    faviconUrl: row.faviconUrl,
    modeTestLightUrl: row.modeTestLightUrl,
    modeTestDarkUrl: row.modeTestDarkUrl,
    moodboardImages: (() => {
      const arr = parseJsonArray<string | null>(row.moodboardImages, []);
      const out: (string | null)[] = new Array(8).fill(null);
      for (let i = 0; i < 8; i++) out[i] = arr[i] ?? null;
      return out;
    })(),
    logoVariations: parseJsonArray<LogoVariationFile>(row.logoVariations, []),
  };
}

export function toProjectSummary(row: ProjectModel): ProjectSummary {
  return {
    id: row.id,
    brandName: row.brandName,
    industry: row.industry,
    primaryLogoUrl: row.primaryLogoUrl,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

const SCALAR_KEYS = new Set<keyof ProjectPatch>([
  "brandName", "industry", "businessWhat", "originStory", "idealAudience",
  "audiencePainQuote", "audiencePain", "whyChooseYou", "competitor1", "competitor2",
  "competitor3", "competitorGap", "value1Always", "value1Never", "value2Always",
  "value2Never", "vpAudience", "vpGoal", "vpSystem", "vibeWord1", "vibeWord2",
  "vibeWord3", "vibeWord4", "headerFont", "bodyFont", "accentFont", "colorPrimary",
  "colorSecondary", "colorAccent1", "colorAccent2", "darkLightPassYes", "darkLightPassNo",
  "darkLightAdj", "scalePassYes", "scalePassNo", "scaleAdj", "logoUsageRules",
  "primaryLogoUrl", "faviconUrl", "modeTestLightUrl", "modeTestDarkUrl",
]);

/** Converts a partial ProjectData (from a client PATCH body) into Prisma `data` for update/create. */
export function patchToPrismaData(patch: ProjectPatch): Record<string, unknown> {
  const data: Record<string, unknown> = {};
  for (const key of Object.keys(patch) as (keyof ProjectPatch)[]) {
    const value = patch[key];
    if (value === undefined) continue;
    if (key === "archetypesSelected") {
      data[key] = JSON.stringify((value as string[]).slice(0, 2));
    } else if (key === "moodboardImages") {
      const arr = value as (string | null)[];
      const out: (string | null)[] = new Array(8).fill(null);
      for (let i = 0; i < 8; i++) out[i] = arr[i] ?? null;
      data[key] = JSON.stringify(out);
    } else if (key === "logoVariations") {
      data[key] = JSON.stringify(value as LogoVariationFile[]);
    } else if (SCALAR_KEYS.has(key)) {
      data[key] = value;
    }
  }
  return data;
}
