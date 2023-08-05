// =================require laibaryes===============
const express = require("express");
const mongoose = require("mongoose");
//when you require connect-mongo for store session use the last version and read some doc pleas don't follow colt code that will cause errors for you there fix in leture number 586 is not huge
//====================for ejs======================
const path = require("path");
const ejsMate = require("ejs-mate");
// ================================================
const app = express();
// ==============require files ====================
const storeRouter = require("./routers/store");
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

app.use(express.static(path.join(__dirname, "public")));
// =====================use router===============
app.use(storeRouter);

app.get("/", (req, res) => {
  res.render("home");
});

port = 2004;
app.listen(port, () => {
  console.log(`lets get started in port ${port}`);
});
