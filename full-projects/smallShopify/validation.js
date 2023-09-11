const { storeSchema, reviewSchema } = require("./schemaValidaion");
const { productSchema } = require("./schemaValidaion");
const ExpressError = require("./utile/ExpressError");
const Store = require("./models/store");
const StoreReviews = require("./models/StoreReviews");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You must be signed in first!");
    return res.redirect("/sign-in-user");
  }
  next();
};

module.exports.storeReturnTo = (req, res, next) => {
  if (req.session.returnTo) {
    res.locals.returnTo = req.session.returnTo;
  }
  next();
};

module.exports.validateStore = (req, res, next) => {
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
  const store = await Store.findById(id);
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
module.exports.validateProduct = (req, res, next) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
