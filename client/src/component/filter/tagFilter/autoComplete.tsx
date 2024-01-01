import { ChangeEvent, Dispatch, SetStateAction, useContext } from "react";
import { useTheme } from "@mui/material/styles";
import Autocomplete from "@mui/material/Autocomplete";
import InputBase from "@mui/material/InputBase";
import PopperComponent from "./poperComponent";
import { labels } from "./demoData";
import { tagType } from "../../../types/types";
import TagOption from "./tagOption";
import { TagSearchContext } from "../../../context/tagSearchProvider";
import { Box, CircularProgress } from "@mui/material";
type AutoCompleteComponentPropsType = {
  handleClose: () => void;
  value: tagType[];
  pendingValue: tagType[];
  setPendingValue: Dispatch<SetStateAction<{ name: string; color: string; description: string }[]>>;
};
export default function AutoCompleteComponent({ handleClose, value, pendingValue, setPendingValue }: AutoCompleteComponentPropsType) {
  const theme = useTheme();
  const { searchValue, setSearchValue } = useContext(TagSearchContext);
  return (
    <Autocomplete
      open
      multiple
      onClose={(event, reason) => {
        if (reason === "escape") {
          handleClose();
        }
      }}
      loading
      loadingText={
        <Box sx={{ width: "100%", minHeight: "200px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <CircularProgress color="inherit" />
        </Box>
      }
      value={pendingValue}
      onChange={(event: ChangeEvent<{}>, newValue, reason) => {
        if (event.type === "keydown" && event.key === "Backspace" && reason === "removeOption") {
          return;
        }
        setPendingValue(newValue);
      }}
      freeSolo // this is used to make the create button workable without loosing the searchValue
      disableCloseOnSelect
      PopperComponent={PopperComponent}
      // renderTags={() => null}
      noOptionsText="No labels"
      renderOption={TagOption}
      options={[...labels].sort((a, b) => {
        // Display the selected labels first.
        let ai = value.indexOf(a);
        ai = ai === -1 ? value.length + labels.indexOf(a) : ai;
        let bi = value.indexOf(b);
        bi = bi === -1 ? value.length + labels.indexOf(b) : bi;
        return ai - bi;
      })}
      getOptionLabel={(option) => option.name}
      inputValue={searchValue}
      onInputChange={(event, value, reason) => {
        setSearchValue(value);
      }}
      renderInput={(params) => {
        return (
          <InputBase
            sx={{
              padding: "10px",
              width: "100%",
              "& input": {
                borderRadius: 4,
                backgroundColor: theme.palette.mode === "light" ? "#fff" : "#0d1117",
                padding: 1,
                width: "100%",
                transition: theme.transitions.create(["border-color", "box-shadow"]),
                border: `1px solid ${theme.palette.mode === "light" ? "#eaecef" : "#30363d"}`,
                fontSize: 14,
              },
            }}
            ref={params.InputProps.ref}
            inputProps={params.inputProps}
            autoFocus
            placeholder="Filter tags"
          />
        );
      }}
    />
  );
}
