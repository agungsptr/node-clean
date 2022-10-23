const Students = require("../models/students.model");

/** Seeder data */
const seedDatabase = async () => {
  const data = [
    {
      name: "agung1",
      age: 17,
      grade: 3,
      prefect: true,
    },
    {
      name: "agung2",
      age: 9,
      grade: 4,
    },
    {
      name: "agung3",
      age: 16,
      grade: 5,
    },
  ];

  await Students.insertMany(data);
  console.log("Student has beed seeded");
};

/** Drop DB then seed */
module.exports = {
  seed: seedDatabase,
};
