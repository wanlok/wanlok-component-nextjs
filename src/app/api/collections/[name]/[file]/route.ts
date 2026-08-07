import { readFile } from "node:fs/promises";
import { join } from "node:path";

const contentTypes: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".bmp": "image/bmp"
};

export const GET = async (_request: Request, { params }: { params: Promise<{ name: string; file: string }> }) => {
  const directoryPath = process.env.DIRECTORY_PATH;
  if (!directoryPath) {
    return new Response(null, { status: 404 });
  }
  const { name, file } = await params;
  if (name.includes("..") || file.includes("..")) {
    return new Response(null, { status: 400 });
  }
  const extension = file.slice(file.lastIndexOf(".")).toLowerCase();
  const contentType = contentTypes[extension];
  if (!contentType) {
    return new Response(null, { status: 404 });
  }
  try {
    const data = await readFile(join(directoryPath, name, file));
    return new Response(new Uint8Array(data), { headers: { "Content-Type": contentType } });
  } catch {
    return new Response(null, { status: 404 });
  }
};
