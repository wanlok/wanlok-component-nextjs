import { useState } from "react";
import { Box, Stack } from "@mui/material";
import { SmartDisplay as SmartDisplayIcon, ViewList as ViewListIcon } from "@mui/icons-material";
import { WModal } from "@/components/WModal";
import { TextInput } from "@/components/TextInput";
import { StyledContainer } from "@/components/StyledContainer";
import { YesNoButtons } from "@/components/YesNoButtons";

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
  onSaveButtonClick,
  onClose
}: {
  open: boolean;
  src: string;
  name: string;
  onSaveButtonClick: (name: string) => void;
  onClose: () => void;
}) => {
  const [editedName, setEditedName] = useState(name);

  return (
    <WModal
      open={open}
      onClose={onClose}
      width="80vw"
      height="80dvh"
      tabs={[{ icon: <SmartDisplayIcon sx={{ fontSize: 24 }} />, label: "Video" }]}
      hideLeftLabel
      rightTabs={[{ icon: <ViewListIcon sx={{ fontSize: 24 }} />, label: "Details" }]}
      rightSelectedTab={0}
      rightBottom={
        <YesNoButtons
          yesLabel="Save"
          onYesClick={() => {
            onSaveButtonClick(editedName);
            onClose();
          }}
          noLabel="Cancel"
          onNoClick={onClose}
        />
      }
      rightChildren={<Details name={editedName} onNameChange={setEditedName} />}
    >
      <Stack sx={{ height: "100%", alignItems: "center", justifyContent: "center", backgroundColor: "common.black" }}>
        <Box
          component="video"
          src={src}
          controls
          autoPlay
          sx={{ display: "block", maxWidth: "100%", maxHeight: "100%" }}
        />
      </Stack>
    </WModal>
  );
};
