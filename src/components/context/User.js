import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [cognitoUser, setCognitoUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();

  console.log("history", history);

  // NOTE: DELETE THIS WHEN DONE
  const signUp = async formData => {
    const { email, password, organisation, address } = formData;
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

  // NOTE: DO WE NEED THIS
  const confirmSignUp = async formData => {
    const { email, authCode } = formData;
    try {
      await Auth.confirmSignUp(email, authCode);
    } catch (error) {
      throw error;
    }
  };

  const signIn = async ({ email, password }) => {
    try {
      const user = await Auth.signIn(email, password);

      // We want to redirect new users (those with temporary passwords)
      // to the create account page.
      setCognitoUser(user);
      if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
        console.log(user.challengeName);
        console.log(user.challengeParam.userAttributes);
        history.push("/signup", { email });
      } else {
        history.push(window.location.pathname);
      }
    } catch (error) {
      throw error;
    }
  };

  const createNewPassword = async ({ password, organisation }) => {
    try {
      await Auth.completeNewPassword(cognitoUser, password, {
        "custom:organisation": organisation,
      });
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await Auth.signOut();
      setLoggedIn(false);
      setCognitoUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserProfileDetails = async formData => {
    const { address, about } = formData;
    try {
      await Auth.updateUserAttributes(cognitoUser, {
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
        setCognitoUser(user);
        setLoggedIn(true);
        console.log(user);
      })
      .catch(error => {
        // Returns error 'The user is not authenticated'
        console.log(error);
        console.log("user", cognitoUser);
        // setCognitoUser(null);
        // setLoggedIn(false);
      });
  }, []);

  const values = {
    cognitoUser,
    loggedIn,
    setLoggedIn,
    signIn,
    signUp,
    confirmSignUp,
    signOut,
    createNewPassword,
    updateUserProfileDetails,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
