const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });
const Stors = require("../models/store");
const Product = require("../models/products");

router.get("/stores", async (req, res) => {
  const stores = await Stors.find({}).populate("products");
  let username;
  if (req.session.passport) {
    username = req.session.passport.user;
  }

  req.flash("success", "Successfully made a new campground!");
  res.render("Stores/stores", { stores, username });
});
router.get("/store/:id", async (req, res) => {
  const { id } = req.params;
  const store = await Stors.findById(id).populate("products");
  res.render("Stores/showStore", { store });
});
// =====================product=================
router.get("/store/:id/create-product", async (req, res) => {
  //show form create product
  const { id } = req.params;
  const store = await Stors.findById(id);

  res.render("Stores/product/createProduct", { store });
});
router.post(
  "/store/:id/create-product",
  upload.array("images"),
  async (req, res) => {
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
  }
);
router.get("/store/:storeId/:productId", (req, res) => {
  res.render("Stores/product/showProduct");
});
module.exports = router;
