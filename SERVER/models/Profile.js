const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  avatar: {
    type: String,
  },
  location: {
    type: String,
  },
  bio: {
    type: String,
  },
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
