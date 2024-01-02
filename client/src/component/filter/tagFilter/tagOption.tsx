import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import Box from "@mui/material/Box";
import { tagType } from "../../../types/types";
import MuiIcon from "../../iconComponent/muiIcon";
export default function TagOption(props: object, option: tagType, { selected }: { selected: boolean }) {
  const theme = useTheme();
  return (
    <>
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
            width: 20,
            height: 20,
            flexShrink: 0,
            borderRadius: "3px",
            mr: 1,
            mt: "2px",
          }}
          // style={{ backgroundColor: option.color }}
        >
          <MuiIcon icon={option.icon} sx={{ color: option.color }} />
        </Box>
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
          <span style={{ display: "inline-block", width: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} className="truncate">
            {option.description}
          </span>
        </Box>
        <Box
          component={CloseIcon}
          sx={{ opacity: 0.6, width: 18, height: 18 }}
          style={{
            visibility: selected ? "visible" : "hidden",
          }}
        />
      </li>
    </>
  );
}
