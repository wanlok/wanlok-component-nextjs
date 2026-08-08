import { Stack, Typography } from "@mui/material";

export const ImageMeta = ({
  width,
  height,
  contentType
}: {
  width: number;
  height: number;
  contentType: string;
}) => {
  return (
    <Stack>
      <Typography>{`${width} x ${height}`}</Typography>
      <Typography>{contentType}</Typography>
    </Stack>
  );
};
