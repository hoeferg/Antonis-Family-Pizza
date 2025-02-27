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
  const trimmedName = name.trim();

  try {
    const existingTopping = await Topping.findOne({ name: trimmedName });
    if (existingTopping)
      return res.status(400).json({ message: "Topping already exists" });

    const topping = new Topping({ name: trimmedName });
    await topping.save();
    res.status(201).json({ message: "Successfully created topping", topping });
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
    res.json({ message: "Successfully deleted topping" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Update topping
exports.updateTopping = async (req, res) => {
  const { name } = req.body;
  const trimmedName = name.trim();
  try {
    const updatedTopping = await Topping.findByIdAndUpdate(
      req.params.id,
      { name: trimmedName },
      { new: true }
    );

    if (!updatedTopping) {
      return res.status(404).json({ message: "Topping not found" });
    }

    res.json({ message: "Successfully updated topping", updatedTopping });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
