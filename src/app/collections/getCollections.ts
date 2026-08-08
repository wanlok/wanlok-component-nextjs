import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { imageSizeFromFile } from "image-size/fromFile";
import { Collection, CollectionFile, CollectionImage } from "@/Types";
import { getContentTypeFromImageType } from "@/utils/getContentTypeFromImageType";
import { getContentTypeFromFile } from "@/utils/getContentTypeFromFile";
import { compareFileNames } from "@/utils/compareFileNames";

const ignoreFiles = [".DS_Store"];
const fallbackContentType = "application/octet-stream";
const maxCollectionDepth = 3;

const getCollectionFile = async (filePath: string, name: string): Promise<CollectionFile> => {
  const { width, height, type } = await imageSizeFromFile(filePath).catch(() => ({
    width: 0,
    height: 0,
    type: undefined
  }));
  const imageContentType = type ? getContentTypeFromImageType(type) : undefined;
  if (imageContentType) {
    const image: CollectionImage = { name, type: imageContentType, width, height };
    return image;
  }
  return { name, type: (await getContentTypeFromFile(filePath)) ?? fallbackContentType };
};

const getCollection = async (directoryPath: string, name: string, depth: number): Promise<Collection> => {
  const entries = await readdir(directoryPath, { withFileTypes: true });
  const fileEntries = entries.filter((entry) => entry.isFile() && !ignoreFiles.includes(entry.name));
  const directoryEntries = depth > 0 ? entries.filter((entry) => entry.isDirectory()) : [];
  const files = (
    await Promise.all(fileEntries.map((entry) => getCollectionFile(join(directoryPath, entry.name), entry.name)))
  ).sort((a, b) => compareFileNames(a.name, b.name));
  const collections = (
    await Promise.all(
      directoryEntries.map((entry) => getCollection(join(directoryPath, entry.name), entry.name, depth - 1))
    )
  ).sort((a, b) => compareFileNames(a.name, b.name));
  return { name, files, collections };
};

export const getCollections = async (): Promise<Collection[]> => {
  const directoryPath = process.env.DIRECTORY_PATH;
  if (!directoryPath) {
    return [];
  }
  const entries = await readdir(directoryPath, { withFileTypes: true });
  const folders = entries.filter((entry) => entry.isDirectory());
  return Promise.all(
    folders.map((folder) => getCollection(join(directoryPath, folder.name), folder.name, maxCollectionDepth))
  );
};
