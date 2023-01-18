const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = `${__dirname}/app.proto`;
const packageDefinition = protoLoader.loadSync(path, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

module.exports = grpc.loadPackageDefinition(packageDefinition).app;
