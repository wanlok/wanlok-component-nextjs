export interface CollectionFile {
  name: string;
  type: string;
}

export interface CollectionImage extends CollectionFile {
  width: number;
  height: number;
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
