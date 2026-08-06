import { Stack, Typography } from "@mui/material";

export const RightContent = ({ files }: { files: string[] }) => {
  return (
    <Stack sx={{ flex: 1, p: 2, gap: 1, backgroundColor: "common.white" }}>
      {files.map((file) => (
        <Typography key={file} variant="body1">
          {file}
        </Typography>
      ))}
    </Stack>
  );
};
