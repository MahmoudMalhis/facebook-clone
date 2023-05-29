import { doc, getDoc } from "firebase/firestore";
import React, { createContext, useEffect, useState, useContext } from "react";
import { firestore } from "../components/firebase";
import { AuthContext } from "./AuthContext";
import { useParams } from "react-router-dom";

export const FriendPicContext = createContext();

export const FriendPicProvider = ({ children }) => {
  const [friendImage, setFriendImage] = useState();
  const email = useParams();

  useEffect(() => {
    const fetchFriendImage = async () => {
      try {
        const friendDoc = await getDoc(doc(firestore, "users", email));
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
  }, [email]);

  return (
    <FriendPicContext.Provider value={friendImage}>
      {children}
    </FriendPicContext.Provider>
  );
};
