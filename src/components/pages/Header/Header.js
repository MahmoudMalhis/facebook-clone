import {
  Badge,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Container,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import { Link } from "react-router-dom";
import { CustomFacebookIcon } from "./styled";
import SearchBar from "./Search";
import NotificationMenu from "./NotificationMenu";
import IconMenu from "./IconMenu";
import SettingMenu from "./SettingMenu";
import NavIcon from "./NavIcon";

function ResponsiveAppBar() {
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#fff" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box display="flex">
              <Link to="/home">
                <CustomFacebookIcon />
              </Link>
              <Box sx={{ display: { sm: "none", md: "flex" } }}>
                <SearchBar />
              </Box>
            </Box>
            <IconMenu />
            <NavIcon />
            <Box display="flex" sx={{ flexGrow: 0 }}>
              <Box>
                <IconButton size="large" aria-label="show 4 new mails">
                  <Badge badgeContent={4} color="error">
                    <MailIcon />
                  </Badge>
                </IconButton>
                <NotificationMenu />
              </Box>
              <SettingMenu />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default ResponsiveAppBar;
