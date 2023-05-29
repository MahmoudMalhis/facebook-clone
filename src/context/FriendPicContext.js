import { doc, getDoc } from "firebase/firestore";
import React, { createContext, useEffect, useState, useContext } from "react";
import { firestore } from "../components/firebase";
import { AuthContext } from "./AuthContext";

export const FriendPicContext = createContext();

export const FriendPicProvider = ({ children }) => {
  const [friendImage, setFriendImage] = useState();
  const [emailAddress, setEmailAddress] = useState(null);

  console.log("emailAddress from FPicContext", emailAddress);

  useEffect(() => {
    const fetchFriendImage = async () => {
      try {
        const friendDoc = await getDoc(doc(firestore, "users", emailAddress));
        if (friendDoc.exists()) {
          setFriendImage({});
          const profileData = friendDoc.data();
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

    fetchFriendImage();
  }, [emailAddress]);

  return (
    <FriendPicContext.Provider value={{ friendImage, setEmailAddress }}>
      {children}
    </FriendPicContext.Provider>
  );
};
