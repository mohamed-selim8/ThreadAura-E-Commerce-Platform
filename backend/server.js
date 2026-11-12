// express setup
const express = require("express");
const cors = require("cors");
const app = express();

// db connection
require("./db");

// import dotenv
require("dotenv/config");

// import cloudinary
const connectCloudinary = require("./Cloudinary");

connectCloudinary();

// port
const port = process.env.PORT || 3002;

// import routers
const userRouter = require("./routes/users");
const productRouter = require("./routes/products");
const cartRouters = require("./routes/cartRouter");
const orderRouter = require("./routes/orderRouter");

// statics middleware
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());

// router middleware
app.use("/products", productRouter);
app.use("/users", userRouter);
app.use("/cart", cartRouters);
app.use("/orders", orderRouter);

// server connection
app.listen(port, () => {
  console.log(port, "running now");
});
