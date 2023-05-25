import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../../../firebase";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostActions from "./PostActions";
import PostComments from "./PostComments";

const Post = () => {
  const [postContent, setPostContent] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(firestore, "posts"));
      const posts = querySnapshot.docs.map((doc) => doc.data());
      setPostContent(posts);
    };

    fetchPosts();
  }, []);

  return (
    <>
      {postContent.map((post, index) => (
        <Box
          width="680px"
          backgroundColor="#fff"
          borderRadius="8px"
          padding="10px"
          marginTop="20px"
          key={index}
        >
          <PostHeader post={post} />
          <PostContent post={post} />
          <PostActions />
          <PostComments />
        </Box>
      ))}
    </>
  );
};

export default Post;
