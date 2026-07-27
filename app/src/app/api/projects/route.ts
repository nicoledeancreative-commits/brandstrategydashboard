import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toProjectData, toProjectSummary, patchToPrismaData } from "@/lib/project-serializer";
import { DEFAULT_PROJECT_PATCH } from "@/lib/types";

export async function GET() {
  const rows = await prisma.project.findMany({ orderBy: { updatedAt: "desc" } });
  return NextResponse.json(rows.map(toProjectSummary));
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const brandName = typeof body?.brandName === "string" ? body.brandName : "";
  const data = patchToPrismaData({ ...DEFAULT_PROJECT_PATCH, brandName });
  const row = await prisma.project.create({ data });
  return NextResponse.json(toProjectData(row), { status: 201 });
}
