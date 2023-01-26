const config = require("./index");

module.exports = {
  apps: [
    {
      name: "webservice",
      script: `${config.rootPath}/drivers/web`,
      instances: 1,
      autorestart: true,
      ignore_watch: ["logs"],
      watch_options: {
        followSymlinks: false,
      },
    },
    {
      name: "grpc",
      script: `${config.rootPath}/drivers/grpc`,
      instances: 1,
      autorestart: true,
      ignore_watch: ["logs"],
      watch_options: {
        followSymlinks: false,
      },
    },
  ],
};
