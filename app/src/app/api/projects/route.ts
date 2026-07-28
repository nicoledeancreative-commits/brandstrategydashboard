import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toProjectData, toProjectSummary, patchToPrismaData } from "@/lib/project-serializer";
import { DEFAULT_PROJECT_PATCH } from "@/lib/types";
import { projectPatchSchema } from "@/lib/validation";

export async function GET() {
  const rows = await prisma.project.findMany({ orderBy: { updatedAt: "desc" } });
  return NextResponse.json(rows.map(toProjectSummary));
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const result = projectPatchSchema.pick({ brandName: true }).safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: "Invalid project data", details: result.error.flatten() }, { status: 400 });
  }
  const data = patchToPrismaData({ ...DEFAULT_PROJECT_PATCH, brandName: result.data.brandName ?? "" });
  const row = await prisma.project.create({ data });
  return NextResponse.json(toProjectData(row), { status: 201 });
}
