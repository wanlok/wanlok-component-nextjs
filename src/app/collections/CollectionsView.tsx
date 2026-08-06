"use client";

import { LayoutPanel } from "@/components/LayoutPanel";
import { Stack, Typography } from "@mui/material";
import { useState } from "react";
import { LeftHeader } from "./LeftHeader";
import { LeftContent } from "./LeftContent";
import { RightHeader } from "./RightHeader";
import { RightContent } from "./RightContent";
import { CollectionModal } from "./CollectionModal";
import { Collection } from "@/Types";
import { addCollection, deleteCollection } from "./actions";

export const CollectionsView = ({ collections }: { collections: Collection[] }) => {
  const [panelOpened, setPanelOpened] = useState(false);
  const [selectedCollectionName, setSelectedCollectionName] = useState<string | undefined>(collections[0]?.name);
  const [opened, setOpened] = useState(false);
  const [controlGroupState, setControlGroupState] = useState(0);
  const selectedCollection = collections.find((collection) => collection.name === selectedCollectionName);

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
            controlGroupState={controlGroupState}
            onAddButtonClick={() => setOpened(true)}
            onDeleteButtonClick={() => setControlGroupState(controlGroupState === 1 ? 0 : 1)}
            onUploadButtonClick={() => {}}
            onDownloadButtonClick={() => {}}
          />
          <LeftContent
            collections={collections}
            selectedCollectionName={selectedCollectionName}
            controlGroupState={controlGroupState}
            setPanelOpened={setPanelOpened}
            selectCollection={(collection) => setSelectedCollectionName(collection.name)}
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
      <RightHeader name={selectedCollection?.name ?? ""} />
      <RightContent files={selectedCollection?.files ?? []} />
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
