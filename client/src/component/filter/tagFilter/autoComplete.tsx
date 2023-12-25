import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import Autocomplete from "@mui/material/Autocomplete";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import PopperComponent from "./poperComponent";
import { labels } from "./demoData";
import { tagType } from "../../../types/types";
type AutoCompleteComponentPropsType = {
  handleClose: () => void;
  value: tagType[];
  pendingValue: tagType[];
  setPendingValue: Dispatch<SetStateAction<{ name: string; color: string; description: string }[]>>;
};
export default function AutoCompleteComponent({ handleClose, value, pendingValue, setPendingValue }: AutoCompleteComponentPropsType) {
  const [searchValue, setSearchValue] = useState("");
  const theme = useTheme();
  return (
    <Autocomplete
      open
      multiple
      onClose={(event, reason) => {
        if (reason === "escape") {
          handleClose();
        }
      }}
      value={pendingValue}
      onChange={(event: ChangeEvent<{}>, newValue, reason) => {
        if (event.type === "keydown" && event.key === "Backspace" && reason === "removeOption") {
          return;
        }
        setPendingValue(newValue);
      }}
      disableCloseOnSelect
      PopperComponent={(props) => {
        return PopperComponent(props);
      }}
      renderTags={() => null}
      noOptionsText="No labels"
      renderOption={(props, option, { selected }) => {
        return (
          <li {...props}>
            <Box
              component={DoneIcon}
              sx={{ width: 17, height: 17, mr: "5px", ml: "-2px" }}
              style={{
                visibility: selected ? "visible" : "hidden",
              }}
            />
            <Box
              component="span"
              sx={{
                width: 14,
                height: 14,
                flexShrink: 0,
                borderRadius: "3px",
                mr: 1,
                mt: "2px",
              }}
              style={{ backgroundColor: option.color }}
            />
            <Box
              sx={{
                flexGrow: 1,
                "& span": {
                  color: theme.palette.mode === "light" ? "#586069" : "#8b949e",
                },
              }}
            >
              {option.name}
              <br />
              <span>{option.description}</span>
            </Box>
            <Box
              component={CloseIcon}
              sx={{ opacity: 0.6, width: 18, height: 18 }}
              style={{
                visibility: selected ? "visible" : "hidden",
              }}
            />
          </li>
        );
      }}
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
