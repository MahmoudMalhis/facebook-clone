import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBRxJXs7uV-k2JKB_etWc6fBvMHvbFWwn0",
  authDomain: "facebook-49080.firebaseapp.com",
  projectId: "facebook-49080",
  storageBucket: "facebook-49080.appspot.com",
  messagingSenderId: "67285052648",
  appId: "1:67285052648:web:7950f3b89a7d465c1a2d5d",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);
const firestore = getFirestore(app);

export { database, storage, firestore };
export default auth;
