import { Box, Paper } from "@mui/material";
import TagFilter from "../component/tagFilter";
import SearchForm from "../component/search";
export default function FilterSection() {
  return (
    <Box className="flex items-center justify-between my-7">
      <Paper elevation={1}>
        <SearchForm />
      </Paper>
      <Paper elevation={1}>
        <TagFilter className="w-[370px]" />
      </Paper>
    </Box>
  );
}
