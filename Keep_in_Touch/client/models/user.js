// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  semester: String,
  collegeName: String,
  faculty: String,
  password: String
});

module.exports = mongoose.model("User", userSchema);