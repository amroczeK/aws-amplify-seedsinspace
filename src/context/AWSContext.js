import React, { createContext, useEffect, useState, useContext, useRef } from "react";
import { unstable_batchedUpdates } from "react-dom";
import { Auth, Storage } from "aws-amplify";
import { useHistory } from "react-router-dom";

export const AWSContext = createContext();

export const fetchS3 = async ({ path, level }) => {
  const result = await Storage.get(path, { expires: 60, level });
  return result;
};

const uploadImage = async ({ file, path, newName = "", level = "public" }) => {
  let name = newName || file.name;
  let contentType = `image/${file.name.split(".").pop()}`; // Get extension to store as content-type

  let destPath = path ? name : path + name;
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
        return user;
      } else {
        unstable_batchedUpdates(() => {
          setLoading(false);
          setCognitoUser(user);
        });
        return { user: user };
      }
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const createNewPassword = async ({ password, organisation }) => {
    try {
      await Auth.completeNewPassword(tempUser.current, password, {
        "custom:organisation": organisation,
      });

      await checkAuthenticatedUser();
      return Promise.resolve(); // Maybe return the user here
    } catch (error) {
      console.error("change pw error", error);
      throw error;
    }
  };

  const updateCognitoUser = async ({ address, about, location }) => {
    Auth.updateUserAttributes(cognitoUser, {
      address,
      "custom:about": about,
      "custom:location": location,
    })
      .then(() => {
        console.log("User Profile updated");
        checkAuthenticatedUser();
      })
      .catch(error => {
        throw error;
      });
  };

  const checkAuthenticatedUser = async () => {
    Auth.currentAuthenticatedUser()
      .then(user => {
        unstable_batchedUpdates(() => {
          setLoading(false);
          setCognitoUser(user);
        });
      })
      .catch(console.log)
      .finally(setLoading(false));
  };

  const values = {
    loading,
    setLoading,
    cognitoUser,
    signIn,
    signOut,
    createNewPassword,
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
