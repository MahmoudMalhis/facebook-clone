import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "../pages/LogIn/LogIn";
import SignUp from "../pages/SignUp/SignUp";
import Home from "../pages/Home/Home";
import Layout from "./Layout";
import LiveTV from "../pages/LiveTV";
import Store from "../pages/Store";
import Groups from "../pages/Groups";
import Games from "../pages/Games";
import Profile from "../pages/Profile/Profile";
import Save from "../pages/SavePost/Save";
import Favorite from "../pages/Favorite/Favorite";

const router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/live-tv" element={<LiveTV />} />
          <Route path="/store" element={<Store />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/games" element={<Games />} />
          <Route path="/profile/:email" element={<Profile />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/save" element={<Save />} />
          <Route path="/favorites" element={<Favorite />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default router;
