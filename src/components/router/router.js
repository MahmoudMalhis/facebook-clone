import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "../LogIn/LogIn";
import SignUp from "../SignUp/SignUp";

const router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default router;
