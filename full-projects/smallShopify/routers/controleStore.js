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

router.get("/stores/:storeId/controle", async (req, res) => {
  const { storeId } = req.params;
  const store = await Stors.findById(storeId).populate("products");

  let capital = 0;
  for (let product of store.products) {
    capital += product.price;
  }
  res.render("Stores/controle", { store, capital });
});
router.post("/store/:storeId", async (req, res) => {
  const { storeId } = req.params;
  const store = await Stors.findById(storeId);
  const updatestore = await Stors.findByIdAndUpdate(storeId, {
    ...req.body,
  });

  console.log(updatestore);
  console.log(store);
  console.log(req.body);
  store.save();
  res.redirect(`/store/${storeId}`);
});

// ============show products=========
router.get("/store/:storeId/showProducts", async (req, res) => {
  const { storeId } = req.params;
  const store = await Stors.findById(storeId).populate("products");
  // const product= sotre.id.populate()
  console.log(store);
  const products = store.products;
  res.render("Stores/product/showProducts", { store, products });
});
// ============delete product
router.post("/store/:storeId/:productId/delete", async (req, res) => {
  const { storeId, productId } = req.params;
  await Product.findByIdAndDelete(productId);
  req.flash("success", "Successfully deleted campground");
  res.redirect(`/store/${storeId}/showProducts`);
});
router.post("/store/:storeId/delete", async (req, res) => {
  const { storeId } = req.params;
  await Stors.findByIdAndDelete(storeId);
  req.flash("success", "Successfully deleted campground");
  res.redirect(`/stores`);
});

module.exports = router;
