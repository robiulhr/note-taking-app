import { MouseEventHandler, ReactNode, RefObject, useContext, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { autocompleteClasses } from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TagFormModal from "../../modal/tagFormModal";
import { TagSearchContext } from "../../../context/tagSearchProvider";
type PopperComponentpropTypes = {
  children: ReactNode;
  anchorEl: RefObject<HTMLDivElement>;
};

export default function PopperComponent(props: PopperComponentpropTypes) {
  const { children, anchorEl, ...other } = props;
  const theme = useTheme();
  const [showTagForm, setShowTagForm] = useState(false);
  const { searchValue } = useContext(TagSearchContext);
  const tagFormCloseHandler = () => {
    setShowTagForm(false);
  };
  const tagFormOpenHandler = () => {
    setShowTagForm(true);
  };
  const createTagHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    tagFormOpenHandler();
  };
  return (
    <>
      <Box
        onClick={(e) => {
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
        <Box sx={{ cursor: "pointer" }}>
          <Button disabled={!searchValue} sx={{ width: "100%", justifyContent: "start" }} onClick={createTagHandler}>
            <AddIcon /> <Typography sx={{ fontSize: "14px", marginLeft: "10px", textTransform: "none" }}>Create Tag: {searchValue && `"${searchValue}"`}</Typography>
          </Button>
        </Box>
      </Box>
      <TagFormModal actionType="create" showTagForm={showTagForm} tagFormCloseHandler={tagFormCloseHandler} btnText="Create Tag" />
    </>
  );
}
