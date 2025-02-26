const Topping = require('../models/Topping');

//Get all toppings
exports.getToppings = async (req, res) => {
    const toppings = await Topping.find();
    res.json(toppings);
};

