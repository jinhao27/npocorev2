const mongoose = require("mongoose");
const ms = require("ms");

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
  location: Object,
  links: Object,
  logo: String,
  npoScore: Number,
  bumpedInLastHour: Boolean,
  subscriptions: {
    type: Array,
    dropDups: true
  },
  verifiedNonprofit: Boolean
}));

const postModel = mongoose.model("Post", new mongoose.Schema({
  title: String,
  content: String,
  datetimePosted: Date,
  creator: Object
}));

const passwordResetSessionModel = mongoose.model("PasswordResetSession", new mongoose.Schema({
  sessionId: {
    type: String,
    dropDups: true
  },
  organization: {
    type: Object,
    dropDups: true
  },
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: '15m' },
  }
}));

module.exports = { organizationModel, postModel, passwordResetSessionModel };
