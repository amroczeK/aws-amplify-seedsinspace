const rateLimit = require("express-rate-limit");

const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 3, // limit each IP to 50 requests per windowMs
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
  rateLimiter
};
