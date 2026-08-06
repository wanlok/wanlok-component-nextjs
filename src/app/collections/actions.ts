"use server";

import { mkdir, rm } from "node:fs/promises";
import { join } from "node:path";
import { revalidatePath } from "next/cache";

export const addCollection = async (name: string) => {
  const directoryPath = process.env.DIRECTORY_PATH;
  if (!directoryPath) {
    return;
  }
  await mkdir(join(directoryPath, name));
  revalidatePath("/collections");
};

export const deleteCollection = async (name: string) => {
  const directoryPath = process.env.DIRECTORY_PATH;
  if (!directoryPath) {
    return;
  }
  await rm(join(directoryPath, name), { recursive: true });
  revalidatePath("/collections");
};
