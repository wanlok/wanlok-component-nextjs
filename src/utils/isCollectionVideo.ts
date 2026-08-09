import { CollectionFile } from "@/Types";

const videoExtensions = ["mp4", "mov", "webm", "m4v"];

export const isCollectionVideo = (file: CollectionFile) => {
  const extension = file.name.split(".").pop()?.toLowerCase();
  return extension !== undefined && videoExtensions.includes(extension);
};
