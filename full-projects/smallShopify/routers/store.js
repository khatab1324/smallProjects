const express = require("express");
const router = express.Router();
const Stors = require("../models/store");
router.get("/stores", async (req, res) => {
  const stores = await Stors.find({});
  res.render("Stores/stores", { stores });
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
module.exports = router;
