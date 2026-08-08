import { useState } from "react";
import { Stack } from "@mui/material";
import { ImageTitle } from "@/components/ImageTitle";
import { ImageModal } from "@/components/ImageModal";
import { VideoModal } from "@/components/VideoModal";
import { deleteCollectionFile, renameCollectionFile } from "./actions";
import { CollectionFile } from "@/Types";
import { isCollectionImage } from "@/utils/isCollectionImage";
import { isCollectionVideo } from "@/utils/isCollectionVideo";

export const RightContent = ({
  path,
  files,
  controlGroupState
}: {
  path: string;
  files: CollectionFile[];
  controlGroupState: number;
}) => {
  const [selectedFile, setSelectedFile] = useState<CollectionFile | undefined>(undefined);
  const getFileUrl = (name: string) => `/api/collections/${encodeURIComponent(path)}/${encodeURIComponent(name)}`;

  const previewableFiles = files.filter((file) => isCollectionImage(file) || isCollectionVideo(file));
  const selectedIndex = selectedFile
    ? previewableFiles.findIndex((file) => file.name === selectedFile.name)
    : -1;
  const previousFile = selectedIndex > 0 ? previewableFiles[selectedIndex - 1] : undefined;
  const nextFile =
    selectedIndex >= 0 && selectedIndex < previewableFiles.length - 1
      ? previewableFiles[selectedIndex + 1]
      : undefined;
  const selectedImage = selectedFile && isCollectionImage(selectedFile) ? selectedFile : undefined;
  const selectedVideo = selectedFile && isCollectionVideo(selectedFile) ? selectedFile : undefined;

  return (
    <Stack sx={{ flex: 1, overflowY: "auto", backgroundColor: "common.white" }}>
      <Stack
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)", xl: "repeat(4, 1fr)" },
          gap: "1px"
        }}
      >
        {files.map((file) => (
          <ImageTitle
            key={file.name}
            imageUrl={getFileUrl(file.name)}
            imageSx={{ objectPosition: "top" }}
            name={file.name}
            onClick={
              isCollectionImage(file) || isCollectionVideo(file) ? () => setSelectedFile(file) : undefined
            }
            aspectRatio="16/9"
            scrollHorizontally={false}
            controlGroupState={controlGroupState}
            onLeftButtonClick={() => {}}
            onRightButtonClick={() => {}}
            onDeleteButtonClick={() => deleteCollectionFile(path, file.name)}
          />
        ))}
      </Stack>
      <ImageModal
        key={selectedImage?.name}
        open={selectedImage !== undefined}
        src={selectedImage ? getFileUrl(selectedImage.name) : ""}
        name={selectedImage?.name ?? ""}
        width={selectedImage?.width ?? 0}
        height={selectedImage?.height ?? 0}
        type={selectedImage?.type ?? ""}
        onPreviousClick={previousFile ? () => setSelectedFile(previousFile) : undefined}
        onNextClick={nextFile ? () => setSelectedFile(nextFile) : undefined}
        onSaveButtonClick={(newName) => {
          if (selectedImage && newName !== selectedImage.name) {
            renameCollectionFile(path, selectedImage.name, newName);
          }
        }}
        onClose={() => setSelectedFile(undefined)}
      />
      <VideoModal
        key={selectedVideo?.name}
        open={selectedVideo !== undefined}
        src={selectedVideo ? getFileUrl(selectedVideo.name) : ""}
        name={selectedVideo?.name ?? ""}
        onPreviousClick={previousFile ? () => setSelectedFile(previousFile) : undefined}
        onNextClick={nextFile ? () => setSelectedFile(nextFile) : undefined}
        onSaveButtonClick={(newName) => {
          if (selectedVideo && newName !== selectedVideo.name) {
            renameCollectionFile(path, selectedVideo.name, newName);
          }
        }}
        onClose={() => setSelectedFile(undefined)}
      />
    </Stack>
  );
};
