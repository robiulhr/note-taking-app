import { Box, Button, Divider } from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import DnsIcon from "@mui/icons-material/Dns";
export default function ViewTypeFilter() {
  return (
    <Box className="flex items-start my-1">
      <Button>
        <GridViewIcon />
      </Button>
      <Button>
        <DnsIcon />
      </Button>
      <Divider />
    </Box>
  );
}
