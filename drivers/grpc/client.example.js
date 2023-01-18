const grpc = require("@grpc/grpc-js");
const protoLoader = require("./protoLoader");
const config = require("../../config");

const client = new protoLoader.AppServices(
  `localhost:${config.GRPC_PORT}`,
  grpc.credentials.createInsecure()
);

client.userCreate(
  {
    first_name: "",
    last_name: "bin fulan",
    username: "",
    password: "123456",
  },
  (err, res) => {
    console.log({
      error: JSON.stringify(err),
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
    created_by: {
      user_id: "63bcea3635550f2cdc920c49",
      username: "agungsptr",
    },
  },
  (err, res) => {
    console.log({
      error: JSON.stringify(err),
      result: res,
    });
  }
);
