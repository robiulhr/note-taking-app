import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AllArticlePanels from "./allArticlePanels";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import PeopleIcon from "@mui/icons-material/People";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import FilterListIcon from "@mui/icons-material/FilterList";
function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function AllArticleTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
      <Box className="flex items-center justify-between">
        <Tabs value={value} variant="scrollable" scrollButtons="auto" onChange={handleChange} indicatorColor="secondary" textColor="inherit" aria-label="full width tabs example">
          <Tab iconPosition="start" icon={<AutoFixHighIcon />} label="Personalized" {...a11yProps(0)} />
          <Tab iconPosition="start" icon={<PeopleIcon />} label="Following" {...a11yProps(1)} />
          <Tab iconPosition="start" icon={<MilitaryTechIcon />} label="Featured" {...a11yProps(2)} />
          <Tab iconPosition="start" icon={<TrendingUpIcon />} label="Trending" {...a11yProps(2)} />
          <Tab iconPosition="start" icon={<FiberNewIcon />} label="Latest" {...a11yProps(2)} />
          <Tab iconPosition="start" icon={<LocalFireDepartmentIcon />} label="All Time Best" {...a11yProps(2)} />
        </Tabs>
        <Box>
          <Tabs>
            <Tab icon={<FilterListIcon />} iconPosition="start" label="Filter" className="w-[150px]"></Tab>
          </Tabs>
        </Box>
      </Box>

      <AllArticlePanels value={value} handleChangeIndex={handleChangeIndex} />
    </Box>
  );
}
