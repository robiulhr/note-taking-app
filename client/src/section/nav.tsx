import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import ProfileMenu from "../component/menu/profileMenu";
import NotificationMenu from "../component/menu/notificationMenu";
import DarkLightMode from "../component/switch/darkLightMode";
import SearchComponent from "./search";
import CreateIcon from "@mui/icons-material/Create";
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
          {/* <IconButton aria-label="delete" size="large">

            <SettingsIcon className="text-white" fontSize="inherit" />
          </IconButton> */}
          <Box className="flex items-center">
            <SearchComponent />
            <Button
              variant="outlined"
              className="rounded-md border-[white] mx-[10px] text-white"
              startIcon={<CreateIcon />}
              onClick={() => {
                navigate("/create");
              }}
            >
              write
            </Button>
            <DarkLightMode />
            <NotificationMenu />
            <ProfileMenu />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
