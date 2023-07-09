const Repository = require("./repositories");

class cartRepo extends Repository {}

module.exports = new cartRepo("cart.json");//now the Repositories.js will look the cart.json is exist if no make new one 
