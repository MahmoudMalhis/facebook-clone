import React, { useEffect, useState, useContext, createContext } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import LoadingDataContext from "./LoadingDataContext";
import { AuthContext } from "./AuthContext";
import { FriendDataContext } from "./FriendDataContext";
import { firestore } from "../components/firebase";

export const PostsContext = createContext();

const PostsProvider = ({ children }) => {
  const [friends, setFriends] = useState([]);
  const [profilePosts, setProfilePosts] = useState([]);
  const { setIsLoading } = useContext(LoadingDataContext);
  const userDataContext = useContext(AuthContext);
  const { friendData } = useContext(FriendDataContext);
  const userData = friendData ?? userDataContext;
  const [postsList, setPostsList] = useState([]);
  const [postType, setPostType] = useState("");

  useEffect(() => {
    setIsLoading(true);
    if (Object.keys(userData).length) {
      onSnapshot(
        collection(firestore, "users", userData.email, "friend"),
        (snapshot) => {
          const updatedFriends = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setFriends(updatedFriends);
          setIsLoading(false);
        }
      );
    }

    if (Object.keys(userData).length) {
      onSnapshot(
        collection(firestore, "users", userData.email, "posts"),
        (snapshot) => {
          const updatedProfilePosts = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setProfilePosts(updatedProfilePosts);
          setIsLoading(false);
        }
      );
    }
  }, [userData, setIsLoading]);

  useEffect(() => {
    const updatedPostsList = [];
    if (postType === "home") {
      friends.forEach((friend) => {
        friend.posts.forEach((post) => {
          updatedPostsList.push({
            imageUrlProfile: friend.Image,
            name: friend.name,
            email: friend.senderId,
            imageUrlPost: post.imageUrl,
            text: post.text,
            createdAt: post.createdAt,
            id: post.id,
          });
        });
      });
    }
    profilePosts.forEach((post) => {
      updatedPostsList.push({
        imageUrlProfile: userData.Image,
        name: userData.fullName,
        email: userData.email,
        imageUrlPost: post.imageUrl,
        text: post.text,
        createdAt: post.createdAt,
        id: post.id,
      });
    });
    setPostsList(updatedPostsList);
    console.log(friends);
  }, [friends, profilePosts, userData, postType]);

  return (
    <PostsContext.Provider value={{ postsList, setPostType }}>
      {children}
    </PostsContext.Provider>
  );
};

export default PostsProvider;
