// =================require files===============
const authRouter = require("./auth/auth");
const booksRouter = require("./serves/books");
// ================
const express = require("express");
const path = require("path"); //for ejs
const bodyParser = require("body-parser");
const UserRepo = require("./repositories/users");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(authRouter);
app.use(booksRouter);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", async (req, res) => {
  const { email } = req.body;
  const user = await UserRepo.getOneBy({ email });
  console.log(user);
  if (user) {
    const userSession = req.session.userId;
    console.log(userSession);
    res.render("home", userSession);
  } else {
    console.log(req.session);
    res.render("home");
  }
});

app.get("/sign-in", (req, res) => {
  console.log("sing in req");
  res.send("sing in page");
});
app.listen(3000, () => {
  console.log("conction open on port 3000!");
});
