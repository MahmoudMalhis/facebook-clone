import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  ListItem,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  CustomAvatar,
  CustomList,
  CustomInput,
  CustomLinearScaleIcon,
} from "../PostStyle";
import {
  collection,
  addDoc,
  doc,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import { firestore } from "../../../../firebase";
import { AuthContext } from "../../../../../context/AuthContext";
import { ProfilePicContext } from "../../../../../context/ProfilePicContext";
import { ShowCommentsContext } from "../../../../../context/ShowCommentContext";
import { FriendPicContext } from "../../../../../context/FriendPicContext";

const PostComments = ({ postId }) => {
  const [commentLikes, setCommentLikes] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [anchorComment, setAnchorComment] = useState(null);
  const { showComments } = useContext(ShowCommentsContext);
  const userData = useContext(AuthContext);
  const { friendImage } = useContext(FriendPicContext);
  const profileImageContext = useContext(ProfilePicContext);
  const profileImage = friendImage ?? profileImageContext;

  const handleCommentMenu = (event) => {
    setAnchorComment(event.currentTarget);
  };

  const handleCloseCommentMenu = () => {
    setAnchorComment(null);
  };

  const handleCommentLike = () => {
    setCommentLikes(!commentLikes);
  };

  const handleInputChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleSendComment = async () => {
    if (commentText.trim() !== "") {
      const newComment = {
        id: Date.now(),
        text: commentText.trim(),
        currentTime: new Date().toLocaleTimeString(),
      };
      try {
        const postRef = doc(firestore, "posts", postId);
        const commentsRef = collection(postRef, "comments");
        const docRef = await addDoc(commentsRef, newComment);
        newComment.id = docRef.id;
        setComments([...comments, newComment]);
        setCommentText("");
      } catch (error) {}
    }
  };

  useEffect(() => {
    const postRef = doc(firestore, "posts", postId);
    const commentsRef = collection(postRef, "comments");

    const unsubscribe = onSnapshot(commentsRef, (snapshot) => {
      const updatedComments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(updatedComments);
    });

    return () => unsubscribe();
  }, [postId]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendComment();
    }
  };

  const handleDelete = async (commentId) => {
    try {
      const postRef = doc(firestore, "posts", postId);
      const commentsRef = collection(postRef, "comments");
      const commentDocRef = doc(commentsRef, commentId.toString());
      await deleteDoc(commentDocRef);
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (error) {}
    handleCloseCommentMenu();
  };

  return (
    <>
      {showComments &&
        comments.map((comment) => (
          <Box>
            <Box
              key={comment.id}
              display="flex"
              alignItems="center"
              marginTop="20px"
            >
              <CustomAvatar
                ait={userData.fullName}
                src={profileImage.profilePicUrl}
              />
              <Box backgroundColor="#f0f2f5" padding="10px" borderRadius="30px">
                <Typography fontWeight="bold">{userData.fullName}</Typography>
                <Typography>{comment.text}</Typography>
              </Box>
              <Tooltip>
                <IconButton onClick={handleCommentMenu}>
                  <CustomLinearScaleIcon />
                </IconButton>
              </Tooltip>
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
                <MenuItem onClick={() => handleDelete(comment.id)}>
                  <DeleteIcon />
                  <Typography textAlign="center">Delete</Typography>
                </MenuItem>
              </Menu>
            </Box>
            <CustomList>
              <ListItem>{comment.currentTime}</ListItem>
              <ListItem
                onClick={handleCommentLike}
                sx={{
                  color: commentLikes ? "#1976d2" : "inherit",
                  fontWeight: commentLikes ? "bold" : "inherit",
                  cursor: "pointer",
                }}
              >
                Like
              </ListItem>
            </CustomList>
          </Box>
        ))}
      <Box display="flex" alignItems="center" marginTop="20px">
        <CustomAvatar
          alt={userData.fullName}
          src={profileImage.profilePicUrl}
        />
        <CustomInput
          type="text"
          value={commentText}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <SendIcon onClick={handleSendComment} />
      </Box>
    </>
  );
};

export default PostComments;
