import { Collection } from "@/Types";

export interface FlattenedCollection {
  collection: Collection;
  depth: number;
  path: string[];
}

export const flattenCollections = (collections: Collection[], parentPath: string[] = []): FlattenedCollection[] =>
  collections.flatMap((collection) => {
    const path = [...parentPath, collection.name];
    return [{ collection, depth: path.length - 1, path }, ...flattenCollections(collection.collections, path)];
  });
