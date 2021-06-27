import React, { useState, useEffect, useContext } from "react";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { S3BucketContext } from "./S3Bucket";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [cognitoUser, setCognitoUser] = useState(null);
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
    console.log("changing pw for user", cognitoUser);
    Auth.completeNewPassword(cognitoUser, password, {
      "custom:organisation": organisation,
    })
      .then(() => checkUser())
      .catch(error => {
        console.log("change pw error", error);
        throw error;
      });
  };

  const updateUserProfileDetails = async ({ address, about, location }) => {
    Auth.updateUserAttributes(cognitoUser, {
      address: address || "",
      "custom:about": about || "",
      "custom:location": location || "",
    })
      .then(() => checkUser())
      .catch(error => {
        throw error;
      });
  };

  const checkUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();

      setCognitoUser(user);
      setLoggedIn(true);
    } catch (error) {
      console.error(`Error from checkUser ${error}`);
    }
  };

  useEffect(() => {
    checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

export const useProfile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const userContext = useContext(UserContext);
  const { fetchProfileImage } = useContext(S3BucketContext);

  useEffect(() => {
    fetchProfileImage({
      path: `profiles/${userContext?.cognitoUser?.username}_profile`,
      level: "public",
    })
      .then(imageUrl => {
        setProfileImage(imageUrl);
      })
      .catch(error => {
        console.log("fetchimage failed");
        console.error(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ...userContext, profileImage };
};
