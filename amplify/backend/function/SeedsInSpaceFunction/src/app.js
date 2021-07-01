const AWS = require("aws-sdk");
var awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
var bodyParser = require("body-parser");
var express = require("express");
const { v4: uuidv4 } = require("uuid");

AWS.config.update({ region: process.env.TABLE_REGION });

const db = new AWS.DynamoDB.DocumentClient();

let tableName = "SeedsInSpaceTable";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + "-" + process.env.ENV;
}
const seedsRoute = "/seeds";
const schoolsRoute = "/schools";

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

// convert url string param to expected Type
const convertUrlType = (param, type) => {
  switch (type) {
    case "N":
      return Number.parseInt(param);
    default:
      return param;
  }
};
// params[sortKeyName] = convertUrlType(req.params[sortKeyName], sortKeyType);

/**
 * Seeds resource API routes
 */

/**
 * @desc    Fetch all seed entries
 * @route   GET /seeds
 * @access  Public
 */
app.get(seedsRoute, async function (req, res) {
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
    console.log("GET /seeds - Error:", error);
    res.json({
      statusCode: 500,
      error: error.message,
    });
  }
});

/**
 * @desc    Fetch all seed entries for a particular school
 * @route   GET /seeds/school/:Pk
 * @access  Public
 */
app.get(`${seedsRoute}/school/:Pk`, async function (req, res) {
  const { Pk } = req.params;

  if (!Pk) {
    res.json({
      statusCode: 400,
      error: "Partition key and sort key is required to make this request.",
    });
  }

  const params = {
    TableName: tableName,
    Key: {
      Pk,
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
    console.log("GET /seeds/school/:Pk - Error:", error);
    res.json({
      statusCode: 500,
      error: error.message,
    });
  }
});

/**
 * @desc    Fetch all seed entries by the user
 * @route   GET /seeds/school
 * @access  Public
 */
app.get(`${seedsRoute}/school`, async function (req, res) {
  const params = {
    TableName: tableName,
    KeyConditionExpression: "Pk = :Pk",
    ExpressionAttributeValues: {
      ":Pk": "SCHOOL#" + getUserId(req),
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
});

/**
 * @desc    Fetch all seed entries for particular school with sort key
 * @route   GET /seeds/school/:Pk/:Sk
 * @access  Public
 * @patterns Sort Key patterns: Begins_With year, year & month, date, date & type
 * @examples Sort key examples: 2021, 2021-05, 2021-05-11, 2021-05-11_Earth
 */
app.get(`${seedsRoute}/school/:Pk/:Sk`, async function (req, res) {
  const { Pk, Sk } = req.params;

  if (!Pk || !Sk) {
    res.json({
      statusCode: 400,
      error: "Partition key and sort key is required to make this request.",
    });
  }

  const params = {
    TableName: tableName,
    KeyConditionExpression: "Pk = :Pk AND begins_with ( Sk , :Sk )",
    ExpressionAttributeValues: {
      ":Pk": { S: Pk },
      ":Sk": { S: "SEED#" + Sk },
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
    console.log("GET /seeds/school/:Pk/:Sk - Error:", error);
    res.json({
      statusCode: 500,
      error: error.message,
    });
  }
});

/**
 * @desc    Fetch all seed entries for particular school with sort key
 * @route   GET /seeds/school/:Pk
 * @access  Public
 * @patterns Sort Key patterns: Begins_With year, year & month, date, date & type
 * @examples Sort key examples: 2021, 2021-05, 2021-05-11, 2021-05-11_Earth
 */
app.get(`${seedsRoute}/school/:Pk/:Sk`, async function (req, res) {
  const { Pk, Sk } = req.params;

  if (!Pk || !Sk) {
    res.json({
      statusCode: 400,
      error: "Partition key and sort key is required to make this request.",
    });
  }

  const params = {
    TableName: tableName,
    KeyConditionExpression: "Pk = :Pk AND begins_with ( Sk , :Sk )",
    ExpressionAttributeValues: {
      ":Pk": { S: Pk },
      ":Sk": { S: "SEED#" + Sk },
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
    console.log("GET /seeds/school/:Pk/:Sk - Error:", error);
    res.json({
      statusCode: 500,
      error: error.message,
    });
  }
});

/**
 * @desc    Fetch seed entry using Primary Key (PK + SK)
 * @route   GET /seeds/:Pk/:Sk
 * @access  Public
 */
app.get(`${seedsRoute}/:Pk/:Sk`, async function (req, res) {
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
});

/**
 * @desc    Add seed entry to dynamodb
 * @route   POST /seeds
 * @access  Private
 */
app.post(seedsRoute, async function (req, res) {
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
});

/**
 * @desc    Update seed entry using Primary Key (PK + SK)
 * @route   PUT /seeds/:entry_id/:type
 * @access  Private
 */
app.put(`${seedsRoute}/:Pk/:Sk`, async function (req, res) {
  const { Pk, Sk } = req.params;
  const Attributes = { ...req.body };

  if (!Pk) {
    res.json({
      statusCode: 400,
      error: "entry_id is required to make this request.",
    });
  }

  const timestamp = new Date().toISOString();

  let params = {
    TableName: tableName,
    Key: {
      Pk,
      Sk,
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
});

/**
 * @desc    Delete seed entry using Primary Key (PK + SK)
 * @route   DELETE /seeds/:Pk/:Sk
 * @access  Private
 */
app.delete(`${seedsRoute}/:Pk/:Sk`, async function (req, res) {
  const { Pk, Sk } = req.params;

  if (!Pk) {
    res.json({
      statusCode: 400,
      error: "entry_id is required to make this request.",
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
});

/**
 * Schools resource API routes
 */

/**
 * @desc    Fetch all schools entries
 * @route   GET /schools
 * @access  Public
 */
app.get(schoolsRoute, async function (req, res) {
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
});

/**
 * @desc    Add school entry to dynamodb
 * @route   POST /schools
 * @access  Private
 */
app.post(schoolsRoute, async function (req, res) {
  const timestamp = new Date().toISOString();
  const params = {
    TableName: tableName,
    Item: {
      Pk: "School",
      Sk: "SCHOOL#" + getUserId(req),
      createdAt: timestamp,
      updatedAt: timestamp,
      ...req.body,
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
    console.log("POST /schools - Error:", error);
    res.json({
      statusCode: 500,
      error: error.message,
      url: req.url,
    });
  }
});

/**
 * @desc    Update users schools details
 * @route   PUT /schools/details
 * @access  Private
 */
app.put(`${schoolsRoute}`, async function (req, res) {
  const Attributes = { ...req.body };

  const timestamp = new Date().toISOString();

  let params = {
    TableName: tableName,
    Key: {
      Pk: "School",
      Sk: "SCHOOL#" + getUserId(req),
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
      body: `Updated school entry with ${result}`,
    });
  } catch (error) {
    console.log("PUT /schools/details - Error:", error);
    res.json({
      statusCode: 500,
      error: error.message,
      url: req.url,
    });
  }
});

/**
 * Global Search Index routes
 */

/**
 * @desc    Fetch all seed entries by type
 * @route   GET /seeds/:Type
 * @access  Public
 */
app.get(`${seedsRoute}/:Type`, async function (req, res) {
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
    ExpressionAttributeValues: {
      ":Type": { S: Type },
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
    console.log("GET /seeds/:Type - Error:", error);
    res.json({
      statusCode: 500,
      error: error.message,
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
