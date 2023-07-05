const express = require("express");
const app = express();
const router = express.Router();

router.get("/books", async (req, res) => {
  res.render("./serves/books/books");
});
module.exports = router;
