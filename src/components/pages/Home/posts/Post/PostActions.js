import { useContext, useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ReplyIcon from "@mui/icons-material/Reply";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { CustomIconButtonReaction } from "../PostStyle";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "../../../../firebase";
import LikeCounterContext from "../../../../../context/LikeCounterContext";
import { ShowCommentsContext } from "../../../../../context/ShowCommentContext";

const PostActions = ({ post }) => {
  const { counterLike, setCounterLike } = useContext(LikeCounterContext);
  const { showComments, setShowComments } = useContext(ShowCommentsContext);
  const [isLiked, setIsLiked] = useState(false);
  const [likeDoc, setLikeDoc] = useState(null);

  useEffect(() => {
    const fetchLike = async () => {
      const likeRef = doc(firestore, "likes", post.id);
      const likeSnapshot = await getDoc(likeRef);
      if (likeSnapshot.exists()) {
        setLikeDoc(likeSnapshot.ref);
        setIsLiked(true);
      }
    };
    fetchLike();
  }, [post.id]);

  const handleLike = async () => {
    if (likeDoc) {
      await deleteDoc(likeDoc);
      setIsLiked(false);
      setLikeDoc(null);
      setCounterLike((prevCounter) => ({
        ...prevCounter,
        [post.id]: prevCounter[post.id] - 1,
      }));
    } else {
      const likeRef = doc(firestore, "likes", post.id);
      await setDoc(likeRef, { liked: true });
      setIsLiked(true);
      setLikeDoc(likeRef);
      setCounterLike((prevCounter) => ({
        ...prevCounter,
        [post.id]: prevCounter[post.id] + 1,
      }));
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
