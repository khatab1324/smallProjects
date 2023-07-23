const mongoose = require("mongoose");
const storesSeeds = require("./storesSeeds");
const Store = require("../models/store");
mongoose
  .connect("mongodb://localhost:27017/smallshopify", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!");
    console.log(err);
  });

const seedDB = async () => {
  for (let i = 0; i < 2; i++) {
    const store = new Store({
      location: "amman",
      title: "the best in the west",
      description: "gggggggggggggggggggggggggggggggggggggggggggggggg",
      price: 23,
    });
    await store.save();
  }
};
seedDB().then(() => {
  mongoose.connection.close(); //conected and close
});
