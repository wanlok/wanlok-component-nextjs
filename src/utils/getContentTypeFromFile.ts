import { fileTypeFromFile } from "file-type";

export const getContentTypeFromFile = async (filePath: string) => {
  const result = await fileTypeFromFile(filePath).catch(() => undefined);
  return result?.mime;
};
