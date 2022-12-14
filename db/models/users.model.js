const mongoose = require("../connection");
const { hashPassword } = require("../../commons/utils");
const uuid = require("uuid");

const Schema = mongoose.Schema;
const UsersSchema = new Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  secretUuid: { type: String, default: uuid.v4() },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

UsersSchema.pre("save", async function () {
  this.password = hashPassword(this.password);
});

const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;
