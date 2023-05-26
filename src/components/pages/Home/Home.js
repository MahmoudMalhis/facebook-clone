import { Box } from "@mui/material";
import LeftSide from "./LeftSide/LeftSide";
import MainPostForm from "./posts/MainPosts";
import RightSide from "./RightSide/RightSide";
import { CustomBox } from "./HomeStyled";

const Home = () => {
  return (
    <Box
      bgcolor="#f0f2f5"
      display="flex"
      justifyContent="center"
      overflow="hidden"
    >
      <CustomBox>
        <LeftSide />
        <MainPostForm />
        <RightSide />
      </CustomBox>
    </Box>
  );
};

export default Home;
