import { useState } from "react";
import { Stack } from "@mui/material";
import { StyledContainer } from "@/components/StyledContainer";
import { TextInput } from "@/components/TextInput";
import { WModal } from "@/components/WModal";
import { YesNoButtons } from "@/components/YesNoButtons";

export const CollectionModal = ({
  open,
  onClose,
  onSaveButtonClick
}: {
  open: boolean;
  onClose: () => void;
  onSaveButtonClick: (name: string) => void;
}) => {
  const [name, setName] = useState("");

  const handleClose = () => {
    setName("");
    onClose();
  };

  return (
    <WModal
      open={open}
      onClose={handleClose}
      tabs={[{ label: "Create Collection" }]}
      bottom={
        <YesNoButtons
          yesLabel="Save"
          onYesClick={() => {
            onSaveButtonClick(name);
            setName("");
          }}
          noLabel="Cancel"
          onNoClick={handleClose}
        />
      }
    >
      <Stack sx={{ gap: "1px", p: 2 }}>
        <StyledContainer sx={{ p: 1 }}>
          <TextInput label="Name" value={name} onChange={(value) => setName(value)} inputSx={{ flex: 1 }} />
        </StyledContainer>
      </Stack>
    </WModal>
  );
};
