/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const AWS = require("aws-sdk");
var awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
var bodyParser = require("body-parser");
var express = require("express");
const { v4: uuidv4 } = require("uuid");

AWS.config.update({ region: process.env.TABLE_REGION });

const dynamodb = new AWS.DynamoDB.DocumentClient();

let tableName = "WattleSeeds";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + "-" + process.env.ENV;
}

const userIdPresent = false; // TODO: update in case is required to use that definition
const partitionKeyName = "entry_id";
const partitionKeyType = "S";
const sortKeyName = "type";
const sortKeyType = "S";
const hasSortKey = sortKeyName !== "";
const path = "/seeds";
const UNAUTH = "UNAUTH";
const hashKeyPath = "/:" + partitionKeyName;
const sortKeyPath = hasSortKey ? "/:" + sortKeyName : "";
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

app.get("/seeds", function (req, res) {
  const params = {
    TableName: tableName,
    limit: 100,
  };
  dynamodb.scan(params, (error, data) => {
    if (error) {
      console.log("DYNAMO DB SCAN ERROR:", error);
      res.json({
        statusCode: 500,
        error: error.message,
      });
    } else {
      console.log("DYNAMO DB SCAN RESP:", data);
      res.json({
        statusCode: 200,
        url: req.url,
        body: JSON.stringify(data.Items),
      });
    }
  });
});

app.get("/seeds/:id", function (req, res) {
  const params = {
    TableName: tableName,
    Keys: {
      id: req.params.id,
    },
  };
  dynamodb.get(params, (error, data) => {
    if (error) {
      res.json({
        statusCode: 500,
        error: error.message,
      });
    } else {
      res.json({
        statusCode: 200,
        url: req.url,
        body: JSON.stringify(data.Item),
      });
    }
  });
});

app.post("/seeds", function (req, res) {
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
  dynamodb.put(params, (error, data) => {
    if (error) {
      res.json({
        statusCode: 500,
        error: error.message,
        url: req.url,
      });
    } else {
      res.json({
        statusCode: 200,
        url: req.url,
        body: JSON.stringify(params.Item),
      });
    }
  });
});

// Add schema validation middleware later
app.put("/seeds", function (req, res) {
  const timestamp = new Date().toISOString();
  let params = {
    TableName: tableName,
    Key: {
      id: req.body.id,
    },
    ExpressionAttributeNames: { "#type": "type" },
    ExpressionAttributeValues: {},
    ReturnValues: "UPDATED_NEW",
  };
  params.UpdateExpression = "SET ";

  let {
    type,
    height,
    leaf_count,
    leaf_length,
    leaf_width,
    leaf_colour,
    stem_length,
    ph_level,
    water_volume,
    humidity,
    temperature,
  } = req.body;

  if (type) {
    params.ExpressionAttributeValues[":type"] = req.body.type;
    params.UpdateExpression += "#type = :type, ";
  }
  if (height) {
    params.ExpressionAttributeValues[":height"] = req.body.height;
    params.UpdateExpression += "#height = :height, ";
  }
  if (leaf_count) {
    params.ExpressionAttributeValues[":leaf_count"] = req.body.leaf_count;
    params.UpdateExpression += "#leaf_count = :leaf_count, ";
  }
  if (leaf_length) {
    params.ExpressionAttributeValues[":leaf_length"] = req.body.leaf_length;
    params.UpdateExpression += "#leaf_length = :leaf_length, ";
  }
  if (leaf_width) {
    params.ExpressionAttributeValues[":leaf_width"] = req.body.leaf_width;
    params.UpdateExpression += "#leaf_width = :leaf_width, ";
  }
  if (leaf_colour) {
    params.ExpressionAttributeValues[":leaf_colour"] = req.body.leaf_colour;
    params.UpdateExpression += "#leaf_colour = :leaf_colour, ";
  }
  if (stem_length) {
    params.ExpressionAttributeValues[":stem_length"] = req.body.stem_length;
    params.UpdateExpression += "#stem_length = :stem_length, ";
  }
  if (ph_level) {
    params.ExpressionAttributeValues[":ph_level"] = req.body.ph_level;
    params.UpdateExpression += "#ph_level = :ph_level, ";
  }
  if (water_volume) {
    params.ExpressionAttributeValues[":water_volume"] = req.body.water_volume;
    params.UpdateExpression += "#water_volume = :water_volume, ";
  }
  if (humidity) {
    params.ExpressionAttributeValues[":humidity"] = req.body.humidity;
    params.UpdateExpression += "#humidity = :humidity, ";
  }
  if (temperature) {
    params.ExpressionAttributeValues[":temperature"] = req.body.temperature;
    params.UpdateExpression += "#temperature = :temperature, ";
  }
  params.ExpressionAttributeValues[":updatedAt"] = timestamp;
  params.UpdateExpression += "#updatedAt = :updatedAt";

  dynamodb.update(params, (error, data) => {
    if (error) {
      res.json({
        statusCode: 500,
        error: error.message,
        url: req.url,
      });
    } else {
      res.json({
        statusCode: 200,
        url: req.url,
        body: JSON.stringify(params.Attributes),
      });
    }
  });
});

app.delete("/seeds/:id", function (req, res) {
  const params = {
    TableName: tableName,
    Key: {
      entry_id: req.params.id,
    },
  };
});

// // convert url string param to expected Type
// const convertUrlType = (param, type) => {
//   switch(type) {
//     case "N":
//       return Number.parseInt(param);
//     default:
//       return param;
//   }
// }

// /********************************
//  * HTTP Get method for list objects *
//  ********************************/

// app.get(path + hashKeyPath, function(req, res) {
//   var condition = {}
//   condition[partitionKeyName] = {
//     ComparisonOperator: 'EQ'
//   }

//   if (userIdPresent && req.apiGateway) {
//     condition[partitionKeyName]['AttributeValueList'] = [req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH ];
//   } else {
//     try {
//       condition[partitionKeyName]['AttributeValueList'] = [ convertUrlType(req.params[partitionKeyName], partitionKeyType) ];
//     } catch(err) {
//       res.statusCode = 500;
//       res.json({error: 'Wrong column type ' + err});
//     }
//   }

//   let queryParams = {
//     TableName: tableName,
//     KeyConditions: condition
//   }

//   dynamodb.query(queryParams, (err, data) => {
//     if (err) {
//       res.statusCode = 500;
//       res.json({error: 'Could not load items: ' + err});
//     } else {
//       res.json(data.Items);
//     }
//   });
// });

// /*****************************************
//  * HTTP Get method for get single object *
//  *****************************************/

// app.get(path + '/object' + hashKeyPath + sortKeyPath, function(req, res) {
//   var params = {};
//   if (userIdPresent && req.apiGateway) {
//     params[partitionKeyName] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
//   } else {
//     params[partitionKeyName] = req.params[partitionKeyName];
//     try {
//       params[partitionKeyName] = convertUrlType(req.params[partitionKeyName], partitionKeyType);
//     } catch(err) {
//       res.statusCode = 500;
//       res.json({error: 'Wrong column type ' + err});
//     }
//   }
//   if (hasSortKey) {
//     try {
//       params[sortKeyName] = convertUrlType(req.params[sortKeyName], sortKeyType);
//     } catch(err) {
//       res.statusCode = 500;
//       res.json({error: 'Wrong column type ' + err});
//     }
//   }

//   let getItemParams = {
//     TableName: tableName,
//     Key: params
//   }

//   dynamodb.get(getItemParams,(err, data) => {
//     if(err) {
//       res.statusCode = 500;
//       res.json({error: 'Could not load items: ' + err.message});
//     } else {
//       if (data.Item) {
//         res.json(data.Item);
//       } else {
//         res.json(data) ;
//       }
//     }
//   });
// });

// /************************************
// * HTTP put method for insert object *
// *************************************/

// app.put(path, function(req, res) {

//   if (userIdPresent) {
//     req.body['userId'] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
//   }

//   let putItemParams = {
//     TableName: tableName,
//     Item: req.body
//   }
//   dynamodb.put(putItemParams, (err, data) => {
//     if(err) {
//       res.statusCode = 500;
//       res.json({error: err, url: req.url, body: req.body});
//     } else{
//       res.json({success: 'put call succeed!', url: req.url, data: data})
//     }
//   });
// });

// /************************************
// * HTTP post method for insert object *
// *************************************/

// app.post(path, function(req, res) {

//   if (userIdPresent) {
//     req.body['userId'] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
//   }

//   let putItemParams = {
//     TableName: tableName,
//     Item: req.body
//   }
//   dynamodb.put(putItemParams, (err, data) => {
//     if(err) {
//       res.statusCode = 500;
//       res.json({error: err, url: req.url, body: req.body});
//     } else{
//       res.json({success: 'post call succeed!', url: req.url, data: data})
//     }
//   });
// });

// /**************************************
// * HTTP remove method to delete object *
// ***************************************/

// app.delete(path + '/object' + hashKeyPath + sortKeyPath, function(req, res) {
//   var params = {};
//   if (userIdPresent && req.apiGateway) {
//     params[partitionKeyName] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
//   } else {
//     params[partitionKeyName] = req.params[partitionKeyName];
//      try {
//       params[partitionKeyName] = convertUrlType(req.params[partitionKeyName], partitionKeyType);
//     } catch(err) {
//       res.statusCode = 500;
//       res.json({error: 'Wrong column type ' + err});
//     }
//   }
//   if (hasSortKey) {
//     try {
//       params[sortKeyName] = convertUrlType(req.params[sortKeyName], sortKeyType);
//     } catch(err) {
//       res.statusCode = 500;
//       res.json({error: 'Wrong column type ' + err});
//     }
//   }

//   let removeItemParams = {
//     TableName: tableName,
//     Key: params
//   }
//   dynamodb.delete(removeItemParams, (err, data)=> {
//     if(err) {
//       res.statusCode = 500;
//       res.json({error: err, url: req.url});
//     } else {
//       res.json({url: req.url, data: data});
//     }
//   });
// });

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
