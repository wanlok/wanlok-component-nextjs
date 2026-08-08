import { CollectionFile, CollectionImage } from "@/Types";

export const isCollectionImage = (file: CollectionFile): file is CollectionImage => "width" in file;
