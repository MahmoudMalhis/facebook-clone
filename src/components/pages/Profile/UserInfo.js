import { Fragment, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { List, ListItem, ListItemText } from "@mui/material";
import { CustomListItemTextUserInfo, CustomListUserInfo } from "./StyleProfile";

const UserInfo = () => {
  const userData = useContext(AuthContext);

  const Info = [
    {
      id: 1,
      label: "Gender:",
      value: userData.gender,
    },
    {
      id: 2,
      label: "Barth day:",
      value: `${userData.selectedYear} - ${userData.selectedMonth}- ${userData.selectedDay}`,
    },
    {
      id: 3,
      label: "Email:",
      value: userData.email,
    },
    {
      id: 4,
      label: "Age:",
      value: new Date().getFullYear() - userData.selectedYear,
    },
  ];

  return (
    <CustomListUserInfo>
      {Info.map(({ id, label, value }) => {
        return (
          <ListItem key={id}>
            <CustomListItemTextUserInfo primary={label} secondary={value} />
          </ListItem>
        );
      })}
    </CustomListUserInfo>
  );
};

export default UserInfo;
