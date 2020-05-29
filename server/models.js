const mongoose = require("mongoose");

const organizationModel = mongoose.model("Organization", new mongoose.Schema({
  cause: String,
  description: String,
  email: {
    type: String,
    unique: true,
    dropDups: true
  },
  gender: String,
  interests: {
    type: Array,
    required: false
  },
  name: {
    type: String,
    unique: true,
    dropDups: true
  },
  password: String,
  posts: Array,
  location: String,
  links: Object,
  logo: String
}));

const postModel = mongoose.model("Post", new mongoose.Schema({
  title: String,
  content: String,
  datetimePosted: Date,
  creator: Object
}));

module.exports = { organizationModel, postModel };
