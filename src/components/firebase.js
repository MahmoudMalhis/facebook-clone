import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCUPas-Y7P-RBTp4y78NuY8XsHyb502MjY",
  authDomain: "face-a8764.firebaseapp.com",
  databaseURL: "https://face-a8764-default-rtdb.firebaseio.com",
  projectId: "face-a8764",
  storageBucket: "face-a8764.appspot.com",
  messagingSenderId: "24628669557",
  appId: "1:24628669557:web:1df3211dade0b4b93adc3c",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
