import { Dispatch, SetStateAction } from "react";
import { Stack } from "@mui/material";
import { Close as CloseIcon, Folder as FolderIcon, FolderOutlined as FolderOutlinedIcon } from "@mui/icons-material";
import { WCardList } from "../../components/WCardList";
import { iconButtonSx, WButton } from "../../components/WButton";
import { PanelRow } from "../../components/PanelRow";
import { Collection } from "@/Types";

export const LeftContent = ({
  collections,
  selectedCollectionName,
  controlGroupState,
  setPanelOpened,
  selectCollection
}: {
  collections: Collection[];
  selectedCollectionName: string | undefined;
  controlGroupState: number;
  setPanelOpened: Dispatch<SetStateAction<boolean>>;
  selectCollection: (collection: Collection) => void;
}) => {
  return (
    <>
      <WCardList
        items={collections}
        renderContent={(collection: Collection) => {
          const Icon = collection.name === selectedCollectionName ? FolderIcon : FolderOutlinedIcon;
          return <PanelRow icon={<Icon sx={{ fontSize: 24 }} />} title={collection.name} />;
        }}
        onContentClick={(collection?: Collection) => {
          if (collection) {
            selectCollection(collection);
          }
          setPanelOpened(false);
        }}
        renderRightContent={(collection: Collection) => (
          <Stack>
            {controlGroupState === 1 && (
              <WButton onClick={() => {}} sx={{ ...iconButtonSx, backgroundColor: "transparent" }}>
                <CloseIcon sx={{ fontSize: 24 }} />
              </WButton>
            )}
          </Stack>
        )}
      />
    </>
  );
};
