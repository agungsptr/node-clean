const Status = {
  Accepted: "Accepted",
  Inactive: "Inactive",
  Onprogress: "On Progress",
  Pending: "Pending",
  Rejected: "Rejected",
};

const ErrorMessage = {
  AccessDenied: "Access Denied",
  SomethingWentWrong: "Something went wrong",
};

const StatusCode = {
  InternalServerError: 500,
  Conflict: 409,
  NotFound: 404,
  Forbidden: 403,
  Unauthorized: 401,
  BadRequest: 400,
  OK: 200,
};

const ResponseMessage = {
  Loaded: "Data success loaded",
  Added: "Data success added",
  Updated: "Data success updated",
  Removed: "Data success removed",
  AuthSuccess: "Successfully authenticated",
  FailLoaded: "Data failed to loaded",
  FailAdded: "Data failed to added",
  FailUpdated: "Data failed to updated",
  FailRemoved: "Data failed to removed",
  FailAuth: "Failed to authenticate",
  LoggedOut: "Successfully logged out",
};

module.exports = {
  Status,
  ErrorMessage,
  StatusCode,
  ResponseMessage,
};
