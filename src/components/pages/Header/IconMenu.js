import { useState } from "react";
import { Box, IconButton, Typography, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { StyledIcon, StyledIconButton } from "./styled";
import { NavLink } from "react-router-dom";
import SearchBar from "./Search";
import { iconsMenu } from "./Icon";

const IconMenu = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
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
        {iconsMenu.map(({ icon: Icon, to, id, label }) => (
          <MenuItem key={id} onClick={handleCloseNavMenu}>
            <StyledIconButton>
              <NavLink to={to}>
                <StyledIcon>
                  <Icon />
                </StyledIcon>
                <Typography>{label}</Typography>
              </NavLink>
            </StyledIconButton>
          </MenuItem>
        ))}
        <MenuItem>
          <SearchBar />
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default IconMenu;
