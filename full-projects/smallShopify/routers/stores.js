const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });
const Stors = require("../models/store");
const Product = require("../models/products");
const users = require("../models/users");

const catchAsync = require("../utile/catchAsync");
const {
  isLoggedIn,
  isAuthor,
  validateStore,
  validateProduct,
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
    const store = await Stors.findById(id).populate("products");
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
  validateStore,
  catchAsync(async (req, res) => {
    console.log(req.session);
    let author;
    let user;
    if (req.session.passport) {
      author = req.session.passport.user;
      user = await users.findOne({ username: author });
    }
    req.flash("success", "Successfully made a new campground!");
    res.render("Stores/createStore", { author, user });
  })
);

module.exports = router;
