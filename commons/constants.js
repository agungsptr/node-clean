const Status = {
  Accepted: "Accepted",
  Inactive: "Inactive",
  Onprogress: "On Progress",
  Pending: "Pending",
  Rejected: "Rejected",
};

const Error = {
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

module.exports = {
  Status,
  Error,
  StatusCode,
};
