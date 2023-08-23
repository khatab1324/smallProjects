const mongoose = require("mongoose");
// you need to add review
const Schema = mongoose.Schema;
const opts = { toJSON: { virtuals: true } };
const storeShema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User" },
    images: [
      {
        url: String,
        filename: String,
      },
    ],
    title: String,
    description: String,
    price: Number,
    location: String,
  },
  opts
);

module.exports = mongoose.model("store", storeShema);
