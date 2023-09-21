const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });
const Store = require("../models/store");
const Product = require("../models/products");
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
    const storeId = user.store;
    const store = await Store.findById(storeId);

    res.render("users/wishlist", { store });
  })
);

module.exports = router;
