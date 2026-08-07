import { Stack } from "@mui/material";
import { ImageTitle } from "@/components/ImageTitle";

export const RightContent = ({ collectionName, files }: { collectionName: string; files: string[] }) => {
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
            imageUrl={`/api/collections/${encodeURIComponent(collectionName)}/${encodeURIComponent(file)}`}
            name={file}
            aspectRatio="16/9"
            scrollHorizontally={false}
            controlGroupState={0}
            onLeftButtonClick={() => {}}
            onRightButtonClick={() => {}}
            onDeleteButtonClick={() => {}}
          />
        ))}
      </Stack>
    </Stack>
  );
};
