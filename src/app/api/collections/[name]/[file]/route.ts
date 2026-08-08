import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { imageSize } from "image-size";
import { getContentTypeFromImageType } from "@/utils/getContentTypeFromImageType";

export const GET = async (_request: Request, { params }: { params: Promise<{ name: string; file: string }> }) => {
  const directoryPath = process.env.DIRECTORY_PATH;
  if (!directoryPath) {
    return new Response(null, { status: 404 });
  }
  const { name, file } = await params;
  if (name.includes("..") || file.includes("..")) {
    return new Response(null, { status: 400 });
  }
  try {
    const data = await readFile(join(directoryPath, name, file));
    const { type } = imageSize(data);
    const contentType = type ? getContentTypeFromImageType(type) : undefined;
    if (!contentType) {
      return new Response(null, { status: 404 });
    }
    return new Response(new Uint8Array(data), { headers: { "Content-Type": contentType } });
  } catch {
    return new Response(null, { status: 404 });
  }
};
