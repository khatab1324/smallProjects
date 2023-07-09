// =================require files===============
const authRouter = require("./auth/auth");
const booksRouter = require("./serves/books");
// ================
const express = require("express");
const path = require("path"); //for ejs
const bodyParser = require("body-parser");
const UserRepo = require("./repositories/users");
const cookieSession = require("cookie-session");
const accountRouter = require("./auth/account");
const app = express();
//i have err that because i put the cookieSesstion under
app.use(
  cookieSession({
    keys: ["holle people"], //This keys property is used to encrypt all the information that is stored inside the cookie because it very bad if the user can play with it and make him self another one  but with key not be able to decipher it or let alone make any changes to the information stored inside there just
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(authRouter);
app.use(booksRouter);
app.use(accountRouter);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", async (req, res) => {
  console.log(req.session);
  let user;
  const { email } = req.session;

  if (email) user = await UserRepo.getOneBy({ email });
  const userId = req.session.userId;
  console.log(user);
  res.render("home", { userId, user });
});

const port = 2500;
app.listen(port, () => {
  console.log(`conction open on port ${port}`);
});
