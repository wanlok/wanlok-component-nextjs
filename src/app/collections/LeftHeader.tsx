import { Stack, Typography } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { iconButtonSx, WButton } from "../../components/WButton";
import { bottomSx, LayoutHeader, topSx } from "../../components/LayoutHeader";

const Top = () => (
  <Stack sx={[topSx, { px: 2, alignItems: "center" }]}>
    <Typography variant="body1">Collections</Typography>
  </Stack>
);

const Bottom = ({
  controlGroupState,
  onDeleteButtonClick
}: {
  controlGroupState: number;
  onDeleteButtonClick: () => void;
}) => (
  <Stack sx={[bottomSx, { gap: "1px" }]}>
    <WButton isActivated={controlGroupState === 1} sx={iconButtonSx} onClick={onDeleteButtonClick}>
      <CloseIcon sx={{ fontSize: 24 }} />
    </WButton>
  </Stack>
);

export const LeftHeader = ({
  controlGroupState,
  onDeleteButtonClick
}: {
  numberOfCollections: number;
  controlGroupState: number;
  onDeleteButtonClick: () => void;
  onUploadButtonClick: () => void;
  onDownloadButtonClick: () => void;
}) => (
  <LayoutHeader
    top={<Top />}
    bottom={<Bottom controlGroupState={controlGroupState} onDeleteButtonClick={onDeleteButtonClick} />}
  />
);
