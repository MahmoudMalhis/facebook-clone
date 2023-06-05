import LeftSide from "../Home/LeftSide/LeftSide";
import Post from "../Home/posts/Post/Post";
import { Container, SaveBox } from "../SavePost/SaveStyle";
import { Box } from "@mui/material";

const Favorite = () => {
  return (
    <SaveBox>
      <Container>
        <LeftSide />
        <Box width="70%">
          <Post type="favorite" />
        </Box>
      </Container>
    </SaveBox>
  );
};

export default Favorite;
