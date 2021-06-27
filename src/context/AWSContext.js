import React from "react";
import { unstable_batchedUpdates } from "react-dom";
import { Auth, Storage } from "aws-amplify";
import { useHistory } from "react-router-dom";

export const AWSContext = React.createContext();

export const AWSProvider = ({ children }) => {
  const [loading, setLoading] = React.useState(true);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [cognitoUser, setCognitoUser] = React.useState(null);
  const [profileImage, setProfileImage] = React.useState(null);
  const history = useHistory();

  const signOut = async () => {
    Auth.signOut()
      .then(() => {
        setLoggedIn(false);
        setCognitoUser(null);
      })
      .catch(console.error);
  };

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
      console.log("Error signing in user");
      console.error(error);
      throw error;
    }
  };

  const createNewPassword = async ({ password, organisation }) => {
    Auth.completeNewPassword(cognitoUser, password, {
      "custom:organisation": organisation,
    })
      .then(() => checkAuthenticatedUser())
      .catch(error => {
        console.error("change pw error", error);
        throw error;
      });
  };

  const updateUserProfileDetails = async ({ address, about, location }) => {
    Auth.updateUserAttributes(cognitoUser, {
      address,
      "custom:about": about,
      "custom:location": location,
    })
      .then(() => {
        console.log("User Profile updated");
        checkAuthenticatedUser();
        fetchProfileImage();
      })
      .catch(error => {
        throw error;
      });
  };

  const checkAuthenticatedUser = async () => {
    try {
      console.log("Checking for Authenticated user data");
      const user = await Auth.currentAuthenticatedUser();
      console.log("Authencticated user data found");
      unstable_batchedUpdates(() => {
        setLoading(false);
        setLoggedIn(true);
        setCognitoUser(user);
      });
    } catch (error) {
      console.log("Authenticated user data not found");
    }
  };

  const uploadImage = async ({ file, path, newName = "", level = "public" }) => {
    let name = newName || file.name;
    let contentType = `image/${file.name.split(".").pop()}`; // Get extension to store as content-type

    let destPath = path ? name : path + name;
    await Storage.put(destPath, file, { level, contentType });
  };

  const fetchProfileImage = async () => {
    console.log("Fetching user profile image");
    Storage.get("profile", { expires: 60, level: "protected" }).then(image =>
      setProfileImage(image)
    );
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

  // Fetch user data from LocalStorage
  React.useEffect(() => {
    if (loggedIn) {
      fetchProfileImage();
    }
    // This isn't right but it's a lot better
    if (!loggedIn) {
      checkAuthenticatedUser();
    }
  }, [loggedIn]);

  const values = {
    loading,
    loggedIn,
    cognitoUser,
    profileImage,
    signIn,
    signOut,
    createNewPassword,
    updateUserProfileDetails,
    uploadImage,
    fetchProfileImage,
    fetchSeedImages,
  };

  return <AWSContext.Provider value={values}>{children}</AWSContext.Provider>;
};

export const useAws = () => {
  const context = React.useContext(AWSContext);
  return { ...context };
};
