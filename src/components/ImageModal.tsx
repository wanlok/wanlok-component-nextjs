import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import { Image as ImageIcon, ViewList as ViewListIcon } from "@mui/icons-material";
import { WModal } from "@/components/WModal";
import { TextInput } from "@/components/TextInput";
import { StyledContainer } from "@/components/StyledContainer";
import { YesNoButtons } from "@/components/YesNoButtons";
import { ImageMetaContainer } from "@/components/ImageMetaContainer";
import { ImageModalImage } from "@/components/ImageModalImage";
import { ImageModalControlGroup, ImageModalTopControlGroup } from "./ImageModalControlGroup";
import { useModalControlGroup } from "./useModalControlGroup";
import { ImageMeta } from "@/Types";

const Details = ({
  name,
  onNameChange,
  imageMeta
}: {
  name: string;
  onNameChange: (name: string) => void;
  imageMeta: ImageMeta | undefined;
}) => (
  <Stack sx={{ p: 2, gap: 2 }}>
    <Stack sx={{ gap: "1px" }}>
      <StyledContainer sx={{ p: 1 }}>
        <TextInput label="Name" value={name} onChange={onNameChange} inputSx={{ flex: 1 }} />
      </StyledContainer>
    </Stack>
    <ImageMetaContainer imageMeta={imageMeta} />
  </Stack>
);

export const ImageModal = ({
  open,
  src,
  name,
  onPreviousClick,
  onNextClick,
  onSaveButtonClick,
  onClose
}: {
  open: boolean;
  src: string;
  name: string;
  onPreviousClick?: () => void;
  onNextClick?: () => void;
  onSaveButtonClick: (name: string) => void;
  onClose: () => void;
}) => {
  const { breakpoints } = useTheme();
  const mobile = useMediaQuery(breakpoints.down("md"));
  const [zoom, setZoom] = useState("fit");
  const [editedName, setEditedName] = useState(name);
  const { isFullScreen, onFullScreenClick, exitFullScreen, isRightHidden, onDetailsClick } = useModalControlGroup();
  const [scrollbarWidths, setScrollbarWidths] = useState({ bottom: 0, right: 0 });
  const [imageMeta, setImageMeta] = useState<ImageMeta | undefined>(undefined);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fullScreen = mobile || isFullScreen;
  const rightHidden = mobile ? false : isRightHidden;

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

  useEffect(() => {
    if (!open || !src) {
      return;
    }
    let cancelled = false;
    fetch(src, { headers: { Range: "bytes=0-0" } })
      .then((response) => response.headers.get("content-type"))
      .then((type) => {
        if (!cancelled && type) {
          setImageMeta((current) => ({ width: current?.width ?? 0, height: current?.height ?? 0, type }));
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [open, src]);

  const onImageLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = event.currentTarget;
    setImageMeta((current) => ({ width: naturalWidth, height: naturalHeight, type: current?.type ?? "" }));
    const element = scrollRef.current;
    if (element) {
      setScrollbarWidths({
        bottom: element.offsetHeight - element.clientHeight,
        right: element.offsetWidth - element.clientWidth
      });
    }
  };

  const closeModal = () => {
    exitFullScreen();
    onClose();
  };

  const rightTabs = [{ icon: <ViewListIcon sx={{ fontSize: 24 }} />, label: "Details" }];

  return (
    <WModal
      open={open}
      onClose={closeModal}
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
      rightTabs={rightHidden ? undefined : rightTabs}
      rightSelectedTab={0}
      rightBottom={
        rightHidden ? undefined : (
          <YesNoButtons
            yesLabel="Save"
            onYesClick={() => {
              onSaveButtonClick(editedName);
              closeModal();
            }}
            noLabel="Cancel"
            onNoClick={closeModal}
          />
        )
      }
      rightChildren={
        rightHidden ? undefined : (
          <Details name={editedName} onNameChange={setEditedName} imageMeta={imageMeta} />
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
          onImageLoad={onImageLoad}
        />
        {!mobile && (
          <ImageModalControlGroup
            onZoomInClick={() => setZoom("original")}
            onZoomOutClick={() => setZoom("fit")}
            isFullScreen={isFullScreen}
            onFullScreenClick={onFullScreenClick}
            isRightHidden={isRightHidden}
            onDetailsClick={onDetailsClick}
            tabs={rightTabs}
            selectedTab={0}
            onPreviousClick={onPreviousClick}
            onNextClick={onNextClick}
            scrollbarWidths={scrollbarWidths}
          />
        )}
      </Box>
    </WModal>
  );
};
