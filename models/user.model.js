const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  age: Number,
  verified: {
    type: Boolean,
    default: false,
  },
  pic_url: {
    type: String,
    default: "user.png",
  },
});

const User = model("user", userSchema);
module.exports = User;
