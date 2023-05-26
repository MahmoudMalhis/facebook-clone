import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const CustomRightSideBox = styled(Box)(({ theme }) => ({
  width: "360px",
  [theme.breakpoints.down("lg")]: {
    width: "200px",
  },
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

export const CustomSponsorBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginTop: "10px",
  flexDirection: "row",
  [theme.breakpoints.down("lg")]: {
    flexDirection: "column",
  },
}));
