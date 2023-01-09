const grpc = require("@grpc/grpc-js");
const protoLoader = require("./protoLoader");
const controllers = require("./controllers");
const config = require("../../config");

const getServer = () => {
  const server = new grpc.Server();
  server.addService(protoLoader.AppServices.service, {
    userCreate: controllers.users.create,
  });
  return server;
};

if (require.main === module) {
  const server = getServer();
  server.bindAsync(
    `0.0.0.0:${config.GRPC_PORT}`,
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
      console.log(`Server running at http://0.0.0.0:${config.GRPC_PORT}`);
      server.start();
    }
  );
}

module.exports = getServer;
