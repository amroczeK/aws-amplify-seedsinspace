import React, { useState } from "react";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [loggedIn, setLoggedIn] = useState(true);

  userData.username = "test"; // NOTE: DELETE THIS LATER

  return (
    <UserContext.Provider value={{ userData, loggedIn }}>
      {children}
    </UserContext.Provider>
  );
};
