import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { join } from "node:path";
import { Readable } from "node:stream";
import { imageSizeFromFile } from "image-size/fromFile";
import { getContentTypeFromImageType } from "@/utils/getContentTypeFromImageType";
import { getContentTypeFromFile } from "@/utils/getContentTypeFromFile";

const getFileContentType = async (filePath: string) => {
  const { type } = await imageSizeFromFile(filePath).catch(() => ({ type: undefined }));
  return (type ? getContentTypeFromImageType(type) : undefined) ?? (await getContentTypeFromFile(filePath));
};

export const GET = async (request: Request, { params }: { params: Promise<{ name: string; file: string }> }) => {
  const directoryPath = process.env.DIRECTORY_PATH;
  if (!directoryPath) {
    return new Response(null, { status: 404 });
  }
  const { name, file } = await params;
  if (name.includes("..") || file.includes("..")) {
    return new Response(null, { status: 400 });
  }
  const filePath = join(directoryPath, name, file);
  try {
    const contentType = (await getFileContentType(filePath)) ?? "application/octet-stream";
    const { size } = await stat(filePath);
    const range = request.headers.get("range");
    const match = range?.match(/bytes=(\d+)-(\d*)/);
    if (!match) {
      const stream = Readable.toWeb(createReadStream(filePath)) as ReadableStream<Uint8Array>;
      return new Response(stream, {
        headers: { "Content-Type": contentType, "Content-Length": String(size), "Accept-Ranges": "bytes" }
      });
    }
    const start = Number(match[1]);
    const end = match[2] ? Number(match[2]) : size - 1;
    const stream = Readable.toWeb(createReadStream(filePath, { start, end })) as ReadableStream<Uint8Array>;
    return new Response(stream, {
      status: 206,
      headers: {
        "Content-Type": contentType,
        "Content-Length": String(end - start + 1),
        "Content-Range": `bytes ${start}-${end}/${size}`,
        "Accept-Ranges": "bytes"
      }
    });
  } catch {
    return new Response(null, { status: 404 });
  }
};
