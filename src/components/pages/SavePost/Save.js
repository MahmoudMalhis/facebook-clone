import React from "react";
import LeftSide from "../Home/LeftSide/LeftSide";
import { CustomBox } from "../Home/HomeStyled";
import PostSaved from "./PostSaved";

const Save = () => {
  return (
    <CustomBox>
      <LeftSide />
      <PostSaved />
    </CustomBox>
  );
};

export default Save;
