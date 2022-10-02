const fs = require("fs");
const config = require("../config");

fs.writeFileSync(
  "./build/dev/mongo-init.js",
  `
  db.createUser({
    user: "${config.mongo.MONGO_USER}",
    pwd: "${config.mongo.MONGO_PW}",
    roles: [
      {
        role: "readWrite",
        db: "${config.mongo.MONGO_DBNAME}",
      },
    ],
  });
  `
);
