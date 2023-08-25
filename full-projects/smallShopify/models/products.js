const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
  title: String,
  images: [
    {
      url: String,
      filename: String,
    },
  ],
  store: String,
  type: String,
  ratingValue: Number,
  aggregateRating: Number, //reviewCount
  price: Number,
  quantity: Number,
  description: String,
});
module.exports = mongoose.model("Product", ProductSchema);
