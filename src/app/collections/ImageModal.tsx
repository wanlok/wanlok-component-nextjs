import { useState } from "react";
import { alpha, Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import {
  Image as ImageIcon,
  ViewList as ViewListIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon
} from "@mui/icons-material";
import { WModal } from "@/components/WModal";
import { iconButtonSx, WButton } from "@/components/WButton";
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

export const ImageModal = ({
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
  const { breakpoints, palette } = useTheme();
  const mobile = useMediaQuery(breakpoints.down("md"));
  const [zoom, setZoom] = useState("fit");
  const [editedName, setEditedName] = useState(name);

  return (
    <WModal
      open={open}
      onClose={onClose}
      width="80vw"
      height="80dvh"
      tabs={[{ icon: <ImageIcon sx={{ fontSize: 24 }} />, label: "Image" }]}
      hideLeftLabel
      top={
        mobile ? (
          <>
            <WButton onClick={() => setZoom("original")} sx={iconButtonSx}>
              <ZoomInIcon sx={{ fontSize: 24 }} />
            </WButton>
            <WButton onClick={() => setZoom("fit")} sx={iconButtonSx}>
              <ZoomOutIcon sx={{ fontSize: 24 }} />
            </WButton>
          </>
        ) : undefined
      }
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
            sx={{
              position: "relative",
              display: "inline-block",
              lineHeight: 0,
              m: "auto",
              ...(zoom === "fit" && { maxWidth: "100%" })
            }}
          >
            <Box
              component="img"
              src={src}
              alt={name}
              sx={{ display: "block", ...(zoom === "fit" && { maxWidth: "100%", maxHeight: "80dvh" }) }}
            />
          </Box>
        </Stack>
        {!mobile && (
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
        )}
      </Box>
    </WModal>
  );
};
