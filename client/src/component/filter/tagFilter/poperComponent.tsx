import { MouseEventHandler, ReactElement, ReactNode, RefObject } from "react";
import { useTheme } from "@mui/material/styles";
import { autocompleteClasses } from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import { ListItem } from "@mui/material";

type PopperComponentpropTypes = {
  children: ReactNode;
  anchorEl: RefObject<ReactElement>;
};

export default function PopperComponent(props: PopperComponentpropTypes) {
  const { children, anchorEl, ...other } = props;
  const searchValue = anchorEl?.querySelector("input").value || "";
  const theme = useTheme();
  const createTagHandler: MouseEventHandler<HTMLLIElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("clicked.");
  };
  return (
    <Box
      onClick={(e) => {
        console.log("box clicked.");
        e.stopPropagation();
      }}
      sx={{
        [`& .${autocompleteClasses.paper}`]: {
          boxShadow: "none",
          margin: 0,
          color: "inherit",
          fontSize: 13,
        },
        [`& .${autocompleteClasses.listbox}`]: {
          backgroundColor: theme.palette.mode === "light" ? "#fff" : "#1c2128",
          padding: 0,
          [`& .${autocompleteClasses.option}`]: {
            minHeight: "auto",
            alignItems: "flex-start",
            padding: 1,
            borderBottom: `1px solid  ${theme.palette.mode === "light" ? " #eaecef" : "#30363d"}`,
            '&[aria-selected="true"]': {
              backgroundColor: "transparent",
            },
            [`&.${autocompleteClasses.focused}, &.${autocompleteClasses.focused}[aria-selected="true"]`]: {
              backgroundColor: theme.palette.action.hover,
            },
          },
        },
        [`&.${autocompleteClasses.popperDisablePortal}`]: {
          position: "relative",
        },
      }}
      {...other}
    >
      {children}
      <Box>
        <ListItem onClick={createTagHandler}>+ Create Tag: {`"${searchValue}"`}</ListItem>
      </Box>
    </Box>
  );
}
