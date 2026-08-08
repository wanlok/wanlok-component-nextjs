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
  selectedCollectionName
}: {
  collections: Collection[];
  selectedCollectionName: string | undefined;
}) => {
  const router = useRouter();
  const [panelOpened, setPanelOpened] = useState(false);
  const [opened, setOpened] = useState(false);
  const [folderControlGroupState, setFolderControlGroupState] = useState(0);
  const [controlGroupState, setControlGroupState] = useState(0);
  const selectedCollection = collections.find((collection) => collection.name === selectedCollectionName);
  const effectiveFolderControlGroupState = collections.length === 0 ? 0 : folderControlGroupState;
  const effectiveControlGroupState = (selectedCollection?.files.length ?? 0) === 0 ? 0 : controlGroupState;

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
      />
      <RightContent
        collectionName={selectedCollection?.name ?? ""}
        files={selectedCollection?.files ?? []}
        controlGroupState={effectiveControlGroupState}
      />
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
