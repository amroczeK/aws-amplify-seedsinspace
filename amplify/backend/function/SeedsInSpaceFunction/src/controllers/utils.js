const getUserId = req => {
  let sub, identityId;
  try {
    const reqContext = req.apiGateway.event.requestContext;
    if (reqContext.identity) {
      const authProvider = reqContext.identity.cognitoAuthenticationProvider;
      sub = authProvider ? authProvider.split(":CognitoSignIn:").pop() : null;
      identityId = reqContext.identity.cognitoIdentityId;
    }
    return { sub, identityId };
  } catch (error) {
    console.log("Error - getUserId():", error);
    return { sub, identityId };
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
