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

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    ifEmptyThrowError(token, "Authorization token is required");

    const unAuthRes = () => {
      return res.status(StatusCode.Unauthorized).send(
        responseBuilder({
          statusCode: StatusCode.Unauthorized,
          message: ResponseMessage.FailAuth,
        })
      );
    };

    const splitted = tokenSplitter(token);
    if (!splitted) unAuthRes();
    const decodedToken = jwt.decode(splitted[1]);
    const user = await userDa.findUserCredential({ _id: decodedToken.id });

    if (!isEmpty(user)) {
      return verifyJwt(
        splitted[1],
        user.secretUuid,
        async (decodedToken, errorToken) => {
          if (errorToken) return unAuthRes();
          if (decodedToken) {
            req.user = {
              userId: `${user.id}`,
              username: user.username,
            };
            return next();
          }
        }
      );
    }
    return unAuthRes();
  } catch (e) {
    responseWithError(res, e, StatusCode.BadRequest);
  }
};

module.exports = auth;
