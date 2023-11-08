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
  correctPin,
} = require("../validation");
const products = require("../models/products");

router.get(
  "/stores/:storeId/controle",
  catchAsync(async (req, res) => {
    const { storeId } = req.params;
    const store = await Stors.findById(storeId).populate("author");

    

    let capital = 0;
    for (let product of store.products) {
      capital += product.price;
    }
    res.render("Stores/controle", { store, capital });
  })
);
router.post(
  "/store/:id",
  isLoggedIn,
  isAuthor,
  correctPin,
  catchAsync(async (req, res) => {
    const { title, description, location } = req.body;
    const { id } = req.params;
    const store = await Stors.findById(id);
    const updatestore = await Stors.findByIdAndUpdate(id, {
      title,
      description,
      location,
    });
    store.save();
    res.redirect(`/store/${id}`);
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
