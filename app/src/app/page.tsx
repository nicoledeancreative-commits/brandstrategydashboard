import { prisma } from "@/lib/prisma";
import { toProjectSummary } from "@/lib/project-serializer";
import { ProjectsDashboard } from "@/components/projects-dashboard";

// This reads the live project list from SQLite on every request — without this it would
// otherwise be eligible for the full route cache and prerender once at build time, permanently
// freezing whatever projects existed then.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const rows = await prisma.project.findMany({ orderBy: { updatedAt: "desc" } });
  const projects = rows.map(toProjectSummary);
  return <ProjectsDashboard initialProjects={projects} />;
}
