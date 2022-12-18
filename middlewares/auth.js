const { ifEmptyThrowError, isEmpty } = require("../commons/checks");
const { StatusCode, ResponseMessage } = require("../commons/constants");
const { responseWithError } = require("../commons/errors");
const {
  verifyJwt,
  responseBuilder,
  tokenSplitter,
} = require("../commons/utils");
const userDa = require("../data-access/users");
const jwt = require("jsonwebtoken");

const unAuthRes = (res) => {
  return res.status(StatusCode.Unauthorized).send(
    responseBuilder({
      statusCode: StatusCode.Unauthorized,
      message: ResponseMessage.FailAuth,
    })
  );
};

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    ifEmptyThrowError(token, "Authorization token is required");

    const splitted = tokenSplitter(token);
    if (!splitted) return unAuthRes(res);

    const decodedToken = jwt.decode(splitted[1]);
    const user = await userDa.findUserCredential({ _id: decodedToken.id });

    if (!isEmpty(user)) {
      return verifyJwt(splitted[1], user.secretUuid, (_, error) => {
        if (error) return unAuthRes(res);
        req.user = {
          userId: `${user.id}`,
          username: user.username,
        };
        return next();
      });
    }
    return unAuthRes(res);
  } catch (e) {
    responseWithError(res, e, StatusCode.BadRequest);
  }
};

module.exports = auth;
