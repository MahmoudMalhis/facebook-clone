import { Avatar } from "@mui/material";
import { topIcons, bottomIcons } from "./icon";
import { StyledIconButton, CustomLabelIcon, CustomLeftSide } from "./styled";
import { useState, useContext } from "react";
import { database } from "../../../firebase";
import auth from "../../../firebase";
import { ref, get } from "firebase/database";
import { AuthContext } from "../../../../context/AuthContext";
import { Link } from "react-router-dom";

const LeftSide = () => {
  const [seeMore, setSeMore] = useState(true);
  const userFullName = useContext(AuthContext);

  const handelSeeMore = () => {
    setSeMore(!seeMore);
  };

  return (
    <CustomLeftSide>
      <StyledIconButton>
        <Avatar
          alt={userFullName}
          src="/static/images/avatar/2.jpg"
          width="40px"
        />
        <CustomLabelIcon>{userFullName}</CustomLabelIcon>
      </StyledIconButton>
      {topIcons.map(({ icon: Icon, to, id, label }) =>
        label === "See more" ? (
          seeMore && (
            <StyledIconButton key={id} onClick={handelSeeMore}>
              <Icon />
              <CustomLabelIcon variant="span">{label}</CustomLabelIcon>
            </StyledIconButton>
          )
        ) : (
          <Link to={to}>
            <StyledIconButton key={id}>
              <Icon />
              <CustomLabelIcon variant="span">{label}</CustomLabelIcon>
            </StyledIconButton>
          </Link>
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
            <Link to={to}>
              <StyledIconButton key={id}>
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
