import React, { useState } from "react";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({ username: "TEST" });
  const [loggedIn, setLoggedIn] = useState(false);

  const values = { userData, loggedIn, setUserData, setLoggedIn };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
