import { CollectionFile } from "@/Types";

export const isCollectionVideo = (file: CollectionFile) => file.type.startsWith("video/");
