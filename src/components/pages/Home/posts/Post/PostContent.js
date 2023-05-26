import { useContext } from "react";
import { Typography } from "@mui/material";
import LikeCounterContext from "../../../../../context/LikeCounterContext";
import LikeContext from "../../../../../context/LikeContext";

const PostContent = ({ post }) => {
  const { counterLike } = useContext(LikeCounterContext);
  const { likes } = useContext(LikeContext);

  return (
    <>
      <Typography>{post.text}</Typography>
      <img
        style={{
          width: "100%",
          height: "100%",
        }}
        src={post.imageUrl}
        alt="Uploaded"
      />
      {likes && (
        <Typography fontSize="12px" color="#666">
          {`${counterLike} Like`}
        </Typography>
      )}
    </>
  );
};

export default PostContent;
