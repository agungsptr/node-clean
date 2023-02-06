const grpc = require("@grpc/grpc-js");
const protoLoader = require("../protoLoader");
const config = require("../../../config");

const client = new protoLoader.App(
  `localhost:${config.GRPC_PORT}`,
  grpc.credentials.createInsecure()
);

const logger = (err, res) => {
  console.log({
    error: JSON.stringify(err),
    result: JSON.stringify(res),
  });
};

const clientExample = async () => {
  /** Create user */
  const user = await new Promise((resolve, reject) => {
    client.userCreate(
      {
        firstName: "fulan",
        lastName: "bin fulan",
        username: "sifulan1",
        password: "123456",
      },
      (err, res) => {
        logger(err, res);
        if (err) reject(err);
        resolve(res);
      }
    );
  });

  /** Find user by id */
  await new Promise((resolve, reject) => {
    client.userFindOne({ id: user.id }, (err, res) => {
      logger(err, res);
      if (err) reject(err);
      resolve(res);
    });
  });

  /** Find all users */
  await new Promise((resolve, reject) => {
    client.userFindAll(
      {
        fields: {
          page: { numberValue: 1 },
          limit: { numberValue: 2 },
          queries: {
            structValue: {
              fields: {
                firstName: { stringValue: user.firstName },
              },
            },
          },
        },
      },
      (err, res) => {
        logger(err, res);
        if (err) reject(err);
        resolve(res);
      }
    );
  });

  /** Update user */
  await new Promise((resolve, reject) => {
    client.userUpdate(
      { id: user.id, lastName: "Lastname edited" },
      (err, res) => {
        logger(err, res);
        if (err) reject(err);
        resolve(res);
      }
    );
  });

  /** Remove user */
  await new Promise((resolve, reject) => {
    client.userRemove({ id: user.id }, (err, res) => {
      logger(err, res);
      if (err) reject(err);
      resolve(res);
    });
  });
};

if (require.main === module) {
  clientExample();
}

module.exports = clientExample;
