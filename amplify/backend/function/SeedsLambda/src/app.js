const AWS = require("aws-sdk");
var awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
var bodyParser = require("body-parser");
var express = require("express");
const { v4: uuidv4 } = require("uuid");

AWS.config.update({ region: process.env.TABLE_REGION });

const db = new AWS.DynamoDB.DocumentClient();

let tableName = "WattleSeeds";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + "-" + process.env.ENV;
}

// declare a new express app
var app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

// Get the users unique cognito pool identifier sub
const getUserId = req => {
  try {
    const reqContext = req.apiGateway.event.requestContext;
    const authProvider = reqContext.identity.cognitoAuthenticationProvider;
    return authProvider ? authProvider.split(":CognitoSignIn:").pop() : "UNAUTH";
  } catch (error) {
    console.log("Error - getUserId():", error);
    return "UNAUTH";
  }
};

/**
 * @desc    Fetch all seed entries
 * @route   GET /seeds
 * @access  Public
 */
app.get("/seeds", async function (req, res) {
  const params = {
    TableName: tableName,
  };

  try {
    const result = await db.scan(params).promise();
    res.json({
      statusCode: 200,
      url: req.url,
      body: JSON.stringify(result.Items),
    });
  } catch (error) {
    res.json({
      statusCode: 500,
      error: error.message,
    });
  }
});

/**
 * @desc    Fetch seed entry using Primary Key (PK + SK)
 * @route   GET /seeds/:entry_id/:type
 * @access  Public
 */
app.get("/seeds/:entry_id/:type", async function (req, res) {
  const { entry_id, type } = req.params;

  if (!entry_id || !type) {
    res.json({
      statusCode: 400,
      error: "entry_id and type is required to make this request.",
    });
  }

  const params = {
    TableName: tableName,
    Key: {
      entry_id,
      type,
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
    res.json({
      statusCode: 500,
      error: error.message,
    });
  }
});

/**
 * @desc    Add seed entry to dynamodb
 * @route   POST /seeds
 * @access  Private
 */
app.post("/seeds", async function (req, res) {
  const timestamp = new Date().toISOString();
  const params = {
    TableName: tableName,
    Item: {
      ...req.body,
      entry_id: uuidv4(),
      createdAt: timestamp,
      updatedAt: timestamp,
      school_id: getUserId(req),
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
    console.log("Add Seeds Entry Error:", error);
    res.json({
      statusCode: 500,
      error: error.message,
      url: req.url,
    });
  }
});

/**
 * @desc    Update seed entry using Primary Key (PK + SK)
 * @route   PUT /seeds/:entry_id/:type
 * @access  Private
 */
app.put(`/seeds/:entry_id/:type`, async function (req, res) {
  const { entry_id, type } = req.params;
  const Attributes = { ...req.body };

  if (!entry_id) {
    res.json({
      statusCode: 400,
      error: "entry_id is required to make this request.",
    });
  }

  const timestamp = new Date().toISOString();

  let params = {
    TableName: tableName,
    Key: {
      entry_id,
      type,
    },
    UpdateExpression: "SET ", // Start of update expression before dynamic population
    ExpressionAttributeNames: {},
    ExpressionAttributeValues: {},
    ReturnValues: "UPDATED_NEW", // Return updated attributes in result response
  };

  if (type) {
    params.UpdateExpression += `#${type} = :${type}, `;
    params.ExpressionAttributeNames[`#${type}`] = type; // Type is a dynamodb reserved keyword
    params.ExpressionAttributeValues[`:${type}`] = type;
  }
  for (const attr in Attributes) {
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
      body: `Updated seed entry ${entry_id} with ${result}`,
    });
  } catch (error) {
    res.json({
      statusCode: 500,
      error: error.message,
      url: req.url,
    });
  }
});

/**
 * @desc    Delete seed entry using Primary Key (PK + SK)
 * @route   DELETE /seeds/:entry_id/:type
 * @access  Private
 */
app.delete("/seeds/:entry_id/:type", async function (req, res) {
  const { entry_id, type } = req.params;

  if (!entry_id) {
    res.json({
      statusCode: 400,
      error: "entry_id is required to make this request.",
    });
  }

  const params = {
    TableName: tableName,
    Key: {
      entry_id,
      type,
    },
  };

  try {
    const result = await db.delete(params).promise();
    res.json({
      statusCode: 200,
      url: req.url,
      body: `Deleted seed entry ${entry_id}`,
    });
  } catch (error) {
    console.log("Delete Seed Entry Error:", error);
    res.json({
      statusCode: 500,
      error: error.message,
      url: req.url,
    });
  }
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
