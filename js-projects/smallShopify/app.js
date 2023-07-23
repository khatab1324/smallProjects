// =================require laibaryes===============
const express = require("express");
const mongoose = require("mongoose");
const app = express();

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

app.get("/", (req, res) => {
  res.send("hello wolrd ,here I am");
});

port = 2004;
app.listen(port, () => {
  console.log(`lets get started in port ${port}`);
});
