import React, { useEffect, useState, useContext, createContext } from "react";
import { collection, doc, onSnapshot } from "firebase/firestore";
import LoadingDataContext from "./LoadingDataContext";
import { AuthContext } from "./AuthContext";
import { FriendDataContext } from "./FriendDataContext";
import { firestore } from "../components/firebase";

export const PostsContext = createContext();

const PostsProvider = ({ children }) => {
  const [friends, setFriends] = useState([]);
  const [friendsPosts, setFriendsPosts] = useState([]);
  const [profilePosts, setProfilePosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const { setIsLoading } = useContext(LoadingDataContext);
  const userDataContext = useContext(AuthContext);
  const { friendData } = useContext(FriendDataContext);
  const userData = friendData ?? userDataContext;
  const [postsList, setPostsList] = useState([]);
  const [postType, setPostType] = useState("");

  useEffect(() => {
    setIsLoading(true);
    if (Object.keys(userDataContext).length) {
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
  }, [setIsLoading, userDataContext]);

  useEffect(() => {
    setIsLoading(true);
    friends.forEach((friend) => {
      onSnapshot(
        collection(firestore, "users", friend.senderId, "posts"),
        (snapshot) => {
          let friendPostsArray = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          friendPostsArray.forEach((post) => {
            setFriendsPosts((prev) => [
              ...prev,
              {
                imageUrlProfile: friend.Image,
                name: friend.name,
                email: friend.senderId,
                imageUrlPost: post.imageUrl,
                text: post.text,
                createdAt: post.createdAt,
                id: post.id,
              },
            ]);
          });
          setIsLoading(false);
        }
      );
    });
  }, [friends, setIsLoading]);

  useEffect(() => {
    setIsLoading(true);

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

    if (Object.keys(userDataContext).length) {
      onSnapshot(doc(firestore, "users", userData.email), (doc) => {
        if (doc.exists()) {
          const updatedPostSave = doc.data().postsSavedList;
          setSavedPosts(updatedPostSave);
        }
      });
    }
  }, [userData, userDataContext, setIsLoading]);

  useEffect(() => {
    let updatedPostsList = [];
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
      friendsPosts.forEach((post) => {
        updatedPostsList.push(post);
      });
    }
    if (postType === "profile" || postType === "home" || postType === "saved") {
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

    if (postType === "saved") {
      updatedPostsList = updatedPostsList.filter((post) =>
        savedPosts.includes(post.id)
      );
    }
    updatedPostsList = updatedPostsList?.sort(
      (post_1, post_2) => post_2.createdAt - post_1.createdAt
    );

    setPostsList(updatedPostsList);
  }, [
    friends,
    friendsPosts,
    postType,
    profilePosts,
    savedPosts,
    userData.Image,
    userData.email,
    userData.fullName,
  ]);

  return (
    <PostsContext.Provider value={{ postsList, setPostType, friends }}>
      {children}
    </PostsContext.Provider>
  );
};

export default PostsProvider;
