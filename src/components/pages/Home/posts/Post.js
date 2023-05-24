import React, { useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ReplyIcon from "@mui/icons-material/Reply";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import {
  CustomAvatar,
  CustomIconButtonReaction,
  CustomInput,
} from "./PostStyle";

const Post = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const [likes, setLikes] = useState(false);
  const [comment, setComment] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  const handelLike = () => {
    setLikes(!likes);
  };

  const handelComment = () => {
    setComment(!comment);
    console.log(comment);
  };

  const handleInputChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (commentText.trim() !== "") {
        const newComment = {
          id: Date.now(),
          text: commentText.trim(),
        };
        setComments([...comments, newComment]);
        setCommentText("");
      }
    }
  };

  return (
    <>
      {/* {imageUrls.map((imageUrl, index) => ( */}
      <Box
        width="680px"
        backgroundColor="#fff"
        borderRadius="8px"
        padding="10px"
        marginTop="20px"
        //   key={index}
      >
        <Box display="flex" alignItems="center">
          <Avatar />
          <Typography marginLeft="10px">Mahmoud</Typography>
        </Box>
        <img
          style={{
            width: "100%",
            height: "100%",
          }}
          src="https://scontent.fjrs29-1.fna.fbcdn.net/v/t45.1600-4/347433538_23853512172430679_9104260515673206396_n.png?stp=cp0_dst-jpg_p526x296_q90_spS444&_nc_cat=102&ccb=1-7&_nc_sid=68ce8d&_nc_ohc=kCWL-DnOwygAX8FHSxA&_nc_ht=scontent.fjrs29-1.fna&oh=00_AfAGNYWMK8ENBVcXyszvp_qkMWxuvuDz8R3967TnefnyMQ&oe=6470A30B"
          alt="Uploaded"
        />
        {likes && (
          <Typography fontSize="12px" color="#666">
            Mahmoud
          </Typography>
        )}
        <Box
          justifyContent="center"
          display="flex"
          borderTop="1px solid #ddd"
          borderBottom="1px solid #ddd"
        >
          <CustomIconButtonReaction
            onClick={handelLike}
            sx={{ color: likes ? "#1976d2" : "inherit" }}
          >
            <ThumbUpIcon />
            <Typography marginLeft="10px">Like</Typography>
          </CustomIconButtonReaction>
          <CustomIconButtonReaction onClick={handelComment}>
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
              <Box display="flex" alignItems="center" marginTop="20px">
                <CustomAvatar />
                <Typography
                  key={comment.id}
                  backgroundColor="#f0f2f5"
                  padding="10px"
                  borderRadius="30px"
                >
                  {comment.text}
                </Typography>
              </Box>
            ))}
            <Box display="flex" alignItems="center" marginTop="20px">
              <CustomAvatar />
              <CustomInput
                type="text"
                value={commentText}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
              />
            </Box>
          </>
        )}
      </Box>
      {/* ))} */}
    </>
  );
};

export default Post;
