const express = require("express");
const UserRepo = require("../repositories/users");
const app = express();
const router = express.Router();

router.get("/sign-up", (req, res) => {
  res.render("./auth/sing-up.ejs");
});
router.post("/sign-up", async (req, res, next) => {
  console.log(req.method);
  console.log(req.body);
  const { username, email, password, age, country } = req.body;
  const user = await UserRepo.create({
    username,
    email,
    password,
    age,
    country,
  });
  console.log(user);

  // req.session.userId = user.id;
  // req.session.email = user.email;
  res.render("./auth/welcom");
});
router.get("sign-in", (req, res) => {
  res.send("sign-in page");
});
module.exports = router;
