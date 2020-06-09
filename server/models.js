const mongoose = require("mongoose");

const organizationModel = mongoose.model("Organization", new mongoose.Schema({
  causes: Array,
  description: String,
  email: {
    type: String,
    unique: true,
    dropDups: true
  },
  targetAudiences: Array,
  interests: {
    type: Array,
    required: false
  },
  name: {
    type: String,
    unique: true,
    dropDups: true
  },
  idName: {
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
  creator: Object,
  button: Object,
  type: String
}));

const passwordResetSessionSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    dropDups: true
  },
  organization: {
    type: Object,
    dropDups: true
  },
  createdAt: { type: Date, expires: '5m', default: Date.now }
});
// passwordResetSessionSchema.index({createdAt: 1},{expireAfterSeconds: 5000});
const passwordResetSessionModel = mongoose.model("PasswordResetSession", passwordResetSessionSchema);

module.exports = { organizationModel, postModel, passwordResetSessionModel };
