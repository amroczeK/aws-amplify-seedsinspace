const AWS = require("aws-sdk");
var awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
var bodyParser = require("body-parser");
var express = require("express");
var app = express();
const setupRouting = require("./config/routing");
const { rateLimiter, speedLimiter } = require("./middleware");

AWS.config.update({ region: process.env.TABLE_REGION });

// declare a new express app
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

// For rate limiting per IP to all requests
app.set("trust proxy", 1);
app.use(rateLimiter);
app.use(speedLimiter);

setupRouting(app);

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
