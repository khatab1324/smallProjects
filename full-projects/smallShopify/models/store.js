const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
const storeShema = new Schema({
  password: String,
  username: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },

  storeData: {
    image: String,
    title: String,
    description: String,
    price: Number,
    location: String,
  },
});
storeShema.plugin(passportLocalMongoose);
module.exports = mongoose.model("store", storeShema);
