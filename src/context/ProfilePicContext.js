import { doc, getDoc } from "firebase/firestore";
import React, { createContext, useEffect, useState, useContext } from "react";
import { firestore } from "../components/firebase";
import { AuthContext } from "./AuthContext";

export const ProfilePicContext = createContext();

export const ProfilePicProvider = ({ children }) => {
  const [avatarImage, setAvatarImage] = useState(null);
  const userData = useContext(AuthContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await getDoc(doc(firestore, "users", userData.email));
        if (userDoc.exists()) {
          const profileData = userDoc.data();
          if (profileData.profilePicUrl) {
            setAvatarImage(profileData.profilePicUrl);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [userData.email]);

  return (
    <ProfilePicContext.Provider value={avatarImage}>
      {children}
    </ProfilePicContext.Provider>
  );
};
