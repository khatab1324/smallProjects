const mongoose = require("mongoose");
// you need to add review
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
const ImageSchema = new Schema({
  url: String,
  filename: String,
});
const storeShema = new Schema({
  password: String,
  username: String,

  email: {
    type: String,
    required: true,
    unique: true,
  },

  storeData: {
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
});
storeShema.plugin(passportLocalMongoose);
module.exports = mongoose.model("store", storeShema);
