import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [cognitoUser, setCognitoUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();

  const signIn = async ({ email, password }) => {
    try {
      const user = await Auth.signIn(email, password);
      setCognitoUser(user);

      if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
        history.push("/signup", { email });
      } else {
        setLoggedIn(true);
      }
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    Auth.signOut()
      .then(() => {
        setLoggedIn(false);
        setCognitoUser(null);
      })
      .catch(console.error);
  };

  const createNewPassword = async ({ password, organisation }) => {
    Auth.completeNewPassword(cognitoUser, password, {
      "custom:organisation": organisation,
    }).catch(error => {
      throw error;
    });
  };

  const updateUserProfileDetails = async ({ address, about }) => {
    Auth.updateUserAttributes(cognitoUser, {
      address,
      "custom:about": about,
    }).catch(error => {
      throw error;
    });
  };

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(user => {
        setCognitoUser(user);
        setLoggedIn(true);
        console.log(user);
      })
      .catch(console.error);
  }, []);

  const values = {
    cognitoUser,
    loggedIn,
    setLoggedIn,
    signIn,
    signOut,
    createNewPassword,
    updateUserProfileDetails,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
