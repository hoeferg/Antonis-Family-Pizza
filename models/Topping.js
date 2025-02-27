const mongoose = require("mongoose");

const ToppingSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
});

module.exports = mongoose.model("Topping", ToppingSchema);
