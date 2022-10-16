const mongoose = require("../connection");

const Schema = mongoose.Schema;
const UsersSchema = new Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;
