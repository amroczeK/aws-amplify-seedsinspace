import { API } from "aws-amplify";

/**
 * Function to retrieve all existing schools entries using PK
 * @returns result response
 */
export const getAllSchools = async () => {
  try {
    const data = await API.get("SeedsAPI", "/schools", {});
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * Function to retrieve all existing seed entries using PK: entry_id and SK: type which are mandatory
 * @param {Object} req Object of attributes e.g. { entry_id: "123", type: "Earth" }
 * @returns result response
 */
export const getAllSeeds = async () => {
  try {
    const data = await API.get("SeedsAPI", "/seeds", {});
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * Function to retrieve a singular existing seed entry using PK: entry_id and SK: type which are mandatory
 * @param {Object} req Object of attributes e.g. { entry_id: "123", type: "Earth" }
 * @returns result response
 */
export const getSeedById = async req => {
  let { entry_id, type } = req;

  try {
    const data = await API.get("SeedsAPI", `/seeds/${entry_id}/${type}`, {});
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * Function to add new seed entry using PK: entry_id and SK: type which are mandatory
 * @param {Object} req Object of attributes e.g. { entry_id: "123", type: "Earth" }
 * @returns result response
 */
export const addSeedEntry = async req => {
  try {
    const data = await API.post("SeedsAPI", "/seeds", {
      body: {
        ...req,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * Function to update existing seed entry using PK: entry_id and SK: type which are mandatory
 * @param {Object} req Object of attributes e.g. { entry_id: "123", type: "Earth", height: 2 }
 * @returns result response
 */
export const updateSeedEntry = async req => {
  const { entry_id, type, ...Attributes } = req;
  try {
    const data = await API.put("SeedsAPI", `/seeds/${entry_id}/${type}`, {
      body: {
        ...Attributes,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * Function to delete existing seed entry using PK: entry_id and SK: type which are mandatory
 * @param {Object} req Object of attributes e.g. { entry_id: "123", type: "Earth" }
 * @returns result response
 */
export const deleteSeedEntry = async req => {
  let { entry_id, type } = req;
  try {
    const data = await API.del("SeedsAPI", `/seeds/${entry_id}/${type}`, {});
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
