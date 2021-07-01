const AWS = require("aws-sdk");
const { getUserId } = require("../utils");
const db = new AWS.DynamoDB.DocumentClient();

let tableName = "SeedsInSpaceTable";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + "-" + process.env.ENV;
}

/**
 * @desc    Get all schools entries
 * @route   GET /schools
 * @access  Public
 */
async function getAllSchools(req, res) {
  const params = {
    TableName: tableName,
    KeyConditionExpression: "Pk = :Pk",
    ExpressionAttributeValues: {
      ":Pk": "School",
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
    console.log("GET /schools - Error:", error);
    res.json({
      statusCode: 500,
      error: error.message,
    });
  }
}

/**
 * @desc    Add school entry to dynamodb
 * @route   POST /schools
 * @access  Private
 */
async function addSchool(req, res) {
  let sub = getUserId(req);

  if (!sub) {
    res.json({
      statusCode: 400,
      error: "Users sub is required to make this request.",
    });
  }

  const timestamp = new Date().toISOString();

  const params = {
    TableName: tableName,
    Item: {
      Pk: "School",
      Sk: "SCHOOL#" + sub,
      createdAt: timestamp,
      updatedAt: timestamp,
      ...req.body,
    },
  };

  try {
    const result = await db.put(params).promise();
    console.log("add school result", result);
    res.json({
      statusCode: 200,
      url: req.url,
      body: JSON.stringify(params.Item),
    });
  } catch (error) {
    console.log("POST /schools - Error:", error);
    res.json({
      statusCode: 500,
      error: error.message,
      url: req.url,
    });
  }
}

/**
 * @desc    Update users schools details
 * @route   PUT /schools/:Sk
 * @access  Private
 */
async function updateSchool(req, res) {
  const { Sk } = req.params;
  const Attributes = { ...req.body };

  if (!Sk) {
    res.json({
      statusCode: 400,
      error: "Sk is required to make this request.",
    });
  }

  const timestamp = new Date().toISOString();

  let params = {
    TableName: tableName,
    Key: {
      Pk: "School",
      Sk: "SCHOOL#" + Sk,
    },
    UpdateExpression: "SET ", // Start of update expression before dynamic population
    ExpressionAttributeNames: {},
    ExpressionAttributeValues: {},
    ReturnValues: "UPDATED_NEW", // Return updated attributes in result response
  };

  for (const attr in Attributes) {
    params.UpdateExpression += `#${attr} = :${attr}, `;
    params.ExpressionAttributeNames[`#${attr}`] = attr;
    params.ExpressionAttributeValues[`:${attr}`] = Attributes[attr];
  }
  params.UpdateExpression += "#updatedAt = :updatedAt";
  params.ExpressionAttributeNames[`#updatedAt`] = "updatedAt";
  params.ExpressionAttributeValues[":updatedAt"] = timestamp;

  try {
    const result = await db.update(params).promise();
    res.json({
      statusCode: 200,
      url: req.url,
      body: JSON.stringify(result),
    });
  } catch (error) {
    console.log("PUT /schools/details - Error:", error);
    res.json({
      statusCode: 500,
      error: error.message,
      url: req.url,
    });
  }
}

module.exports = {
  getAllSchools,
  addSchool,
  updateSchool,
};
