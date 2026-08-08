import { useState } from "react";
import { Box, Stack } from "@mui/material";
import { SmartDisplay as SmartDisplayIcon, ViewList as ViewListIcon } from "@mui/icons-material";
import { WModal } from "@/components/WModal";
import { TextInput } from "@/components/TextInput";
import { StyledContainer } from "@/components/StyledContainer";
import { YesNoButtons } from "@/components/YesNoButtons";
import { ModalControlGroup } from "./ModalControlGroup";
import { useModalControlGroup } from "./useModalControlGroup";

const Details = ({ name, onNameChange }: { name: string; onNameChange: (name: string) => void }) => (
  <Stack sx={{ p: 2, gap: 2 }}>
    <Stack sx={{ gap: "1px" }}>
      <StyledContainer sx={{ p: 1 }}>
        <TextInput label="Name" value={name} onChange={onNameChange} inputSx={{ flex: 1 }} />
      </StyledContainer>
    </Stack>
  </Stack>
);

export const VideoModal = ({
  open,
  src,
  name,
  onPreviousClick,
  onNextClick,
  onSaveButtonClick,
  onClose
}: {
  open: boolean;
  src: string;
  name: string;
  onPreviousClick?: () => void;
  onNextClick?: () => void;
  onSaveButtonClick: (name: string) => void;
  onClose: () => void;
}) => {
  const [editedName, setEditedName] = useState(name);
  const { isFullScreen, onFullScreenClick, isDetailsHidden, onDetailsClick } = useModalControlGroup();

  return (
    <WModal
      open={open}
      onClose={onClose}
      width="80vw"
      height="80dvh"
      isFullScreen={isFullScreen}
      tabs={[{ icon: <SmartDisplayIcon sx={{ fontSize: 24 }} />, label: "Video" }]}
      hideLeftLabel
      rightTabs={isDetailsHidden ? undefined : [{ icon: <ViewListIcon sx={{ fontSize: 24 }} />, label: "Details" }]}
      rightSelectedTab={0}
      rightBottom={
        isDetailsHidden ? undefined : (
          <YesNoButtons
            yesLabel="Save"
            onYesClick={() => {
              onSaveButtonClick(editedName);
              onClose();
            }}
            noLabel="Cancel"
            onNoClick={onClose}
          />
        )
      }
      rightChildren={isDetailsHidden ? undefined : <Details name={editedName} onNameChange={setEditedName} />}
    >
      <Box sx={{ position: "relative", height: "100%" }}>
        <Stack sx={{ height: "100%", alignItems: "center", justifyContent: "center", backgroundColor: "common.black" }}>
          <Box
            component="video"
            src={src}
            controls
            sx={{ display: "block", width: "100%", height: "100%", objectFit: "contain" }}
          />
        </Stack>
        <ModalControlGroup
          onPreviousClick={onPreviousClick}
          onNextClick={onNextClick}
          isFullScreen={isFullScreen}
          onFullScreenClick={onFullScreenClick}
          isDetailsHidden={isDetailsHidden}
          onDetailsClick={onDetailsClick}
        />
      </Box>
    </WModal>
  );
};
