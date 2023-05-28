import {
  IconButton,
  Avatar,
  Typography,
  Box,
  List,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/material/styles";

export const ImageCover = styled("img")(({}) => ({
  width: "100%",
  height: "100%",
}));

export const StyledIconButton = styled(IconButton)(({}) => ({
  position: "absolute",
  bottom: "0",
  right: "10px",
  borderRadius: "8px",
}));

export const StyledAvatar = styled(Avatar)(({}) => ({
  width: "175px",
  height: "175px",
  bottom: "-33%",
  transform: "translateY(-33%)",
  border: "1px solid #ddd",
}));

export const StyledUserName = styled(Typography)(({ theme }) => ({
  fontSize: "40px",
  fontWeight: "bold",
  marginLeft: "120px",
  marginTop: "30px",
  [theme.breakpoints.down("lg")]: {
    position: "absolute",
    left: "50%",
    bottom: "-35%",
    transform: "translateX(-50%)",
    margin: "0",
    fontSize: "35px",
    width: "100%",
    textAlign: "center",
  },
}));

export const StyledAvatarBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  [theme.breakpoints.down("lg")]: {
    flexDirection: "column",
  },
}));

export const StyledBottomAvatar = styled(IconButton)(({ theme }) => ({
  transform: "translateY(-33%)",
  [theme.breakpoints.down("lg")]: {
    position: "absolute",
    transform: "translate(-50%,-33%)",
    left: "50%",
  },
  bottom: "-50%",
  left: "80px",
}));

export const CustomProfileMainBox = styled(Box)(({ theme }) => ({
  width: "1250px",
  [theme.breakpoints.down("xl")]: {
    width: "1190px",
  },
  [theme.breakpoints.down("lg")]: {
    width: "auto",
  },
  height: "50vh",
  margin: "0 auto",
  position: "relative",
}));

export const CustomProfileInfoBox = styled(Box)(({ theme }) => ({
  width: "1250px",
  [theme.breakpoints.down("xl")]: {
    width: "1190px",
  },
  [theme.breakpoints.down("lg")]: {
    width: "auto",
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column-reverse",
  },
  margin: "0 auto",
  display: "flex",
  justifyContent: "center",
}));

export const CustomListUserInfo = styled(List)(({ theme }) => ({
  backgroundColor: "#fff",
  height: "fit-content",
  borderRadius: "8px",
  marginLeft: "15px",
  [theme.breakpoints.down("sm")]: {
    margin: "0 auto",
    marginBottom: "20px",
    width: "400px",
    maxWidth: "100%",
  },
}));

export const CustomListItemTextUserInfo = styled(ListItemText)(({ theme }) => ({
  display: "flex",
  "& span": {
    fontWeight: "bold",
    marginRight: "10px",
  },
}));
