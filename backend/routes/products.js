const express = require("express");
const productRouter = express.Router();

const Product = require("../models/product");

// handel images
const upload = require("../middleware/multer");
const { v2: cloudinary } = require("cloudinary");

// adminAuth to protect route
const adminChecked = require("../middleware/adminAuth");

// list of get all product
productRouter.get("/", async (req, res) => {
  try {
    const totalItem = await Product.find();

    res.status(200).json({ totalItem });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
// add product
productRouter.post(
  "/",
  adminChecked,

  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),

  async (req, res) => {
    try {
      const {
        name,
        description,
        price,
        category,
        subCategory,
        size,
        bestSeller,
      } = req.body;

      // images
      const imgs = [];
      const image1 = req.files?.image1?.[0];
      const image2 = req.files?.image2?.[0];
      const image3 = req.files?.image3?.[0];
      const image4 = req.files?.image4?.[0];

      imgs.push(image1, image2, image3, image4);

      const cleanImg = imgs.filter((item) => item != undefined);

      // upload to cloudinary
      let sendTOCloudinary = await Promise.all(
        cleanImg.map(async (item) => {
          let results = await cloudinary.uploader.upload(item.path, {
            resource_type: "image",
          });
          return results.secure_url;
        }),
      );
      console.log("toSent", sendTOCloudinary);

      let parsedSize = [];
      if (size) {
        try {
          parsedSize = JSON.parse(size);
        } catch {
          parsedSize = [size];
        }
      }
      let productItem = {
        name,
        price: Number(price),
        size: parsedSize,
        description,
        category,
        subCategory,
        bestSeller: bestSeller == "true" ? true : false,
        image: sendTOCloudinary,
        date: Date.now(),
      };
      console.log(productItem);

      //create product in db
      const newProduct = await Product.create(productItem);
      await newProduct.save();

      console.log(req.body, " from front ");

      res.status(201).json({ msg: "product created successfully", newProduct });
    } catch (err) {
      console.log("REAL ERROR =>", err);
      res.status(500).json({ msg: "error to add product", error: err.message });
    }
  },
);
// single product
productRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const findItem = await Product.findOne({ _id: id });
    if (!findItem) {
      res.status(500).json({ msg: "not found product" });
    }
    // else
    res.status(200).json({ msg: " found product", findItem });
  } catch (err) {
    res.status(500).json({ msg: "fail to get product", err: err.message });
  }
});

// delete product
productRouter.delete("/:id", adminChecked, async (req, res) => {
  try {
    const { id } = req.params;
    const findItem = await Product.findById(id);
    if (findItem) {
      await Product.findByIdAndDelete(id);
      res.status(200).json({ msg: "deleted successfully" });
    } else {
      res.status(500).json({ msg: "not found product" });
    }
  } catch (err) {
    res.status(500).json({ msg: "fail to delete product", err: err.message });
  }
});

// export the router
module.exports = productRouter;
