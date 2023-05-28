import Router from "./components/router/router";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import { ProfilePicProvider } from "./context/ProfilePicContext";

function App() {
  return (
    <AuthProvider>
      <ProfilePicProvider>
        <Router />
      </ProfilePicProvider>
    </AuthProvider>
  );
}

export default App;
