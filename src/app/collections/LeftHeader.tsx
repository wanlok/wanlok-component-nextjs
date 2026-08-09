import { Stack, Typography } from "@mui/material";
import { Add as AddIcon, Close as CloseIcon } from "@mui/icons-material";
import { iconButtonSx, WButton } from "../../components/WButton";
import { bottomSx, LayoutHeader, topSx } from "../../components/LayoutHeader";

const Top = () => (
  <Stack sx={[topSx, { px: 2, alignItems: "center" }]}>
    <Typography variant="body1">Collections</Typography>
  </Stack>
);

const Bottom = ({
  folderControlGroupState,
  onAddButtonClick,
  onDeleteButtonClick,
  hideDeleteButton
}: {
  folderControlGroupState: number;
  onAddButtonClick: () => void;
  onDeleteButtonClick: () => void;
  hideDeleteButton: boolean;
}) => (
  <Stack sx={[bottomSx, { gap: "1px" }]}>
    <WButton onClick={onAddButtonClick} sx={iconButtonSx}>
      <AddIcon sx={{ fontSize: 26 }} />
    </WButton>
    {!hideDeleteButton && (
      <WButton isActivated={folderControlGroupState === 1} sx={iconButtonSx} onClick={onDeleteButtonClick}>
        <CloseIcon sx={{ fontSize: 24 }} />
      </WButton>
    )}
  </Stack>
);

export const LeftHeader = ({
  folderControlGroupState,
  onAddButtonClick,
  onDeleteButtonClick,
  hideDeleteButton
}: {
  numberOfCollections: number;
  folderControlGroupState: number;
  onAddButtonClick: () => void;
  onDeleteButtonClick: () => void;
  onUploadButtonClick: () => void;
  onDownloadButtonClick: () => void;
  hideDeleteButton: boolean;
}) => (
  <LayoutHeader
    top={<Top />}
    bottom={
      <Bottom
        folderControlGroupState={folderControlGroupState}
        onAddButtonClick={onAddButtonClick}
        onDeleteButtonClick={onDeleteButtonClick}
        hideDeleteButton={hideDeleteButton}
      />
    }
  />
);
