const grpc = require("@grpc/grpc-js");
const protoLoader = require("./protoLoader");
const config = require("../../config");

const client = new protoLoader.AppServices(
  `localhost:${config.GRPC_PORT}`,
  grpc.credentials.createInsecure()
);

client.userCreate(
  {
    firstName: "fulan",
    lastName: "bin fulan",
    username: "sifulan",
    password: "123456",
  },
  (err, res) => {
    console.log({
      error: err,
      result: res,
    });
  }
);

client.studentCreate(
  {
    name: "fulanah",
    age: 21,
    grade: 1,
    perfect: true,
    createdBy: {
      userId: "63bcea3635550f2cdc920c49",
      username: "agungsptr",
    },
  },
  (err, res) => {
    console.log({
      error: err,
      result: res,
    });
  }
);
