import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { toProjectData } from "@/lib/project-serializer";
import { Editor } from "@/components/editor/editor";

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const row = await prisma.project.findUnique({ where: { id } });
  if (!row) notFound();
  const project = toProjectData(row);
  return <Editor initialProject={project} />;
}
