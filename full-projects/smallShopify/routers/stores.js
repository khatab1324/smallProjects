const express = require("express");
const router = express.Router();
const Stors = require("../models/store");

router.get("/stores", async (req, res) => {
  const stores = await Stors.find({});
  let username;
  if (req.session.passport) {
    username = req.session.passport.user;
  }

  req.flash("success", "Successfully made a new campground!");
  res.render("Stores/stores", { stores, username });
});
router.get("/store/:id", async (req, res) => {
  const { id } = req.params;
  const store = await Stors.findById(id);
  res.render("Stores/showStore", { store });
});
module.exports = router;
