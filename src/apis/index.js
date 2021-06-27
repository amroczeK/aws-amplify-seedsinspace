import { API } from "aws-amplify";

const API_RESOURCE = "SeedsInSpaceAPI";
const seedsRoute = "/seeds";
const schoolsRoute = "/schools";

/**
 * Seed API requests
 */

/**
 * Function to retrieve all existing seed entries using PK: entry_id and SK: type which are mandatory
 * @returns result response
 */
export const getAllSeeds = async () => {
  try {
    const data = await API.get(API_RESOURCE, "/seeds", {});
    console.log("All seeds:", data)
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
    const data = await API.get(API_RESOURCE, `${seedsRoute}/${entry_id}/${type}`, {});
    console.log("Seed retrieved:", data)
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
  req = {};
  req.Date = "2021-06-27";
  req.Type = "Space";
  req.SeedNumber = 1;
  req.Height = 2;
  req.LeafCount = 2;
  req.LeafLength = 1;
  req.LeafWidth = 1;
  req.LeafColour = "Green";
  req.StemLength = 3;
  req.Temperature = 20;
  req.Humidity = 10;
  req.PhLevel = 5;
  req.WaterVolume = 100;
  const { SeedNumber, Date, Type, ...Attributes } = req;
  try {
    const data = await API.post(API_RESOURCE, `${seedsRoute}`, {
      body: {
        Sk: `SEED#${Date}_${Type}_Seed_${SeedNumber}`,
        Type,
        Date,
        ...Attributes,
      },
    });
    console.log("Seed added:", data)
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
    const data = await API.put(API_RESOURCE, `${seedsRoute}/${entry_id}/${type}`, {
      body: {
        ...Attributes,
      },
    });
    console.log("Seed updated:", data)
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
    const data = await API.del(API_RESOURCE, `${seedsRoute}/${entry_id}/${type}`, {});
    console.log("Seed deleted:", data)
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * School API requests
 */

/**
 * Function to retrieve all existing school entries
 * @returns result response
 */
export const getAllSchools = async () => {
  try {
    const data = await API.get(API_RESOURCE, schoolsRoute, {});
    console.log("Schools:", data)
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * Function to add new school entry
 * @param {Object} req Object of attributes e.g. { SchoolName: "ECC", Address: "1 Test St, WA 6164" }
 * @returns result response
 */
export const addSchoolEntry = async req => {
  try {
    req = {
      SchoolName: "Emmanuel Catholic College",
      Address: "22 Test St, WA 6164",
      Environment: "Greenhouse",
      Planting_Date: "2021-06-27",
    };
    const data = await API.post(API_RESOURCE, schoolsRoute, {
      body: {
        ...req,
      },
    });
    console.log("Added school:" data)
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * Function to update users school details
 * NOTE: You must provide the existing data and the updated data, otherwise other columns which aren't
 * being edited will be wiped.
 * @param {Object} req Object of attributes e.g. { SchoolName: "ECC", Address: "1 Test St, WA 6164" }
 * @returns result response
 */
export const updateSchoolDetails = async req => {
  try {
    req = {
      SchoolName: "Emmanuel Catholic College",
      Address: "22 Test St, WA 6164",
      Environment: "Greenhouse",
      Planting_Date: "2021-06-27",
    };
    const data = await API.post(API_RESOURCE, schoolsRoute, {
      body: {
        ...req,
      },
    });
    console.log("School updated:", data)
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
