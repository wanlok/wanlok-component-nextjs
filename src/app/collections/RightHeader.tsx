import { Stack, Typography } from "@mui/material";
import { bottomSx, LayoutHeader, topSx } from "../../components/LayoutHeader";

const Top = ({ name }: { name: string }) => (
  <Stack sx={[topSx, { px: 2, alignItems: "center" }]}>
    <Typography variant="body1">{name}</Typography>
  </Stack>
);

const Bottom = () => <Stack sx={[bottomSx, {}]}></Stack>;

export const RightHeader = ({ name }: { name: string }) => (
  <LayoutHeader top={<Top name={name} />} bottom={<Bottom />} />
);
