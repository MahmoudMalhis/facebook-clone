import CreatePost from "./CreatePost";
import Post from "./Post";
import ImageContext from "../../../../context/ImageContext";
import { useState } from "react";

const MainPostForm = () => {
  const [imageUrls, setImageUrls] = useState([]);
  return (
    <ImageContext.Provider value={{ imageUrls, setImageUrls }}>
      <CreatePost />
      <Post />
    </ImageContext.Provider>
  );
};

export default MainPostForm;
