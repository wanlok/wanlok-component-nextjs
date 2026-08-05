"use client";

import { LayoutPanel } from "@/components/LayoutPanel";
import { Stack, Typography } from "@mui/material";
import { useState } from "react";
import { LeftHeader } from "./LeftHeader";
import { LeftContent } from "./LeftContent";
import { RightHeader } from "./RightHeader";
import { RightContent } from "./RightContent";
import { useCollection } from "./useCollection";

const Page = () => {
  const [panelOpened, setPanelOpened] = useState(false);
  const { collections, selectedCollection, selectCollection } = useCollection();
  return (
    <LayoutPanel
      panelOpened={panelOpened}
      setPanelOpened={setPanelOpened}
      width={300}
      isLoading={false}
      panel={
        <>
          <LeftHeader
            numberOfCollections={0}
            controlGroupState={0}
            onDeleteButtonClick={() => {}}
            onUploadButtonClick={() => {}}
            onDownloadButtonClick={() => {}}
          />
          <LeftContent
            collections={collections}
            controlGroupState={0}
            setPanelOpened={setPanelOpened}
            selectCollection={selectCollection}
            addFolder={async () => {}}
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
      <RightContent />
    </LayoutPanel>
  );
};

export default Page;
