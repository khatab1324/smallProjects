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

module.exports = router;
