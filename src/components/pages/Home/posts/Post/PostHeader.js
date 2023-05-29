import { useContext, useState } from "react";
import {
  Avatar,
  Box,
  Typography,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { CustomLinearScaleIcon, CustomLink } from "../PostStyle";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import DeleteIcon from "@mui/icons-material/Delete";
import { AuthContext } from "../../../../../context/AuthContext";
import { ProfilePicContext } from "../../../../../context/ProfilePicContext";
import { deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../../../../firebase";
import { Link } from "react-router-dom";
import { FriendDataContext } from "../../../../../context/FriendDataContext";
import { FriendPicContext } from "../../../../../context/FriendPicContext";

const PostHeader = ({ post }) => {
  const [anchorPost, setAnchorPost] = useState(null);
  const userDataContext = useContext(AuthContext);
  const friendData = useContext(FriendDataContext);
  const userData = friendData ?? userDataContext;
  const friendImage = useContext(FriendPicContext);
  const profileImageContext = useContext(ProfilePicContext);
  const profileImage = friendImage ?? profileImageContext;

  const handlePostMenu = (event) => {
    setAnchorPost(event.currentTarget);
  };

  const handleClosePostMenu = () => {
    setAnchorPost(null);
  };

  const handleDelete = async (postId) => {
    try {
      const postRef = doc(firestore, "posts", postId);
      await deleteDoc(postRef);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Box display="flex" alignItems="center">
        <Link to="/profile">
          <Avatar alt={userData.fullName} src={profileImage.profilePicUrl} />
        </Link>
        <Box marginLeft="10px">
          <CustomLink to="/profile">
            <Typography fontWeight="700">{userData.fullName}</Typography>
          </CustomLink>
          <Typography fontSize="12px" color="#999">
            {post.createdAt}
          </Typography>
        </Box>
      </Box>
      <Tooltip>
        <IconButton onClick={handlePostMenu}>
          <CustomLinearScaleIcon />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorPost}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorPost)}
        onClose={handleClosePostMenu}
      >
        <MenuItem onClick={handleClosePostMenu}>
          <BookmarkIcon />
          <Typography textAlign="center">Saved</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleDelete(post.id)}>
          <DeleteIcon />
          <Typography textAlign="center">Delete</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default PostHeader;
