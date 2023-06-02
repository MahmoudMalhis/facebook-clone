import { useContext } from "react";
import { Typography } from "@mui/material";
import LikeCounterContext from "../../../../../context/LikeCounterContext";
import LikeContext from "../../../../../context/LikeContext";

const PostContent = ({ post }) => {
  const { counterLike } = useContext(LikeCounterContext);
  const { likes } = useContext(LikeContext);

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
      {likes[post.id] && (
        <Typography fontSize="12px" color="#666">
          {`${counterLike[post.id] || 0} Like`}
        </Typography>
      )}
    </>
  );
};

export default PostContent;
