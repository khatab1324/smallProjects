const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });
const Stors = require("../models/store");
const Product = require("../models/products");
const users = require("../models/users");
const StoreReviews = require("../models/StoreReviews");

const catchAsync = require("../utile/catchAsync");
const {
  isLoggedIn,
  isAuthor,
  validateStore,
  validateProduct,
  validateReview,
  isReviewAuthor,
} = require("../validation");
const products = require("../models/products");

//============================ review =================
router.post(
  "/store/:storeId/reviews",
  isLoggedIn,
  validateReview,
  catchAsync(async (req, res) => {
    const { storeId } = req.params;
    console.log(req.body);
    const store = await Stors.findById(storeId);
    const storeReview = new StoreReviews(req.body.review);
    store.StoreReviews.push(storeReview);
    storeReview.author = req.user._id;
    storeReview.save();
    store.save();
    console.log(req.user);
    res.redirect(`/store/${storeId}/`);
  })
);
router.delete(
  "/store/:storeId/reviews/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(async (req, res) => {
    const { storeId, reviewId } = req.params;
    const deleteReview = await StoreReviews.findByIdAndDelete(reviewId);
    const deleteReviewFromStore = await Stors.findByIdAndUpdate(storeId, {
      $pull: { reviews: reviewId },
    });
    res.redirect(`/store/${storeId}`);
  })
);
module.exports = router;
