import React, { createContext, useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import auth from "../components/firebase";
import { database } from "../components/firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userFullName, setUserFullName] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email } = user;
        const usersRef = ref(database, "users");
        get(usersRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              const usersData = snapshot.val();
              const userId = Object.keys(usersData).find(
                (key) => usersData[key].email === email
              );
              if (userId) {
                const userRef = ref(database, `users/${userId}`);
                get(userRef)
                  .then((userSnapshot) => {
                    if (userSnapshot.exists()) {
                      const userData = userSnapshot.val();
                      const { fName, lName } = userData;
                      setUserFullName(`${fName} ${lName}`);
                    }
                  })
                  .catch((error) => {});
              }
            }
          })
          .catch((error) => {});
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={userFullName}>{children}</AuthContext.Provider>
  );
};
