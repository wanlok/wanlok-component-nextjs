"use server";

import { mkdir, rename, rm } from "node:fs/promises";
import { join } from "node:path";
import { revalidatePath } from "next/cache";

export const addCollection = async (name: string) => {
  const directoryPath = process.env.DIRECTORY_PATH;
  if (!directoryPath) {
    return;
  }
  await mkdir(join(directoryPath, name));
  revalidatePath("/collections", "layout");
};

export const deleteCollection = async (path: string) => {
  const directoryPath = process.env.DIRECTORY_PATH;
  if (!directoryPath || path.includes("..")) {
    return;
  }
  await rm(join(directoryPath, path), { recursive: true });
  revalidatePath("/collections", "layout");
};

export const renameCollectionFile = async (path: string, oldFileName: string, newFileName: string) => {
  const directoryPath = process.env.DIRECTORY_PATH;
  if (!directoryPath || path.includes("..") || oldFileName.includes("..") || newFileName.includes("..")) {
    return;
  }
  await rename(join(directoryPath, path, oldFileName), join(directoryPath, path, newFileName));
  revalidatePath("/collections", "layout");
};

export const deleteCollectionFile = async (path: string, fileName: string) => {
  const directoryPath = process.env.DIRECTORY_PATH;
  if (!directoryPath || path.includes("..") || fileName.includes("..")) {
    return;
  }
  await rm(join(directoryPath, path, fileName));
  revalidatePath("/collections", "layout");
};
