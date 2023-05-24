import React, { useState, useContext } from "react";
import {
  Avatar,
  Box,
  Typography,
  ListItem,
  Menu,
  MenuItem,
  Tooltip,
  IconButton,
} from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import SendIcon from "@mui/icons-material/Send";
import ReplyIcon from "@mui/icons-material/Reply";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import {
  CustomAvatar,
  CustomIconButtonReaction,
  CustomInput,
  CustomLinearScaleIcon,
  CustomList,
} from "./PostStyle";
import ImageContext from "../../../../context/ImageContext";

const Post = () => {
  const [likes, setLikes] = useState(false);
  const [commentLikes, setCommentLikes] = useState(false);
  const [comment, setComment] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [counterLike, setCounterLike] = useState(0);
  const [anchorPost, setAnchorPost] = useState(null);

  const { imageUrls } = useContext(ImageContext);

  const handleLike = () => {
    if (likes) {
      setCounterLike(counterLike - 1);
    } else {
      setCounterLike(counterLike + 1);
    }
    setLikes(!likes);
  };

  const handleCommentLike = () => {
    setCommentLikes(!commentLikes);
  };

  const handleComment = () => {
    setComment(!comment);
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

  const handleClosePostMenu = () => {
    setAnchorPost(null);
  };
  const handlePostMenu = (event) => {
    setAnchorPost(event.currentTarget);
  };
  return (
    <>
      {imageUrls.map((imageUrl, index) => (
        <Box
          width="680px"
          backgroundColor="#fff"
          borderRadius="8px"
          padding="10px"
          marginTop="20px"
          key={index}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="center">
              <Avatar />
              <Box marginLeft="10px">
                <Typography fontWeight="700">Mahmoud</Typography>
                <Typography fontSize="12px" color="#999">
                  {new Date().toLocaleTimeString()}
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
            </Menu>
          </Box>
          <img
            style={{
              width: "100%",
              height: "100%",
            }}
            src={imageUrl}
            alt="Uploaded"
          />
          {likes && (
            <Typography fontSize="12px" color="#666">
              {counterLike}
            </Typography>
          )}
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
            <CustomIconButtonReaction onClick={handleComment}>
              <ChatBubbleIcon />
              <Typography marginLeft="10px">Comment</Typography>
            </CustomIconButtonReaction>
            <CustomIconButtonReaction>
              <ReplyIcon />
              <Typography marginLeft="10px">Share</Typography>
            </CustomIconButtonReaction>
          </Box>
          {comment && (
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
                    <Box
                      backgroundColor="#f0f2f5"
                      padding="10px"
                      borderRadius="30px"
                    >
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
          )}
        </Box>
      ))}
    </>
  );
};

export default Post;
