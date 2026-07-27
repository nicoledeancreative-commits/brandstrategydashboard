import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toProjectData, patchToPrismaData } from "@/lib/project-serializer";
import { DEFAULT_PROJECT_PATCH } from "@/lib/types";

type Params = Promise<{ id: string }>;

export async function GET(_request: Request, { params }: { params: Params }) {
  const { id } = await params;
  const row = await prisma.project.findUnique({ where: { id } });
  if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(toProjectData(row));
}

export async function PATCH(request: Request, { params }: { params: Params }) {
  const { id } = await params;
  const patch = await request.json().catch(() => null);
  if (!patch || typeof patch !== "object") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  const data = patchToPrismaData(patch);
  try {
    const row = await prisma.project.update({ where: { id }, data });
    return NextResponse.json(toProjectData(row));
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}

// Reset: replace the project's fields with defaults while keeping its id (and
// therefore its place in the projects list / URL).
export async function PUT(_request: Request, { params }: { params: Params }) {
  const { id } = await params;
  try {
    const row = await prisma.project.update({ where: { id }, data: patchToPrismaData(DEFAULT_PROJECT_PATCH) });
    return NextResponse.json(toProjectData(row));
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Params }) {
  const { id } = await params;
  try {
    await prisma.project.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
