import React, { createContext, useEffect, useState, useContext, useRef } from "react";
import { unstable_batchedUpdates } from "react-dom";
import { Auth, Storage } from "aws-amplify";
import { useHistory } from "react-router-dom";

export const AWSContext = createContext();

export const fetchS3 = async ({ path, level, identityId }) => {
  let config = {
    expires: 900, // 15 minutes
    level,
  };
  if (identityId) config.identityId = identityId;
  const result = await Storage.get(path, config);
  return result;
};

const uploadImage = async ({ file, path, filename, level = "public" }) => {
  let destPath = path ? path + filename : filename;
  let contentType = file.type;

  await Storage.put(destPath, file, { level, contentType });
};

const fetchSeedImages = async () => {
  let seedImageKeys = await Storage.list("/seed_images");
  // For security sign each key and give it a temp URL to be used
  // to render the images in our app
  seedImageKeys = await Promise.all(
    seedImageKeys.map(async ({ key, lastModified }) => {
      const signedURL = await Storage.get(key);
      // Remove file extension from filename e.g. key
      return { name: key.replace(/\.[^/.]+$/, ""), url: signedURL, lastModified }; // Return signed URL
    })
  );
  return seedImageKeys; // Array of objects
};

export const AWSProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [cognitoUser, setCognitoUser] = useState(null);
  const tempUser = useRef();
  const history = useHistory();

  useEffect(() => {
    // Fetch user data from LocalStorage
    if (!cognitoUser) {
      checkAuthenticatedUser();
    }
  }, [cognitoUser]);

  const signOut = async () => {
    Auth.signOut()
      .then(() => setCognitoUser(null))
      .then(() => history.push("/signin"))
      .catch(console.error);
  };

  const signIn = async ({ email, password }) => {
    try {
      setLoading(true);

      const user = await Auth.signIn(email, password);

      if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
        tempUser.current = user;
      }
      if (user.challengeName !== "NEW_PASSWORD_REQUIRED") {
        unstable_batchedUpdates(() => {
          setCognitoUser(user);
        });
      }

      setLoading(false);
      return user;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const createNewPassword = async ({ password, organisation }) => {
    try {
      await Auth.completeNewPassword(tempUser.current, password);

      await checkAuthenticatedUser();
      return Promise.resolve(); // Maybe return the user here
    } catch (error) {
      throw error;
    }
  };

  const changePassword = async ({ oldPassword, newPassword }) => {
    try {
      const result = await Auth.changePassword(cognitoUser, oldPassword, newPassword);

      await checkAuthenticatedUser();

      return result;
    } catch (error) {
      throw error;
    }
  };

  // Send confirmation code to user's email
  const forgotPassword = async ({ username }) => {
    try {
      const result = await Auth.forgotPassword(username);
      return result;
    } catch (error) {
      throw error;
    }
  };

  // Collect confirmation code and new password, then
  const forgotPasswordSubmit = async ({ username, code, newPassword }) => {
    try {
      const result = await Auth.forgotPasswordSubmit(username, code, newPassword);
      return result;
    } catch (error) {
      throw error;
    }
  };

  const updateCognitoUser = async ({ organisation, address, about, location }) => {
    let user = await Auth.currentAuthenticatedUser();
    await Auth.updateUserAttributes(user, {
      "custom:organisation": organisation,
      address,
      "custom:about": about,
      "custom:location": location,
    });
    checkAuthenticatedUser();
  };

  const checkAuthenticatedUser = async () => {
    Auth.currentAuthenticatedUser()
      .then(user => {
        setCognitoUser(user);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const values = {
    loading,
    setLoading,
    cognitoUser,
    signIn,
    signOut,
    createNewPassword,
    changePassword,
    forgotPassword,
    forgotPasswordSubmit,
    updateCognitoUser,
    uploadImage,
    fetchS3,
    fetchSeedImages,
    setCognitoUser,
    checkAuthenticatedUser,
  };

  return <AWSContext.Provider value={values}>{children}</AWSContext.Provider>;
};

export const useAws = () => {
  const context = useContext(AWSContext);

  return { ...context };
};
