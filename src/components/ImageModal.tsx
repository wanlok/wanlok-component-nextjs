import { useState } from "react";
import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import { Image as ImageIcon, ViewList as ViewListIcon } from "@mui/icons-material";
import { WModal } from "@/components/WModal";
import { TextInput } from "@/components/TextInput";
import { StyledContainer } from "@/components/StyledContainer";
import { YesNoButtons } from "@/components/YesNoButtons";
import { ImageMeta } from "@/components/ImageMeta";
import { ImageModalControlGroup, ImageModalTopControlGroup } from "./ImageModalControlGroup";

const Details = ({
  name,
  onNameChange,
  width,
  height,
  type
}: {
  name: string;
  onNameChange: (name: string) => void;
  width: number;
  height: number;
  type: string;
}) => (
  <Stack sx={{ p: 2, gap: 2 }}>
    <Stack sx={{ gap: "1px" }}>
      <StyledContainer sx={{ p: 1 }}>
        <TextInput label="Name" value={name} onChange={onNameChange} inputSx={{ flex: 1 }} />
      </StyledContainer>
      <ImageMeta width={width} height={height} type={type} />
    </Stack>
  </Stack>
);

export const ImageModal = ({
  open,
  src,
  name,
  width,
  height,
  type,
  onSaveButtonClick,
  onClose
}: {
  open: boolean;
  src: string;
  name: string;
  width: number;
  height: number;
  type: string;
  onSaveButtonClick: (name: string) => void;
  onClose: () => void;
}) => {
  const { breakpoints } = useTheme();
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
          <ImageModalTopControlGroup onZoomInClick={() => setZoom("original")} onZoomOutClick={() => setZoom("fit")} />
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
      rightChildren={
        <Details name={editedName} onNameChange={setEditedName} width={width} height={height} type={type} />
      }
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
          <ImageModalControlGroup onZoomInClick={() => setZoom("original")} onZoomOutClick={() => setZoom("fit")} />
        )}
      </Box>
    </WModal>
  );
};
