export interface CollectionFile {
  name: string;
}

export interface CollectionImage extends CollectionFile {
  width: number;
  height: number;
  contentType: string;
}

export interface Collection {
  name: string;
  files: CollectionFile[];
}

export enum Direction {
  left = "left",
  right = "right"
}
