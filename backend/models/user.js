const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcrypt");
// schema for user
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    cartData: {
      type: Object,
      required: false,
      default: {},
    },
  },
  { timestamps: true, minimize: false },
);

// minimize: false is used to prevent mongoose from removing empty objects from the document. This is useful when you want to store an empty object in the database, such as when a user has no cart data yet.

// pre-save hook to hash password before saving
userSchema.pre("save", async function () {
  const user = this;
  if (user.isModified("password")) {
    // hash the password before saving
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  }
});

const User = model("User", userSchema);

module.exports = User;
