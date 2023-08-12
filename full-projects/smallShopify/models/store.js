const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storeShema = new Schema({
  storeAdmin: {
    username: String,
    email: String,
    password: String,
    storeData: {
      image: String,
      title: String,
      description: String,
      price: Number,
      location: String,
    },
  },
});

module.exports = mongoose.model("store", storeShema);
