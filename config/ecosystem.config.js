const config = require("./index");

module.exports = {
  apps: [
    {
      name: "webservice",
      script: `${config.rootPath}/drivers/web`,
      instances: 1,
      autorestart: true,
      watch: true,
      ignore_watch: [`${config.rootPath}/logs`],
      watch_options: {
        followSymlinks: false,
      },
      log_file: `${config.rootPath}/logs/pm2/webservice.log`,
    },
    {
      name: "grpc",
      script: `${config.rootPath}/drivers/grpc`,
      instances: 1,
      autorestart: true,
      watch: true,
      ignore_watch: [`${config.rootPath}/logs`],
      watch_options: {
        followSymlinks: false,
      },
      log_file: `${config.rootPath}/logs/pm2/grpc.log`,
    },
  ],
};
