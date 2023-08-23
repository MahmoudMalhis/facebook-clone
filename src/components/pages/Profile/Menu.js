import { MenuItem, Typography, Menu } from "@mui/material";
import { useState, useContext } from "react";
import { AddFriend } from "./StyleProfile";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import StarIcon from "@mui/icons-material/Star";
import { PostsContext } from "../../../context/PostsContext";
import { FriendDataContext } from "../../../context/FriendDataContext";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase";
import { AuthContext } from "../../../context/AuthContext";

const MenuProfile = () => {
  const [anchorComment, setAnchorComment] = useState(null);
  const { friends } = useContext(PostsContext);
  const userData = useContext(AuthContext);
  const { friendData } = useContext(FriendDataContext);

  const handlePostMenu = (event) => {
    setAnchorComment(event.currentTarget);
  };

  const handleCloseCommentMenu = () => {
    setAnchorComment(null);
  };

  const handleFavorite = async () => {
    friends.forEach(async (friend) => {
      if (friend.senderId === friendData.email) {
        await updateDoc(
          doc(firestore, "users", userData.email, "friend", friend.id),
          {
            isFavorite: !friend.isFavorite,
          }
        );
      }
    });
    handleCloseCommentMenu();
  };

  return (
    <>
      <AddFriend onClick={handlePostMenu}>
        <HowToRegIcon />
        <Typography marginLeft="5px">Friends</Typography>
      </AddFriend>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorComment}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorComment)}
        onClose={handleCloseCommentMenu}
      >
        <MenuItem onClick={handleFavorite}>
          <StarIcon />
          <Typography marginLeft="10px">Favorite</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default MenuProfile;
