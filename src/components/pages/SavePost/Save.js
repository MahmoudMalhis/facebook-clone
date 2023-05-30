import React from "react";
import LeftSide from "../Home/LeftSide/LeftSide";
import { CustomBox } from "../Home/HomeStyled";
import PostSaved from "./PostSaved";
import { Box } from "@mui/material";
import { Container, SaveBox } from "./SaveStyle";

const Save = () => {
  return (
    <SaveBox>
      <Container>
        <LeftSide />
        <PostSaved />
      </Container>
    </SaveBox>
  );
};

export default Save;
