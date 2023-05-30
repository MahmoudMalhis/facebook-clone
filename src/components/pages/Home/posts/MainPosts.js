import CreatePost from "./CreatePost";
import Post from "./Post/Post";
import { CustomMainPostFormBox } from "./PostStyle";

const MainPostForm = () => {
  return (
    <CustomMainPostFormBox>
      <CreatePost />
      <Post />
    </CustomMainPostFormBox>
  );
};

export default MainPostForm;
