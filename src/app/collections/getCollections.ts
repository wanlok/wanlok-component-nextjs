import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { imageSizeFromFile } from "image-size/fromFile";
import { Collection, CollectionFile, CollectionImage } from "@/Types";
import { getContentTypeFromImageType } from "@/utils/getContentTypeFromImageType";
import { getContentTypeFromFile } from "@/utils/getContentTypeFromFile";
import { compareFileNames } from "@/utils/compareFileNames";

const ignoreFiles = [".DS_Store"];
const fallbackContentType = "application/octet-stream";

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
        files: (
          await Promise.all(
            files
              .filter((file) => file.isFile() && !ignoreFiles.includes(file.name))
              .map((file) => getCollectionFile(join(directoryPath, folder.name, file.name), file.name))
          )
        ).sort((a, b) => compareFileNames(a.name, b.name))
      };
    })
  );
};
