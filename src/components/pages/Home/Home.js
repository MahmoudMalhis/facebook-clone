import { Box } from "@mui/material";
import LeftSide from "./LeftSide/LeftSide";
import MainPostForm from "./posts/MainPosts";
import { CustomMainPostFormBox } from "./posts/PostStyle";
import RightSide from "./RightSide/RightSide";

const Home = () => {
  return (
    <Box
      bgcolor="#f0f2f5"
      display="flex"
      justifyContent="center"
      overflow="hidden"
    >
      <Box
        width="1464px"
        height="calc(100vh - 80px)"
        display="flex"
        justifyContent="space-between"
        marginTop="16px"
      >
        <LeftSide />
        <CustomMainPostFormBox>
          <MainPostForm />
        </CustomMainPostFormBox>
        <Box width="360px" className="right">
          <RightSide />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
