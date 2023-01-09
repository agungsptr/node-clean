const grpc = require("@grpc/grpc-js");
const protoLoader = require("./protoLoader");

const client = new protoLoader.AppServices(
  "localhost:50051",
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
