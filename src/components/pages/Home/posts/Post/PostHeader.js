import { useContext, useEffect, useState } from "react";
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
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../../../../firebase";
import { Link } from "react-router-dom";

const PostHeader = ({ post }) => {
  const [anchorPost, setAnchorPost] = useState(null);
  const [savePost, setSavePost] = useState(null);
  const userData = useContext(AuthContext);

  const handlePostMenu = (event) => {
    setAnchorPost(event.currentTarget);
  };

  const handleClosePostMenu = () => {
    setAnchorPost(null);
  };

  useEffect(() => {
    onSnapshot(doc(firestore, "users", userData.email), (snapshot) => {
      const postData = snapshot.data();
      const postsSavedList = postData.postsSavedList || [];
      setSavePost(postsSavedList);
    });
  }, [userData.email]);

  const handleSavePost = async () => {
    const postSaveRef = doc(firestore, "users", userData.email);

    if (savePost.includes(post.id)) {
      const updatedPostsSavedList = arrayRemove(post.id);
      await updateDoc(postSaveRef, { postsSavedList: updatedPostsSavedList });
    } else {
      const updatedPostsSavedList = arrayUnion(post.id);
      await updateDoc(postSaveRef, { postsSavedList: updatedPostsSavedList });
    }
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
          <Typography textAlign="center">
            {savePost?.includes(post.id) ? "un save" : "save"}
          </Typography>
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
