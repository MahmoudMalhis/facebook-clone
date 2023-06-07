import { useState, useEffect, useContext } from "react";
import {
  Badge,
  Box,
  IconButton,
  Typography,
  Menu,
  Avatar,
  Tooltip,
  MenuItem,
} from "@mui/material";
import { CustomLink } from "./styled";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase";
import { AuthContext } from "../../../context/AuthContext";
import NotificationsIcon from "@mui/icons-material/Notifications";

const NotificationMenu = () => {
  const [anchorNotification, setAnchorNotification] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const userData = useContext(AuthContext);

  const handleCloseNotification = () => {
    setAnchorNotification(null);
  };

  const handleOpenNotification = (event) => {
    setAnchorNotification(event.currentTarget);
  };

  const handleMenuItemClick = async (notification) => {
    const notificationRef = doc(
      firestore,
      "users",
      userData.email,
      "notifications",
      notification.id
    );
    await updateDoc(notificationRef, {
      isClicked: true,
    });

    handleCloseNotification();
  };

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

  return (
    <>
      <Tooltip title="Open notification">
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          onClick={handleOpenNotification}
        >
          <Badge
            badgeContent={
              notifications.filter((notifications) => !notifications.isClicked)
                .length
            }
            color="error"
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Tooltip>
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
              onClick={() => handleMenuItemClick(notification)}
              key={notification.id}
              sx={{
                backgroundColor: notification.isClicked ? "inherit" : "#f2f2f2",
                marginBottom: "5px",
              }}
            >
              <CustomLink to={`profile/${notification.senderId}`}>
                <Avatar
                  src={notification.senderAvatar}
                  alt={notification.senderName}
                />
                <Box marginLeft="10px">
                  <Typography>
                    Send
                    <strong>{` ${notification.senderName} `}</strong>
                    added
                  </Typography>
                  <Typography fontSize="10px" color="#888" marginBottom="5px">
                    {notification.time}
                  </Typography>
                </Box>
              </CustomLink>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default NotificationMenu;
