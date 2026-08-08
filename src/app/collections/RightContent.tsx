import { useState } from "react";
import { Stack } from "@mui/material";
import { ImageTitle } from "@/components/ImageTitle";
import { ImageModal } from "./ImageModal";
import { getImageContentType } from "@/utils/getImageContentType";
import { renameCollectionFile } from "./actions";

export const RightContent = ({ collectionName, files }: { collectionName: string; files: string[] }) => {
  const [selectedFile, setSelectedFile] = useState<string | undefined>(undefined);
  const getFileUrl = (file: string) =>
    `/api/collections/${encodeURIComponent(collectionName)}/${encodeURIComponent(file)}`;

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
            key={file}
            imageUrl={getFileUrl(file)}
            name={file}
            onClick={getImageContentType(file) ? () => setSelectedFile(file) : undefined}
            aspectRatio="16/9"
            scrollHorizontally={false}
            controlGroupState={0}
            onLeftButtonClick={() => {}}
            onRightButtonClick={() => {}}
            onDeleteButtonClick={() => {}}
          />
        ))}
      </Stack>
      <ImageModal
        key={selectedFile}
        open={selectedFile !== undefined}
        src={selectedFile ? getFileUrl(selectedFile) : ""}
        name={selectedFile ?? ""}
        onSaveButtonClick={(newName) => {
          if (selectedFile && newName !== selectedFile) {
            renameCollectionFile(collectionName, selectedFile, newName);
          }
        }}
        onClose={() => setSelectedFile(undefined)}
      />
    </Stack>
  );
};
