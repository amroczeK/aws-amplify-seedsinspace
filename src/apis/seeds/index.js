import { API } from "aws-amplify";

const API_RESOURCE = "SeedsInSpaceAPI";

/**
 * @desc Function to retrieve all existing seed entries
 * @returns result response
 */
export const getAllSeeds = async () => {
  const { body, error } = await API.get(API_RESOURCE, "/seeds", {});
  if (error) {
    console.error(error);
    throw error;
  }
  return JSON.parse(body);
};

/**
 * @desc  Function to retrieve a singular seed entry using PK: sub and SK: seed entry name which are mandatory
 * @param {Object} req Object of attributes e.g. { Pk: sub, Sk: "2021-06-27_Earth_Seed_1" }
 * @example GET /seeds/dc2f0a31-7643-4bc1-baa1-fae03141a997/2021-06-27_Earth_Seed_1
 * @returns result response
 */
export const getSeed = async req => {
  let { Pk, Sk } = req;

  if (!Pk || !Sk)
    throw new Error("Partition key e.g. Cognito Users sub and a Sort Key is required.");

  const { body, error } = await API.get(API_RESOURCE, `/seeds/${Pk}/${Sk}`, {});
  if (error) {
    console.error(error);
    throw error;
  }
  return JSON.parse(body);
};

/**
 * @desc  Function to retrieve a singular existing seed entry using PK: sub and SK: seed entry name which are mandatory
 * @param {Object} req Object of attributes e.g. { Pk: sub, Sk: "2021-06-27_Earth_Seed_1" }
 * @example GET /seeds/dc2f0a31-7643-4bc1-baa1-fae03141a997/2021-06-27_Earth_Seed_1
 * @returns result response
 */
export const getUsersSeeds = async req => {
  let { Pk } = req;

  if (!Pk) throw new Error("Partition key e.g. Cognito Users sub is required.");

  const { body, error } = await API.get(API_RESOURCE, `/seeds/${Pk}`, {});
  if (error) {
    console.error(error);
    throw error;
  }
  return JSON.parse(body);
};

/**
 * @desc Function to retrieve users seeds on sort key filter
 * @param {Object} req Object of attributes e.g. { Pk: "sub", Sk: "2021-06-27_Earth" }
 * @example GET /seeds/dc2f0a31-7643-4bc1-baa1-fae03141a997/filter?Sk="2021-06-27_Earth"
 * @returns result response
 */
export const getSeedsByFilter = async req => {
  let { Pk, Sk } = req;

  if (!Pk || !Sk)
    throw new Error("Partition key e.g. Cognito Users sub and a Sort Key is required.");

  const { body, error } = await API.get(API_RESOURCE, `/seeds/${Pk}/filter`, {
    queryStringParameters: {
      Sk,
    },
  });
  if (error) {
    throw error;
  }
  return JSON.parse(body);
};

/**
 * @desc Function to add seed entry using PK: entry_id and SK: type which are mandatory
 * @param {Object} req Object of attributes e.g. { Pk: "sub", Sk: "2021-06-27_Seed_Earth_1" }
 * @returns result response
 */
export const addSeed = async req => {
  const { SeedNumber, Date, Type, ...Attributes } = req;

  const { body, error } = await API.post(API_RESOURCE, `/seeds`, {
    body: {
      Sk: `SEED#${Date}_${Type}_Seed_${SeedNumber}`,
      Type,
      Date,
      ...Attributes,
    },
  });
  if (error) {
    console.error(error);
    throw error;
  }
  return JSON.parse(body);
};

/**
 * @desc Function to update existing seed entry using PK: entry_id and SK: type which are mandatory
 * @param {Object} req Object of attributes e.g. { Pk: "123", Sk: "Sk", height: 2 }
 * @returns result response
 */
export const updateSeed = async req => {
  const { Pk, Sk, ...Attributes } = req;

  if (!Pk || Sk)
    throw new Error("Partition key e.g. Cognito Users sub and a Sort Key is required.");

  const { body, error } = await API.put(API_RESOURCE, `/seeds/${Pk}/${Sk}`, {
    body: {
      ...Attributes,
    },
  });
  if (error) {
    console.error(error);
    throw error;
  }
  return JSON.parse(body);
};

/**
 * @desc Function to delete existing seed entry using PK: entry_id and SK: type which are mandatory
 * @param {Object} req Object of attributes e.g. { entry_id: "123", type: "Earth" }
 * @returns result response
 */
export const deleteSeed = async req => {
  let { Pk, Sk } = req;

  if (!Pk || Sk)
    throw new Error("Partition key e.g. Cognito Users sub and a Sort Key is required.");

  const { body, error } = await API.del(API_RESOURCE, `/seeds/${Pk}/${Sk}`, {});
  if (error) {
    console.error(error);
    throw error;
  }
  return JSON.parse(body);
};

/**
 * @desc Function to retrieve all seeds by Type, or with Sort Key
 * @param {Object} req Object of attributes e.g. { Type: "Earth", Sk: "2021-01-02" }
 * @returns result response
 */
export const getSeedsByTypeAndSortKey = async req => {
  let { Type, Sk, Pk, startDate, endDate } = req;

  if (!Type) throw new Error("Seed type is required.");

  let queryStringParameters = {};
  if (Sk) queryStringParameters.Sk = Sk;
  if (Pk) queryStringParameters.Pk = Pk;
  if (startDate) queryStringParameters.startDate = startDate;
  if (endDate) queryStringParameters.endDate = endDate;

  const { body, error } = await API.get(API_RESOURCE, `/seeds/type/${Type}/filter`, {
    queryStringParameters,
  });

  if (error) {
    console.error(error);
    throw error;
  }
  return JSON.parse(body);
};
