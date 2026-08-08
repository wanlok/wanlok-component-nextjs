import { alpha, Stack, useTheme } from "@mui/material";
import {
  Fullscreen as FullscreenIcon,
  FullscreenExit as FullscreenExitIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
  ViewList as ViewListIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon
} from "@mui/icons-material";
import { iconButtonSx, WButton } from "@/components/WButton";

export const ImageModalTopControlGroup = ({
  onZoomInClick,
  onZoomOutClick
}: {
  onZoomInClick: () => void;
  onZoomOutClick: () => void;
}) => (
  <>
    <WButton onClick={onZoomInClick} sx={iconButtonSx}>
      <ZoomInIcon sx={{ fontSize: 24 }} />
    </WButton>
    <WButton onClick={onZoomOutClick} sx={iconButtonSx}>
      <ZoomOutIcon sx={{ fontSize: 24 }} />
    </WButton>
  </>
);

export const ImageModalControlGroup = ({
  onZoomInClick,
  onZoomOutClick,
  isFullScreen,
  onFullScreenClick,
  isDetailsHidden,
  onDetailsClick,
  scrollbarWidths
}: {
  onZoomInClick: () => void;
  onZoomOutClick: () => void;
  isFullScreen: boolean;
  onFullScreenClick: () => void;
  isDetailsHidden: boolean;
  onDetailsClick: () => void;
  scrollbarWidths: { right: number; bottom: number };
}) => {
  const { palette } = useTheme();
  const overlayButtonSx = {
    ...iconButtonSx,
    backgroundColor: alpha(palette.primary.main, 0.9),
    "&:hover": { backgroundColor: palette.primary.main }
  };
  return (
    <>
      <Stack sx={{ position: "absolute", flexDirection: "row", top: 8, left: 8, gap: "1px" }}>
        <WButton onClick={onZoomInClick} sx={overlayButtonSx}>
          <ZoomInIcon sx={{ fontSize: 28 }} />
        </WButton>
        <WButton onClick={onZoomOutClick} sx={overlayButtonSx}>
          <ZoomOutIcon sx={{ fontSize: 28 }} />
        </WButton>
      </Stack>
      <Stack sx={{ position: "absolute", flexDirection: "row", top: 8, right: 8 + scrollbarWidths.right, gap: "1px" }}>
        <WButton onClick={onDetailsClick} sx={overlayButtonSx}>
          {isDetailsHidden ? <ViewListIcon sx={{ fontSize: 24 }} /> : <KeyboardArrowRightIcon sx={{ fontSize: 32 }} />}
        </WButton>
      </Stack>
      <Stack
        sx={{
          position: "absolute",
          flexDirection: "row",
          bottom: 8 + scrollbarWidths.bottom,
          right: 8 + scrollbarWidths.right,
          gap: "1px"
        }}
      >
        <WButton onClick={onFullScreenClick} sx={overlayButtonSx}>
          {isFullScreen ? <FullscreenExitIcon sx={{ fontSize: 30 }} /> : <FullscreenIcon sx={{ fontSize: 30 }} />}
        </WButton>
      </Stack>
    </>
  );
};
