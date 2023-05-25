import LikeCounterContext from "../../../../context/LikeCounterContext";
import LikeContext from "../../../../context/LikeContext";
import CreatePost from "./CreatePost";
import Post from "./Post/Post";
import { useState } from "react";
import { PostIdContext } from "../../../../context/PostIdContext";
import { CustomMainPostFormBox } from "./PostStyle";

const MainPostForm = () => {
  const [counterLike, setCounterLike] = useState(false);
  const [likes, setLikes] = useState(false);
  const [postId, setPostId] = useState("");

  return (
    <LikeCounterContext.Provider value={{ counterLike, setCounterLike }}>
      <LikeContext.Provider value={{ likes, setLikes }}>
        <PostIdContext.Provider value={{ postId, setPostId }}>
          <CustomMainPostFormBox>
            <CreatePost />
            <Post />
          </CustomMainPostFormBox>
        </PostIdContext.Provider>
      </LikeContext.Provider>
    </LikeCounterContext.Provider>
  );
};

export default MainPostForm;
