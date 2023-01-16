const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const packageDefinition = protoLoader.loadSync(`${__dirname}/app.proto`);

module.exports = grpc.loadPackageDefinition(packageDefinition);
