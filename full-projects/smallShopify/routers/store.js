const express = require("express");
const router = express.Router();
router.get("/stores", (req, res) => {
  res.send("I am exsiding for our website");
});
module.exports = router;
