import { Box } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useState } from "react";
import IconDialog from "../dialog/iconDialog";
import MuiIcon from "../iconComponent/muiIcon";

export default function IconPicker({ selectedIcon, setSelectedIcon }) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (value) => {
    setOpen(false);
    setSelectedIcon(value);
  };
  return (
    <>
      <Box
        sx={(theme) => {
          return { padding: "16px 10px", width: "100%", cursor: "pointer", borderRadius: "10px", border: `1px solid ${"rgba(0, 0, 0, 0.23)"}`, position: "relative" };
        }}
        onClick={handleClickOpen}
      >
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ width: "30px", height: "30px", border: `${!selectedIcon ? "1px solid rgba(0, 0, 0, 0.23)" : "0px"}`, borderRadius: "30px" }}>
            <MuiIcon icon={selectedIcon} sx={{ fontSize: "25px", padding: "2px" }} />
          </Box>
          {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </Box>
      </Box>
      <IconDialog selectedIcon={selectedIcon} open={open} onClose={handleClose} />
    </>
  );
}
