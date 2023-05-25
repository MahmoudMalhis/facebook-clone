import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { firestore } from "../../../../firebase";
import PostHeader from ".//PostHeader";
import PostContent from ".//PostContent";
import PostActions from ".//PostActions";
import PostComments from "./PostComments";

const Post = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, "posts"),
      (snapshot) => {
        const updatedPosts = snapshot.docs.map((doc) => doc.data());
        setPosts(updatedPosts);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <>
      {posts.map((post, index) => (
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
