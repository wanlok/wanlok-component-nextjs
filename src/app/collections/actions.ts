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

export const deleteCollection = async (name: string) => {
  const directoryPath = process.env.DIRECTORY_PATH;
  if (!directoryPath) {
    return;
  }
  await rm(join(directoryPath, name), { recursive: true });
  revalidatePath("/collections", "layout");
};

export const renameCollectionFile = async (collectionName: string, oldFileName: string, newFileName: string) => {
  const directoryPath = process.env.DIRECTORY_PATH;
  if (!directoryPath || oldFileName.includes("..") || newFileName.includes("..")) {
    return;
  }
  await rename(join(directoryPath, collectionName, oldFileName), join(directoryPath, collectionName, newFileName));
  revalidatePath("/collections", "layout");
};

export const deleteCollectionFile = async (collectionName: string, fileName: string) => {
  const directoryPath = process.env.DIRECTORY_PATH;
  if (!directoryPath || fileName.includes("..")) {
    return;
  }
  await rm(join(directoryPath, collectionName, fileName));
  revalidatePath("/collections", "layout");
};
