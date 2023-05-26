import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { collection, onSnapshot } from "firebase/firestore";
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
        const updatedPosts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(updatedPosts);
        console.log(updatedPosts);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <>
      {posts.map((post) => (
        <Box
          maxWidth="100%"
          backgroundColor="#fff"
          borderRadius="8px"
          padding="10px"
          marginTop="20px"
          key={post.id}
        >
          <PostHeader post={post} />
          <PostContent post={post} />
          <PostActions post={post} />
          <PostComments postId={post.id} />
        </Box>
      ))}
    </>
  );
};

export default Post;
