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

router.get(
  "/stores",
  catchAsync(async (req, res) => {
    const stores = await Stors.find({}).populate("products");
    let username;
    if (req.session.passport) {
      username = req.session.passport.user;
    }

    req.flash("success", "Successfully made a new campground!");
    res.render("Stores/stores", { stores, username });
  })
);
router.get(
  "/store/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const store = await Stors.findById(id)
      .populate("products")
      .populate({
        path: "StoreReviews",
        populate: {
          path: "author",
        },
      });
    console.log(store);
    res.render("Stores/showStore", { store });
  })
);

// =====================product=================
router.get(
  "/store/:id/create-product",
  catchAsync(async (req, res) => {
    //show form create product
    const { id } = req.params;
    const store = await Stors.findById(id);

    res.render("Stores/product/createProduct", { store });
  })
);
router.post(
  "/store/:id/create-product",
  isLoggedIn,
  upload.array("images"),
  validateProduct,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const product = new Product(req.body);
    const store = await Stors.findById(id).populate("products");
    product.images = req.files.map((f) => ({
      url: f.path,
      filename: f.filename,
    }));
    store.products.push(product);
    product.store = store.title;
    console.log(store);
    console.log(product);
    await store.save();
    await product.save();
    res.redirect(`/store/${id}`);
  })
);
router.get(
  "/store/product/:productId",
  catchAsync(async (req, res) => {
    // I am try to make the url /store/:storeId/:productId but it doesnot work
    const { productId } = req.params;
    const product = await Product.findById(productId);
    console.log(product);
    res.render("Stores/product/showProduct", { product });
  })
);
// ============================
// ===============================create store=================
router.get(
  "/create-store",
  isLoggedIn,
  upload.array("images"),
  catchAsync(async (req, res) => {
    console.log(req.session);
    let author;
    let user;
    if (req.session.passport) {
      // you can use req.user make refactor
      author = req.session.passport.user;
      user = await users.findOne({ username: author });
    }
    req.flash("success", "Successfully made a new campground!");
    res.render("Stores/createStore", { author });
  })
);
router.post(
  "/create-store",
  isLoggedIn,
  upload.array("images"),
  validateStore,
  async (req, res) => {
    const store = new Stors(req.body);
    store.images = req.files.map((f) => ({
      url: f.path,
      filename: f.filename,
    }));
    store.author = req.user._id;
    console.log(store.username);
    console.log(store);
    await users.findByIdAndUpdate(req.user.id, { store: store._id });
    await store.save();
    const findStore = await Stors.findById(store._id).populate("author");
    console.log(findStore);
    res.redirect("/stores");
  }
);

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
