import React, { useContext, useEffect } from "react";
import { Box } from "@mui/material";
import PostHeader from ".//PostHeader";
import PostContent from ".//PostContent";
import PostActions from ".//PostActions";
import PostComments from "./PostComments";
import LoadingDataContext from "../../../../../context/LoadingDataContext";
import SkeletonLod from "../../../../Skeleton";
import { PostsContext } from "../../../../../context/PostsContext";
import { ActionsPostContext } from "../../../../../context/ActionsPostContext";

const Post = ({ type }) => {
  const { isLoading } = useContext(LoadingDataContext);
  const { postsList, setPostType } = useContext(PostsContext);

  useEffect(() => {
    setPostType(type);
  }, [type, setPostType]);

  return (
    <>
      {isLoading ? (
        <SkeletonLod />
      ) : (
        postsList.map((post) => (
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
