const express = require("express");
const Repository = require("./repositories");
const Repositories = require("./repositories");

class RepositoriesProducts extends Repositories {}
module.exports = new RepositoriesProducts("products.json");
