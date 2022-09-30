const mongoose = require("../connection");

const Schema = mongoose.Schema;
const StudentsSchema = new Schema({
  name: String,
  age: Number,
  grade: Number,
  prefect: {
    type: Boolean,
    default: false,
  },
});

const Students = mongoose.model("Students", StudentsSchema);

module.exports = Students;
