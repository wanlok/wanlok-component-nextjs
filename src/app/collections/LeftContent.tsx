import { Dispatch, SetStateAction } from "react";
import { Stack } from "@mui/material";
import { Close as CloseIcon, Folder as FolderIcon, FolderOutlined as FolderOutlinedIcon } from "@mui/icons-material";
import { WCardList } from "../../components/WCardList";
import { iconButtonSx, WButton } from "../../components/WButton";
import { PanelRow } from "../../components/PanelRow";
import { Collection } from "@/Types";
import { flattenCollections } from "@/utils/flattenCollections";

export const LeftContent = ({
  collections,
  selectedCollection,
  folderControlGroupState,
  setPanelOpened,
  selectCollection,
  deleteCollection
}: {
  collections: Collection[];
  selectedCollection: Collection | undefined;
  folderControlGroupState: number;
  setPanelOpened: Dispatch<SetStateAction<boolean>>;
  selectCollection: (path: string[]) => void;
  deleteCollection: (path: string[]) => void;
}) => {
  const items = flattenCollections(collections);
  return (
    <>
      <WCardList
        items={items}
        getDepth={(item) => item.depth}
        renderContent={(item) => {
          const Icon = item.collection === selectedCollection ? FolderIcon : FolderOutlinedIcon;
          return <PanelRow icon={<Icon sx={{ fontSize: 24 }} />} title={item.collection.name} />;
        }}
        onContentClick={(item) => {
          if (item) {
            selectCollection(item.path);
          }
          setPanelOpened(false);
        }}
        renderRightContent={(item) => (
          <Stack>
            {folderControlGroupState === 1 && (
              <WButton
                onClick={() => deleteCollection(item.path)}
                sx={{ ...iconButtonSx, backgroundColor: "transparent", "&:hover": { backgroundColor: "action.hover" } }}
              >
                <CloseIcon sx={{ fontSize: 24 }} />
              </WButton>
            )}
          </Stack>
        )}
      />
    </>
  );
};
