const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/users");
const Stores = require("../models/store");
const StoreData = require("../models/storeseparatedData");

router.get("/sign-in-user", (req, res) => {
  res.render("users/loginUser");
});
router.post(
  "/sign-in",
  //here will use storeReturnTo
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/sign-in-user",
  }),
  (req, res) => {
    req.flash("success", "welcome back!");
    console.log(req.session.returnTo);
    const redirectUrl = res.locals.returnTo || "/stores";
    res.redirect(redirectUrl);
  }
);

router.get("/registerOrUser", (req, res) => {
  res.render("users/storeOrUser");
});
// ============register user========================
router.get("/register-user", (req, res) => {
  res.render("users/registerUser");
});
router.post("/register-user", async (req, res) => {
  try {
    //i want when there something went wrong like using same username , i want falsh message show to user becuase that I use try and catch
    const { username, email, password, configerPassword } = req.body;
    if (password === configerPassword) {
      //I will remove it when I add validation
      const user = new User({ email, username });
      const newUser = await User.register(user, password);
      console.log(newUser);
      req.login(newUser, (err) => {
        if (err) {
          return next(err);
        }
        req.flash("success", "welcome in yelp camp");
        res.redirect("/stores");
      });
    } else {
      req.flash("success", "welcome in yelp camp");
      res.redirect("register-user");
    }
  } catch (error) {
    req.flash("error", error.message);
    console.log("the error is : ", error.message);
    res.redirect("/register-user");
  }
});
// ===========register store========================
router.get("/register-store", (req, res) => {
  res.render("Stores/registerStore");
});
router.post("/register-store", async (req, res) => {
  const { password, username, email, title, location, description } = req.body;
  const newStoreData = new StoreData({ title, location, description });
  await newStoreData.save();
  const storeData = { title, location, description };
  const store = new Stores({ username, email, storeData });
  const newStore = await Stores.register(store, password);
  console.log(store);
  console.log(newStoreData);
  res.redirect("/stores");
});

module.exports = router;
