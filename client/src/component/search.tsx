import { alpha, styled } from "@mui/material/styles";
import { InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "30ch",
      paddingTop: "15px",
      paddingBottom: "15px",
    },
  },
}));
export default function SearchForm() {
  return (
    <>
      <Search className="relative ml-0 w-[100%]">
        <SearchIconWrapper className="h-[100%] absolute pointer-events-none flex items-center justify-center">
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase className="text-inherit w-[100%]" placeholder="Search…" inputProps={{ "aria-label": "search" }} />
      </Search>
    </>
  );
}
