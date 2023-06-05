import { createContext, useState } from "react";

export const ActionsPostContext = createContext();

export const ActionsPostProvider = ({ children }) => {
  const [showComments, setShowComments] = useState(false);

  return (
    <ActionsPostContext.Provider
      value={{
        showComments,
        setShowComments,
      }}
    >
      {children}
    </ActionsPostContext.Provider>
  );
};
