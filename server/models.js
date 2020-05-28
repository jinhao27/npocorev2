const mongoose = require("mongoose");

const organizationModel = mongoose.model("Organization", new mongoose.Schema({
  cause: String,
  description: String,
  email: String,
  gender: String,
  interests: Array,
  name: String,
  website: String
}));

module.exports = { organizationModel };
