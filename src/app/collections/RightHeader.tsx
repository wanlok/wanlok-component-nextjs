import { Stack, Typography } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { iconButtonSx, WButton } from "../../components/WButton";
import { bottomSx, LayoutHeader, topSx } from "../../components/LayoutHeader";
import { StyledContainer } from "@/components/StyledContainer";
import { SelectInput } from "@/components/SelectInput";

export interface FilterLevel {
  collectionNames: string[];
  selectedCollectionName: string;
  onSelectedCollectionNameChange: (name: string) => void;
}

const Top = ({
  name,
  controlGroupState,
  onDeleteButtonClick
}: {
  name: string;
  controlGroupState: number;
  onDeleteButtonClick: () => void;
}) => (
  <Stack sx={[topSx]}>
    <Stack sx={{ flex: 1, minWidth: 0, justifyContent: "center", px: 2 }}>
      <Typography variant="body1">{name}</Typography>
    </Stack>
    {name && (
      <Stack sx={{ flexDirection: "row", gap: "1px" }}>
        <WButton isActivated={controlGroupState === 3} onClick={onDeleteButtonClick} sx={iconButtonSx}>
          <CloseIcon sx={{ fontSize: 24 }} />
        </WButton>
      </Stack>
    )}
  </Stack>
);

const Bottom = ({ filterLevels }: { filterLevels: FilterLevel[] }) => {
  if (filterLevels.length === 0) {
    return <></>;
  }
  return (
    <Stack sx={[bottomSx]}>
      <StyledContainer sx={{ flex: 1, flexDirection: "row", p: 1, gap: 1 }}>
        {filterLevels.map(({ collectionNames, selectedCollectionName, onSelectedCollectionNameChange }, index) => (
          <Stack key={index} sx={{ flex: 1 }}>
            <SelectInput
              items={[
                { label: "All", value: "" },
                ...collectionNames.map((name) => ({ label: name, value: name }))
              ]}
              value={selectedCollectionName}
              onChange={onSelectedCollectionNameChange}
            />
          </Stack>
        ))}
      </StyledContainer>
    </Stack>
  );
};

export const RightHeader = ({
  name,
  controlGroupState,
  onDeleteButtonClick,
  filterLevels
}: {
  name: string;
  controlGroupState: number;
  onDeleteButtonClick: () => void;
  filterLevels: FilterLevel[];
}) => (
  <LayoutHeader
    top={<Top name={name} controlGroupState={controlGroupState} onDeleteButtonClick={onDeleteButtonClick} />}
    bottom={<Bottom filterLevels={filterLevels} />}
  />
);
