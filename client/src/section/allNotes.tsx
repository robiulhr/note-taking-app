import { Box, Button, Typography } from "@mui/material";
import NoDataFound from "../component/noDataFound";
import { useNavigate } from "react-router-dom";

export default function AllNotes() {
  const navigate = useNavigate();
  return (
    <Box className="bg-white">
      <Box className="flex items-center justify-between p-7">
        <Typography className="text-bolt text-2xl">All Notes</Typography>
        <Button variant="contained" onClick={() => navigate("/create")}>
          Add New
        </Button>
      </Box>
      <Box className="min-h-[500px]">
        <NoDataFound />
      </Box>
    </Box>
  );
}
