import { useState, useContext } from "react";
import {
  IconButton,
  Typography,
  Menu,
  Avatar,
  Tooltip,
  MenuItem,
} from "@mui/material";
import { CustomLink } from "./styled";
import LogoutIcon from "@mui/icons-material/Logout";
import { AuthContext } from "../../../context/AuthContext";
import { ProfilePicContext } from "../../../context/ProfilePicContext";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import auth from "../../firebase";

const SettingMenu = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const userData = useContext(AuthContext);
  const profileImage = useContext(ProfilePicContext);
  const history = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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
    <>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={userData.fullName} src={profileImage.profilePicUrl} />
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
            <Avatar alt={userData.fullName} src={profileImage.profilePicUrl} />
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
    </>
  );
};

export default SettingMenu;
