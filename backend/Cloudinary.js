const { v2: cloudinary } = require("cloudinary");
require("dotenv").config();
const connectCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });

  // console.log("cloudinary config:", cloudinary.config()); // اطبع بعد الـ config مش قبلها
};
console.log("cloudinary connect");
module.exports = connectCloudinary;
