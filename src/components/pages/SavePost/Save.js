import LeftSide from "../Home/LeftSide/LeftSide";
import { Container, SaveBox } from "./SaveStyle";
import Post from "../Home/posts/Post/Post";
import { Box } from "@mui/material";

const Save = () => {
  return (
    <SaveBox>
      <Container>
        <LeftSide />
        <Box width="70%">
          <Post type="saved" />
        </Box>
      </Container>
    </SaveBox>
  );
};

export default Save;
