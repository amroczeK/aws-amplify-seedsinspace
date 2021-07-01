import { API } from "aws-amplify";

const API_RESOURCE = "SeedsInSpaceAPI";

/**
 * @desc Function to retrieve all existing school entries
 * @returns result response
 */
export const getAllSchools = async () => {
  const { body, error } = await API.get(API_RESOURCE, `/schools`, {});
  if (error) {
    console.error(error);
    throw error;
  }
  console.log("Schools:", body);
  return JSON.parse(body);
};

/**
 * @desc  Function to add new school entry
 * @param {Object} req Object of attributes e.g. { SchoolName: "ECC", Address: "1 Test St, WA 6164" }
 * @returns result response
 */
export const addSchool = async req => {
  req = {
    SchoolName: "Emmanuel Catholic College",
    Address: "22 Test St, WA 6164",
    Environment: "Greenhouse",
    Planting_Date: "2021-06-27",
  };

  const { body, error } = await API.post(API_RESOURCE, `/schools`, {
    body: {
      ...req,
    },
  });
  if (error) {
    console.error(error);
    throw error;
  }
  console.log("Added school:", body);
  return JSON.parse(body);
};

/**
 * @desc  Function to update users school details
 * @param {Object} req Object of attributes e.g. { SchoolName: "ECC", Address: "1 Test St, WA 6164" }
 * @param {String} Sk Cognito users sub
 * @returns result response
 */
export const updateSchool = async (req, Sk) => {
  req = {
    SchoolName: "Emmanuel Catholic College3",
    //Address: "22 Test St, WA 6164",
    //Environment: "Greenhouse",
    //Planting_Date: "2021-06-27",
  };
  const { body, error } = await API.put(API_RESOURCE, `/schools/${Sk}`, {
    body: {
      ...req,
    },
  });
  if (error) {
    console.error(error);
    throw error;
  }
  console.log("School updated:", body);
  return JSON.parse(body);
};
