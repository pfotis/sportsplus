const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const loginSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});

const login = mongoose.model("login", loginSchema);

module.exports = login;
