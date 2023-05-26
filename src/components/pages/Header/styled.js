import { styled, alpha } from "@mui/material/styles";
import FacebookIcon from "@mui/icons-material/Facebook";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";

export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "50px",
  backgroundColor: alpha(theme.palette.common.black, 0.05),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "inputWidth",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
    display: "flex",
  },
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "rgba(0, 0, 0, 0.54)",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    color: "rgba(0, 0, 0, 1)",
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export const StyledIcon = styled("div")(({ theme }) => ({
  color: "#575757",
  "a.active &": {
    color: "#0573e7",
  },
}));

export const CustomFacebookIcon = styled(FacebookIcon)(({ theme }) => ({
  width: "40px",
  height: "40px",
  color: "#0573e7",
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  borderRadius: "5px",
  width: "40px",
  [theme.breakpoints.up("md")]: {
    width: "80px",
  },
  [theme.breakpoints.up("lg")]: {
    width: "130px",
  },
}));
