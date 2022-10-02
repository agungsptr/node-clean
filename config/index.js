require("dotenv").config();

module.exports = {
  APP_NAME: process.env.APP_NAME,
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  mongo: {
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PW: process.env.MONGO_PW,
    MONGO_PORT: process.env.MONGO_PORT,
    MONGO_DBNAME: process.env.MONGO_DBNAME,
    MONGO_HOST: process.env.MONGO_HOST,
  },
  bcrypt: {
    salt: 10,
  },
};
