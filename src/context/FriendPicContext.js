import { doc, getDoc } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { firestore } from "../components/firebase";

export const FriendPicContext = createContext();

export const FriendPicProvider = ({ children }) => {
  const [friendImage, setFriendImage] = useState();
  const [emailAddress, setEmailAddress] = useState(null);

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
      } catch (error) {}
    };

    fetchFriendImage();
  }, [emailAddress]);

  return (
    <FriendPicContext.Provider value={{ friendImage, setEmailAddress }}>
      {children}
    </FriendPicContext.Provider>
  );
};
