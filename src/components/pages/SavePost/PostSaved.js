import { Box } from "@mui/material";
import PostHeader from "../Home/posts/Post/PostHeader";
import PostContent from "../Home/posts/Post/PostContent";
import PostActions from "../Home/posts/Post/PostActions";
import PostComments from "../Home/posts/Post/PostComments";
import { firestore } from "../../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import SkeletonLod from "../../Skeleton";
import LoadingDataContext from "../../../context/LoadingDataContext";

const PostSaved = () => {
  const [posts, setPosts] = useState([]);
  const { isLoading, setIsLoading } = useContext(LoadingDataContext);
  const userData = useContext(AuthContext);

  console.log("1");
  useEffect(() => {
    setIsLoading(true);
    if (Object.keys(userData).length) {
      const unsubscribe = onSnapshot(
        collection(firestore, "users", userData.email, "save"),
        (snapshot) => {
          const savedPosts = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setPosts(savedPosts);
          setIsLoading(false);
        }
      );

      return () => unsubscribe();
    }
  }, [userData]);
  //   console.table(posts);
  console.table(posts[1]?.post?.createdAt);

  return (
    <Box width="60%" margin="0 auto">
      {isLoading ? (
        <SkeletonLod />
      ) : posts.length === 0 ? (
        <Box
          fontSize="100px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="500px"
          color="#757575"
        >
          No Post Saved
        </Box>
      ) : (
        posts.map((save) => (
          <Box
            maxWidth="100%"
            backgroundColor="#fff"
            borderRadius="8px"
            padding="10px"
            marginTop="20px"
            key={save.id}
          >
            <PostHeader post={save.post} />
            <PostContent post={save.post} />
            <PostActions post={save.post} />
            <PostComments postId={save.post.id} />
          </Box>
        ))
      )}
    </Box>
  );
};

export default PostSaved;
