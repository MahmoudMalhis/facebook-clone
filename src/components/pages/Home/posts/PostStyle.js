import {
  Avatar,
  Box,
  Button,
  IconButton,
  Input,
  List,
  TextareaAutosize,
} from "@mui/material";
import LinearScaleIcon from "@mui/icons-material/LinearScale";
import { styled } from "@mui/material/styles";

export const CustomMainPostFormBox = styled(Box)(({}) => ({
  width: "745px",
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

export const CustomTextareaAutosize = styled(TextareaAutosize)(({ theme }) => ({
  resize: "none",
  width: "98%",
  borderRadius: "50px",
  backgroundColor: "transparent",
  border: "none",
  padding: "8px 12px",
  "&:focus": {
    outline: "none",
  },
  marginLeft: "8px",
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  width: "100%",
  color: "#65676b",
  fontSize: "15px",
  borderRadius: "8px",
  marginTop: "10px",
  "&:hover": {
    color: "#0573e7",
    backgroundColor: "#f7f8fa",
    backgroundColor: "#f0f2f5",
  },
}));

export const CustomDialogActionsButton = styled(Button)(({}) => ({
  width: "100%",
  color: "#fff",
  backgroundColor: "#1976d2",
  "&:hover": {
    backgroundColor: "#1976d2",
  },
}));

export const CustomIconButtonImgUpload = styled(IconButton)(({}) => ({
  width: "100%",
  height: "500px",
  backgroundColor: "#f7f8fa",
  padding: "10px",
  outline: "1px solid #ddd",
  outlineOffset: "5px",
  borderRadius: "8px",
  marginTop: "32px",
  overflowY: "scroll",
  "&::-webkit-scrollbar": {
    width: "5px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#BCC0C4",
    borderRadius: "20px",
  },
}));

export const CustomIconButtonReaction = styled(IconButton)(({}) => ({
  width: "calc(100% / 3)",
  borderRadius: "8px",
}));

export const CustomAvatar = styled(Avatar)(({}) => ({
  width: "30px",
  height: "30px",
  marginRight: "10px",
  cursor: "pointer",
}));

export const CustomInput = styled(Input)(({}) => ({
  width: "100%",
  backgroundColor: "#f0f2f5",
  borderRadius: "50px",
  paddingLeft: "10px",
  "&::before": {
    border: "none",
  },
  "&:hover:before": {
    border: "none",
  },
  "&::after": {
    border: "none",
  },
}));

export const CustomList = styled(List)(({}) => ({
  display: "flex",
  fontSize: "12px",
  color: "#999",
  width: "187px",
  marginLeft: "30px",
}));

export const CustomLinearScaleIcon = styled(LinearScaleIcon)(({}) => ({
  color: "#999",
  cursor: "pointer",
}));
