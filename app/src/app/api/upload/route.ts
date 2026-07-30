import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { put } from "@vercel/blob";

const ACCEPTED: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/svg+xml": "svg",
};

const MAX_BYTES = 12 * 1024 * 1024;

export async function POST(request: Request) {
  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const ext = ACCEPTED[file.type];
  if (!ext) {
    return NextResponse.json(
      { error: "Unsupported file type. Use PNG, JPEG, WebP, AVIF, or SVG." },
      { status: 400 }
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File is too large (12MB max)." }, { status: 400 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error("Upload failed: BLOB_READ_WRITE_TOKEN is not set. Connect a Blob store to this project in the Vercel Storage tab.");
    return NextResponse.json(
      { error: "Image storage isn't configured yet. Connect a Blob store in the Vercel project's Storage tab." },
      { status: 500 }
    );
  }

  const filename = `${randomUUID()}.${ext}`;
  try {
    const blob = await put(`uploads/${filename}`, file, {
      access: "public",
      contentType: file.type,
      addRandomSuffix: false,
    });
    return NextResponse.json({ url: blob.url }, { status: 201 });
  } catch (err) {
    console.error("Blob upload failed:", err);
    return NextResponse.json({ error: "Could not store that file. Try again." }, { status: 502 });
  }
}
