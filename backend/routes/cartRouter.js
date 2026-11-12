const app = require("express");
const cartRouters = app.Router();

//invok auth middleware
const userVerify = require("../middleware/userAuth");

// invok Cart model
const User = require("../models/user");

// routers

// get user cart
cartRouters.post("/get", userVerify, async (req, res) => {
  try {
    // from userAuth verify
    const { userId } = req;
    //check if user exist
    const findUser = await User.findById(userId);
    if (!findUser) {
      return res.status(500).json({ msg: "user not founded" });
    }

    let cartData = await findUser.cartData;
    res.status(200).json({ success: true, cartData });
  } catch (err) {
    res.status(500).json({ msg: "cant get cart" });
  }
});

// add to cart
cartRouters.post("/add", userVerify, async (req, res) => {
  try {
    const { size, itemId } = req.body;
    const { userId } = req;
    // console.log(req, " this req");

    //check if user exist
    const findUser = await User.findById(userId);
    if (!findUser) {
      return res.status(500).json({ msg: "user not founded" });
    }

    let cartData = await findUser.cartData;

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    // update User schema
    await User.findByIdAndUpdate(userId, { cartData });
    res.status(200).json({ msg: "success add to cart", cartData });
  } catch (err) {
    res.status(500).json({ msg: "cant update cart" });
  }
});

// update cart
cartRouters.post("/update", userVerify, async (req, res) => {
  try {
    const { size, itemId, quantity } = req.body;
    const { userId } = req;
    // find user
    const findUser = await User.findById(userId);
    if (!findUser) {
      return res.status(500).json({ msg: "user not founded" });
    }
    let cartData = await findUser.cartData;

    cartData[itemId][size] = quantity;

    // update User schema
    await User.findByIdAndUpdate(userId, { cartData });
    res.status(200).json({ msg: "success to update cart", cartData });
  } catch (err) {
    res.status(500).json({ msg: "cant update cart" });
  }
});


//delete cart item
cartRouters.post("/delete", userVerify, async (req, res) => {
  try {
    const { size, itemId } = req.body;
    const { userId } = req;
    // find user  
  const findUser = await User.findById(userId);
    if (!findUser) {
      return res.status(500).json({ msg: "user not founded" });
    }
    let cartData = await findUser.cartData;

    delete cartData[itemId][size];

    // update User schema
    await User.findByIdAndUpdate(userId, { cartData });
    res.status(200).json({ msg: "success to delete cart item", cartData });
  } catch (err) {
    res.status(500).json({ msg: "cant delete cart item" });
  }
});

module.exports = cartRouters;
