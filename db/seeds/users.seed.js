const { hashPassword } = require("../../commons/utils");
const Users = require("../models/users.model");

/** Seeder data */
const seedDatabase = async () => {
  const data = [
    {
      firstName: "agung",
      lastName: "saputra",
      username: "agungsptr",
      password: hashPassword("24434"),
    },
  ];

  await Users.insertMany(data);
  console.log("User has beed seeded");
};

/** Drop DB then seed */
module.exports = {
  seed: seedDatabase,
};
