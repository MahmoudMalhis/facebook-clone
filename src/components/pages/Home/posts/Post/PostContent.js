import { useContext, useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { PostsContext } from "../../../../../context/PostsContext";
import { AuthContext } from "../../../../../context/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { firestore } from "../../../../firebase";

const PostContent = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesList, setLikesList] = useState([]);
  const { postsList } = useContext(PostsContext);
  const userData = useContext(AuthContext);

  const likePostId = postsList.find((p) => p.id === post.id);
  useEffect(() => {
    if (likePostId) {
      const postRef = doc(
        firestore,
        "users",
        likePostId.email,
        "posts",
        likePostId.id
      );

      const unsubscribe = onSnapshot(postRef, (snapshot) => {
        const postData = snapshot.data();
        const currentLikesList = postData.likesList || [];
        const isUserLiked = currentLikesList.includes(userData.email);

        setIsLiked(isUserLiked);
        setLikesList(currentLikesList);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [likePostId, userData.email]);

  return (
    <>
      <Typography padding="20px">{post.text}</Typography>
      {post.imageUrlPost !== null && (
        <img
          style={{
            width: "100%",
            height: "100%",
          }}
          src={post.imageUrlPost}
          alt="Uploaded"
        />
      )}
      <Typography fontSize="12px" color="#666" marginBottom="5px">
        {likesList.length} like
      </Typography>
    </>
  );
};

export default PostContent;
