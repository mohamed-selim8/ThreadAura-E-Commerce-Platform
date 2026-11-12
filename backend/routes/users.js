const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// router
const UserRouter = express.Router();

// User model
const User = require("../models/user");

const userRouter = express.Router();

// generate JWT token
function createToken({ id, email, name }) {
  return jwt.sign({ id, email, name }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
}

// get all users route
userRouter.get("/", async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ userInfo: { msg: " all users", users } });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
});

// signup route
userRouter.post("/signup", async (req, res, next) => {
  try {
    // extract data from request body
    const { name, email, password } = req.body;

    // validation
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Please fill all fields" });
    }

    // check if user already exists
    const findUser = await User.findOne({ email });
    if (findUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // else create new user
    const existingUser = await new User({ name, email, password });

    // generate JWT token
    const token = createToken({
      id: existingUser._id,
      email: email,
      name: name,
    });

    await existingUser.save();

    existingUser.password = undefined; // remove password to protect it when sending the response
    // display the new user in the response
    res.status(200).json({
      userInfo: { msg: "User created successfully  ", existingUser, token },
    });
  } catch (err) {
    res.status(500).json({ msg: "Error creating user" });
  }
});

// login route
userRouter.post("/signin", async (req, res, next) => {
  try {
    // extract data from request body
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).json({ msg: "Please fill all fields" });
    }

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(400)
        .json({ msg: "User does not exist, please sign_up" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    existingUser.password = undefined; // remove password to protect it when sending the response

    // generate JWT token
    const token = createToken({
      id: existingUser._id,
      email: existingUser.email,
      name: existingUser.name,
    });
    // display the new user in the response
    res.status(200).json({
      userInfo: {
        success: true,
        msg: "User signed in successfully  ",
        existingUser,
        token,
      },
    });
  } catch (err) {
    res.status(500).json({ msg: "Error signing in user" });
  }
});

// admin route
userRouter.post("/admin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(500).json({ msg: "data not completed" });
    }

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      res.status(500).json({ msg: "not authorized" });
    }

    // else
    const token = jwt.sign({ email, password }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({ msg: `hello admin `, token });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// delete user route
userRouter.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("Deleting user with ID:", id); // Log the ID of the user being deleted
    const deletedUser = await User.findByIdAndDelete(id);

    // check if still exists
    if (!deletedUser) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json({ msg: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting user" });
  }
});

// get specific user
userRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ msg: "Error fetching user" });
  }
});

// update user route
userRouter.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    // check if user exists
    const findUser = await User.findById(id);

    if (!findUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    // extract data from request body
    const { name, email, password } = req.body;

    // validation
    if (!name || !email) {
      return res.status(200).json({ msg: "data still in old format" });
    }

    // update user
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, password },
      { new: true }, // return the updated document
    );

    // res.status(200).json({ msg: "User updated successfully", updatedUser });
  } catch (err) {
    res.status(500).json({ msg: "Error updating user" });
  }
});

// export router
module.exports = userRouter;
