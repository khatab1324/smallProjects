const express = require("express");
const router = express.Router();
const Stors = require("../models/store");
const StorsData = require("../models/storeseparatedData");
const Stores = require("../models/store");
router.get("/stores", async (req, res) => {
  const storesData = await StorsData.find({});
  console.log(req.session);
  let username;
  if (req.session.passport) {
    username = req.session.passport.user;
  }

  res.render("Stores/stores", { storesData, username });
});

router.post;
module.exports = router;
