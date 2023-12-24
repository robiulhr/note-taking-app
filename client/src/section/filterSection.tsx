import { Box, Paper } from "@mui/material";
import TagFilter from "../component/tagFilter";
import SearchForm from "../component/search";
import { forwardRef, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function FilterSection() {
  const date = useRef(new Date());
  const [startDate, setStartDate] = useState(date.current);
  const [endDate, setEndDate] = useState(new Date(date.current.getFullYear(), date.current.getMonth() + 1, 0));
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className="example-custom-input w-[250px] bg-white border-0 h-[55px]" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));
  return (
    <Box className="flex items-center justify-between my-7">
      <Paper elevation={1} className="h-[55px]">
        <SearchForm className="flex items-center justify-between h-[100%] w-[170px] sm:w-[200px] md:w-[250px] lg:w-[370px]" />
      </Paper>
      <Paper elevation={1} className="w-[250px]">
        <DatePicker
          showIcon
          closeOnScroll={(e) => e.target === document}
          isClearable
          placeholderText="Select date or date range"
          showMonthDropdown
          showYearDropdown
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          dateFormat="dd/MM/yyyy"
          popperPlacement="top-end"
          customInput={<ExampleCustomInput />}
        />
      </Paper>
      <Paper elevation={1}>
        <TagFilter className="w-[170px] sm:w-[200px] md:w-[250px] lg:w-[370px]" />
      </Paper>
    </Box>
  );
}
