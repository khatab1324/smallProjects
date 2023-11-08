const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });
const Store = require("../models/store");
const Product = require("../models/products");
const WishList = require("../models/wishList");
const users = require("../models/users");

const catchAsync = require("../utile/catchAsync");
const {
  isLoggedIn,
  isAuthor,
  validateStore,
  validateProduct,
  correctPin,
} = require("../validation");
const products = require("../models/products");

router.get(
  "/wishlist",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const userId = req.user._id;
    const user = await users.findById(userId);
    let wishList = await WishList.findOne({ user: userId }).populate(
      "products"
    );
    console.log(wishList.products);
    res.render("users/wishlist", { wishList });
  })
);
router.post(
  "/wishlist/:productId",
  isLoggedIn,
  catchAsync(async (req, res) => {
    console.log("add this to the store");
    const { productId } = req.params;
    const product = await Product.findById(productId);
    const userId = req.user._id;
    const user = await users.findById(userId);
    console.log(user);
    let wishList = await WishList.findOne({ user: userId }).populate(
      //  NOTE : find give you and array and findOne give you and object
      // you need the object
      "products"
    );
    if (wishList.length === 0) {
      wishList = new WishList();
      wishList.user = user;
      wishList.products = product;
      await wishList.save();
    } else {
      wishList.products.push(product);
      await wishList.save();
    }
    res.redirect("/wishlist");
  })
);

module.exports = router;
