import { useState } from "react";
import { alpha, Box, Stack, useTheme } from "@mui/material";
import { ViewList as ViewListIcon, ZoomIn as ZoomInIcon, ZoomOut as ZoomOutIcon } from "@mui/icons-material";
import { WModal } from "@/components/WModal";
import { iconButtonSx, WButton } from "@/components/WButton";
import { StyledContainer } from "@/components/StyledContainer";
import { TextInput } from "@/components/TextInput";

const ImageView = ({ src, name }: { src: string; name: string }) => {
  const { palette } = useTheme();
  const [zoom, setZoom] = useState<"fit" | "original">("fit");

  return (
    <Box sx={{ position: "relative", height: "100%" }}>
      <Stack
        sx={
          zoom === "fit"
            ? {
                height: "100%",
                overflow: "hidden",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "common.black"
              }
            : { height: "100%", overflow: "auto", alignItems: "flex-start", backgroundColor: "common.black" }
        }
      >
        <Box
          component="img"
          src={src}
          alt={name}
          sx={{ display: "block", ...(zoom === "fit" && { maxWidth: "100%", maxHeight: "80dvh" }) }}
        />
      </Stack>
      <Stack sx={{ position: "absolute", flexDirection: "row", top: 8, left: 8, gap: "1px" }}>
        <WButton
          onClick={() => setZoom("original")}
          sx={{
            ...iconButtonSx,
            backgroundColor: alpha(palette.primary.main, 0.9),
            "&:hover": { backgroundColor: palette.primary.main }
          }}
        >
          <ZoomInIcon sx={{ fontSize: 28 }} />
        </WButton>
        <WButton
          onClick={() => setZoom("fit")}
          sx={{
            ...iconButtonSx,
            backgroundColor: alpha(palette.primary.main, 0.9),
            "&:hover": { backgroundColor: palette.primary.main }
          }}
        >
          <ZoomOutIcon sx={{ fontSize: 28 }} />
        </WButton>
      </Stack>
    </Box>
  );
};

export const ImageModal = ({
  open,
  src,
  name,
  onClose
}: {
  open: boolean;
  src: string;
  name: string;
  onClose: () => void;
}) => (
  <WModal
    open={open}
    onClose={onClose}
    width="80vw"
    height="80dvh"
    rightTabs={[{ icon: <ViewListIcon sx={{ fontSize: 24 }} />, label: "Details" }]}
    rightSelectedTab={0}
    rightChildren={
      <Stack sx={{ p: 2, gap: "1px" }}>
        <StyledContainer sx={{ p: 1 }}>
          <TextInput label="Name" value={name} onChange={() => {}} disabled inputSx={{ flex: 1 }} />
        </StyledContainer>
      </Stack>
    }
  >
    <ImageView key={src} src={src} name={name} />
  </WModal>
);
