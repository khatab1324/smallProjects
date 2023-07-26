const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storeShema = new Schema({
  title: String,
  description: String,
  price: Number,
  location: String,
});

module.exports = mongoose.model("store", storeShema);
