const { storeSchema, reviewSchema } = require("./schemaValidaion");
const { productSchema } = require("./schemaValidaion");
const ExpressError = require("./utile/ExpressError");
const Store = require("./models/store");
const Product = require("./models/products");
const StoreReviews = require("./models/StoreReviews");
const users = require("./models/users");
const crypto = require("crypto");
const util = require("util");
const { log } = require("console");
const scrypt = util.promisify(crypto.scrypt);
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You must be signed in first!");
    return res.redirect("/sign-in-user");
  }
  next();
};

module.exports.storeReturnTo = async (req, res, next) => {
  if (req.session.returnTo) {
    res.locals.returnTo = req.session.returnTo;
  }
  next();
};

module.exports.validateStore = async (req, res, next) => {
  const { error } = storeSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
module.exports.isAuthor = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const product = await Product.findById(id);
  let store;
  if (product) {
    store = await Store.findById(product.store);
    console.log(store);
  } else {
    store = await Store.findById(id);
    console.log(store);
  }
  if (!store.author.equals(req.user._id)) {
    req.flash("error", "You do not have permission to do that!");
    return res.redirect(`/store/${id}`);
  }
  next();
};
module.exports.isReviewAuthor = async (req, res, next) => {
  const { storeId, reviewId } = req.params; //why I put campid? it should have the same name id that in reviews.js file the route delete
  const reveiw = await StoreReviews.findById(reviewId);
  if (!reveiw.author.equals(req.user._id)) {
    req.flash("error", "You do not have permission to do that!");
    return res.redirect(`/store/${storeId}`);
  }
  next();
};
module.exports.validateProduct = async (req, res, next) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
module.exports.validateReview = async (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
module.exports.correctPin = async (req, res, next) => {
  // fix the return to when the user enter wrong pin redirect him where he was
  req.session.returnTo = req.originalUrl;
  if (req.session.returnTo) {
    res.locals.returnTo = req.session.returnTo;
  }
  const redirectUrl = res.locals.returnTo || "/stores";

  const { pin } = req.body;
  const userId = req.user._id;
  const user = await users.findById(userId);
  const storeId = user.store;
  const store = await Store.findById(storeId);
  const savedPin = store.pin;
  const [hashed, salt] = savedPin.split(".");
  const hashedSuppliedBuf = await scrypt(pin, salt, 64);
  if (!(hashed === hashedSuppliedBuf.toString("hex"))) {
    req.flash("error", "sorry your pin wrong!");
    return res.redirect(redirectUrl);
  }
  next();
};
