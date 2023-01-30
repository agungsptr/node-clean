module.exports = {
  apps: [
    {
      name: "webservice",
      script: "drivers/web",
      instances: 2,
      autorestart: true,
      watch: true,
      ignore_watch: ["logs", "node_modules"],
      watch_options: {
        followSymlinks: false,
      },
      out_file: "logs/pm2/webservice-out.log",
      error_file: "logs/pm2/webservice-error.log",
    },
    {
      name: "grpc",
      script: "drivers/grpc",
      instances: 1,
      autorestart: true,
      watch: true,
      ignore_watch: ["logs", "node_modules"],
      watch_options: {
        followSymlinks: false,
      },
      out_file: "logs/pm2/grpc-out.log",
      error_file: "logs/pm2/grpc-error.log",
    },
  ],
};
