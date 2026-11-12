const app = require("express");
const orderRouter = app.Router();

const OrderModel = require("../models/orderModel");
const User = require("../models/user");
const adminChecked = require("../middleware/adminAuth");
const userVerify = require("../middleware/userAuth");

//specific user order data for frontend
orderRouter.post("/userr", userVerify, async (req, res) => {
  const { userId } = req;
  let find_user = await OrderModel.find({ userId });
  if (!find_user) {
    return res.status(404).json({ msg: "no order found", success: false });
  } else {
    return res
      .status(200)
      .json({ msg: "order found", success: true, orders: find_user });
  }
});

// all orders to admin
orderRouter.post("/", adminChecked, async (req, res) => {
  try {
    let orders = await OrderModel.find();
    res.status(200).json({ msg: "orders fetched", success: true, orders });
  } catch (err) {
    res.status(500).json({ msg: err, success: false });
  }
});

// methods of payment
orderRouter.post("/cash", userVerify, async (req, res) => {
  try {
    const { userId } = req;
    let { items, amount, address } = req.body;

    // order method obj
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "cash",
      payment: false,

      date: Date.now(),
    };

    const createOrder = new OrderModel(orderData);
    await createOrder.save();

    await User.findByIdAndUpdate(userId, { createdAt: {} });
    res.status(201).json({ msg: "ordered placed", success: true });
  } catch (err) {
    res.status(500).json({ msg: err, success: false });
  }
});

// update data from admin
orderRouter.put("/updOrder", adminChecked, async (req, res) => {
  try {
    let { status, _id } = req.body;

    console.log(status, _id, "to update");

    // check if data from client is valid
    if (!status || !_id) {
      return res
        .status(500)
        .json({ msg: "data not completed", success: false });
    }

    // check if order exist
    const findOrder = await OrderModel.findById(_id);

    if (!findOrder) {
      return res.status(500).json({ msg: "not found order", success: false });
    } else {
      console.log(findOrder, " hi exist it");
      await OrderModel.findByIdAndUpdate(_id, { status }, { new: true });
      res.status(200).json({
        msg: "order status changhed",
        success: true,
        // findOrder,
      });
    }
  } catch (err) {
    res.status(404).json({
      msg: "not founded ",
    });
  }
});

// enable user to delete his orders
orderRouter.delete("/del/:orderId", userVerify, async (req, res) => {
  try {
    const { userId } = req;
    const { orderId } = req.params;
    let find_order = await OrderModel.findOne({ _id: orderId, userId });
    if (!find_order) {
      return res.status(404).json({ msg: "no order found", success: false });
    } else {
      await OrderModel.findOneAndDelete({ _id: orderId });
      return res.status(200).json({ msg: "order deleted", success: true });
    }
  } catch (err) {
    res.status(500).json({ msg: err, success: false });
  }
});

module.exports = orderRouter;
