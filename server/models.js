const mongoose = require("mongoose");

const organizationModel = mongoose.model("Organization", new mongoose.Schema({
  cause: String,
  description: String,
  email: String,
  gender: String,
  interests: {
    type: Array,
    required: false
  },
  name: String,
  website: String
}));

module.exports = { organizationModel };
