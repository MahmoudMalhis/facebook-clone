import { useState, useContext, useEffect } from "react";
import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "firebase/auth";
import { Link, NavLink } from "react-router-dom";
import { icons } from "./Icon";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
  StyledIconButton,
  CustomFacebookIcon,
  StyledIcon,
  CustomLink,
} from "./styled";
import auth, { firestore } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { ProfilePicContext } from "../../../context/ProfilePicContext";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorNotification, setAnchorNotification] = useState(null);
  const [isSearchVisible, setIsSearchVisible] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const userData = useContext(AuthContext);
  const profileImage = useContext(ProfilePicContext);
  const history = useNavigate();

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const unsubscribe = onSnapshot(
          collection(firestore, "users", userData.email, "notifications"),
          (snapshot) => {
            const notificationData = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setNotifications(notificationData);
          }
        );

        return () => unsubscribe();
      } catch (error) {}
    };

    fetchNotification();
  }, [userData.email]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleOpenNotification = (event) => {
    setAnchorNotification(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleCloseNotification = () => {
    setAnchorNotification(null);
  };

  const handleSearchVisible = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      history("/");
    } catch (error) {}
  };

  const handleLogoutAndClose = () => {
    handleLogOut();
    handleCloseUserMenu();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#fff" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box display="flex">
            <Link to="/home">
              <CustomFacebookIcon />
            </Link>
            <Search onClick={handleSearchVisible}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              {isSearchVisible && (
                <StyledInputBase
                  placeholder="Search Facebook"
                  inputProps={{ "aria-label": "search" }}
                />
              )}
            </Search>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="#000"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {icons.map(({ icon: Icon, to, id }) => (
                <MenuItem key={id} onClick={handleCloseNavMenu}>
                  <StyledIconButton>
                    <NavLink to={to} exact>
                      <StyledIcon>
                        <Icon />
                      </StyledIcon>
                    </NavLink>
                  </StyledIconButton>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            justifyContent="center"
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
          >
            {icons.map(({ icon: Icon, to, id }) => (
              <StyledIconButton key={id}>
                <NavLink to={to} exact>
                  <StyledIcon>
                    <Icon />
                  </StyledIcon>
                </NavLink>
              </StyledIconButton>
            ))}
          </Box>

          <Box display="flex" sx={{ flexGrow: 0 }}>
            <Box>
              <IconButton size="large" aria-label="show 4 new mails">
                <Badge badgeContent={4} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
              <Tooltip title="Open notification">
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  onClick={handleOpenNotification}
                >
                  <Badge badgeContent={notifications.length} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            </Box>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={userData.fullName}
                  src={profileImage.profilePicUrl}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <CustomLink to="/profile">
                <MenuItem onClick={handleCloseUserMenu}>
                  <Avatar
                    alt={userData.fullName}
                    src={profileImage.profilePicUrl}
                  />
                  <Typography textAlign="center" marginLeft="10px">
                    {userData.fullName}
                  </Typography>
                </MenuItem>
              </CustomLink>
              <MenuItem onClick={handleLogoutAndClose}>
                <LogoutIcon />
                <Typography textAlign="center" marginLeft="10px">
                  Logout
                </Typography>
              </MenuItem>
            </Menu>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorNotification}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorNotification)}
              onClose={handleCloseNotification}
            >
              {notifications.map((notification) => {
                return (
                  <MenuItem
                    onClick={handleCloseNotification}
                    key={notification.id}
                  >
                    <CustomLink to={`profile/${notification.senderId}`}>
                      <Typography>
                        {`Send ${notification.senderName} added`}
                      </Typography>
                    </CustomLink>
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
