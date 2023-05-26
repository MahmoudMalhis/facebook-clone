import LikeCounterContext from "../../../../context/LikeCounterContext";
import LikeContext from "../../../../context/LikeContext";
import CreatePost from "./CreatePost";
import Post from "./Post/Post";
import { useState } from "react";
import { CustomMainPostFormBox } from "./PostStyle";
import { ShowCommentsContext } from "../../../../context/ShowCommentContext";

const MainPostForm = () => {
  const [counterLike, setCounterLike] = useState(false);
  const [likes, setLikes] = useState(false);
  const [showComments, setShowComments] = useState(false);

  return (
    <ShowCommentsContext.Provider value={{ showComments, setShowComments }}>
      <LikeCounterContext.Provider value={{ counterLike, setCounterLike }}>
        <LikeContext.Provider value={{ likes, setLikes }}>
          <CustomMainPostFormBox>
            <CreatePost />
            <Post />
          </CustomMainPostFormBox>
        </LikeContext.Provider>
      </LikeCounterContext.Provider>
    </ShowCommentsContext.Provider>
  );
};

export default MainPostForm;
