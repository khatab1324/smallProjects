const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const opts = { toJSON: { virtuals: true } };
const StoreReview = require("./StoreReviews");
const storeShema = new Schema(
  {
    username: String,
    email: String,
    author: String,
    images: [
      {
        url: String,
        filename: String,
      },
    ],
    title: String,
    description: String,
    location: String,
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    StoreReviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "StoreReview",
      },
    ],
  },
  opts
);

module.exports = mongoose.model("store", storeShema);
