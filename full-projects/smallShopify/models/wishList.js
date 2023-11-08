const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const wishListSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
      quantity: Number,
    },
  ],
});
module.exports = mongoose.model("Wishlist", wishListSchema);
