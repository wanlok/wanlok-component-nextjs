import { Collection } from "@/Types";

export interface FlattenedCollection {
  collection: Collection;
  depth: number;
  path: string[];
}

export const flattenCollections = (
  collections: Collection[],
  isExpanded: (collection: Collection) => boolean,
  parentPath: string[] = []
): FlattenedCollection[] =>
  collections.flatMap((collection) => {
    const path = [...parentPath, collection.name];
    const entry = { collection, depth: path.length - 1, path };
    return isExpanded(collection)
      ? [entry, ...flattenCollections(collection.collections, isExpanded, path)]
      : [entry];
  });
