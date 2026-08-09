import { readdir, realpath } from "node:fs/promises";
import { join } from "node:path";
import { unstable_cache } from "next/cache";
import { Collection, CollectionFile } from "@/Types";
import { compareFileNames } from "@/utils/compareFileNames";

const ignoreFiles = [".DS_Store"];

const getCollection = async (
  directoryPath: string,
  name: string,
  visitedRealPaths: Set<string>
): Promise<Collection> => {
  const realDirectoryPath = await realpath(directoryPath).catch(() => directoryPath);
  if (visitedRealPaths.has(realDirectoryPath)) {
    return { name, files: [], collections: [] };
  }
  const nextVisitedRealPaths = new Set(visitedRealPaths).add(realDirectoryPath);
  const entries = await readdir(directoryPath, { withFileTypes: true });
  const fileEntries = entries.filter((entry) => entry.isFile() && !ignoreFiles.includes(entry.name));
  const directoryEntries = entries.filter((entry) => entry.isDirectory());
  const files: CollectionFile[] = fileEntries
    .map((entry) => ({ name: entry.name }))
    .sort((a, b) => compareFileNames(a.name, b.name));
  const collections = (
    await Promise.all(
      directoryEntries.map((entry) =>
        getCollection(join(directoryPath, entry.name), entry.name, nextVisitedRealPaths)
      )
    )
  ).sort((a, b) => compareFileNames(a.name, b.name));
  return { name, files, collections };
};

const getCollectionsFromDisk = async (directoryPath: string): Promise<Collection[]> => {
  console.time("getCollectionsFromDisk");
  const entries = await readdir(directoryPath, { withFileTypes: true });
  const folders = entries.filter((entry) => entry.isDirectory());
  const result = await Promise.all(
    folders.map((folder) => getCollection(join(directoryPath, folder.name), folder.name, new Set()))
  );
  console.timeEnd("getCollectionsFromDisk");
  return result;
};

const getCachedCollections = unstable_cache(getCollectionsFromDisk, ["collections"], { tags: ["collections"] });

export const getCollections = async (): Promise<Collection[]> => {
  console.time("getCollections total");
  const directoryPath = process.env.DIRECTORY_PATH;
  if (!directoryPath) {
    console.timeEnd("getCollections total");
    return [];
  }
  const result = await getCachedCollections(directoryPath);
  console.timeEnd("getCollections total");
  return result;
};
