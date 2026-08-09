import { Stack, Typography } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { iconButtonSx, WButton } from "../../components/WButton";
import { bottomSx, LayoutHeader, topSx } from "../../components/LayoutHeader";

const Top = ({
  name,
  controlGroupState,
  onDeleteButtonClick,
  hideDeleteButton
}: {
  name: string;
  controlGroupState: number;
  onDeleteButtonClick: () => void;
  hideDeleteButton: boolean;
}) => (
  <Stack sx={[topSx]}>
    <Stack sx={{ flex: 1, minWidth: 0, justifyContent: "center", px: 2 }}>
      <Typography variant="body1">{name}</Typography>
    </Stack>
    {name && !hideDeleteButton && (
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
  onDeleteButtonClick,
  hideDeleteButton
}: {
  name: string;
  controlGroupState: number;
  onDeleteButtonClick: () => void;
  hideDeleteButton: boolean;
}) => (
  <LayoutHeader
    top={
      <Top
        name={name}
        controlGroupState={controlGroupState}
        onDeleteButtonClick={onDeleteButtonClick}
        hideDeleteButton={hideDeleteButton}
      />
    }
    bottom={<Bottom />}
  />
);
