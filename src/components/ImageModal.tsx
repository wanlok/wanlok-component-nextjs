import { useEffect, useRef, useState } from "react";
import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import { Image as ImageIcon, ViewList as ViewListIcon } from "@mui/icons-material";
import { WModal } from "@/components/WModal";
import { TextInput } from "@/components/TextInput";
import { StyledContainer } from "@/components/StyledContainer";
import { YesNoButtons } from "@/components/YesNoButtons";
import { ImageMeta } from "@/components/ImageMeta";
import { ImageModalImage } from "@/components/ImageModalImage";
import { ImageModalControlGroup, ImageModalTopControlGroup } from "./ImageModalControlGroup";
import { useModalControlGroup } from "./useModalControlGroup";

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
  onPreviousClick,
  onNextClick,
  onSaveButtonClick,
  onClose
}: {
  open: boolean;
  src: string;
  name: string;
  width: number;
  height: number;
  type: string;
  onPreviousClick?: () => void;
  onNextClick?: () => void;
  onSaveButtonClick: (name: string) => void;
  onClose: () => void;
}) => {
  const { breakpoints } = useTheme();
  const mobile = useMediaQuery(breakpoints.down("md"));
  const [zoom, setZoom] = useState("fit");
  const [editedName, setEditedName] = useState(name);
  const { isFullScreen, onFullScreenClick, isDetailsHidden, onDetailsClick } = useModalControlGroup();
  const [scrollbarWidths, setScrollbarWidths] = useState({ bottom: 0, right: 0 });
  const scrollRef = useRef<HTMLDivElement>(null);
  const fullScreen = mobile || isFullScreen;
  const detailsHidden = mobile ? false : isDetailsHidden;

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) {
      return;
    }
    const updateScrollbarWidths = () => {
      setScrollbarWidths({
        bottom: element.offsetHeight - element.clientHeight,
        right: element.offsetWidth - element.clientWidth
      });
    };
    updateScrollbarWidths();
    const resizeObserver = new ResizeObserver(updateScrollbarWidths);
    resizeObserver.observe(element);
    return () => resizeObserver.disconnect();
  }, [zoom]);

  return (
    <WModal
      open={open}
      onClose={onClose}
      width="80vw"
      height="80dvh"
      isFullScreen={isFullScreen}
      tabs={[{ icon: <ImageIcon sx={{ fontSize: 24 }} />, label: "Image" }]}
      hideLeftLabel
      top={
        mobile ? (
          <ImageModalTopControlGroup onZoomInClick={() => setZoom("original")} onZoomOutClick={() => setZoom("fit")} />
        ) : undefined
      }
      rightTabs={detailsHidden ? undefined : [{ icon: <ViewListIcon sx={{ fontSize: 24 }} />, label: "Details" }]}
      rightSelectedTab={0}
      rightBottom={
        detailsHidden ? undefined : (
          <YesNoButtons
            yesLabel="Save"
            onYesClick={() => {
              onSaveButtonClick(editedName);
              onClose();
            }}
            noLabel="Cancel"
            onNoClick={onClose}
          />
        )
      }
      rightChildren={
        detailsHidden ? undefined : (
          <Details name={editedName} onNameChange={setEditedName} width={width} height={height} type={type} />
        )
      }
    >
      <Box sx={{ position: "relative", height: "100%" }}>
        <ImageModalImage
          src={src}
          alt={name}
          fitScreen={zoom === "fit"}
          fullScreen={fullScreen}
          scrollRef={scrollRef}
          onImageLoad={() => {
            const element = scrollRef.current;
            if (element) {
              setScrollbarWidths({
                bottom: element.offsetHeight - element.clientHeight,
                right: element.offsetWidth - element.clientWidth
              });
            }
          }}
        />
        {!mobile && (
          <ImageModalControlGroup
            onZoomInClick={() => setZoom("original")}
            onZoomOutClick={() => setZoom("fit")}
            isFullScreen={isFullScreen}
            onFullScreenClick={onFullScreenClick}
            isDetailsHidden={isDetailsHidden}
            onDetailsClick={onDetailsClick}
            onPreviousClick={onPreviousClick}
            onNextClick={onNextClick}
            scrollbarWidths={scrollbarWidths}
          />
        )}
      </Box>
    </WModal>
  );
};
