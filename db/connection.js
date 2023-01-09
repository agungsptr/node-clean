const config = require("../config");
const mongoose = require("mongoose");

const username = config.mongo.MONGO_USER;
const password = config.mongo.MONGO_PW;
const dbName = config.mongo.MONGO_DBNAME;
const port = config.mongo.MONGO_PORT;
const host = config.mongo.MONGO_HOST;
const uri = `mongodb://${username}:${password}@${host}:${port}/${dbName}`;
mongoose.connect(uri);
mongoose.set("strictQuery", false);

/** Signal connection */
mongoose.connection
  .once("open", () => {
    if (!config.isTest) console.log("Database connection has been established");
  })
  .on("error", (error) => {
    if (!config.isTest) console.log("Unable connect to database: ", error);
  })
  .on("disconnected", () => {
    if (!config.isTest) console.log("Database connection disconnected");
  });

module.exports = mongoose;
