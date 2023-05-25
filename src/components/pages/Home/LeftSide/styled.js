import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  borderRadius: "5px",
  width: "100%",
  justifyContent: "left",
}));

export const CustomLabelIcon = styled("span")(({ theme }) => ({
  marginLeft: "10px",
  fontSize: "0.7em",
  color: "#000",
}));

export const CustomLeftSide = styled(Box)(({ theme }) => ({
  width: "360px",
  [theme.breakpoints.down("lg")]: {
    width: "200px",
  },
  [theme.breakpoints.down("md")]: {
    padding: "0",
  },
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
  display: "flex",
  flexDirection: "column",
  justifyContent: "left",
  paddingRight: "15px",
  overflowY: "scroll",
  scrollbarColor: "#BCC0C4",
  "&::-webkit-scrollbar": {
    width: "5px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#BCC0C4",
    borderRadius: "20px",
  },
}));
