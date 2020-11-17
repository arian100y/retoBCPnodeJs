const moongose = require("mongoose");

const UserSchema = moongose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  loggedIn: {
    type: Boolean,
    required: true,
  },
});

module.exports = moongose.model("Users", UserSchema);
