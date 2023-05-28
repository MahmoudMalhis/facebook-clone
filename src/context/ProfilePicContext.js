import { doc, getDoc } from "firebase/firestore";
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
        const userDoc = await getDoc(doc(firestore, "users", userData.email));
        if (userDoc.exists()) {
          const profileData = userDoc.data();
          if (profileData.profilePicUrl) {
            setProfileImage({ profilePic: profileData.profilePicUrl });
          }
          if (profileData.imageUrl) {
            setProfileImage({ ...profileData, cover: profileData.imageUrl });
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [userData.email]);

  return (
    <ProfilePicContext.Provider value={profileImage}>
      {children}
    </ProfilePicContext.Provider>
  );
};
