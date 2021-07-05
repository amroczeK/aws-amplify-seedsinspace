const AWS = require("aws-sdk");
const { getUserId } = require("../utils");
const db = new AWS.DynamoDB.DocumentClient();

let tableName = "SeedsInSpaceTable";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + "-" + process.env.ENV;
}

/**
 * @desc    Fetch all seed entries
 * @route   GET /seeds
 * @access  Public
 */
async function getAllSeeds(req, res) {
  const params = {
    TableName: tableName,
    // Specify which items in the results are returned.
    FilterExpression: "begins_with(Pk, :Pk)",
    // Define the expression attribute value, which are substitutes for the values you want to compare.
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html
    // '<ExpressionAttributeNameVariable>': 'STRING_VALUE',
    ExpressionAttributeValues: {
      ":Pk": `SCHOOL#`,
    },
    ExpressionAttributeNames: {
      "#Date": "Date",
    },
    // Set the projection expression, which are the attributes that you want.
    ProjectionExpression:
      "Pk, Sk, #Date, Height, Humidity, LeafColour, LeafCount, LeafLength, LeafWidth, PhLevel, StemLength, Temperature, WaterVolume, createdAt, updatedAt",
  };

  try {
    const result = await db.scan(params).promise();
    res.json({
      statusCode: 200,
      url: req.url,
      body: JSON.stringify(result.Items),
    });
  } catch (error) {
    console.log("GET /seeds - Error:", error);
    res.json({
      statusCode: 500,
      error: error.message,
    });
  }
}

/**
 * @desc    Fetch seed entry using Primary Key (PK + SK)
 * @route   GET /seeds/:Pk/:Sk
 * @example GET /seeds/dc2f0a31-7643-4bc1-baa1-fae03141a997/2021-06-27_Earth_Seed_1
 * @access  Public
 */
async function getSeed(req, res) {
  const { Pk, Sk } = req.params;

  if (!Pk || !Sk) {
    res.json({
      statusCode: 400,
      error: "Partition key and sort key is required to make this request.",
    });
  }

  const params = {
    TableName: tableName,
    Key: {
      Pk: `SCHOOL#${Pk}`,
      Sk: `SEED#${Sk}`,
    },
  };

  try {
    const result = await db.get(params).promise();
    res.json({
      statusCode: 200,
      url: req.url,
      body: JSON.stringify(result.Item),
    });
  } catch (error) {
    console.log("POST /seeds - Error:", error);
    res.json({
      statusCode: 500,
      error: error.message,
    });
  }
}

/**
 * @desc    Fetch all seed entries by the user or particular school
 * @route   GET /seeds/:Pk
 * @example GET /seeds/dc2f0a31-7643-4bc1-baa1-fae03141a997
 * @access  Public
 */
async function getUsersSeeds(req, res) {
  const { Pk } = req.params;

  if (!Pk) {
    res.json({
      statusCode: 400,
      error: "Partition key is required to make this request.",
    });
  }

  const params = {
    TableName: tableName,
    KeyConditionExpression: "Pk = :Pk",
    ExpressionAttributeValues: {
      ":Pk": "SCHOOL#" + Pk,
    },
  };

  try {
    const result = await db.query(params).promise();
    res.json({
      statusCode: 200,
      url: req.url,
      body: JSON.stringify(result.Items),
    });
  } catch (error) {
    console.log("GET /seeds/school - Error:", error);
    res.json({
      statusCode: 500,
      error: error.message,
    });
  }
}

/**
 * @desc    Fetch all seed entries for particular school and filter with sort key
 * @route   POST /seeds/:Pk/:Sk
 * @access  Public
 * @example POST /seeds/dc2f0a31-7643-4bc1-baa1-fae03141a997
 * @patterns Sort Key patterns: Begins_With year, year & month, date, date & type
 * @examples Sort key examples: 2021, 2021-05, 2021-05-11, 2021-05-11_Earth
 */
async function getSeedsByFilter(req, res) {
  const { Pk } = req.params;
  const { Sk } = req.body;

  if (!Pk || !Sk) {
    res.json({
      statusCode: 400,
      error: "Partition key and sort key is required to make this request.",
    });
  }

  const params = {
    TableName: tableName,
    KeyConditionExpression: "Pk = :Pk AND begins_with(Sk, :Sk)",
    ExpressionAttributeValues: {
      ":Pk": `SCHOOL#${Pk}`,
      ":Sk": `SEED#${Sk}`,
    },
  };

  try {
    const result = await db.query(params).promise();
    res.json({
      statusCode: 200,
      url: req.url,
      body: JSON.stringify(result.Items),
    });
  } catch (error) {
    console.log("GET /seeds/:Pk/:Sk - Error:", error);
    res.json({
      statusCode: 500,
      error: error.message,
    });
  }
}

/**
 * @desc    Add seed entry to dynamodb
 * @route   POST /seeds
 * @access  Private
 */
async function addSeed(req, res) {
  const timestamp = new Date().toISOString();
  const params = {
    TableName: tableName,
    Item: {
      Pk: "SCHOOL#" + getUserId(req),
      ...req.body,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  try {
    const result = await db.put(params).promise();
    res.json({
      statusCode: 200,
      url: req.url,
      body: JSON.stringify(params.Item),
    });
  } catch (error) {
    console.log("POST /seeds - Error:", error);
    res.json({
      statusCode: 500,
      error: error.message,
      url: req.url,
    });
  }
}

/**
 * @desc    Update seed entry using Primary Key (PK + SK)
 * @route   PUT /seeds/:Pk/:Sk
 * @access  Private
 */
async function updateSeed(req, res) {
  const { Pk, Sk } = req.params;
  const Attributes = { ...req.body };

  if (!Pk) {
    res.json({
      statusCode: 400,
      error: "Partition key is required to make this request.",
    });
  }

  const timestamp = new Date().toISOString();

  let params = {
    TableName: tableName,
    Key: {
      Pk: "SCHOOL#" + Pk,
      Sk: "SEED#" + Sk,
    },
    UpdateExpression: "SET ", // Start of update expression before dynamic population
    ExpressionAttributeNames: {},
    ExpressionAttributeValues: {},
    ReturnValues: "UPDATED_NEW", // Return updated attributes in result response
  };

  for (const attr in Attributes) {
    if (attr === "type") {
      params.UpdateExpression += `#${attr} = :${attr}, `;
      params.ExpressionAttributeNames[`#${attr}`] = attr; // Type is a dynamodb reserved keyword
      params.ExpressionAttributeValues[`:${attr}`] = attr;
    }
    params.UpdateExpression += `${attr} = :${attr}, `;
    params.ExpressionAttributeValues[`:${attr}`] = Attributes[attr];
  }
  params.UpdateExpression += "updatedAt = :updatedAt";
  params.ExpressionAttributeValues[":updatedAt"] = timestamp;

  try {
    const result = await db.update(params).promise();
    res.json({
      statusCode: 200,
      url: req.url,
      body: `Updated seed entry ${Pk}#${Sk} with ${result}`,
    });
  } catch (error) {
    console.log("PUT /seeds/:Pk/:Sk - Error:", error);
    res.json({
      statusCode: 500,
      error: error.message,
      url: req.url,
    });
  }
}

/**
 * @desc    Delete seed entry using Primary Key (PK + SK)
 * @route   DELETE /seeds/:Pk/:Sk
 * @access  Private
 */
async function deleteSeed(req, res) {
  const { Pk, Sk } = req.params;

  if (!Pk || !Sk) {
    res.json({
      statusCode: 400,
      error: "Partition key and sort key is required to make this request.",
    });
  }

  const params = {
    TableName: tableName,
    Key: {
      Pk,
      Sk,
    },
  };

  try {
    const result = await db.delete(params).promise();
    res.json({
      statusCode: 200,
      url: req.url,
      body: `Deleted seed entry ${Pk}`,
    });
  } catch (error) {
    console.log("DEL /seeds/:Pk/:Sk - Error:", error);
    res.json({
      statusCode: 500,
      error: error.message,
      url: req.url,
    });
  }
}

/**
 * @desc    Fetch all seed entries by type
 * @route   GET /seeds/:Type
 * @access  Public
 */
async function getAllSeedsByType(req, res) {
  console.log("getAllSeedsByType");
  const { Type } = req.params;

  if (!Type) {
    res.json({
      statusCode: 400,
      error: "Type is required to make this request.",
    });
  }

  const params = {
    TableName: tableName,
    IndexName: "TypeAndSkIndex",
    KeyConditionExpression: "#Type = :Type",
    ExpressionAttributeNames: {
      "#Type": "Type",
    },
    ExpressionAttributeValues: {
      ":Type": Type,
    },
  };
  console.log("getAllSeedsByType params:", params);

  try {
    const result = await db.query(params).promise();
    console.log("getAllSeedsByType:", result);
    res.json({
      statusCode: 200,
      url: req.url,
      body: JSON.stringify(result.Items),
    });
  } catch (error) {
    console.log("GET /seeds/:Type - Error:", error);
    res.json({
      statusCode: 500,
      error: error.message,
    });
  }
}

/**
 * @desc    Fetch all seed entries by type
 * @route   POST /seeds/:Type/:Sk
 * @access  Public
 */
async function getAllSeedsByTypeAndSortKey(req, res) {
  console.log("getAllSeedsByTypeAndSortKey");
  const { Type } = req.params;
  const { Sk } = req.body;

  if (!Type) {
    res.json({
      statusCode: 400,
      error: "Type and sort key is required to make this request.",
    });
  }

  const params = {
    TableName: tableName,
    IndexName: "TypeAndSkIndex",
    KeyConditionExpression: "#Type = :Type AND begins_with ( Sk , :Sk )",
    ExpressionAttributeNames: {
      "#Type": "Type",
    },
    ExpressionAttributeValues: {
      ":Type": Type,
      ":Sk": `SEED#${Sk}`,
    },
  };

  try {
    const result = await db.query(params).promise();
    res.json({
      statusCode: 200,
      url: req.url,
      body: JSON.stringify(result.Items),
    });
  } catch (error) {
    console.log("POST /seeds/:Type/:Sk - Error:", error);
    res.json({
      statusCode: 500,
      error: error.message,
    });
  }
}

module.exports = {
  getAllSeeds,
  getSeed,
  getSeedsByFilter,
  getUsersSeeds,
  addSeed,
  updateSeed,
  deleteSeed,
  getAllSeedsByType,
  getAllSeedsByTypeAndSortKey,
};
