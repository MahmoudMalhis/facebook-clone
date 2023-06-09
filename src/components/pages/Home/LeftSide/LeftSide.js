import { Avatar } from "@mui/material";
import { topIcons, bottomIcons } from "./icon";
import { StyledIconButton, CustomLabelIcon, CustomLeftSide } from "./styled";
import { useState, useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { ProfilePicContext } from "../../../../context/ProfilePicContext";
import { Link, NavLink } from "react-router-dom";

const LeftSide = () => {
  const [seeMore, setSeMore] = useState(true);
  const userData = useContext(AuthContext);
  const profileImage = useContext(ProfilePicContext);

  const handelSeeMore = () => {
    setSeMore(!seeMore);
  };

  return (
    <CustomLeftSide>
      <Link to="/profile">
        <StyledIconButton>
          <Avatar
            alt={userData.fullName}
            src={profileImage.profilePicUrl}
            width="40px"
          />
          <CustomLabelIcon>{userData.fullName}</CustomLabelIcon>
        </StyledIconButton>
      </Link>
      {topIcons.map(({ icon: Icon, to, id, label }) =>
        label === "See more" ? (
          seeMore && (
            <StyledIconButton key={id} onClick={handelSeeMore}>
              <Icon />
              <CustomLabelIcon variant="span">{label}</CustomLabelIcon>
            </StyledIconButton>
          )
        ) : (
          <NavLink to={to} key={id}>
            <StyledIconButton>
              <Icon />
              <CustomLabelIcon variant="span">{label}</CustomLabelIcon>
            </StyledIconButton>
          </NavLink>
        )
      )}
      {bottomIcons.map(
        ({ icon: Icon, to, id, label }) =>
          !seeMore &&
          (label === "See less" ? (
            <StyledIconButton key={id} onClick={handelSeeMore}>
              <Icon />
              <CustomLabelIcon variant="span">{label}</CustomLabelIcon>
            </StyledIconButton>
          ) : (
            <Link to={to} key={id}>
              <StyledIconButton>
                <Icon />
                <CustomLabelIcon variant="span">{label}</CustomLabelIcon>
              </StyledIconButton>
            </Link>
          ))
      )}
    </CustomLeftSide>
  );
};

export default LeftSide;
