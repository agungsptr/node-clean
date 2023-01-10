const mongoose = require("../connection");

const Schema = mongoose.Schema;
const StudentsSchema = new Schema({
  name: String,
  age: Number,
  grade: Number,
  perfect: { type: Boolean, default: false },
  createdBy: Object,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Students = mongoose.model("Students", StudentsSchema);

module.exports = Students;
