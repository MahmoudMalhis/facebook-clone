import React from "react";
import LeftSide from "../Home/LeftSide/LeftSide";
import PostSaved from "./PostSaved";
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
