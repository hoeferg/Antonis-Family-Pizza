const Pizza = require("../models/Pizza");
const Topping = require("../models/Topping");

//Get all pizzas
exports.getPizzas = async (req, res) => {
  try {
    const pizzas = await Pizza.find().populate("toppings");
    res.json(pizzas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Add pizza
exports.addPizza = async (req, res) => {
  let { name, toppings } = req.body;

  console.log("received request:", req.body);

  name = name.trim();
  if (!name || !Array.isArray(toppings) || toppings.length === 0) {
    return res.status(400).json({ message: "Name and at least one topping are required" });
  }
  try {
    const existingPizza = await Pizza.findOne({ name });
    if (existingPizza) {
      return res.status(400).json({ message: "Pizza already exists" });
    }
    //Check if toppings exist in database
    const validToppings = await Topping.find({ _id: { $in: toppings } });

    if (validToppings.length !== toppings.length) {
      return res
        .status(400)
        .json({ message: "One or more toppings are invalid" });
    }

    const pizza = new Pizza({ name, toppings });
    await pizza.save();

    const newPizza = await Pizza.findById(pizza._id).populate("toppings");

    res.status(201).json({ message: "Successfully created pizza", toppings: pizza.toppings });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: error.message });
  }
};

//Delete pizza
exports.deletePizza = async (req, res) => {
  try {
    const deletedPizza = await Pizza.findByIdAndDelete(req.params.id);
    if (!deletedPizza) {
      return res.status(404).json({ message: "Pizza not found" });
    }
    res.json({ message: "Successfully deleted pizza" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Update pizza
exports.updatePizza = async (req, res) => {
  let { name, toppings } = req.body;
  name = name.trim()
  if (!name) {
    return res.status(400).json({ message: "Pizza name cannot be empty" });
  }
  try {
    const validToppings = await Topping.find({ _id: { $in: toppings } });

    if (validToppings.length !== toppings.length) {
      return res
        .status(400)
        .json({ message: "One or more toppings are invalid" });
    }
    const updatedPizza = await Pizza.findByIdAndUpdate(
      req.params.id,
      { name, toppings },
      { new: true }
    );
    if (!updatedPizza) {
      return res.status(404).json({ message: "Pizza not found" });
    }

    res.json({ message: "Successfully updated pizza", updatedPizza });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
