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
  controlGroupState,
  onAddButtonClick,
  onDeleteButtonClick
}: {
  controlGroupState: number;
  onAddButtonClick: () => void;
  onDeleteButtonClick: () => void;
}) => (
  <Stack sx={[bottomSx, { gap: "1px" }]}>
    <WButton onClick={onAddButtonClick} sx={iconButtonSx}>
      <AddIcon sx={{ fontSize: 24 }} />
    </WButton>
    <WButton isActivated={controlGroupState === 1} sx={iconButtonSx} onClick={onDeleteButtonClick}>
      <CloseIcon sx={{ fontSize: 24 }} />
    </WButton>
  </Stack>
);

export const LeftHeader = ({
  controlGroupState,
  onAddButtonClick,
  onDeleteButtonClick
}: {
  numberOfCollections: number;
  controlGroupState: number;
  onAddButtonClick: () => void;
  onDeleteButtonClick: () => void;
  onUploadButtonClick: () => void;
  onDownloadButtonClick: () => void;
}) => (
  <LayoutHeader
    top={<Top />}
    bottom={
      <Bottom controlGroupState={controlGroupState} onAddButtonClick={onAddButtonClick} onDeleteButtonClick={onDeleteButtonClick} />
    }
  />
);
