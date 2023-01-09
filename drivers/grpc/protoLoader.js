const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const path = `${__dirname}/app.proto`;
const packageDefinition = protoLoader.loadSync(path);

module.exports = grpc.loadPackageDefinition(packageDefinition);
