import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAofZ4vGvxxXB7joBKh3xmlLZJrtPCoTIA",
  authDomain: "facebook-a8101.firebaseapp.com",
  projectId: "facebook-a8101",
  storageBucket: "facebook-a8101.appspot.com",
  messagingSenderId: "115896948039",
  appId: "1:115896948039:web:4f9aa78a4bd99d7e6fe862",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
