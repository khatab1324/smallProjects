const express = require("express");
const router = express.Router();
const Stors = require("../models/store");
const StorsData = require("../models/storeseparatedData");
const Stores = require("../models/store");
router.get("/stores", async (req, res) => {
  const storesData = await StorsData.find({});
  res.render("Stores/stores", { storesData });
});

router.post;
module.exports = router;
