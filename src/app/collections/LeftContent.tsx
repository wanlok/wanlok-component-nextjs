import { Dispatch, SetStateAction } from "react";
import { Stack, Typography } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { WCardList } from "../../components/WCardList";
import { iconButtonSx, WButton } from "../../components/WButton";
import { Collection } from "@/Types";

export const LeftContent = ({
  collections,
  controlGroupState,
  setPanelOpened,
  selectCollection,
  addFolder
}: {
  collections: Collection[];
  controlGroupState: number;
  setPanelOpened: Dispatch<SetStateAction<boolean>>;
  selectCollection: (collection: Collection) => void;
  addFolder: (name: string) => Promise<void>;
}) => {
  return (
    <>
      <WCardList
        items={collections}
        renderContent={(collection: Collection) => (
          <Stack sx={{ p: 2 }}>
            <Typography variant="body1">{collection.name}</Typography>
          </Stack>
        )}
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
