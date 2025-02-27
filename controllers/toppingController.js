const Topping = require("../models/Topping");

//Get all toppings
exports.getToppings = async (req, res) => {
  try {
    const toppings = await Topping.find();
    res.json(toppings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Add topping
exports.addTopping = async (req, res) => {
  const { name } = req.body;
  try {
    const existingTopping = await Topping.findOne({ name });
    if (existingTopping)
      return res.status(400).json({ message: "Topping already exists" });

    const topping = new Topping({ name });
    await topping.save();
    res.status(201).json(topping);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Delete topping
exports.deleteTopping = async (req, res) => {
  try {
    const deletedTopping = await Topping.findByIdAndDelete(req.params.id);
    if (!deletedTopping) {
      return res.status(404).json({ message: "Topping not found" });
    }
    res.json({ message: "Topping deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Update topping
exports.updateTopping = async (req, res) => {
  const { name } = req.body;
  try {
    const updatedTopping = await Topping.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );

    if (!updatedTopping) {
      return res.status(404).json({ message: "Topping not found" });
    }

    res.json(updatedTopping);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
