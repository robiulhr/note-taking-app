import SwipeableViews from "react-swipeable-views";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`full-width-tabpanel-${index}`} aria-labelledby={`full-width-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
export default function AllArticlePanels({ value, handleChangeIndex }) {
  const theme = useTheme();
  return (
    <SwipeableViews axis={theme.direction === "rtl" ? "x-reverse" : "x"} index={value} onChangeIndex={handleChangeIndex}>
      <TabPanel value={value} index={0} dir={theme.direction}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        Item Three
      </TabPanel>
    </SwipeableViews>
  );
}
