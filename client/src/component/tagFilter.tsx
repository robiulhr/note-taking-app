import { ChangeEvent, MouseEvent, MouseEventHandler, ReactNode, useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Popper from "@mui/material/Popper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import Autocomplete, { autocompleteClasses } from "@mui/material/Autocomplete";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import { Button, ListItem, Typography } from "@mui/material";

function PopperComponent(props: PopperComponentpropTypes) {
  const { children, anchorEl, ...other } = props;
  const searchValue = anchorEl.querySelector("input").value as string;
  const theme = useTheme();
  return (
    <Box
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
        <ListItem>+ Create Tag: {`"${searchValue}"`}</ListItem>
      </Box>
    </Box>
  );
}

type PopperComponentpropTypes = {
  children: ReactNode;
  anchorEl: ReactNode;
};

export default function TagFilter() {
  const anchorEl = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([labels[1], labels[11]]);
  const [pendingValue, setPendingValue] = useState(value);
  const theme = useTheme();
  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    setPendingValue(value);
    setOpen(!open);
  };
  const handleClose = () => {
    setValue(pendingValue);
    setOpen(!open);
    if (anchorEl.current) {
      anchorEl.current.focus();
    }
  };
  const handleClear: MouseEventHandler<HTMLButtonElement> = (event) => {
    setValue([]);
  };
  const handleDelete = (event: MouseEvent<SVGElement>, index: number) => {
    event.stopPropagation();
    setValue(value.filter((ele, ind) => ind !== index));
  };
  const id = open ? "github-label" : undefined;

  return (
    <>
      <Box ref={anchorEl} className="h-[60px] w-[300px] text-[13px]">
        <Box className="w-[100%] rounded-sm bg-white p-1 flex items-center h-[100%] justify-between flex-row">
          <Box className="w-[250px] grid grid-cols-2 gap-1 h-[100%] overflow-scroll overflow-x-hidden">
            {value.length <= 0 ? (
              <Typography className="w-[100%] h-[50px] flex items-center p-2 text-start">Filter by Tags</Typography>
            ) : (
              value.map((option, index) => (
                <Box
                  sx={{
                    "& span": { overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" },
                    "& svg": { fontSize: "20px", cursor: "pointer", padding: "4px" },
                  }}
                  className="flex justify-between max-w-[100px] truncate items-center h-[24px] m-[2px] leading-3 bg-[#fafafa] border-1 rounded-sm box-content p-[0 4px 0 10px] outline-0 overflow-hidden"
                >
                  <span>{option.name}</span>
                  <CloseIcon
                    onClick={(e) => {
                      handleDelete(e, index);
                    }}
                  />
                </Box>
              ))
            )}
          </Box>
          <Box className={`h-[100%] w-[50px] flex flex-row items-center justify-center`}>
            <Button className="text-2xl h-[50%] min-w-[20px] min-h-[20px]" onClick={handleClick}>
              +
            </Button>
            {value.length > 0 && (
              <Button className="text-md font-semibold h-[50%] min-w-[20px] min-h-[20px]" onClick={handleClear}>
                x
              </Button>
            )}
          </Box>
        </Box>
      </Box>
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
              PopperComponent={PopperComponent}
              renderTags={() => null}
              noOptionsText="No labels"
              renderOption={(props, option, { selected }) => (
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
              )}
              options={[...labels].sort((a, b) => {
                // Display the selected labels first.
                let ai = value.indexOf(a);
                ai = ai === -1 ? value.length + labels.indexOf(a) : ai;
                let bi = value.indexOf(b);
                bi = bi === -1 ? value.length + labels.indexOf(b) : bi;
                return ai - bi;
              })}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
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
              )}
            />
          </div>
        </ClickAwayListener>
      </Box>
    </>
  );
}

// From https://github.com/abdonrd/github-labels
const labels = [
  {
    name: "good first issue",
    color: "#7057ff",
    description: "Good for newcomers",
  },
  {
    name: "help wanted",
    color: "#008672",
    description: "Extra attention is needed",
  },
  {
    name: "priority: critical",
    color: "#b60205",
    description: "",
  },
  {
    name: "priority: high",
    color: "#d93f0b",
    description: "",
  },
  {
    name: "priority: low",
    color: "#0e8a16",
    description: "",
  },
  {
    name: "priority: medium",
    color: "#fbca04",
    description: "",
  },
  {
    name: "status: can't reproduce",
    color: "#fec1c1",
    description: "",
  },
  {
    name: "status: confirmed",
    color: "#215cea",
    description: "",
  },
  {
    name: "status: duplicate",
    color: "#cfd3d7",
    description: "This issue or pull request already exists",
  },
  {
    name: "status: needs information",
    color: "#fef2c0",
    description: "",
  },
  {
    name: "status: wont do/fix",
    color: "#eeeeee",
    description: "This will not be worked on",
  },
  {
    name: "type: bug",
    color: "#d73a4a",
    description: "Something isn't working",
  },
  {
    name: "type: discussion",
    color: "#d4c5f9",
    description: "",
  },
  {
    name: "type: documentation",
    color: "#006b75",
    description: "",
  },
  {
    name: "type: enhancement",
    color: "#84b6eb",
    description: "",
  },
  {
    name: "type: epic",
    color: "#3e4b9e",
    description: "A theme of work that contain sub-tasks",
  },
  {
    name: "type: feature request",
    color: "#fbca04",
    description: "New feature or request",
  },
  {
    name: "type: question",
    color: "#d876e3",
    description: "Further information is requested",
  },
];
