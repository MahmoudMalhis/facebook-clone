import { useContext, useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ReplyIcon from "@mui/icons-material/Reply";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { CustomIconButtonReaction } from "../PostStyle";
import {
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../../../../firebase";
import { AuthContext } from "../../../../../context/AuthContext";
import { PostsContext } from "../../../../../context/PostsContext";
import { ActionsPostContext } from "../../../../../context/ActionsPostContext";

const PostActions = ({ post }) => {
  const { showComments, setShowComments } = useContext(ActionsPostContext);
  const [isLiked, setIsLiked] = useState(false);
  const { postsList } = useContext(PostsContext);
  const userData = useContext(AuthContext);

  const likePostId = postsList.find((p) => p.id === post.id);
  useEffect(() => {
    if (likePostId) {
      const postRef = doc(
        firestore,
        "users",
        likePostId.email,
        "posts",
        likePostId.id
      );

      return onSnapshot(postRef, (snapshot) => {
        const currentLikesList = snapshot.data()?.likesList || [];
        const isUserLiked = currentLikesList.includes(userData.email);

        setIsLiked(isUserLiked);
      });
    }
  }, [likePostId, userData.email]);

  const handleLike = async () => {
    if (likePostId) {
      const postRef = doc(
        firestore,
        "users",
        likePostId.email,
        "posts",
        likePostId.id
      );

      if (isLiked) {
        const updatedLikesList = arrayRemove(userData.email);
        await updateDoc(postRef, { likesList: updatedLikesList });
      } else {
        const updatedLikesList = arrayUnion(userData.email);
        await updateDoc(postRef, { likesList: updatedLikesList });
      }
    }
  };

  const handleShowComment = () => {
    setShowComments(!showComments);
  };

  return (
    <Box
      justifyContent="center"
      display="flex"
      borderTop="1px solid #ddd"
      borderBottom="1px solid #ddd"
    >
      <CustomIconButtonReaction
        onClick={handleLike}
        sx={{ color: isLiked ? "#1976d2" : "inherit" }}
      >
        <ThumbUpIcon />
        <Typography marginLeft="10px">Like</Typography>
      </CustomIconButtonReaction>
      <CustomIconButtonReaction onClick={handleShowComment}>
        <ChatBubbleIcon />
        <Typography marginLeft="10px">Comment</Typography>
      </CustomIconButtonReaction>
      <CustomIconButtonReaction>
        <ReplyIcon />
        <Typography marginLeft="10px">Share</Typography>
      </CustomIconButtonReaction>
    </Box>
  );
};

export default PostActions;
