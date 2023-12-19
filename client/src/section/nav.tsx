import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters className="flex items-center justify-between">
          <Box
            className="flex items-center justify-center cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            <EventNoteIcon sx={{ display: { md: "flex" }, mr: 1 }} />
            <Typography variant="h6" className="mr-4 flex font-mono font-bold tracking-[.3rem] text-inherit no-underline">
              Notes
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
