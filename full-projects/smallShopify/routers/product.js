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
  isAuthorStore,
  validateStore,
  validateProduct,
  validateReview,
  isReviewAuthor,
  isProductAuthor,
  isAuthorProduct,
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
  catchAsync(validateProduct),
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const product = new Product(req.body);
    const store = await Stors.findById(id).populate("products");
    product.images = req.files.map((f) => ({
      url: f.path,
      filename: f.filename,
    }));
    store.products.push(product);
    product.store = store._id;
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
    const product = await Product.findById(productId).populate({
      path: "ProductReviews",
      populate: {
        path: "author",
      },
    });
    console.log("product", product);
    res.render("Stores/product/showProduct", { product });
  })
);
router.get(
  "/store/product/:productId/edit",
  catchAsync(async (req, res) => {
    // I am try to make the url /store/:storeId/:productId but it doesnot work
    const { productId } = req.params;
    const product = await Product.findById(productId);
    res.render("Stores/product/editProduct", { product });
  })
);

router.post(
  "/store/product/:id/edit",
  isLoggedIn,
  isAuthorProduct,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const { title, description, quantity, price } = req.body;
    const product = await Product.findByIdAndUpdate(id, {
      title,
      description,
      quantity,
      price,
    });
    res.redirect(`/store/${product.store}/showProducts`);
  })
);
// ============show products=========
router.get(
  "/store/:storeId/showProducts",
  catchAsync(async (req, res) => {
    const { storeId } = req.params;
    const store = await Stors.findById(storeId).populate("products");

    // const product= sotre.id.populate()
    const products = store.products;
    res.render("Stores/product/showProducts", { store, products });
  })
);
router.delete(
  "/store/:storeId/products/:productId",
  isLoggedIn,
  catchAsync(isProductAuthor),
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

module.exports = router;
