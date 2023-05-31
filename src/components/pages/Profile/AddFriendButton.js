import { useState, useContext, useEffect } from "react";
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

const AddFriendButton = () => {
  const { email } = useParams();
  const [addedFriends, setAddedFriends] = useState([]);
  const [friendRequest, setFriendRequest] = useState([]);
  const [friendConfirm, setFriendConfirm] = useState([]);
  const { setIsLoading } = useContext(LoadingDataContext);
  const { friendData, setEmailAddressForData } = useContext(FriendDataContext);
  const userDatContext = useContext(AuthContext);
  const { friendImage, setEmailAddress } = useContext(FriendPicContext);
  const profileImage = useContext(ProfilePicContext);

  useEffect(() => {
    setEmailAddress(email);
    setEmailAddressForData(email);
  }, [email, setEmailAddress, setEmailAddressForData]);

  const handleConfirm = async () => {
    try {
      addDoc(collection(firestore, "users", userDatContext.email, "friend"), {
        senderId: friendData.email,
        name: friendData.fullName,
        Image: friendImage?.profilePicUrl || "",
      });

      addDoc(collection(firestore, "users", friendData.email, "friend"), {
        senderId: userDatContext.email,
        name: userDatContext.fullName,
        Image: profileImage.profilePicUrl,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddFriend = async () => {
    const requestData = {
      senderId: userDatContext.email,
      receiverId: friendData.email,
      time: new Date().getTime(),
      isFriendAdded: true,
    };

    const notificationData = {
      senderId: userDatContext.email,
      senderName: userDatContext.fullName,
      time: new Date().getTime(),
      isClicked: false,
    };

    const addedFriendData = {
      senderId: userDatContext.email,
      senderName: userDatContext.fullName,
      time: new Date().getTime(),
      approve: false,
    };

    try {
      await Promise.all([
        addDoc(
          collection(firestore, "users", userDatContext.email, "friendRequest"),
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
      console.log("Error adding friend:", error);
    }
  };

  useEffect(() => {
    try {
      setIsLoading(true);
      const unsubscribe = onSnapshot(
        collection(firestore, "users", userDatContext.email, "addedFriend"),
        (snapshot) => {
          const addedFriend = snapshot.docs.map((doc) => ({
            ...doc.data(),
          }));
          setIsLoading(false);
          setAddedFriends(addedFriend);
        }
      );

      const added = onSnapshot(
        collection(firestore, "users", userDatContext.email, "friendRequest"),
        (snapshot) => {
          const addedFriend = snapshot.docs.map((doc) => ({
            ...doc.data(),
          }));
          setIsLoading(false);
          setFriendRequest(addedFriend);
        }
      );

      const confirm = onSnapshot(
        collection(firestore, "users", userDatContext.email, "friend"),
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
      console.log(error);
    }
  }, [userDatContext.email, setIsLoading]);

  let senderId;
  let friendAdd;
  let added;

  for (const friend of addedFriends) {
    if (friend.senderId === email) {
      senderId = friend;
      break;
    }
  }

  for (const friend of friendRequest) {
    if (friend.receiverId === email) {
      friendAdd = friend;
      break;
    }
  }

  for (const friend of friendConfirm) {
    if (friend.senderId === email) {
      added = friend;
      break;
    }
  }

  return (
    <>
      {added ? (
        <AddFriend>
          <HowToRegIcon />
          <Typography marginLeft="5px">Friends</Typography>
        </AddFriend>
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
