"use client";

import { LayoutPanel } from "@/components/LayoutPanel";
import { Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LeftHeader } from "./LeftHeader";
import { LeftContent } from "./LeftContent";
import { RightHeader } from "./RightHeader";
import { RightContent } from "./RightContent";
import { CollectionModal } from "./CollectionModal";
import { Collection } from "@/Types";
import { addCollection, deleteCollection } from "./actions";

export const CollectionsView = ({
  collections,
  path,
  hideDeleteButton
}: {
  collections: Collection[];
  path: string[];
  hideDeleteButton: boolean;
}) => {
  const router = useRouter();
  const [panelOpened, setPanelOpened] = useState(false);
  const [opened, setOpened] = useState(false);
  const [folderControlGroupState, setFolderControlGroupState] = useState(0);
  const [controlGroupState, setControlGroupState] = useState(0);

  const selectedPath: Collection[] = [];
  let currentList = collections;
  for (const name of path) {
    const next = currentList.find((collection) => collection.name === name);
    if (!next) {
      break;
    }
    selectedPath.push(next);
    currentList = next.collections;
  }

  const selectedCollectionName = selectedPath[0]?.name;
  const displayedFolder = selectedPath.at(-1);
  const displayedPath = selectedPath.map((collection) => collection.name).join("/");
  const displayedFiles = displayedFolder?.files ?? [];
  const effectiveFolderControlGroupState = collections.length === 0 ? 0 : folderControlGroupState;
  const effectiveControlGroupState = displayedFiles.length === 0 ? 0 : controlGroupState;

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
            hideDeleteButton={hideDeleteButton}
          />
          <LeftContent
            collections={collections}
            selectedCollection={displayedFolder}
            folderControlGroupState={effectiveFolderControlGroupState}
            setPanelOpened={setPanelOpened}
            selectCollection={(path) => router.push(`/collections/${path.map(encodeURIComponent).join("/")}`)}
            deleteCollection={(path) => deleteCollection(path.join("/"))}
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
        name={selectedCollectionName ?? ""}
        controlGroupState={effectiveControlGroupState}
        onDeleteButtonClick={() => setControlGroupState(effectiveControlGroupState === 3 ? 0 : 3)}
        hideDeleteButton={hideDeleteButton}
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
