const mongoose = require("mongoose");
const Students = require("../models/students.model");
const StudentsDb = mongoose.connection.collections.students;

/** Seeder data */
const seedDatabase = async () => {
  const data = [
    {
      name: "howie",
      age: 12,
      grade: 3,
      prefect: true,
    },
    {
      name: "felix",
      age: 9,
      grade: 4,
    },
    {
      name: "hela",
      age: 16,
      grade: 5,
    },
  ];

  for (const element of data) {
    await Students.create(element);
  }
};

/** Drop DB then seed */
StudentsDb.drop(async () => {
  await seedDatabase();
  mongoose.connection.close();
});
