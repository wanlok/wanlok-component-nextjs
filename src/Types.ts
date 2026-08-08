export interface CollectionFile {
  name: string;
  type: string;
}

export interface CollectionImage extends CollectionFile {
  width: number;
  height: number;
}

export interface Collection {
  name: string;
  files: CollectionFile[];
}

export enum Direction {
  left = "left",
  right = "right"
}
