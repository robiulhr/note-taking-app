import Popper from "@mui/material/Popper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import AutoCompleteComponent from "./autoComplete";
import { useTheme } from "@mui/material/styles";
import { Dispatch, RefObject, SetStateAction } from "react";
import { tagType } from "../../../types/types";

type PopUpComponentPropsType = {
  open: boolean;
  anchorEl: RefObject<HTMLElement>;
  handleClose: () => void;
  value: tagType[];
  pendingValue: tagType[];
  setPendingValue: Dispatch<SetStateAction<{ name: string; color: string; description: string }[]>>;
};

export default function PopUpComponent({ open, anchorEl, handleClose, value, pendingValue, setPendingValue }: PopUpComponentPropsType) {
  const theme = useTheme();
  const id = open ? "github-label" : undefined;
  return (
    <Box component={Popper} sx={{ width: 300, zIndex: 30, bgcolor: "white", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", borderRadius: "3px", border: "1px solid #44443330" }} id={id} open={open} anchorEl={anchorEl.current} placement="bottom-start">
      <ClickAwayListener onClickAway={handleClose}>
        <div className="bg-red">
          <Box
            sx={{
              borderBottom: `1px solid ${theme.palette.mode === "light" ? "#eaecef" : "#30363d"}`,
              padding: "8px 10px",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography>Tags</Typography>
            <Button sx={{ minWidth: "15px", minHeight: "15px" }}>x</Button>
          </Box>
          <AutoCompleteComponent value={value} pendingValue={pendingValue} setPendingValue={setPendingValue} handleClose={handleClose} />
        </div>
      </ClickAwayListener>
    </Box>
  );
}
