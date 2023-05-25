import { Avatar } from "@mui/material";
import { topIcons, bottomIcons } from "./icon";
import { StyledIconButton, CustomLabelIcon, CustomLeftSide } from "./styled";
import { useState, useEffect } from "react";
import { database } from "../../../firebase";
import auth from "../../../firebase";
import { ref, get } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";

const LeftSide = () => {
  const [seeMore, setSeMore] = useState(true);
  const [userFullName, setUserFullName] = useState("");

  const handelSeeMore = () => {
    setSeMore(!seeMore);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email } = user;
        const usersRef = ref(database, "users");
        get(usersRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              const usersData = snapshot.val();
              const userId = Object.keys(usersData).find(
                (key) => usersData[key].email === email
              );
              if (userId) {
                const userRef = ref(database, `users/${userId}`);
                get(userRef)
                  .then((userSnapshot) => {
                    if (userSnapshot.exists()) {
                      const userData = userSnapshot.val();
                      const { fName, lName } = userData;
                      setUserFullName(`${fName} ${lName}`);
                    }
                  })
                  .catch((error) => {});
              }
            }
          })
          .catch((error) => {});
      }
    });
  }, []);

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
