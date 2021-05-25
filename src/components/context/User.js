import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(user => {
        const { attributes } = user;
        setUserData(attributes);
        setLoggedIn(true);
        console.log(typeof user);
      })
      .catch(() => {
        // Returns error 'The user is not authenticated'
        setUserData(null);
        setLoggedIn(false);
      });
  }, []);

  const values = { userData, loggedIn, setUserData, setLoggedIn };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
