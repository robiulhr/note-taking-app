import { Box, Paper } from "@mui/material";
import TagFilter from "../component/tagFilter";
import SearchForm from "../component/search";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function FilterSection() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  return (
    <Box className="flex items-center justify-between my-7">
      <Paper elevation={1} className="h-[55px]">
        <SearchForm className="flex items-center justify-between h-[100%] w-[170px] sm:w-[200px] md:w-[250px] lg:w-[370px]" />
      </Paper>
      <Paper elevation={1}>
        <DatePicker showIcon closeOnScroll={(e) => e.target === document} isClearable placeholderText="Select date or date range" showMonthDropdown showYearDropdown selected={startDate} onChange={onChange} startDate={startDate} endDate={endDate} selectsRange />
      </Paper>
      <Paper elevation={1}>
        <TagFilter className="w-[170px] sm:w-[200px] md:w-[250px] lg:w-[370px]" />
      </Paper>
    </Box>
  );
}
