require("dotenv").config();

module.exports = {
  APP_NAME: process.env.APP_NAME,
  APP_PORT: process.env.APP_PORT,
  NODE_ENV: process.env.NODE_ENV,
  mongo: {
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PW: process.env.MONGO_PW,
    MONGO_PORT: process.env.MONGO_PORT,
    MONGO_DBNAME: process.env.MONGO_DBNAME,
    MONGO_HOST: process.env.MONGO_HOST,
  },
  bcrypt: {
    salt: parseInt(process.env.BYCRYPT_SALT) || 10,
  },
  jwt: {
    secretKey: process.env.JWT_SECRET_KEY,
    expired: process.env.JWT_EXPIRED || "24h",
  },
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
  isTest: process.env.NODE_ENV === "test",
  rateLimit: parseInt(process.env.RATE_LIMIT) || 15,
  GRPC_PORT: process.env.GRPC_PORT,
};
