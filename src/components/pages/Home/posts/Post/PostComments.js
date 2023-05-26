import React, { useState } from "react";
import { Box, Typography, ListItem } from "@mui/material";
import { CustomAvatar, CustomList, CustomInput } from "../PostStyle";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import SendIcon from "@mui/icons-material/Send";

const PostComments = () => {
  const [commentLikes, setCommentLikes] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  const handleCommentLike = () => {
    setCommentLikes(!commentLikes);
  };

  const handleInputChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleSendComment = () => {
    if (commentText.trim() !== "") {
      const newComment = {
        id: Date.now(),
        text: commentText.trim(),
        currentTime: new Date().toLocaleTimeString(),
      };
      setComments([...comments, newComment]);
      setCommentText("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendComment();
    }
  };

  const handleSendButtonClick = () => {
    handleSendComment();
  };

  return (
    <>
      {comments.map((comment) => (
        <>
          <Box
            key={comment.id}
            display="flex"
            alignItems="center"
            marginTop="20px"
          >
            <CustomAvatar />
            <Box backgroundColor="#f0f2f5" padding="10px" borderRadius="30px">
              <Typography fontWeight="bold">Mahmoud Malhis</Typography>
              <Typography>{comment.text}</Typography>
            </Box>
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
        </>
      ))}
      <Box display="flex" alignItems="center" marginTop="20px">
        <CustomAvatar />
        <CustomInput
          type="text"
          value={commentText}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <SendIcon onClick={handleSendButtonClick} />
      </Box>
    </>
  );
};

export default PostComments;
