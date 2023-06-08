import { styled } from "@mui/material/styles";
import { Box, Typography, FormControl } from "@mui/material";

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
  "&:first-of-type": {
    fontSize: "25px",
    lineHeight: "32px",
    textAlign: "center",
    fontWeight: "600",
  },

  "&:nth-of-type(2)": {
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
  width: "450px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    width: "350px",
  },
}));

export const FormSignUp = styled(FormControl)(({ theme }) => ({
  borderTop: "1px solid #dadde1 ",
  padding: "16px ",
  flexDirection: "row ",
  justifyContent: "center",
  flexWrap: "wrap",

  "&>div:nth-of-type(1)": {
    order: 1,
  },

  "&>div:nth-of-type(2)": {
    order: 2,
    marginLeft: "5px",
  },
  "&>div:nth-of-type(1), &>div:nth-of-type(2)": {
    width: "calc((100% / 2) - 5px)",
  },

  "&>div:nth-of-type(3), &>div:nth-of-type(4)": {
    order: 3,
    width: "100%",
  },

  "&>div:nth-of-type(5),&>div:nth-of-type(6),&>div:nth-of-type(7)": {
    order: 5,
    width: "calc((100% / 3) - (10px / 3))",
  },

  "&>div:nth-of-type(6),&>div:nth-of-type(7)": {
    marginLeft: "5px",
  },

  "&>div:nth-of-type(8)": {
    order: 10,
    width: "100%",
  },

  "&>div:nth-of-type(8) input": {
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

  "&>div:nth-of-type(8) input:hover": {
    opacity: "0.8",
    outline: "none",
  },

  "&>div:nth-of-type(9)": {
    order: "7",
    flexWrap: "nowrap",
    flexDirection: "row",
    width: "100%",
  },

  "&>div:nth-of-type(9) label": {
    width: " 100%",
    border: "1px solid #ccd0d5",
    fontWeight: "normal",
    height: "36px",
    margin: "8px 6px 6px",
    borderRadius: "4px",
  },

  "&>p:nth-of-type(1)": {
    order: 4,
  },

  "&>p:nth-of-type(2)": {
    order: 6,
  },

  "&>p:nth-of-type(1) , &>p:nth-of-type(2)  ": {
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

  "&>p:nth-of-type(1) svg,&>p:nth-of-type(2) svg": {
    width: "12px",
    height: "12px",
    color: "#e2e4e5",
    background: "#606770",
    borderRadius: "50%",
  },

  "&>p:nth-of-type(3)": {
    order: 8,
  },

  "&>p:nth-of-type(4)": {
    order: 9,
  },

  "&>p:nth-of-type(3) p, &>p:nth-of-type(4) p": {
    color: "#777",
    fontSize: "11px",
    margin: "1em 0",
    textAlign: "left",
  },

  "&>p:nth-of-type(3) a, &>p:nth-of-type(4) a": {
    color: "#385898",
    cursor: "pointer",
    textDecoration: "none",
  },

  "&>p:nth-of-type(3) a:hover,&>p:nth-of-type(4) a:hover": {
    textDecoration: "underline",
  },

  "&>span": {
    paddingTop: "10px",
    marginTop: "10px",
    fontSize: "17px",
    lineHeight: "20px",
    cursor: "pointer",
    width: "100%",
    order: "10",
  },

  "&>span a ": {
    textDecoration: "none",
    color: "#1877f2",
  },

  "&>h6": {
    order: 11,
  },
}));
