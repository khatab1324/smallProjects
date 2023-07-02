const express = require("express");
const app = express();
const router = express.Router();

router.get("/sign-up", (req, res) => {
  res.render("./auth/sing-up.ejs");
});
router.post("/sign-up", (req, res, next) => {
  console.log(req.method);
  console.log(req.body);

  res.render("./auth/sing-up.ejs");
});
router.get("sign-in", (req, res) => {
  res.send("sign-in page");
});
module.exports = router;
