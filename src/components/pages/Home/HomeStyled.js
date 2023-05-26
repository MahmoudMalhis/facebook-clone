import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const CustomBox = styled(Box)(({ theme }) => ({
  width: "1464px",
  [theme.breakpoints.down("xl")]: {
    width: "1190px",
  },
  [theme.breakpoints.down("lg")]: {
    width: "890px",
  },
  [theme.breakpoints.down("md")]: {
    width: "100%",
    overflow: "scroll",
  },

  height: "calc(100vh - 80px)",
  display: "flex",
  justifyContent: "space-between",
  marginTop: "16px",
  padding: "0 20px",
}));
