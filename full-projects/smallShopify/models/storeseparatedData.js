const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const storeDataSchema = new Schema({
  images: [{ url: String, filename: String }],
  title: String,
  description: String,
  location: String,
});
module.exports = mongoose.model("storeData", storeDataSchema);
