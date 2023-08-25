const mongoose = require("mongoose");
// you need to add review
const Schema = mongoose.Schema;
const opts = { toJSON: { virtuals: true } };
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
  },
  opts
);

module.exports = mongoose.model("store", storeShema);
