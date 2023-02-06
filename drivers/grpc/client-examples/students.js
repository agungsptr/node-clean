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
        // logger(err, res);
        if (err) reject(err);
        resolve(res);
      }
    );
  });

  /** Create student */
  const student = await new Promise((resolve, reject) => {
    client.studentCreate(
      {
        name: "felix",
        grade: 2,
        age: 6,
        createdBy: {
          userId: `${user.id}`,
          username: user.username,
        },
      },
      (err, res) => {
        logger(err, res);
        if (err) reject(err);
        resolve(res);
      }
    );
  });

  /** Find student by id */
  await new Promise((resolve, reject) => {
    client.studentFindOne({ id: student.id }, (err, res) => {
      logger(err, res);
      if (err) reject(err);
      resolve(res);
    });
  });

  /** Find all student */
  await new Promise((resolve, reject) => {
    client.studentFindAll(
      {
        fields: {
          page: { numberValue: 1 },
          limit: { numberValue: 2 },
          queries: {
            structValue: {
              fields: {
                name: { stringValue: student.name },
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

  /** Update student */
  await new Promise((resolve, reject) => {
    client.studentUpdate(
      { id: student.id, name: "Name edited" },
      (err, res) => {
        logger(err, res);
        if (err) reject(err);
        resolve(res);
      }
    );
  });

  /** Remove student */
  await new Promise((resolve, reject) => {
    client.studentRemove({ id: student.id }, (err, res) => {
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
