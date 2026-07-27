export interface LogoVariationFile {
  id: string;
  url: string;
  name: string;
}

export interface ProjectSummary {
  id: string;
  brandName: string;
  industry: string;
  primaryLogoUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectData {
  id: string;
  createdAt: string;
  updatedAt: string;

  brandName: string;
  industry: string;

  businessWhat: string;
  originStory: string;
  idealAudience: string;
  audiencePainQuote: string;
  audiencePain: string;
  whyChooseYou: string;

  competitor1: string;
  competitor2: string;
  competitor3: string;
  competitorGap: string;

  archetypesSelected: string[];

  value1Always: string;
  value1Never: string;
  value2Always: string;
  value2Never: string;

  vpAudience: string;
  vpGoal: string;
  vpSystem: string;

  vibeWord1: string;
  vibeWord2: string;
  vibeWord3: string;
  vibeWord4: string;

  headerFont: string;
  bodyFont: string;
  accentFont: string;

  colorPrimary: string;
  colorSecondary: string;
  colorAccent1: string;
  colorAccent2: string;

  darkLightPassYes: boolean;
  darkLightPassNo: boolean;
  darkLightAdj: string;
  scalePassYes: boolean;
  scalePassNo: boolean;
  scaleAdj: string;

  logoUsageRules: string;

  primaryLogoUrl: string | null;
  faviconUrl: string | null;
  modeTestLightUrl: string | null;
  modeTestDarkUrl: string | null;

  /** Always length 8; each entry is a served URL or null. */
  moodboardImages: (string | null)[];
  logoVariations: LogoVariationFile[];
}

export type ProjectPatch = Partial<Omit<ProjectData, "id" | "createdAt" | "updatedAt">>;

export const DEFAULT_PROJECT_PATCH: ProjectPatch = {
  brandName: "",
  industry: "",
  businessWhat: "",
  originStory: "",
  idealAudience: "",
  audiencePainQuote: "",
  audiencePain: "",
  whyChooseYou: "",
  competitor1: "",
  competitor2: "",
  competitor3: "",
  competitorGap: "",
  archetypesSelected: [],
  value1Always: "",
  value1Never: "",
  value2Always: "",
  value2Never: "",
  vpAudience: "",
  vpGoal: "",
  vpSystem: "",
  vibeWord1: "",
  vibeWord2: "",
  vibeWord3: "",
  vibeWord4: "",
  headerFont: "Anton",
  bodyFont: "Inter",
  accentFont: "Caveat",
  colorPrimary: "#1A1A1A",
  colorSecondary: "#8A8A86",
  colorAccent1: "#E5E5E5",
  colorAccent2: "#FFFFFF",
  darkLightPassYes: false,
  darkLightPassNo: false,
  darkLightAdj: "",
  scalePassYes: false,
  scalePassNo: false,
  scaleAdj: "",
  logoUsageRules: "",
  primaryLogoUrl: null,
  faviconUrl: null,
  modeTestLightUrl: null,
  modeTestDarkUrl: null,
  moodboardImages: [null, null, null, null, null, null, null, null],
  logoVariations: [],
};

export const ARCHETYPE_DEFS = [
  { id: "academic", label: "ACADEMIC", desc: "Precise • Clinical • Data-Driven" },
  { id: "innovator", label: "INNOVATOR", desc: "Disruptive • Cutting-Edge • Experimental" },
  { id: "minimalist", label: "MINIMALIST", desc: "Ruthlessly Simple • Streamlined" },
  { id: "coach", label: "COACH", desc: "Warm • Empathetic • Human-Focused" },
  { id: "anchor", label: "ANCHOR", desc: "Rock-Solid • Dependable • Time-Tested" },
  { id: "visionary", label: "VISIONARY", desc: "Big-Picture • Creative • Expansive" },
] as const;

export const AVATAR_TEST_SIZES = [200, 175, 149, 124, 98] as const;
