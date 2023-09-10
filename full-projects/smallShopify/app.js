if (process.env.NODE_ENV !== "production") {
  //if we are in development mode it will work
  require("dotenv").config();
}

// =================require laibaryes===============
const express = require("express");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("express-session");
const MongoStore = require("connect-mongo");
//when you require connect-mongo for store session use the last version and read some doc pleas don't follow colt code that will cause errors for you there fix in leture number 586 is not huge
const multer = require("multer");
const methodOverride = require("method-override");
const mongoSanitize = require("express-mongo-sanitize");
//====================for ejs======================
const path = require("path");
const ejsMate = require("ejs-mate");
// ================================================
const app = express();
// ==============require files ====================
const User = require("./models/users");
const storeRouter = require("./routers/stores");
const authenticateRouter = require("./routers/authantication");
const controleRouter = require("./routers/controleStore");
const accountRouter = require("./routers/account");

mongoose.set("strictQuery", false); //DeprecationWarning: Mongoose: the `strictQuery` option will be switched back to `false` by default in Mongoose 7. Use `mongoose.set('strictQuery', false);` if you want to prepare for this change. Or use `mongoose.set('strictQuery', true);` to suppress this warning.
mongoose
  .connect("mongodb://127.0.0.1:27017/smallshopify", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!");
    console.log(err);
  });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
// =========================session====================
const dbUrl = "mongodb://localhost:27017/myDatabase";

const storeSession = MongoStore.create({
  mongoUrl: dbUrl,
  touchAfter: 24 * 60 * 60,
  crypto: {
    secret: "thisshouldbeabettersecret!",
  },
});
storeSession.on("error", function (e) {
  console.log("session store error", e);
});
const sessionConfig = {
  name: "session",
  secret: "thisSecretKey",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    //  secure:true;//Basically, it says that this cookie should only work over https.
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7, //this number is week long//this becuase Date.now its number like this 1688917466197
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(flash());
// ======================passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ========================using flash====================
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});
// =====================use router===============

app.use(authenticateRouter);
app.use(storeRouter);
app.use(controleRouter);
app.use(accountRouter);

app.get("/", (req, res) => {
  res.render("home");
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh No, Something Went Wrong!";
  res.status(statusCode).render("error", { err });
});

port = 2004;
app.listen(port, () => {
  console.log(`lets get started in port ${port}`);
});
