import { IconButton, Avatar, Typography } from "@mui/material";
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

export const StyledUserName = styled(Typography)(({}) => ({
  fontSize: "40px",
  fontWeight: "bold",
  marginLeft: "120px",
  marginTop: "30px",
}));

export const StyledBottomAvatar = styled(IconButton)(({}) => ({
  transform: "translateY(-33%)",
  bottom: "-50%",
  left: "80px",
}));
