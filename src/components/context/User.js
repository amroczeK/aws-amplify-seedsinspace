import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const signUp = async formData => {
    const { email, password, organisation, address } = formData;
    console.log(formData);
    try {
      await Auth.signUp({
        username: email,
        password,
        attributes: { email, name: organisation, address },
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
        setLoggedIn(true);
      } catch (error) {
        throw error;
      }
    }
    console.log(`User email: ${email}, password: ${password}`);
  };

  const signOut = async () => {
    try {
      await Auth.signOut();
      setLoggedIn(false);
      setUserData(null);
    } catch (error) {
      console.log(error);
    }
  };

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

  const values = { userData, loggedIn, signIn, signUp, confirmSignUp, signOut };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
