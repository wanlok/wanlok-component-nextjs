import { CollectionFile } from "@/Types";

const imageExtensions = ["png", "jpg", "jpeg", "gif", "webp", "svg", "bmp"];

export const isCollectionImage = (file: CollectionFile) => {
  const extension = file.name.split(".").pop()?.toLowerCase();
  return extension !== undefined && imageExtensions.includes(extension);
};
