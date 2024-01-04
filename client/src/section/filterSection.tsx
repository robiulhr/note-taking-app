import { Box, Paper, Tab, Tabs } from "@mui/material";
import TagFilter from "../component/filter/tagFilter";
import SearchForm from "../component/search";
import { forwardRef, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import FilterListIcon from "@mui/icons-material/FilterList";

export default function FilterSection() {
  const date = useRef(new Date());
  const [startDate, setStartDate] = useState(date.current);
  const [endDate, setEndDate] = useState(new Date(date.current.getFullYear(), date.current.getMonth() + 1, 0));
  const [filterOpen, setFilterOpen] = useState(false);
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
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Tabs>
        <Tab onClick={handleClickOpen} icon={<FilterListIcon />} iconPosition="start" label="Filter" className="w-[150px]"></Tab>
      </Tabs>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</DialogContentText>
          <Box className="flex items-center justify-between my-7">
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
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Disagree
          </Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
