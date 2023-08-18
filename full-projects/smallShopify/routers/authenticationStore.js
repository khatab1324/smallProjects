const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const { cloudinary } = require("../cloudinary");
const { storage } = require("../cloudinary");
const upload = multer({ storage });
const User = require("../models/users");
const Stores = require("../models/store");
const StoreData = require("../models/storeseparatedData");
// ===========register store and make it ========================
router.get("/register-store", upload.array("images"), (req, res, next) => {
  res.render("Stores/registerStore");
});
router.post(
  "/register-store",
  upload.array("images"),
  async (req, res, next) => {
    console.log(req.file);
    const { password, username, email, title, location, description } =
      req.body;
    const newStoreData = new StoreData({
      title,
      location,
      description,
    });
    newStoreData.images = req.files.map((f) => ({
      url: f.path,
      filename: f.filename,
    }));

    await newStoreData.save();
    const storeData = { title, location, description };
    storeData.images = req.files.map((f) => ({
      url: f.path,
      filename: f.filename,
    }));
    const store = new Stores({ username, email, storeData });
    const newStore = await Stores.register(store, password);

    console.log(store);
    console.log(newStoreData);
    res.redirect("/stores");
  }
);

module.exports = router;
