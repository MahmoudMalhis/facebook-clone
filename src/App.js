import Router from "./components/router/router";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import { ProfilePicProvider } from "./context/ProfilePicContext";
import FriendDataProvider from "./context/FriendDataContext";
import { FriendPicProvider } from "./context/FriendPicContext";

function App() {
  return (
    <AuthProvider>
      <ProfilePicProvider>
        <FriendPicProvider>
          <FriendDataProvider>
            <Router />
          </FriendDataProvider>
        </FriendPicProvider>
      </ProfilePicProvider>
    </AuthProvider>
  );
}

export default App;
