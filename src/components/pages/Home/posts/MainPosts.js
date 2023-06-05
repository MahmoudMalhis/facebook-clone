import CreatePost from "./CreatePost";
import Post from "./Post/Post";
import { CustomMainPostFormBox } from "./PostStyle";

const MainPostForm = ({ type }) => {
  return (
    <CustomMainPostFormBox>
      <CreatePost />
      <Post type={type} />
    </CustomMainPostFormBox>
  );
};

export default MainPostForm;
