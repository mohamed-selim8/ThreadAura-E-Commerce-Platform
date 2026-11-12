const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const orderFormat = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    address: {
      type: Object,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    payment: {
      type: Boolean,
      required: true,
      default: false,
    },
    status: {
      type: String,
      required: true,
      default: "Ready to ship",
    },
    date: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const OrderModel = model("Order", orderFormat);

module.exports = OrderModel;
