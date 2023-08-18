const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });
const Stores = require("../models/store");
const StoreData = require("../models/storeseparatedData");
// ===========register store and make it ========================
router.get("/register-store", upload.array("images"), (req, res) => {
  res.render("Stores/registerStore");
});
router.post("/register-store", upload.array("images"), async (req, res) => {
  const { password, username, email, title, location, description } = req.body;
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
  await Stores.register(store, password);
  res.redirect("/stores");
});

module.exports = router;
