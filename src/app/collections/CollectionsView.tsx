"use client";

import { LayoutPanel } from "@/components/LayoutPanel";
import { Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LeftHeader } from "./LeftHeader";
import { LeftContent } from "./LeftContent";
import { RightHeader, FilterLevel } from "./RightHeader";
import { RightContent } from "./RightContent";
import { CollectionModal } from "./CollectionModal";
import { Collection } from "@/Types";
import { addCollection, deleteCollection } from "./actions";

export const CollectionsView = ({
  collections,
  selectedCollectionName,
  path
}: {
  collections: Collection[];
  selectedCollectionName: string | undefined;
  path: string[];
}) => {
  const router = useRouter();
  const [panelOpened, setPanelOpened] = useState(false);
  const [opened, setOpened] = useState(false);
  const [folderControlGroupState, setFolderControlGroupState] = useState(0);
  const [controlGroupState, setControlGroupState] = useState(0);
  const selectedCollection = collections.find((collection) => collection.name === selectedCollectionName);

  const selectedPath: Collection[] = [];
  let current = selectedCollection;
  for (const name of path) {
    const next = current?.collections.find((collection) => collection.name === name);
    if (!next) {
      break;
    }
    selectedPath.push(next);
    current = next;
  }

  const displayedPath = [selectedCollection?.name, ...selectedPath.map((collection) => collection.name)]
    .filter((segment): segment is string => Boolean(segment))
    .join("/");
  const displayedFiles = (selectedPath.at(-1) ?? selectedCollection)?.files ?? [];
  const effectiveFolderControlGroupState = collections.length === 0 ? 0 : folderControlGroupState;
  const effectiveControlGroupState = displayedFiles.length === 0 ? 0 : controlGroupState;

  const navigateToPath = (newPath: string[]) => {
    if (!selectedCollection) {
      return;
    }
    const searchParams = new URLSearchParams();
    newPath.forEach((segment) => searchParams.append("path", segment));
    const query = searchParams.toString();
    router.push(`/collections/${encodeURIComponent(selectedCollection.name)}${query ? `?${query}` : ""}`);
  };

  const filterLevels: FilterLevel[] = [];
  let levelCollections = selectedCollection?.collections ?? [];
  for (let depth = 0; levelCollections.length > 0; depth += 1) {
    const selected = selectedPath[depth];
    filterLevels.push({
      collectionNames: levelCollections.map((collection) => collection.name),
      selectedCollectionName: selected?.name ?? "",
      onSelectedCollectionNameChange: (name) => navigateToPath([...path.slice(0, depth), name].filter(Boolean))
    });
    if (!selected) {
      break;
    }
    levelCollections = selected.collections;
  }

  return (
    <LayoutPanel
      panelOpened={panelOpened}
      setPanelOpened={setPanelOpened}
      width={300}
      isLoading={false}
      panel={
        <>
          <LeftHeader
            numberOfCollections={collections.length}
            folderControlGroupState={effectiveFolderControlGroupState}
            onAddButtonClick={() => setOpened(true)}
            onDeleteButtonClick={() => setFolderControlGroupState(effectiveFolderControlGroupState === 1 ? 0 : 1)}
            onUploadButtonClick={() => {}}
            onDownloadButtonClick={() => {}}
          />
          <LeftContent
            collections={collections}
            selectedCollectionName={selectedCollectionName}
            folderControlGroupState={effectiveFolderControlGroupState}
            setPanelOpened={setPanelOpened}
            selectCollection={(collection) => router.push(`/collections/${encodeURIComponent(collection.name)}`)}
            deleteCollection={(collection) => deleteCollection(collection.name)}
          />
        </>
      }
      topChildren={
        <Stack sx={{ p: 2 }}>
          <Typography variant="body1">Collections</Typography>
        </Stack>
      }
    >
      <RightHeader
        name={selectedCollection?.name ?? ""}
        controlGroupState={effectiveControlGroupState}
        onDeleteButtonClick={() => setControlGroupState(effectiveControlGroupState === 3 ? 0 : 3)}
        filterLevels={filterLevels}
      />
      <RightContent path={displayedPath} files={displayedFiles} controlGroupState={effectiveControlGroupState} />
      <CollectionModal
        open={opened}
        onClose={() => setOpened(false)}
        onSaveButtonClick={(name) => {
          addCollection(name);
          setOpened(false);
        }}
      />
    </LayoutPanel>
  );
};
