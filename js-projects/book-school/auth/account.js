const express = require("express");
const UserRepo = require("../repositories/users");
const app = express();
const router = express.Router();
router.get("/account", (req, res) => {
  res.send("here your account");
});
module.exports = router;
