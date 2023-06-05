import { Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import { icons } from "./Icon";
import { StyledIconButton, StyledIcon } from "./styled";

const NavIcon = () => {
  return (
    <Box
      justifyContent="center"
      sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
    >
      {icons.map(({ icon: Icon, to, id }) => (
        <StyledIconButton key={id}>
          <NavLink to={to}>
            <StyledIcon>
              <Icon />
            </StyledIcon>
          </NavLink>
        </StyledIconButton>
      ))}
    </Box>
  );
};

export default NavIcon;
