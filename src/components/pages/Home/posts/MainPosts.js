import LikeCounterContext from "../../../../context/LikeCounterContext";
import LikeContext from "../../../../context/LikeContext";
import CreatePost from "./CreatePost";
import Post from "./Post/Post";
import { useState } from "react";

const MainPostForm = () => {
  const [counterLike, setCounterLike] = useState(false);
  const [likes, setLikes] = useState(false);

  return (
    <LikeCounterContext.Provider value={{ counterLike, setCounterLike }}>
      <LikeContext.Provider value={{ likes, setLikes }}>
        <CreatePost />
        <Post />
      </LikeContext.Provider>
    </LikeCounterContext.Provider>
  );
};

export default MainPostForm;
