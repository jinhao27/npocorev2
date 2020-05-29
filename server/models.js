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
  website: String,
  password: String
}));

const postModel = mongoose.model("Post", new mongoose.Schema({
  title: String,
  content: String,
  datetimePosted: Date,
  creator: Object
}));

module.exports = { organizationModel, postModel };
