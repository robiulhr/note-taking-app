import { Box, Paper } from "@mui/material";
import TagFilter from "../component/tagFilter";
import SearchForm from "../component/search";
export default function FilterSection() {
  return (
    <Box className="flex items-center justify-between my-7">
      <Paper elevation={1} className="h-[55px]">
        <SearchForm className="flex items-center justify-between h-[100%] w-[170px] sm:w-[200px] md:w-[250px] lg:w-[370px]" />
      </Paper>
      <Paper elevation={1}>
        <TagFilter className="w-[170px] sm:w-[200px] md:w-[250px] lg:w-[370px]" />
      </Paper>
    </Box>
  );
}
