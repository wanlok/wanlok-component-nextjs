import { Stack, Typography } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { iconButtonSx, WButton } from "../../components/WButton";
import { bottomSx, LayoutHeader, topSx } from "../../components/LayoutHeader";

const Top = ({
  name,
  controlGroupState,
  onDeleteButtonClick
}: {
  name: string;
  controlGroupState: number;
  onDeleteButtonClick: () => void;
}) => (
  <Stack sx={[topSx]}>
    <Stack sx={{ flex: 1, minWidth: 0, justifyContent: "center", px: 2 }}>
      <Typography variant="body1">{name}</Typography>
    </Stack>
    {name && (
      <Stack sx={{ flexDirection: "row", gap: "1px" }}>
        <WButton isActivated={controlGroupState === 3} onClick={onDeleteButtonClick} sx={iconButtonSx}>
          <CloseIcon sx={{ fontSize: 24 }} />
        </WButton>
      </Stack>
    )}
  </Stack>
);

const Bottom = () => <Stack sx={[bottomSx, {}]}></Stack>;

export const RightHeader = ({
  name,
  controlGroupState,
  onDeleteButtonClick
}: {
  name: string;
  controlGroupState: number;
  onDeleteButtonClick: () => void;
}) => (
  <LayoutHeader
    top={<Top name={name} controlGroupState={controlGroupState} onDeleteButtonClick={onDeleteButtonClick} />}
    bottom={<Bottom />}
  />
);
