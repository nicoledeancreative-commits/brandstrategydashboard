import { z } from "zod";

const text = z.string().max(20000);
const shortText = z.string().max(200);
const hexColor = z.string().regex(/^#[0-9a-fA-F]{6}$/, "Must be a hex color like #1A1A1A");
const imageUrl = z.string().min(1).max(2000).nullable();

const logoVariationSchema = z.object({
  id: z.string().max(200),
  url: z.string().min(1).max(2000),
  name: z.string().max(200),
});

export const projectPatchSchema = z
  .object({
    brandName: shortText,
    industry: shortText,

    businessWhat: text,
    originStory: text,
    idealAudience: text,
    audiencePainQuote: text,
    audiencePain: text,
    whyChooseYou: text,

    competitor1: shortText,
    competitor2: shortText,
    competitor3: shortText,
    competitorGap: text,

    archetypesSelected: z.array(shortText).max(2),

    value1Always: text,
    value1Never: text,
    value2Always: text,
    value2Never: text,

    vpAudience: text,
    vpGoal: text,
    vpSystem: text,

    vibeWord1: shortText,
    vibeWord2: shortText,
    vibeWord3: shortText,
    vibeWord4: shortText,

    headerFont: shortText,
    bodyFont: shortText,
    accentFont: shortText,

    colorPrimary: hexColor,
    colorSecondary: hexColor,
    colorAccent1: hexColor,
    colorAccent2: hexColor,

    darkLightPassYes: z.boolean(),
    darkLightPassNo: z.boolean(),
    darkLightAdj: text,
    scalePassYes: z.boolean(),
    scalePassNo: z.boolean(),
    scaleAdj: text,

    logoUsageRules: text,

    primaryLogoUrl: imageUrl,
    previewLogoUrl: imageUrl,
    faviconUrl: imageUrl,
    modeTestLightUrl: imageUrl,
    modeTestDarkUrl: imageUrl,

    moodboardImages: z.array(imageUrl).max(8),
    previewMoodboardImages: z.array(imageUrl).max(8),
    logoVariations: z.array(logoVariationSchema).max(20),
    illustrations: z.array(logoVariationSchema).max(12),
    patterns: z.array(imageUrl).max(2),
  })
  .partial();

export type ValidatedProjectPatch = z.infer<typeof projectPatchSchema>;
