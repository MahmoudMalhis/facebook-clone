import React, { useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import { ProfilePicProvider } from "./context/ProfilePicContext";
import FriendDataProvider from "./context/FriendDataContext";
import { FriendPicProvider } from "./context/FriendPicContext";
import { ShowCommentsContext } from "./context/ShowCommentContext";
import LikeCounterContext from "./context/LikeCounterContext";
import LikeContext from "./context/LikeContext";
import LoadingDataContext from "./context/LoadingDataContext";
import PostsProvider from "./context/PostsContext";
import Router from "./components/router/router";
import "./App.css";

function App() {
  const [showComments, setShowComments] = useState(false);
  const [counterLike, setCounterLike] = useState(false);
  const [likes, setLikes] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <LoadingDataContext.Provider value={{ isLoading, setIsLoading }}>
      <ShowCommentsContext.Provider value={{ showComments, setShowComments }}>
        <LikeCounterContext.Provider value={{ counterLike, setCounterLike }}>
          <LikeContext.Provider value={{ likes, setLikes }}>
            <AuthProvider>
              <ProfilePicProvider>
                <FriendPicProvider>
                  <FriendDataProvider>
                    <PostsProvider>
                      <Router />
                    </PostsProvider>
                  </FriendDataProvider>
                </FriendPicProvider>
              </ProfilePicProvider>
            </AuthProvider>
          </LikeContext.Provider>
        </LikeCounterContext.Provider>
      </ShowCommentsContext.Provider>
    </LoadingDataContext.Provider>
  );
}

export default App;
