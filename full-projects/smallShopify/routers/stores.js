const express = require("express");
const router = express.Router();
const Stors = require("../models/store");
const StorsData = require("../models/storeseparatedData");
router.get("/stores", async (req, res) => {
  const storesData = await StorsData.find({});
  let username;
  if (req.session.passport) {
    username = req.session.passport.user;
  }
  res.render("Stores/stores", { storesData, username });
});
router.get("/store/:id", async (req, res) => {
  const { id } = req.params;
  const store = await StorsData.findById(id);
  console.log(store);
  res.render("Stores/showStore", { store });
});
router.post;
module.exports = router;
