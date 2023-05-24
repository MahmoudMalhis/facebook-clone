import { Box } from "@mui/material";
import LeftSide from "./LeftSide/LeftSide";

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
        <Box width="745px" className="center">
          center
        </Box>
        <Box width="360px" className="right">
          right
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
