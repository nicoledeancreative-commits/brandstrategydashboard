"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Plus, Trash2, ImageOff } from "lucide-react";
import { toast } from "sonner";
import type { ProjectSummary } from "@/lib/types";

export function ProjectsDashboard({ initialProjects }: { initialProjects: ProjectSummary[] }) {
  const [projects, setProjects] = useState(initialProjects);
  const [creating, setCreating] = useState(false);
  const router = useRouter();

  async function handleCreate() {
    setCreating(true);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      if (!res.ok) throw new Error();
      const project = await res.json();
      router.push(`/project/${project.id}`);
    } catch {
      toast.error("Could not create a new project.");
      setCreating(false);
    }
  }

  async function handleDelete(id: string, name: string) {
    const prev = projects;
    setProjects((list) => list.filter((p) => p.id !== id));
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success(`Deleted "${name}".`);
    } catch {
      setProjects(prev);
      toast.error("Could not delete project.");
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-6xl px-6 py-12 sm:px-10">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl font-bold text-neutral-900">
              Brand Dashboards
            </h1>
            <p className="mt-1 text-sm text-neutral-500">
              Every brand strategy project you&apos;ve started, in one place.
            </p>
          </div>
          <Button onClick={handleCreate} disabled={creating} size="lg">
            <Plus /> New Project
          </Button>
        </div>

        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-neutral-300 bg-white py-24 text-center">
            <p className="text-neutral-500">No brand dashboards yet.</p>
            <Button className="mt-4" onClick={handleCreate} disabled={creating}>
              <Plus /> Create your first project
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <Card key={p.id} className="group relative gap-0 overflow-hidden p-0">
                <Link href={`/project/${p.id}`} className="block">
                  <div className="flex h-36 items-center justify-center bg-neutral-900">
                    {p.primaryLogoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.primaryLogoUrl}
                        alt=""
                        className="max-h-28 max-w-[80%] object-contain"
                      />
                    ) : (
                      <ImageOff className="size-8 text-neutral-600" />
                    )}
                  </div>
                  <div className="p-5">
                    <div className="truncate font-heading text-lg font-bold text-neutral-900">
                      {p.brandName || "Untitled Brand"}
                    </div>
                    <div className="mt-1 truncate text-xs text-neutral-500">
                      {p.industry || "No industry set"}
                    </div>
                    <div className="mt-3 text-[11px] text-neutral-400">
                      Updated{" "}
                      {new Date(p.updatedAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </Link>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute top-3 right-3 opacity-0 transition-opacity group-hover:opacity-100"
                      aria-label="Delete project"
                    >
                      <Trash2 />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Delete &ldquo;{p.brandName || "Untitled Brand"}&rdquo;?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This permanently deletes this brand&apos;s dashboard data and uploaded
                        images. This cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(p.id, p.brandName || "Untitled Brand")}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
