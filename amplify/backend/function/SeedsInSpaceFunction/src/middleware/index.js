const rateLimit = require("express-rate-limit");
const slowDown = require("express-slow-down");

const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 20, // limit each IP to 20 requests per windowMs
});

const speedLimiter = slowDown({
  windowMs: 1 * 60 * 1000, // 1 minutes
  delayAfter: 10, // allow 10 requests per 1 minutes, then...
  delayMs: 500, // begin adding 500ms of delay per request above 10
});

const auth = async (req, res, next) => {
  try {
    const reqContext = req.apiGateway.event.requestContext;
    const authProvider = reqContext.identity.cognitoAuthenticationProvider;
    if (!authProvider) {
      return res.json({
        statusCode: 401,
        error: "You are unauthorized to make this request, please login.",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(`Error checking user: ${error}`);
    return res.json({
      statusCode: 500,
      error: `Error occured while making request: ${error}`,
    });
  }
};

module.exports = {
  auth,
  rateLimiter,
  speedLimiter,
};
