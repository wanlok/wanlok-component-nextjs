import { useState } from "react";
import { Stack } from "@mui/material";
import { ImageTitle } from "@/components/ImageTitle";
import { ImageModal } from "./ImageModal";
import { deleteCollectionFile, renameCollectionFile } from "./actions";
import { CollectionFile, CollectionImage } from "@/Types";
import { isCollectionImage } from "@/utils/isCollectionImage";

export const RightContent = ({
  collectionName,
  files,
  controlGroupState
}: {
  collectionName: string;
  files: CollectionFile[];
  controlGroupState: number;
}) => {
  const [selectedFile, setSelectedFile] = useState<CollectionImage | undefined>(undefined);
  const getFileUrl = (name: string) =>
    `/api/collections/${encodeURIComponent(collectionName)}/${encodeURIComponent(name)}`;

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
            onClick={isCollectionImage(file) ? () => setSelectedFile(file) : undefined}
            aspectRatio="16/9"
            scrollHorizontally={false}
            controlGroupState={controlGroupState}
            onLeftButtonClick={() => {}}
            onRightButtonClick={() => {}}
            onDeleteButtonClick={() => deleteCollectionFile(collectionName, file.name)}
          />
        ))}
      </Stack>
      <ImageModal
        key={selectedFile?.name}
        open={selectedFile !== undefined}
        src={selectedFile ? getFileUrl(selectedFile.name) : ""}
        name={selectedFile?.name ?? ""}
        width={selectedFile?.width ?? 0}
        height={selectedFile?.height ?? 0}
        contentType={selectedFile?.contentType ?? ""}
        onSaveButtonClick={(newName) => {
          if (selectedFile && newName !== selectedFile.name) {
            renameCollectionFile(collectionName, selectedFile.name, newName);
          }
        }}
        onClose={() => setSelectedFile(undefined)}
      />
    </Stack>
  );
};
