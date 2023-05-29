import { doc, getDoc } from "firebase/firestore";
import React, { createContext, useEffect, useState, useContext } from "react";
import { firestore } from "../components/firebase";
import { AuthContext } from "./AuthContext";

export const FriendPicContext = createContext();

export const FriendPicProvider = ({ children }) => {
  const [friendImage, setFriendImage] = useState();
  const friendData = useContext(AuthContext);
  const email = "";

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await getDoc(doc(firestore, "users", email));
        if (userDoc.exists()) {
          setFriendImage({});
          const profileData = userDoc.data();
          if (profileData.profilePicUrl) {
            setFriendImage({ profilePic: profileData.profilePicUrl });
          }
          if (profileData.imageUrl) {
            setFriendImage({ ...profileData, cover: profileData.imageUrl });
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [email]);

  return (
    <FriendPicContext.Provider value={friendImage}>
      {children}
    </FriendPicContext.Provider>
  );
};
