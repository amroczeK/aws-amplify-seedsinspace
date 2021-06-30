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

module.exports = {
  getUserId,
  convertUrlType,
};
