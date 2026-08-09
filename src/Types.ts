export interface CollectionFile {
  name: string;
}

export type ImageMeta = { width: number; height: number; type: string };

export interface Collection {
  name: string;
  files: CollectionFile[];
  collections: Collection[];
}

export enum Direction {
  left = "left",
  right = "right"
}
