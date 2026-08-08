import { CollectionFile, CollectionImage } from "@/Types";

export const isCollectionImage = (file: CollectionFile): file is CollectionImage => "contentType" in file;
