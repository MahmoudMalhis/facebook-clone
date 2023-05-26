import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const CustomLogInBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  backgroundColor: "#f0f2f5",
  flexDirection: "row",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

export const CustomLogoBox = styled(Box)(({ theme }) => ({
  width: "580px",
  [theme.breakpoints.down("md")]: {
    width: "400px",
  },
}));

export const CustomLogoTypography = styled(Typography)(({ theme }) => ({
  width: "500px",
  [theme.breakpoints.down("md")]: {
    width: "380px",
  },
  fontSize: "28px ",
  lineHeight: "32px",
  padding: "0 0 20px",
}));
