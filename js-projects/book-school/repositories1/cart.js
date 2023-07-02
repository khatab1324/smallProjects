const Repository = require("./repositories");

class cartRepo extends Repository {}

module.exports = new cartRepo("cart.json");
