// =================require files===============
const authRouter = require("./auth/auth");
// ================
const express = require("express");
const path = require("path"); //for ejs
const bodyParser = require("body-parser");
const router = require("./auth/auth");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(authRouter);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/sign-in", (req, res) => {
  console.log("sing in req");
  res.send("sing in page");
});
app.listen(3000, () => {
  console.log("conction open on port 3000!");
});
