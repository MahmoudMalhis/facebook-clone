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
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../../../../firebase";
import { Link } from "react-router-dom";

const PostHeader = ({ post }) => {
  const [anchorPost, setAnchorPost] = useState(null);
  const userData = useContext(AuthContext);

  const handlePostMenu = (event) => {
    setAnchorPost(event.currentTarget);
  };

  const handleClosePostMenu = () => {
    setAnchorPost(null);
  };

  const handleSavePost = async () => {
    await addDoc(collection(firestore, "users", userData.email, "save"), {
      post: post,
    });
    handleClosePostMenu();
  };

  const handleDelete = async (postId) => {
    try {
      await deleteDoc(doc(firestore, "users", userData.email, "posts", postId));
    } catch (error) {}
  };

  let profileEmail =
    "/profile" + (userData.email === post.email ? "" : `/${post.email}`);

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Box display="flex" alignItems="center">
        <Link to={`${profileEmail}`}>
          <Avatar alt={post.name} src={post.imageUrlProfile} />
        </Link>
        <Box marginLeft="10px">
          <CustomLink to={profileEmail}>
            <Typography fontWeight="700">{post.name}</Typography>
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
        <MenuItem onClick={handleSavePost}>
          <BookmarkIcon />
          <Typography textAlign="center">Saved</Typography>
        </MenuItem>
        {userData.email === post.email && (
          <MenuItem onClick={() => handleDelete(post.id)}>
            <DeleteIcon />
            <Typography textAlign="center">Delete</Typography>
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
};

export default PostHeader;
