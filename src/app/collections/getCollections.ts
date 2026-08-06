import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { Collection } from "@/Types";

export const getCollections = async (): Promise<Collection[]> => {
  const directoryPath = process.env.DIRECTORY_PATH;
  if (!directoryPath) {
    return [];
  }
  const entries = await readdir(directoryPath, { withFileTypes: true });
  const folders = entries.filter((entry) => entry.isDirectory());
  return Promise.all(
    folders.map(async (folder) => {
      const files = await readdir(join(directoryPath, folder.name), { withFileTypes: true });
      return {
        name: folder.name,
        files: files.filter((file) => file.isFile()).map((file) => file.name)
      };
    })
  );
};
