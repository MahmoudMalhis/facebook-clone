import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { CustomBox } from "../Home/HomeStyled";

export const SaveBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#f0f2f5",
  overflow: "hidden",
  height: "calc(100vh - 64px)",
}));

export const Container = styled(CustomBox)(({ theme }) => ({
  width: "60%",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
  margin: "0 auto",
  overflow: "scroll",
  scrollbarColor: "#BCC0C4",
  "&::-webkit-scrollbar": {
    width: "5px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#BCC0C4",
    borderRadius: "20px",
  },
}));
