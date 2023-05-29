import { useState, useEffect, createContext } from "react";
import { get, ref } from "firebase/database";
import { database } from "../components/firebase";

export const FriendDataContext = createContext();

const FriendDataProvider = ({ children }) => {
  const [friendData, setFriendData] = useState();
  const [emailAddress, setEmailAddressForData] = useState(null);
  console.log("emailAddress from FDataContext", emailAddress);

  useEffect(() => {
    const fetchData = async () => {
      if (emailAddress) {
        try {
          const usersRef = ref(database, "users");
          const snapshot = await get(usersRef);
          if (snapshot.exists()) {
            const usersData = snapshot.val();
            const userId = Object.keys(usersData).find(
              (key) => usersData[key].email === emailAddress
            );
            if (userId) {
              const userRef = ref(database, `users/${userId}`);
              const userSnapshot = await get(userRef);
              if (userSnapshot.exists()) {
                const userData = userSnapshot.val();
                const {
                  fName,
                  lName,
                  email,
                  selectedMonth,
                  selectedDay,
                  selectedYear,
                  gender,
                } = userData;
                setFriendData({
                  fullName: `${fName} ${lName}`,
                  email: email,
                  selectedMonth: selectedMonth,
                  selectedDay: selectedDay,
                  selectedYear: selectedYear,
                  gender: gender,
                });
              }
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchData();
  }, [emailAddress]);

  return (
    <FriendDataContext.Provider value={{ friendData, setEmailAddressForData }}>
      {children}
    </FriendDataContext.Provider>
  );
};

export default FriendDataProvider;
