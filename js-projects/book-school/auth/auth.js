const express = require("express");
const UserRepo = require("../repositories/users");
const app = express();
const router = express.Router();
const signupTemplate = require("../views/auth/sign-up");
const {
  usernameRequire,
  requireEmail,
  requireAge,
  requireCountry,
  requirePassword,
  requirePasswordConfirmatio,
} = require("../validation/validation");
const { handleErrors } = require("../validation/middleware");

router.get("/sign-up", (req, res) => {
  res.render("./auth/sing-up");
});
router.post(
  "/sign-up",
  [
    requireAge,
    requireCountry,
    requireEmail,
    requirePassword,
    requirePasswordConfirmatio,
    usernameRequire,
  ],
  handleErrors(signupTemplate),
  async (req, res, next) => {
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

    req.session.userId = user.id;
    req.session.email = user.email;
    res.render("./auth/welcom");
  }
);
router.get("/sign-in", async (req, res) => {
  res.render("./auth/sing-in");
});
router.post("/sign-in", async (req, res) => {
  const { email } = req.body;
  const user = await UserRepo.getOneBy({ email });
  console.log(user);

  if (user) {
    req.session.userId = user.id;
    req.session.email = user.email;

    res.render("./auth/welcom");
  }
});
router.get("/sign-out", (req, res) => {
  req.session = null; //we clear the coockies
  res.redirect("/");
});
module.exports = router;
