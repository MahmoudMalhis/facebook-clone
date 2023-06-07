import { styled } from "@mui/material/styles";
import { Box, Typography, FormControl } from "@mui/material";
import { breakpoints, textTransform } from "@mui/system";

export const SignUpMainBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#f0f3f5",
  height: "100vh",
  textAlign: "center",
}));

export const TitleBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#fff",
  borderRadius: "8px 8px 0 0",
  boxSizing: "border-box",
  padding: "10px 16px",
}));

export const Title = styled(Typography)(({ theme }) => ({
  "&:first-child": {
    fontSize: "25px",
    lineHeight: "32px",
    textAlign: "center",
    fontWeight: "600",
  },

  "&:nth-child(2)": {
    fontSize: "15px",
    lineHeight: "24px",
    textAlign: "center",
    color: " #606770",
  },
}));

export const BoxSignUp = styled(Box)(({ theme }) => ({
  background: "#fff",
  margin: "0 auto 30px auto",
  backgroundColor: "#fff",
  boxSizing: "border-box",
  padding: "16px",
  paddingTop: "0",
  position: "relative",
  boxShadow: " 0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)",
  borderRadius: "8px",
  width: "485px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    width: "450px",
  },
}));

export const FormSignUp = styled(FormControl)(({ theme }) => ({
  borderTop: "1px solid #dadde1 ",
  padding: "16px ",
  flexDirection: "row ",
  justifyContent: "center",
  flexWrap: "wrap",

  "&>div:nth-child(1)": {
    order: 1,
  },

  "&>div:nth-child(2)": {
    order: 2,
    marginLeft: "5px",
  },
  "&>div:nth-child(1), &>div:nth-child(2)": {
    width: "calc((100% / 2) - 5px)",
  },

  "&>div:nth-child(3), &>div:nth-child(4)": {
    order: 3,
    width: "100%",
  },

  "&>div:nth-child(5),&>div:nth-child(6),&>div:nth-child(7)": {
    order: 5,
    width: "calc((100% / 3) - 10px)",
  },

  "&>div:nth-child(6),&>div:nth-child(7)": {
    marginLeft: "5px",
  },

  "&>div:nth-child(8)": {
    order: 10,
    width: "100%",
  },

  "&>div:nth-child(8) input": {
    background: "none",
    backgroundColor: "#00a400",
    border: "none",
    borderRadius: "6px",
    boxShadow: "none",
    color: "#fff",
    fontSize: "18px",
    fontWeight: "600",
    height: "36px",
    overflow: "hidden",
    padding: "0 32px",
    width: "140px",
    cursor: "pointer",
    display: "block",
    textAlign: "center",
    lineHeight: "36px",
    textTransform: "none",
  },

  "&>div:nth-child(8) input:hover": {
    opacity: "0.8",
    outline: "none",
  },

  "&>div:nth-child(9)": {
    order: "7",
    flexWrap: "nowrap",
    flexDirection: "row",
    width: "100%",
  },

  "& .label": {
    width: " 100%",
    border: "1px solid #ccd0d5",
    fontWeight: "normal",
    height: "36px",
    margin: "8px 6px 6px",
    borderRadius: "4px",
  },

  "&>p:nth-child(10)": {
    order: 4,
  },

  "&>p:nth-child(11)": {
    order: 6,
  },

  "&>p:nth-child(10) , &>p:nth-child(11)  ": {
    color: "#606770",
    fontFamily: "SFProText-Medium, Helvetica, Arial, sans-serif",
    fontSize: "12px",
    fontWeight: "normal",
    lineHeight: "20px",
    marginBottom: "0",
    marginTop: "2px",
    textAlign: "left",
    width: "100%",
  },

  "&>p:nth-child(10) svg,&>p:nth-child(11) svg": {
    width: "12px",
    height: "12px",
    color: "#e2e4e5",
    background: "#606770",
    borderRadius: "50%",
  },

  "&>p:nth-child(12)": {
    order: 8,
  },

  "&>p:nth-child(13)": {
    order: 9,
  },

  "&>p:nth-child(12) p, &>p:nth-child(13) p": {
    color: "#777",
    fontSize: "11px",
    margin: "1em 0",
    textAlign: "left",
  },

  "&>p:nth-child(12) a, &>p:nth-child(13) a": {
    color: "#385898",
    cursor: "pointer",
    textDecoration: "none",
  },

  "&>p:nth-child(12) a:hover,&>p:nth-child(13) a:hover": {
    textDecoration: "underline",
  },

  "&>span:nth-child(14)": {
    paddingTop: "10px",
    marginTop: "10px",
    fontSize: "17px",
    lineHeight: "20px",
    cursor: "pointer",
    order: "10",
  },

  "&>span:nth-child(14) a ": {
    textDecoration: "none",
    color: "#1877f2",
  },

  "&>h6": {
    order: 11,
  },
}));
