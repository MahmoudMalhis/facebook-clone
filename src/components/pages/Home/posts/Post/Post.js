import React, { useEffect, useState, useContext } from "react";
import { Box } from "@mui/material";
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../../../../firebase";
import PostHeader from ".//PostHeader";
import PostContent from ".//PostContent";
import PostActions from ".//PostActions";
import PostComments from "./PostComments";
import { AuthContext } from "../../../../../context/AuthContext";
import { FriendDataContext } from "../../../../../context/FriendDataContext";
import LoadingDataContext from "../../../../../context/LoadingDataContext";
import SkeletonLod from "../../../../Skeleton";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const userDataContext = useContext(AuthContext);
  const { friendData } = useContext(FriendDataContext);
  const userData = friendData ?? userDataContext;
  const { isLoading, setIsLoading } = useContext(LoadingDataContext);

  useEffect(() => {
    setIsLoading(true);
    if (Object.keys(userData).length) {
      const unsubscribe = onSnapshot(
        collection(firestore, "users", userData.email, "posts/"),
        (snapshot) => {
          const updatedPosts = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setPosts(updatedPosts);
          setIsLoading(false);
        }
      );

      return () => unsubscribe();
    }
  }, [userData]);

  return (
    <>
      {isLoading ? (
        <SkeletonLod />
      ) : (
        posts.map((post) => (
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
        ))
      )}
    </>
  );
};

export default Post;
