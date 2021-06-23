import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { useLocation } from "react-router-dom";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const signUp = async formData => {
    const { email, password, address } = formData;
    try {
      await Auth.signUp({
        username: email,
        password,
        attributes: { email, address, "custom:organisation": organisation },
      });
    } catch (error) {
      throw error;
    }
  };

  const confirmSignUp = async formData => {
    const { email, authCode } = formData;
    try {
      await Auth.confirmSignUp(email, authCode);
    } catch (error) {
      throw error;
    }
  };

  const signIn = async ({ email, password }) => {
    var AmplifySetup = true;

    if (AmplifySetup) {
      try {
        await Auth.signIn(email, password);
      } catch (error) {
        throw error;
      }
    }
  };

  const signOut = async () => {
    try {
      await Auth.signOut();
      setLoggedIn(false);
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  const updateDetails = async formData => {
    const { address, about } = formData;
    try {
      await Auth.updateUserAttributes(user, {
        address,
        "custom:about": about,
      });
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(user => {
        const { attributes } = user;
        setUser(user);
        setLoggedIn(true);
        console.log(user);
      })
      .catch(() => {
        // Returns error 'The user is not authenticated'
        setUser(null);
        setLoggedIn(false);
      });
  }, []);

  const values = {
    user,
    loggedIn,
    setLoggedIn,
    signIn,
    signUp,
    confirmSignUp,
    signOut,
    updateDetails,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
