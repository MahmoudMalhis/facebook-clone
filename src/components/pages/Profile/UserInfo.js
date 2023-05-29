import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { ListItem } from "@mui/material";
import { CustomListItemTextUserInfo, CustomListUserInfo } from "./StyleProfile";
import { FriendDataContext } from "../../../context/FriendDataContext";

const UserInfo = () => {
  const userDataContext = useContext(AuthContext);
  const { friendData } = useContext(FriendDataContext);
  const userData = friendData ?? userDataContext;

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
