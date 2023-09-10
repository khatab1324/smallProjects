const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });
const Stors = require("../models/store");
const Product = require("../models/products");
const User = require("../models/users");
const StoreReviews = require("../models/StoreReviews");
const {
  isLoggedIn,
  isAuthor,
  validateStore,
  validateProduct,
} = require("../validation");
router.get("/account", isLoggedIn, async (req, res) => {
  const user = await User.findById(req.user.id);
  const store = await Stors.findOne({ author: user.id });
  console.log(store);
  res.render("users/account", { user, store });
});
router.post("/account/addPhoneNumber", async (req, res) => {
  const { phoneNumber } = req.body;
  const user = await User.findByIdAndUpdate(req.user._id, { phoneNumber });

  res.redirect("/account");
});

module.exports = router;
