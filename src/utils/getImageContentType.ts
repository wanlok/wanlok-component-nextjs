const imageContentTypes: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".bmp": "image/bmp"
};

export const getImageContentType = (file: string) =>
  imageContentTypes[file.slice(file.lastIndexOf(".")).toLowerCase()];
