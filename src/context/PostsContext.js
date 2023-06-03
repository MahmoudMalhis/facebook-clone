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
        collection(firestore, "users", userDataContext.email, "friend"),
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
  }, [userData, userDataContext, setIsLoading]);

  useEffect(() => {
    const updatedPostsList = [];
    if (postType === "favorite") {
      friends.forEach((friend) => {
        if (friend.isFavorite) {
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
        }
      });
    }
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
    if (postType === "profile" || postType === "home") {
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
    }
    updatedPostsList.sort(
      (post_1, post_2) => post_2.createdAt - post_1.createdAt
    );
    setPostsList(updatedPostsList);
    console.table(updatedPostsList);
  }, [friends, profilePosts, userData, postType]);

  return (
    <PostsContext.Provider value={{ postsList, setPostType, friends }}>
      {children}
    </PostsContext.Provider>
  );
};

export default PostsProvider;
