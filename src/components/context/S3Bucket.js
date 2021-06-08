import React, { useState, useEffect } from "react";
import { Storage } from "aws-amplify";

export const S3BucketContext = React.createContext();

export const S3BucketProvider = ({ children }) => {
  const [seedImages, setSeedImages] = useState([]);
  const [profileImage, setProfileImage] = useState(null);

  /**
   * Upload image controller to S3 Bucket
   * @param {File} file Image file blob
   * @param {String} path Folder path in S3 Bucket e.g. public/
   * @param {String} level S3 bucket resource level e.g. public, private
   * @returns {Object} Key for filename e.g. { key: "Capture2.PNG" }
   *
   * Refer to https://docs.amplify.aws/lib/storage/upload/q/platform/js#amazon-s3-bucket-cors-policy-setup
   * for upload folder levels e.g. public, private, protected
   *
   * Refer to https://docs.amplify.aws/lib/storage/getting-started/q/platform/js#using-amazon-s3
   * for public, private, protected explanation.
   * Protected and Private are tied to the authenticated users cognito identity sub
   *
   * NOTE: The 'sub' value used in the object key is not the user's sub value in the User Pool, it is the
   * identity id associated with the user in the Identity Pool.
   *
   * Default level is public, you can specify folders within public/ and only authenticated users have
   * write permissions to it as per IAM role amplify-seedsinspace-dev-192500-authRole inline policies.
   */
  const uploadImage = async ({ file, path, level = "public" }) => {
    let destPath = path ? file.name : path + file.name;
    await Storage.put(destPath, file, {
      level,
    });
  };

  const fetchProfileImage = async ({ path, level }) => {
    const profileImageURL = await Storage.get(path, { expires: 60, level });
    return profileImageURL;
    //setProfileImage(profileImageURL);
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
    setSeedImages(seedImages); // Array of objects
  };

  useEffect(() => {}, []);

  const values = {
    seedImages,
    profileImage,
    setSeedImages,
    setProfileImage,
    fetchSeedImages,
    fetchProfileImage,
    uploadImage,
  };

  return <S3BucketContext.Provider value={values}>{children}</S3BucketContext.Provider>;
};
