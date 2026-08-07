import { useState } from "react";
import { Stack } from "@mui/material";
import { ImageTitle } from "@/components/ImageTitle";
import { ImageModal } from "./ImageModal";
import { getImageContentType } from "@/utils/getImageContentType";

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
        open={selectedFile !== undefined}
        src={selectedFile ? getFileUrl(selectedFile) : ""}
        name={selectedFile ?? ""}
        onClose={() => setSelectedFile(undefined)}
      />
    </Stack>
  );
};
