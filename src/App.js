import React, { useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import { ProfilePicProvider } from "./context/ProfilePicContext";
import FriendDataProvider from "./context/FriendDataContext";
import { FriendPicProvider } from "./context/FriendPicContext";
import { ActionsPostProvider } from "./context/ActionsPostContext";
import LoadingDataContext from "./context/LoadingDataContext";
import PostsProvider from "./context/PostsContext";
import Router from "./components/router/router";
import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <LoadingDataContext.Provider value={{ isLoading, setIsLoading }}>
      <ActionsPostProvider>
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
      </ActionsPostProvider>
    </LoadingDataContext.Provider>
  );
}

export default App;
