const express = require("express");
const router = express.Router();
const Stors = require("../models/store");
const StorsData = require("../models/storeData");
router.get("/stores", async (req, res) => {
  const storesData = await StorsData.find({});
  res.render("Stores/stores", { storesData });
});

router.get("/sign-in-user", (req, res) => {
  res.render("users/loginUser");
});
router.get("/registerOrUser", (req, res) => {
  res.render("users/storeOrUser");
});
router.get("/register-user", (req, res) => {
  res.render("users/registerUser");
});
router.get("/register-store", (req, res) => {
  res.render("Stores/registerStore");
});
router.post("/register-store", (req, res) => {
  console.log(req.body);
  res.redirect("/");
});
module.exports = router;
