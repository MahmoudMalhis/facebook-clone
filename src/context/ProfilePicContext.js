import { doc, onSnapshot } from "firebase/firestore";
import React, { createContext, useEffect, useState, useContext } from "react";
import { firestore } from "../components/firebase";
import { AuthContext } from "./AuthContext";

export const ProfilePicContext = createContext();

export const ProfilePicProvider = ({ children }) => {
  const [profileImage, setProfileImage] = useState({});
  const userData = useContext(AuthContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDocRef = doc(firestore, "users", userData.email);
        onSnapshot(userDocRef, (doc) => {
          if (doc.exists()) {
            const profileData = doc.data();
            if (profileData.profilePicUrl) {
              setProfileImage({ profilePic: profileData.profilePicUrl });
            }
            if (profileData.imageUrl) {
              setProfileImage({ ...profileData, cover: profileData.imageUrl });
            }
          }
        });
      } catch (error) {}
    };

    fetchUserData();
  }, [userData.email]);

  return (
    <ProfilePicContext.Provider value={profileImage}>
      {children}
    </ProfilePicContext.Provider>
  );
};
