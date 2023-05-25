import { useContext } from "react";
import { Box, Typography } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ReplyIcon from "@mui/icons-material/Reply";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { CustomIconButtonReaction } from "../PostStyle";
import LikeCounterContext from "../../../../../context/LikeCounterContext";
import LikeContext from "../../../../../context/LikeContext";

const PostActions = () => {
  const { likes, setLikes } = useContext(LikeContext);
  const { counterLike, setCounterLike } = useContext(LikeCounterContext);

  const handleLike = () => {
    if (likes) {
      setCounterLike(counterLike - 1);
    } else {
      setCounterLike(counterLike + 1);
    }
    setLikes(!likes);
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
        sx={{ color: likes ? "#1976d2" : "inherit" }}
      >
        <ThumbUpIcon />
        <Typography marginLeft="10px">Like</Typography>
      </CustomIconButtonReaction>
      <CustomIconButtonReaction>
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
