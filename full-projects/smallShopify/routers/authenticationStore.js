const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });
const Stores = require("../models/store");

// ===========register store and make it ========================
// router.get("/register-store", upload.array("images"), (req, res) => {
//   req.flash("success", "Successfully made a new campground!");
//   res.render("Stores/registerStore");
// });
// router.post("/register-store", upload.array("images"), async (req, res) => {
//   const { password, username, email, title, location, description } = req.body;
//   const newStoreData = new StoreData({
//     title,
//     location,
//     description,
//   });
//   newStoreData.images = req.files.map((f) => ({
//     url: f.path,
//     filename: f.filename,
//   }));

//   await newStoreData.save();
//   const storeData = { title, location, description };
//   storeData.images = req.files.map((f) => ({
//     url: f.path,
//     filename: f.filename,
//   }));
//   const store = new Stores({ username, email, storeData });
//   await Stores.register(store, password);
//   res.redirect("/stores");
// });
// router.get("/sign-in-store", (req, res) => {
//   res.render("Stores/signInStore");
// });
// router.post(
//   "/sign-in-store",
//   passport.authenticate("local", {
//     failureFlash: true,
//     failureRedirect: "/sign-in-store",
//   }),
//   async (req, res) => {
//     console.log(req.body);
//     const { username, password } = req.body;
//     res.redirect("/stores");
//   }
// );

// ===============================create store=================
router.get("/create-store", upload.array("images"), (req, res) => {
  console.log(req.session);

  req.flash("success", "Successfully made a new campground!");
  res.render("Stores/createStore");
});
router.post("/create-store", upload.array("images"), async (req, res) => {
  const store = new Stores(req.body);
  store.images = req.files.map((f) => ({
    url: f.path,
    filename: f.filename,
  }));
  store.author = req.user._id;
  console.log(store);
  await store.save();
  res.redirect("/stores");
});
router.get("/sign-in-store", (req, res) => {
  res.render("Stores/signInStore");
});
module.exports = router;
