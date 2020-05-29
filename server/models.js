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
  password: String,
  posts: Array,
  location: String,
  links: Object
}));

const postModel = mongoose.model("Post", new mongoose.Schema({
  title: String,
  content: String,
  datetimePosted: Date,
  creator: Object
}));

module.exports = { organizationModel, postModel };
