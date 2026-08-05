import { useState } from "react";
import { Collection } from "@/Types";

export const useCollection = () => {
  const [collections] = useState<Collection[]>([
    { name: "Folder 1" },
    { name: "Folder 2" },
    { name: "Folder 3" },
    { name: "Folder 4" },
    { name: "Folder 5" }
  ]);
  const [selectedCollection, setSelectedCollection] = useState<Collection | undefined>(collections[0]);

  return { collections, selectedCollection, selectCollection: setSelectedCollection };
};
