import { useState, useContext, useEffect, useRef } from "react";
import LoadingDataContext from "../../../context/LoadingDataContext";
import { FriendDataContext } from "../../../context/FriendDataContext";
import { AuthContext } from "../../../context/AuthContext";
import { FriendPicContext } from "../../../context/FriendPicContext";
import { ProfilePicContext } from "../../../context/ProfilePicContext";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../../firebase";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { AddFriend } from "./StyleProfile";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MenuProfile from "./Menu";
import { PostsContext } from "../../../context/PostsContext";

const AddFriendButton = () => {
  const { email } = useParams();
  const [addedFriends, setAddedFriends] = useState([]);
  const [friendRequest, setFriendRequest] = useState([]);
  const [friendConfirm, setFriendConfirm] = useState([]);
  const { setIsLoading } = useContext(LoadingDataContext);
  const { friendData, setEmailAddressForData } = useContext(FriendDataContext);
  const userDataContext = useContext(AuthContext);
  const { friendImage, setEmailAddress } = useContext(FriendPicContext);
  const profileImage = useContext(ProfilePicContext);

  useEffect(() => {
    setEmailAddress(email);
    setEmailAddressForData(email);
  }, [email, setEmailAddress, setEmailAddressForData]);

  const updatedPostsFriendRef = useRef([]);
  useEffect(() => {
    if (Object.keys(friendData).length) {
      const unsubscribe = onSnapshot(
        collection(firestore, "users", friendData.email, "posts/"),
        (snapshot) => {
          const updatedPosts = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          updatedPostsFriendRef.current = updatedPosts;
        }
      );
      return () => unsubscribe();
    }
  }, [friendData]);

  const updatedPostsUserRef = useRef([]);
  useEffect(() => {
    if (Object.keys(userDataContext).length) {
      const unsubscribe = onSnapshot(
        collection(firestore, "users", userDataContext.email, "posts/"),
        (snapshot) => {
          const updatedPosts = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          updatedPostsUserRef.current = updatedPosts;
        }
      );
      return () => unsubscribe();
    }
  }, [userDataContext]);

  const handleConfirm = async () => {
    try {
      addDoc(collection(firestore, "users", userDataContext.email, "friend"), {
        senderId: friendData.email,
        name: friendData.fullName,
        Image: friendImage?.profilePicUrl || "",
        posts: updatedPostsFriendRef.current,
        isFavorite: false,
      });

      addDoc(collection(firestore, "users", friendData.email, "friend"), {
        senderId: userDataContext.email,
        name: userDataContext.fullName,
        Image: profileImage.profilePicUrl || "",
        posts: updatedPostsUserRef.current,
        isFavorite: false,
      });
    } catch (error) {
    }
  };

  const handleAddFriend = async () => {
    const requestData = {
      senderId: userDataContext.email,
      receiverId: friendData.email,
      time: new Date().toLocaleTimeString(),
      isFriendAdded: true,
    };

    const notificationData = {
      senderId: userDataContext.email,
      senderName: userDataContext.fullName,
      senderAvatar: profileImage.profilePicUrl,
      time: new Date().toLocaleTimeString(),
      isClicked: false,
    };

    const addedFriendData = {
      senderId: userDataContext.email,
      senderName: userDataContext.fullName,
      time: new Date().getTime(),
      approve: false,
    };

    try {
      await Promise.all([
        addDoc(
          collection(
            firestore,
            "users",
            userDataContext.email,
            "friendRequest"
          ),
          requestData
        ),
        addDoc(
          collection(firestore, "users", friendData.email, "notifications"),
          notificationData
        ),
        addDoc(
          collection(firestore, "users", friendData.email, "addedFriend"),
          addedFriendData
        ),
      ]);
    } catch (error) {
    }
  };

  useEffect(() => {
    try {
      setIsLoading(true);
      const unsubscribe = onSnapshot(
        collection(firestore, "users", userDataContext.email, "addedFriend"),
        (snapshot) => {
          const addedFriend = snapshot.docs.map((doc) => ({
            ...doc.data(),
          }));
          setIsLoading(false);
          setAddedFriends(addedFriend);
        }
      );

      const added = onSnapshot(
        collection(firestore, "users", userDataContext.email, "friendRequest"),
        (snapshot) => {
          const addedFriend = snapshot.docs.map((doc) => ({
            ...doc.data(),
          }));
          setIsLoading(false);
          setFriendRequest(addedFriend);
        }
      );

      const confirm = onSnapshot(
        collection(firestore, "users", userDataContext.email, "friend"),
        (snapshot) => {
          const confirmFriend = snapshot.docs.map((doc) => ({
            ...doc.data(),
          }));
          setIsLoading(false);
          setFriendConfirm(confirmFriend);
        }
      );

      return () => {
        unsubscribe();
        added();
        confirm();
      };
    } catch (error) {
    }
  }, [userDataContext.email, setIsLoading]);

  const senderId = addedFriends.find((friend) => friend.senderId === email);
  const friendAdd = friendRequest.find((friend) => friend.receiverId === email);
  const added = friendConfirm.find((friend) => friend.senderId === email);

  return (
    <>
      {added ? (
        <MenuProfile />
      ) : senderId ? (
        <AddFriend onClick={handleConfirm}>
          <HowToRegIcon />
          <Typography marginLeft="5px">Confirm</Typography>
        </AddFriend>
      ) : friendAdd ? (
        <AddFriend>
          <GroupRemoveIcon />
          <Typography marginLeft="5px">Cancel request</Typography>
        </AddFriend>
      ) : (
        <AddFriend onClick={handleAddFriend}>
          <PersonAddIcon />
          <Typography marginLeft="5px">Add Friend</Typography>
        </AddFriend>
      )}
    </>
  );
};

export default AddFriendButton;
