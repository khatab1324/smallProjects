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
  "/stores/:storeId/controle",
  catchAsync(async (req, res) => {
    const { storeId } = req.params;
    const store = await Stors.findById(storeId).populate("products");

    let capital = 0;
    for (let product of store.products) {
      capital += product.price;
    }
    res.render("Stores/controle", { store, capital });
  })
);
router.post(
  "/store/:storeId",
  catchAsync(async (req, res) => {
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
  })
);

// ============show products=========
router.get(
  "/store/:storeId/showProducts",
  catchAsync(async (req, res) => {
    const { storeId } = req.params;
    const store = await Stors.findById(storeId).populate("products");
    // const product= sotre.id.populate()
    console.log(store);
    const products = store.products;
    res.render("Stores/product/showProducts", { store, products });
  })
);
// ============delete product
router.delete(
  "/store/:storeId/products/:productId",
  catchAsync(async (req, res) => {
    const { storeId, productId } = req.params;

    await Stors.findByIdAndUpdate(storeId, {
      $pull: { products: productId },
    });
    await Product.findByIdAndDelete(productId);
    console.log("the product deleted");
    req.flash("success", "Successfully deleted campground");
    res.redirect(`/store/${storeId}/showProducts`);
  })
);
router.post(
  "/store/:storeId/delete",
  catchAsync(async (req, res) => {
    const { storeId } = req.params;
    await Stors.findByIdAndDelete(storeId);
    console.log("the store deleted");
    req.flash("success", "Successfully deleted campground");
    res.redirect(`/stores`);
  })
);

module.exports = router;
