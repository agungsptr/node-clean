const { ifEmptyThrowError, isEmpty } = require("../commons/checks");
const { StatusCode, ResponseMessage } = require("../commons/constants");
const { responseWithError } = require("../commons/errors");
const { verifyJwt, responseBuilder } = require("../commons/utils");
const userDa = require("../data-access/users");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    ifEmptyThrowError(token, "Authorization token is required");
    verifyJwt(token, async (decodedToken, errorToken) => {
      const unAuthRes = () => {
        return res.status(StatusCode.Unauthorized).send(
          responseBuilder({
            statusCode: StatusCode.Unauthorized,
            message: ResponseMessage.FailAuth,
          })
        );
      };
      if (errorToken) return unAuthRes();
      if (decodedToken) {
        const user = await userDa.findOne(decodedToken.id);
        if (isEmpty(user)) return unAuthRes();
        req.user = {
          userId: `${user.id}`,
          username: user.username,
        };
        return next();
      }
      return unAuthRes();
    });
  } catch (e) {
    responseWithError(res, e, StatusCode.BadRequest);
  }
};

module.exports = auth;
